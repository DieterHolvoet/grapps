/* globals $ */

import Platform from './classes/Platform';
import Preferences from './classes/Preferences';
import Providers from './classes/Providers';

$.ajaxSetup({ async: true });

$(() => {
    // Set filter and load articles
    if (document.location.hash) {
        Platform.setFromHash();
    } else {
        Platform.active = Platform.initial;
    }

    // Load preferences from Local Storage
    Preferences.loadInitialFilter();

    // Add provider checkboxes to settings
    Object.keys(Providers.map).forEach((name) => {
        $('.settings-group').eq(1).append(
            `<div class="checkbox-group"> 
                <input type="checkbox" id="input-check-${name}" ${Preferences.isProviderEnabled(name) ? 'checked' : ''}> 
                <label for="input-check-${name}">
                    <span class="check"></span>
                    <span class="box"></span>
                     ${Providers.map[name]}
                 </label>
            </div>`,
        );
    });

    // Platform buttons handler
    $('.page-header li').on('click', (e) => {
        if (!Platform.locked) { Platform.active = $(e.target).attr('id').replace('filter-', ''); }
    });

    // Platform settings
    $(".settings-group input[type='radio']").on('click', (e) => {
        Platform.initial = $(e).attr('id').replace('input-radio-', '');
    });

    // Provider settings
    $('.checkbox-group').click((e) => {
        e.stopPropagation();
        e.preventDefault();

        const $checkbox = $(e.target).find(':checkbox');
        const name = $checkbox.attr('id').replace('input-check-', '');
        const checked = $checkbox.is(':checked');

        $checkbox.prop('checked', !checked);
        Preferences.setProviderEnabled(name, !checked);
    });

    $('.checkbox-group :checkbox').click((e) => {
        $(e).parent('.checkbox-group').click();
    });

    // Settings button handler
    $('#settingsButton').on('click', () => {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        $('.header-hidden').slideToggle({ easing: 'easeInOutQuint', duration: 1000 });
    });
});

// Helpers
$.fn.extend({
    textNode() {
        const node = this.contents().filter(() => this.nodeType === 3)[0];

        if (node !== undefined) { return node.nodeValue.trim(); }
        return null;
    },

    exists() {
        return this.length > 0;
    },
});
