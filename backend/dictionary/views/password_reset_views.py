from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from django.conf import settings

class PasswordResetRequestView(generics.GenericAPIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=400)

        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            reset_url = f"{request.data.get('frontend_url')}/reset-password-confirm/{uid}/{token}"
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link to reset your password:\n{reset_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response({"message": "Password reset link sent."})
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist."}, status=404)

class PasswordResetConfirmView(generics.GenericAPIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                new_password = request.data.get("new_password")
                if not new_password:
                    return Response({"error": "New password required."}, status=400)
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password reset successful."})
            else:
                return Response({"error": "Invalid token."}, status=400)
        except Exception as e:
            return Response({"error": "Invalid request."}, status=400)