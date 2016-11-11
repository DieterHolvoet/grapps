/* jshint browser: true, jquery: true */
/* global amazon, appdeals, appgratis, appshopper, gotd, myappfree, Filter */

var Preferences = (function() {
    
    function Preferences() {

    }

    Preferences.loadProvider = function() {
        if(localStorage.getItem('preference_amazon')) {
            amazon.preference = JSON.parse(localStorage.getItem('preference_amazon'));
            $("#input-check-amazon").prop("checked", amazon.preference);
            
        } else {
            localStorage.setItem('preference_amazon', 'true');
        }

        if(localStorage.getItem('preference_appdeals')) {
            appdeals.preference = JSON.parse(localStorage.getItem('preference_appdeals'));
            $("#input-check-appdeals").prop("checked", appdeals.preference);
            
        } else {
            localStorage.setItem('preference_appdeals', 'true');
        }

        if(localStorage.getItem('preference_appgratis')) {
            appgratis.preference = JSON.parse(localStorage.getItem('preference_appgratis'));
            $("#input-check-appgratis").prop("checked", appgratis.preference);
            
        } else {
            localStorage.setItem('preference_appgratis', 'true');
        }

        if(localStorage.getItem('preference_appshopper')) {
            appshopper.preference = JSON.parse(localStorage.getItem('preference_appshopper'));
            $("#input-check-appshopper").prop("checked", appshopper.preference);
            
        } else {
            localStorage.setItem('preference_appshopper', 'true');
        }

        if(localStorage.getItem('preference_gotd')) {
            gotd.preference = JSON.parse(localStorage.getItem('preference_gotd'));
            $("#input-check-gotd").prop("checked", gotd.preference);
            
        } else {
            localStorage.setItem('preference_gotd', 'true');
        }

        if(localStorage.getItem('preference_myappfree')) {
            myappfree.preference = JSON.parse(localStorage.getItem('preference_myappfree'));
            $("#input-check-myappfree").prop("checked", myappfree.preference);
            
        } else {
            localStorage.setItem('preference_myappfree', 'true');
        }
    };
    
    // Source: http://goo.gl/8KeSwF
    Preferences.saveProvider = function(checkbox) {
        var checked = checkbox.is(":checked");      // check checkbox status

        if (checkbox) {
            switch($(checkbox).attr("id")) {
                case "input-check-amazon":
                    amazon.preference = !checked;
                    localStorage.setItem('preference_amazon', JSON.stringify(amazon.preference));
                    break;

                case "input-check-appdeals":
                    appdeals.preference = !checked;
                    localStorage.setItem('preference_appdeals', JSON.stringify(appdeals.preference));
                    break;

                case "input-check-appgratis":
                    appgratis.preference = !checked;
                    localStorage.setItem('preference_appgratis', JSON.stringify(appgratis.preference));
                    break;

                case "input-check-appshopper":
                    appshopper.preference = !checked;
                    localStorage.setItem('preference_appshopper', JSON.stringify(appshopper.preference));
                    break;

                case "input-check-gotd":
                    gotd.preference = !checked;
                    localStorage.setItem('preference_gotd', JSON.stringify(gotd.preference));
                    break;

                case "input-check-myappfree":
                    myappfree.preference = !checked;
                    localStorage.setItem('preference_myappfree', JSON.stringify(myappfree.preference));
                    break;

                default:
                    console.error("Checkbox is missing an ID");
                    break;
            }
        }
        checkbox.prop("checked", !checked);
    };
    
    Preferences.getDefaultFilter = function() {
        return localStorage.getItem('defaultFilter');
    };
    
    // Load the default filter from Local Storage
    Preferences.loadFilter = function() {
        if(Preferences.getDefaultFilter()) {
            Filter.setActive(Preferences.getDefaultFilter());
            
            switch(Filter.active) {
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
            
        } else {
            Filter.setActive('android');
        }
    };
    
    Preferences.saveFilter = function(id) {
        switch(id) {
            case "input-radio-android":
                localStorage.setItem('defaultFilter', "android");
                break;
                
            case "input-radio-iphone":
                localStorage.setItem('defaultFilter', "iphone");
                break;
                
            case "input-radio-windows":
                localStorage.setItem('defaultFilter', "windows");
                break;
                
            case "input-radio-ipad":
                localStorage.setItem('defaultFilter', "ipad");
                break;
        }
    };
        
    return Preferences;
})();