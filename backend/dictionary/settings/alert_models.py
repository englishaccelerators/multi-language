
from django.db import models

class InvoiceAlert(models.Model):
    invoice = models.OneToOneField('ClassInvoice', on_delete=models.CASCADE)
    alert_shown = models.BooleanField(default=False)

    def __str__(self):
        return f"Alert for Invoice {self.invoice.id}"
