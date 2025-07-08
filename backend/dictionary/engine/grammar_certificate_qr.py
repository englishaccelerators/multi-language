
import qrcode
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from django.http import FileResponse

def generate_grammar_certificate_with_qr(username):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    cert_url = f"https://englishdictionaryapp.com/cert/verify/{username}"
    qr = qrcode.make(cert_url)
    qr_buffer = BytesIO()
    qr.save(qr_buffer)
    qr_img = ImageReader(qr_buffer)

    p.setFont("Helvetica-Bold", 22)
    p.drawCentredString(300, 730, "Certificate of Grammar Mastery")
    p.setFont("Helvetica", 14)
    p.drawCentredString(300, 690, f"Awarded to: {username}")
    p.drawCentredString(300, 670, "For completing all grammar lessons")
    p.drawImage(qr_img, 250, 540, width=100, height=100)

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{username}-qr-certificate.pdf")
