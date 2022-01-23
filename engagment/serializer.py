from rest_framework import serializers
from .models import Engagment

class EngagmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagment
        fields = ('id', 'name',)
