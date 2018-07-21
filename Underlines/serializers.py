# -*- encoding: utf-8 -*-

from rest_framework import serializers
from Underlines.models import Underline


class UnderlinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Underline


class UnderlinesListSerializer(UnderlinesSerializer):

    class Meta(UnderlinesSerializer.Meta):
        fields = ("article", "id", "text")



