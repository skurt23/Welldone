//evento para detectar nuevas selecciones
jQuery('.single-post-content').mouseup(function() {

    jQuery('.underliner-loader').hide();
    jQuery('#underliner-error').hide();

    // coge texto seleccionado
    var range = window.getSelection().getRangeAt(0);

    //solo actuamos si ha seleccionado algo y está dentro de la misma etiqueta de texto (ignoramos a, span, p,..)
    if ((range.endOffset - range.startOffset)>1 && range.commonAncestorContainer.nodeType==3) {
        //calculo de la posición en la que mostrar las herramientas y errores
        relPos = getSelectionRelativeCoords(range.getBoundingClientRect());

        jQuery('#underliner').css({
                "top": relPos.top,
                "left": relPos.left
            }
        ).fadeIn();
        jQuery('#underliner-error').css({
                "top": relPos.top,
                "left": relPos.left
            }
        ).css({
            "top": '+=40'
        });
        jQuery('#ununderliner').fadeOut();
    } else {
        jQuery('#underliner').fadeOut();
        jQuery('#ununderliner').fadeOut();
    }
});

//evento para detectar clicks en los subrayados hechos pro el propio usuario
jQuery(document).on('click', '.underlined_text.mine' , function(e) {

    underlined_text = jQuery(this).text();

    //asigna el texto subrayado al atributo data del botón de eliminar, para luego pasarselo al backend
    jQuery('.action_remove_underline').data('underlined-text', underlined_text);

    //calculo de la posición en la que mostrar las herramientas y errores
    relPos = getSelectionRelativeCoords(jQuery(this).get(0).getBoundingClientRect());

    jQuery('#ununderliner').css({
            "top": relPos.top ,
            "left": relPos.left
        }
    ).css({
            "top": '+=5',
            "left": '-=5'
        }
    ).fadeIn();
    jQuery('#underliner-error').css({
            "top": relPos.top,
            "left": relPos.left
        }
    ).css({
        "top": '+=40'
    });
    jQuery('#underliner').fadeOut();
});

//hace que no desaparezca la selección actual al hacer click en una herramienta
// si desapareciera, no sabriamos que texto había seleccionado el usuario
jQuery('.js-underline').on('mousedown', function(e) {
    e.preventDefault();
});

//evento de click en una de las 2 herramientos (añadir/quitar subrayado)
jQuery('.js-underline').on('click', function(e) {
    e.preventDefault();
    var self = this;

    var addClass = 'action_add_underline',
        removeClass = 'action_remove_underline';

    //muestra el circulo de loading
    jQuery('.underliner-loader').show();

    //herramienta "nuevo underline"
    if ( jQuery(this).hasClass(addClass) ) {

        var range = window.getSelection().getRangeAt(0);

        //solo actuamos si sigue seleccionado algo
        if (range.startOffset != range.endOffset) {
            var selectionText = range.toString();
            var target = jQuery(this).data('article');

            jQuery.ajax({
                url: jQuery(self).data('underline-url'),
                data: {
                    'target': target,
                    'text': selectionText
                },
                dataType: 'json',
                timeout: 2000
            })
            .done(function (data) {
                if (data.success) {
                    //si todo va bien, reemplazamos la selección por ella misma, envuelta en un span
                    var selectionContents = range.extractContents();
                    var underline_span = document.createElement("span");
                    underline_span.className = 'underlined_text mine';
                    underline_span.appendChild(selectionContents);
                    range.insertNode(underline_span);

                    jQuery('#underliner').fadeOut();
                } else {
                    //si algo ha fallado, mostramos error
                    //es un error controlado, aquí podriamos mostrar un error más específico que devuelve el backend
                    jQuery('#underliner-error').fadeIn().delay(5000).fadeOut();
                }
            })
            .fail(function (jqXHR, textStatus) {
                //si algo ha fallado, mostramos error
                //es un error incontrolado (404, 500,...), mostramos un error genérico por simplificar
                jQuery('#underliner-error').fadeIn().delay(5000).fadeOut();
            })
            .always(function () {
                //en cualquier caso, ocultamos el circulo loader
                jQuery('.underliner-loader').hide();
            });
        }
    } else { //herramienta "quitar underline"
        var selection_text = jQuery(this).data('underlined-text');
        var target_article = jQuery(this).data('article');

        jQuery.ajax({
            url: jQuery(self).data('ununderline-url'),
            data: {
                'target': target_article,
                'text': selection_text
            },
            dataType: 'json',
            timeout: 2000
        })
        .done(function (data) {
            if (data.success) {
                //le quita la clase al span
                var selector = ".underlined_text.mine:contains(" + selection_text + ")";
                jQuery(selector).removeClass('mine').removeClass('underlined_text');

                jQuery('#ununderliner').fadeOut();
            } else {
                //si algo ha fallado, mostramos error
                //es un error controlado, aquí podriamos mostrar un error más específico que devuelve el backend
                jQuery('#underliner-error').fadeIn().delay(5000).fadeOut();
            }
        })
        .fail(function (jqXHR, textStatus) {
            //si algo ha fallado, mostramos error
            //es un error incontrolado (404, 500,...), mostramos un error genérico por simplificar
            jQuery('#underliner-error').fadeIn().delay(5000).fadeOut();
        })
        .always(function () {
            //en cualquier caso, ocultamos el circulo loader
            jQuery('.underliner-loader').hide();
        });
    }
});


//calcula las coordenadas en las que se encuentra el texto selccionado, relativas al inicio del contenido del artículo
function getSelectionRelativeCoords (selection) {
    var parentPos = document.getElementById('post-content').getBoundingClientRect(),
    relativePos = {};

    relativePos.top = selection.top - parentPos.top-40,
    relativePos.right = selection.right - parentPos.right,
    relativePos.bottom = selection.bottom - parentPos.bottom,
    relativePos.left = selection.left - parentPos.left + selection.width + 5;
    return relativePos;
}