from django.urls import path
from base.views import order_views as views



urlpatterns= [
    path('',views.getOrders,name="orders"),
    path('add/',views.addOrderItems,name="order-add"),
    path('myorders/',views.getUserOrder,name="my-orders"),
    ##<str:pk>/ dynamic value ,so set this path after static url or value
    path('<str:pk>/',views.getOrderById,name="user-order"),
    path('<str:pk>/pay/',views.updateOrderToPaid,name="pay"),

]