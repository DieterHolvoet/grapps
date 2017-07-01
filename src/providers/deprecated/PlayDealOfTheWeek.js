
class PlayDealOfTheWeek extends Provider {

    constructor() {
        super();

        this.name = "playdealoftheweek";
        this.logo = "assets/svg/provider_logo/googleplay.svg";

        this.platform = "android";
        this.url = "https://play.google.com/store/recommended?sp=CAEwAFooCiJwcm9tb3Rpb25fMzAwMThkNF93ZWVrbHlfZGVhbF9hcHBzEAcYAw%3D%3D%3AS%3AANO1ljL6VcM&c=apps";
        this.moredeals = "https://play.google.com/apps";
        this.location = "col-1";
        this.appearance = "single-app";
        this.columns = "single-column";
    }

    handler(data) {
        var $data = $(data.replace(/src/gi,'source')),
            self = this,
            app = new App(self);

        console.log(data);
        $data = $data.find('.card.apps').first();

        app.icon = `https:${$data.find(".cover-image").attr("data-cover-large")}`;
        app.title = $data.find("a.title").first().text().trim();
        app.url = $data.find("a.title").attr("href");
        app.np = $data.find(".display-price").first().text();
        app.description = $data.find(".description").textNode();
        app.rating = $data.find(".current-rating").parent().attr('aria-label').match(/([0-9].[0-9])+/g)[0];

        self.apps.push(app);
    }
}
