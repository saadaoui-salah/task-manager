from rest_framework.generics import ListAPIView 
from rest_framework.response import Response 
from .models import Engagment
from rest_framework.pagination import PageNumberPagination
from .serializer import EngagmentListSerializer, EngagmentSerializer
from rest_framework.views import APIView
from rest_framework import authentication

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class EngagmentListView(ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]
    queryset = Engagment.objects.all()
    serializer_class = EngagmentListSerializer
    pagination_class = StandardResultsSetPagination

class CreateEngagmentApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            engagment = Engagment.objects.create(
                name=request.data['name'],
                report_date=request.data['report_date']
            )
            engagment.invited_members.set(request.data['invited_members'])
            serializer = EngagmentListSerializer(engagment)
            return Response({'created':True, 'data': serializer.data, 'error': ''})
        except Exception as e:
            return Response({'created':False, 'data': {}, 'error': e})