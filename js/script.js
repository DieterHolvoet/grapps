/* jslint white: true, browser: true, devel: true, windows: true, shadow: true, laxbreak: true, jquery: true */
/* global App, Filter, Preferences */

$.ajaxSetup({async: true});

var Grapps = (function() {
    
    function Grapps() {
    }
    
    Grapps.parseRating = function(num) {
        // Source: https://goo.gl/Mznh7o
        num = Math.round(parseFloat(num) * 2) / 2;
        return num.toString().replace('.', '');
    };

    // Test if ANY/ALL page animations are currently active
    // Source: http://goo.gl/9VQpkc
    Grapps.animationsTest = function(callback) {
        var testAnimationInterval = setInterval(function () {
            if (!$.timers.length) { // any page animations finished
                clearInterval(testAnimationInterval);
                callback();
            }
        }, 25);
    };
    
    return Grapps;
})();

$(document).ready(function() {
        
    if(document.location.hash) {
        Filter.getFromHash();

    } else {
        Preferences.loadFilter();
    }
    
    // Load articles
    App.loadAll(Filter.active);
    
    // Load the provider preferences from Local Storage    
    Preferences.loadProvider();
    
    $(".page-header li").on('click', function () {
        App.clearAll();
        $(".page-header").removeAttr("style"); // Fix for tablet layout changes
        var $element = $(this);
        
        if ($element.attr('id') !== "filter-" + Filter.active) {
            Filter.setActive($element.attr('id').replace("filter-", ""));
            
            $(".col-1 > .provider-entry, .col-2, .col-3").slideUp({
                easing: "easeInOutQuint", 
                duration: 700,
                always: function () {
                    $(".provider-entry").remove();
                    $(this).show();
                }
            });
            
            $.when( Grapps.loadWait ).done(function () {
                App.loadAll(Filter.active);
            });
        }
    });
    
    // Filter settings
    $(".settings-group input[type='radio']").on('click', function() {
        Preferences.saveFilter($(this).attr("id"));
    });
    
    // Provider settings
     $(".checkbox-group").click(function() {
         Preferences.saveProvider($(this).find(":checkbox"));
    });

    $('.checkbox-group :checkbox').click(function() {
      $(this).parent('.checkbox-group').click();
    });
    
    $("#settingsButton").on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".header-hidden").slideToggle({easing: "easeInOutQuint", duration: 1000});
    });

});