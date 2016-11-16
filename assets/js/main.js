/*
	Main JS
*/

function detectSize() {

    var windowWidth = $(window).width();

    if (windowWidth < 768) {
        $('body').removeClass('tablet').addClass('mobile');
    } else if (windowWidth > 767 && windowWidth < 980) {
        $('body').removeClass('mobile').addClass('tablet');
    } else {
        $('body').removeClass('mobile').removeClass('tablet');
    }

}

$(document).ready(function() {

	detectSize();

	// retina images
	if (window.devicePixelRatio > 1) {

		var images = $('img.retina');

		for(var i = 0; i < images.length; i++) {

            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "-2x" + imageType;
            images[i].src = imageName;

        }

	}

});

$(window).resize(function() {

	detectSize();

});