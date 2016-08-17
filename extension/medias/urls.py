from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^test_ajax/', views.test_ajax),
    #     url(r'^articles/(?P<year>\d{4})/(?P<month>\d{2})$', views.list_articles),
]
