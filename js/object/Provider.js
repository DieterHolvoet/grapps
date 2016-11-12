/* jshint browser: true, jquery: true */
/* global Filter, Grapps */

var Provider = (function() {
    
    // Constructor
    function Provider(name, logo, url) {
        this.name = name;
        this.logo = logo;
        this.url = url;
        this.preference = true;
        this.featapps = [];
        this.apps = [];
        this.apps_2 = [];
        this.apps_3 = [];
    }
    
    // Add new provider entry
    // SVG source: http://codepen.io/mrrocks/pen/EiplA
    Provider.prototype.addEntry = function(location, columns) {
        if(this.preference) {
            $("<article class=\'provider-entry " + columns + " " + this.name + " clearfix\'><header class=\'provider-header\'><img class=\'provider-logo\' src=\'" + this.logo + "'>" +
              "<svg class=\'spinner\' width=\'65px\' height=\'65px\' viewBox=\'0 0 66 66\' xmlns=\'http://www.w3.org/2000/svg\'><circle class=\'path\' fill=\'none\' stroke-width=\'6\' stroke-linecap=\'round\' cx=\'33\' cy=\'33\' r=\'30\'></circle></svg>" +
              "</header><div class=\'provider-body\'></div></article>").appendTo($(location));
        }
    };
    
    // Add new app list within a provider entry
    Provider.prototype.addAppList = function(location) {
        if(this.preference) {
            location = location + " ." + this.name;
            $("<section class=\'app-list\'><a class=\'btn_more_deals\' target=\'blank\'>More deals</a></section>").appendTo($(location + " .provider-body"));

            var $button = $(location + " .provider-body .btn_more_deals");
            switch(this.name) {
                case "gotd":
                    if(Filter.active == "android") {
                        $button.prop("href", "http://android.giveawayoftheday.com/");
                    } else if(Filter.active == "iphone") {
                        $button.prop("href", "http://iphone.giveawayoftheday.com/");
                    }
                    break;

                case "amazon":
                    $button.prop("href", "http://www.amazon.com/s/node=2446009011");
                    break;

                case "appshopper":
                    if(Filter.active == "iphone") {
                        $button.prop("href", "http://appshopper.com/iphone/prices/free/");
                    } else if(Filter.active == "ipad") {
                        $button.prop("href", "http://appshopper.com/ipad/prices/free/");
                    }
                    break;

                case "myappfree":
                    $button.prop("href", "http://www.myappfree.it/");
                    break;

                case "appdeals":
                    $button.prop("href", "http://www.appdealswp.com/");
                    break;

                case "windowsstoredeals":
                    $button.prop("href", "https://windowsstore.deals");
                    break;

                default:
                    console.error("Wrong calling of newAppList function");
                    break;
            }
        }
    };
    
    Provider.prototype.addFallback = function(apps, platform, location) {
        var anyApp = false;
        $.each(apps, function(i, eventItem) {
            if($(eventItem).prop("platform") === platform) {
                anyApp = true;
            }
        });
        
        if(!anyApp) {
            var str;
            
            if(this.name === "amazon") {
                str = "Unfortunately, there is no ongoing Free App of the Day Bundle. Try again later!";
            } else {
                str = "Unfortunately, there are no apps to display here today.<br>Come back tomorrow!";
            }
            
            $("<p class=\'noapps\'>" + str + "</p>").appendTo(location + " ." + this.name + " .provider-body");
            return true;
        }
        
        return false;
    };
    
    Provider.prototype.finish = function(location) {
        var name = this.name;
        $.when( Grapps.appendWait ).done(function() {
            // Re-arrange the articles for the tablet layout
            if($(window).width() < 1500 && $(window).width() > 1150) {
                if(Filter.active === "ipad") {
                    $(location).children().css("float", "left");
                }

                if(location === ".col-2") {
                    $(location + " ." + name).appendTo(".col-1");
                    location = ".col-1";

                } else if(location === ".col-3") {
                    $(location + " ." + name).appendTo(".col-2");
                    location = ".col-2";
                }
            }

            location = location + " ." + name;
            $(location + " .spinner").fadeOut(200);              
            $(location).height($(location).height());
            $(location + " .provider-body").slideDown({
                easing: "easeInOutQuint", duration: 700
            });
        });
    };

    Provider.prototype.load = function() {
        var provider = this;
        $.ajax({
            url: 'crosscall.php',
            data: {url: provider.url},
            type: 'POST',
            success: function(html) {
                provider.success(html);
            }
        });
    };
        
    return Provider;
})();