/*
 * jquery.tools 1.1.2 - The missing UI library for the Web
 * 
 * [tools.scrollable-1.1.2, tools.scrollable.circular-0.5.1, tools.scrollable.autoscroll-1.0.1]
 * 
 * Copyright (c) 2009 Tero Piirainen
 * http://flowplayer.org/tools/
 *
 * Dual licensed under MIT and GPL 2+ licenses
 * http://www.opensource.org/licenses
 * 
 * -----
 * 
 * File generated: Fri Feb 19 12:50:13 GMT 2010
 */
(function(b){b.tools=b.tools||{};b.tools.scrollable={version:"1.1.2",conf:{size:5,vertical:false,speed:400,keyboard:true,keyboardSteps:null,disabledClass:"disabled",hoverClass:null,clickable:true,activeClass:"active",easing:"swing",loop:false,items:".items",item:null,prev:".prev",next:".next",prevPage:".prevPage",nextPage:".nextPage",api:false}};var c;function a(o,m){var r=this,p=b(this),d=!m.vertical,e=o.children(),k=0,i;if(!c){c=r}b.each(m,function(s,t){if(b.isFunction(t)){p.bind(s,t)}});if(e.length>1){e=b(m.items,o)}function l(t){var s=b(t);return m.globalNav?s:o.parent().find(t)}o.data("finder",l);var f=l(m.prev),h=l(m.next),g=l(m.prevPage),n=l(m.nextPage);b.extend(r,{getIndex:function(){return k},getClickIndex:function(){var s=r.getItems();return s.index(s.filter("."+m.activeClass))},getConf:function(){return m},getSize:function(){return r.getItems().size()},getPageAmount:function(){return Math.ceil(this.getSize()/m.size)},getPageIndex:function(){return Math.ceil(k/m.size)},getNaviButtons:function(){return f.add(h).add(g).add(n)},getRoot:function(){return o},getItemWrap:function(){return e},getItems:function(){return e.children(m.item)},getVisibleItems:function(){return r.getItems().slice(k,k+m.size)},seekTo:function(s,w,t){if(s<0){s=0}if(k===s){return r}if(b.isFunction(w)){t=w}if(s>r.getSize()-m.size){return m.loop?r.begin():this.end()}var u=r.getItems().eq(s);if(!u.length){return r}var v=b.Event("onBeforeSeek");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}if(w===undefined||b.isFunction(w)){w=m.speed}function x(){if(t){t.call(r,s)}p.trigger("onSeek",[s])}if(d){e.animate({left:-u.position().left},w,m.easing,x)}else{e.animate({top:-u.position().top},w,m.easing,x)}c=r;k=s;v=b.Event("onStart");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}f.add(g).toggleClass(m.disabledClass,s===0);h.add(n).toggleClass(m.disabledClass,s>=r.getSize()-m.size);return r},move:function(u,t,s){i=u>0;return this.seekTo(k+u,t,s)},next:function(t,s){return this.move(1,t,s)},prev:function(t,s){return this.move(-1,t,s)},movePage:function(w,v,u){i=w>0;var s=m.size*w;var t=k%m.size;if(t>0){s+=(w>0?-t:m.size-t)}return this.move(s,v,u)},prevPage:function(t,s){return this.movePage(-1,t,s)},nextPage:function(t,s){return this.movePage(1,t,s)},setPage:function(t,u,s){return this.seekTo(t*m.size,u,s)},begin:function(t,s){i=false;return this.seekTo(0,t,s)},end:function(t,s){i=true;var u=this.getSize()-m.size;return u>0?this.seekTo(u,t,s):r},reload:function(){p.trigger("onReload");return r},focus:function(){c=r;return r},click:function(u){var v=r.getItems().eq(u),s=m.activeClass,t=m.size;if(u<0||u>=r.getSize()){return r}if(t==1){if(m.loop){return r.next()}if(u===0||u==r.getSize()-1){i=(i===undefined)?true:!i}return i===false?r.prev():r.next()}if(t==2){if(u==k){u--}r.getItems().removeClass(s);v.addClass(s);return r.seekTo(u,time,fn)}if(!v.hasClass(s)){r.getItems().removeClass(s);v.addClass(s);var x=Math.floor(t/2);var w=u-x;if(w>r.getSize()-t){w=r.getSize()-t}if(w!==u){return r.seekTo(w)}}return r},bind:function(s,t){p.bind(s,t);return r},unbind:function(s){p.unbind(s);return r}});b.each("onBeforeSeek,onStart,onSeek,onReload".split(","),function(s,t){r[t]=function(u){return r.bind(t,u)}});f.addClass(m.disabledClass).click(function(){r.prev()});h.click(function(){r.next()});n.click(function(){r.nextPage()});if(r.getSize()<m.size){h.add(n).addClass(m.disabledClass)}g.addClass(m.disabledClass).click(function(){r.prevPage()});var j=m.hoverClass,q="keydown."+Math.random().toString().substring(10);r.onReload(function(){if(j){r.getItems().hover(function(){b(this).addClass(j)},function(){b(this).removeClass(j)})}if(m.clickable){r.getItems().each(function(s){b(this).unbind("click.scrollable").bind("click.scrollable",function(t){if(b(t.target).is("a")){return}return r.click(s)})})}if(m.keyboard){b(document).unbind(q).bind(q,function(t){if(t.altKey||t.ctrlKey){return}if(m.keyboard!="static"&&c!=r){return}var u=m.keyboardSteps;if(d&&(t.keyCode==37||t.keyCode==39)){r.move(t.keyCode==37?-u:u);return t.preventDefault()}if(!d&&(t.keyCode==38||t.keyCode==40)){r.move(t.keyCode==38?-u:u);return t.preventDefault()}return true})}else{b(document).unbind(q)}});r.reload()}b.fn.scrollable=function(d){var e=this.eq(typeof d=="number"?d:0).data("scrollable");if(e){return e}var f=b.extend({},b.tools.scrollable.conf);d=b.extend(f,d);d.keyboardSteps=d.keyboardSteps||d.size;this.each(function(){e=new a(b(this),d);b(this).data("scrollable",e)});return d.api?e:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.circular={version:"0.5.1",conf:{api:false,clonedClass:"cloned"}};b.fn.circular=function(e){var d=b.extend({},a.plugins.circular.conf),c;b.extend(d,e);this.each(function(){var i=b(this).scrollable(),n=i.getItems(),k=i.getConf(),f=i.getItemWrap(),j=0;if(i){c=i}if(n.length<k.size){return false}n.slice(0,k.size).each(function(o){b(this).clone().appendTo(f).click(function(){i.click(n.length+o)}).addClass(d.clonedClass)});var l=b.makeArray(n.slice(-k.size)).reverse();b(l).each(function(o){b(this).clone().prependTo(f).click(function(){i.click(-o-1)}).addClass(d.clonedClass)});var m=f.children(k.item);var h=k.hoverClass;if(h){m.hover(function(){b(this).addClass(h)},function(){b(this).removeClass(h)})}function g(o){var p=m.eq(o);if(k.vertical){f.css({top:-p.position().top})}else{f.css({left:-p.position().left})}}g(k.size);b.extend(i,{move:function(s,r,p,q){var u=j+s+k.size;var t=u>i.getSize()-k.size;if(u<=0||t){var o=j+k.size+(t?-n.length:n.length);g(o);u=o+s}if(q){m.removeClass(k.activeClass).eq(u+Math.floor(k.size/2)).addClass(k.activeClass)}if(u===j+k.size){return self}return i.seekTo(u,r,p)},begin:function(p,o){return this.seekTo(k.size,p,o)},end:function(p,o){return this.seekTo(n.length,p,o)},click:function(p,r,q){if(!k.clickable){return self}if(k.size==1){return this.next()}var s=p-j,o=k.activeClass;s-=Math.floor(k.size/2);return this.move(s,r,q,true)},getIndex:function(){return j},setPage:function(p,q,o){return this.seekTo(p*k.size+k.size,q,o)},getPageAmount:function(){return Math.ceil(n.length/k.size)},getPageIndex:function(){if(j<0){return this.getPageAmount()-1}if(j>=n.length){return 0}var o=(j+k.size)/k.size-1;return o},getVisibleItems:function(){var o=j+k.size;return m.slice(o,o+k.size)}});i.onStart(function(p,o){j=o-k.size;return false});i.getNaviButtons().removeClass(k.disabledClass)});return d.api?c:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.autoscroll={version:"1.0.1",conf:{autoplay:true,interval:3000,autopause:true,steps:1,api:false}};b.fn.autoscroll=function(d){if(typeof d=="number"){d={interval:d}}var e=b.extend({},a.plugins.autoscroll.conf),c;b.extend(e,d);this.each(function(){var g=b(this).scrollable();if(g){c=g}var i,f,h=true;g.play=function(){if(i){return}h=false;i=setInterval(function(){g.move(e.steps)},e.interval);g.move(e.steps)};g.pause=function(){i=clearInterval(i)};g.stop=function(){g.pause();h=true};if(e.autopause){g.getRoot().add(g.getNaviButtons()).hover(function(){g.pause();clearInterval(f)},function(){if(!h){f=setTimeout(g.play,e.interval)}})}if(e.autoplay){setTimeout(g.play,e.interval)}});return e.api?c:this}})(jQuery);


