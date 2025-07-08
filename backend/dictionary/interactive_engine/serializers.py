from rest_framework import serializers
from .models import InteractiveTool, ToolAssignment, ToolUsageLog

class InteractiveToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteractiveTool
        fields = '__all__'

class ToolAssignmentSerializer(serializers.ModelSerializer):
    tool = InteractiveToolSerializer()

    class Meta:
        model = ToolAssignment
        fields = ['section_code', 'tool', 'is_enabled']

class ToolUsageLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolUsageLog
        fields = '__all__'
