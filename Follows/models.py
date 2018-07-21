from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Follow(models.Model):
    owner = models.ForeignKey(User, default=1)
    followed = models.ForeignKey(User, related_name='follows', default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.followed.username

    class Meta:
        ordering = ('created_at',)