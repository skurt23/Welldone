# coding=utf-8
from django.core.exceptions import ValidationError

BADWORDS = ("meapilas", "aparcabicis", "tuercebotas", "abrazafarolas")

def badwords(description):
    for badword in BADWORDS:
        if badword in description:
            raise ValidationError("La palabra {0} no está permitida", format(badword))
    return True