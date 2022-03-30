$(document).ready(function() {
    // If there isn't an image in the URL hash, add one using the defaultImagePath (set in the view)
    var imagePath = document.location.hash.slice(1),
        onGalleryLoad = function(){};
    if (!imagePath) {
        document.location.hash = "#" + defaultImagePath;
        onGalleryLoad = function(){
                $('.gallery img:first').click();
        }
    }

    $('.gallery li').each(function(idx) {
        $(this).data('index', (++idx));
    });

    // load and fade-in thumbnails
    $('.gallery li img').css('opacity', 0).each(function() {
            if (this.complete || this.readyState == 'complete') { $(this).animate({'opacity': 1}, 300)
            } else { $(this).load(function() { $(this).animate({'opacity': 1}, 300) }); }
    });

    $('.gallery').galleria({
         // #img is the empty div which holds full size images
         insert: '#img',

         // enable history plugin
         history: true,

         // Disabling advancing when clicking the photo for now as we have an extra slot at the end that is causing issues
         // and Chrome is fading-in twice
         clickNext: false,

         // function fired when the image is displayed
         onImage: function(image, caption, thumb) {
             // fade in the image, but not if it recently faded
             // (fix for Safari dbl fadein, also fix for hyperactive scrollers)
             if (!thumb.is('.fading')) {
                 thumb.addClass('fading');
                 setTimeout( function() { thumb.removeClass('fading') }, 8000 );
                 image.hide().fadeIn(500);
             }

             // animate active thumbnail's opacity to 1, other list elements to 0.6
             thumb.parent().fadeTo(200, 1).siblings().fadeTo(200, 0.6);

             // $('#img').data('currentIndex', $li.data('index')).trigger('image-loaded')

             $('#img')
                 .trigger('image-loaded')
                 .hover(
                     function(){ $('#img .caption').stop().animate({height: 50}, 250) },
                     function(){
                         if (!$('#show-caption').is(':checked')) {
                             $('#img .caption').stop().animate({height: 0}, 250)
                         }
                     }
                 );
         },

         // function similar to onImage, but fired when thumbnail is displayed
         onThumb: function(thumb) {
             var $li = thumb.parent(),
                 opacity = $li.is('.active') ? 1 : 0.6;

             // hover effects for list elements
             $li.hover(
                 function() { $li.fadeTo(200, 1); },
                 function() { $li.not('.active').fadeTo(200, opacity); }
             )
         }
     }); // .find('li:first').addClass('active'); // display first image when Galleria is loaded

    var canHandleThumbClicks = false;
    var isPseudoClickingThumb = false;
    $('.gallery').jcarousel({
        scroll: 1,
        visible: 3,
        wrap: "last",
        size: $('.gallery li').size() + 2,
        initCallback: initCallbackFunction,
        itemFirstInCallback: {
            onAfterAnimation: function(c, li, index) {
                var currentIndex = $('.gallery li.active').data('index');
                if (index == currentIndex)
                    return;
                isPseudoClickingThumb = true;
                if (canHandleThumbClicks)
                    $($(".gallery li img")[index-1]).click();
                isPseudoClickingThumb = false;
            }
        }
    });

    function updateMetaData(metaData) {
        $('.info_header .title .value').html(metaData.title);
        $('.info_header .description .value').html(metaData.description);
    }

    function createPhotoIndexElement() {
        var photo_index = $(document.createElement('div')).addClass('photo_index');
	    $('.jcarousel-container').append(photo_index);
    }

    function updatePhotoIndex(current, total) {
        $('.jcarousel-container .photo_index').html(current + "/" + total);
    }

    function createFirstLastNavElements(carousel) {
        var jcarousel_first = $(document.createElement('div')).addClass('jcarousel-first').addClass('jcarousel-first-horizontal');
	    carousel.firstButton = $('.jcarousel-container').append(jcarousel_first).find(".jcarousel-first");
        var jcarousel_last = $(document.createElement('div')).addClass('jcarousel-last').addClass('jcarousel-last-horizontal');
	    carousel.lastButton = $('.jcarousel-container').append(jcarousel_last).find(".jcarousel-last");

        carousel.firstButton.click(function() { carousel.scroll(0) });
        carousel.lastButton.click(function() { carousel.scroll(carousel.size()-2) });
    }

    function updateButtonState(button, enabled, disableClass) {
        button[enabled ? 'removeClass' : 'addClass'](disableClass)[enabled ? 'removeClass' : 'addClass'](disableClass+'-horizontal').attr('disabled', enabled ? false : true);
    }

    function updateFirstLastButtons(carousel) {
        var idx =  $('.gallery li.active').data('index');
        updateButtonState(carousel.firstButton, idx > 1, 'jcarousel-first-disabled');
        updateButtonState(carousel.lastButton, idx < (carousel.size() - 2), 'jcarousel-last-disabled');
    }

    function initCallbackFunction(carousel) {
        window.carousel = carousel;
        $('.gallery').css('left', "62px"); // start the first item in the middle

        createFirstLastNavElements(carousel);
        createPhotoIndexElement();

        var isScrolling = false;
        $('#img').bind('image-loaded',function() {
            var idx =  $('.gallery li.active').data('index');
            updateMetaData(metaData[idx - 1]);
            updatePhotoIndex(idx, carousel.size() - 2);
            updateFirstLastButtons(carousel);
            updateSlappedMetaInfo();
            updateActionsMetaInfo();
            updateCommentsMetaInfo();
            if (!(isScrolling || isPseudoClickingThumb)) {
                isScrolling = true;
                carousel.scroll(idx);
                isScrolling = false;
            }
            return false;
        });

        // Holding off on pseudo thumb clicks for a couple of seconds as they interfere with initialization.
        // Not sure if this is enough when downloads take longer, though...
        window.setTimeout(function() { canHandleThumbClicks = true }, 2000);
    }

    $(".all_slapped_list").jcarousel({
        scroll: 1,
        visible: 1,
        initCallback: slappedInitCallbackFunction
    });

    $(".all_comments_list").jcarousel({
        scroll: 1,
        visible: 1,
        initCallback: commentsInitCallbackFunction
    });

    $(".all_actions_list").jcarousel({
        scroll: 1,
        visible: 1,
        initCallback: actionsInitCallbackFunction
    });

    function updateSlappedMetaInfo() {
        if (!window.carousel || !window.slapped_carousel)
            return;
        var idx =  $('.gallery li.active').data('index');
        window.slapped_carousel.scroll(idx, false);
    }

    function slappedInitCallbackFunction(carousel) {
        window.slapped_carousel = carousel;
        updateSlappedMetaInfo();
    }

    function updateCommentsMetaInfo() {
        if (!window.carousel || !window.comments_carousel)
            return;
        var idx =  $('.gallery li.active').data('index');
        window.comments_carousel.scroll(idx, false);
    }

    function commentsInitCallbackFunction(carousel) {
        window.comments_carousel = carousel;
        updateCommentsMetaInfo();
    }

    function updateActionsMetaInfo() {
        if (!window.carousel || !window.actions_carousel)
            return;
        var idx =  $('.gallery li.active').data('index');
        window.actions_carousel.scroll(idx, false);
    }

    function actionsInitCallbackFunction(carousel) {
        window.actions_carousel = carousel;
        updateActionsMetaInfo();
    }

    // We start out with the list not visible to reduce flicker, make visible now
    $(".gallery, .all_slapped_list, .all_comments_list, .all_actions_list").css({visibility: "visible"});
    
    // Gallery doesn't properly init in IE6/7. This hack fixes it by 'clicking' the active thumbnail
    if ($.browser.msie && $.browser.version < 8){ 
        onGalleryLoad = function(){
            var uri = location.hash.slice(1).replace('large', 'thumb');
            var thumb = $('ul img[src*="'+uri+'"]');
            thumb.click();
        };
    }
    setTimeout(onGalleryLoad, 2000);
});