$(document).ready(function() {
  $("#right_now").scrollable({
    size: 1,
    items: '.list',
    item: '.list_item',
    keyboard: false,
    loop: true,
    speed: 400,
    vertical: false
  }).autoscroll({
    autoplay: true,
    interval: 9000
  }).circular();
});

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

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



$(document).ready(function(){   
    // extend $ to show and hide div.stage
    $.extend($, {
        hideStage: function(){
            $('#new_stuff_container .jcarousel-skin-tango').css('opacity', 1);
            $('.stage').fadeOut(function(){
                if ($.vplayer.players.length) {
                    swfobject.removeSWF($.vplayer.player.id);
                }
                $('.video, .fancy_info_block', this).remove();    
            });
            $('.jcarousel-next, .jcarousel-prev', new_stuff).fadeIn();
        }, showStage: function(){
            $('.stage', new_stuff).fadeIn(function(){
              $('#new_stuff_container .jcarousel-skin-tango').css('opacity', 0);   
            });
            $('.jcarousel-next, .jcarousel-prev', new_stuff).fadeOut();
        }
    });
    //make video links on homepage play the video
    var new_stuff = $('#new_stuff_container');
    $('a[href*="/the-slap/clips/"], a[href*="%2Fclips%2F"]', new_stuff).click(function(){   
        //loading display
        $('.loading_overlay', new_stuff).css('background-image', $(this).parent().parent().css('background-image')).show();
        $('.loading_overlay .icon', new_stuff).hide().fadeIn(800);
        //show div.stage
        $.showStage();
        var video_container = $('.video_container', new_stuff);
        video_container.prepend($("<div class='video'> </div> <div class='fancy_info_block' /> "));
        //generate video player
        var load_path = unescape(this.href).replace('/bump?to=', '') + '/play .videoContainer > div';
        $('.video', new_stuff).load(load_path, function(){
            $('.video', new_stuff).vplayer({
                autoplay: true,
                height: 238,
                width: 423,
                sid: 'TheSlap__Homepage',
                videoInfo: '.info',
                streaming: true,
                videoLoadingIndicator: '.videoLoadingIndicator', 
                overlay: {start: '.clickToPlay', end: '.moreClips'},
                onLinkHoverOn: function() {
                    $(this).stop().animate({'left': '-=5px'}, 'fast');  
                },
                onLinkHoverOff: function() {
                    $(this).animate({'left': 0}, 99); 
                }
            });          
            $('.loading_overlay', new_stuff).fadeOut();
            $('.moreClips a').each(function(){
                this.href = '/the-slap/bump?to=%2Fclips%2F' + encodeURIComponent(this.href.split('/clips/')[1]);
            }).click(function(){
                $('.clickToPlay > img').hide();
            });
        });
        //generate fancy info box
        $('.fancy_info_block', new_stuff).hide().load(unescape(this.href).replace('/the-slap/bump?to=', '') + '/fancy_info', function(){
             $('.fancy_info_block').fadeIn();
        });
        return false;
    });
    //close button
    $('.stage .fancy_close').click(function(){
        $.hideStage();
    }); 
   
    
    $($.vplayer).bind('end', function() {
        //unload video player
        swfobject.removeSWF($.vplayer.player.id);
        //account for descriptions that are too long to fit in limited space
        var MAX_HEIGHT = 40;
        $('.moreClips span').each(function(){
            var synopsis = $(this);
            if (synopsis.height() > MAX_HEIGHT) {
                synopsis.height(MAX_HEIGHT).attr('title', synopsis.text()).css('text-overflow', 'ellipsis');
            }
        });
    }); 
    
    $('a.new_comment').livequery( 'click', function() {
        location = this.href.replace( '%2Fcomments%2Fnew', '%23footer' );
        return false;
    })
})


