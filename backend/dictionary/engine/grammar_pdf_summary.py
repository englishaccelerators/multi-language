
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import FileResponse

def generate_grammar_summary_pdf(username, completed, avg_score):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    p.setFont("Helvetica-Bold", 18)
    p.drawCentredString(300, 750, "Grammar Progress Summary")
    p.setFont("Helvetica", 14)
    p.drawString(50, 700, f"Student: {username}")
    p.drawString(50, 680, f"Lessons Completed: {completed}")
    p.drawString(50, 660, f"Average Score: {avg_score:.2f}")
    p.drawString(50, 620, "Keep up the great work!")

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"{username}-grammar-summary.pdf")
