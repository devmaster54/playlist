from django.urls import reverse
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LogoutSerializer, LoginSerializer, DetailSerializer
from .models import User, Plan


class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            status_response = status.HTTP_200_OK
            user_data = serializer.data
            user = User.objects.filter(email=user_data["email"]).first()
            res_data = {
                "user_id": user.pk,
                "email": user.email,
                "plan": user.plan.plan_name,
                "tokens": user.tokens,
            }

            return Response({"success": True, "data": res_data}, status=status_response)
        except Exception as e:
            return Response(
                {"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({}, status=status.HTTP_200_OK)


class PlanAPI(GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        plan_data = list(Plan.objects.all().values("id", "plan_name", "list_size"))
        return Response(plan_data, status=status.HTTP_200_OK)


class DetailAPI(GenericAPIView):
    serializer_class = DetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
