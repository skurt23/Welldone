from django.db import models
from django.contrib.auth.models import User
from articles.models import Article

# Create your models here.

class Mention(models.Model):
    owner = models.ForeignKey(User, default=1)
    article = models.ForeignKey(Article, default=1)
    user_mentioned = models.ForeignKey(User, related_name='mentions', default=1)
    mention_showed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.article

    class Meta:
        ordering = ('created_at',)