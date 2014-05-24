function Controller() {
    function displayTransportation() {
        $.resourcesTab.open(Alloy.createController("Transportation", {
            parentTab: $.resourcesTab
        }).getView());
    }
    function displaySports() {
        $.resourcesTab.open(Alloy.createController("Sports", {
            parentTab: $.resourcesTab
        }).getView());
    }
    function displayPTA() {
        $.resourcesTab.open(Alloy.createController("PTOMain", {
            parentTab: $.resourcesTab
        }).getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ResourcesTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.resourcesWindow = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "resourcesWindow",
        title: "Resources"
    });
    var __alloyId78 = [];
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId79"
    });
    __alloyId78.push($.__views.__alloyId79);
    displayTransportation ? $.__views.__alloyId79.addEventListener("click", displayTransportation) : __defers["$.__views.__alloyId79!click!displayTransportation"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId79.add($.__views.buttonView);
    $.__views.bus_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.bus_sign,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "bus_icon"
    });
    $.__views.buttonView.add($.__views.bus_icon);
    $.__views.row_label = Ti.UI.createLabel({
        top: 20,
        left: "5%",
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 24,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        text: "Transportation",
        id: "row_label"
    });
    $.__views.buttonView.add($.__views.row_label);
    $.__views.right_arrow = Ti.UI.createLabel({
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: 50,
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.__alloyId80 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId80"
    });
    __alloyId78.push($.__views.__alloyId80);
    displaySports ? $.__views.__alloyId80.addEventListener("click", displaySports) : __defers["$.__views.__alloyId80!click!displaySports"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId80.add($.__views.buttonView);
    $.__views.sports_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.dribble,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "sports_icon"
    });
    $.__views.buttonView.add($.__views.sports_icon);
    $.__views.row_label = Ti.UI.createLabel({
        top: 20,
        left: "5%",
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 24,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        text: "Sports",
        id: "row_label"
    });
    $.__views.buttonView.add($.__views.row_label);
    $.__views.right_arrow = Ti.UI.createLabel({
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: 50,
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.__alloyId81 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId81"
    });
    __alloyId78.push($.__views.__alloyId81);
    displayPTA ? $.__views.__alloyId81.addEventListener("click", displayPTA) : __defers["$.__views.__alloyId81!click!displayPTA"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId81.add($.__views.buttonView);
    $.__views.pta_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.group,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "pta_icon"
    });
    $.__views.buttonView.add($.__views.pta_icon);
    $.__views.row_label = Ti.UI.createLabel({
        top: 20,
        left: "5%",
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 24,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        text: "PTA / PTO",
        id: "row_label"
    });
    $.__views.buttonView.add($.__views.row_label);
    $.__views.right_arrow = Ti.UI.createLabel({
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: 50,
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.resourcesView = Ti.UI.createTableView({
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId78,
        id: "resourcesView",
        top: "0",
        left: "0",
        layout: "vertical"
    });
    $.__views.resourcesWindow.add($.__views.resourcesView);
    $.__views.adView = Admob.createView({
        testing: false,
        keywords: "K-12, education, graduation, kids student school books science  math toys sports parent teacher cars bikes",
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF",
        publisherId: "ca-app-pub-3665132116722377/2467198443",
        height: "10%",
        ns: "Admob",
        id: "adView"
    });
    $.__views.resourcesWindow.add($.__views.adView);
    $.__views.resourcesTab = Ti.UI.createTab({
        window: $.__views.resourcesWindow,
        id: "resourcesTab",
        title: "More"
    });
    $.__views.resourcesTab && $.addTopLevelView($.__views.resourcesTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    $.resourcesTab.addEventListener("click", function() {});
    __defers["$.__views.__alloyId79!click!displayTransportation"] && $.__views.__alloyId79.addEventListener("click", displayTransportation);
    __defers["$.__views.__alloyId80!click!displaySports"] && $.__views.__alloyId80.addEventListener("click", displaySports);
    __defers["$.__views.__alloyId81!click!displayPTA"] && $.__views.__alloyId81.addEventListener("click", displayPTA);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;