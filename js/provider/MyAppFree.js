"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyAppFree = function (_Provider) {
    _inherits(MyAppFree, _Provider);

    function MyAppFree() {
        _classCallCheck(this, MyAppFree);

        var _this = _possibleConstructorReturn(this, (MyAppFree.__proto__ || Object.getPrototypeOf(MyAppFree)).call(this));

        _this.name = "myappfree";
        _this.logo = "svg/provider_logo/myappfree.svg";

        _this.platform = "windows";
        _this.url = _this.moredeals = "http://www.myappfree.it";
        _this.location = "col-1";
        _this.appearance = "app-list";
        _this.columns = "single-column";
        return _this;
    }

    _createClass(MyAppFree, [{
        key: "handler",
        value: function handler(data) {
            data = data.replace(/src/gi, 'source');
            var self = this;

            $(data).find(".isotope-item").each(function (i, eventItem) {
                var $eventItem = $(eventItem);
                var app = new App(self);

                app.title = $eventItem.find("p").contents().filter(function () {
                    return this.nodeType == 3;
                })[0].nodeValue.trim();
                app.icon = $eventItem.find(".img-responsive").attr("source");
                app.url = $eventItem.find("a").attr("href");
                app.op = $eventItem.find("p span").text();

                self.apps.push(app);
            });
        }
    }]);

    return MyAppFree;
}(Provider);

//# sourceMappingURL=MyAppFree.js.map