/* globals $ */

import Platform from '../classes/Platform';

class Preferences {
    static loadInitialFilter() {
        switch (Platform.initial) {
            default:
            case 'android':
                $('#input-radio-iphone').prop('checked', false);
                $('#input-radio-windows').prop('checked', false);
                $('#input-radio-ipad').prop('checked', false);
                $('#input-radio-android').prop('checked', true);
                break;

            case 'iphone':
                $('#input-radio-windows').prop('checked', false);
                $('#input-radio-ipad').prop('checked', false);
                $('#input-radio-android').prop('checked', false);
                $('#input-radio-iphone').prop('checked', true);
                break;

            case 'windows':
                $('#input-radio-iphone').prop('checked', false);
                $('#input-radio-ipad').prop('checked', false);
                $('#input-radio-android').prop('checked', false);
                $('#input-radio-windows').prop('checked', true);
                break;

            case 'ipad':
                $('#input-radio-iphone').prop('checked', false);
                $('#input-radio-windows').prop('checked', false);
                $('#input-radio-android').prop('checked', false);
                $('#input-radio-ipad').prop('checked', true);
                break;
        }
    }

    static isProviderEnabled(name) {
        const pref = JSON.parse(localStorage.getItem(`preference_${name}`));

        if (pref == null) {
            localStorage.setItem(`preference_${name}`, true);
            return true;
        }
        return pref;
    }

    static setProviderEnabled(name, preference) {
        localStorage.setItem(`preference_${name}`, JSON.stringify(preference));
    }
}

export default Preferences;
