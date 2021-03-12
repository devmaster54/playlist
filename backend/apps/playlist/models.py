from django.db import models
from ..authentication.models import Plan, User

# Create your models here.


class Music(models.Model):
    music_name = models.CharField(
        max_length=100,
        blank=False,
        default="",
        db_column="Music",
        verbose_name="Music",
        unique=True,
    )
    plan = models.ForeignKey(
        Plan,
        on_delete=models.CASCADE,
        db_column="Plan",
        verbose_name="Plan",
        related_name="music_plan",
        blank=False,
        null=False,
    )

    def __str__(self):
        return self.music_name

    class Meta:
        verbose_name_plural = "Musics"


class PlayList(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column="User",
        verbose_name="User",
        related_name="playlist_user",
        blank=False,
        null=False,
    )
    music = models.ForeignKey(
        Music,
        on_delete=models.CASCADE,
        db_column="Music",
        verbose_name="Music",
        related_name="playlist_music",
        blank=False,
        null=False,
    )

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name_plural = "PlayList"