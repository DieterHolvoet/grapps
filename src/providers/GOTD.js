/* globals $ */

import App from '../classes/App';
import Provider from '../classes/Provider';

class GOTD extends Provider {
    constructor() {
        super();

        this.name = 'gotd';
        this.logo = 'assets/svg/provider_logo/giveawayoftheday.svg';
    }

    handler(data) {
        const $data = $(data.replace(/src/gi, 'source'));
        const self = this;

        $data.find('.col2 .wrapper_offers').each((i, eventItem) => {
            const $eventItem = $(eventItem);
            const app = new App(self);

            app.icon = $eventItem.find('.icon100').attr('source');
            app.title = $eventItem.find('h3 a').text();
            app.url = $eventItem.find('h3 a').attr('href');
            app.op = `$${$eventItem.find('.discount b span').text().replace('$', '')}`;
            // app.description = $eventItem.find(".short_dscr").text();

            self.apps.push(app);
        });
    }
}

export class GOTDAndroid extends GOTD {
    constructor() {
        super();

        this.platform = 'android';
        this.url = 'http://android.giveawayoftheday.com';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }
}

export class GOTDIPhone extends GOTD {
    constructor() {
        super();

        this.platform = 'iphone';
        this.url = 'http://iphone.giveawayoftheday.com';
        this.moredeals = this.url;
        this.location = 'col-1';
        this.appearance = 'app-list';
        this.columns = 'single-column';
    }
}
