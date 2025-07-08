from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from dictionary.models import QuizFormat, GroupQuizAssignment

@csrf_exempt
@require_http_methods(["GET"])
def quiz_format_catalog(request):
    formats = QuizFormat.objects.all()
    return JsonResponse([{
        "code": f.code,
        "label": f.label,
        "description": f.description
    } for f in formats], safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def group_quiz_assignment(request):
    if request.method == "GET":
        group_type = request.GET.get("group_type")
        group_code = request.GET.get("group_code")
        if not group_type or not group_code:
            return JsonResponse({"error": "group_type and group_code are required."}, status=400)

        assignments = GroupQuizAssignment.objects.filter(group_type=group_type, group_code=group_code)
        return JsonResponse([{
            "id": a.id,
            "group_type": a.group_type,
            "group_code": a.group_code,
            "quiz_format": a.quiz_format.code,
            "is_enabled": a.is_enabled
        } for a in assignments], safe=False)

    try:
        body = json.loads(request.body)
        quiz_format = QuizFormat.objects.get(code=body["quiz_format"])
        assignment, created = GroupQuizAssignment.objects.update_or_create(
            group_type=body["group_type"],
            group_code=body["group_code"],
            quiz_format=quiz_format,
            defaults={"is_enabled": body["is_enabled"]}
        )
        return JsonResponse({"status": "created" if created else "updated"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
