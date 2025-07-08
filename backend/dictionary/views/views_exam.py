from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json, random
from .views_group import get_active_codes
from dictionary.models import FinalExamResult, FinalExamConfig, SectionQuestionCount

@csrf_exempt
@require_http_methods(["GET"])
def generate_final_exam(request):
    from dictionary.models import GroupQuizAssignment, PrefixGroup, SuffixGroup, AdvancedRootGroup, VocabularyGroup, PronunciationGroup, SpellingGroup, RhythmRootGroup

    section_map = {
        "prefix": PrefixGroup,
        "suffix": SuffixGroup,
        "root": AdvancedRootGroup,
        "vocabulary": VocabularyGroup,
        "pronunciation": PronunciationGroup,
        "spelling": SpellingGroup,
        "rhythm": RhythmRootGroup,
    }

    all_questions = []
    for section, model in section_map.items():
        codes = get_active_codes(section, model)
        selected = random.sample(codes, min(len(codes), 5))
        for code in selected:
            all_questions.append({
                "section": section,
                "word": code,
                "type": "multiple-choice"
            })

    return JsonResponse({
        "title": "Comprehensive Final Exam",
        "questions": all_questions
    })

@csrf_exempt
@require_http_methods(["POST"])
def submit_final_exam(request):
    from django.contrib.auth import get_user_model
    try:
        data = json.loads(request.body)
        user = request.user if request.user.is_authenticated else None
        if not user:
            return JsonResponse({"error": "Login required"}, status=401)

        FinalExamResult.objects.create(
            user=user,
            score=data["score"],
            total_questions=data["total"],
            correct_answers=data["correct"],
            breakdown=data["breakdown"]
        )
        return JsonResponse({"status": "saved"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
