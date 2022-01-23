from django.urls import path
from .views import EngagmentListView

urlpatterns = [
    path('engagment-listing/', EngagmentListView.as_view())
]