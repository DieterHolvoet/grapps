/* jslint white: true, browser: true, devel: true, windows: true, shadow: true, laxbreak: true */
/*global $, jQuery*/

$.ajaxSetup({async: true});

// Global variables
var activeFilter, appendWait, loadWait;

function setActiveFilter(filter) {
    $("#filter-" + filter).attr('style', 'background-image: url(svg/platform_logo/' + filter + '-selected.svg);');
    if(activeFilter) $("#filter-" + activeFilter).attr('style', 'background-image: url(svg/platform_logo/' + activeFilter + '.svg);');
    
    activeFilter = filter;
    document.location.hash = filter;
}

// App constructor
function App(title, subtitle, author, category, type, url, rating, icon, banner, screenshot, op, np, description, source) {
    this.title = title;
    this.subtitle = subtitle;   // Kan zowel ondertitel als auteur zijn
    this.category = category;
    this.type = type;
    this.url = url;
    this.rating = rating;
    this.icon = icon;
    this.banner = banner;
    this.screenshot = screenshot;
    this.op = op;
    this.np = np;
    this.description = description;
    
    this.append = function (location, provider, type) {
        appendWait = $.Deferred();        
        location = location + " .provider-entry." + provider.name;
        if (location) {
            if (type === "app-list") {
                // App is part of an app list;
                console.log("App list detected");
                $("<section class=\'app-entry clearfix\'>" 
                  + (this.icon !== undefined ? ("<img src=\'" + this.icon + "\'class=\'app-logo\'>") : "") 
                  + "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'><h1>" + this.title + "</h1></a>"
                  + (this.author !== undefined ? ("<p>" + this.author + "</p>") : "") 
                  + (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : "") 
                  + (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : "")
                  + (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : "") 
                  + (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : "")
                  + "</section>").insertBefore($(location + " .app-list > .btn_more_deals"));

            } else if (type === "single-app") {
                // App is not part of an app list
                console.log("Single app detected");
                $((this.banner !== undefined && provider.name === "amazon" ? ("<img src=\'" + this.banner + "\' class=\'app-banner\'></img>") : "")
                  + "<section class=\'app-entry clearfix\'>"
                  + (this.icon !== undefined ? ("<img src=\'" + this.icon + "\'class=\'app-logo\'>") : "")
                  + "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'><h1>" + this.title + "</h1></a>"
                  + (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : "")
                  + (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : "")
                  + (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : "")
                  + (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : "")
                  + "</section>" 
                  + ((this.description !== undefined) ? ("<section class=\'app-description\'><p>" + this.description + "</p></section>") : "")).appendTo($(location + " .provider-body"));
            }
        } else {
            console.log("Append target doesn't exist, assuming it was turned off in the preferences.");
        }
        
        $(".col-1").width($(".col-1 .provider-entry").width());
        $(".col-2").width($(".col-2 .provider-entry").width());
        $(".col-3").width($(".col-3 .provider-entry").width());
        
        appendWait.resolve();
        return appendWait;
    };
}

// Provider constructor and objects
function Provider(name, logo, preference) {
    this.name = name;
    this.logo = logo;
    this.preference = true;
    this.featapps = [];
    this.apps = [];
    this.apps_2 = [];
    this.apps_3 = [];
}

var appgratis = new Provider("appgratis", "svg/provider_logo/appgratis_flat.svg");
appgratis.handler = function(data, platform) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    $data = $(data);
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
//    amazon.featapps[0].np = $data.find(".fad-widget-new-price").text();

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

