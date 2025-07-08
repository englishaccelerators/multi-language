
from .grammar_completion_certificate import generate_grammar_certificate
from django.core.mail import EmailMessage

def send_certificate_email(user):
    response = generate_grammar_certificate(user.username)
    pdf_bytes = response.getvalue()

    email = EmailMessage(
        subject="🎓 Your Grammar Mastery Certificate",
        body="Congratulations! Attached is your official certificate.",
        from_email="noreply@english-dictionary.com",
        to=[user.email],
    )
    email.attach(f"{user.username}-grammar-certificate.pdf", pdf_bytes, "application/pdf")
    email.send()
