from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
import json, random

from .models import (
    DictionaryEntry,
    PrefixGroup, PrefixWord,
    SuffixGroup, SuffixExample,
    AdvancedRootGroup, AdvancedRootWord,
    VocabularyGroup, VocabularyWord,
    PronunciationGroup, PronunciationWord,
    SpellingGroup, SpellingWord,
    RhythmRootGroup, RhythmWord,
    QuizFormat, GroupQuizAssignment,
    AdminAuthority,
    FinalExamConfig, SectionQuestionCount, FinalExamResult
)

# -------------------------------
# ✅ 1. Search APIs
# -------------------------------
@csrf_exempt
def search_entries(request):
    word = request.GET.get('word', '').strip().lower()
    if not word:
        return JsonResponse({"error": "No word provided."}, status=400)
    results = DictionaryEntry.objects.filter(identifiercode__icontains=word)[:30]
    return JsonResponse([{
        "identifiercode": e.identifiercode,
        "output_value": e.output_value,
        "pos_code": e.pos_code
    } for e in results], safe=False)

@csrf_exempt
def search_direct(request, word):
    results = DictionaryEntry.objects.filter(identifiercode__icontains=word)[:30]
    return JsonResponse([{
        "identifiercode": e.identifiercode,
        "output_value": e.output_value,
        "pos_code": e.pos_code
    } for e in results], safe=False)

POS_LABELS = {
    'v': 'Verb', 'N': 'Noun', 'Adj': 'Adjective', 'Adv': 'Adverb',
    'Pron': 'Pronoun', 'Prep': 'Preposition', 'Conj': 'Conjunction',
    'Interj': 'Interjection', 'Cont': 'Contraction', 'Phr': 'Phrase',
    'Abb': 'Abbreviation', 'Art': 'Article', 'extra': 'Extra',
}

def generate_identifiercodes(base_word):
    def group(pos):
        return [
            f'{pos}-{i}', f'{pos}-{i}-a-ap-UK', f'{pos}-{i}-a-ap-US',
            f'{pos}-{i}-a-ParSp', f'{pos}-{i}-D', f'{pos}-{i}-gram'
        ] + [f'{pos}-{i}-D-E-{j}' for j in range(1, 10)]
    all_codes = []
    for i in range(1, 10):
        all_codes += group(f'v-{i}') + group(f'n-{i}') + group(f'Adj-{i}') + group(f'Adv-{i}')
    for pos in ['Pron', 'Prep', 'Conj', 'Interj', 'Cont', 'Phr', 'Abb', 'Art']:
        for i in range(1, 10):
            all_codes += group(f'{pos}-{i}')
    return [f'{base_word}-{suffix.split("-", 1)[1]}' for suffix in all_codes]

