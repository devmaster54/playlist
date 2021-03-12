from django.conf.urls import url
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import MusicAPI, ListAPI, UpdateListAPI

app_name = "playlist"

urlpatterns = [
    url(r"^music", MusicAPI.as_view(), name="music"),
    url(r"^list", ListAPI.as_view(), name="list"),
    url(r"^update", UpdateListAPI.as_view(), name="update"),
]