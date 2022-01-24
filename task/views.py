from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer, UploadedEvidenceSerializer, BuildinEvidence
from .models import Task, UploadedEvidence, BuildinEvidence

class EngagmentByTasksApiView(APIView):
    def get(self, request, eng_id):
        if request.is_authenticated:
            queryset   =  Task.objects.filter(task_group__engagment__id=eng_id)
            serializer = TaskSerializer(queryset, many=True)
            return Response({'data':serializer.data, 'error':''})        
        return Response({'data':[], 'error':'user not authenticated'})

class TasksApiView(APIView):
    def get(self, request, eng_id, task_id):
        if request.is_authenticated:
            queryset   =  Task.objects.filter(task_group__engagment__id=eng_id, id=task_id)
            serializer = TaskSerializer(queryset, many=True)
            return Response({'data':serializer.data, 'error':''})        
        return Response({'data':[], 'error':'user not authenticated'})


class UploadEvidenceApiView(APIView):
    def post(self, request):
        if request.is_authenticated:
            serializer = UploadedEvidenceSerilaizer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data':serializer.validated_data, 'error':''})
            return Response({'data':'', 'error':serializer.errors})
        return Response({'data':'', 'error':'user not authenticated'})

class CreateEvidenceApiView(APIView):
    def post(self, request):
        if request.is_authenticated:
            serializer = BuildinEvidenceSerilaizer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data':serializer.validated_data, 'error':''})
            return Response({'data':'', 'error':serializer.errors})
        return Response({'data':'', 'error':'user not authenticated'})
        


class EvidenceListApiView(APIView):
    def get(self, request):
        if request.is_authenticated:
            uploaded_evidence_queryset = UploadedEvidence.objects.all()
            buildin_evidence_queryset = BuildinEvidence.objects.all()
            uploaded_evidence_serializer = UploadedEvidenceSerilaizer(uploaded_evidence_queryset, many=True)
            buildin_evidence_serializer =  BuildinEvidenceSerilaizer(buildin_evidence_queryset, many=True)
            return Response({
                'data':{
                    'uploaded_evidence': uploaded_evidence_serializer.data,
                    'buildin_evidence': buildin_evidence_serializer.data
                }, 
                'error': ''
                })
        return Response({'data':'', 'error':'user not authenticated'})