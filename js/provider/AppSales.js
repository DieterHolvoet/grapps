"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Dieter on 13/11/2016.
 */

var AppSales = function (_Provider) {
    _inherits(AppSales, _Provider);

    function AppSales() {
        _classCallCheck(this, AppSales);

        var _this = _possibleConstructorReturn(this, (AppSales.__proto__ || Object.getPrototypeOf(AppSales)).call(this));

        _this.name = "appsales";
        _this.logo = "svg/provider_logo/appsales.png";

        _this.platform = "android";
        _this.url = _this.moredeals = "http://www.app-sales.net/";
        _this.location = "col-2";
        _this.appearance = "app-list";
        _this.columns = "double-column";
        return _this;
    }

    _createClass(AppSales, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source'));
            var self = this;

            $data.find('.sales:not(.charts) .sale-item:not(.expired)').each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.icon = $eventItem.find(".sale-icon img").attr("source");
                app.title = $eventItem.find(".sale-name .apptitle").text();
                // app.subtitle = $eventItem.find(".sale-name .developer").text();
                app.url = "https://www.app-sales.net" + $eventItem.find(".sale-name .sale-link").attr("href");
                app.op = $eventItem.find(".sale-pricing .price-old").text();
                app.np = $eventItem.find(".sale-pricing .price-new").text();

                if (empty(app.op)) delete app.op;
                if (empty(app.np)) delete app.np;

                self.apps.push(app);
            });
        }
    }]);

    return AppSales;
}(Provider);

//# sourceMappingURL=AppSales.js.map