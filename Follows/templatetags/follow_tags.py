from django import template

from Follows.models import Follow

register = template.Library()


@register.filter(name='follows')
def follows(user_origin, user_target):
    follows = Follow.objects.filter(owner=user_origin, followed=user_target)
    return follows.count() > 0


