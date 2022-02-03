from rest_framework.serializers import ModelSerializer
from .models import Task, UploadedEvidence, BuildinEvidence, TaskGroup


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskGroupSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class UploadedEvidenceSerializer(ModelSerializer):
    class Meta:
        model = UploadedEvidence
        fields = '__all__'


class BuildinEvidenceSerializer(ModelSerializer):
    class Meta:
        model = BuildinEvidence
        fields = '__all__'
