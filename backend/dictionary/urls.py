from django.contrib import admin
from django.urls import path, include, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenRefreshView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    # 🔐 Django Admin Panel
    path('admin/', admin.site.urls),

    # 🛡️ Admin APIs
    path('admin-api/', include('dictionary.admin_urls')),

    # 🌐 Public APIs
    path('api/', include('dictionary.public_urls')),

    # 👨‍🏫 Teacher APIs
    path('teacher/', include('dictionary.teacher_urls')),

    # 🧑‍🎓 Student APIs
    path('student/', include('dictionary.student_urls')),

    # 📊 Analytics APIs
    path('analytics/', include('dictionary.analytics_urls')),

    # 🔐 Authentication
    path('auth/', include('dictionary.auth_urls')),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # 🧠 Interactive Tools
    path('interactive/', include('dictionary.interactive_engine.urls')),

    # ✅ Mistake Logging APIs
    path('mistakes/', include('dictionary.views.views_mistake_logger')),
]

# ✅ Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.urls import include
urlpatterns += [path('ai/', include('dictionary.ai_urls'))]
urlpatterns += [path('analytics/', include('dictionary.analytics_urls'))]

urlpatterns += [path('api/', include('dictionary.settings.urls'))]
