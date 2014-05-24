function Controller() {
    function destroy() {
        $.lunchMenu.removeEventListener("close", destroy);
        $.destroy();
        $.lunchMenu.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "LunchMenuBySchool";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.lunchMenu = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "lunchMenu",
        title: "Lunch Menu",
        modal: "false",
        layout: "vertical"
    });
    $.__views.lunchMenu && $.addTopLevelView($.__views.lunchMenu);
    $.__views.lunchMenuWebView = Ti.UI.createWebView({
        height: "85%",
        top: 0,
        id: "lunchMenuWebView"
    });
    $.__views.lunchMenu.add($.__views.lunchMenuWebView);
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
        publisherId: "ca-app-pub-3665132116722377/6561150840",
        width: Ti.UI.FILL,
        ns: "Admob",
        id: "adView"
    });
    $.__views.lunchMenu.add($.__views.adView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.lunchMenuWebView.setUrl("http://www.sbschools.org/our_schools/programs/dining_services/menus/" + args.shortname + ".pdf");
    $.lunchMenu.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;