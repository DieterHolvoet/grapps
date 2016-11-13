"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Amazon = function (_Provider) {
    _inherits(Amazon, _Provider);

    function Amazon() {
        _classCallCheck(this, Amazon);

        var _this = _possibleConstructorReturn(this, (Amazon.__proto__ || Object.getPrototypeOf(Amazon)).call(this));

        _this.name = "amazon";
        _this.platform = "android";
        _this.logo = "svg/provider_logo/amazon_appstore.svg";
        return _this;
    }

    return Amazon;
}(Provider);

var AmazonSpecialDiscounts = function (_Amazon) {
    _inherits(AmazonSpecialDiscounts, _Amazon);

    function AmazonSpecialDiscounts() {
        _classCallCheck(this, AmazonSpecialDiscounts);

        var _this2 = _possibleConstructorReturn(this, (AmazonSpecialDiscounts.__proto__ || Object.getPrototypeOf(AmazonSpecialDiscounts)).call(this));

        _this2.url = _this2.moredeals = "https://www.amazon.com/b?node=8605426011";
        _this2.location = "col-1";
        _this2.appearance = "app-list";
        _this2.columns = "single-column";
        return _this2;
    }

    _createClass(AmazonSpecialDiscounts, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source')),
                self = this;

            $data.find('.s-result-item').each(function (i, eventItem) {
                var $eventItem = $(eventItem),
                    app = new App(self);

                app.icon = $eventItem.find("img.s-access-image").attr("source");
                app.title = $eventItem.find(".s-access-title").text();
                app.author = $eventItem.find(".s-item-container .a-row.a-spacing-none > div:nth-of-type(2) > span").text();
                app.url = $eventItem.find("a.a-link-normal").prop("href");
                app.op = $eventItem.find(".a-row.a-spacing-none span.a-text-strike").text();

                var $np = $eventItem.find(".a-row.a-spacing-none .a-button-inner span span");
                if ($np.find(".sx-price-currency").length > 0) {
                    app.np = "" + $np.find(".sx-price-currency").text() + $np.find(".sx-price-whole").text() + "." + $np.find(".sx-price-fractional").text();
                } else {
                    app.np = $np.text();
                }

                if (app.op.length == 0) app.op = undefined;

                self.apps.push(app);
                if (i === 3) return;
            });
        }
    }]);

    return AmazonSpecialDiscounts;
}(Amazon);

var AmazonFeaturedApps = function (_Amazon2) {
    _inherits(AmazonFeaturedApps, _Amazon2);

    function AmazonFeaturedApps() {
        _classCallCheck(this, AmazonFeaturedApps);

        var _this3 = _possibleConstructorReturn(this, (AmazonFeaturedApps.__proto__ || Object.getPrototypeOf(AmazonFeaturedApps)).call(this));

        _this3.url = _this3.moredeals = "https://www.amazon.com/b?node=8605426011";
        _this3.location = "col-2";
        _this3.appearance = "app-list";
        _this3.columns = "double-column";
        return _this3;
    }

    _createClass(AmazonFeaturedApps, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source')),
                app = new App(self);

            app.banner = $data.find(".fad-widget-promo-image a img").attr("source");
            app.title = $data.find("h3.fad-widget-app-name a").text();
            app.url = "https://www.amazon.com" + $data.find("h3.fad-widget-app-name a").attr("href");
            app.op = $data.find(".fad-widget-original-price").text();

            if ($data.find(".swSprite").hasClass("s_star_0_5")) {
                app.rating = "05";
            } else if ($data.find(".swSprite").hasClass("s_star_1_0")) {
                app.rating = "1";
            } else if ($data.find(".swSprite").hasClass("s_star_1_5")) {
                app.rating = "15";
            } else if ($data.find(".swSprite").hasClass("s_star_2_0")) {
                app.rating = "2";
            } else if ($data.find(".swSprite").hasClass("s_star_2_5")) {
                app.rating = "25";
            } else if ($data.find(".swSprite").hasClass("s_star_3_0")) {
                app.rating = "3";
            } else if ($data.find(".swSprite").hasClass("s_star_3_5")) {
                app.rating = "35";
            } else if ($data.find(".swSprite").hasClass("s_star_4_0")) {
                app.rating = "4";
            } else if ($data.find(".swSprite").hasClass("s_star_4_5")) {
                app.rating = "45";
            } else if ($data.find(".swSprite").hasClass("s_star_5_0")) {
                app.rating = "5";
            }

            this.apps.push(app);
        }
    }]);

    return AmazonFeaturedApps;
}(Amazon);

var AmazonDeals = function (_Amazon3) {
    _inherits(AmazonDeals, _Amazon3);

    function AmazonDeals() {
        _classCallCheck(this, AmazonDeals);

        var _this4 = _possibleConstructorReturn(this, (AmazonDeals.__proto__ || Object.getPrototypeOf(AmazonDeals)).call(this));

        _this4.url = _this4.moredeals = "http://www.amazon.com/s/node=2446009011";
        _this4.location = "col-2";
        _this4.appearance = "app-list";
        _this4.columns = "double-column";
        return _this4;
    }

    _createClass(AmazonDeals, [{
        key: "handler",
        value: function handler(data) {
            var $data = $(data.replace(/src/gi, 'source'));

            $data.find('li.ilo2').each(function (i, eventItem) {
                var $eventItem = $(eventItem),
                    app = new App(self);

                app.icon = $eventItem.find(".productImage img").attr("source");
                app.title = $eventItem.find(".productImage ~ .ilt2 a span").text();
                app.author = $eventItem.find(".mobileAppsRedesignSubtitle").text();
                app.url = $eventItem.find(".ilc2 ~ .ilt2 a").prop("href");

                this.apps.push(app);
                if (i === 7) return false;
            });
        }
    }]);

    return AmazonDeals;
}(Amazon);

//# sourceMappingURL=Amazon.js.map