
class Preferences {

    static loadInitialFilter() {
        switch(Platform.initial) {
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
    }

    static loadActiveProviders() {
        for(var provider of Providers.all) {
            $(`#input-check-${provider.name}`).prop("checked", provider.preference);
        }
    }

    static saveActiveProvider(providerName, isActive) {
        for(var provider of Providers.all) {
            if(provider.name = providerName) {
                provider.preference = !isActive;
            }
        }
    }
}