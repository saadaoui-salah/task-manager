from django.urls import path
from .views import EngagmentListView, CreateEngagmentApiView

urlpatterns = [
    path('engagment-listing/', EngagmentListView.as_view()),
    path('create-new-engagment/', CreateEngagmentApiView.as_view())
]