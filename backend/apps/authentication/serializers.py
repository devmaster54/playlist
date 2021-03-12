from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from django.contrib.auth import authenticate
from .models import User
from .utils import validate_password_strength


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)
    tokens = serializers.JSONField(read_only=True)

    class Meta:
        model = User
        fields = ("email", "tokens", "password")

    def validate(self, data):
        email = data.get("email", "")
        password = data.get("password", "")
        user = authenticate(username=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid Credentials, try again.")
        return {
            "email": user.email,
        }


class DetailSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)
    plan = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("email", "plan")

    def get_plan(self, obj):
        if not obj.plan:
            return None
        return {
            "id": obj.plan.id,
            "name": obj.plan.plan_name,
            "size": obj.plan.list_size,
            "priority": obj.plan.priority,
        }


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(required=True, max_length=555)

    class Meta:
        fields = ["refresh_token"]
