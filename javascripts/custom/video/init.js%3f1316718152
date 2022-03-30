$(document).ready(function() {
    
    // Replace all links that end with ".mp4" with a flowplayer / html5 video player.
    
    var options = {
        width: 689,
        height: 517,
        support: ['flowplayer', 'html'],
        autoplay: false
    }
    
    $.extend($.vplayer.defaults.flowplayer, {
        key: "#@3c16ade11588515688b"
    });
    
    $('a[href$=.mp4]').each(function(){
        options.src = this.href;
        
        if ($(this).attr('data-autoplay')) {
            options.autoplay = true 
        }
        
        if ($('img', this).length) {
            options.width = $('img', this).width();
            options.height = $('img', this).height();   
        }
        
        var videoContainer = $('<div class="videoContainer" />');
        
        $(this).replaceWith(videoContainer);
        
        videoContainer.vplayer(options);
       
    });

});

