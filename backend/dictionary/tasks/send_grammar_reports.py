
from django.core.mail import send_mail
from django.contrib.auth.models import User
from .grammar_analytics import GrammarUsage
from django.db.models import Avg, Count

def send_grammar_report_emails():
    teacher_emails = User.objects.filter(is_staff=True).values_list('email', flat=True)

    for teacher in teacher_emails:
        summary_lines = []
        users = User.objects.filter(is_staff=False)
        for user in users:
            usage = GrammarUsage.objects.filter(user=user, completed=True)
            if usage.exists():
                completed = usage.count()
                avg_score = usage.aggregate(Avg('score'))['score__avg'] or 0
                summary_lines.append(f"{user.username}: {completed} lessons, Avg Score: {avg_score:.2f}")

        summary_text = "\n".join(summary_lines)
        send_mail(
            subject="📘 Weekly Grammar Progress Report",
            message=summary_text or "No activity this week.",
            from_email="noreply@english-dictionary.com",
            recipient_list=[teacher],
        )
