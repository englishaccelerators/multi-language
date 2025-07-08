
from django.db import models
from django.contrib.auth.models import User

class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_email = models.EmailField()
    receive_reports = models.BooleanField(default=True)

    def __str__(self):
        return f"Parent of {self.student_email}"
