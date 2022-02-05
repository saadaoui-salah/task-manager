from django.urls import path
from .views import *
from rest_framework.authtoken import views

urlpatterns = [
    path('login/', views.obtain_auth_token),
    path('search/keyword/<str:keyword>/', SearchUserView.as_view()),
    path('healthy/', HealthyView.as_view())
]
