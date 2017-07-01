/* globals $ */

import App from '../classes/App';
import Provider from '../classes/Provider';

class AppOfTheDay extends Provider {
    constructor() {
        super();

        this.name = 'appoftheday';
        this.logo = 'assets/svg/provider_logo/appoftheday.png';
    }

    handler(data) {
        let $data = $(data.replace(/src/gi, 'source'));
        const self = this;
        const app = new App(self);

        $data = $data
            .find('.offer')
            .filter(() => $(this).find('a.link-app-free').exists())
            .first();

        app.icon = $data.find('.icon-app').attr('data-original');
        app.title = $data.find('a.app-name').first().text().trim();
        app.url = $data.find('.app-name').attr('href');
        app.op = $data.find('.price-strike span').first().text();
        app.description = $data.find('.description').text();

        if (app.op.length === 0) app.op = undefined;

        self.apps.push(app);
    }
}

export class AppOfTheDayAndroid extends AppOfTheDay {
    constructor() {
        super();

        this.platform = 'android';
        this.url = 'http://www.appoftheday.com/gb/android';
        this.moredeals = this.url;
        this.location = 'col-1';
        this.appearance = 'single-app';
        this.columns = 'single-column';
    }
}

export class AppOfTheDayIPhone extends AppOfTheDay {
    constructor() {
        super();

        this.platform = 'iphone';
        this.url = 'http://www.appoftheday.com/gb/iphone';
        this.moredeals = this.url;
        this.location = 'col-1';
        this.appearance = 'single-app';
        this.columns = 'single-column';
    }
}
