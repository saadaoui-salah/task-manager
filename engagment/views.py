from rest_framework.generics import ListAPIView 
from rest_framework.response import Response 
from .models import Engagment
from rest_framework.pagination import PageNumberPagination
from .serializer import EngagmentListSerializer, EngagmentSerializer
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 
from rest_framework import authentication

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class EngagmentListView(ListAPIView):
    queryset = Engagment.objects.all()
    serializer_class = EngagmentListSerializer
    pagination_class = StandardResultsSetPagination

class CreateEngagmentApiView(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def post(self, request):
        if request.is_authenticated:
            try:
                engagment = Engagment.objects.create(
                    name=request.POST['name'],
                    report_date=request.POST['report_date']
                )
                print(request.POST['invited_members'])
                engagment.invited_members.set([1])
                serializer = EngagmentListSerializer(engagment)
                return Response({'created':True, 'data': serializer.data, 'error': ''})
            except Exception as e:
                return Response({'created':False, 'data': {}, 'error': e})
        return Response({'created':False, 'data': {}, 'error':'request not valid'})