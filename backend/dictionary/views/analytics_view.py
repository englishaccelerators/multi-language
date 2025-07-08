
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import json
import os

class LogAnalyticsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        log_file = os.path.join(os.path.dirname(__file__), '..', 'analytics_log.json')
        try:
            if os.path.exists(log_file):
                with open(log_file, 'r') as f:
                    existing = json.load(f)
            else:
                existing = []

            existing.append(data)

            with open(log_file, 'w') as f:
                json.dump(existing, f, indent=2)

            return Response({"status": "logged"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
