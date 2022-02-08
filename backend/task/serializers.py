from rest_framework.serializers import ModelSerializer
from .models import *


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'prefix', 'description']

class TaskDetailSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskGroupSerializer(ModelSerializer):
    class Meta:
        model = TaskGroup
        fields = ['id', 'name']

class UploadedEvidenceSerializer(ModelSerializer):
    class Meta:
        model = UploadedEvidence
        fields = '__all__'


class BuildinEvidenceSerializer(ModelSerializer):
    class Meta:
        model = BuildinEvidence
        fields = '__all__'

class SectionSerializer(ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'
