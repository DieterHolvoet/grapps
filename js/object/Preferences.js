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
        key: "loadActiveProviders",
        value: function loadActiveProviders() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Providers.all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var provider = _step.value;

                    $("#input-check-" + provider.name).prop("checked", provider.preference);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "saveActiveProvider",
        value: function saveActiveProvider(providerName, isActive) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Providers.all[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var provider = _step2.value;

                    if (provider.name = providerName) {
                        provider.preference = !isActive;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Preferences;
}();

//# sourceMappingURL=Preferences.js.map