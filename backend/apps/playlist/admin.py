from django import forms
from django.contrib import admin
from .models import Music


@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ("music_name", "plan")
