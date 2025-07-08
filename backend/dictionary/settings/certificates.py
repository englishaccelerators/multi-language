
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import FileResponse

def generate_certificate(student_name, reason):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setFont("Helvetica-Bold", 20)
    p.drawCentredString(300, 720, "Certificate of Achievement")
    p.setFont("Helvetica", 14)
    p.drawCentredString(300, 680, f"Presented to {student_name}")
    p.drawCentredString(300, 650, f"For {reason}")
    p.drawCentredString(300, 610, "Brilliant English Dictionary")
    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{student_name}-certificate.pdf")