var gotd = new Provider("gotd", "svg/provider_logo/giveawayoftheday.svg");
gotd.featappshandler = function(data, platform) {
    this.featappshandler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find(".main-content > .featured-app").each(function(i, eventItem) {
        if(!$(this).hasClass("expired")) {
            gotd.featapps.push(new App());
            var loc = gotd.featapps.length - 1;
            var $eventItem = $(eventItem);

            gotd.featapps[loc].platform = platform;
            gotd.featapps[loc].title = $eventItem.find("h2 a").text();
            gotd.featapps[loc].url = $eventItem.find("h2 a").attr("href");
            gotd.featapps[loc].op = "$" + $eventItem.find(".col-sm-9 > .price .price-number").text().replace(" USD", "");
            gotd.featapps[loc].description = $eventItem.find(".col-sm-9").children("p").text().replace("More", "");

            $.ajax({
                url: 'crosscall.php',
                data: {url: gotd.featapps[loc].url},
                type: 'POST',
                async: false,
                success: function (data) {
                    data = data.replace(/src/gi,'source');
                    gotd.featapps[loc].icon = $(data).find(".app-logo").attr("source");
                    gotd.featapps[loc].subtitle = $(data).find(".col-sm-5 tr:first-of-type td:nth-of-type(2)").text().trim();
                }
            });
        }
    });
    
    this.featappshandler.wait.resolve();
};
gotd.appshandler = function(data, platform) {
    this.appshandler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    var $data = $(data);
    $data.find(".apps-list .app-block").each(function(i, eventItem) {
        if(!$(this).children(".price").hasClass("expired")) {
            gotd.apps.push(new App());
            var $eventItem = $(eventItem);
            
            gotd.apps[i].platform = platform;
            gotd.apps[i].icon = $eventItem.find(".app-logo").attr("source");
            gotd.apps[i].title = $eventItem.find("h3 a").text();
            gotd.apps[i].url = $eventItem.find("h3 a").attr("href");
            gotd.apps[i].op = "$" + $eventItem.find(".price-number").text().replace(" USD", "");
            gotd.apps[i].rating = parseRating($eventItem.find(".rating-number").text().replace('(', '').replace(')', ''));
            gotd.apps[i].description = $eventItem.children("p").text().replace("More", "");
        }
    });
        
    this.appshandler.wait.resolve();
};

var appshopper = new Provider("appshopper", "svg/provider_logo/appshopper.svg");
appshopper.handler = function(data, platform) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    $data = $(data);
    $data.find(".main-content .app").each(function(i, eventItem) {
        var $eventItem = $(eventItem);
        appshopper.apps.push(new App());
        var loc = appshopper.apps.length - 1;
        appshopper.apps[loc].platform = platform;
        appshopper.apps[loc].title = $eventItem.find(".slide-wrap > .block-link > .details > h2").text();
        appshopper.apps[loc].icon = $eventItem.find(".slide-wrap > .block-link > .icon > img").attr("source");
        appshopper.apps[loc].url = "http://appshopper.com" + $eventItem.find("a:first-of-type").attr("href");
        appshopper.apps[loc].op = $eventItem.find(".old-price strike").text();
        appshopper.apps[loc].rating = parseRating($eventItem.find(".icon .stars:first-of-type").attr("data-rating"));
    });
        
    this.handler.wait.resolve();
};

