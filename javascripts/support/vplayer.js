// jquery.vplayer.js
// replaces video information on page with flash or html video player

(function($){                
    $.vplayer = {
        players: [],
        containers: [],
        count: 0
    };  
    $.vplayer.defaults = {  
        support: ['flowplayer', 'html'],
        width: 480,
        height: 270,
        src: '',
        autoplay: false
    };           
    $.vplayer.defaults.flowplayer = {
        swf: '/swf/flowplayer.commercial-3.2.7.swf',
        id: 'flowplayer',   
        scaling: 'fit',   
        autoBuffering: true,  
        key: '#@ad6933049a88872eba6',
        controls: {
            autoHide: "always",
            height: 22,
            backgroundColor: '#000000',
            backgroundGradient: 'none',
            fontColor: '#ffffff'
        }
    };
    $.vplayer.defaults.flash = {
        version: '9.0.0', 
        allowFullScreen:'true', 
        allowScriptAccess: 'always',
        wmode: 'opaque',
        bgcolor: '#000000'
    };
                       
    $.vplayer.options = $.vplayer.defaults;
        
    $.vplayer.linkState = {
        generate: function(obj) {
            obj.prepend($('<a href="'+$.vplayer.options.src+'">'+$.vplayer.options.src+'</a>'));
        },
        isSupported: function() {
            return true;
        }
    };  
    $.vplayer.htmlState = {
        generate: function(obj) {
            var options = $.vplayer.options;
            obj.prepend($('<video width="'+options.width+'" height="'+options.height+'" src="'+options.src+
                (options.autoplay? '" autoplay="true"': '"')+(options.poster? 'preload="true" poster="'+options.poster:'')+
                '" controls="controls" />'));
        },
        isSupported: function() {
            var v = document.createElement("video"); 
            return v.canPlayType && v.canPlayType('video/mp4') || $.vplayer.isDroid();
        }
    };
    $.vplayer.flowplayerState = {
        generate: function(obj) {
            var options = $.vplayer.options;
            var objectId = options.flowplayer.id+ $.vplayer.count;
            obj.prepend($('<a href="'+options.src+'" id="'+objectId+'"/>'));
            $('#'+objectId).css({
                 height: options.height + 'px', width: options.width + 'px'
            });
            var videoPlayer = flowplayer(objectId, options.flowplayer.swf, {
                 plugins: {
                     controls: options.flowplayer.controls
                 },
                 key: options.flowplayer.key, 
                 clip: {
                     autoPlay: options.autoplay? true: false,
                     scaling: options.flowplayer.scaling,
                     autoBuffering: options.flowplayer.autoBuffering
                 },
                 canvas: {
                    backgroundGradient: 'none'
                 },
                 logo: {opacity: 0}
            });
        },
        isSupported: function() {
            return (window.flowplayer && (parseInt($.vplayer.getFlashVersion()) >= 9)) ? true : false;
        }
    };
    $.vplayer.pickState = function() {        
        var supportArray = $.vplayer.options.support;
        var stateName, state = false;
        for (var i=0; i < supportArray.length; i++) if (!state){
             stateName = supportArray[i] + 'State';
             if ($.vplayer[stateName] && $.vplayer[stateName].isSupported()) {
                 state = $.vplayer[stateName];
             }
        };
        if (!state) {
            state = $.vplayer.linkState;
        };
        return state;
    };
    $.vplayer.pushPlayer = function(obj) {
        //add a video player to array at $.vplayer.players     
        var playerJQuery = $('*:first', obj) 
        var vplayerIndex = obj[0].vplayerIndex;
        $.vplayer.player = playerJQuery[0]; 
        //add that element to the players array if it has a pause function.
        if ((playerJQuery.length > 0) && playerJQuery[0].pause || (playerJQuery[0].type && playerJQuery[0].type.match(/flash/))) {
            $.vplayer.player = playerJQuery[0];
            $.vplayer.index = vplayerIndex;
            $.vplayer.players[vplayerIndex] = $.vplayer.player;
            $.vplayer.containers[vplayerIndex] = obj[0];
        } else if (window.flowplayer && $f(vplayerIndex)) {
            $.vplayer.player = $f(vplayerIndex);
            $.vplayer.index = vplayerIndex;
            $.vplayer.players[vplayerIndex] = $.vplayer.player;
            $.vplayer.containers[vplayerIndex] = obj[0];
        } else {
            setTimeout(function(){$.vplayer.pushPlayer(obj)}, 200);
        }
        if($.vplayer.isDroid())
            playerJQuery.click(function(){ this.play() });
        
        if (typeof $.vplayer.pushPlayerCallBack == 'function') {
            $.vplayer.pushPlayerCallBack($.vplayer.player);
        }
    };
    $.vplayer.getFlashVersion = function(){
        try {    
            try {   // ie
                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                try { axo.AllowScriptAccess = 'always'; }
                catch(e) { return '6,0,0'; }
            } catch(e) {}
            return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
        } catch(e) {    
            try {   // other browsers
                if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                }
            } catch(e) {};
        };
        return '0,0,0';
    };
    $.vplayer.nativeVideoSupport = function() {
        var v = document.createElement("video"); 
        return v.canPlayType && v.canPlayType('video/mp4');
    };
    $.vplayer.isDroid = function() {
        return (navigator.userAgent.toLowerCase().indexOf('android') != -1)   
    }
    $.vplayer.getVideoInfo = function(selector, obj) {
         var text = $(selector, obj).text();
         var cleanString = function(s){ s=s||''; return s.replace(/^\s*|\s*$/g,'')};
         var param, params = cleanString(text).split('|');
         for (var p=0; p < params.length; p++) {
             param = params[p].split('=');
             $.vplayer.options[cleanString(param[0])] = cleanString(param[1]);
         }
    };
    $.vplayer.getVideoTagInfo = function(obj) {
        var videoTag = $('video', obj);
        videoTag.each(function() {
            for (var prop in $.vplayer.options) if (this.getAttribute(prop)) {
                $.vplayer.options[prop] = this.getAttribute(prop);
            }
        });
    };
    $.vplayer.onPlayerAdded = function(obj, vplayerIndex) {
    };
    $.fn.vplayer = function(options) {   
        if (typeof options == 'undefined') {
            options = {};
        } 
        return this.each(function() {
            obj = $(this);
            obj.children().hide();
            $.vplayer.getVideoTagInfo(obj)            
            if (options.videoInfo) {
                $.vplayer.getVideoInfo(options.videoInfo, obj);
            };
            $.vplayer.options = $.extend(true, $.vplayer.defaults, options);
            if (options.support) {
                $.vplayer.options.support = options.support;    
            };
            obj.css({width: $.vplayer.options.width+'px', height: $.vplayer.options.height+'px'});
            var state = $.vplayer.pickState();
            state.generate(obj);
            $(this)[0].vplayerIndex = $.vplayer.count;
            $.vplayer.pushPlayer(obj);
            $.vplayer.onPlayerAdded(obj, $.vplayer.count);
            $.vplayer.count++;
        });
    };
})(jQuery);

