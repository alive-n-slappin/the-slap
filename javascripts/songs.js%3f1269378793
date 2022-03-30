var currentIndex = -1;

var addCommentsAndLikesToItemAtIndex = function(childSelectorStr, index) {
    var $child = childAtIndex(childSelectorStr, index);
    $("#comments_holder").html("Loading...").appendTo($child).load($child.attr("comments_url"));
};

var setCurrentIndex = function(index, skipCoverflowUpdate) {
    if (index < 0 || index > activePlaylist.length-1 || index == currentIndex) return;
    currentIndex = index;
    setCoverflowIndexSafely(index);
    setActiveItemByIndex(index);
    addCommentsAndLikesToItemAtIndex(".song_list li", index);
};

var updateCoverflow = function() {
   setCurrentIndex($f().getClip().index); 
}; 
   
var incIndex = function() { setCurrentIndex(currentIndex + 1) };
var decIndex = function() { setCurrentIndex(currentIndex - 1) };

var playCurrent = function() {
    if ($('audio').length) {
        $('audio:first').trigger('play')
    } else {
        $f("player").stop();
        $f("player").play(currentIndex);
    }
};

var onPlayIndex = playCurrent;
var onCoverflowChangeStart = setCurrentIndex;

//plugin to add an ellipsis to any element longer than a maximum width
(function ($) {
    $.fn.ellipsis = function (max_width) {
        var max_width = max_width || 105;
        var ellipsis = $('<span style="float: left">…</span>');
        return this.each(function() {
            var obj = $(this);
            if (obj.width() > max_width) {
                obj.after(ellipsis).css({
                    'overflow': 'hidden',
                    'margin-right': '2px',
                    'white-space': 'nowrap',
                    'width': max_width - 15 + 'px'
                }).attr('title', obj.text().replace(/^\s*|\s*$/g,''));
            }
        });
    };
})(jQuery);

$(document).ready(function() {
    
    $('ul.asset_list li').livequery('click', function() {
        if (!$(this).is('.active')) {
            setCurrentIndex($(this).myIndex());
            playCurrent();
        }
        return true;
    });

    loadCoverflowSwf(coverflowFlashVars, function(e) {
        if (e.success)
            loadCoverflow(activePlaylist);
        else {
            // alert("Unable to load Coverflow swf");
        }
    });

    hookAssetNavKeys(decIndex, incIndex, playCurrent);

    // Flowplayer doesn't like single quotes, escape w/ %2527
    // http://flowplayer.org/forum/3/20389
    var escapedPlaylist = $.each(activePlaylist, function(idx, attrs) {
        attrs['title'] = attrs['title'].replace("'", "%2527");
    });
    
    $f("player", "/swf/flowplayer.commercial-3.2.5.swf", {
        playlist: escapedPlaylist,
        plugins: {                      
            controls: null,
    		audio: { url: 'flowplayer.audio-3.2.1.swf'}
        },
        clip: {
            autoPlay: false,
            onPause: function () {},
            onResume: function () {},
    		onBeforeBegin: function() {
    		  updateCoverflow()
    		},
            onBegin: function() {},
            onBeforeStop: function() {},
            onStop: function () {},
            onBeforeStop: function () {},
            onError: function (errorCode, errorMessage) {},
            onUpdate: function() {}
        }
    });
    
    $('.control_bar').controlbar({
        debug: false, 
        skip: true,
        getTime: function(){
            return $f().getTime()
        },
        getLength: function(){
            return activePlaylist[$f().getClip().index].duration;
        },
        getBuffer: function(){
            return 100 * $f().getStatus().bufferEnd / activePlaylist[$f().getClip().index].duration;
        },
        isPlaying: function(){
            return $f().isPlaying();
        },
        commands: {
            play: function(){ 
                $f().play();
            },
            pause: function(){ 
                $f().pause();
            },
            volume: function(data){
                var volume = data.value * 100 / 2;
                $f().setVolume(volume);
            },
            backward: function(){
                if (currentIndex > 0) {
                   $f().play(currentIndex -1);
                }
            },
            forward: function(){ 
                if (currentIndex < activePlaylist.length) {
                    $f().play(currentIndex + 1);
                }
            }, 
            seek: function(data){
                $f().seek(data.value);
            }   
        }
    });

    $f("player").setPlaylist(escapedPlaylist);

    $('.asset_list .item').hoverize();
    
    // Support non-flash browsers that can play mp3s -t29
    if (window.swfobject && !swfobject.hasFlashPlayerVersion('9')) {
        if ($('<audio>')[0].canPlayType('audio/mp3')){
            //html5 audio player
            $('.control_bar').empty().append($('<audio controls="true" autobuffer src="'+activePlaylist[0].url+'">')).css({overflow:'visible'});
            setCoverflowIndexSafely = function(currentIndex) {
                $('#coverflow img').fadeOut();
                $('.control_bar').html('').append($('<audio controls="true" autoplay src="'+activePlaylist[currentIndex].url+'">'));
                $('.control_bar audio')[0].play();
                $('#coverflow').html('').append($('<img src="'+activePlaylist[currentIndex].albumImageUrl+'">').fadeIn());
            }
            $('#coverflow').html('').append($('<img src="'+activePlaylist[0].albumImageUrl+'">').fadeIn().livequery('click',function(){
                $('.control_bar audio')[0].play();
            }));
        } else {
            //just link to audio files
            setCoverflowIndexSafely = function(currentIndex) { 
                location.href = activePlaylist[currentIndex].url;
            }             
        }
        $('#player').empty();
    }
    
    //add ellipsis to long artist name
    $('.artist.cell').ellipsis(125);
    
    //autoplay song if it's in the url
    var first_song_link = $('a[href$=' + location.hash + ']:first');
    if (first_song_link.length) {
        first_song_link.parents('li').click();   
    }
});



