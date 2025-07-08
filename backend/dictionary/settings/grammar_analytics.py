
from django.db import models
from django.contrib.auth.models import User

class GrammarUsage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson_id = models.IntegerField()
    score = models.FloatField(default=0)
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Lesson {self.lesson_id} - {self.score}"
