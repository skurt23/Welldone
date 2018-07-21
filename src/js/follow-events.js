var followClass = "action_add_fav",
    followIcon = "<i class='material-icons'>add</i>",
    unfollowClass = "action_remove_fav",
    unfollowIcon = "<i class='material-icons'>check</i>";

var loader = '<div class="preloader-wrapper small active"><div class="spinner-layer spinner-white-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';

//evento para crear nuevos follows (o eliminarlos)
jQuery('.js-follow').on('click', function(e){
    e.preventDefault();
    var target = jQuery(this).data('owner');
    var self = this;

    jQuery(this).html(loader);
    if ( jQuery(this).hasClass(followClass) ) {
        jQuery.ajax({
            url: jQuery(self).data('follow-url'),
            data: {
                'target': target
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    jQuery(self).removeClass(followClass)
                        .addClass(unfollowClass)
                        .html(unfollowIcon);
                }
            }
        });
    } else {
        jQuery.ajax({
            url: jQuery(self).data('unfollow-url'),
            data: {
                'target': target
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    jQuery(self).removeClass(unfollowClass)
                        .addClass(followClass)
                        .html(followIcon);
                }
            }
        });
    }
});