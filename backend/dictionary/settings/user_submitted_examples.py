
from django.db import models
from django.contrib.auth.models import User

class GrammarExampleSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sentence = models.TextField()
    grammar_tag = models.CharField(max_length=100)
    approved = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.grammar_tag} → {self.sentence[:50]}"
