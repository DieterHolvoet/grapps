/* jshint browser: true, jquery: true */
/* global Provider, App */

/* AppGratis (Android/iPhone) */

var appgratis = new Provider("appgratis", "svg/provider_logo/appgratis_flat.svg");

appgratis.handler = function(data, platform) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find('.deal:not(.expired)').each(function(i, eventItem) {
        var $eventItem = $(eventItem);
        appgratis.apps.push(new App());
        var loc = appgratis.apps.length - 1;
        
        appgratis.apps[loc].platform = platform;
        appgratis.apps[loc].icon = $eventItem.find("header div.app-icon img").attr("source");
        appgratis.apps[loc].title = $eventItem.find("header div.app-info span.item a").text().replace("[+] ", "");
        appgratis.apps[loc].subtitle = $eventItem.find("header div.app-info p.editor").text();
        appgratis.apps[loc].url = "https://appgratis.com" + $eventItem.find("header div.app-info span.item a").attr("href");
        appgratis.apps[loc].np = $eventItem.find("header div.app-info .price span.price-price").text();
        appgratis.apps[loc].description = $eventItem.find(".content article.summary").text();
    });
    
    this.handler.wait.resolve();
};

appgratis.success = function(data, platform) {
    switch(platform) {
        case "android":
            appgratis.handler(data, "android");
            $.when( appgratis.handler.wait ).done(function() {
                $.each(appgratis.apps, function(i, eventItem) {
                    if($(eventItem).prop("platform") === "android") {
                        eventItem.append(".col-2", appgratis, "single-app");
                    }
                });
                appgratis.finish(".col-2");
            });
            break;
            
        case "iphone":
            appgratis.handler(data, "iphone");
            $.when( appgratis.handler.wait ).done(function() {
                $.each(appgratis.apps, function(i, eventItem) {
                    if($(eventItem).prop("platform") === "iphone") {
                        eventItem.append(".col-1", appgratis, "single-app");
                    }
                });
                appgratis.finish(".col-1");
            });
            break;
            
        case "ipad":
            appgratis.handler(data, "ipad");
            $.when( appgratis.handler.wait ).done(function() {
                $.each(appgratis.apps, function(i, eventItem) {
                    if($(eventItem).prop("platform") === "ipad") {
                        eventItem.append(".col-1", appgratis, "single-app");
                    }
                });
                appgratis.finish(".col-1");
            });
            break;
    }
};
                
appgratis.load = function(platform) {
    $.ajax({
        url: 'crosscall.php',
        data: function() {
            switch(platform) {
                case "android":
                    return {url: "http://appgratis.com/android"};
                    
                case "iphone":
                    return {url: "http://appgratis.com"};
                    
                case "ipad":
                    return {url: "http://appgratis.com/ipad"};
            }
        }(),
        type: 'POST',
        success: function (data) {
            appgratis.success(data, platform);
        }
    });
};