var myappfree = new Provider("myappfree", "svg/provider_logo/myappfree.svg");
myappfree.handler = function(data) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    $temp = $(data);
    myappfree.featapps.push(new App());

    myappfree.featapps[0].title = $temp.find(".name").text();
    myappfree.featapps[0].icon = $temp.find(".appicon img").attr("source");
    myappfree.featapps[0].url = $temp.find(".downloadnow a").attr("href");
    myappfree.featapps[0].description = $temp.find(".appdescription").text();
    myappfree.featapps[0].op = "$" + $temp.find(".price .oldprice").text();
    myappfree.featapps[0].np = $temp.find(".price").contents().filter(function() {
        return this.nodeType === 3;
    }).text().replace("Now ", "").replace('!', '');

    if($temp.find(".appdata .rating").hasClass("numberofstars0")) {
        myappfree.featapps[0].rating = "0";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars1")) {
        myappfree.featapps[0].rating = "1";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars1-5")) {
        myappfree.featapps[0].rating = "15";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars2")) {
        myappfree.featapps[0].rating = "2";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars2-5")) {
        myappfree.featapps[0].rating = "25";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars3")) {
        myappfree.featapps[0].rating = "3";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars3-5")) {
        myappfree.featapps[0].rating = "35";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars4")) {
        myappfree.featapps[0].rating = "4";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars4-5")) {
        myappfree.featapps[0].rating = "45";
    } else if($temp.find(".appdata .rating").hasClass("numberofstars5")) {
        myappfree.featapps[0].rating = "5";
    }

    $temp.find(".appDeal").each(function(i, eventItem) {                
        myappfree.apps.push(new App());
        var $eventItem = $(eventItem);

        myappfree.apps[i].title = $eventItem.find(".appName").text();
        myappfree.apps[i].icon = $eventItem.find("a img").attr("source");
        myappfree.apps[i].url = $eventItem.find("a").attr("href");
        if($eventItem.find(".appPrice span").text().trim() !== "") {
            myappfree.apps[i].op = $eventItem.find(".appPrice span").text();
        }
    });
        
    this.handler.wait.resolve();
};

var appdeals = new Provider("appdeals", "svg/provider_logo/appdeals.svg");
appdeals.handler = function(data) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');
    $temp = $(data);
        $temp.find(".page_container section article").each(function(i, eventItem) {
            var $eventItem = $(eventItem);
            if(!$eventItem.find(".btn_price_container div").hasClass("expired")) {
                appdeals.apps.push(new App());
                var index = appdeals.apps.length - 1;
                appdeals.apps[index].title = $eventItem.find("h3 span:nth-of-type(2) strong").text();
                appdeals.apps[index].icon = $eventItem.find(".icon img").attr("source");
                appdeals.apps[index].url = $eventItem.find("a.icon").attr("href");
                appdeals.apps[index].op = "€" + $eventItem.find(".old_price a").text().replace(" €", "");
                if(appdeals.apps[index].op === "€0") appdeals.apps[index].op = "FREE";
            }
    });
        
    this.handler.wait.resolve();
};

// Retreive apps
function parseRating(num) {
    // Source: https://goo.gl/Mznh7o
    num = Math.round(parseFloat(num) * 2) / 2;
    return num.toString().replace('.', '');
}

// Test if ANY/ALL page animations are currently active
// Source: http://goo.gl/9VQpkc
function animationsTest (callback) {
    var testAnimationInterval = setInterval(function () {
        if (!$.timers.length) { // any page animations finished
            clearInterval(testAnimationInterval);
            callback();
        }
    }, 25);
}

// Fallback if there are no apps to be loaded
function noApps(apps, platform, provider, location) {
    var anyApp = false;
    $.each(apps, function(i, eventItem) {
        if($(eventItem).prop("platform") === platform) {
            anyApp = true;
        }
    });
    if(!anyApp) {
        var str = "Unfortunately, there are no apps to display here today.<br>Come back tomorrow!";
        if(provider.name === "amazon") str = "Unfortunately, there is no ongoing Free App of the Day Bundle. Try again later!";
        $("<p class=\'noapps\'>" + str + "</p>").appendTo(location + " ." + provider.name + " .provider-body");
        return true;
    }
    return false;
}

function clearApps() {
    amazon.featapps = [];
    amazon.apps = [];
    appgratis.apps = [];
    gotd.featapps = [];
    gotd.apps = [];
    appshopper.apps = [];
    myappfree.featapps = [];
    myappfree.apps = [];
    appdeals.apps = [];
}

