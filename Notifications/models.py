from django.db import models
from django.contrib.auth.models import User
from config.constants import STATUS, STATUS_PUBLICATED, NOTIFICATION_STATUS, NOTIFICATION_NONE


# Create your models here.

class Notification(models.Model):
    owner = models.ForeignKey(User, default=1)
    user_dest = models.ForeignKey(User, related_name='notifications', default=1)
    status = models.CharField(max_length=3, choices=STATUS, default=STATUS_PUBLICATED)
    type = models.CharField(max_length=3, choices=NOTIFICATION_STATUS, default=NOTIFICATION_NONE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.article

    class Meta:
        ordering = ('created_at',)