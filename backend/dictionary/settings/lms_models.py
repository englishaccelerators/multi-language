
from django.db import models

class LMSIntegration(models.Model):
    lms_name = models.CharField(max_length=100)
    api_key = models.CharField(max_length=255)
    school_name = models.CharField(max_length=255)
    synced_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.lms_name} - {self.school_name}"
