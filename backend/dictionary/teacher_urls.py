from django.urls import path
from .views import (
    # Class & Assignments
    create_class,
    assign_quiz,
    assign_quiz_to_class,
    view_teacher_classes,

    # Dashboard Views
    get_teacher_dashboard,
    teacher_dashboard,
    review_class_performance,

    # Export
    export_quiz_results_csv,
)

urlpatterns = [
    # ✅ Class Management
    path('create-class/', create_class),
    path('classes/', view_teacher_classes),

    # ✅ Dashboard Views
    path('dashboard/', get_teacher_dashboard),            # legacy
    path('dashboard-overview/', teacher_dashboard),       # updated

    # ✅ Assignments
    path('assign-quiz/', assign_quiz),
    path('assign-to-class/', assign_quiz_to_class),

    # ✅ Analytics
    path('performance/', review_class_performance),

    # ✅ CSV Export
    path('export-csv/', export_quiz_results_csv),
]
