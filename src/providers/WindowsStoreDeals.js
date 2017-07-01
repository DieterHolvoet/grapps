/* globals $ */

import App from '../classes/App';
import Provider from '../classes/Provider';

class WindowsStoreDeals extends Provider {
    constructor() {
        super();

        this.name = 'windowsstoredeals';
        this.logo = 'assets/svg/provider_logo/windowsstoredeals.svg';

        this.platform = 'windows';
        this.url = 'https://windowsstore.deals/data/deals11.json';
        this.moredeals = 'https://windowsstore.deals';
        this.location = 'col-2';
        this.appearance = 'app-list';
        this.columns = 'double-column';
    }

    handler(json) {
        const data = $.parseJSON(json);
        const self = this;

        data.forEach((result) => {
            const app = new App(self);

            app.title = result.title;
            app.description = result.description;
            app.icon = result.image;
            app.url = result.url;
            app.op = result.oldprice;
            app.np = result.currency + result.newprice;

            if (app.np === '$0') app.np = 'FREE';

            self.apps.push(app);
        });
    }
}

export default WindowsStoreDeals;
