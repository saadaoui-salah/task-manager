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
from django.conf import settings

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

class ListEvidenceByTaskApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        uploaded_evidence = list(UploadedEvidence.objects.filter(task__id=task_id).values('id','preparer__username','reviewer__username', 'file'))
        return Response({
            'data':uploaded_evidence , 
            'error': ''
        })
    
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
        try:
            queryset   =  Task.objects.filter(task_group__id=group_id)
            serializer = TaskSerializer(queryset, many=True) 
            return Response({'data':serializer.data, 'error':''})        
        except:
            return Response({'data':[], 'error':'group not found'})        


class UploadEvidenceApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UploadedEvidenceSerilaizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.validated_data, 'error':''})
        return Response({'data':'', 'error':serializer.errors})



class EvidenceListApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, eng_id):
        uploaded_evidence = list(
            UploadedEvidence.objects.filter(
                task__task_group__engagment__id=eng_id
                ).values(
                    'id','preparer__username','reviewer__username', 'file'
                    )
                )
        return Response({
            'data':uploaded_evidence, 
            'error': ''
            })


class ContrebutersApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]
    
    def get(self, request, eng_id):
        try:
            contrebuters = Engagment.objects.filter(id=eng_id).values('invited_members__username', 'invited_members__id', 'invited_members__is_staff')
            return Response({'data':{'contrebuters':contrebuters, 'count':len(contrebuters)}})
        except:
            return Response({'error':'engagment not found'})

class UpdateContrebuterApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]
    
    def post(self, request, evidence_id):
        user = User.objects.filter(username=request.data['username']).get()
        evidence = UploadedEvidence.objects.filter(id=evidence_id).get()
        if user.is_staff:
            evidence.preparer = user
            evidence.save()
            return Response({'updated':True, 'error':''})
        else: 
            evidence.reviewer = user
            evidence.save()
            return Response({'updated':True, 'error':''})
        
class SectionsApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        from django.db.models import Count, Q
        q = Section.objects.values('title', 'id')
        return Response({'data': q})

    def post(self, request, task_id):
        try:
            q = Section.objects.create(
                title=request.data['title'],
                task=Task.objects.filter(id=task_id).get()
                )
            return Response({'created': True})
        except:
            return Response({'created': False})

class EvidenceBySectionsApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def get(self, request, sec_id):
        q = BuildinEvidence.objects.filter(section__id=sec_id).values('title', 'id', 'content')
        return Response({'data': q})


class CreateEvidenceApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        try:
            q = BuildinEvidence.objects.create(
                title=request.data['title'],
                content=request.data['content'],
            )
            s = Section.objects.filter(task__id=task_id).get()
            s.evidence.add(q)
            return Response({'created': True})
        except:
            return Response({'created': False})

        