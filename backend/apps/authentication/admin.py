from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from django.contrib.auth.forms import (
    UserChangeForm,
    UserCreationForm,
    PasswordChangeForm,
)
from .models import User, Plan
from django.contrib.auth.models import Group
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

admin.site.unregister(Group)
admin.site.unregister(BlacklistedToken)
admin.site.unregister(OutstandingToken)


class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ["email", "password", "is_superuser", "plan"]

    def save_modal(self, request, obj, form, change):
        if obj.pk == request.user.pk:
            print("equal")
        super().save(request, obj, form, change)


# class UserCreationForm(forms.ModelForm):
#     error_message = UserCreationForm.error_messages.update(
#         {
#             "duplicate_email": "This email has already been taken.",
#         },
#     )
#     plan_choices = list(Plan.objects.all())
#     email = forms.CharField(label="Email", widget=forms.TextInput)
#     plan = forms.ChoiceField(label="Plan", choices=plan_choices)
#     password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
#     password2 = forms.CharField(
#         label="Password confirmation", widget=forms.PasswordInput
#     )

#     class Meta:
#         model = User
#         fields = ["email"]

#     def clean_email(self):
#         email = self.cleaned_data["email"]
#         try:
#             User.objects.get(email=email)

#         except User.DoesNotExist:
#             return email

#         raise forms.ValidationError(self.error_messages["duplicate_email"])

#     def clean_password2(self):
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         if password1 and password2 and password2 != password2:
#             raise forms.ValidationError("Password don't match")
#         return password2

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user


class MyUserCreationForm(UserCreationForm):
    email = forms.CharField(label="Email", widget=forms.TextInput)
    error_message = UserCreationForm.error_messages.update(
        {
            "duplicate_email": "This email has already been taken.",
        },
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["email", "plan"]

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User.objects.get(email=email)

        except User.DoesNotExist:
            return email

        raise forms.ValidationError(self.error_messages["duplicate_email"])

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data["email"]
        user.save()
        return user


@admin.register(User)
class MyUserAdmin(AuthUserAdmin):
    form = MyUserChangeForm
    add_form = MyUserCreationForm
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "plan",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    list_display = ("email", "plan", "is_superuser")
    search_fields = [
        "email",
    ]
    list_display_links = ["email"]

    filter_horizontal = []
    list_filter = []
    fieldsets = []


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ("plan_name", "list_size")