from django.urls import path
from .views import *

urlpatterns = [
    path('engagment/<int:group_id>/tasks/', TaskByTaskGroupApiView.as_view()),
    path('engagment/<int:eng_id>/task-group/', TaskGroupByEngagmentApiView.as_view()),
    path('engagment/<int:eng_id>/tasks/<int:task_id>/', TasksApiView.as_view()),
    path('engagment/evidence/upload/', UploadEvidenceApiView.as_view()),
    path('engagment/evidence/create/', CreateEvidenceApiView.as_view()),
    path('engagment/<int:eng_id>/evidence/all/', EvidenceListApiView.as_view())
]