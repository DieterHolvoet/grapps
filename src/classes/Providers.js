class Providers {
    static clear() {
        Providers.all.map((provider) => {
            const newProvider = provider;
            newProvider.apps = [];
            return newProvider;
        });
    }

    static add(provider) {
        if (this.all === undefined) {
            this.all = [];
        }

        this.all.push(provider);
    }

    static get all() {
        if (this.providers === undefined) {
            return [];
        }
        return this.providers;
    }

    static set all(providers) {
        this.providers = providers;
    }

    static get map() {
        return {
            amazon: 'Amazon',
            appoftheday: 'App Of The Day',
            appsales: 'AppSales',
            appshopper: 'AppShopper',
            gotd: 'Giveaway Of The Day',
            iosnoops: 'iOSnoops',
            windowsstoredeals: 'Windows Store Deals',
        };
    }
}

export default Providers;
