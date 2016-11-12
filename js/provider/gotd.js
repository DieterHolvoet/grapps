/* jshint browser: true, jquery: true */
/* global Provider, App */

/* Giveaway of the Day (Android/iPhone) */

var gotd = new Provider("gotd", "svg/provider_logo/giveawayoftheday.svg", null);

gotd.appshandler = function(data, platform) {
    this.appshandler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find(".col2 .wrapper_offers").each(function(i, eventItem) {
        gotd.apps.push(new App());
        var $eventItem = $(eventItem);

        gotd.apps[i].platform = platform;
        gotd.apps[i].icon = $eventItem.find(".icon100").attr("source");
        gotd.apps[i].title = $eventItem.find("h3 a").text();
        gotd.apps[i].url = $eventItem.find("h3 a").attr("href");
        gotd.apps[i].op = "$" + $eventItem.find(".discount b span").text().replace("$", "");
        gotd.apps[i].description = $eventItem.find(".short_dscr").text();
    });
        
    this.appshandler.wait.resolve();
};

gotd.success = function(data, platform) {
    switch(platform) {
        case "android":
            gotd.appshandler(data, "android");
            $.when( gotd.appshandler.wait ).done(function() {
                $.each(gotd.apps, function(i, app) {
                    if($(app).prop("platform") === "android") {
                        app.append(".col-3", gotd, "single-app");
                    }
                });
                gotd.addFallback(gotd.apps, "android", ".col-3");
                gotd.finish(".col-3");
            });
            break;
            
        case "iphone":
            gotd.appshandler(data, "iphone");
            $.when( gotd.appshandler.wait ).done(function() {
                gotd.addAppList(".col-2", gotd);
                $.each(gotd.apps, function(i, app) {
                    if($(app).prop("platform") === "iphone") {
                        app.append(".col-2", gotd, "app-list");
                    }
                });
                gotd.addFallback(gotd.apps, "iphone", ".col-2");
                gotd.finish(".col-2");
            });
            break;   
    }
};

gotd.load = function(platform) {
    $.ajax({
        url: 'crosscall.php',
        data: function() {
            switch(platform) {
                case "android":
                    return {url: "http://android.giveawayoftheday.com"};
                    
                case "iphone":
                    return {url: "http://iphone.giveawayoftheday.com"};
            }
        }(),
        type: 'POST',
        success: function (data) {
            gotd.success(data, platform);
        }
    });
};