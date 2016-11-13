
class App {
    
    constructor(provider, options = {}) {
        this.provider = provider;

        this.title = options.title;
        this.subtitle = options.subtitle;   // Kan zowel ondertitel als auteur zijn
        this.category = options.category;
        this.url = options.url;
        this.rating = options.rating;
        this.icon = options.icon;
        this.banner = options.banner;
        this.screenshot = options.screenshot;
        this.op = options.op;
        this.np = options.np;
        this.description = options.description;
    }

    appendToPage() {
        let location = `.${this.provider.location} .provider-entry.${this.provider.name}`;

        if (this.provider.location) {
            if (this.provider.appearance === "app-list") {
                
                // App is part of an app list;
                $(["<section class='app-entry clearfix'>",
                   (this.icon !== undefined ? ("<img src='" + this.icon + "'class='app-logo'>") : ""),
                   "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'>",
                   "<h1>" + this.title + "</h1></a>",
                   (this.author !== undefined ? ("<p>" + this.author + "</p>") : ""),
                   (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : ""),
                   (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : ""),
                   (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : ""),
                   (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : ""),
                   "</section>",
                  ].join("\n")).insertBefore($(`${location} .app-list > .btn_more_deals`));

            } else if (this.provider.appearance === "single-app") {
                
                // App is not part of an app list
                $([(this.banner !== undefined && this.provider.name === "amazon" ? ("<img src=\'" + this.banner + "\' class=\'app-banner\'>") : ""),
                   "<section class=\'app-entry clearfix\'>",
                   (this.icon !== undefined ? ("<img src=\'" + this.icon + "\'class=\'app-logo\'>") : ""),
                   "<a target=\'_blank\' title=\'" + this.title + "\' href=\'" + this.url + "\'><h1>" + this.title + "</h1></a>",
                   (this.subtitle !== undefined ? ("<p>" + this.subtitle + "</p>") : ""),
                   (this.rating !== undefined ? ("<div class=\'rating stars-" + this.rating + "\'></div>") : ""),
                   (this.op !== undefined ? ("<div class=\'pricetag-box\'><p>Original price:</p><div class=\'pricetag\'><p>" + this.op + "</p></div></div>") : ""),
                   (this.np !== undefined ? ("<div class=\'pricetag-box\'><p>New price:</p><div class=\'pricetag\'><p>" + this.np + "</p></div></div>") : ""),
                   "</section>",
                   ((this.description !== undefined) ? ("<section class=\'app-description\'><p>" + this.description + "</p></section>") : "")
                  ].join("\n")).appendTo($(location + " .provider-body"));
            }
            
        } else {
            console.log("Append target doesn't exist, assuming it was turned off in the preferences.");
        }

        // Fix widths
        $(".col-1").width($(".col-1 .provider-entry").width());
        $(".col-2").width($(".col-2 .provider-entry").width());
        $(".col-3").width($(".col-3 .provider-entry").width());
    }
}