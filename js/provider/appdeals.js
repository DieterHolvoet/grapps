/* jshint browser: true, jquery: true */
/* global Provider, App */

/* AppDeals */

var appdeals = new Provider("appdeals", "svg/provider_logo/appdeals.svg");

appdeals.handler = function(data) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    $(data).find(".page_container section article").each(function(i, eventItem) {
        var $eventItem = $(eventItem);
        if(!$eventItem.find(".btn_price_container div").hasClass("expired")) {
            appdeals.apps.push(new App());
            var index = appdeals.apps.length - 1;
            appdeals.apps[index].title = $eventItem.find("h3 span:nth-of-type(2) strong").text();
            appdeals.apps[index].icon = $eventItem.find(".icon img").attr("source");
            appdeals.apps[index].url = $eventItem.find("a.icon").attr("href");
            appdeals.apps[index].op = "€" + $eventItem.find(".old_price a").text().replace(" €", "");

            if(appdeals.apps[index].op === "€0") {
                appdeals.apps[index].op = "FREE";
            }
        }
    });
    
    this.handler.wait.resolve();
};

appdeals.success = function(data) {
    appdeals.handler(data);
    $.when( appdeals.handler.wait ).done(function() {
        if(appdeals.apps.length !== 0) {
            appdeals.addAppList(".col-3");
            for(var i = 0; i < appdeals.apps.length; i++) {
                appdeals.apps[i].append(".col-3", appdeals, "app-list");
            }   
        }
        
        appdeals.addFallback(appdeals.apps, "android", ".col-3");
        appdeals.finish(".col-3");
    });
};

appdeals.load = function() {
    $.ajax({
        url: 'crosscall.php',
        data: {url: "http://www.appdealswp.com"},
        type: 'POST',
        success: function(data) {
            appdeals.success(data);
        }
    });
};