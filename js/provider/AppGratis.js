"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppGratis = function (_Provider) {
    _inherits(AppGratis, _Provider);

    function AppGratis() {
        _classCallCheck(this, AppGratis);

        var _this = _possibleConstructorReturn(this, (AppGratis.__proto__ || Object.getPrototypeOf(AppGratis)).call(this));

        _this.name = "appgratis";
        _this.logo = "svg/provider_logo/appgratis_flat.svg";
        return _this;
    }

    _createClass(AppGratis, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source'));
            var self = this;

            $data.find('.deal:not(.expired)').each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.icon = $eventItem.find("header div.app-icon img").attr("source");
                app.title = $eventItem.find("header div.app-info span.item a").text().replace("[+] ", "");
                app.subtitle = $eventItem.find("header div.app-info p.editor").text();
                app.url = "https://appgratis.com" + $eventItem.find("header div.app-info span.item a").attr("href");
                app.np = $eventItem.find("header div.app-info .price span.price-price").text();
                app.description = $eventItem.find(".content article.summary").text();

                app.np = app.np === "FREE" ? undefined : "FREE";

                self.apps.push(app);
            });
        }
    }]);

    return AppGratis;
}(Provider);

var AppGratisAndroid = function (_AppGratis) {
    _inherits(AppGratisAndroid, _AppGratis);

    function AppGratisAndroid() {
        _classCallCheck(this, AppGratisAndroid);

        var _this2 = _possibleConstructorReturn(this, (AppGratisAndroid.__proto__ || Object.getPrototypeOf(AppGratisAndroid)).call(this));

        _this2.platform = "android";
        _this2.url = _this2.moredeals = "http://appgratis.com/android";
        _this2.location = "col-1";
        _this2.appearance = "single-app";
        _this2.columns = "single-column";
        return _this2;
    }

    return AppGratisAndroid;
}(AppGratis);

var AppGratisIPhone = function (_AppGratis2) {
    _inherits(AppGratisIPhone, _AppGratis2);

    function AppGratisIPhone() {
        _classCallCheck(this, AppGratisIPhone);

        var _this3 = _possibleConstructorReturn(this, (AppGratisIPhone.__proto__ || Object.getPrototypeOf(AppGratisIPhone)).call(this));

        _this3.platform = "iphone";
        _this3.url = _this3.moredeals = "http://appgratis.com";
        _this3.location = "col-1";
        _this3.appearance = "single-app";
        _this3.columns = "single-column";
        return _this3;
    }

    return AppGratisIPhone;
}(AppGratis);

var AppGratisIPad = function (_AppGratis3) {
    _inherits(AppGratisIPad, _AppGratis3);

    function AppGratisIPad() {
        _classCallCheck(this, AppGratisIPad);

        var _this4 = _possibleConstructorReturn(this, (AppGratisIPad.__proto__ || Object.getPrototypeOf(AppGratisIPad)).call(this));

        _this4.platform = "iphone";
        _this4.url = _this4.moredeals = "http://appgratis.com/ipad";
        _this4.location = "col-1";
        _this4.appearance = "single-app";
        _this4.columns = "single-column";
        return _this4;
    }

    return AppGratisIPad;
}(AppGratis);

//# sourceMappingURL=AppGratis.js.map