
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .user_submitted_examples import GrammarExampleSubmission
from rest_framework.serializers import ModelSerializer

class GrammarExampleSubmissionSerializer(ModelSerializer):
    class Meta:
        model = GrammarExampleSubmission
        fields = '__all__'

class GrammarExampleSubmissionViewSet(viewsets.ModelViewSet):
    queryset = GrammarExampleSubmission.objects.all().order_by('-submitted_at')
    serializer_class = GrammarExampleSubmissionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
