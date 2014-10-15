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
    this.__controllerPath = "AppDisclaimerSigned";
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
    $.__views.DisclaimerWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Disclaimer",
        layout: "vertical",
        id: "DisclaimerWin",
        fullscreen: "true",
        exitOnClone: "true"
    });
    $.__views.DisclaimerWin && $.addTopLevelView($.__views.DisclaimerWin);
    $.__views.webSiteView = Ti.UI.createWebView({
        id: "webSiteView",
        url: "/disclaimer.html"
    });
    $.__views.DisclaimerWin.add($.__views.webSiteView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;