// Load all articles (apps), depending on the active platform filter
function loadArticles(filter) {
    loadWait = $.Deferred();
    animationsTest(function() {
        "use strict";
        switch(filter) {
            case "android":
                newProviderEntry(".col-2", appgratis, "single-column");
                newProviderEntry(".col-2", gotd, "single-column");
                newProviderEntry(".col-3", amazon, "single-column");
                
                // Amazon Free App Of The Day
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://www.amazon.com/s/node=2446009011"},
                    type: 'POST',
                    success: function (data) {
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
                                        if(!noApps(amazon.apps, "android", amazon, ".col-3")) {
                                            newAppList(".col-3", amazon);
                                            for (var i = 0; i < amazon.apps.length; i++) {
                                                amazon.apps[i].append(".col-3", amazon, "app-list");
                                            }
                                        }
                                        finish(".col-3", amazon);
                                    });
                                } 
                            });
                        });
                    }
                });

                // AppGratis (Android)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://appgratis.com/android"},
                    type: 'POST',
                    success: function (data) {
                        appgratis.handler(data, "android");
                        $.when( appgratis.handler.wait ).done(function() {
                            $.each(appgratis.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "android") {
                                    eventItem.append(".col-2", appgratis, "single-app");
                                }
                            });
                            finish(".col-2", appgratis);
                        });
                    }
                });
                
                // Giveaway of the Day (Android)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://android.giveawayoftheday.com"},
                    type: 'POST',
                    success: function (data) {
                        gotd.appshandler(data, "android");
                        $.when( gotd.appshandler.wait ).done(function() {
                            $.each(gotd.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "android") {
                                    eventItem.append(".col-2", gotd, "single-app");
                                }
                            });
                            noApps(gotd.apps, "android", gotd, ".col-2");
                            finish(".col-2", gotd);
                        });
                    }
                });
                break;

            case "iphone":
                newProviderEntry(".col-1", appgratis, "single-column");
                newProviderEntry(".col-2", gotd, "single-column");
                newProviderEntry(".col-3", appshopper, "single-column");
                
                // AppGratis (iPhone)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://appgratis.com"},
                    type: 'POST',
                    success: function (data) {
                        appgratis.handler(data, "iphone");
                        $.when( appgratis.handler.wait ).done(function() {
                            $.each(appgratis.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "iphone") {
                                    eventItem.append(".col-1", appgratis, "single-app");
                                }
                            });
                            finish(".col-1", appgratis);
                        });
                    }
                });

                // Giveaway of the Day (iPhone)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://iphone.giveawayoftheday.com"},
                    type: 'POST',
                    success: function (data) {
                        gotd.featappshandler(data, "iphone");
                        gotd.appshandler(data, "iphone");
                        $.when( gotd.featappshandler.wait, gotd.appshandler.wait ).done(function() {
                            $.each(gotd.featapps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "iphone") {
                                    eventItem.append(".col-2", gotd, "single-app");
                                }
                            });
                            newAppList(".col-2", gotd);
                            for (var i = 0; i < gotd.apps.length; i++) {
                                gotd.apps[i].append(".col-2", gotd, "app-list");
                            }
                            noApps(gotd.featapps, "iphone", gotd, ".col-2");
                            noApps(gotd.apps, "iphone", gotd, ".col-2");
                            finish(".col-2", gotd);
                        });
                    }
                });

                // AppShopper (iPhone)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://appshopper.com/iphone/prices/free"},
                    type: 'POST',
                    success: function(data) {
                        appshopper.handler(data, "iphone");
                        $.when( appshopper.handler.wait ).done(function() {
                            newAppList(".col-3", appshopper);
                            $.each(appshopper.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "iphone") {
                                    eventItem.append(".col-3", appshopper, "app-list");
                                }
                            });
                            finish(".col-3", appshopper);
                        });
                    }
                });
                break;

            case "windows":
                newProviderEntry(".col-2", myappfree, "single-column");
                newProviderEntry(".col-3", appdeals, "single-column");
                
                // MyAppFree
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://www.myappfree.it"},
                    type: 'POST',
                    success: function(data) {
                        myappfree.handler(data);
                        $.when( myappfree.handler.wait ).done(function() {
                            myappfree.featapps[0].append(".col-2", myappfree, "single-app");
                            newAppList(".col-2", myappfree);
                            for(var i = 0; i < myappfree.apps.length; i++) {
                                myappfree.apps[i].append(".col-2", myappfree, "app-list");
                            }
                            finish(".col-2", myappfree);
                        });
                    }
                });

                // AppDeals
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://www.appdealswp.com"},
                    type: 'POST',
                    success: function(data) {
                        appdeals.handler(data);
                        $.when( appdeals.handler.wait ).done(function() {
                            newAppList(".col-3", appdeals);
                            for(var i = 0; i < appdeals.apps.length; i++) {
                                appdeals.apps[i].append(".col-3", appdeals, "app-list");
                            }
                            finish(".col-3", appdeals);
                        });
                    }
                });
                break;

            case "ipad":
                newProviderEntry(".col-1", appgratis, "single-column");
                newProviderEntry(".col-2", appshopper, "double-column");
                
                // AppGratis (iPad)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://appgratis.com/ipad"},
                    type: 'POST',
                    success: function (data) {
                        appgratis.handler(data, "ipad");
                        $.when( appgratis.handler.wait ).done(function() {
                            $.each(appgratis.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "ipad") {
                                    eventItem.append(".col-1", appgratis, "single-app");
                                }
                            });
                            finish(".col-1", appgratis);
                        });
                    }
                });

                // AppShopper (iPad)
                $.ajax({
                    url: 'crosscall.php',
                    data: {url: "http://appshopper.com/ipad/prices/free"},
                    type: 'POST',
                    success: function(data) {
                        appshopper.handler(data, "ipad");
                        $.when( appshopper.handler.wait ).done(function() {
                            newAppList(".col-2", appshopper);
                            $.each(appshopper.apps, function(i, eventItem) {
                                if($(eventItem).prop("platform") === "ipad") {
                                    eventItem.append(".col-2", appshopper, "app-list");
                                }
                            });
                            finish(".col-2", appshopper);
                        });
                    }
                });
                break;

            default:
                console.error("Invalid calling of the loadArticles function");
                break;
        }
        
        function finish(location, provider) {
            $.when( appendWait ).done(function() {
                // Re-arrange the articles for the tablet layout
                if($(window).width() < 1500 && $(window).width() > 1150) {
                    if(activeFilter === "ipad") {
                        $(location).children().css("float", "left");
                    }
                    
                    if(location === ".col-2") {
                        $(location + " ." + provider.name).appendTo(".col-1");
                        location = ".col-1";

                    } else if(location === ".col-3") {
                        $(location + " ." + provider.name).appendTo(".col-2");
                        location = ".col-2";
                    }
                }
                
                location = location + " ." + provider.name;
                $(location + " .spinner").fadeOut(200);              
                $(location).height($(location).height());
                $(location + " .provider-body").slideDown({
                    easing: "easeInOutQuint", duration: 700
                });
            });
        }
        loadWait.resolve();
    });
    
}