// vplayer extensions

(function($){     
    //add mtvn player support to vplayer
    $.extend(true, $.vplayer, {
        defaults: {
            support: ['mtvn', 'html'],
            mtvn: {
                configUrl: '/videoxml/playlist002.xml', 
                id: 'mtvnPlayer',
                player: '/mtvn/vplayer.swf?v=037'
            }
        },
        mtvnState: {
            generate: function(obj) {
                var options = $.vplayer.options;
                var objectId = options.mtvn.id + $.vplayer.count;
                var el = $('<div id="'+objectId+'" />');
                obj.prepend(el);
                var flashvars = {configUrl: options.config, vplayerIndex: $.vplayer.count};             
                if (options.autoplay){ flashvars.autoplay = 'true'; };
                if (options.sid) { flashvars.sid = options.sid; };
                if (options.mgid) { flashvars.mgid = options.mgid; };
                if (options.group) { flashvars.group = options.group; };
                if (options.streaming) { flashvars.streaming = options.streaming; };
                swfobject.embedSWF(options.mtvn.player, objectId, options.width,  options.height, options.flash.version, '', 
                    flashvars, 
                    {allowFullScreen: options.flash.allowFullScreen, allowScriptAccess: options.flash.allowScriptAccess, 
                    wmode: options.flash.wmode, bgcolor: options.flash.bgcolor}
                );

            },
            isSupported: function() {
                return (parseInt($.vplayer.getFlashVersion()) >= 9); 
            }
        }
    });
    
    // add overlays before and after video
    $.extend($.vplayer, {
        overlays: [],
        onPlayerAdded: function(obj) {
            var overlays = $.vplayer.options.overlay || {};
            $.vplayer.setOverlays(overlays, obj);        
        },
        setOverlays: function(overlays, obj) {
            if (!$.vplayer.overlays[$.vplayer.count]) {
                 $.vplayer.overlays[$.vplayer.count] = {};
            }
            var overlay, links, a;
            for (var kind in overlays) {
                 overlay = $(overlays[kind], obj);
                 $.vplayer.overlays[$.vplayer.count][kind] = overlay;
                 overlay.css({
                     width: $.vplayer.options.width + 'px',
                     height: $.vplayer.options.height + 'px',
                     'z-index': 1200
                 })
                 overlay[0].vplayerIndex = $.vplayer.count;
                 switch (kind) {
                 case 'start':
                     if ($.vplayer.options.videoLoadingIndicator) {
                         $($.vplayer.options.videoLoadingIndicator, obj).show();
                     }
                     break;
                 case 'end': 
                    links = $('a', obj);
                    for(a=0; a < links.length; a++) {
                        links[a].vplayerIndex = $.vplayer.count;
                        links[a].linkIndex = a;
                        links.eq(a).click(function(event) {
                            if (!$.vplayer.loading) {
                                $.vplayer.showLoading(this.vplayerIndex);
                            }
                            $.vplayer.overlays[this.vplayerIndex].end.fadeOut('slow');
                            $.vplayer.overlays[this.vplayerIndex].start.fadeIn('fast');
                        });
                        if ($.vplayer.options.onLinkHoverOn && $.vplayer.options.onLinkHoverOff) {
                            links.eq(a).hover($.vplayer.options.onLinkHoverOn, $.vplayer.options.onLinkHoverOff);
                        };
                    }
                    break;            
                 }
            };    
        },
        showOverlay: function(index, overlayType) {
             //alert('showOverlay index: ' + index + ', overlayType: ' + overlayType);
             if ($.vplayer.overlays[index] && $.vplayer.overlays[index][overlayType]) {
                if ((overlayType=='end') && $.vplayer.overlays[index].start && 
                    ($.vplayer.overlays[index].start.css('display')=='block')) {
                        return;
                };
                $.vplayer.overlays[index][overlayType].show();         
                if ($.vplayer.options.playIcon) {
                    $($.vplayer.options.playIcon, $.vplayer.overlays[index][overlayType]).hide();   
                };    
                if ($.vplayer.options.videoLoadingIndicator) {
                    $($.vplayer.options.videoLoadingIndicator, $.vplayer.overlays[index][overlayType]).show();   
                }
                $.vplayer.centerElements($.vplayer.overlays[index][overlayType]);
                if (overlayType=='end') {
                    $($.vplayer).trigger('end');
                }
             } 
        },
        hideOverlay: function(index, overlayType) {
             //alert('hideOverlay index: ' + index + ', overlayType: ' + overlayType);
             if ($.vplayer.overlays[index] && $.vplayer.overlays[index][overlayType] && ($.vplayer.overlays[index][overlayType].css('display') != 'none')) {
                $.vplayer.overlays[index][overlayType].hide();
                $.vplayer.players[index].focus();
                $.vplayer.players[index].unpause();
             } 
        },
        showLoading: function(index) {
             if (!$.vplayer.loading && $.vplayer.overlays[index] && $.vplayer.overlays[index].start && $.vplayer.options.videoLoadingIndicator) {
                var container = $.vplayer.overlays[index].start;        
                $($.vplayer.options.videoLoadingIndicator, container).show();
                if ($.vplayer.options.playIcon) {
                    $($.vplayer.options.playIcon, container).hide();
                }
                $.vplayer.overlays[index].start.show();
                $.vplayer.loading = true;
                $('> img', $.vplayer.overlays[index].start).fadeOut('slow', function(){
                    $(this).show(); $.vplayer.overlays[index].start.hide();
                    $.vplayer.loading = false;
                });    
                if ($.vplayer.options.streaming) {
                    $.vplayer.overlays[index].start.show();
                    $('> img', $.vplayer.overlays[index].start).hide();   
                    $($.vplayer.options.videoLoadingIndicator, container).find('img').show().fadeOut(1500);
                }   
             } 
        },
        showReadyToPlay: function(index) {
                if (!$.vplayer.overlays || !$.vplayer.containers[index]) {
                  return;
                }
                var container = $.vplayer.containers[index];
                if ($.vplayer.options.videoLoadingIndicator) {
                    $($.vplayer.options.videoLoadingIndicator, container).hide();
                };
                if ($.vplayer.loading && $.vplayer.overlays && $.vplayer.overlays[index] && $.vplayer.overlays[index].start) {
                    $.vplayer.overlays[index].start.stop().hide();
                }
                if ($.vplayer.options.playIcon && !$.vplayer.loading) {
                    $($.vplayer.options.playIcon, container).fadeIn('fast');
                };
                var obj = $.vplayer.overlays[index].start || $.vplayer.overlays[index].end || $([])
                obj.click( function(){
                    $.vplayer.players[this.vplayerIndex].unpause();
                    $.vplayer.players[this.vplayerIndex].focus();
                }).css('cursor', 'pointer');
        },
        center: function(obj, container, w, h) {
            var w = w || container.width();
            var h = h || container.height();
            var width = obj.width();
            var height = obj.height();
            var moveLeft = w / 2 - width / 2 + 'px';
            var moveTop = h / 2 - height / 2 + 'px';
            obj.css({position: 'absolute',
                left: moveLeft,
                top: moveTop,
                'z-index': '3000'
            });
            //alert('w: ' +w+ ', h: ' + h +', width: '+width+', height: '+height)
        },
        centerElements: function(obj, arg) {
            var arg = arg || $.vplayer.options.center;
            switch (typeof arg) {
            case 'string': 
                $.vplayer.center($(arg, obj), obj); 
                break;
            case 'object': 
                for (var i=0; i < arg.length; i++) {
                    $.vplayer.center($(arg[i], obj), obj);
                };
                break;
            }
        }    
    });
    
    $.extend($.vplayer.defaults, {
        mgid: escape('mgid:cms:item:theslap.com:111111'),
        sid: 'TheSlap__Video_Clips',
        group: 'kids'
    });
    
})(jQuery);

