
class Platform {

    /**
     * Load all Providers of the active Platform
     * @param filter
     * @return {Promise}
     */

    static load(platform) {
        return new Promise((resolve, reject) => {
            var providers = [];

            Helper.animationsTest(() => {
                "use strict";
                switch(platform) {
                    case "android":
                        providers.push(new AppOfTheDayAndroid().load());
                        providers.push(new GOTDAndroid().load());
                        providers.push(new AppSales().load());
                        providers.push(new AmazonSpecialDiscounts().load());
                        break;

                    case "iphone":
                        providers.push(new AppOfTheDayIPhone().load());
                        providers.push(new GOTDIPhone().load());
                        providers.push(new AppShopperIPhone().load());
                        providers.push(new IOSnoopsIPhone().load());
                        break;

                    case "windows":
                        providers.push(new WindowsStoreDeals().load());
                        break;

                    case "ipad":
                        providers.push(new AppShopperIPad().load());
                        providers.push(new IOSnoopsIPad().load());
                        break;

                    default:
                        reject("Invalid calling of the loadArticles function")
                        break;
                }

                Promise.all(providers).then(() => {
                    console.log(`Finished loading all ${platform} providers.`);
                    resolve();
                });
            });
        });
    };

    /**
     * Change Platform
     * @param filter
     */

    static change(platform) {

        if (Platform.locked || platform === Platform.active)
            return;
        else
            Platform.locked = true;

        Providers.clear();
        $(".page-header").removeAttr("style"); // Fix for tablet layout changes

        $(".col-1 > .provider-entry, .col-2, .col-3").slideUp({
            easing: "easeInOutQuint",
            duration: 700,
            always: function () {
                $(this).show();
                $(".provider-entry").remove();
            }
        });

        Platform.load(platform).then(() => Platform.locked = false);
    }


    /**
     * Get/set active Platform
     * @param platform
     */

    static set active(platform) {
        $("#filter-" + platform).attr('style', 'background-image: url(svg/platform_logo/' + platform + '-selected.svg);');

        if(this._active) {
            $("#filter-" + this._active).attr('style', `background-image: url(svg/platform_logo/ ${this._active}.svg);`);
        }

        Platform.change(platform);
        document.location.hash = this._active = platform;
    }

    static get active() {
        return this._active;
    }

    static setFromHash() {
        if(["#android", "#iphone", "#windows", "#ipad"].indexOf(document.location.hash) !== -1) {
            Platform.active = document.location.hash.substring(1);
        }
    }


    /**
     *  Get/set initial platform
     *  @param filter
     */

    static set initial(filter) {
        this._initial = filter;
        localStorage.setItem('initialFilter', filter);
        Preferences.loadInitialFilter();
    }

    static get initial() {
        let filter = localStorage.getItem('initialFilter');

        if(filter == null) {
            filter = this.initial = "android";
        }

        return filter;
    }
}
