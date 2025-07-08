from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dictionary.interactive_engine.models import InteractiveTool, ToolAssignment
from dictionary.interactive_engine.serializers import InteractiveToolSerializer, ToolAssignmentSerializer

class AdminAllToolsView(APIView):
    def get(self, request):
        tools = InteractiveTool.objects.all()
        return Response(InteractiveToolSerializer(tools, many=True).data)

class ToolsBySectionAssignment(APIView):
    def get(self, request, section_code):
        assignments = ToolAssignment.objects.filter(section_code=section_code)
        return Response(ToolAssignmentSerializer(assignments, many=True).data)
