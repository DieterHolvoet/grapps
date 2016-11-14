"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preferences = function () {
    function Preferences() {
        _classCallCheck(this, Preferences);
    }

    _createClass(Preferences, null, [{
        key: "loadInitialFilter",
        value: function loadInitialFilter() {
            switch (Platform.initial) {
                case "android":
                    $("#input-radio-iphone").prop("checked", false);
                    $("#input-radio-windows").prop("checked", false);
                    $("#input-radio-ipad").prop("checked", false);
                    $("#input-radio-android").prop("checked", true);
                    break;

                case "iphone":
                    $("#input-radio-windows").prop("checked", false);
                    $("#input-radio-ipad").prop("checked", false);
                    $("#input-radio-android").prop("checked", false);
                    $("#input-radio-iphone").prop("checked", true);
                    break;

                case "windows":
                    $("#input-radio-iphone").prop("checked", false);
                    $("#input-radio-ipad").prop("checked", false);
                    $("#input-radio-android").prop("checked", false);
                    $("#input-radio-windows").prop("checked", true);
                    break;

                case "ipad":
                    $("#input-radio-iphone").prop("checked", false);
                    $("#input-radio-windows").prop("checked", false);
                    $("#input-radio-android").prop("checked", false);
                    $("#input-radio-ipad").prop("checked", true);
                    break;
            }
        }
    }, {
        key: "isProviderEnabled",
        value: function isProviderEnabled(name) {
            var pref = JSON.parse(localStorage.getItem("preference_" + name));

            if (pref == null) {
                localStorage.setItem("preference_" + name, true);
                return true;
            } else {
                return pref;
            }
        }
    }, {
        key: "setProviderEnabled",
        value: function setProviderEnabled(name, preference) {
            localStorage.setItem("preference_" + name, JSON.stringify(preference));
        }
    }]);

    return Preferences;
}();

//# sourceMappingURL=Preferences.js.map