from django.db import models
from articles.models import Article
from articles.validators import badwords
from config.constants import VISIBILITY,VISIBILITY_PUBLIC,STATUS,STATUS_PUBLICATED
from django.contrib.auth.models import User

# Create your models here.

class Comment(models.Model):
    owner = models.ForeignKey(User, default=1)
    title = models.CharField(max_length=50, null=False, blank=False, default='Título', validators=[badwords])
    body = models.TextField(null=False, blank=False, default='Cuerpo del post', validators=[badwords])
    created_at = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(max_length=3, choices=VISIBILITY, default=VISIBILITY_PUBLIC)
    status_pub = models.CharField(max_length=3, choices=STATUS, default=STATUS_PUBLICATED)
    article = models.ForeignKey(Article, default=1, related_name='comments')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('created_at',)