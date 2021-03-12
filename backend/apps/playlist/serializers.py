from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from .models import Music, PlayList


class MusicSerializer(serializers.ModelSerializer):
    music_name = serializers.CharField(read_only=True)
    plan = serializers.SerializerMethodField()

    class Meta:
        model = Music
        fields = "__all__"

    def get_plan(self, obj):
        if not obj.plan:
            return None
        return {
            "id": obj.plan.id,
            "name": obj.plan.plan_name,
            "size": obj.plan.list_size,
            "priority": obj.plan.priority,
        }


class UpdateListSerializer(serializers.Serializer):
    music_id = serializers.IntegerField(required=True)