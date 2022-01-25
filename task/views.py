from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer, UploadedEvidenceSerializer, BuildinEvidenceSerializer
from .models import Task, UploadedEvidence, BuildinEvidence
from rest_framework import authentication
from django.contrib.auth.models import User
from engagment.models import Engagment

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
    authentication_classes = [authentication.TokenAuthentication]
    def post(self, request):
        if request.is_authenticated:
            serializer = UploadedEvidenceSerilaizer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data':serializer.validated_data, 'error':''})
            return Response({'data':'', 'error':serializer.errors})
        return Response({'data':'', 'error':'user not authenticated'})

class CreateEvidenceApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self, request):
        if request.is_authenticated:
            engagment = Engagment.objects.filter(id=request.POST['engagment']).get()
            preparer = User.objects.filter(id=request.POST['preparer']).get()
            reviewer = User.objects.filter(id=request.POST['reviewer']).get()
            evidence = BuildinEvidence.objects.create(
                name=request.POST['name'],
                content=request.POST['content'],
                engagment=engagment,
                preparer=preparer,
                reviewer=reviewer,
            )
            evidence.save()
            serializer = BuildinEvidenceSerializer(evidence)
            return Response({'created':True, 'data':serializer.data, 'error':''})
        return Response({'created':False, 'data':'', 'error':'user not authenticated'})
        


class EvidenceListApiView(APIView):

    def get(self, request, eng_id):
        if request.is_authenticated:
            uploaded_evidence_queryset = UploadedEvidence.objects.filter(engagment__id=eng_id)
            buildin_evidence_queryset = BuildinEvidence.objects.filter(engagment__id=eng_id)
            uploaded_evidence_serializer = UploadedEvidenceSerializer(uploaded_evidence_queryset, many=True)
            buildin_evidence_serializer =  BuildinEvidenceSerializer(buildin_evidence_queryset, many=True)
            return Response({
                'data':{
                    'uploaded_evidence': uploaded_evidence_serializer.data,
                    'buildin_evidence': buildin_evidence_serializer.data
                }, 
                'error': ''
                })
        return Response({'data':'', 'error':'user not authenticated'})