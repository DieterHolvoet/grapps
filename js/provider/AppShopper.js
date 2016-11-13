"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppShopper = function (_Provider) {
    _inherits(AppShopper, _Provider);

    function AppShopper() {
        _classCallCheck(this, AppShopper);

        var _this = _possibleConstructorReturn(this, (AppShopper.__proto__ || Object.getPrototypeOf(AppShopper)).call(this));

        _this.name = "appshopper";
        _this.logo = "svg/provider_logo/appshopper.svg";
        return _this;
    }

    _createClass(AppShopper, [{
        key: "handler",
        value: function handler(data, platform) {
            var $data = $(data.replace(/src/gi, 'source'));
            var self = this;

            $data.find(".main-content .app").each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.title = $eventItem.find(".slide-wrap > .block-link > .details > h2").text();
                app.icon = $eventItem.find(".slide-wrap > .block-link > .icon > img").attr("source");
                app.url = "http://appshopper.com" + $eventItem.find("a:first-of-type").attr("href");
                app.op = $eventItem.find(".old-price strike").text();
                app.rating = Helper.parseRating($eventItem.find(".icon .stars:first-of-type").attr("data-rating"));

                self.apps.push(app);
            });
        }
    }]);

    return AppShopper;
}(Provider);

var AppShopperIPhone = function (_AppShopper) {
    _inherits(AppShopperIPhone, _AppShopper);

    function AppShopperIPhone() {
        _classCallCheck(this, AppShopperIPhone);

        var _this2 = _possibleConstructorReturn(this, (AppShopperIPhone.__proto__ || Object.getPrototypeOf(AppShopperIPhone)).call(this));

        _this2.platform = "iphone";
        _this2.url = _this2.moredeals = "http://appshopper.com/iphone/prices/free";
        _this2.location = "col-2";
        _this2.appearance = "app-list";
        _this2.columns = "double-column";
        return _this2;
    }

    return AppShopperIPhone;
}(AppShopper);

var AppShopperIPad = function (_AppShopper2) {
    _inherits(AppShopperIPad, _AppShopper2);

    function AppShopperIPad() {
        _classCallCheck(this, AppShopperIPad);

        var _this3 = _possibleConstructorReturn(this, (AppShopperIPad.__proto__ || Object.getPrototypeOf(AppShopperIPad)).call(this));

        _this3.platform = "ipad";
        _this3.url = _this3.moredeals = "http://appshopper.com/ipad/prices/free";
        _this3.location = "col-2";
        _this3.appearance = "app-list";
        _this3.columns = "double-column";
        return _this3;
    }

    return AppShopperIPad;
}(AppShopper);

//# sourceMappingURL=AppShopper.js.map