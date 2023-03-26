from django.db import models
from django.utils.translation import gettext as _
import datetime

class Users(models.Model):
    UserId = models.AutoField(primary_key=True, null=False, unique=True)
    Username = models.CharField(max_length=100, unique=True)
    Password = models.CharField(max_length=100)

class Types(models.Model):
    TypeId = models.AutoField(primary_key=True, null=False, unique=True)
    Type = models.CharField(max_length=100, unique=True)

class Posts(models.Model):
    PostId = models.AutoField(primary_key=True, null=False, unique=True)
    Type = models.ForeignKey(Types, on_delete=models.CASCADE)
    Author = models.ForeignKey(Users, on_delete=models.CASCADE)
    CreationDate = models.DateField(_("Date"), default=datetime.date.today)
    PostTitle = models.CharField(max_length=100, unique=True)
    PostPhoto = models.CharField(max_length=100, default=0)
    PostContent = models.TextField