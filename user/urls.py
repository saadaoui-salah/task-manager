from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('search/keyword/<str:keyword>/', SearchUserView.as_view()),
    path('healthy/', HealthyView.as_view())
]
