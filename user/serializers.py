from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerailizer(serializers.ModelSerializer):
    model  = User
    fields = ['id', 'username'] 