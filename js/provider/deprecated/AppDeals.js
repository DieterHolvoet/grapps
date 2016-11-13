"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppDeals = function (_Provider) {
    _inherits(AppDeals, _Provider);

    function AppDeals() {
        _classCallCheck(this, AppDeals);

        var _this = _possibleConstructorReturn(this, (AppDeals.__proto__ || Object.getPrototypeOf(AppDeals)).call(this));

        _this.name = "appdeals";
        _this.logo = "svg/provider_logo/appdeals.svg";

        _this.platform = "android";
        _this.url = _this.moredeals = "http://www.appdealswp.com";
        _this.location = "col-3";
        _this.appearance = "app-list";
        return _this;
    }

    _createClass(AppDeals, [{
        key: "handler",
        value: function handler(data) {
            data = data.replace(/src/gi, 'source');

            $(data).find(".page_container section article").each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                if (!$eventItem.find(".btn_price_container div").hasClass("expired")) {
                    appdeals.apps.push(new App());
                    var index = appdeals.apps.length - 1;
                    appdeals.apps[index].title = $eventItem.find("h3 span:nth-of-type(2) strong").text();
                    appdeals.apps[index].icon = $eventItem.find(".icon img").attr("source");
                    appdeals.apps[index].url = $eventItem.find("a.icon").attr("href");
                    appdeals.apps[index].op = "€" + $eventItem.find(".old_price a").text().replace(" €", "");

                    if (appdeals.apps[index].op === "€0") {
                        appdeals.apps[index].op = "FREE";
                    }
                }
            });
        }
    }]);

    return AppDeals;
}(Provider);

//# sourceMappingURL=AppDeals.js.map