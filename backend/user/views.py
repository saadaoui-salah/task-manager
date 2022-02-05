from django.db.models import Q
from django.contrib.auth.models import User
from .serializers import UserSerailizer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token


class SearchUserView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    prempermission_classes = [IsAuthenticated]


    def get(self, request, keyword):
        users = User.objects.filter(Q(username__contains=keyword) | Q(email__contains=keyword)).values_list('id', 'username', 'first_name', 'is_superuser', 'is_staff')  
        return Response({'users': list(users), 'errors':''})



class HealthyView(APIView):
    def get(self, request):
        return Response({'HEALTHY':'GOOOD'})