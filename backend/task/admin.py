from django.contrib import admin
from .models import TaskGroup, Task, UploadedEvidence, BuildinEvidence


admin.site.register(TaskGroup)
admin.site.register(Task)
admin.site.register(UploadedEvidence)
admin.site.register(BuildinEvidence)