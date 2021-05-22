from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','username','email','name','isAdmin']

    # customize serialize fields name , define funtion get_fieldsname() format.

    def get_name(self,obj):
        name =  obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff



class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','username','email','name','isAdmin','token']


     # customize serialize fields name , define funtion get_fieldsname() format.
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)   # by JWT documentation
        
        return str(token.access_token)





class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'