/* jshint browser: true, jquery: true */
/* global amazon, appdeals, appgratis, appshopper, gotd, myappfree, Grapps, Filter */

var App = (function() {
    
    function App(title, subtitle, author, category, type, url, rating, icon, banner, screenshot, op, np, description) {
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
    }

    App.prototype.append = function (location, provider, type) {
        Grapps.appendWait = $.Deferred();
        location = location + " .provider-entry." + provider.name;
        if (location) {
            if (type === "app-list") {
                
                // App is part of an app list;
                $(["<section class='app-entry clearfix'>",
                   (this.icon !== undefined ? ("<img src='" + this.icon + "'class='app-logo'>") : ""),
                   "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'>",
                   "<h1>" + this.title + "</h1></a>",
                   (this.author !== undefined ? ("<p>" + this.author + "</p>") : ""),
                   (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : ""),
                   (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : ""),
                   (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : ""),
                   (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : ""),
                   "</section>",
                  ].join("\n")).insertBefore($(location + " .app-list > .btn_more_deals"));

            } else if (type === "single-app") {
                
                // App is not part of an app list
                $([(this.banner !== undefined && provider.name === "amazon" ? ("<img src=\'" + this.banner + "\' class=\'app-banner\'></img>") : ""),
                   "<section class=\'app-entry clearfix\'>",
                   (this.icon !== undefined ? ("<img src=\'" + this.icon + "\'class=\'app-logo\'>") : ""),
                   "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'><h1>" + this.title + "</h1></a>",
                   (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : ""),
                   (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : ""),
                   (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : ""),
                   (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : ""),
                   "</section>",
                   ((this.description !== undefined) ? ("<section class=\'app-description\'><p>" + this.description + "</p></section>") : "")
                  ].join("\n")).appendTo($(location + " .provider-body"));
            }
            
        } else {
            console.log("Append target doesn't exist, assuming it was turned off in the preferences.");
        }

        $(".col-1").width($(".col-1 .provider-entry").width());
        $(".col-2").width($(".col-2 .provider-entry").width());
        $(".col-3").width($(".col-3 .provider-entry").width());

        Grapps.appendWait.resolve();
        return Grapps.appendWait;
    };
    
    App.clearAll = function() {
        amazon.featapps = [];
        amazon.apps = [];
        appgratis.apps = [];
        gotd.featapps = [];
        gotd.apps = [];
        appshopper.apps = [];
        myappfree.featapps = [];
        myappfree.apps = [];
        appdeals.apps = [];
    };
    
    // Load all articles (apps), depending on the active platform filter
    App.loadAll = function() {
        Grapps.loadWait = $.Deferred();
        Grapps.animationsTest(function() {
            "use strict";
            switch(Filter.active) {
                case "android":
                    appgratis.addEntry(".col-2", "single-column");
                    appgratis.load("android");

                    gotd.addEntry(".col-3", "single-column");
                    gotd.load("android");

                    break;

                case "iphone":
                    appgratis.addEntry(".col-1", "single-column");
                    appgratis.load("iphone");

                    gotd.addEntry(".col-2", "single-column");
                    gotd.load("iphone");

                    appshopper.addEntry(".col-3", "single-column");
                    appshopper.load("iphone");

                    break;

                case "windows":
                    myappfree.addEntry(".col-1", "single-column");
                    myappfree.load();

                    windowsstoredeals.addEntry(".col-2", "double-column");
                    windowsstoredeals.load();

                    break;

                case "ipad":
                    appgratis.addEntry(".col-1", "single-column");
                    appgratis.load("ipad");

                    appshopper.addEntry(".col-2", "double-column");
                    appshopper.load("ipad");

                    break;

                default:
                    console.error("Invalid calling of the loadArticles function");
                    break;
            }

            Grapps.loadWait.resolve();
        });
    };
    
    return App;
})();