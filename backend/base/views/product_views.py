from django.core import paginator
from base.serializers import ProductSerializer
from base.models import Product, Review
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')

    #print("getProducts --->query : ",query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    '''
    See For Paginator in Dajngo : 

    https://docs.djangoproject.com/en/3.2/topics/pagination/
    https://docs.djangoproject.com/en/3.2/ref/paginator/#django.core.paginator.Paginator
    '''
    page_no = request.query_params.get('page')
    p = Paginator(products,6)
    try:
        products = p.page(page_no)

    except PageNotAnInteger:
        products = p.page(1)
    except:
        products = p.page(p.num_pages)

    if page_no == None:
        page_no = 1
    page_no = int(page_no)


    serializer = ProductSerializer(products,many=True) # many = True cz, here serialize many product.
    return Response({'products':serializer.data,'page_no':page_no,'pages':p.num_pages}) 


@api_view(['GET'])
def getSingleProduct(request,pk):
    try:
        product = Product.objects.get(id = pk)
        serializer = ProductSerializer(product,many = False) # many = False cz, here serialize just single product.
        return Response(serializer.data)        
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    try:
        product = Product.objects.get(id = pk)
        product.delete()
        return Response("Product Deleted !")        
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = "Sample name",
        price = 0,
        brand = "sample Brand",
        countInStock = 0,
        category = "Sample Category",
        description = "",
    )
    serializer = ProductSerializer(product,many=False) # many = True cz, here serialize many product.
    return Response(serializer.data) 


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    try:
        data = request.data
        product = Product.objects.get(id = pk)
        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']
        
        product.save()

        serializer = ProductSerializer(product,many = False) # many = False cz, here serialize just single product.
        return Response(serializer.data)        
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    





@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(id = product_id)
    product.image = request.FILES.get('image')
    product.save()

    return Response("Image Uploaded ")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    data = request.data
    product = Product.objects.get(id = pk)

    # 1 - check Review already Exists :
    '''
    Django allows you to access reverse relations on a model. 
    By default, Django creates a manager (RelatedManager) on your model 
    to handle this, named <model>_set,
    where <model> is your model name in lowercase.
    Known --> More :
    https://stackoverflow.com/questions/25386119/whats-the-difference-between-a-onetoone-manytomany-and-a-foreignkey-field-in-d
    https://docs.djangoproject.com/en/3.2/ref/models/relations/
    '''
    alreadyExists = product.review_set.filter(user=user).exists()  # exits() returen Boolean Value

    if alreadyExists:
        content = { 'detail' : 'Product already reviewed by you !' }
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    # 2 - No rating  if set 0 :
    elif data['rating'] == 0:
        content = { 'detail' : 'Please Select a Rating !' }
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create Review :

    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],

        )

        reviews = product.review_set.all()  # Django allows you to access reverse relations on a model. 
        product.numReviews = len(reviews)
        total_review = 0
        for i in reviews:
            total_review += i.rating

        product.rating = total_review / len(reviews)
        product.save()

        return Response({'datail':'Review Added !'})




@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] # __gte means greaterthan or equal
    serializer = ProductSerializer(products,many=True) 
    return Response(serializer.data)





