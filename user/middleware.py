from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User

class ValidationError(Exception):
    pass

class IsAuthenticatedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def validate(self, token):
        for user in User.objects.all():
            token_ = list(Token.objects.filter(user=user).values())[0]['key']
            if token == token_:
                return True, user
        return False, None
    def __call__(self, request, *args, **kwargs):
        url = request.get_full_path()
        if url[0:5] == '/api/':
            if url == '/api/user/login/':
                return self.get_response(request)
            token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
            validated, user = self.validate(token)
            request.user = user
            request.is_authenticated = validated
            response = self.get_response(request)
            return response
        else:
            return self.get_response(request)