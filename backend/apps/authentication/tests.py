from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from .models import User


# Create your tests here.
class AuthTest(APITestCase):
    def test_login_api(self):
        user = User.objects.create_front_user(
            email="test@test.com", password="12345678"
        )
        url = reverse("auth:login")
        res = self.client.post(url, {"email": "test@test.com", "password": "12345678"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue("tokens" in res.data)
        self.assertTrue("access" in res.data["tokens"])
        self.assertTrue("refresh" in res.data["tokens"])
        tokens = res.data["tokens"]
        self.token = tokens["access"]
        self.refresh_token = tokens["refresh"]

    def test_logout_api(self):
        self.test_login_api()
        url = reverse("auth:logout")
        res = self.client.post(url, {"refresh_token": self.refresh_token})
        self.assertEqual(res.status_code, status.HTTP_205_RESET_CONTENT)
