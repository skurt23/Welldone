from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token
from users.api import UserViewSet, ApiLogin

__author__ = 'Javier Ruiz'

router = DefaultRouter()
router.register('apiv1/users', UserViewSet, base_name='api_users_')

urlpatterns = [
    # Web URLS

    # API URLS
    url(r'', include(router.urls)),
    # url(r'^apiv1/users/login$', obtain_jwt_token),
    url(r'^apiv1/users/login$', ApiLogin.as_view()),

]
