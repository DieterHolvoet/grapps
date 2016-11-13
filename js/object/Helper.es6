/**
 * Created by Dieter on 12/11/2016.
 */

class Helper {
    static parseRating(num) {
        // Source: https://goo.gl/Mznh7o
        num = Math.round(parseFloat(num) * 2) / 2;
        return num.toString().replace('.', '');
    };

    // Test if ANY/ALL page animations are currently active
    // Source: http://goo.gl/9VQpkc
    static animationsTest(callback) {
        var testAnimationInterval = setInterval(function () {
            if (!$.timers.length) { // any page animations finished
                clearInterval(testAnimationInterval);
                callback();
            }
        }, 25);
    };
}