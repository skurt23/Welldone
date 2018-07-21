from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from Comments.api import CommentViewSet

router = DefaultRouter()
router.register('apiv1/comment', CommentViewSet, 'api_comments_')


comments_urls = [

    # URLS APis
    url(r'', include(router.urls)),
]