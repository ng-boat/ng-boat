from django import forms

from contact.models import ContactEmail
from core.forms import BetterReCaptchaField


class ContactForm(forms.ModelForm):
    captcha = BetterReCaptchaField()

    class Meta:
        model = ContactEmail
        fields = (
            "name",
            "email",
            "message",
        )
        labels = {
            "name": "Imię",
            "email": "E-mail",
            "message": "Wiadomość",
            }
