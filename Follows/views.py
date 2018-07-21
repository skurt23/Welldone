# -*- encoding: utf-8 -*-
from django.contrib.auth.models import User
from django.http import JsonResponse

from Follows.models import Follow


def follow(request):

    target_user_id = request.GET.get('target', None)
    target_user = User.objects.get(pk=target_user_id)

    if not Follow.objects.filter(owner=request.user, followed=target_user).exists():
        newFollow = Follow.objects.create(owner=request.user, followed=target_user);
        newFollow.save()

    data = {
        'success': True
    }
    return JsonResponse(data)


def unfollow(request):

    target_user_id = request.GET.get('target', None)
    target_user = User.objects.get(pk=target_user_id)

    currentFollow = Follow.objects.filter(owner=request.user, followed=target_user)
    if currentFollow:
        currentFollow.delete()

    data = {
        'success': True
    }
    return JsonResponse(data)