function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "RssMain";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    if (Alloy.isTablet) {
        $.__views.rssmaster = Alloy.createController("RssMaster", {
            id: "rssmaster",
            __parentSymbol: __parentSymbol
        });
        $.__views.rssdetail = Alloy.createController("RssDetail", {
            id: "rssdetail",
            __parentSymbol: __parentSymbol
        });
        $.__views.schoolEventsRss = Ti.UI.iPad.createSplitWindow({
            masterView: $.__views.rssmaster.getViewEx({
                recurse: true
            }),
            detailView: $.__views.rssdetail.getViewEx({
                recurse: true
            }),
            id: "schoolEventsRss"
        });
        $.__views.schoolEventsRss && $.addTopLevelView($.__views.schoolEventsRss);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("RSS feed URL args: " + args.rssfeedurl);
    var isIpad = true && Alloy.isTablet;
    var usesNavGroup = true && Alloy.isHandheld || false;
    var rssMasterWin = Alloy.createController("RssMaster", {
        url: args.rssfeedurl,
        title: args.title
    }).getView();
    usesNavGroup && (Alloy.Globals.navgroup = $.index);
    rssMasterWin.addEventListener("detail", function(e) {
        var controller = isIpad ? $.detail : Alloy.createController("RssDetail");
        var win = controller.getView();
        controller.setArticle(e.row.articleUrl);
        usesNavGroup && Alloy.Globals.navgroup.openWindow(win);
    });
    var RssNavigationWin = Titanium.UI.iOS.createNavigationWindow({
        window: rssMasterWin
    });
    RssNavigationWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;