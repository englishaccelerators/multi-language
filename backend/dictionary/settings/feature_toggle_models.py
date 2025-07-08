
class AdminFeatureToggle(models.Model):
    feature_name = models.CharField(max_length=100, unique=True)
    is_enabled = models.BooleanField(default=False)
    category = models.CharField(max_length=100, default='core')

    def __str__(self):
        return f"{self.feature_name} ({'Enabled' if self.is_enabled else 'Disabled'})"
