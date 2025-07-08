
class ClassInvoice(models.Model):
    class_name = models.CharField(max_length=100)
    billing_month = models.DateField()
    amount_due = models.DecimalField(max_digits=6, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    paid = models.BooleanField(default=False)
    issued_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.class_name} - {self.billing_month} - {'Paid' if self.paid else 'Unpaid'}"



# Extend invoice model for multi-admin roles
from django.contrib.auth.models import User

class ClassInvoice(models.Model):
    class_name = models.CharField(max_length=100)
    billing_month = models.DateField()
    amount_due = models.DecimalField(max_digits=6, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    paid = models.BooleanField(default=False)
    issued_at = models.DateTimeField(auto_now_add=True)
    approved_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='approved_invoices')

    def __str__(self):
        return f"{self.class_name} - {self.billing_month} - {'Paid' if self.paid else 'Unpaid'}"



from django.db import models

class ClassInvoice(models.Model):
    class_name = models.CharField(max_length=100)
    billing_month = models.DateField()
    amount_due = models.DecimalField(max_digits=6, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    paid = models.BooleanField(default=False)
    issued_at = models.DateTimeField(auto_now_add=True)
    approved_by = models.ForeignKey('auth.User', null=True, blank=True, on_delete=models.SET_NULL, related_name='approved_invoices')
    email_sent = models.BooleanField(default=False)
    opened = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.class_name} - {self.billing_month} - {'Paid' if self.paid else 'Unpaid'}"
