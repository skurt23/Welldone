# -*- encoding: utf-8 -*-
from django.http import JsonResponse

from Favourites.models import Favourite
from articles.models import Article


def fav(request):

    target_article_id = request.GET.get('target', None)
    target_article = Article.objects.get(pk=target_article_id)

    if not Favourite.objects.filter(owner=request.user, article=target_article).exists():
        newFav = Favourite.objects.create(owner=request.user, article=target_article);
        newFav.save()

    data = {
        'success': True
    }
    return JsonResponse(data)


def unfav(request):

    target_article_id = request.GET.get('target', None)
    target_article = Article.objects.get(pk=target_article_id)

    currentFav = Favourite.objects.filter(owner=request.user, article=target_article)
    if currentFav:
        currentFav.delete()

    data = {
        'success': True
    }
    return JsonResponse(data)