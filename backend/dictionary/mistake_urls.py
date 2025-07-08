# ✅ dictionary/mistake_urls.py — URL patterns for logging mistakes

from django.urls import path
from dictionary.views.views_mistake_logger import LogMistakeView, StudentMistakeListView

urlpatterns = [
    path('log/', LogMistakeView.as_view(), name='log_mistake'),
    path('student/', StudentMistakeListView.as_view(), name='student_mistakes'),
]
