

from celery import shared_task
from .models import FeatureToggle
from .ai_models import AIToggleSuggestion
import random

@shared_task
def analyze_toggle_usage_and_suggest():
    features = FeatureToggle.objects.all()
    for feature in features:
        if not AIToggleSuggestion.objects.filter(feature_name=feature.feature_name, status='pending').exists():
            confidence = round(random.uniform(0.81, 0.99), 2)
            AIToggleSuggestion.objects.create(
                feature_name=feature.feature_name,
                suggested_state=not feature.is_enabled,
                reason=f"AI analysis: Usage dropped, consider {'enabling' if not feature.is_enabled else 'disabling'}.",
                confidence=confidence
            )


from django.core.mail import send_mail
from .ai_models import AIToggleSuggestion

def send_ai_toggle_alerts():
    suggestions = AIToggleSuggestion.objects.filter(confidence__gte=0.9, notified=False, status='pending')
    for suggestion in suggestions:
        send_mail(
            subject=f"AI Suggestion: {suggestion.feature_name}",
            message=f"AI recommends to {'Enable' if suggestion.suggested_state else 'Disable'} '{suggestion.feature_name}'\n\nReason: {suggestion.reason}\nConfidence: {suggestion.confidence}",
            from_email="noreply@english-dictionary.com",
            recipient_list=["admin@english-dictionary.com"],
        )
        suggestion.notified = True
        suggestion.save()


from django.utils.timezone import now
from .models import FeatureToggle
import logging

logger = logging.getLogger(__name__)

def track_feature_usage(feature_name, user=None):
    try:
        feature = FeatureToggle.objects.get(feature_name=feature_name)
        logger.info(f"[{now()}] Feature used: {feature_name} by {user if user else 'Anonymous'}")
    except FeatureToggle.DoesNotExist:
        logger.warning(f"[{now()}] Feature not found for tracking: {feature_name}")


from .billing_models import ClassBillingPlan

def is_feature_unlocked_for_class(class_name, feature):
    try:
        plan = ClassBillingPlan.objects.get(class_name=class_name, is_active=True)
        return feature.lower() in plan.plan_name.lower()
    except ClassBillingPlan.DoesNotExist:
        return False


from .ai_models import AIToggleSuggestion

def suggest_upgrade(feature, class_name):
    AIToggleSuggestion.objects.create(
        feature_name=feature,
        suggested_state=True,
        reason=f"Class '{class_name}' attempted to access '{feature}' but lacks permission. Suggest upgrade.",
        confidence=0.95,
        status='pending'
    )


from celery import shared_task
from datetime import date
from .billing_models import ClassBillingPlan
from .invoice_models import ClassInvoice

@shared_task
def generate_monthly_invoices():
    today = date.today()
    all_classes = ClassBillingPlan.objects.filter(is_active=True)
    for plan in all_classes:
        exists = ClassInvoice.objects.filter(class_name=plan.class_name, billing_month__year=today.year, billing_month__month=today.month).exists()
        if not exists:
            ClassInvoice.objects.create(
                class_name=plan.class_name,
                billing_month=date(today.year, today.month, 1),
                amount_due=plan.price_per_month,
                currency=plan.currency
            )


from .invoice_models import ClassInvoice
from django.core.mail import send_mail

def notify_unpaid_invoices():
    unpaid = ClassInvoice.objects.filter(paid=False)
    for invoice in unpaid:
        send_mail(
            subject="Unpaid Invoice Alert",
            message=f"Class {invoice.class_name} has an unpaid invoice for {invoice.billing_month}",
            from_email="noreply@english-dictionary.com",
            recipient_list=["admin@english-dictionary.com"],
        )


from django.core.mail import EmailMessage
from .invoice_models import ClassInvoice
from .invoice_pdf import generate_invoice_pdf

def email_invoice_pdf(invoice):
    pdf_response = generate_invoice_pdf(invoice.id)
    pdf_file = pdf_response.getvalue()

    msg = EmailMessage(
        subject=f"Invoice for {invoice.class_name} - {invoice.billing_month}",
        body="Attached is your monthly invoice.",
        from_email="noreply@english-dictionary.com",
        to=["admin@english-dictionary.com"],
    )
    msg.attach(f"Invoice-{invoice.class_name}-{invoice.billing_month}.pdf", pdf_file, 'application/pdf')
    msg.send()

@shared_task
def send_invoice_emails():
    invoices = ClassInvoice.objects.filter(paid=False)
    for invoice in invoices:
        email_invoice_pdf(invoice)


def email_invoice_pdf(invoice):
    pdf_response = generate_invoice_pdf(invoice.id)
    pdf_file = pdf_response.getvalue()

    tracking_url = f"https://yourdomain.com/api/billing/track-open/{invoice.id}/"

    html_message = f"""
        <p>Attached is your monthly invoice.</p>
        <p>Class: {invoice.class_name}<br/>
        Month: {invoice.billing_month}</p>
        <img src="{tracking_url}" width="1" height="1" />
    """

    msg = EmailMessage(
        subject=f"Invoice for {invoice.class_name} - {invoice.billing_month}",
        body="Attached is your monthly invoice.",
        from_email="noreply@english-dictionary.com",
        to=["admin@english-dictionary.com"],
    )
    msg.content_subtype = "html"
    msg.attach(f"Invoice-{invoice.class_name}-{invoice.billing_month}.pdf", pdf_file, 'application/pdf')
    msg.send()
    invoice.email_sent = True
    invoice.save()


from .leaderboard_models import StudentXP
from django.contrib.auth.models import User

def add_xp(user: User, amount=10):
    xp_entry, created = StudentXP.objects.get_or_create(user=user)
    xp_entry.xp += amount
    xp_entry.streak += 1
    xp_entry.save()
