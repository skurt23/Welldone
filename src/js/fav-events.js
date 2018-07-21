favClass = "active";

//evento para detectar nuevos favoritos (o eliminarlos)
jQuery('.js-favorite').on('click', function(e){
    e.preventDefault();
    var target = jQuery(this).data('article');
    var self = this;

    var favNumb = parseInt( jQuery(this).find('.numb').text(), 10 );
    if ( jQuery(this).hasClass(favClass) ) {
        jQuery.ajax({
            url: jQuery(self).data('unfav-url'),
            data: {
                'target': target
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    jQuery(self).removeClass(favClass);
                    --favNumb;
                    jQuery(self).find('.numb').text( favNumb );
                }
            }
        });
    } else {
        jQuery.ajax({
            url: jQuery(self).data('fav-url'),
            data: {
                'target': target
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    jQuery(self).addClass(favClass);
                    ++favNumb;
                    jQuery(self).find('.numb').text( favNumb );
                }
            }
        });
    }
});