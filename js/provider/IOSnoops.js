"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Dieter on 13/11/2016.
 */

var IOSnoops = function (_Provider) {
    _inherits(IOSnoops, _Provider);

    function IOSnoops() {
        _classCallCheck(this, IOSnoops);

        var _this = _possibleConstructorReturn(this, (IOSnoops.__proto__ || Object.getPrototypeOf(IOSnoops)).call(this));

        _this.name = "iosnoops";
        _this.logo = "svg/provider_logo/iosnoops.png";
        return _this;
    }

    _createClass(IOSnoops, [{
        key: "handler",
        value: function handler(data) {
            var _this2 = this;

            var $data = $(data.replace(/src/gi, 'source'));
            var self = this;

            $data.find('.post').each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.icon = $eventItem.find(".app-left-icon3 a").css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                app.title = $eventItem.find("h2 a").text();
                app.url = $eventItem.find("h2 a").attr("href");

                var source = $eventItem.find(".nav4 img").attr("source"),
                    match = /price-([0-9]+)(-([0-9]+))?/g.exec(source);

                if (typeof match[2] == 'undefined' || typeof match[3] == 'undefined') {
                    app.np = "FREE";
                } else {
                    app.op = _this2.getPrice(match[1]);
                    app.np = _this2.getPrice(match[3]);
                }

                self.apps.push(app);
            });
        }
    }, {
        key: "getPrice",
        value: function getPrice(str) {
            if (str === "0") {
                return "FREE";
            } else {
                var first = str.substring(0, str.length - 2),
                    second = str.substring(str.length - 2);

                return "$" + first + "." + second;
            }
        }
    }]);

    return IOSnoops;
}(Provider);

var IOSnoopsIPhone = function (_IOSnoops) {
    _inherits(IOSnoopsIPhone, _IOSnoops);

    function IOSnoopsIPhone() {
        _classCallCheck(this, IOSnoopsIPhone);

        var _this3 = _possibleConstructorReturn(this, (IOSnoopsIPhone.__proto__ || Object.getPrototypeOf(IOSnoopsIPhone)).call(this));

        _this3.platform = "iphone";
        _this3.url = _this3.moredeals = "http://www.iosnoops.com/iphone-deals/all/";
        _this3.location = "col-2";
        _this3.appearance = "app-list";
        _this3.columns = "double-column";
        return _this3;
    }

    return IOSnoopsIPhone;
}(IOSnoops);

var IOSnoopsIPad = function (_IOSnoops2) {
    _inherits(IOSnoopsIPad, _IOSnoops2);

    function IOSnoopsIPad() {
        _classCallCheck(this, IOSnoopsIPad);

        var _this4 = _possibleConstructorReturn(this, (IOSnoopsIPad.__proto__ || Object.getPrototypeOf(IOSnoopsIPad)).call(this));

        _this4.platform = "ipad";
        _this4.url = _this4.moredeals = "http://www.iosnoops.com/ipad-deals/all/";
        _this4.location = "col-2";
        _this4.appearance = "app-list";
        _this4.columns = "double-column";
        return _this4;
    }

    return IOSnoopsIPad;
}(IOSnoops);

//# sourceMappingURL=IOSnoops.js.map