class DictionarySearchAPIView(APIView):
    def get(self, request, *args, **kwargs):
        word = request.GET.get('word', '').strip().lower()
        if not word:
            return Response({"error": "No word provided."}, status=status.HTTP_400_BAD_REQUEST)

        grouped_entries = {}
        identifiercodes = generate_identifiercodes(word)

        with connection.cursor() as cursor:
            format_strings = ','.join(['%s'] * len(identifiercodes))
            cursor.execute(f"""
                SELECT identifiercode, output_value, audio_uk, audio_us, ipa_uk, ipa_us, definition, example, pos_code
                FROM dictionary_dictionaryentry
                WHERE identifiercode IN ({format_strings})
            """, identifiercodes)
            rows = cursor.fetchall()

            cursor.execute("""
                SELECT identifiercode, output_value
                FROM dictionary_dictionaryentry
                WHERE identifiercode LIKE %s AND output_value ILIKE %s
            """, [f'%extra%', f'%{word}%'])
            extra_rows = cursor.fetchall()

        for code, val, au, aus, ipa_uk, ipa_us, definition, example, pos in rows:
            if "-D-E-" in code:
                pos_code = code.split("-")[1]
                label = POS_LABELS.get(pos_code, pos_code)
                if label in grouped_entries and grouped_entries[label]:
                    grouped_entries[label][-1]["examples"].append({
                        "text": val,
                        "audio_url_uk": f"https://s3.amazonaws.com/exampleenglishfordictionary/UK/{code}-UK.mp3",
                        "audio_url_us": f"https://s3.amazonaws.com/exampleenglishfordictionary/US/{code}-US.mp3"
                    })
            elif "-D" in code and "-E-" not in code:
                pos_code = code.split("-")[1]
                label = POS_LABELS.get(pos_code, pos_code)
                grouped_entries.setdefault(label, []).append({
                    "definition": val,
                    "ipa_uk": ipa_uk,
                    "ipa_us": ipa_us,
                    "audio_url_uk": f"https://s3.amazonaws.com/newfileaudio/words/uk/{word}.mp3",
                    "audio_url_us": f"https://s3.amazonaws.com/newfileaudio/words/us/{word}.mp3",
                    "examples": []
                })

        if extra_rows:
            grouped_entries.setdefault("Extra", [])
            for code, val in extra_rows:
                if "-D-E-" in code:
                    grouped_entries["Extra"].append({
                        "definition": "",
                        "audio_url_uk": None,
                        "audio_url_us": None,
                        "examples": [{
                            "text": val,
                            "audio_url_uk": f"https://s3.amazonaws.com/exampleenglishfordictionary/UK/{code}-UK.mp3",
                            "audio_url_us": f"https://s3.amazonaws.com/exampleenglishfordictionary/US/{code}-US.mp3"
                        }]
                    })

        return Response({"grouped_entries": grouped_entries}, status=status.HTTP_200_OK)

# -------------------------------
# ✅ 2. Group API Helper
# -------------------------------
def _get_groups(Model, name, request):
    user = request.user
    is_subscribed = getattr(user, 'subscription', None) and user.subscription.active if user.is_authenticated else False
    result = []

    groups = Model.objects.all()
    for g in groups:
        if g.is_free or is_subscribed:
            entry = g.__dict__.copy()
            entry.pop('_state', None)
            if hasattr(g, 'words'):
                entry['words'] = [w.word for w in g.words.all()]
            elif hasattr(g, 'examples'):
                entry['examples'] = [e.word for e in g.examples.all()]
            result.append(entry)

    return JsonResponse(result, safe=False)

# Prefixed endpoints
@csrf_exempt
def get_prefix_groups(request): return _get_groups(PrefixGroup, "prefix", request)

@csrf_exempt
def get_suffix_groups(request): return _get_groups(SuffixGroup, "suffix", request)

@csrf_exempt
def get_advanced_root_groups(request): return _get_groups(AdvancedRootGroup, "root", request)

@csrf_exempt
def get_vocabulary_groups(request): return _get_groups(VocabularyGroup, "vocabulary", request)

@csrf_exempt
def get_pronunciation_groups(request): return _get_groups(PronunciationGroup, "pronunciation", request)

@csrf_exempt
def get_spelling_groups(request): return _get_groups(SpellingGroup, "spelling", request)

@csrf_exempt
def get_rhythm_groups(request): return _get_groups(RhythmRootGroup, "rhythm", request)

# -------------------------------
# ✅ 3. Admin Quiz Management
# -------------------------------
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

# -------------------------------
# ✅ 4. Final Exam Generator
# -------------------------------
@csrf_exempt
@require_http_methods(["GET"])
def generate_final_exam(request):
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
        enabled = GroupQuizAssignment.objects.filter(group_type=section, is_enabled=True)
        codes = list(enabled.values_list("group_code", flat=True))
        selected = random.sample(codes, min(len(codes), 5))
        for code in selected:
            all_questions.append({
                "section": section,
                "word": code,
                "type": "type_the_word"
            })

    return JsonResponse({
        "title": "Comprehensive Final Exam",
        "questions": all_questions
    })

@csrf_exempt
@require_http_methods(["POST"])
def submit_final_exam(request):
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
