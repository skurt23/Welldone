__author__ = 'Nataly Contreras'

from rest_framework import serializers
from Follows.models import Follow


class FollowSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        default=serializers.CurrentUserDefault()
    )

    followed = serializers.CharField()

    class Meta:
        model= Follow
        fields=('owner', 'followed', 'created_at','modified_at', )


class FollowListSerializer(FollowSerializer):

    class Meta:
        model= Follow
        fields=('id','owner', 'followed', 'created_at', 'modified_at', )
