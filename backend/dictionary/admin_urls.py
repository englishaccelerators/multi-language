from django.urls import path
from .views import (
    quiz_format_catalog,
    group_quiz_assignment,
    generate_final_exam,
    submit_final_exam,
)

urlpatterns = [
    # 🛠️ Admin Quiz Configurations
    path('quiz-format-catalog/', quiz_format_catalog),
    path('group-quiz-assignment/', group_quiz_assignment),

    # 🧪 Final Exam Control
    path('final-exam/', generate_final_exam),
    path('final-exam/submit/', submit_final_exam),
]

path('tools/all/', AdminAllToolsView.as_view()),
path('tools/section/<str:section_code>/', ToolsBySectionAssignment.as_view()),

path('exam/generate/', generate_final_exam),
path('exam/submit/', submit_final_exam),

path('quiz/formats/', quiz_format_catalog),
path('quiz/assignment/', group_quiz_assignment),
