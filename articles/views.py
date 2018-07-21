# -*- encoding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.shortcuts import render
from django.utils import translation
from django.utils.decorators import method_decorator
from django.views import View

from Category.models import Category
from Comments.forms import CommentForm
from Comments.models import Comment
from Underlines.models import Underline
from articles.models import Article
from django.utils import timezone
from common.utils import pagination
from config.constants import ITEMS_PER_PAGE
from django.utils.translation import ugettext as _


class ArticlesQuerySet(object):

    @staticmethod
    def get_articles_publicated():
        return Article.objects.filter(publicated_at__lt=timezone.now()).order_by('-publicated_at')

    @staticmethod
    def get_articles_only_by_user(user):
        possible_articles = Article.objects.all().select_related("owner").order_by("-modified_at")
        if not user.is_authenticated():
            possible_articles = None
        else:
            possible_articles = possible_articles.filter(Q(owner=user))
        return possible_articles

    def get_articles_by_user(user, logged_user):
        articles = None
        if logged_user.is_superuser or user[0]==logged_user:
            articles = Article.objects.filter(owner=user)
        else:
            articles = Article.objects.filter(owner=user, publicated_at__lt=timezone.now())
        return articles.order_by('-publicated_at')

    def get_articles_by_category(category):
        articles = None
        articles = Article.objects.filter(category__id=category, publicated_at__lt=timezone.now())
        return articles.order_by('-publicated_at')


    def get_articles_by_search_query(search_string):
        articles = None
        articles = Article.objects.filter(Q(title__contains=search_string) | Q(body__contains=search_string) | Q(introduction__contains=search_string))
        return articles.order_by('-publicated_at')


    @staticmethod
    def get_article(slug, logged_user):
        articles = Article.objects.filter(slug=slug)
        if logged_user.is_superuser or articles[0].owner == logged_user or articles[0].publicated_at<timezone.now():
            return articles
        else:
            return Article.objects.none()


class HomeView(View):

    def get(self, request):
        """
        Renderiza el home con los últimos posts
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """

        # fuerza cambio de idioma
        forced_language = request.GET.get('lang')
        if forced_language:
            request.session['lang'] = forced_language

        session_lang = request.session.get('lang')
        if session_lang:
            translation.activate(session_lang)
            request.session[translation.LANGUAGE_SESSION_KEY] = session_lang


        # recupera todos los articulos publicados
        articles_list = ArticlesQuerySet.get_articles_publicated()

        articles = pagination.get_selected_page(articles_list, ITEMS_PER_PAGE, request.GET.get('page'))

        context = {'articles_list': articles}

        return render(request, 'articles/home.html', context)


class ArticlesByUserView(View):

    def get(self, request, nombre_de_usuario):
        """
        Renderiza todos los posts de un usuario
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """
        # comprueba que el usuario exista
        user = User.objects.filter(username=nombre_de_usuario)
        if len(user) == 0:
            return HttpResponseNotFound(_("El usuario que buscas no existe"))
        elif len(user) > 1:
            return HttpResponse(_("Múltiples opciones"), status=300)

        # TODO: Los usuarios deberían ir "slugifados"
        articles_list = ArticlesQuerySet.get_articles_by_user(user, request.user)

        articles = pagination.get_selected_page(articles_list, ITEMS_PER_PAGE, request.GET.get('page'))

        context = {'articles_list': articles, 'usuario': user[0]}
        return render(request, 'articles/articles_by_user.html', context)


class ArticlesByCategoryView(View):

    def get(self, request, slug):
        """
        Renderiza todos los posts de un usuario
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """
        # comprueba que la categoria
        category = Category.objects.filter(slug=slug)
        if len(category) == 0:
            return HttpResponseNotFound(_("La categoria que buscas no existe"))
        elif len(category) > 1:
            return HttpResponse(_("Múltiples opciones"), status=300)

        articles_list = ArticlesQuerySet.get_articles_by_category(category)

        articles = pagination.get_selected_page(articles_list, ITEMS_PER_PAGE, request.GET.get('page'))

        context = {'articles_list': articles, 'categoria': category[0]}
        return render(request, 'articles/articles_by_category.html', context)


class ArticlesBySearchQueryView(View):

    def get(self, request):
        """
        Renderiza todos los posts de un usuario
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """

        query = request.GET.get("q", "")
        if not query:
            return HttpResponseNotFound(_("Debe especificar una cadena de búsqueda"))

        articles_list = ArticlesQuerySet.get_articles_by_search_query(query)

        articles = pagination.get_selected_page(articles_list, ITEMS_PER_PAGE, request.GET.get('page'))

        context = {'articles_list': articles, 'search_query': query}
        return render(request, 'articles/articles_by_search_query.html', context)


class ArticleView(View):

    def get(self, request, nombre_de_usuario, articulo_slug):
        """
        Renderiza un post
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """
        new_comment_form = CommentForm()

        return self.common(request, nombre_de_usuario, articulo_slug, new_comment_form)

    def common(self, request, nombre_de_usuario, articulo_slug, form, error = ''):
        """
        Ejecuta la parte que es común a las llamadas GET y POST
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """
        # se asegura de que el autor exista
        article = self.get_current_article(request, nombre_de_usuario, articulo_slug)

        underlines = Underline.objects.filter(article=article)
        for underline in underlines:
            replacement = '<span class="underlined_text{0}">{1}</span>'.format(
                ' mine' if underline.owner == request.user else '',
                underline.text
            )
            article.body = article.body.replace(underline.text, replacement)

        context = {}
        context = {'article': article,
                   'form': form,
                   'error': error}

        return render(request, 'articles/article_detail.html', context)

    def get_current_article(self, request, nombre_de_usuario, articulo_slug):
        user = User.objects.filter(username=nombre_de_usuario)
        if len(user) == 0:
            return HttpResponseNotFound(_("El usuario que buscas no existe"))
        elif len(user) > 1:
            return HttpResponse(_("Múltiples opciones"), status=300)

        articles = ArticlesQuerySet.get_article(articulo_slug, request.user).filter(owner=user)

        if len(articles) == 0:
            return HttpResponseNotFound(_("El artículo que buscas no existe"))
        elif len(articles) > 1:
            return HttpResponse(_("Múltiples opciones"), status=300)

        return articles[0]


    @method_decorator(login_required())
    def post(self, request, nombre_de_usuario, articulo_slug):
        """
        Valida la petición, y crea el comentario asociado al user logado y el articulo que está viendo
        :param request: objeto HttpRequest con los datos de la petición
        :return: objeto HttpResponse con los datos de la respuesta
        """
        message = None
        new_post = None

        article = self.get_current_article(request, nombre_de_usuario, articulo_slug)

        if not request.user.is_authenticated:
            message = _("No estás logado. Es posible que tu sesión haya caducado. Vuelve a hacer login antes de publicar el comentario.")
            comment_form = CommentForm()
        else:
            comment_with_article = Comment(owner=request.user, article=article)
            comment_form = CommentForm(request.POST, instance=comment_with_article)
            if comment_form.is_valid():
                comment_form.save()
                comment_form = CommentForm()

        #context = {'form': post_form, 'new_post': new_post, 'error': message}
        #return render(request, 'blog/new_post.html', context)

        return self.common(request, nombre_de_usuario, articulo_slug, comment_form, message)
