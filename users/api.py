# -*- coding: utf-8 -*-
from django.contrib.admin import site
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core import mail
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import get_object_or_404
from django.template import loader
from django.utils.datetime_safe import datetime
from registration.models import RegistrationManager, RegistrationProfile
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT, \
    HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework import filters
from rest_framework_jwt.settings import api_settings
from django.apps import apps
from rest_framework_jwt.utils import jwt_response_payload_handler
from rest_framework_jwt.views import JSONWebTokenAPIView

from users.models import Profile
from users.permissions import UserPermission, AllowAny
from users.serializers import UserSerializer, UserListSerializer, UserGetUserSerializer, LoginSerializer, \
    PasswordResetSerializer
# from users.utils import send_activation_email
import re
from django.contrib.auth.tokens import default_token_generator
from django.utils import six
import hashlib
import random

__author__ = 'Javier Ruiz'

Site = apps.get_model('sites', 'Site')



class ApiLogin (APIView):
    """
    Endpoint para login
    """
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = request.data.get('username')
            password = request.data.get('password')

            user = authenticate(username=username, password=password)
            if user is None:
                resp = {'success': False, 'message': "User not found"}
                return Response(resp, status=HTTP_400_BAD_REQUEST)
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            resp = { 'token': token, 'username': username, 'success': True }

            return Response(resp, status=HTTP_201_CREATED)
        else:
            resp = {'success': False, 'message': serializer.errors}
            return Response(resp, status=HTTP_400_BAD_REQUEST)


class UserViewSet(ViewSet, viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    """
    Endpoint de listado de usuarios
    """

    permission_classes = (UserPermission,)
    search_fields = ('username', 'email', 'id',)
    filter_backends = (filters.SearchFilter, )
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            User.objects.order_by('id')
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = UserListSerializer(
                page,
                many=True,
                context={'request': request}
            )
            return self.get_paginated_response(serializer.data)

        serializer = UserListSerializer(
            queryset,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

    def create(self, request):
        request.data['password'] = make_password(request.data.get('password'))

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            resp = {'success': True, 'message': "User created"}
            return Response(resp, status=HTTP_201_CREATED)
        else:
            # return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            resp = {'success': False, 'message': serializer.errors}

            return Response(resp, status=HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        self.check_object_permissions(request, user)
        serializer = UserGetUserSerializer(user)
        return Response(serializer.data)

    def update(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        print("UPDATE: ")
        self.check_object_permissions(request, user)
        data = request.data

        serializer = UserSerializer(user, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            resp = {'success': True, 'message': "Usuario actualizado correctamente", 'data': serializer.data}
            return Response(resp, status=HTTP_202_ACCEPTED)
        else:
            resp = {'success': False, 'message': serializer.errors}
            return Response(resp, status=HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        self.check_object_permissions(request, user)
        user.delete()
        resp = {'success': True, 'message': "Usuario borrado"}
        return Response(resp, status=HTTP_202_ACCEPTED)



