from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dictionary.models import (
    PrefixGroup, SuffixGroup, AdvancedRootGroup,
    VocabularyGroup, PronunciationGroup,
    SpellingGroup, RhythmRootGroup
)

@csrf_exempt
def get_prefix_groups(request): return _get_groups(PrefixGroup, request)

@csrf_exempt
def get_suffix_groups(request): return _get_groups(SuffixGroup, request)

@csrf_exempt
def get_advanced_root_groups(request): return _get_groups(AdvancedRootGroup, request)

@csrf_exempt
def get_vocabulary_groups(request): return _get_groups(VocabularyGroup, request)

@csrf_exempt
def get_pronunciation_groups(request): return _get_groups(PronunciationGroup, request)

@csrf_exempt
def get_spelling_groups(request): return _get_groups(SpellingGroup, request)

@csrf_exempt
def get_rhythm_groups(request): return _get_groups(RhythmRootGroup, request)

def _get_groups(Model, request):
    user = request.user
    is_subscribed = getattr(user, 'subscription', None) and user.subscription.active if user.is_authenticated else False
    result = []

    for group in Model.objects.all():
        if group.is_free or is_subscribed:
            entry = group.__dict__.copy()
            entry.pop('_state', None)
            if hasattr(group, 'words'):
                entry['words'] = [w.word for w in group.words.all()]
            elif hasattr(group, 'examples'):
                entry['examples'] = [e.word for e in group.examples.all()]
            result.append(entry)

    return JsonResponse(result, safe=False)

def get_active_codes(section, Model):
    from dictionary.models import GroupQuizAssignment
    enabled = GroupQuizAssignment.objects.filter(group_type=section, is_enabled=True)
    codes = list(enabled.values_list("group_code", flat=True))
    return codes
