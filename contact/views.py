from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic.edit import FormView

from contact.forms import ContactForm


class ContactView(FormView):
    form_class = ContactForm
    template_name = "contact/contact.html"
    success_url = reverse_lazy("contact:contact")

    def form_valid(self, form):
        contact_email = form.save()
        if contact_email.sent_successfully:
            messages.info(
                self.request, "Dzięki! Odezwiemy się wkrótce"
            )
        else:
            messages.error(
                self.request, "Ałć. Coś nie poszło, spróbuj ponownie później"
            )
        return super(ContactView, self).form_valid(form)
