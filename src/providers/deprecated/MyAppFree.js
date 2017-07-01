
class MyAppFree extends Provider {

    constructor() {
        super();

        this.name = "myappfree";
        this.logo = "assets/svg/provider_logo/myappfree.svg";

        this.platform = "windows";
        this.url = this.moredeals = "http://www.myappfree.it";
        this.location = "col-1";
        this.appearance = "app-list";
        this.columns = "single-column";
    }

    handler(data) {
        data = data.replace(/src/gi,'source');
        var self = this;

        $(data).find(".isotope-item").each((i, eventItem) => {
            var $eventItem = $(eventItem);
            var app = new App(self);

            app.title = $eventItem.find("p").textNode();
            app.icon = $eventItem.find(".img-responsive").attr("source");
            app.url = $eventItem.find("a").attr("href");
            app.op = $eventItem.find("p span").text();

            self.apps.push(app);
        });
    }
}
