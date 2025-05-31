from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from django.contrib.auth.models import User

from .models import Meeting
from .serializers import MeetingSerializer

class MeetingViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing, creating, retrieving, updating, and deleting meetings.
    Access restricted to authenticated users only (enforced by settings.py).
    """
    queryset = Meeting.objects.all().order_by('date_of_meeting', 'start_time')
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]

# Bonus: Basic login/logout endpoints for session authentication

from rest_framework.views import APIView

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]  # Anyone can attempt to log in

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can log out

    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out successfully'}, status=status.HTTP_200_OK)

# Optionally, an endpoint to get the current authenticated user
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})
