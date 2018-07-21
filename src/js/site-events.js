var $ = jQuery;

// callback after ready the document
$(document).ready(function(){

	$('.search-form-li').on('click',function(e){
		e.stopPropagation();
		$('.search-form-li').find('#initSearchIcon').addClass('hide');
		$('.search-form-wrap').removeClass('hide').find('input.search').focus();
		$('.side-nav').addClass('hide');
	});

	$(window).on('click',function(){
		$('.search-form-li').find('#initSearchIcon').removeClass('hide');
		$('.search-form-wrap').addClass('hide');
		$('.side-nav').removeClass('hide');
	});

	$(".primary-nav .button-collapse").sideNav();

	$("html").niceScroll({
		cursorwidth: '7px',
		zindex: '9999999'
	});

	var moment = require('moment');
	require('moment/locale/es');
	//TODO: poner el locale a EN cuando sea necesario
	//moment().format();

	update = function(){
		$('.then').each(function (index) {
			date = moment(new Date($( this ).attr('datetime')));
			$( this ).html(date.fromNow());
		});
	};

	update();
	setInterval(update, 30000);



	if ( $('#blog-posts').length > 0 ) {
		var Masonry = require('masonry-layout');
		var imagesLoaded = require('imagesloaded');

		//masonry hace que cada item encaje de forma que no queden huecos en blanco
		//útil cuando cada item tiene tamaños distintos
		//con columnWidth y percentPosition, se consigue que sea responsive
		//con horizontalOrder, se fuerza a que mantenga el mismo orden que en el html (de izq a dcha)
		var msnry = new Masonry( '#blog-posts', {
		  	itemSelector: 'article',
			columnWidth: 'article',
			percentPosition: true,
			horizontalOrder: true
		});

		//para que no haya problemas de descuadres, se debe volver a ejecutar cando se acaben de cargar las imágenes
		var imgLoad = imagesLoaded( document.querySelector('#blog-posts') );
		imgLoad.on( 'progress', function( instance, image ) {
			msnry.layout();
		});
	}

});


// callback after loading the window
$(window).on('load', function(){

	// Preloader
    $('.loader').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350);

});


$("#hide, #show").click(function (e) {
	e.preventDefault();

    if ($("#show").is(":visible")) {

        $("#show").animate({
            "margin-right": "-300px"
        }, 300, function () {
            $(this).hide();
        });

        $("#switch").animate({
            "margin-right": "0px"
        }, 300).show();
    } else {
        $("#switch").animate({
            "margin-right": "-300px"
        }, 300, function () {
            $(this).hide();
        });
        $("#show").show().animate({
            "margin-right": "0"
        }, 300);
    }
});

$("#hide, #show_languages").click(function (e) {
	e.preventDefault();

	if ($("#switch").is(":visible")) {
		$("#switch").animate({
			"margin-right": "-300px"
		}, 300).hide();

	} else {
		$("#switch").show().animate({
			"margin-right": "0px"
		}, 300, function () {

		});
	}
});


$("#show_languages").click(function (e) {
	//$('#categories-menu').css('height', '10px');
});

$("#hide").click(function (e) {
	//$('#categories-menu').css('height', 'auto');
});

$(document).ready(function(){
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
});