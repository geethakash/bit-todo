from django.contrib import admin
from django.urls import path,include
from .views import GetUserDataView, SetUserDataView

urlpatterns = [
    path('getdata/',GetUserDataView.as_view()),
    path('setdata/',SetUserDataView.as_view())
    
]