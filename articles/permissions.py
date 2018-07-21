__author__ = 'Nataly Contreras'
from rest_framework.permissions import BasePermission
from config.constants import VISIBILITY_PUBLIC


class UserPermissionArticle(BasePermission):

    def has_permission(self, request, view):
        """
        Define si un usuario puede ejecutar el metodo o acceder a la vista/controlador que quiere acceder.
        :param request:
        :param view:
        :return:
        """

        if request.method == "POST":
            return True
        if request.user.is_superuser:
            return True
        if view.action in ("retrieve", "update", "destroy", "list", ):
            return True

        return False

    def has_object_permission(self, request, view, obj):
        """
        Define si un usuario puede realizar la operacion que quiere sobre el objeto 'obj'
        :param request:
        :param view:
        :param obj:
        :return:
        """
        if request.user.is_superuser or obj.owner == request.user:
            return True
        # si en la consulta llegara a escaparse algun post privado, llega aqui a preguntar el permiso solo para publico.
        if obj.visibility == VISIBILITY_PUBLIC and view.action in ('list', 'retrieve',):
            return True

        return False
