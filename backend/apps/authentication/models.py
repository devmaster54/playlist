from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from rest_framework_simplejwt.tokens import RefreshToken
import secrets

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_front_user(self, email, password):
        user = self.model(
            email=self.normalize_email(email),
            username=self.normalize_email(email),
            is_active=True,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Please provide an email address")
        user = self.model(
            email=self.normalize_email(email),
            username=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            is_active=True,
            is_staff=True,
            is_superuser=True,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class Plan(models.Model):
    plan_name = models.CharField(
        max_length=100,
        blank=False,
        default="Basic",
        db_column="Plan",
        verbose_name="Plan",
        unique=True,
    )
    list_size = models.IntegerField(
        default=3,
        blank=False,
        null=False,
        db_column="Playlist Size",
        verbose_name="Playlist Size",
    )
    priority = models.IntegerField(
        default=0,
        blank=False,
        null=False,
        db_column="Priority",
        verbose_name="Priority",
    )

    def __str__(self):
        return self.plan_name

    class Meta:
        verbose_name_plural = "Plans"


class User(AbstractUser):
    email = models.CharField(
        max_length=255,
        blank=False,
        default="",
        db_column="Email",
        unique=True,
        verbose_name="Email",
    )
    plan = models.ForeignKey(
        Plan,
        on_delete=models.CASCADE,
        db_column="Plan",
        verbose_name="Plan",
        related_name="user_plan",
        blank=True,
        null=True,
    )
    objects = CustomUserManager()

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(user=self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "User"
