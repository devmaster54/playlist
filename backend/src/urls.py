from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Playlist Rest API Doc",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path(
        "redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc-ui"
    ),
    path("auth/", include("apps.authentication.urls", namespace="auth")),
    path("playlist/", include("apps.playlist.urls", namespace="playlist")),
]
