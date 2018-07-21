from django.db import models

# Create your models here.
from django.template import defaultfilters


class Category(models.Model):
    category_name = models.CharField(max_length=50, null=False, default='General')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=50)

    def __str__(self):
        return self.category_name

    def save(self, *args, **kwargs):
        self.slug = defaultfilters.slugify(self.category_name)
        super(Category, self).save(*args, **kwargs)