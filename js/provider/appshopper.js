/* jshint browser: true, jquery: true */
/* global Provider, App, Grapps */

/* AppShopper (iPhone) */

var appshopper = new Provider("appshopper", "svg/provider_logo/appshopper.svg");

appshopper.handler = function(data, platform) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find(".main-content .app").each(function(i, eventItem) {
        var $eventItem = $(eventItem);
        appshopper.apps.push(new App());
        var loc = appshopper.apps.length - 1;
        appshopper.apps[loc].platform = platform;
        appshopper.apps[loc].title = $eventItem.find(".slide-wrap > .block-link > .details > h2").text();
        appshopper.apps[loc].icon = $eventItem.find(".slide-wrap > .block-link > .icon > img").attr("source");
        appshopper.apps[loc].url = "http://appshopper.com" + $eventItem.find("a:first-of-type").attr("href");
        appshopper.apps[loc].op = $eventItem.find(".old-price strike").text();
        appshopper.apps[loc].rating = Grapps.parseRating($eventItem.find(".icon .stars:first-of-type").attr("data-rating"));
    });
        
    this.handler.wait.resolve();
};

appshopper.success = function(data, platform) {
    switch(platform) {
        case "iphone":
            appshopper.handler(data, "iphone");
            $.when( appshopper.handler.wait ).done(function() {
                appshopper.addAppList(".col-3");
                $.each(appshopper.apps, function(i, eventItem) {
                    if($(eventItem).prop("platform") === "iphone") {
                        eventItem.append(".col-3", appshopper, "app-list");
                    }
                });
                appshopper.finish(".col-3");
            });
            break;
            
        case "ipad":
            appshopper.handler(data, "ipad");
            $.when( appshopper.handler.wait ).done(function() {
                appshopper.addAppList(".col-2");
                $.each(appshopper.apps, function(i, eventItem) {
                    if($(eventItem).prop("platform") === "ipad") {
                        eventItem.append(".col-2", appshopper, "app-list");
                    }
                });
                appshopper.finish(".col-2");
            });
            break;
    }
};

appshopper.load = function(platform) {
    $.ajax({
        url: 'crosscall.php',
        data: function() {
            switch(platform) {
                case "iphone":
                    return {url: "http://appshopper.com/iphone/prices/free"};
                    
                case "ipad":
                    return {url: "http://appshopper.com/ipad/prices/free"};
            }
        }(),
        type: 'POST',
        success: function(data) {
            appshopper.success(data, platform);
        }
    });
};