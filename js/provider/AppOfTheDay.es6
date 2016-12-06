/**
 * Created by Dieter on 13/11/2016.
 */

class AppOfTheDay extends Provider {

    constructor() {
        super();

        this.name = "appoftheday";
        this.logo = "svg/provider_logo/appoftheday.png";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source')),
            self = this,
            app = new App(self);

        $data = $data.find('.offer').filter(function(i) {
            return $(this).find('a.link-app-free').exists();
        }).first();

        app.icon = $data.find(".icon-app").attr("data-original");
        app.title = $data.find("a.app-name").first().text().trim();
        app.url = $data.find(".app-name").attr("href");
        app.op = $data.find(".price-strike span").first().text();
        app.description = $data.find(".description").text();

        if(app.op.length == 0) app.op = undefined;

        self.apps.push(app);
    }
}

class AppOfTheDayAndroid extends AppOfTheDay {
    constructor() {
        super();

        this.platform = "android";
        this.url = this.moredeals = "http://www.appoftheday.com/gb/android";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }
}

class AppOfTheDayIPhone extends AppOfTheDay {
    constructor() {
        super();

        this.platform = "iphone";
        this.url = this.moredeals = "http://www.appoftheday.com/gb/iphone";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }
}