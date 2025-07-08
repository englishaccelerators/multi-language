
import os
import json
import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from dictionary.models import DictionaryEntry
from django.db.models import Q

# Load OpenAI Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Load control settings
AI_CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'ai_tools_config.json')
with open(AI_CONFIG_PATH, "r") as conf_file:
    AI_CONFIG = json.load(conf_file)

class AskGPTView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({'error': 'Prompt is required'}, status=400)

        word = self.extract_word_from_prompt(prompt)

        # STEP 1: Look for word in dictionary DB
        if word:
            entry = DictionaryEntry.objects.filter(
                Q(identifiercode__icontains="-D") &
                Q(output_value__iexact=word)
            ).first()
            if entry:
                return Response({
                    "answer": f"Definition of '{word}': {entry.output_value}"
                })

        # STEP 2: If fallback is allowed, use GPT
        if AI_CONFIG.get("askgpt_enabled") and AI_CONFIG.get("fallback_enabled"):
            try:
                response = openai.ChatCompletion.create(
                    model='gpt-3.5-turbo',
                    messages=[
                        {'role': 'system', 'content': 'You are a helpful assistant for English learners.'},
                        {'role': 'user', 'content': prompt}
                    ]
                )
                answer = response.choices[0].message.content
                return Response({'answer': answer})
            except Exception as e:
                return Response({'error': str(e)}, status=500)

        return Response({'error': 'This AI tool is currently disabled by admin.'}, status=403)

    def extract_word_from_prompt(self, prompt):
        prompt = prompt.lower()
        if "what does" in prompt and "mean" in prompt:
            parts = prompt.replace("?", "").split()
            if "does" in parts and "mean" in parts:
                try:
                    return parts[parts.index("does") + 1].strip("'"")
                except IndexError:
                    return None
        return None
