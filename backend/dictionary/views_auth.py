# ✅ dictionary/views_auth.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile

# -----------------------------
# 🔐 Register New User
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'student')  # default role

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    profile = UserProfile.objects.get(user=user)
    profile.role = role
    profile.save()

    return Response({'success': 'User registered.', 'role': role}, status=201)

# -----------------------------
# 🔑 Login and Get JWT Tokens
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid username or password.'}, status=401)

    refresh = RefreshToken.for_user(user)
    role = UserProfile.objects.get(user=user).role

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'username': user.username,
        'role': role,
    })

# -----------------------------
# 👤 Get Current User Info
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    profile = UserProfile.objects.get(user=user)
    return Response({
        'username': user.username,
        'email': user.email,
        'role': profile.role,
    })
