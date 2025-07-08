
from django.db import models
from django.contrib.auth.models import User

class CertificateLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    downloaded_at = models.DateTimeField(auto_now_add=True)
    sent_email = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.downloaded_at}"
