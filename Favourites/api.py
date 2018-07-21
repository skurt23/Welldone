# -*- encoding: utf-8 -*-
__author__ = 'Nataly Contreras'

from rest_framework.viewsets import ModelViewSet

from Favourites.serializer import FavouriteSerializer, FavouriteListSerializer
from rest_framework.permissions import IsAuthenticated
from articles.models import Article
from rest_framework.response import Response
from rest_framework import status
from Favourites.models import Favourite
from django.contrib.auth.models import User


class FavouriteViewSet(ModelViewSet):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):

        favoritos = Favourite.objects.all().select_related('owner')

        if self.action != 'retrieve' and self.request.query_params.get('idarticle') is not None:
            idarticle = self.request.query_params.get('idarticle')
            article = Article.objects.filter(pk=idarticle)
            favoritos = Favourite.objects.filter(article=article).order_by('-created_at')

        if self.action != 'retrieve' and self.request.query_params.get('owner') is not None:
            owner = User.objects.filter(username=self.request.query_params.get('owner'))
            favoritos = Favourite.objects.filter(owner=owner)

        return favoritos

    def get_serializer_class(self):
        if self.action != 'list':
            serializador = FavouriteSerializer
        else:
            serializador = FavouriteListSerializer
        return serializador

    def perform_create(self, serializer):

        idArticle=self.request.data.get('article')
        article = Article.objects.filter(pk=idArticle)

        if idArticle is not None and len(article) > 0:
            favorito = serializer.save(article=article[0])
            return favorito
        else:
            return Response("No existe el articulo a donde quiere comentar", status=status.HTTP_400_BAD_REQUEST )


