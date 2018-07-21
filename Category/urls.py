from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from Category.api import CategoryViewSet


router = DefaultRouter()
router.register('apiv1/category', CategoryViewSet, 'api_category_')


category_urls = [

    # URLS APis
    url(r'', include(router.urls)),
]
