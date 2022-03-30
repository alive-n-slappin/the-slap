mtvn.btg.Controller.init(); 
if (typeof prop4 == 'undefined') {
    mtvn.btg.Controller.sendPageCall( { 
            pageName: 'TheSlap.com'+location.pathname, 
                channel: 'TheSlap.com', 
                hier1: 'TheSlap.com'+location.pathname,
                hier2: 'TheSlap.com'+location.pathname 
                } );
} else {
    mtvn.btg.Controller.sendPageCall( { 
            pageName: 'TheSlap.com'+location.pathname, 
                channel: 'TheSlap.com', 
                prop4: prop4, 
                hier1: 'TheSlap.com'+location.pathname,
                hier2: 'TheSlap.com'+location.pathname 
                } );
}
var zone = location.pathname;
if(zone.indexOf(".html")<0){
	if(zone.charAt(zone.length-1)!="/") zone+="/index.html";
	else zone+="index.html";
}
zone=zone.replace(/[- ]/gi,"_");
var arr = zone.split("/");
if(arr.length==2){
		if(arr[1]=="index.html")
			zone = "/_hp";
}else if(arr.length==3){
		if(arr[2]=="index.html")zone = "/"+arr[1]+"/_mn";
	}
function gamePlay(){
	mtvn.btg.config.ReportSettings.Omniture["pageName"] = 'TheSlap.com'+location.pathname+'-playAgain'; 
	mtvn.btg.Controller.init(); 
	mtvn.btg.Controller.sendPageCall(); 

    	}
/*
	urlAlias: unique page name/identifier
	contentType: game or PDF, or etc.  the content type of material the user is printing	
*/
function printReporting(site,urlAlias,contentType,showID,numberPages){
    try{
        var oldAcct = mtvn.btg.config.ReportSettings.Omniture.account;
        mtvn.btg.config.ReportSettings.Omniture.account = "viakfprint";
        mtvn.btg.Controller.init();
        mtvn.btg.Controller.sendPageCall({
            pageName: site+"-"+contentType+"-"+showID+"-"+urlAlias,
            channel: site,
            hier1: site+"/"+contentType+"/"+showID+"/"+urlAlias,
            hier2: site+"/"+contentType+"/"+showID+"/"+urlAlias,
            prop1: numberPages,
            prop2: site,
            prop3: contentType,
            prop4: showID,
            prop5: urlAlias
        });
        var _printPixel = "http://ad.doubleclick.net/ad/nick.nol/hp_printables;adid=230867644;sz=1x1;ord=123;";
        var DCPrint = document.createElement('img');
        DCPrint.setAttribute('src',_printPixel);
        mtvn.btg.config.ReportSettings.Omniture.account = oldAcct;
        mtvn.btg.Controller.init();
    }catch(e){}
}

// do printReporting for links with title 'print-reporting-1', replacing 1 with number of pages
$(function(){
    var prints = $('body.static_page a[title^=print-reporting-]');
    prints.each(function(i){
        prints.eq(i).attr('data-title', prints.eq(i).attr('title') );
        prints.eq(i).removeAttr('title');
    });
    prints.click(function(event){
        var r = {
            printReporting: true,
            site: 'TheSlap',
            showID: 'vic',
            contentType: 'Printable Item',
            urlAlias: location.pathname.replace(/@.*|\//, ''),
            numberPages: Math.floor($(this).attr('data-title').split(/reporting-/)[1])
        }
        try{console.log(r)}catch(e){};
        printReporting(r.site, r.urlAlias, r.contentType, r.showID, r.numberPages);
    });
});
