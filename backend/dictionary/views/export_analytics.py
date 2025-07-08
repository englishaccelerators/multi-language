
import os
import csv
import json
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser

class ExportAnalyticsCSV(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        log_path = os.path.join(os.path.dirname(__file__), '..', 'analytics_log.json')
        if not os.path.exists(log_path):
            return HttpResponse("No analytics data found.", content_type="text/plain")

        with open(log_path, "r") as f:
            data = json.load(f)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="analytics_export.csv"'
        writer = csv.DictWriter(response, fieldnames=list(data[0].keys()) if data else [])
        writer.writeheader()
        for entry in data:
            writer.writerow(entry)
        return response
