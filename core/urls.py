from django.conf.urls import url

from . import views

app_name = "core"
urlpatterns = [
    # url(r'^test-404/$', 'core.views.error404'),
    url(r'^events/$', views.events, name='events'),
    url(r'^events/map/$', views.events_map, name='events_map'),
    url(r'^events/calendar.ics$', views.events_ical, name='icalendar'),
    url(r'^resources/$', views.resources, name='resources'),
    #url(r'^newsletter/$', views.newsletter, name='newsletter'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^contribute/$', views.contribute, name='contribute'),
    url(r'^privacy-cookies/$', views.privacy_cookies, name='privacy-cookies'),
    url(r'^server-error/$', views.server_error, name='server_error'),
    url(r'^(?P<city>[\w\d/]+)/$', views.event, name='event'),
    url(r'^$', views.index, name='index'),
]
