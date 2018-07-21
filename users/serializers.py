# -*- coding: utf-8 -*-
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import Profile

__author__ = 'Javier Ruiz'


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.CharField()

    def validate_username(self, email):
        if self.instance is None or not User.objects.filter(email=email).exists():
            raise ValidationError("El e-mail {0} no existe".format(email))
        return email.lower()


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        # exclude = ('user', )
        fields = ('title', 'avatar', 'status_active', 'status_logged', 'num_of_articles', 'num_of_likes', 'history', 'premium')


class UserListSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()



class UserGetUserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    last_login = serializers.ReadOnlyField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    # password =  serializers.CharField()
    # pbkdf2_sha256$30000$UEvGw0rZNxuo$Jqb8dK3W50lGnVxjSEwitfzbloLXPgLV6UHXSetBMFU =
    email = serializers.EmailField()
    profile = UserProfileSerializer(required=False)


class UserSerializer(serializers.Serializer):
    profile = UserProfileSerializer(required=False, partial=True)
    id = serializers.ReadOnlyField()
    last_login = serializers.ReadOnlyField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField()
    # pbkdf2_sha256$30000$UEvGw0rZNxuo$Jqb8dK3W50lGnVxjSEwitfzbloLXPgLV6UHXSetBMFU =
    email = serializers.EmailField()

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')

        user = User.objects.create(**validated_data)
        profile_data['user'] = user

        Profile.objects.create(**profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        # Update User data
        instance.username = validated_data.get('username', instance.username)
        # instance.password = validated_data.get('password', instance.password)
        instance.password = make_password(validated_data.get('password'))
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        instance.save()
        # Update UserProfile data
        if not instance.profile:
            Profile.objects.create(user=instance, **profile_data)
        instance.profile.title = profile_data.get('title', profile.title)
        instance.profile.avatar = profile_data.get('avatar', profile.avatar)
        instance.profile.history = profile_data.get('history', profile.history)
        instance.profile.status_active = profile_data.get('status_active', profile.status_active)
        instance.profile.num_of_likes = profile_data.get('num_of_likes', profile.num_of_likes)
        instance.profile.status_logged = profile_data.get('status_logged', profile.status_logged)
        instance.profile.num_of_articles = profile_data.get('num_of_articles', profile.num_of_articles)

        profile.save()

        # Check if the password has changed
        password = validated_data.get('password', None)

        if password:
            instance.set_password(password)
            instance.save()
            # update_session_auth_hash(self.context.get('request'), instance)

        return instance

    def validate_username(self, username):
        if (self.instance is None or self.instance.username != username) \
                and User.objects.filter(username=username).exists():
            raise ValidationError("El nombre de usuario {0} ya está siendo utilizado".format(username))
        return username

    def validate_email(self, email):
        if (self.instance is None or self.instance.email != email) \
                and User.objects.filter(email=email).exists():
            raise ValidationError("El e-mail {0} ya está siendo utilizado".format(email))
        return email.lower()

