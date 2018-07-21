# coding=utf-8
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.template import defaultfilters

from articles.validators import badwords
from Category.models import Category
from config.constants import VISIBILITY, VISIBILITY_PUBLIC, STATUS, STATUS_PUBLICATED


class Article(models.Model):
    owner = models.ForeignKey(User, default=1)
    title = models.CharField(max_length=100, null=False, blank=False, default='Titulo', validators=[badwords])
    introduction = models.CharField(max_length=200, null=True, validators=[badwords])
    body = models.TextField(null=False, blank=False, default='Cuerpo del post', validators=[badwords])
    media_url = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    publicated_at = models.DateTimeField(auto_now=True)
    category = models.ManyToManyField(Category)
    likes = models.CharField(max_length=10, null=False, default='0')
    dislikes = models.CharField(max_length=10, null=False, default='0')
    visibility = models.CharField(max_length=3, choices=VISIBILITY, default=VISIBILITY_PUBLIC)
    status_pub = models.CharField(max_length=3, choices=STATUS, default=STATUS_PUBLICATED)
    is_response_to = models.ForeignKey('self', null=True, blank=True)
    slug = models.SlugField(max_length=100)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = defaultfilters.slugify(self.title)
        super(Article, self).save(*args, **kwargs)

    class Meta:
        ordering = ('created_at',)

