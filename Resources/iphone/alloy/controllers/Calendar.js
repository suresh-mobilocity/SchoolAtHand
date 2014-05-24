function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Calendar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.districtCalendar = Ti.UI.createWindow({
        backgroundColor: "#000",
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
    $.__views.adView = Admob.createView({
        testing: false,
        keywords: "K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF",
        publisherId: "ca-app-pub-3665132116722377/2467198443",
        width: Ti.UI.FILL,
        height: "10%",
        ns: "Admob",
        id: "adView"
    });
    $.__views.districtCalendar.add($.__views.adView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.districtCalendar.title = "Disctrict Calendar";
    $.webview.url = args.url;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;