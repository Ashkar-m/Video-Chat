from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):

        if data['password'] != data['confirm_password']:
            raise ValidationError("Password do not match.")
        validate_password(data['password'])
        return data
    
    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']

        username = email.split('@')[0]

        user = User.objects.create_user(username=username, email=email, password=password)
        return user
