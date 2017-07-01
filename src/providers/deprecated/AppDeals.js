
class AppDeals extends Provider {

    constructor() {
        super();

        this.name = "appdeals";
        this.logo = "assets/svg/provider_logo/appdeals.svg";

        this.platform = "android";
        this.url = this.moredeals = "http://www.appdealswp.com";
        this.location = "col-3";
        this.appearance = "app-list";
    }

    handler(data) {
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
    }
}
