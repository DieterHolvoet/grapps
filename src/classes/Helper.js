/* globals $ */

class Helper {
    static parseRating(num) {
        // Source: https://goo.gl/Mznh7o
        const result = Math.round(parseFloat(num) * 2) / 2;
        return result.toString().replace('.', '');
    }

    // Test if ANY/ALL page animations are currently active
    // Source: http://goo.gl/9VQpkc
    static animationsTest(callback) {
        const testAnimationInterval = setInterval(() => {
            if (!$.timers.length) { // any page animations finished
                clearInterval(testAnimationInterval);
                callback();
            }
        }, 25);
    }
}

export default Helper;
