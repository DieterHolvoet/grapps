/**
 * Created by Dieter on 13/11/2016.
 */

class IOSnoops extends Provider {

    constructor() {
        super();

        this.name = "iosnoops";
        this.logo = "svg/provider_logo/iosnoops.png";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source'));
        var self = this;

        $data.find('.post').each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.icon = $eventItem.find(".app-left-icon3 a").css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
            app.title = $eventItem.find("h2 a").text();
            app.url = $eventItem.find("h2 a").attr("href");

            var source = $eventItem.find(".nav4 img").attr("source"),
                match = /price-([0-9]+)(-([0-9]+))?/g.exec(source);

            if(typeof match[2] == 'undefined' || typeof match[3] == 'undefined') {
                app.np = "FREE";

            } else {
                app.op = this.getPrice(match[1]);
                app.np = this.getPrice(match[3]);
            }

            self.apps.push(app);
        });
    }

    getPrice(str) {
        if(str === "0") {
            return "FREE"

        } else {
            var first = str.substring(0, str.length - 2),
                second = str.substring(str.length - 2);

            return `$${first}.${second}`;
        }
    }
}

class IOSnoopsIPhone extends IOSnoops {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://www.iosnoops.com/iphone-deals/all/";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }
}

class IOSnoopsIPad extends IOSnoops {
    constructor() {
        super();

        this.platform = "ipad";
        this.url = this.moredeals = "http://www.iosnoops.com/ipad-deals/all/";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }
}