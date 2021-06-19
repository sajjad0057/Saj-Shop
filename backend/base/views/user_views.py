from base.serializers import UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response

# For simple-jwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs) # here data is a dict, this dict contains 'resfresh', 'access', 'token' and etc key and their value.
        #print("test -----> MyTokenObtainPairSerializer in views.py --> :",UserSerializerWithToken(self.user))
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        return data





class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer







# Create your views here.

@api_view(['POST'])
def registerUser(request):
    data = request.data
    #print("data form  registerUser: ",data)
    try:
        user = User.objects.create(
        first_name = data['name'],
        username = data['email'],
        email = data['email'],
        password = make_password(data['password'])


        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {'detail': "email has already exists"}
        return Response(message,status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False) # many = False cz, here serialize just one user.
    return Response(serializer.data) 





@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user,many=False) # many = False cz, here serialize just one user.
    
    data = request.data
    #print("updateUserProfile -----> user , data : ",user,data)

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']


    if data['password'] !='':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data) 








@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)



    