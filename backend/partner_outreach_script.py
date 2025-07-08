import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Replace these values
SMTP_SERVER = "smtp.yourprovider.com"
SMTP_PORT = 587
EMAIL = "info@yourdomain.com"
PASSWORD = "your_email_password"

recipients = [
    {"name": "John", "email": "john@example.com"},
    {"name": "Jane", "email": "jane@example.com"}
]

for r in recipients:
    msg = MIMEMultipart()
    msg["From"] = EMAIL
    msg["To"] = r["email"]
    msg["Subject"] = "English Dictionary Platform – Partnership"

    body = f"""
Hi {r['name']},

I'm reaching out to introduce the English Vocabulary Dictionary – a platform built for learners aged 15–27 with grammar, roots, AI tools, and school dashboards.

Would you like a walkthrough or demo?

Sincerely,
[Your Name]
    """
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL, PASSWORD)
        server.sendmail(EMAIL, r["email"], msg.as_string())

print("Emails sent.")