from Comments.models import Comment
from django import forms
from django.forms import ModelForm, CheckboxSelectMultiple, Textarea


class CommentForm(ModelForm):
    title = forms.CharField(label='Título', max_length=50)
    body = forms.CharField(label='Comentario', widget=Textarea(attrs={'class': 'materialize-textarea'}))

    class Meta:
        model = Comment
        fields = ['title', 'body']