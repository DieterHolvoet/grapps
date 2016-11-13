"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Dieter on 12/11/2016.
 */

var Providers = function () {
    function Providers() {
        _classCallCheck(this, Providers);
    }

    _createClass(Providers, null, [{
        key: "clear",
        value: function clear() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Providers.all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var provider = _step.value;

                    provider.apps = [];
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
        key: "add",
        value: function add(provider) {
            if (this.all === undefined) {
                this.all = [];
            }

            this.all.push(provider);
        }
    }, {
        key: "all",
        get: function get() {
            if (this._providers === undefined) {
                return [];
            } else {
                return this._providers;
            }
        },
        set: function set(providers) {
            this._providers = providers;
        }
    }]);

    return Providers;
}();

//# sourceMappingURL=Providers.js.map