// Add new provider entry
// SVG source: http://codepen.io/mrrocks/pen/EiplA
function newProviderEntry(location, provider, columns) {
    if(provider.preference) {
        $("<article class=\'provider-entry " + columns + " " + provider.name + " clearfix\'><header class=\'provider-header\'><img class=\'provider-logo\' src=\'" + provider.logo + "'></img>"
          + "<svg class=\'spinner\' width=\'65px\' height=\'65px\' viewBox=\'0 0 66 66\' xmlns=\'http://www.w3.org/2000/svg\'><circle class=\'path\' fill=\'none\' stroke-width=\'6\' stroke-linecap=\'round\' cx=\'33\' cy=\'33\' r=\'30\'></circle></svg>"
          + "</header><div class=\'provider-body\'></div></article>").appendTo($(location));
    }
}

// Add new app list within a provider entry
function newAppList(location, provider) {
    if(provider.preference) {
        location = location + " ." + provider.name;
        $("<section class=\'app-list\'><a class=\'btn_more_deals\' target=\'blank\'>More deals</a></section>").appendTo($(location + " .provider-body"));
        
        var $button = $(location + " .provider-body .btn_more_deals");
        switch(provider.name) {
            case "gotd":
                if(activeFilter == "android") {
                    $button.prop("href", "http://android.giveawayoftheday.com/");
                } else if(activeFilter == "iphone") {
                    $button.prop("href", "http://iphone.giveawayoftheday.com/");
                }
                break;
                
            case "amazon":
                $button.prop("href", "http://www.amazon.com/s/node=2446009011");
                break;
                
            case "appshopper":
                if(activeFilter == "iphone") {
                    $button.prop("href", "http://appshopper.com/iphone/prices/free/");
                } else if(activeFilter == "ipad") {
                    $button.prop("href", "http://appshopper.com/ipad/prices/free/");
                }
                break;
                
            case "myappfree":
                $button.prop("href", "http://www.myappfree.it/");
                break;
                
            case "appdeals":
                $button.prop("href", "http://www.appdealswp.com/");
                break;
                
            default:
                console.error("Wrong calling of newAppList function");
                break;
        }
    }
}

