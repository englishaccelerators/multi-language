
class ClassBillingPlan(models.Model):
    class_name = models.CharField(max_length=100, unique=True)
    plan_name = models.CharField(max_length=100)
    price_per_month = models.DecimalField(max_digits=6, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.class_name} - {self.plan_name}"
