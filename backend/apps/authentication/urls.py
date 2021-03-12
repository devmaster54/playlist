from django.conf.urls import url
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import LoginAPI, LogoutView, PlanAPI, DetailAPI

app_name = "authentication"

urlpatterns = [
    url(r"^login", LoginAPI.as_view(), name="login"),
    url(r"^logout", LogoutView.as_view(), name="logout"),
    url(r"^plan", PlanAPI.as_view(), name="plan"),
    url(r"^detail", DetailAPI.as_view(), name="detail"),
]