$(document).ready(function() {
        
    if(document.location.hash) {
        // Check the URL for hashes
        switch(document.location.hash) {
            case "#android":
                setActiveFilter("android");
                break;
            case "#iphone":
                setActiveFilter("iphone");
                break;
            case "#windows":
                setActiveFilter("windows");
                break;
            case "#ipad":
                setActiveFilter("ipad");
                break;
            default:
                break;
        }

    } else {
        // Load the default filter from Local Storage
        if(localStorage.getItem('defaultFilter')) {
            setActiveFilter(localStorage.getItem('defaultFilter'));
            if(activeFilter === "android") {
                $("#input-radio-iphone").prop("checked", false);
                $("#input-radio-windows").prop("checked", false);
                $("#input-radio-ipad").prop("checked", false);
                $("#input-radio-android").prop("checked", true);
            } else if(activeFilter === "iphone") {
                $("#input-radio-windows").prop("checked", false);
                $("#input-radio-ipad").prop("checked", false);
                $("#input-radio-android").prop("checked", false);
                $("#input-radio-iphone").prop("checked", true);
            } else if(activeFilter === "windows") {
                $("#input-radio-iphone").prop("checked", false);
                $("#input-radio-ipad").prop("checked", false);
                $("#input-radio-android").prop("checked", false);
                $("#input-radio-windows").prop("checked", true);
            } else if(activeFilter === "ipad") {
                $("#input-radio-iphone").prop("checked", false);
                $("#input-radio-windows").prop("checked", false);
                $("#input-radio-android").prop("checked", false);
                $("#input-radio-ipad").prop("checked", true);
            }
        } else {
            setActiveFilter('android');
        }
    }
    
    // Load articles
    loadArticles(activeFilter);
    
    // Load the provider preferences from Local Storage    
    function loadPrefs() {
        if(localStorage.getItem('preference_amazon')) {
            amazon.preference = JSON.parse(localStorage.getItem('preference_amazon'));
            $("#input-check-amazon").prop("checked", amazon.preference);
        } else {
            localStorage.setItem('preference_amazon', 'true');
        }

        if(localStorage.getItem('preference_appdeals')) {
            appdeals.preference = JSON.parse(localStorage.getItem('preference_appdeals'));
            $("#input-check-appdeals").prop("checked", appdeals.preference);
        } else {
            localStorage.setItem('preference_appdeals', 'true');
        }

        if(localStorage.getItem('preference_appgratis')) {
            appgratis.preference = JSON.parse(localStorage.getItem('preference_appgratis'));
            $("#input-check-appgratis").prop("checked", appgratis.preference);
        } else {
            localStorage.setItem('preference_appgratis', 'true');
        }

        if(localStorage.getItem('preference_appshopper')) {
            appshopper.preference = JSON.parse(localStorage.getItem('preference_appshopper'));
            $("#input-check-appshopper").prop("checked", appshopper.preference);
        } else {
            localStorage.setItem('preference_appshopper', 'true');
        }

        if(localStorage.getItem('preference_gotd')) {
            gotd.preference = JSON.parse(localStorage.getItem('preference_gotd'));
            $("#input-check-gotd").prop("checked", gotd.preference);
        } else {
            localStorage.setItem('preference_gotd', 'true');
        }

        if(localStorage.getItem('preference_myappfree')) {
            myappfree.preference = JSON.parse(localStorage.getItem('preference_myappfree'));
            $("#input-check-myappfree").prop("checked", myappfree.preference);
        } else {
            localStorage.setItem('preference_myappfree', 'true');
        }
    }
    loadPrefs();
    
    $(".page-header li").on('click', function () {
        clearApps();
        $(".page-header").removeAttr("style"); // Fix for tablet layout changes
        var $element = $(this);
        if ($element.attr('id') !== "filter-" + activeFilter) {
            setActiveFilter($element.attr('id').replace("filter-", ""));
            $(".col-1 > .provider-entry, .col-2, .col-3").slideUp({
                easing: "easeInOutQuint", 
                duration: 700,
                always: function () {
                    $(".provider-entry").remove();
                    $(this).show();
                }
            });
            $.when( loadWait ).done(function () {
                loadArticles(activeFilter);
            });
        }
        
        
    });
    
    // Filter settings
    $(".settings-group input[type='radio']").on('click', function() {
        if($(this).attr("id") === "input-radio-android") {
            localStorage.setItem('defaultFilter', "android");
        } else if($(this).attr("id") === "input-radio-iphone") {
            localStorage.setItem('defaultFilter', "iphone");
        } else if($(this).attr("id") === "input-radio-windows") {
            localStorage.setItem('defaultFilter', "windows");
        } else if($(this).attr("id") === "input-radio-ipad") {
            localStorage.setItem('defaultFilter', "ipad");
        }
        console.log(localStorage.getItem('defaultFilter'));
    });
    
    // Provider settings
     $(".checkbox-group").click(function() {
        // Source: http://goo.gl/8KeSwF
        var checkbox = $(this).find(":checkbox"),   // keep reference of checkbox
            checked = checkbox.is(":checked");      // check checkbox status

        if (checkbox) {
            switch($(checkbox).attr("id")) {
                case "input-check-amazon":
                    amazon.preference = !checked;
                    localStorage.setItem('preference_amazon', JSON.stringify(amazon.preference));
                    break;

                case "input-check-appdeals":
                    appdeals.preference = !checked;
                    localStorage.setItem('preference_appdeals', JSON.stringify(appdeals.preference));
                    break;

                case "input-check-appgratis":
                    appgratis.preference = !checked;
                    localStorage.setItem('preference_appgratis', JSON.stringify(appgratis.preference));
                    break;

                case "input-check-appshopper":
                    appshopper.preference = !checked;
                    localStorage.setItem('preference_appshopper', JSON.stringify(appshopper.preference));
                    break;

                case "input-check-gotd":
                    gotd.preference = !checked;
                    localStorage.setItem('preference_gotd', JSON.stringify(gotd.preference));
                    break;

                case "input-check-myappfree":
                    myappfree.preference = !checked;
                    localStorage.setItem('preference_myappfree', JSON.stringify(myappfree.preference));
                    break;

                default:
                    console.error("Checkbox is missing an ID");
                    break;
            }
        }
        checkbox.prop("checked", !checked);
    });

    $('.checkbox-group :checkbox').click(function() {
      $(this).parent('.checkbox-group').click();
    });
    
    $("#settingsButton").on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".header-hidden").slideToggle({easing: "easeInOutQuint", duration: 1000});
    });

});