from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^test_ajax/', views.test_ajax),
    url(r'^get_data/', views.get_data),
]
