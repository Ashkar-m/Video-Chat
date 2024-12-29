# urls.py
from django.urls import path
from customer.views import test_view
from rest_framework_simplejwt import views as jwt_views
from .views import UserRegistrationView

urlpatterns = [
    path('customer/test/', test_view),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_view'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh_view'),
    path('register/', UserRegistrationView.as_view(), name='user-registration')
]