$(document).ready(function(){
    var wink = {
        container: $('.wink_container:first'),
        replacedContent: '#right_now_container, #new_stuff_container, #fun_facts_container',
        replacedContentMini: '#fun_facts_container'
    };
    wink.show = function(){
        wink.container.show();   
        var closeButton = $('.fancy_close:first').clone();
        wink.container.prepend(closeButton);
        closeButton.click(function(){
            wink.hide(); 
        });
    };
    wink.hide = function(){
        wink.replacedContent.css({'visibility':'visible'}).animate({opacity:1}, 'fast', 'swing');
        
        wink.replacedContent.find('.jcarousel-list').css('margin-top',0);
        
        wink.container.animate({opacity:0}, 'fast', 'swing', function(){
            if ($('object#wink_flash_animation').length) {
                swfobject.removeSWF('wink_flash_animation');
            }
            this.style.display = 'none';
        });
        
        $.cookie('i-was-winked', true);
    };
    if (wink.container.length) {
        wink.replacedContent = wink.container.hasClass('mini')? 
            $(wink.replacedContentMini):
            $(wink.replacedContent);
        wink.show();
        window.hideStage = function(){     // a global hook to be called from flash 
            wink.hide();
        } 
        $(window).bind('load', function(){
            // remove wink's loading gif
            wink.container.css('background', 'none');
        });
        // disable wink if no flash no fallback situtaion
        if (window.swfobject && !swfobject.hasFlashPlayerVersion('9')) {
            if (!wink.container.find('iframe:first').length) {
                wink.hide();
            }
        }
    }
    // stop wink if cookie is found
    if ($.cookie('i-was-winked')){
        setTimeout(function(){       
            wink.hide();
        }, 1) 
    }
});


$(document).ready(function() {

    var config = {
        scroll: 1,
        visible: 1,
        wrap: "last",
        animation: "slow"
    };
    $('.fun_facts').jcarousel(config);
    $('.new_stuff').jcarousel(jQuery.extend({}, config, { auto: 12 }));
    $('.game_of_months').jcarousel(config);
    $('#hot_pages').jcarousel(config);

    // We start out with the list not visible to reduce flicker, make visible now
    $("#new_stuff_container ul, #fun_facts_container ul, #game_of_months_container ul").css({visibility: "visible"});
    // Hide prev/next buttons if only one child
    // TODO: $(".jcarousel-list li:only-child").closest(".jcarousel-container").find(".jcarousel-next, .jcarousel-prev").hide();
});

$(document).ready(function()
{
    var c = document.getElementById("make_rex_speak_container");
    var ctx = c.getContext("2d");
    var img = document.getElementById("rex_image");
    ctx.drawImage(img, 0, 0, img.width * 3, img.height * 3);
});