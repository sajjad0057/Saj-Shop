from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    # customize serialize fields name , define funtion get_fieldsname() format.

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

     # customize serialize fields name , define funtion get_fieldsname() format.
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)   # by JWT documentation

        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
    '''
    Django allows you to access reverse relations on a model. 
    By default, Django creates a manager (RelatedManager) on your model 
    to handle this, named <model>_set,
    where <model> is your model name in lowercase.
    Known --> More :
    https://stackoverflow.com/questions/25386119/whats-the-difference-between-a-onetoone-manytomany-and-a-foreignkey-field-in-d
    https://docs.djangoproject.com/en/3.2/ref/models/relations/
    '''

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data




class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

        '''
        Django allows you to access reverse relations on a model. 
        By default, Django creates a manager (RelatedManager) on your model 
        to handle this, named <model>_set,
        where <model> is your model name in lowercase.
        Known --> More :
        https://stackoverflow.com/questions/25386119/whats-the-difference-between-a-onetoone-manytomany-and-a-foreignkey-field-in-d
        https://docs.djangoproject.com/en/3.2/ref/models/relations/
        '''

    def get_orderItems(self, obj):
        # create reverse relation . useing Related object reference .
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            '''
            # must be set obj.<lowercase_Model_name> if we can nesting serialize a Model  by using reference #
            Here :
            address=ShippingAddressSerializer(obj.shippingaddress, many=False).data by this we access serialize data. 
            here address.data like as serialize.data ,thats we pass like Response(serialize.data) in previous code .
            '''
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data  
            #print("OrderSerializer -----> address : ",address)
        except:
            address = False
        return address

    def get_user(self, obj):
        # create reverse relation . useing Related object reference .
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

