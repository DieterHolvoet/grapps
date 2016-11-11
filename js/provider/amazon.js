/* jshint browser: true, jquery: true */
/* global Provider, App */

/* Amazon Free App Of The Day */

var amazon = new Provider("amazon", "svg/provider_logo/amazon_appstore.svg");

amazon.featappshandler = function(data) {
    this.featappshandler.wait = $.Deferred();
    amazon.featapps.push(new App());
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    
    amazon.featapps[0].banner = $data.find(".fad-widget-promo-image a img").attr("source");
    amazon.featapps[0].title = $data.find("h3.fad-widget-app-name a").text();
    amazon.featapps[0].url = "https://www.amazon.com" + $data.find("h3.fad-widget-app-name a").attr("href");
    amazon.featapps[0].op = $data.find(".fad-widget-original-price").text();

    if ($data.find(".swSprite").hasClass("s_star_0_5")) {
        amazon.featapps[0].rating = "05";
    } else if ($data.find(".swSprite").hasClass("s_star_1_0")) {
        amazon.featapps[0].rating = "1";
    } else if ($data.find(".swSprite").hasClass("s_star_1_5")) {
        amazon.featapps[0].rating = "15";
    } else if ($data.find(".swSprite").hasClass("s_star_2_0")) {
        amazon.featapps[0].rating = "2";
    } else if ($data.find(".swSprite").hasClass("s_star_2_5")) {
        amazon.featapps[0].rating = "25";
    } else if ($data.find(".swSprite").hasClass("s_star_3_0")) {
        amazon.featapps[0].rating = "3";
    } else if ($data.find(".swSprite").hasClass("s_star_3_5")) {
        amazon.featapps[0].rating = "35";
    } else if ($data.find(".swSprite").hasClass("s_star_4_0")) {
        amazon.featapps[0].rating = "4";
    } else if ($data.find(".swSprite").hasClass("s_star_4_5")) {
        amazon.featapps[0].rating = "45";
    } else if ($data.find(".swSprite").hasClass("s_star_5_0")) {
        amazon.featapps[0].rating = "5";
    }
    
    this.featappshandler.wait.resolve();
};

amazon.appshandler = function(data) {
    this.appshandler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find('li.ilo2').each(function (i, eventItem) {
            var $eventItem = $(eventItem);
            amazon.apps.push(new App());
            amazon.apps[i].icon = $eventItem.find(".productImage img").attr("source");
            amazon.apps[i].title = $eventItem.find(".productImage ~ .ilt2 a span").text();
            amazon.apps[i].author = $eventItem.find(".mobileAppsRedesignSubtitle").text();
            amazon.apps[i].url = $eventItem.find(".ilc2 ~ .ilt2 a").prop("href");
            if(i === 7) return false;
    });
        
    this.appshandler.wait.resolve();
};

amazon.success = function(data) {
    amazon.featappshandler(data);
    $.when( amazon.featappshandler.wait ).done(function() {
        amazon.featapps[0].append(".col-3", amazon, "single-app");

        // Amazon Free App Of The Day Bundle
        $.ajax({
            // url: "backup/Amazon-Free_App_of_the_Day_Bundle.html",
            url: "crosscall.php",
            data: {url: "http://www.amazon.com/s/node=10076151011"},
            type: 'POST',
            success: function (data) {
                amazon.appshandler(data);
                $.when( amazon.appshandler.wait ).done(function() {
                    if(!amazon.addFallback(amazon.apps, "android", ".col-3")) {
                        amazon.addAppList(".col-3");
                        for (var i = 0; i < amazon.apps.length; i++) {
                            amazon.apps[i].append(".col-3", amazon, "app-list");
                        }
                    }
                    amazon.finish(".col-3");
                });
            } 
        });
    });
};

amazon.load = function() {
    $.ajax({
        url: 'crosscall.php',
        data: {url: "http://www.amazon.com/s/node=2446009011"},
        type: 'POST',
        success: function(data) {
            amazon.success(data);
        }
    });
};