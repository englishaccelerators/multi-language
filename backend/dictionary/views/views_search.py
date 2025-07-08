from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse
from dictionary.models import DictionaryEntry
from dictionary.constants import POS_LABELS

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
    return [f'{base_word}-{suffix.split(\"-\", 1)[1]}' for suffix in all_codes]

class DictionarySearchAPIView(APIView):
    def get(self, request):
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

# Optional legacy direct route (used by older versions)
def search_direct(request, word):
    results = DictionaryEntry.objects.filter(identifiercode__icontains=word)[:30]
    return JsonResponse([{
        "identifiercode": e.identifiercode,
        "output_value": e.output_value,
        "pos_code": e.pos_code
    } for e in results], safe=False)
