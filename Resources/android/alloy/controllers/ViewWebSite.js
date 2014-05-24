function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ViewWebSite";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewWebSiteWin = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "viewWebSiteWin",
        title: "School Web Site",
        modal: "flase"
    });
    $.__views.viewWebSiteWin && $.addTopLevelView($.__views.viewWebSiteWin);
    $.__views.webSiteView = Ti.UI.createWebView({
        id: "webSiteView"
    });
    $.__views.viewWebSiteWin.add($.__views.webSiteView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.viewWebSiteWin.title = args.wintitle;
    $.webSiteView.url = args.url;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;