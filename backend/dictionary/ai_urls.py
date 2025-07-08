
from django.urls import path
from dictionary.views.ai_gpt_view import AskGPTView

urlpatterns = [
    path('ask/', AskGPTView.as_view())
]
