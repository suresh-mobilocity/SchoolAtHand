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
    this.__controllerPath = "ViewWebSite";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.viewWebSiteWin = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "viewWebSiteWin",
        title: "School Web Site",
        modal: "false"
    });
    $.__views.viewWebSiteWin && $.addTopLevelView($.__views.viewWebSiteWin);
    $.__views.webSiteView = Ti.UI.createWebView({
        height: "90%",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        top: 0,
        id: "webSiteView"
    });
    $.__views.viewWebSiteWin.add($.__views.webSiteView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.viewWebSiteWin.title = args.wintitle;
    $.webSiteView.url = args.url;
    if (Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        adMobView = _admobview.getaddview();
        $.viewWebSiteWin.add(adMobView);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;