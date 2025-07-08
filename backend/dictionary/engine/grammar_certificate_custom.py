
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from django.http import FileResponse
from .certificate_id_generator import generate_certificate_id

def generate_custom_certificate(user):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    # Background (placeholder - replace with actual file if exists)
    try:
        bg = ImageReader('certificate_background.png')  # must be in the same dir or static path
        p.drawImage(bg, 0, 0, width=612, height=792)
    except:
        pass  # fallback to plain white

    cert_id = generate_certificate_id(user.id)
    p.setFont("Helvetica-Bold", 22)
    p.drawCentredString(300, 730, "Certificate of Grammar Mastery")
    p.setFont("Helvetica", 14)
    p.drawCentredString(300, 690, f"Awarded to: {user.username}")
    p.drawCentredString(300, 670, f"Certificate ID: {cert_id}")
    p.drawCentredString(300, 640, "For completing all assigned grammar paths")
    p.drawCentredString(300, 600, "Powered by the Brilliant English Dictionary")

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{user.username}-cert-{cert_id}.pdf")
