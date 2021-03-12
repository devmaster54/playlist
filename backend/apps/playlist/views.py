from django.urls import reverse
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import MusicSerializer, UpdateListSerializer
from .models import Music, PlayList


class MusicAPI(GenericAPIView):
    serializer_class = MusicSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        queryset = Music.objects.all()
        music_data = MusicSerializer(queryset, many=True).data
        return Response(music_data, status=status.HTTP_200_OK)


class ListAPI(GenericAPIView):
    serializer_class = MusicSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        queryset = PlayList.objects.filter(user=request.user).all()
        res_data = []
        for listItem in queryset:
            res_data.append(MusicSerializer(listItem.music).data)
        return Response(res_data, status=status.HTTP_200_OK)


class UpdateListAPI(GenericAPIView):
    serializer_class = UpdateListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            data = self.serializer_class(request.data).data
            music = Music.objects.get(id=data["music_id"])
            if PlayList.objects.filter(user=request.user, music=music).exists():
                raise Exception("This music already exsits in playlist.")
            if (
                PlayList.objects.filter(user=request.user).count()
                >= user.plan.list_size
            ):
                raise Exception("Your playlist is full.")
            if music.plan.priority > user.plan.priority:
                raise Exception("You can't add this music.")
            PlayList.objects.create(user=request.user, music=music)
            return Response({"success": True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, *args, **kwargs):
        try:
            data = self.serializer_class(request.data).data
            music = Music.objects.get(id=data["music_id"])
            if not PlayList.objects.filter(user=request.user, music=music).exists():
                raise Exception("This music doesn't exsit in playlist.")
            playlist = PlayList.objects.get(user=request.user, music=music)
            playlist.delete()
            return Response({"success": True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
