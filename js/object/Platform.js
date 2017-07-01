"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = function () {
    function Platform() {
        _classCallCheck(this, Platform);
    }

    _createClass(Platform, null, [{
        key: "load",


        /**
         * Load all Providers of the active Platform
         * @param filter
         * @return {Promise}
         */

        value: function load(platform) {
            return new Promise(function (resolve, reject) {
                var providers = [];

                Helper.animationsTest(function () {
                    "use strict";

                    switch (platform) {
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
                            reject("Invalid calling of the loadArticles function");
                            break;
                    }

                    Promise.all(providers).then(function () {
                        console.log("Finished loading all " + platform + " providers.");
                        resolve();
                    });
                });
            });
        }
    }, {
        key: "change",


        /**
         * Change Platform
         * @param filter
         */

        value: function change(platform) {

            if (Platform.locked || platform === Platform.active) return;else Platform.locked = true;

            Providers.clear();
            $(".page-header").removeAttr("style"); // Fix for tablet layout changes

            $(".col-1 > .provider-entry, .col-2, .col-3").slideUp({
                easing: "easeInOutQuint",
                duration: 700,
                always: function always() {
                    $(this).show();
                    $(".provider-entry").remove();
                }
            });

            Platform.load(platform).then(function () {
                return Platform.locked = false;
            });
        }

        /**
         * Get/set active Platform
         * @param platform
         */

    }, {
        key: "setFromHash",
        value: function setFromHash() {
            if (["#android", "#iphone", "#windows", "#ipad"].indexOf(document.location.hash) !== -1) {
                Platform.active = document.location.hash.substring(1);
            }
        }

        /**
         *  Get/set initial platform
         *  @param filter
         */

    }, {
        key: "active",
        set: function set(platform) {
            $("#filter-" + platform).attr('style', 'background-image: url(svg/platform_logo/' + platform + '-selected.svg);');

            if (this._active) {
                $("#filter-" + this._active).attr('style', "background-image: url(svg/platform_logo/ " + this._active + ".svg);");
            }

            Platform.change(platform);
            document.location.hash = this._active = platform;
        },
        get: function get() {
            return this._active;
        }
    }, {
        key: "initial",
        set: function set(filter) {
            this._initial = filter;
            localStorage.setItem('initialFilter', filter);
            Preferences.loadInitialFilter();
        },
        get: function get() {
            var filter = localStorage.getItem('initialFilter');

            if (filter == null) {
                filter = this.initial = "android";
            }

            return filter;
        }
    }]);

    return Platform;
}();

//# sourceMappingURL=Platform.js.map