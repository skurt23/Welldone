from rest_framework import serializers
from Comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Comment
        fields = ("id","owner","title","body","created_at","visibility","status_pub","article",)


class CommentListSerializer(CommentSerializer):

    owner = serializers.CharField()

    class Meta:
        model = Comment
        fields = ("id","owner", "article", "title", "body", 'created_at', 'visibility', 'status_pub', )


