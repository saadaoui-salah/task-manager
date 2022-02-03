from rest_framework import serializers
from .models import Engagment

class EngagmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagment
        fields = ('id', 'name', 'report_date')

class EngagmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagment
        fields = ('id', 'name', 'report_date', 'invited_members')
