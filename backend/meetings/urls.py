from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeetingViewSet, LoginView, LogoutView, CurrentUserView

router = DefaultRouter()
router.register(r'meetings', MeetingViewSet, basename='meeting')

urlpatterns = [
    # API routes for CRUD
    path('api/', include(router.urls)),
    # Authentication endpoints
    path('api/login/', LoginView.as_view(), name='api-login'),
    path('api/logout/', LogoutView.as_view(), name='api-logout'),
    path('api/current_user/', CurrentUserView.as_view(), name='api-current-user'),
]
