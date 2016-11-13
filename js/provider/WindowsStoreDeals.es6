
class WindowsStoreDeals extends Provider {

    constructor() {
        super();

        this.name = "windowsstoredeals";
        this.logo = "svg/provider_logo/windowsstoredeals.svg";

        this.platform = "windows";
        this.url = "https://windowsstore.deals/data/deals11.json";
        this.moredeals = "https://windowsstore.deals";
        this.location = "col-2";
        this.appearance = "app-list";
        this.columns = "double-column";
    }

    handler(data) {
        data = $.parseJSON(data);
        var self = this;

        data.forEach((result) => {
            var app = new App(self);

            app.title = result.title;
            app.description = result.description;
            app.icon = result.image;
            app.url = result.url;
            app.op = result.oldprice;
            app.np = result.currency + result.newprice;

            self.apps.push(app);
        });
    }
}