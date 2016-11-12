/* jshint browser: true, jquery: true */
/* global Provider, App */

/* MyAppFree */

var myappfree = new Provider("myappfree", "svg/provider_logo/myappfree.svg", "http://www.myappfree.it");

myappfree.handler = function(data) {
    this.handler.wait = $.Deferred();
    data = data.replace(/src/gi,'source');

    $(data).find(".isotope-item").each(function(i, eventItem) {                
        myappfree.apps.push(new App());
        var $eventItem = $(eventItem);

        myappfree.apps[i].title = $eventItem.find("p").contents().filter(function() {
            return this.nodeType == 3;
        })[0].nodeValue.trim();
        myappfree.apps[i].icon = $eventItem.find(".img-responsive").attr("source");
        myappfree.apps[i].url = $eventItem.find("a").attr("href");
        myappfree.apps[i].op = $eventItem.find("p span").text();
    });
    
    this.handler.wait.resolve();
};

myappfree.success = function(data) {
    myappfree.handler(data);
    $.when( myappfree.handler.wait ).done(function() {
        myappfree.addAppList(".col-1");
        for(var i = 0; i < myappfree.apps.length; i++) {
            myappfree.apps[i].append(".col-1", myappfree, "app-list");
        }
        myappfree.finish(".col-1");
    });
};