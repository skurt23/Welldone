# -*- encoding: utf-8 -*-
from rest_framework.viewsets import ModelViewSet
from articles.models import Article
from Comments.models import Comment
from Comments.serializer import CommentListSerializer, CommentSerializer
from Comments.permissions import UserPermissionComment
from rest_framework.response import Response
from rest_framework import status


class CommentViewSet(ModelViewSet):

    permission_classes = (UserPermissionComment, )
    # search_fields = ('owner', 'text', )
    order_fields = ('-created_at', )
    # filter_backends = (filters.SearchFilter, filters.OrderingFilter, )


    def get_queryset(self):

        comments = Comment.objects.all()
        if self.action != 'retrieve' and self.request.query_params.get('idarticle') is not None:

            idarticle = self.request.query_params.get('idarticle')
            article = Article.objects.filter(pk=idarticle)
            comments = Comment.objects.filter(article=article).order_by('-created_at').select_related('owner')

        return comments

    # se comenta la linea anterior para permitir al metodo siguiente seleccionar que serializador escoger.
    def get_serializer_class(self):

        if self.action != 'list':
            serializador = CommentSerializer
        else:
            serializador = CommentListSerializer

        return serializador


    # metodo que nos sirve para crear la foto con el propietario que se logueo en la API.

    def perform_create(self, serializer):

        datos = self.request.data;
        id_blog = datos.get('article')
        title = datos.get('title')
        body = datos.get('body')
        visibility = datos.get('visibility')


        article = Article.objects.filter(pk=id_blog).select_related('owner')
        if id_blog is not None and len(article) > 0:


            commentario = serializer.save(article=article[0], title=title, body=body, visibility=visibility )
            """

            # busca en el titulo, cabecera, cuerpo del post un usuario mencionado por hashtag para notificarle de la
            # mencion.
            users = find_hashtags('{0}'.format(texto))
            list_emails = []
            for username in users:
                usuario = User.objects.filter(username=username)
                if len(usuario) > 0 and usuario[0].email is not None:
                    list_emails.append(usuario[0].email)

            # elimina elementos repetidos de la lista
            lst2 = []
            for key in list_emails:
                if key not in lst2:
                    lst2.append(key)
            list_emails = lst2

            # reenvio notificacion a todos los usuarios mencionados en el post.
            for email in list_emails:
                mailOptions = {
                    'from': '"WoldHero" <notifications@worldhero.com>',
                    'to': email,  # list of receivers
                    'subject': 'Hello, You have been mentioned in a comment✔',  # Subject line
                    'text': 'Hello world ?',  # plaintext body
                    'html': 'Estimado Usuario, te avisamos que has sido mencionado en un comentario del post: <a href="http://localhost:8000/blogs/{1}/{2}"><b>{0}</b></a>.'.format(blog[0].title, blog[0].owner.username, blog[0].pk)  # html body
                }
                send_mail.delay(mailOptions)
            """

            return commentario
        else:
            return Response("No existe el articulo a donde quiere comentar", status=status.HTTP_400_BAD_REQUEST )


