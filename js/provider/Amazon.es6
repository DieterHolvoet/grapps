
class Amazon extends Provider {
    constructor() {
        super();

        this.name = "amazon";
        this.platform = "android";
        this.logo = "svg/provider_logo/amazon_appstore.svg";
    }
}

class AmazonSpecialDiscounts extends Amazon {
    constructor() {
        super();

        this.url = this.moredeals = "https://www.amazon.com/b?node=8605426011";
        this.location = "col-1";
        this.appearance = "app-list";
        this.columns = "single-column";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source')),
            self = this;

        $data.find('.s-result-item').each(function (i, eventItem) {
            var $eventItem = $(eventItem),
                app = new App(self);

            app.icon = $eventItem.find("img.s-access-image").attr("source");
            app.title = $eventItem.find(".s-access-title").text();
            app.author = $eventItem.find(".s-item-container .a-row.a-spacing-none > div:nth-of-type(2) > span").text();
            app.url = $eventItem.find("a.a-link-normal").prop("href");
            app.op = $eventItem.find(".a-row.a-spacing-none span.a-text-strike").text();

            var $np = $eventItem.find(".a-row.a-spacing-none .a-button-inner span span");
            if($np.find(".sx-price-currency").length > 0) {
                app.np = `${$np.find(".sx-price-currency").text()}${$np.find(".sx-price-whole").text()}.${$np.find(".sx-price-fractional").text()}`;

            } else {
                app.np = $np.text();
            }

            if(app.op.length == 0) app.op = undefined;

            self.apps.push(app);
            return i < 4;
        });
    }
}

class AmazonFeaturedApps extends Amazon {
    constructor() {
        super();

        this.url = this.moredeals = "https://www.amazon.com/b?node=8605426011";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source')),
            app = new App(self);

        app.banner = $data.find(".fad-widget-promo-image a img").attr("source");
        app.title = $data.find("h3.fad-widget-app-name a").text();
        app.url = "https://www.amazon.com" + $data.find("h3.fad-widget-app-name a").attr("href");
        app.op = $data.find(".fad-widget-original-price").text();

        if ($data.find(".swSprite").hasClass("s_star_0_5")) {
            app.rating = "05";
        } else if ($data.find(".swSprite").hasClass("s_star_1_0")) {
            app.rating = "1";
        } else if ($data.find(".swSprite").hasClass("s_star_1_5")) {
            app.rating = "15";
        } else if ($data.find(".swSprite").hasClass("s_star_2_0")) {
            app.rating = "2";
        } else if ($data.find(".swSprite").hasClass("s_star_2_5")) {
            app.rating = "25";
        } else if ($data.find(".swSprite").hasClass("s_star_3_0")) {
            app.rating = "3";
        } else if ($data.find(".swSprite").hasClass("s_star_3_5")) {
            app.rating = "35";
        } else if ($data.find(".swSprite").hasClass("s_star_4_0")) {
            app.rating = "4";
        } else if ($data.find(".swSprite").hasClass("s_star_4_5")) {
            app.rating = "45";
        } else if ($data.find(".swSprite").hasClass("s_star_5_0")) {
            app.rating = "5";
        }
        
        this.apps.push(app);
    }
}

class AmazonDeals extends Amazon {
    constructor() {
        super();

        this.url = this.moredeals = "http://www.amazon.com/s/node=2446009011";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source'));

        $data.find('li.ilo2').each(function (i, eventItem) {
            var $eventItem = $(eventItem),
                app = new App(self);

            app.icon = $eventItem.find(".productImage img").attr("source");
            app.title = $eventItem.find(".productImage ~ .ilt2 a span").text();
            app.author = $eventItem.find(".mobileAppsRedesignSubtitle").text();
            app.url = $eventItem.find(".ilc2 ~ .ilt2 a").prop("href");

            this.apps.push(app);
            if(i === 7) return false;
        });
    }
}