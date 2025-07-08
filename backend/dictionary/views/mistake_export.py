from django.http import HttpResponse
import csv
from dictionary.models import MistakeLog

def export_mistakes_csv(request):
    if not request.user.is_staff:
        return HttpResponse(status=403)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="mistakes.csv"'

    writer = csv.writer(response)
    writer.writerow(["User", "Tool", "Section", "Mistake", "Correct", "Type", "Date"])

    for m in MistakeLog.objects.all().order_by('-created_at'):
        writer.writerow([
            m.student.username,
            m.tool_code,
            m.section,
            m.input_given,
            m.correct_text,
            m.mistake_type,
            m.created_at.strftime('%Y-%m-%d %H:%M')
        ])

    return response
