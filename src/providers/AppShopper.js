/* globals $ */

import App from '../classes/App';
import Helper from '../classes/Helper';
import Provider from '../classes/Provider';

class AppShopper extends Provider {
    constructor() {
        super();

        this.name = 'appshopper';
        this.logo = 'assets/svg/provider_logo/appshopper.svg';
    }

    handler(data) {
        const $data = $(data.replace(/src/gi, 'source'));
        const self = this;

        $data.find('.main-content .app').each((i, eventItem) => {
            const $eventItem = $(eventItem);
            const app = new App(self);

            app.title = $eventItem.find('.slide-wrap > .block-link > .details > h2').text();
            app.icon = $eventItem.find('.slide-wrap > .block-link > .icon > img').attr('source');
            app.url = `http://appshopper.com${$eventItem.find('a:first-of-type').attr('href')}`;
            app.op = $eventItem.find('.old-price strike').text();
            app.rating = Helper.parseRating($eventItem.find('.icon .stars:first-of-type').attr('data-rating'));

            self.apps.push(app);
        });
    }
}

export class AppShopperIPhone extends AppShopper {
    constructor() {
        super();

        this.platform = 'iphone';
        this.url = 'http://appshopper.com/iphone/prices/free';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }
}

export class AppShopperIPad extends AppShopper {
    constructor() {
        super();

        this.platform = 'ipad';
        this.url = 'http://appshopper.com/ipad/prices/free';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }
}
