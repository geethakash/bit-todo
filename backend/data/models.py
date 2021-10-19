from django.db import models
from django.utils import timezone
from users.models import User
from django.db.models.deletion import CASCADE
# Create your models here.

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True)
    Data = models.TextField(default='Null Text')
    dataJson =  models.JSONField()
    DateTime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return "{}".format(self.user)