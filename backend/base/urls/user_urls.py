from django.urls import path
from base.views import user_views as views



urlpatterns= [

    path('login/', views.MyTokenObtainPairView.as_view(), name='MyTokenObtainPairView'),
    path('profile/',views.getUserProfile,name='usersProfile'),
    path('profile/update/',views.updateUserProfile, name='updateProfile'),
    path('register/',views.registerUser,name='registerUser'),
    path('',views.getUser,name='allUsersProfile'),
    path('delete/<str:pk>/',views.delete_user,name='deleteUser'),
    path('update/<str:pk>/',views.updateUser,name='updateUser'),
    # this path keep in last , because any string can be triggering this path . 
    path('<str:pk>/',views.getUserById,name='getUserById'),


]