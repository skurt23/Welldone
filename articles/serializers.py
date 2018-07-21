# -*- encoding: utf-8 -*-

from rest_framework import serializers

from articles.models import Article


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article


class PostListSerializer(PostSerializer):
    author = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta(PostSerializer.Meta):
        fields = ("author", "avatar", "id", "title", "introduction", "body", "media_url", "created_at", "modified_at",
                  "category", "likes", "dislikes", "visibility", "status_pub", "is_response_to", "slug")

    def get_author(self, obj):
        return str(obj.owner.first_name) + " " + str(obj.owner.last_name)

    def get_avatar(self, obj):
        return str(obj.owner.profile.avatar)


class ArticleSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        default=serializers.CurrentUserDefault()
    )

    # image = serializers.CharField(validators=[formatURLImage])
    # image = serializers.ImageField()

    class Meta:
        model = Article
        fields = ("owner", "title", "introduction", "body", "media_url", "created_at","modified_at", "publicated_at",
                  "category", "visibility", "status_pub", "likes", "dislikes", "is_response_to",)


class ArticleListSerializer(ArticleSerializer):

    class Meta:
        model = Article
        fields = ("id","owner", "title", "introduction", "body", "media_url", "created_at","modified_at", "publicated_at",
                  "category", "visibility", "status_pub", "likes", "dislikes","is_response_to",)


class ArticleDetailSerializer(ArticleSerializer):

    class Meta:
        model = Article
        fields = ("title", "intro")
