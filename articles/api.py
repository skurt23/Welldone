# -*- encoding: utf-8 -*-

from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils.datetime_safe import datetime
from rest_framework import filters
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.viewsets import ModelViewSet

from articles.views import ArticlesQuerySet
from config.constants import VISIBILITY_PUBLIC, VISIBILITY_PRIVATE
from articles.models import Article
from articles.serializers import ArticleSerializer, ArticleListSerializer, PostListSerializer
from articles.permissions import UserPermissionArticle


class ArticleOnlyByUserView(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return ArticlesQuerySet.get_articles_only_by_user(self.request.user)

    def get_serializer_class(self):
        return PostListSerializer


class ArticleViewSet(ModelViewSet):

    permission_classes = (IsAuthenticatedOrReadOnly, UserPermissionArticle, )
    search_fields = ('title', 'body', )
    order_fields = ('-publicated_at', 'title', )
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, )


    def get_queryset(self):


        blogs = Article.objects.all().select_related("owner").order_by('-publicated_at')

        if self.request.user.is_superuser:
            # como administrador obtiene todos los posts.
            return blogs
        elif self.request.user.is_authenticated():
            # no obtiene los posts que esten privados de otros usuarios. y solo los publicados hasta al dia de hoy.
            blogs = blogs.filter(publicated_at__lte=datetime.today())
            return blogs.exclude(Q(visibility=VISIBILITY_PRIVATE) & ~Q(owner=self.request.user))

        else:
            # invitado prodra ver los posts publicos.
            return blogs.filter(publicated_at__lte=datetime.today(), visibility=VISIBILITY_PUBLIC)

    # se comenta la linea anterior para permitir al metodo siguiente seleccionar que serializador escoger.
    def get_serializer_class(self):

        if self.action != 'list':
            serializador = ArticleSerializer
        else:
            serializador = ArticleListSerializer

        return serializador


    # metodo que nos sirve para crear la foto con el propietario que se logueo en la API.

    def perform_create(self, serializer):
        post = serializer.save(owner=self.request.user)

        return post

    # metodo para que al modificar solo se modifique la foto propietaria del usuario autentificado.
    def perform_update(self, serializer):

        # si el administrador va a actualizar, el propietario del post será el que él elija por medio de la llave owner.
        propietario = self.request.user

        if self.request.user.is_superuser:
            propietario = get_object_or_404(User, username=self.request.data.get('owner'))
        post = serializer.save(owner=propietario)
        return post




