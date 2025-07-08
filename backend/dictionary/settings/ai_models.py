
from django.db import models

class AIToggleSuggestion(models.Model):
    feature_name = models.CharField(max_length=100)
    suggested_state = models.BooleanField()
    reason = models.TextField()
    confidence = models.FloatField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')
    notified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Suggest {'ON' if self.suggested_state else 'OFF'} for {self.feature_name}"
