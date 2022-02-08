from django.urls import path
from .views import *

urlpatterns = [
    path('engagment/<int:eng_id>/task-group/', TaskGroupsApiView.as_view()),
    path('task-group/<int:group_id>/tasks/', TasksApiView.as_view()),
    path('create-task-group/', CreateTaskGroupApiView.as_view()),
    path('create-task/', CreateTaskApiView.as_view()),
    path('tasks/<int:task_id>/', TaskDetailApiView.as_view()),
    path('tasks/<int:task_id>/evidence-list/', ListEvidenceByTaskApiView.as_view()),
    path('engagment/evidence/upload/', UploadEvidenceApiView.as_view()),
    path('engagment/<int:eng_id>/evidence/all/', EvidenceListApiView.as_view()),
    path('task/<int:task_id>/section/', SectionsApiView.as_view()),
    path('section/<int:sec_id>/evidence/', EvidenceBySectionsApiView.as_view()),
    path('section/<int:task_id>/evidence/create/', CreateEvidenceApiView.as_view()),
    path('engagment/<int:eng_id>/contrebuters/', ContrebutersApiView.as_view()),
    path('evidence/<int:evidence_id>/contrebuters/update', UpdateContrebuterApiView.as_view())
]