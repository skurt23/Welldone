from Favourites import views

__author__ = 'Nataly Contreras'


from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from Favourites.api import FavouriteViewSet

router = DefaultRouter()
router.register('apiv1/favourite', FavouriteViewSet, 'api_favourites_')


favourites_urls = [
    #AJAX
    url(r'^ajax/fav/$', views.fav, name='fav_article'),
    url(r'^ajax/unfav/$', views.unfav, name='unfav_article'),

    # URLS APis
    url(r'', include(router.urls)),
]
