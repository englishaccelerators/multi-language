
from django.db import models
from django.contrib.auth.models import User

class GrammarPath(models.Model):
    title = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grammar_paths")
    assigned_to_class = models.CharField(max_length=100, blank=True, null=True)
    assigned_to_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="assigned_grammar_paths")
    lesson_ids = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
