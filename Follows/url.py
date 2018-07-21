from Follows import views

__author__ = 'Nataly Contreras'


from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from Follows.api import FollowViewSet

router = DefaultRouter()
router.register('apiv1/follow', FollowViewSet, 'api_follows_')


follows_urls = [
    #AJAX URl's
    url(r'^ajax/follow/$', views.follow, name='follow_user'),
    url(r'^ajax/unfollow/$', views.unfollow, name='unfollow_user'),

    # URLS APis
    url(r'', include(router.urls)),
]
