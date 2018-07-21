# -*- encoding: utf-8 -*-
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from Underlines.models import Underline
from Underlines.serializers import UnderlinesListSerializer
from articles.models import Article


class UnderlinesViewSet(ModelViewSet):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):

        underlines = Underline.objects.all()

        # consulta todos los underlines de un usuario.
        if self.action != 'retrieve' and self.request.query_params.get('nombre_de_usuario') is not None:
            owner = User.objects.filter(username=self.request.query_params.get('nombre_de_usuario'))
            underlines = Underline.objects.filter(owner=owner)
        elif self.action != 'retrieve' and self.request.query_params.get('articulo') is not None:
            article = Article.objects.filter(id=self.request.query_params.get('articulo'))
            underlines = Underline.objects.filter(article=article)

        return underlines

    def get_serializer_class(self):
        if self.action == 'list':
            serializador = UnderlinesListSerializer
        else:
            serializador = None

        return serializador




