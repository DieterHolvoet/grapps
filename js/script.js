'use strict';

$.ajaxSetup({ async: true });

function ajax(options) {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

$(function () {

    // Set filter and load articles
    if (document.location.hash) {
        Platform.setFromHash();
    } else {
        Platform.active = Platform.initial;
    }

    // Load preferences from Local Storage
    Preferences.loadInitialFilter();

    // Add provider checkboxes to settings
    for (var name in Providers.map) {
        if (!Providers.map.hasOwnProperty(name)) {
            continue;
        }

        $('.settings-group').eq(1).append('<div class="checkbox-group"> \n                <input type="checkbox" id="input-check-' + name + '" ' + (Preferences.isProviderEnabled(name) ? 'checked' : '') + '> \n                <label for="input-check-' + name + '">\n                    <span class="check"></span>\n                    <span class="box"></span>\n                     ' + Providers.map[name] + '\n                 </label>\n            </div>');
    }

    // Platform buttons handler
    $(".page-header li").on('click', function () {
        if (!Platform.locked) Platform.active = $(this).attr('id').replace("filter-", "");
    });

    // Platform settings
    $(".settings-group input[type='radio']").on('click', function () {
        Platform.initial = $(this).attr("id").replace("input-radio-", "");
    });

    // Provider settings
    $(".checkbox-group").click(function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var $checkbox = $(this).find(":checkbox"),
            name = $checkbox.attr("id").replace("input-check-", ""),
            checked = $checkbox.is(":checked"),
            test = Providers.all;

        $checkbox.prop("checked", !checked);
        Preferences.setProviderEnabled(name, !checked);
    });

    $('.checkbox-group :checkbox').click(function () {
        $(this).parent('.checkbox-group').click();
    });

    // Settings button handler
    $("#settingsButton").on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".header-hidden").slideToggle({ easing: "easeInOutQuint", duration: 1000 });
    });
});

//# sourceMappingURL=script.js.map