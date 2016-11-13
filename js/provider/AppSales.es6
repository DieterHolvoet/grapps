/**
 * Created by Dieter on 13/11/2016.
 */

class AppSales extends Provider {

    constructor() {
        super();

        this.name = "appsales";
        this.logo = "svg/provider_logo/appsales.png";

        this.platform = "android";
        this.url = this.moredeals = "http://www.app-sales.net/";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source'));
        var self = this;

        $data.find('.sales:not(.charts) .sale-item:not(.expired)').each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.icon = $eventItem.find(".sale-icon img").attr("source");
            app.title = $eventItem.find(".sale-name .apptitle").text();
            // app.subtitle = $eventItem.find(".sale-name .developer").text();
            app.url = "https://www.app-sales.net" + $eventItem.find(".sale-name .sale-link").attr("href");
            app.op = $eventItem.find(".sale-pricing .price-old").text();
            app.np = $eventItem.find(".sale-pricing .price-new").text();

            self.apps.push(app);
        });
    }

}