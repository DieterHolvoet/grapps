
class Provider {

    constructor(name, logo, url, moredeals, platform, location, appearance) {
        this.name = name;
        this.logo = logo;
        this.url = url;
        this.moredeals = moredeals;
        this.platform = platform;
        this.location = location;
        this.appearance = appearance;
        this.apps = [];

        Providers.add(this);
    }

    // Add new provider entry
    // SVG source: http://codepen.io/mrrocks/pen/EiplA
    addEntry() {
        if(this.preference) {
            $(`.${this.location}`).append(
                `<article class='provider-entry ${this.columns} ${this.name} clearfix'>
                    <header class='provider-header'>
                        <img class='provider-logo' src='${this.logo}'>
                        <svg class='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'><circle class='path' fill='none' stroke-width='6' stroke-linecap='round' cx='33' cy='33' r='30'></circle></svg>
                    </header>
                    <div class='provider-body'></div>
                </article>`
            );
        }
    };

    // Add new app list within a provider entry
    addAppList() {
        if(this.preference) {
            $(`.${this.location} .${this.name} .provider-body`).append(
                `<section class='app-list'><a class='btn_more_deals' href=${this.moredeals} target='blank'>More deals</a></section>`
            );
        }
    };

    addFallback() {
        $(`.${this.location} .${this.name} .provider-body`).append("<p class=\'noapps\'>Unfortunately, there are no apps to display here today.<br>Come back tomorrow!</p>");
    };

    load() {
        var provider = this;
        this.preference = Preferences.isProviderEnabled(this.name);
        this.addEntry();

        return ajax({
            url: 'crosscall.php',
            data: {url: provider.url},
            type: 'POST'
        })
            .then(
                (html) => {
                    return new Promise((resolve) => {
                        provider.handler(html);

                        if(provider.apps.length == 0) {
                            provider.addFallback();

                        } else {
                            if(this.appearance == "app-list") {
                                provider.addAppList();
                            }

                            $.each(provider.apps, (i, app) => {
                                app.appendToPage();
                            });
                        }

                        resolve();
                    });
                },
                (error) => console.error("Error loading data: " + error))

            .then(() => provider.finish());
    };

    finish() {
        console.log(`Finished loading ${this.name} provider.`);

        // Re-arrange the articles for the tablet layout
        if($(window).width() < 1500 && $(window).width() > 1150) {
            if(Platform.active === "ipad") {
                $(`.${this.location}`).children().css("float", "left");
            }
        }

        $(`.${this.location} .${this.name} .spinner`).fadeOut(200);
        $(`.${this.location} .${this.name}`).height($(`.${this.location} .${this.name}`).height());
        $(`.${this.location} .${this.name} .provider-body`).slideDown({
            easing: "easeInOutQuint", duration: 700
        });
    }

    get apps() {
        return this._apps;
    }

    set apps(apps) {
        this._apps = apps;
    }
}