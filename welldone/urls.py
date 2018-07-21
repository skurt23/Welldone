"""welldone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from django.utils.translation import ugettext as _
from users import urls as users_urls
from articles.urls import articles_urls
from Comments.urls import comments_urls
from Favourites.urls import favourites_urls
from Follows.url import follows_urls
from Underlines.url import underlines_urls
from users.form import MyExtendedForm
from Category.urls import category_urls
from registration.backends.default.views import RegistrationView

router = DefaultRouter()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # Static
    url(r'^accounts/register/$', RegistrationView.as_view(), {
        'form': MyExtendedForm
    }),
    url(r'^accounts/', include('registration.backends.default.urls')),

    #robots.txt
    url(r'^robots.txt$', TemplateView.as_view(template_name="robots.txt", content_type="text/plain"), name="robots_file"),

    # API
    url(r'', include(articles_urls)), #aquí está la home
    url(r'', include(users_urls)),
    url(r'', include(comments_urls)),
    url(r'', include(favourites_urls)),
    url(r'', include(follows_urls)),
    url(r'', include(underlines_urls)),
    url(r'', include(category_urls)),
    url(r'', include(router.urls))
]


# variable de prueba de traduccion

cadena = _("Hola a todos, primera cadena traducida, Kerberos TEAM")
print(cadena)
