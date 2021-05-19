from django.urls import path
from base.views import user_views as views



urlpatterns= [
    path('login/', views.MyTokenObtainPairView.as_view(), name='MyTokenObtainPairView'),
    path('profile/',views.getUserProfile,name='usersProfile'),
    path('',views.getUser,name='allUsersProfile'),
    path('register/',views.registerUser,name='registerUser')

]