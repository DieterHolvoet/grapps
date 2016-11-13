"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GOTD = function (_Provider) {
    _inherits(GOTD, _Provider);

    function GOTD() {
        _classCallCheck(this, GOTD);

        var _this = _possibleConstructorReturn(this, (GOTD.__proto__ || Object.getPrototypeOf(GOTD)).call(this));

        _this.name = "gotd";
        _this.logo = "svg/provider_logo/giveawayoftheday.svg";
        return _this;
    }

    _createClass(GOTD, [{
        key: "handler",
        value: function handler(data, platform) {
            var $data = $(data.replace(/src/gi, 'source'));
            var self = this;

            $data.find(".col2 .wrapper_offers").each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.icon = $eventItem.find(".icon100").attr("source");
                app.title = $eventItem.find("h3 a").text();
                app.url = $eventItem.find("h3 a").attr("href");
                app.op = "$" + $eventItem.find(".discount b span").text().replace("$", "");
                // app.description = $eventItem.find(".short_dscr").text();

                self.apps.push(app);
            });
        }
    }]);

    return GOTD;
}(Provider);

var GOTDAndroid = function (_GOTD) {
    _inherits(GOTDAndroid, _GOTD);

    function GOTDAndroid() {
        _classCallCheck(this, GOTDAndroid);

        var _this2 = _possibleConstructorReturn(this, (GOTDAndroid.__proto__ || Object.getPrototypeOf(GOTDAndroid)).call(this));

        _this2.platform = "android";
        _this2.url = _this2.moredeals = "http://android.giveawayoftheday.com";
        _this2.location = "col-2";
        _this2.appearance = "app-list";
        _this2.columns = "double-column";
        return _this2;
    }

    return GOTDAndroid;
}(GOTD);

var GOTDIPhone = function (_GOTD2) {
    _inherits(GOTDIPhone, _GOTD2);

    function GOTDIPhone() {
        _classCallCheck(this, GOTDIPhone);

        var _this3 = _possibleConstructorReturn(this, (GOTDIPhone.__proto__ || Object.getPrototypeOf(GOTDIPhone)).call(this));

        _this3.platform = "iphone";
        _this3.url = _this3.moredeals = "http://iphone.giveawayoftheday.com";
        _this3.location = "col-1";
        _this3.appearance = "app-list";
        _this3.columns = "single-column";
        return _this3;
    }

    return GOTDIPhone;
}(GOTD);

//# sourceMappingURL=GOTD.js.map