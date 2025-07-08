
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import FeatureToggle
from .serializers import FeatureToggleSerializer

class FeatureToggleViewSet(viewsets.ModelViewSet):
    serializer_class = FeatureToggleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = FeatureToggle.objects.all()
        if user.is_staff:
            return qs
        # Optional: Customize visibility rules by role here
        return qs.filter(feature_name__in=[
            'Dictionary',
            'AskGPT',
            'Vocabulary',
            'Grammar',
            'Spelling',
        ])


from rest_framework import viewsets
from .ai_models import AIToggleSuggestion
from .serializers import AIToggleSuggestionSerializer

class AIToggleSuggestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AIToggleSuggestion.objects.all().order_by('-created_at')
    serializer_class = AIToggleSuggestionSerializer


from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .ai_models import AIToggleSuggestion
from .serializers import AIToggleSuggestionSerializer

class AIToggleSuggestionViewSet(viewsets.ModelViewSet):
    serializer_class = AIToggleSuggestionSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return AIToggleSuggestion.objects.filter(confidence__gte=0.8).order_by('-created_at')


from rest_framework import generics
from .analytics_models import FeatureUsage
from .serializers import FeatureUsageSerializer
from django.db.models import Count
from rest_framework.response import Response

class FeatureUsageSummaryView(generics.GenericAPIView):
    def get(self, request):
        data = FeatureUsage.objects.values('feature_name').annotate(count=Count('id')).order_by('-count')
        return Response(data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .analytics_models import FeatureUsage
from .ai_models import AIToggleSuggestion

@api_view(['GET'])
def export_user_data(request):
    username = request.GET.get('user', None)
    if not username:
        return Response({'error': 'No username provided'}, status=400)
    
    usage = FeatureUsage.objects.filter(user=username).values()
    suggestions = AIToggleSuggestion.objects.filter(reason__icontains=username).values()
    return Response({
        'feature_usage': list(usage),
        'ai_suggestions': list(suggestions)
    })


from rest_framework import viewsets
from .billing_models import ClassBillingPlan
from .serializers import ClassBillingPlanSerializer

class ClassBillingPlanViewSet(viewsets.ModelViewSet):
    queryset = ClassBillingPlan.objects.all()
    serializer_class = ClassBillingPlanSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .billing_models import ClassBillingPlan

@api_view(['GET'])
def check_class_access(request):
    class_name = request.GET.get('class', '')
    feature = request.GET.get('feature', '')

    try:
        plan = ClassBillingPlan.objects.get(class_name=class_name, is_active=True)
        has_access = feature.lower() in plan.plan_name.lower()
        return Response({'class': class_name, 'feature': feature, 'access': has_access})
    except ClassBillingPlan.DoesNotExist:
        return Response({'class': class_name, 'feature': feature, 'access': False})


from .tasks import suggest_upgrade

@api_view(['GET'])
def check_class_access(request):
    class_name = request.GET.get('class', '')
    feature = request.GET.get('feature', '')

    try:
        plan = ClassBillingPlan.objects.get(class_name=class_name, is_active=True)
        has_access = feature.lower() in plan.plan_name.lower()
        if not has_access:
            suggest_upgrade(feature, class_name)
        return Response({'class': class_name, 'feature': feature, 'access': has_access})
    except ClassBillingPlan.DoesNotExist:
        suggest_upgrade(feature, class_name)
        return Response({'class': class_name, 'feature': feature, 'access': False})


from .invoice_models import ClassInvoice
from .serializers import ClassInvoiceSerializer
from rest_framework import viewsets

class ClassInvoiceViewSet(viewsets.ModelViewSet):
    queryset = ClassInvoice.objects.all().order_by('-issued_at')
    serializer_class = ClassInvoiceSerializer


import json
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .invoice_models import ClassInvoice

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = 'your_stripe_endpoint_secret_here'

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        return JsonResponse({'error': str(e)}, status=400)

    if event['type'] == 'invoice.payment_succeeded':
        data = event['data']['object']
        metadata = data.get('metadata', {})
        class_name = metadata.get('class_name')
        billing_month = metadata.get('billing_month')
        try:
            invoice = ClassInvoice.objects.get(class_name=class_name, billing_month=billing_month)
            invoice.paid = True
            invoice.save()
        except ClassInvoice.DoesNotExist:
            pass

    return JsonResponse({'status': 'success'}, status=200)


from django.http import HttpResponse
from .invoice_models import ClassInvoice

def track_invoice_open(request, invoice_id):
    try:
        invoice = ClassInvoice.objects.get(id=invoice_id)
        invoice.opened = True
        invoice.save()
    except ClassInvoice.DoesNotExist:
        pass
    pixel = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
    return HttpResponse(pixel, content_type='image/gif')


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .alert_models import InvoiceAlert
from .invoice_models import ClassInvoice

@api_view(['GET'])
def get_invoice_alert_status(request, invoice_id):
    try:
        invoice = ClassInvoice.objects.get(id=invoice_id)
        alert, created = InvoiceAlert.objects.get_or_create(invoice=invoice)
        return Response({'invoice_id': invoice.id, 'alert_shown': alert.alert_shown})
    except ClassInvoice.DoesNotExist:
        return Response({'error': 'Invoice not found'}, status=404)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permission_models import DashboardPermission

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_permissions(request):
    try:
        perms = DashboardPermission.objects.get(user=request.user)
        return Response({
            'can_view_invoices': perms.can_view_invoices,
            'can_manage_classes': perms.can_manage_classes,
            'can_approve_billing': perms.can_approve_billing
        })
    except DashboardPermission.DoesNotExist:
        return Response({
            'can_view_invoices': False,
            'can_manage_classes': False,
            'can_approve_billing': False
        })


from django.http import HttpResponseBadRequest
from .student_report import generate_student_report_pdf

def download_student_report(request):
    student_name = request.GET.get('student_name', '')
    if not student_name:
        return HttpResponseBadRequest('Missing student name')
    summary = {
        'Vocabulary': 'Complete',
        'Grammar': 'Intermediate',
        'Spelling': 'Strong',
        'XP': '2450',
        'Streak': '15 days'
    }
    return generate_student_report_pdf(student_name, summary)


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .leaderboard_models import StudentXP

@api_view(['GET'])
def leaderboard_list(request):
    results = StudentXP.objects.select_related('user').order_by('-xp')[:50]
    data = [
        {
            'id': xp.id,
            'username': xp.user.username,
            'xp': xp.xp,
            'streak': xp.streak,
        }
        for xp in results
    ]
    return Response(data)


from .certificates import generate_certificate
from django.http import HttpResponseBadRequest

def download_certificate(request):
    name = request.GET.get('name', '')
    reason = request.GET.get('reason', 'completing a major milestone')
    if not name:
        return HttpResponseBadRequest("Missing name")
    return generate_certificate(name, reason)
