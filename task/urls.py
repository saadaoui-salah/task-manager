from django.urls import path
from .views import *

urlpatterns = [
    path('engagment/<int:eng_id>/tasks/', EngagmentByTasksApiView.as_view()),
    path('engagment/<int:eng_id>/tasks/<int:task_id>/', TasksApiView.as_view()),
    path('engagment/<int:eng_id>/evidence/upload/', UploadEvidenceApiView.as_view()),
    path('engagment/<int:eng_id>/evidence/create/', CreateEvidenceApiView.as_view()),
    path('engagment/<int:eng_id>/evidence/all/', EvidenceListApiView.as_view())
]
