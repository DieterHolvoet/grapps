/* jshint browser: true, jquery: true */

var Filter = (function() {
    
    function Filter() {
    }

    Filter.setActive = function(filter) {
        $("#filter-" + filter).attr('style', 'background-image: url(svg/platform_logo/' + filter + '-selected.svg);');
        if(Filter.active) {
            $("#filter-" + Filter.active).attr('style', 'background-image: url(svg/platform_logo/' + Filter.active + '.svg);');
        }

        Filter.active = filter;
        document.location.hash = filter;
    };
    
    // Check the URL for hashes
    Filter.getFromHash = function() {
        switch(document.location.hash) {
            case "#android":
                Filter.active = "android";
                break;

            case "#iphone":
                Filter.active = "iphone";
                break;

            case "#windows":
                Filter.active = "windows";
                break;

            case "#ipad":
                Filter.active = "ipad";
                break;

            default:
                break;
        }
    };
        
    return Filter;
})();