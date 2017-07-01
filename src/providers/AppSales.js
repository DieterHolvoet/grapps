/* globals $ */

import App from '../classes/App';
import Provider from '../classes/Provider';
import { empty } from '../helpers';

class AppSales extends Provider {
    constructor() {
        super();

        this.name = 'appsales';
        this.logo = 'assets/svg/provider_logo/appsales.png';

        this.platform = 'android';
        this.url = 'http://www.app-sales.net/';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }

    handler(data) {
        const $data = $(data.replace(/src/gi, 'source'));
        const self = this;

        $data.find('.sale-item')
            .filter((i, item) => $(item).parents('#now-free').length)
            .each((i, eventItem) => {
                const $eventItem = $(eventItem);
                const app = new App(self);

                app.icon = $eventItem.find('.app-icon img').attr('source');
                app.title = $eventItem.find('.app-name').text();
                // app.subtitle = $eventItem.find(".sale-name .developer").text();
                app.url = $eventItem.attr('href');
                app.op = $eventItem.find('.price-old').text();
                app.np = 'Free';

                if (empty(app.op)) delete app.op;
                if (empty(app.np)) delete app.np;

                self.apps.push(app);
            });
    }
}

export default AppSales;
