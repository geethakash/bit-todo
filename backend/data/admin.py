from django.contrib import admin
from django.db import models
from .models import UserData
# Register your models here.

@admin.register(UserData)
class Data(admin.ModelAdmin):
    list_display = ['user','DateTime',]
    search_fields = ('user',)