from django.db import models
from articles.models import Article
from django.contrib.auth.models import User

# Create your models here.

class Favourite(models.Model):
    owner = models.ForeignKey(User, default=1)
    article = models.ForeignKey(Article, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.article.title

    class Meta:
        ordering = ('created_at',)