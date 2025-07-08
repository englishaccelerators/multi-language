
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import FileResponse

def generate_grammar_certificate(username):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setFont("Helvetica-Bold", 22)
    p.drawCentredString(300, 730, "Certificate of Grammar Mastery")
    p.setFont("Helvetica", 14)
    p.drawCentredString(300, 690, f"Awarded to: {username}")
    p.drawCentredString(300, 670, "For completing all assigned grammar lessons")
    p.drawCentredString(300, 650, "with excellent performance.")
    p.drawCentredString(300, 610, "Brilliant English Dictionary Platform")

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{username}-grammar-certificate.pdf")
