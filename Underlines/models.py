from django.db import models
from django.contrib.auth.models import User
from articles.models import Article

# Create your models here.

class Underline(models.Model):
    owner = models.ForeignKey(User, default=1)
    article = models.ForeignKey(Article, default=1)
    text = models.CharField (null=False, blank=False, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.article

    class Meta:
        ordering = ('created_at',)