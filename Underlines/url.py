from Underlines import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from Underlines.api import UnderlinesViewSet

router = DefaultRouter()
router.register('apiv1/underlines', UnderlinesViewSet, 'api_underlines_')

underlines_urls = [
    #AJAX URl's
    url(r'^ajax/underline/$', views.underline, name='underline_article'),
    url(r'^ajax/ununderline/$', views.ununderline, name='ununderline_article'),

    # URLS APis
    url(r'', include(router.urls)),
]
