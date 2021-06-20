from django.urls import path
from base.views import product_views as views



urlpatterns= [
    path('',views.getProducts,name="products"),
    path('delete/<str:pk>/',views.deleteProduct,name="delete-product"),
    path('update/<str:pk>/',views.updateProduct,name="update-product"),
    path('create/',views.createProduct,name="create-products"),
    path('<str:pk>/',views.getSingleProduct,name="product"),

]