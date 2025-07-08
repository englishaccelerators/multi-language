
from django.core.mail import send_mail
from .certificate_log import CertificateLog
from django.utils.timezone import now, timedelta

def remind_expiring_certificates():
    cutoff = now() - timedelta(days=365)
    expiring = CertificateLog.objects.filter(downloaded_at__lt=cutoff, sent_email=False)

    for log in expiring:
        send_mail(
            subject="🎓 Certificate Renewal Reminder",
            message="Your grammar certificate is now 1 year old. Please revisit your lessons or retake the path to renew it.",
            from_email="noreply@english-dictionary.com",
            recipient_list=[log.user.email]
        )
        log.sent_email = True
        log.save()
