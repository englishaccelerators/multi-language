from django.urls import path
from .views import (
    InteractiveToolListView,
    ToolsBySectionView,
    AssignToolToSectionView,
    LogToolUsageView
)

urlpatterns = [
    path('tools/', InteractiveToolListView.as_view(), name='tool-list'),
    path('tools/by-section/<str:section_code>/', ToolsBySectionView.as_view(), name='tools-by-section'),
    path('tools/assign/', AssignToolToSectionView.as_view(), name='assign-tool'),
    path('tools/log-usage/', LogToolUsageView.as_view(), name='log-tool-usage'),
]
