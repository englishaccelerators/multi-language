
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import FileResponse
from .invoice_models import ClassInvoice

def generate_invoice_pdf(invoice_id):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    invoice = ClassInvoice.objects.get(id=invoice_id)

    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, 750, "Invoice")
    p.setFont("Helvetica", 12)
    p.drawString(50, 730, f"Class: {invoice.class_name}")
    p.drawString(50, 710, f"Billing Month: {invoice.billing_month}")
    p.drawString(50, 690, f"Amount Due: {invoice.amount_due} {invoice.currency}")
    p.drawString(50, 670, f"Status: {'Paid' if invoice.paid else 'Unpaid'}")
    p.drawString(50, 650, f"Issued At: {invoice.issued_at}")

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"Invoice-{invoice.class_name}-{invoice.billing_month}.pdf")


from django.http import HttpResponse
import zipfile
import io
from .invoice_models import ClassInvoice
from .invoice_pdf import generate_invoice_pdf

def download_batch_invoices(request):
    class_name = request.GET.get('class')
    year = int(request.GET.get('year'))
    month = int(request.GET.get('month'))

    invoices = ClassInvoice.objects.filter(class_name=class_name, billing_month__year=year, billing_month__month=month)

    buffer = io.BytesIO()
    zip_file = zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED)

    for invoice in invoices:
        single_buffer = io.BytesIO()
        pdf_response = generate_invoice_pdf(invoice.id)
        pdf_content = pdf_response.getvalue()
        zip_file.writestr(f"Invoice-{invoice.class_name}-{invoice.billing_month}-{invoice.id}.pdf", pdf_content)

    zip_file.close()
    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="{class_name}-{year}-{month}-invoices.zip"'
    return response
