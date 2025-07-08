
from io import BytesIO
from zipfile import ZipFile
from django.http import HttpResponse
from .grammar_completion_certificate import generate_grammar_certificate
from django.contrib.auth.models import User

def generate_class_certificates_zip(class_name):
    buffer = BytesIO()
    with ZipFile(buffer, 'w') as zip_archive:
        users = User.objects.filter(groups__name=class_name)
        for user in users:
            response = generate_grammar_certificate(user.username)
            zip_archive.writestr(f"{user.username}-certificate.pdf", response.getvalue())
    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="{class_name}-certificates.zip"'
    return response
