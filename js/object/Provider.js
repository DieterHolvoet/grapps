'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = function () {
    function Provider(name, logo, url, moredeals, platform, location, appearance) {
        _classCallCheck(this, Provider);

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


    _createClass(Provider, [{
        key: 'addEntry',
        value: function addEntry() {
            if (this.preference) {
                $('.' + this.location).append('<article class=\'provider-entry ' + this.columns + ' ' + this.name + ' clearfix\'>\n                    <header class=\'provider-header\'>\n                        <img class=\'provider-logo\' src=\'' + this.logo + '\'>\n                        <svg class=\'spinner\' width=\'65px\' height=\'65px\' viewBox=\'0 0 66 66\' xmlns=\'http://www.w3.org/2000/svg\'><circle class=\'path\' fill=\'none\' stroke-width=\'6\' stroke-linecap=\'round\' cx=\'33\' cy=\'33\' r=\'30\'></circle></svg>\n                    </header>\n                    <div class=\'provider-body\'></div>\n                </article>');
            }
        }
    }, {
        key: 'addAppList',


        // Add new app list within a provider entry
        value: function addAppList() {
            if (this.preference) {
                $('.' + this.location + ' .' + this.name + ' .provider-body').append('<section class=\'app-list\'><a class=\'btn_more_deals\' href=' + this.moredeals + ' target=\'blank\'>More deals</a></section>');
            }
        }
    }, {
        key: 'addFallback',
        value: function addFallback() {
            $('.' + this.location + ' .' + this.name + ' .provider-body').append("<p class=\'noapps\'>Unfortunately, there are no apps to display here today.<br>Come back tomorrow!</p>");
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            var provider = this;
            this.addEntry();

            return ajax({
                url: 'crosscall.php',
                data: { url: provider.url },
                type: 'POST'
            }).then(function (html) {
                return new Promise(function (resolve) {
                    provider.handler(html);

                    if (provider.apps.length == 0) {
                        provider.addFallback();
                    } else {
                        if (_this.appearance == "app-list") {
                            provider.addAppList();
                        }

                        $.each(provider.apps, function (i, app) {
                            app.appendToPage();
                        });
                    }

                    resolve();
                });
            }, function (error) {
                return console.error("Error loading data: " + error);
            }).then(function () {
                return provider.finish();
            });
        }
    }, {
        key: 'finish',
        value: function finish() {
            console.log('Finished loading ' + this.name + ' provider.');

            // Re-arrange the articles for the tablet layout
            if ($(window).width() < 1500 && $(window).width() > 1150) {
                if (Platform.active === "ipad") {
                    $('.' + this.location).children().css("float", "left");
                }

                /*if(this.location === "col-2") {
                    $(`.${this.location} .${this.name}`).appendTo(".col-1");
                    this.location = "col-1";
                 } else if(this.location === "col-3") {
                    $(`.${this.location} .${this.name}`).appendTo(".col-2");
                    this.location = "col-2";
                }*/
            }

            $('.' + this.location + ' .' + this.name + ' .spinner').fadeOut(200);
            $('.' + this.location + ' .' + this.name).height($('.' + this.location + ' .' + this.name).height());
            $('.' + this.location + ' .' + this.name + ' .provider-body').slideDown({
                easing: "easeInOutQuint", duration: 700
            });
        }
    }, {
        key: 'preference',
        get: function get() {
            var pref = JSON.parse(localStorage.getItem('preference_' + this.name));

            if (pref == null) {
                localStorage.setItem('preference_' + this.name, true);
                return true;
            } else {
                return pref;
            }
        },
        set: function set(preference) {
            localStorage.setItem('preference_' + this.name, JSON.stringify(preference));
        }
    }, {
        key: 'apps',
        get: function get() {
            return this._apps;
        },
        set: function set(apps) {
            this._apps = apps;
        }
    }]);

    return Provider;
}();

//# sourceMappingURL=Provider.js.map