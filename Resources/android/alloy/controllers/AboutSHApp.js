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
    this.__controllerPath = "AboutSHApp";
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
    $.__views.aboutWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "aboutWindow"
    });
    $.__views.aboutWindow && $.addTopLevelView($.__views.aboutWindow);
    $.__views.aboutView = Ti.UI.createWebView({
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS,
        id: "aboutView",
        url: "/aboutshapp.html"
    });
    $.__views.aboutWindow.add($.__views.aboutView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.aboutWindow.title = "About School@Hand App";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;