
class GOTD extends Provider {

    constructor() {
        super();

        this.name = "gotd";
        this.logo = "svg/provider_logo/giveawayoftheday.svg";
    }

    handler(data, platform) {
        var $data = $(data.replace(/src/gi,'source'));
        var self = this;

        $data.find(".col2 .wrapper_offers").each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.icon = $eventItem.find(".icon100").attr("source");
            app.title = $eventItem.find("h3 a").text();
            app.url = $eventItem.find("h3 a").attr("href");
            app.op = "$" + $eventItem.find(".discount b span").text().replace("$", "");
            // app.description = $eventItem.find(".short_dscr").text();

            self.apps.push(app);
        });
    }
}

class GOTDAndroid extends GOTD {
    constructor() {
        super();

        this.platform = "android";
        this.url = this.moredeals = "http://android.giveawayoftheday.com";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }
}

class GOTDIPhone extends GOTD {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://iphone.giveawayoftheday.com";
        this.location = "col-1";
        this.appearance = "app-list";
        this.columns = "single-column";
    }
}