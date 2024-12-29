# urls.py
from django.urls import path
from api.views import test_view

urlpatterns = [
    path('api/test/', test_view),
]
