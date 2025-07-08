
from django.db import models
from django.contrib.auth.models import User

class DashboardPermission(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    can_view_invoices = models.BooleanField(default=False)
    can_manage_classes = models.BooleanField(default=False)
    can_approve_billing = models.BooleanField(default=False)

    def __str__(self):
        return f"Permissions for {self.user.username}"
