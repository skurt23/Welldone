from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def get_selected_page(object_list, items_per_page, page):
    """
    Devuelve la
    :param request: objeto HttpRequest con los datos de la petición
    :return: objeto HttpResponse con los datos de la respuesta
    """

    if object_list is None:
        return None

    paginator = Paginator(object_list, items_per_page)

    try:
        objects = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        objects = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        objects = paginator.page(paginator.num_pages)

    return objects