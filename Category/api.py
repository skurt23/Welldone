# -*- encoding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from Category.models import Category
from Category.serializer import CategoryListSerializer
# from rest_framework.permissions import IsAuthenticated


class CategoryViewSet(ModelViewSet):

    # permission_classes = (IsAuthenticated, )

    def get_queryset(self):

        categories = Category.objects.all()

        if self.action != 'list':
            categories = ""
        else:
            categories = categories.order_by('id')

        return categories

    def get_serializer_class(self):
        if self.action == 'list':
            serializador = CategoryListSerializer
        else:
            serializador = ""

        return serializador


