from django import template

register = template.Library()


@register.filter(name='is_imagen')
def is_imagen(media_url):
    return media_url.endswith(('.jpg', '.gif', '.png'))


@ register.filter(name='is_youtube')
def is_youtube(media_url):
    return media_url.startswith('https://www.youtube.com/embed/')


@ register.filter(name='is_vimeo')
def is_youtube(media_url):
    return media_url.startswith('http://player.vimeo.com/video/')