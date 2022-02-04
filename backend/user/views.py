from django.db.models import Q
from django.contrib.auth.models import User
from .serializers import UserSerailizer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token

class LoginView(APIView):
    def post(self, request):
        try:
            username = request.data['user']
            user     = User.objects.filter(username=username)
            if len(list(user)) == 0 :
                return Response({'token':'', 'error':'user not found'})
            password = request.data['password']
            real_password = list(user.values_list('password'))[0][0]
            if check_password(password, real_password):
                token = Token.objects.filter(user__username=username)
                if len(list(token)) > 0:
                    token = token.values_list('key')[0]
                    return Response({'token':token, 'error':''})
                token = Token.objects.create(user=user.get())
                return Response({'token':token.key, 'error':''})
            return Response({'token':'', 'error':'auth failed'})
        except Exception as e:
            print(e) 
            return Response({'token':'', 'error':'user not found'})

class SearchUserView(APIView):
    def get(self, request, keyword):
        if request.is_authenticated:
            users = User.objects.filter(Q(username__contains=keyword) | Q(email__contains=keyword)).values_list('id', 'username', 'first_name', 'is_superuser', 'is_staff')  
            return Response({'users': list(users), 'errors':''})
        return Response({'users': '', 'errors':'user not authenticated'})



class HealthyView(APIView):
    def get(self, request):
        return Response({'HEALTHY':'GOOOD'})