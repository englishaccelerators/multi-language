
from django.urls import path
from dictionary.views.analytics_view import LogAnalyticsView

urlpatterns = [
    path('log/', LogAnalyticsView.as_view())
]

from dictionary.views.export_analytics import ExportAnalyticsCSV
urlpatterns += [path('export-csv/', ExportAnalyticsCSV.as_view())]
