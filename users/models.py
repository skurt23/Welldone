# coding=utf-8
# from django.db import models
# created by Javier Ruiz, date 24/03/2017 16:30

# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

STATUS_PUBLICATED = 'RDY'
STATUS_INPROGRES = 'INP'

STATUS_ACTIVE = (
    (STATUS_PUBLICATED, 'Publicado'),
    (STATUS_INPROGRES, 'Pendiente')
)

STATUS_LOGGED_YES = 'YES'
STATUS_LOGGED_NO = 'NOP'

STATUS_LOGGED = (
    (STATUS_LOGGED_YES, 'Logged in'),
    (STATUS_LOGGED_NO, 'Logget out')
)


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, primary_key=True, related_name='profile')
    title = models.CharField(max_length=100, blank=False, null=False, default='Titulo')
    avatar = models.URLField(null=True, blank=True)
    status_active = models.CharField(max_length=3, choices=STATUS_ACTIVE, default=STATUS_PUBLICATED)
    status_logged = models.CharField(max_length=3, choices=STATUS_LOGGED, default=STATUS_LOGGED_NO)
    num_of_articles = models.CharField(max_length=10, blank=False, null=False, default='0')
    num_of_likes = models.CharField(max_length=10, blank=False, null=False, default='0')
    history = models.TextField(blank=True, null=True, default="")
    premium = models.BooleanField(default=False)

    def __unicode__(self):
        return self.user


    # @receiver(post_save, sender=User)
    # def create_profile_for_user(sender, instance=None, created=False, **kargs):
    #     if created:
    #         Profile.objects.get_or_create(user=instance)

    @receiver(pre_delete, sender=User)
    def delete_profile_for_user(sender, instance=None, **kargs):
        if instance:
            user_profile = Profile.objects.get(user=instance)
            user_profile.delete()


# def user_registered_callback(sender, user, request, **kwargs):
#     profile = Profile(user=user)
#     profile.title = str(request.POST["title"])
#     profile.avatar = str(request.POST["avatar"])
#     profile.status_active = str(request.POST["status_active"])
#     profile.status_logged = str(request.POST["status_logged"])
#     profile.num_of_articles = str(request.POST["num_of_articles"])
#     profile.num_of_likes = str(request.POST["num_of_likes"])
#     profile.history = str(request.POST["history"])
#
#     profile.save()


