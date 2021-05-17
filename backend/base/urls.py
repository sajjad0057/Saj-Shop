from django.urls import path
from . import views



urlpatterns= [
    path('products/',views.getProducts,name="products"),
    path('products/<str:pk>/',views.getSingleProduct,name="product"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='MyTokenObtainPairView'),
    path('users/profile/',views.getUserProfile,name='usersProfile'),
    path('users/',views.getUser,name='allUsersProfile'),

]