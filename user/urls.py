from django.urls import path
from .views import LoginView, SearchUserView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('search/keyword/<str:keyword>/', SearchUserView.as_view())
]
