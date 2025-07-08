
from django.db import models

class FeatureUsage(models.Model):
    feature_name = models.CharField(max_length=100)
    used_at = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.feature_name} used at {self.used_at}"
