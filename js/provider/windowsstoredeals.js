/* jshint browser: true, jquery: true */
/* global Provider, App */

/* Windows Store Deals (Windows) */

var windowsstoredeals = new Provider("windowsstoredeals", "svg/provider_logo/windowsstoredeals.svg", "https://windowsstore.deals/data/deals11.json");

windowsstoredeals.handler = function(data) {
    this.handler.wait = $.Deferred();
    data = $.parseJSON(data);

    data.forEach(function(app) {
        windowsstoredeals.apps.push(new App());
        var i = windowsstoredeals.apps.length - 1;

        windowsstoredeals.apps[i].title = app.title;
        windowsstoredeals.apps[i].description = app.description;
        windowsstoredeals.apps[i].icon = app.image;
        windowsstoredeals.apps[i].url = app.url;
        windowsstoredeals.apps[i].op = app.oldprice;
        windowsstoredeals.apps[i].np = app.currency + app.newprice;
    });

    this.handler.wait.resolve();
}

windowsstoredeals.success = function(data) {
    windowsstoredeals.handler(data);
    $.when( windowsstoredeals.handler.wait ).done(function() {
        windowsstoredeals.addAppList(".col-2");
        for(var i = 0; i < windowsstoredeals.apps.length; i++) {
            windowsstoredeals.apps[i].append(".col-2", windowsstoredeals, "app-list");
        }
        windowsstoredeals.finish(".col-2");
    });
}