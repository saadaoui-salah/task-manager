from django.db import models
from django.contrib.auth.models import User


class TaskGroup(models.Model):
    preparer = models.ForeignKey(User, limit_choices_to={'is_staff':True, 'is_admin':False}, on_delete=models.CASCADE) 
    name     = models.CharField("Name", max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    prefix      = models.CharField(max_length=100, null=True, blank=True)
    title       = models.CharField(max_length=100) 
    task_group  = models.ForeignKey(TaskGroup, on_delete=models.CASCADE)
    description = models.TextField()
    completed   = models.BooleanField(default=False)
    date        = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.title
    

class Evidence(models.Model):
    task        = models.ForeignKey(Task, on_delete=models.CASCADE)
    evidence    = models.FileField(upload_to="tasks_files", max_length=100) 
    note        = models.FileField(upload_to="notes", max_length=100)