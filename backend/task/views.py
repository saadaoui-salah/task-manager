from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from rest_framework import authentication
from django.contrib.auth.models import User
from engagment.models import Engagment

class TaskByTaskGroupApiView(APIView):
    def get(self, request, group_id):
        if request.is_authenticated:
            queryset   =  Task.objects.filter(task_group__id=group_id)
            serializer = TaskSerializer(queryset, many=True)
            return Response({'data':serializer.data, 'error':''})        
        return Response({'data':[], 'error':'user not authenticated'})

class TaskGroupByEngagmentApiView(APIView):
    def get(self, request, eng_id):
        if request.is_authenticated:
            queryset   =  TaskGroup.objects.filter(task_group__engagment__id=eng_id)
            serializer = TaskGroupSerializer(queryset, many=True)
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
            engagment = Engagment.objects.filter(id=request.data['engagment']).get()
            preparer = User.objects.filter(id=request.data['preparer']).get()
            reviewer = User.objects.filter(id=request.data['reviewer']).get()
            evidence = BuildinEvidence.objects.create(
                name=request.data['name'],
                content=request.data['content'],
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