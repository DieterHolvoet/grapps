
class AppGratis extends Provider {

    constructor() {
        super();

        this.name = "appgratis";
        this.logo = "svg/provider_logo/appgratis_flat.svg";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source'));
        var self = this;

        $data.find('.deal:not(.expired)').each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.icon = $eventItem.find("header div.app-icon img").attr("source");
            app.title = $eventItem.find("header div.app-info span.item a").text().replace("[+] ", "");
            app.subtitle = $eventItem.find("header div.app-info p.editor").text();
            app.url = "https://appgratis.com" + $eventItem.find("header div.app-info span.item a").attr("href");
            app.np = $eventItem.find("header div.app-info .price span.price-price").text();
            app.description = $eventItem.find(".content article.summary").text();
            
            app.np = (app.np === "FREE" ? undefined : "FREE");

            self.apps.push(app);
        });
    }
}

class AppGratisAndroid extends AppGratis {
    constructor() {
        super();

        this.platform = "android";
        this.url = this.moredeals = "http://appgratis.com/android";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }
}

class AppGratisIPhone extends AppGratis {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://appgratis.com";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }
}

class AppGratisIPad extends AppGratis {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://appgratis.com/ipad";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }
}