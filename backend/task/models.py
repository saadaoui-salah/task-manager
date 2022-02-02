from django.db import models
from django.contrib.auth.models import User

class TaskGroup(models.Model):
    user_create = models.ForeignKey(User, limit_choices_to={'is_staff':True, 'is_superuser':False}, on_delete=models.CASCADE) 
    name        = models.CharField(max_length=100)
    descripion  = models.TextField()
    engagment   = models.ForeignKey("engagment.Engagment", on_delete=models.CASCADE)

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
    

class UploadedEvidence(models.Model):
    engagment = models.ForeignKey('engagment.Engagment', on_delete=models.CASCADE)
    name     = models.CharField(max_length=100)
    file     = models.FileField(upload_to="tasks_files", max_length=100) 
    note     = models.TextField()
    preparer = models.ForeignKey(User, related_name="uploaded_evidence_preparer", limit_choices_to={'is_staff':True, 'is_superuser':False}, on_delete=models.CASCADE) 
    reviewer = models.ForeignKey(User, related_name="uploaded_evidence_reviewer", limit_choices_to={'is_staff':False, 'is_superuser':True}, on_delete=models.CASCADE)

class BuildinEvidence(models.Model):
    name     = models.CharField(max_length=50)   
    engagment = models.ForeignKey('engagment.Engagment', on_delete=models.CASCADE)
    content   = models.TextField()
    preparer = models.ForeignKey(User, related_name="buildin_evidence_preparer", limit_choices_to={'is_staff':True, 'is_superuser':False}, on_delete=models.CASCADE) 
    reviewer = models.ForeignKey(User, related_name="buildin_evidence_reviewer", limit_choices_to={'is_staff':False, 'is_superuser':True}, on_delete=models.CASCADE)

class Section(models.Model):
    evidence  = models.ForeignKey(BuildinEvidence, on_delete=models.CASCADE)
    name      = models.CharField(max_length=100)
    content   = models.TextField()
