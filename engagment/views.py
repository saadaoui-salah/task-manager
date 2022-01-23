from rest_framework.generics import ListAPIView 
from .models import Engagment
from rest_framework.pagination import PageNumberPagination
from .serializer import EngagmentListSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class EngagmentListView(ListAPIView):
    queryset = Engagment.objects.all()
    serializer_class = EngagmentListSerializer
    pagination_class = StandardResultsSetPagination