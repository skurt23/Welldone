from Category.models import Category


def categories(request):
    return {
        'category_items': Category.objects.all(),
    }