# ✅ dictionary/auth_urls.py

from django.urls import path
from .views_auth import register_user, login_user, get_current_user

urlpatterns = [
    path('register/', register_user, name='auth_register'),
    path('login/', login_user, name='auth_login'),
    path('me/', get_current_user, name='auth_user_info'),
]


from dictionary.views.password_reset_views import PasswordResetRequestView, PasswordResetConfirmView

urlpatterns += [
    path("password-reset/", PasswordResetRequestView.as_view()),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view()),
]

from dictionary.views.test_celery import TestCeleryView
urlpatterns += [path("celery-test/", TestCeleryView.as_view())]
