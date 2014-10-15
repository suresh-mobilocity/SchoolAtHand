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
    this.__controllerPath = "Calendar";
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
    $.__views.districtCalendar = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "districtCalendar",
        title: "District Calendar",
        modal: "false"
    });
    $.__views.districtCalendar && $.addTopLevelView($.__views.districtCalendar);
    $.__views.webview = Ti.UI.createWebView({
        height: "85%",
        top: 0,
        id: "webview"
    });
    $.__views.districtCalendar.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var _admobview = require("admobview");
    var adMobView = _admobview.getaddview();
    $.parentController = args.parentTab;
    $.districtCalendar.title = "Disctrict Calendar";
    $.webview.url = args.url;
    Ti.App.Properties.getBool("DisplayAds") && $.districtCalendar.add(adMobView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;