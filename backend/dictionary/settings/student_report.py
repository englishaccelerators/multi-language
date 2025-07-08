
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import FileResponse

def generate_student_report_pdf(student_name, summary):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, 750, "English Dictionary - Student Report Card")
    p.setFont("Helvetica", 12)
    p.drawString(50, 720, f"Student Name: {student_name}")
    y = 690
    for label, value in summary.items():
        p.drawString(50, y, f"{label}: {value}")
        y -= 20

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{student_name}-report.pdf")
