# -*- encoding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from articles.api import ArticleViewSet, ArticleOnlyByUserView
from articles.views import HomeView, ArticleView, ArticlesByUserView, ArticlesByCategoryView, ArticlesBySearchQueryView

router = DefaultRouter()
router.register('apiv1/article', ArticleViewSet, 'api_articles_')

articles_urls = [

    # Urls WEB
    url(r'^$', HomeView.as_view(), name='site_home'),
    url(r'^category\/(?P<slug>[A-Za-z0-9.\+@_-]+)\/$', ArticlesByCategoryView.as_view(), name='articles_by_category'),
    url(r'^search\/$', ArticlesBySearchQueryView.as_view(), name='articles_by_search_query'),
    url(r'^(?P<nombre_de_usuario>[A-Za-z0-9.\+@_-]+)\/$', ArticlesByUserView.as_view(), name='articles_by_user'),
    url(r'^(?P<nombre_de_usuario>[A-Za-z0-9.\+@_-]+)\/(?P<articulo_slug>[A-Za-z0-9.\+@_-]+)$', ArticleView.as_view(), name='article_detail'),

    # URLS APis
    url(r'', include(router.urls)),
    url(r'^apiv1/articleuser/$', ArticleOnlyByUserView.as_view()),

]
