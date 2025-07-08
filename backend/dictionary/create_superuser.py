
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dictionary.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
    print("✅ Superuser 'admin' created.")
else:
    print("ℹ️ Superuser already exists.")
