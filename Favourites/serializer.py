__author__ = 'Nataly Contreras'

from Favourites.models import Favourite
from rest_framework import serializers


class FavouriteSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Favourite
        fields = ('owner', 'article', 'created_at', 'modified_at',)


class FavouriteListSerializer(FavouriteSerializer):

    class Meta:
        model = Favourite
        fields= ('owner', 'article', 'created_at','modified_at',)


