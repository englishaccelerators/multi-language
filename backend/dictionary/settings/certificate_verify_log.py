
from django.db import models
from django.contrib.auth.models import User

class CertificateVerifyLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verified_at = models.DateTimeField(auto_now_add=True)
    referrer = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} verified at {self.verified_at}"
