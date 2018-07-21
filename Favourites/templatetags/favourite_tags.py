from django import template

from Favourites.models import Favourite

register = template.Library()


@register.filter(name='faved')
def faved(user_origin, article_target):
    if user_origin.is_anonymous():
        return False

    favs = Favourite.objects.filter(owner=user_origin, article=article_target)
    return favs.count() > 0


