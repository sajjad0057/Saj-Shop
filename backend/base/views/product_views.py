from base.serializers import ProductSerializer
from base.models import Product
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True) # many = True cz, here serialize many product.
    return Response(serializer.data) 


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
