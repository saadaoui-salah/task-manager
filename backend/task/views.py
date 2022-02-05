from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from rest_framework import authentication
from django.contrib.auth.models import User
from engagment.models import Engagment
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication

class TaskDetailApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        queryset   =  Task.objects.filter(id=task_id)
        serializer = TaskDetailSerializer(queryset, many=True)
        return Response({'data':serializer.data, 'error':''})        

class TaskGroupsApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, eng_id):
        queryset   =  TaskGroup.objects.filter(engagment__id=eng_id)
        serializer = TaskGroupSerializer(queryset, many=True) 
        return Response({'data':serializer.data, 'error':''})        

    
class CreateTaskGroupApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            engagment = Engagment.objects.filter(id=request.data['engagment']).get()
            obj = TaskGroup.objects.create(
                user_create=request.user,
                name=request.data['name'],
                engagment=engagment,
                )
            obj.save()
            return Response({'created':True ,'error':''})        
        except Exception as e:
            print(e)
            return Response({'created':False , 'error':'not validated data'})



class CreateTaskApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            obj = Task.objects.create(
                prefix=request.data['prefix'],
                title=request.data['title'],
                task_group=TaskGroup.objects.filter(id=request.data['task_group']).get(),
                description=request.data['description'],
                )
            obj.save()
            return Response({'created':True , 'error':''})        
        except Exception as e:
            return Response({'created':False ,'error':e})        
        

class TasksApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, group_id):
        queryset   =  Task.objects.filter(task_group__id=group_id)
        serializer = TaskSerializer(queryset, many=True) 
        return Response({'data':serializer.data, 'error':''})        


class UploadEvidenceApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UploadedEvidenceSerilaizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.validated_data, 'error':''})
        return Response({'data':'', 'error':serializer.errors})

class CreateEvidenceApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
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
        


class EvidenceListApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, eng_id):
        uploaded_evidence = list(UploadedEvidence.objects.filter(engagment__id=eng_id).values('id','preparer__username','reviewer__username','name', 'file', 'note'))
        buildin_evidence = list(BuildinEvidence.objects.filter(engagment__id=eng_id).values('id','preparer__username', 'reviewer__username', 'name', 'content'))
        return Response({
            'data':uploaded_evidence , 
            'error': ''
            })