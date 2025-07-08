
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeatureToggleViewSet

router = DefaultRouter()
router.register(r'feature-toggles', FeatureToggleViewSet, basename='feature-toggle')

urlpatterns = [
    path('', include(router.urls)),
]

from .views import AIToggleSuggestionViewSet
router.register(r'ai-toggle-suggestions', AIToggleSuggestionViewSet, basename='ai-toggle')

from .views import FeatureUsageSummaryView
urlpatterns += [path('analytics/feature-usage/', FeatureUsageSummaryView.as_view())]

urlpatterns += [path('gdpr/export/', export_user_data)]
from .views import ClassBillingPlanViewSet
router.register(r'class-billing', ClassBillingPlanViewSet, basename='class-billing')

urlpatterns += [path('billing/check/', check_class_access)]
from .views import ClassInvoiceViewSet
router.register(r'class-invoices', ClassInvoiceViewSet, basename='class-invoices')

urlpatterns += [path('billing/stripe-webhook/', stripe_webhook)]

from django.urls import path
from .invoice_pdf import generate_invoice_pdf

def download_invoice(request, invoice_id):
    return generate_invoice_pdf(invoice_id)

urlpatterns += [
    path('billing/download-invoice/<int:invoice_id>/', download_invoice)
]


from .invoice_pdf import download_batch_invoices
urlpatterns += [path('billing/download-batch/', download_batch_invoices)]

urlpatterns += [path('billing/track-open/<int:invoice_id>/', track_invoice_open)]
urlpatterns += [path('billing/alert-status/<int:invoice_id>/', get_invoice_alert_status)]
urlpatterns += [path('dashboard/permissions/', get_user_permissions)]
urlpatterns += [path('student-report/download', download_student_report)]
urlpatterns += [path('leaderboard/', leaderboard_list)]
urlpatterns += [path('certificate/download/', download_certificate)]