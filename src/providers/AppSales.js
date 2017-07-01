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

        $data.find('.sales:not(.charts) .sale-item:not(.expired)').each((i, eventItem) => {
            const $eventItem = $(eventItem);
            const app = new App(self);

            app.icon = $eventItem.find('.sale-icon img').attr('source');
            app.title = $eventItem.find('.sale-name .apptitle').text();
            // app.subtitle = $eventItem.find(".sale-name .developer").text();
            app.url = `https://www.app-sales.net${$eventItem.find('.sale-name .sale-link').attr('href')}`;
            app.op = $eventItem.find('.sale-pricing .price-old').text();
            app.np = $eventItem.find('.sale-pricing .price-new').text();

            if (empty(app.op)) delete app.op;
            if (empty(app.np)) delete app.np;

            self.apps.push(app);
        });
    }
}

export default AppSales;
