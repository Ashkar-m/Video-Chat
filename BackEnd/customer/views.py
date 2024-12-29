# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def test_view(request):
    return Response({"message": "Hello, World!"})


from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        # Fix dependencies here if needed.
        ('customer', '0001_initial'),
    ]
