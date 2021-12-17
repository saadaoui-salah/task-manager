from django.contrib import admin
from .models import TaskGroup, Task, Evidence


admin.site.register(TaskGroup)
admin.site.register(Task)
admin.site.register(Evidence)