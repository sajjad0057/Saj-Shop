from django.shortcuts import render
from django.http import JsonResponse
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from .models import Product
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# For simple-jwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        print("test -----> MyTokenObtainPairSerializer in views.py --> :",data)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        "api/products/",
        "api/products/create/",
        "api/products/upload/",
        "api/products/<id>/reviews/",
        "api/products/top/",
        "api/products/<id>/",
        "api/products/delete/<id>/",
        "api/products/update/<id>/",
    ]
    return Response(routes)


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False) # many = False cz, here serialize just one user.
    return Response(serializer.data) 






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

