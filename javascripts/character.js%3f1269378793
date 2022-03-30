$(document).ready(function() {
    $('.video_favorite_list, .photo_playlist_favorite_list').jcarousel({
        scroll: 1,
        visible: 1,
        wrap: "last"
    });
    // We start out with the list not visible to reduce flicker, make visible now
    $(".module_container ul").css({visibility: "visible"});
    // Hide prev/next buttons if only one child
    $(".jcarousel-list li:only-child").closest(".jcarousel-container").find(".jcarousel-next, .jcarousel-prev").hide();
    
    // t191 & t311: Resize favorite video and photo lists to for long captions
    function module_resize(selector,offset) {
        var h, maxH=0;
        $(selector + " .description").each(function(){
            h = $(this).height();
            if (h > maxH) {
                maxH = h;
            }
        });
        maxH?
            $(selector + " .module_body_container").height(offset + maxH):
            setTimeout(function(){module_resize(selector,offset)}, 500);
    };
    module_resize(".character_favorite_videos", 220);
    module_resize(".character_favorite_photo_playlists", 242);

    // t250 - pulsing dot next to current status
    $.pulse = {
        start: function(id, speed) {
            if (arguments.length > 0) {
                $.pulse.obj = $('#' + id);
                $.pulse.speed = speed||500;
            };
            if ($.pulse.obj && $.pulse.obj.length > 0) {
                $.pulse.obj.fadeOut($.pulse.speed, function() {
                    $.pulse.obj.fadeIn($.pulse.speed, $.pulse.start);
                });
            }
        },
        stop: function() {
            if ($.pulse.obj) {
                $.pulse.obj.fadeIn($.pulse.speed/2);
                $.pulse.obj = $([]);
            }
        }
    };
    $.pulse.start('current_status_pulse', 4000);
    setTimeout('$.pulse.stop()', 20*60*1000); 
});
