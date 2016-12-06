"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Dieter on 13/11/2016.
 */

var AppOfTheDay = function (_Provider) {
    _inherits(AppOfTheDay, _Provider);

    function AppOfTheDay() {
        _classCallCheck(this, AppOfTheDay);

        var _this = _possibleConstructorReturn(this, (AppOfTheDay.__proto__ || Object.getPrototypeOf(AppOfTheDay)).call(this));

        _this.name = "appoftheday";
        _this.logo = "svg/provider_logo/appoftheday.png";
        return _this;
    }

    _createClass(AppOfTheDay, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source')),
                self = this,
                app = new App(self);

            $data = $data.find('.offer').filter(function (i) {
                return $(this).find('a.link-app-free').exists();
            }).first();

            app.icon = $data.find(".icon-app").attr("data-original");
            app.title = $data.find("a.app-name").first().text().trim();
            app.url = $data.find(".app-name").attr("href");
            app.op = $data.find(".price-strike span").first().text();
            app.description = $data.find(".description").text();

            if (app.op.length == 0) app.op = undefined;

            self.apps.push(app);
        }
    }]);

    return AppOfTheDay;
}(Provider);

var AppOfTheDayAndroid = function (_AppOfTheDay) {
    _inherits(AppOfTheDayAndroid, _AppOfTheDay);

    function AppOfTheDayAndroid() {
        _classCallCheck(this, AppOfTheDayAndroid);

        var _this2 = _possibleConstructorReturn(this, (AppOfTheDayAndroid.__proto__ || Object.getPrototypeOf(AppOfTheDayAndroid)).call(this));

        _this2.platform = "android";
        _this2.url = _this2.moredeals = "http://www.appoftheday.com/gb/android";
        _this2.location = "col-1";
        _this2.appearance = "single-app";
        _this2.columns = "single-column";
        return _this2;
    }

    return AppOfTheDayAndroid;
}(AppOfTheDay);

var AppOfTheDayIPhone = function (_AppOfTheDay2) {
    _inherits(AppOfTheDayIPhone, _AppOfTheDay2);

    function AppOfTheDayIPhone() {
        _classCallCheck(this, AppOfTheDayIPhone);

        var _this3 = _possibleConstructorReturn(this, (AppOfTheDayIPhone.__proto__ || Object.getPrototypeOf(AppOfTheDayIPhone)).call(this));

        _this3.platform = "iphone";
        _this3.url = _this3.moredeals = "http://www.appoftheday.com/gb/iphone";
        _this3.location = "col-1";
        _this3.appearance = "single-app";
        _this3.columns = "single-column";
        return _this3;
    }

    return AppOfTheDayIPhone;
}(AppOfTheDay);

//# sourceMappingURL=AppOfTheDay.js.map