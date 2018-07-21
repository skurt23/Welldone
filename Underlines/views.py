# -*- encoding: utf-8 -*-
from django.db.models import Q
from django.http import JsonResponse

from Underlines.models import Underline
from articles.models import Article


def underline(request):
    data = {
        'success': False
    }

    if request.user.is_authenticated:
        target_article_id = request.GET.get('target', None)
        target_article = Article.objects.get(pk=target_article_id)

        underlined_text = request.GET.get('text', None).strip()

        if not Underline.objects.filter(owner=request.user, article=target_article, text = underlined_text).exists():
            newUnderline = Underline.objects.create(owner=request.user, article=target_article, text = underlined_text);
            newUnderline.save()

            data = {
                'success': True,
                'underline_id': newUnderline.pk
            }
    return JsonResponse(data)


def ununderline(request):
    data = {
        'success': False
    }

    if request.user.is_authenticated:
        target_article_id = request.GET.get('target', None)
        target_article = Article.objects.get(pk=target_article_id)

        underlined_text = request.GET.get('text', None)

        currentUnderline = Underline.objects.filter(owner=request.user, article=target_article, text = underlined_text)
        if currentUnderline:
            currentUnderline.delete()

        data = {
            'success': True
        }
    return JsonResponse(data)

class UnderlinesQuerySet(object):

    @staticmethod
    def get_underlines_only_by_user(user):
        possible_underlines = Underline.objects.all().select_related("owner").order_by("-modified_at")
        if not user.is_authenticated():
            possible_underlines = None
        else:
            possible_underlines = possible_underlines.filter(Q(owner=user))
        return possible_underlines

