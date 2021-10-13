from django.contrib import admin
from .models import User

# Register your models here.
# admin.site.register(User)

@admin.register(User)
class User(admin.ModelAdmin):
    list_display = ['username','email','is_active','is_staff','is_superuser']
    list_filter = ['is_staff','is_superuser']
