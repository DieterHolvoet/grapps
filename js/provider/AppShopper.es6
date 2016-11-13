
class AppShopper extends Provider {

    constructor() {
        super();

        this.name = "appshopper";
        this.logo = "svg/provider_logo/appshopper.svg";
    }

    handler(data, platform) {
        var $data = $(data.replace(/src/gi,'source'));
        var self = this;

        $data.find(".main-content .app").each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.title = $eventItem.find(".slide-wrap > .block-link > .details > h2").text();
            app.icon = $eventItem.find(".slide-wrap > .block-link > .icon > img").attr("source");
            app.url = `http://appshopper.com${$eventItem.find("a:first-of-type").attr("href")}`;
            app.op = $eventItem.find(".old-price strike").text();
            app.rating = Helper.parseRating($eventItem.find(".icon .stars:first-of-type").attr("data-rating"));

            self.apps.push(app);
        });
    }
}

class AppShopperIPhone extends AppShopper {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://appshopper.com/iphone/prices/free";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }
}

class AppShopperIPad extends AppShopper {
    constructor() {
        super();

        this.platform = "ipad";
        this.url = this.moredeals = "http://appshopper.com/ipad/prices/free";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }
}