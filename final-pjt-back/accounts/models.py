from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=20,unique=True)
    age = models.IntegerField(default=20)
    gender = models.IntegerField(default=1)
    salary = models.IntegerField(default=3999)
    wealth = models.IntegerField(default=123123)
    tendency = models.IntegerField(default=1)