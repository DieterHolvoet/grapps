/* globals $ */

import App from '../classes/App';
import Provider from '../classes/Provider';

class IOSnoops extends Provider {
    constructor() {
        super();

        this.name = 'iosnoops';
        this.logo = 'assets/svg/provider_logo/iosnoops.png';
    }

    handler(data) {
        const $data = $(data.replace(/src/gi, 'source'));
        const self = this;

        $data.find('.post').each((i, eventItem) => {
            const $eventItem = $(eventItem);
            const app = new App(self);

            app.icon = $eventItem
                .find('.app-left-icon3 a')
                .css('background-image')
                .replace('url(', '')
                .replace(')', '')
                .replace(/"/gi, '');
            app.title = $eventItem.find('h2 a').text();
            app.url = $eventItem.find('h2 a').attr('href');

            const source = $eventItem.find('.nav4 img').attr('source');
            const match = /price-([0-9]+)(-([0-9]+))?/g.exec(source);

            if (typeof match[2] === 'undefined' || typeof match[3] === 'undefined') {
                app.np = 'FREE';
            } else {
                app.op = this.getPrice(match[1]);
                app.np = this.getPrice(match[3]);
            }

            self.apps.push(app);
        });
    }

    getPrice(str) {
        if (str === '0') {
            return 'FREE';
        }

        const first = str.substring(0, str.length - 2);
        const second = str.substring(str.length - 2);

        return `$${first}.${second}`;
    }
}

export class IOSnoopsIPhone extends IOSnoops {
    constructor() {
        super();

        this.platform = 'iphone';
        this.url = 'http://www.iosnoops.com/iphone-deals/all/';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }
}

export class IOSnoopsIPad extends IOSnoops {
    constructor() {
        super();

        this.platform = 'ipad';
        this.url = 'http://www.iosnoops.com/ipad-deals/all/';
        this.moredeals = this.url;
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }
}
