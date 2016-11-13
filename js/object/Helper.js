'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Dieter on 12/11/2016.
 */

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'parseRating',
        value: function parseRating(num) {
            // Source: https://goo.gl/Mznh7o
            num = Math.round(parseFloat(num) * 2) / 2;
            return num.toString().replace('.', '');
        }
    }, {
        key: 'animationsTest',


        // Test if ANY/ALL page animations are currently active
        // Source: http://goo.gl/9VQpkc
        value: function animationsTest(callback) {
            var testAnimationInterval = setInterval(function () {
                if (!$.timers.length) {
                    // any page animations finished
                    clearInterval(testAnimationInterval);
                    callback();
                }
            }, 25);
        }
    }]);

    return Helper;
}();

//# sourceMappingURL=Helper.js.map