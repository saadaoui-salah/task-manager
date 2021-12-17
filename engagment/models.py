from django.db import models
from django.contrib.auth.models import User


class Engagment(models.Model):
    name            = models.CharField(max_length=100)
    report_date     = models.DateTimeField(auto_now=False, auto_now_add=False)
    invited_members = models.ManyToManyField(User)  

    def __str__(self):
        return self.name
    