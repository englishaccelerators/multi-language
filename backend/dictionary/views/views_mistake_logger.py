# ✅ views_mistake_logger.py — Final Router for Mistake Logging
from django.urls import path
from dictionary.views.views_mistake_logger import LogMistakeView, StudentMistakeListView

urlpatterns = [
    path('log/', LogMistakeView.as_view()),
    path('student/', StudentMistakeListView.as_view()),
]
