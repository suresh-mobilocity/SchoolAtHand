function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

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
    var __defers = {};
    $.__views.resourcesWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "resourcesWindow",
        title: "Resources"
    });
    var __alloyId65 = [];
    $.__views.__alloyId66 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId66"
    });
    __alloyId65.push($.__views.__alloyId66);
    displayTransportation ? $.__views.__alloyId66.addEventListener("click", displayTransportation) : __defers["$.__views.__alloyId66!click!displayTransportation"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId66.add($.__views.buttonView);
    $.__views.bus_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.bus_sign,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "bus_icon"
    });
    $.__views.buttonView.add($.__views.bus_icon);
    $.__views.row_label = Ti.UI.createLabel({
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: "5%",
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
        width: 50,
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.__alloyId67 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId67"
    });
    __alloyId65.push($.__views.__alloyId67);
    displaySports ? $.__views.__alloyId67.addEventListener("click", displaySports) : __defers["$.__views.__alloyId67!click!displaySports"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId67.add($.__views.buttonView);
    $.__views.sports_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.dribble,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "sports_icon"
    });
    $.__views.buttonView.add($.__views.sports_icon);
    $.__views.row_label = Ti.UI.createLabel({
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: "5%",
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
        width: 50,
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.__alloyId68 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId68"
    });
    __alloyId65.push($.__views.__alloyId68);
    displayPTA ? $.__views.__alloyId68.addEventListener("click", displayPTA) : __defers["$.__views.__alloyId68!click!displayPTA"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId68.add($.__views.buttonView);
    $.__views.pta_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.group,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "pta_icon"
    });
    $.__views.buttonView.add($.__views.pta_icon);
    $.__views.row_label = Ti.UI.createLabel({
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: "5%",
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
        width: 50,
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "left",
        id: "right_arrow"
    });
    $.__views.buttonView.add($.__views.right_arrow);
    $.__views.resourcesView = Ti.UI.createTableView({
        left: "0",
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId65,
        id: "resourcesView",
        top: "0",
        layout: "vertical"
    });
    $.__views.resourcesWindow.add($.__views.resourcesView);
    $.__views.resourcesTab = Ti.UI.createTab({
        window: $.__views.resourcesWindow,
        id: "resourcesTab",
        title: "More",
        icon: "more.png"
    });
    $.__views.resourcesTab && $.addTopLevelView($.__views.resourcesTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    var _admobview = require("admobview");
    var adMobView = _admobview.getaddview();
    Ti.App.Properties.getBool("DisplayAds") && $.resourcesWindow.add(adMobView);
    $.resourcesTab.addEventListener("click", function() {
        $.resourcesTab.getWindow().animate({
            left: 0,
            duration: 200
        });
        if (true == isMenuWindowOpen) {
            tabGroupGlobalReference.remove(menuWindow);
            isMenuWindowOpen = false;
        }
    });
    __defers["$.__views.__alloyId66!click!displayTransportation"] && $.__views.__alloyId66.addEventListener("click", displayTransportation);
    __defers["$.__views.__alloyId67!click!displaySports"] && $.__views.__alloyId67.addEventListener("click", displaySports);
    __defers["$.__views.__alloyId68!click!displayPTA"] && $.__views.__alloyId68.addEventListener("click", displayPTA);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;