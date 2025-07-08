
from rest_framework import viewsets, permissions
from .grammar_path_assigner import GrammarPath
from rest_framework.serializers import ModelSerializer

class GrammarPathSerializer(ModelSerializer):
    class Meta:
        model = GrammarPath
        fields = '__all__'

class GrammarPathViewSet(viewsets.ModelViewSet):
    queryset = GrammarPath.objects.all().order_by('-id')
    serializer_class = GrammarPathSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
