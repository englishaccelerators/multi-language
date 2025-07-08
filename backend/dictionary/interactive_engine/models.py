from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class InteractiveTool(models.Model):
    tool_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    quiz_types = models.CharField(max_length=200)
    uses_identifiercode = models.BooleanField(default=False)
    uses_extra_data = models.BooleanField(default=False)
    audio_supported = models.BooleanField(default=False)
    is_assignable = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class ToolAssignment(models.Model):
    section_code = models.CharField(max_length=50)
    tool = models.ForeignKey(InteractiveTool, on_delete=models.CASCADE)
    is_enabled = models.BooleanField(default=True)

    class Meta:
        unique_together = ("section_code", "tool")

class ToolUsageLog(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    tool = models.ForeignKey(InteractiveTool, on_delete=models.SET_NULL, null=True)
    section = models.CharField(max_length=50)
    started_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    score = models.FloatField(null=True, blank=True)
