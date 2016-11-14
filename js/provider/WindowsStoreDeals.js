"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowsStoreDeals = function (_Provider) {
    _inherits(WindowsStoreDeals, _Provider);

    function WindowsStoreDeals() {
        _classCallCheck(this, WindowsStoreDeals);

        var _this = _possibleConstructorReturn(this, (WindowsStoreDeals.__proto__ || Object.getPrototypeOf(WindowsStoreDeals)).call(this));

        _this.name = "windowsstoredeals";
        _this.logo = "svg/provider_logo/windowsstoredeals.svg";

        _this.platform = "windows";
        _this.url = "https://windowsstore.deals/data/deals11.json";
        _this.moredeals = "https://windowsstore.deals";
        _this.location = "col-2";
        _this.appearance = "app-list";
        _this.columns = "double-column";
        return _this;
    }

    _createClass(WindowsStoreDeals, [{
        key: "handler",
        value: function handler(data) {
            data = $.parseJSON(data);
            var self = this;

            data.forEach(function (result) {
                var app = new App(self);

                app.title = result.title;
                app.description = result.description;
                app.icon = result.image;
                app.url = result.url;
                app.op = result.oldprice;
                app.np = result.currency + result.newprice;

                if (app.np === "$0") app.np = "FREE";

                self.apps.push(app);
            });
        }
    }]);

    return WindowsStoreDeals;
}(Provider);

//# sourceMappingURL=WindowsStoreDeals.js.map