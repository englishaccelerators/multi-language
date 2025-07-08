from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import InteractiveTool, ToolAssignment, ToolUsageLog
from .serializers import InteractiveToolSerializer, ToolAssignmentSerializer, ToolUsageLogSerializer

class InteractiveToolListView(generics.ListAPIView):
    queryset = InteractiveTool.objects.filter(is_active=True)
    serializer_class = InteractiveToolSerializer

class ToolsBySectionView(APIView):
    def get(self, request, section_code):
        assignments = ToolAssignment.objects.filter(section_code=section_code, is_enabled=True)
        serializer = ToolAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

class AssignToolToSectionView(APIView):
    def post(self, request):
        tool_code = request.data.get('tool_code')
        section_code = request.data.get('section_code')
        is_enabled = request.data.get('is_enabled', True)

        try:
            tool = InteractiveTool.objects.get(tool_code=tool_code)
            obj, created = ToolAssignment.objects.update_or_create(
                section_code=section_code,
                tool=tool,
                defaults={'is_enabled': is_enabled}
            )
            return Response({'status': 'updated' if not created else 'created'}, status=200)
        except InteractiveTool.DoesNotExist:
            return Response({'error': 'Tool not found'}, status=404)

class LogToolUsageView(generics.CreateAPIView):
    queryset = ToolUsageLog.objects.all()
    serializer_class = ToolUsageLogSerializer
