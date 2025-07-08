
from rest_framework.response import Response
from rest_framework.views import APIView
from dictionary.tasks import send_test_log

class TestCeleryView(APIView):
    def get(self, request):
        send_test_log.delay("Hello from Celery")
        return Response({"status": "Task triggered"})
