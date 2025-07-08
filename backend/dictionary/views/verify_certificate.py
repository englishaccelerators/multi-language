
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .certificate_log import CertificateLog
from django.contrib.auth.models import User

@api_view(['GET'])
def verify_certificate(request, username):
    try:
        user = User.objects.get(username=username)
        cert = CertificateLog.objects.filter(user=user).latest('downloaded_at')
        return Response({'valid': True, 'issued': cert.downloaded_at.strftime('%Y-%m-%d')})
    except:
        return Response({'valid': False})
