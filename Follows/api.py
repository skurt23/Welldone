# -*- encoding: utf-8 -*-
__author__ = 'Nataly Contreras'

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Follows.models import Follow
from django.contrib.auth.models import User
from Follows.serializer import FollowSerializer, FollowListSerializer
from rest_framework import status


class FollowViewSet(ModelViewSet):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):

        follows = Follow.objects.all()

        # consulta todos los seguidores de un usuario.
        if self.action != 'retrieve' and self.request.query_params.get('followed') is not None:
            followed = self.request.query_params.get('followed')
            user_followed = User.objects.filter(username=followed)
            follows = Follow.objects.filter(followed=user_followed).order_by('-created_at')

        # consulta a todos los que sigue un usuario.
        if self.action != 'retrieve' and self.request.query_params.get('owner') is not None:
            owner = User.objects.filter(username=self.request.query_params.get('owner'))
            follows = Follow.objects.filter(owner=owner)

        return follows

    def get_serializer_class(self):
        if self.action != 'list':
            serializador = FollowSerializer
        else:
            serializador = FollowListSerializer
        return serializador

    def perform_create(self, serializer):

        followed_username=self.request.data.get('followed')
        followed = User.objects.filter(username=followed_username)


        if followed_username is not None and len(followed) > 0:
            seguidor = serializer.save(followed=followed[0])
            return seguidor
        else:
            return Response("No existe el usuario a seguir", status=status.HTTP_400_BAD_REQUEST )


