function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayElementarySchools() {
        $.schoolsTab.open(Alloy.createController("Schools", {
            parentTab: $.schoolsTab,
            schoolType: "E"
        }).getView());
    }
    function displayMiddleSchools() {
        $.schoolsTab.open(Alloy.createController("Schools", {
            parentTab: $.schoolsTab,
            schoolType: "M"
        }).getView());
    }
    function displayHighSchools() {
        $.schoolsTab.open(Alloy.createController("Schools", {
            parentTab: $.schoolsTab,
            schoolType: "H"
        }).getView());
    }
    function findMySchool() {
        $.schoolsTab.open(Alloy.createController("Findmyschool", {
            parentTab: $.schoolsTab
        }).getView());
    }
    function destroy() {
        $.schoolsWindow.removeEventListener("close", destroy);
        $.destroy();
        $.schoolsWindow.removeAllChildren();
        $ = null;
        Ti.API.info("SchoolsTab: Cleanup Successfully");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SchoolsTab";
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
    $.__views.schoolsWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "schoolsWindow",
        title: "Schools"
    });
    var __alloyId97 = [];
    $.__views.__alloyId98 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId98"
    });
    __alloyId97.push($.__views.__alloyId98);
    displayElementarySchools ? $.__views.__alloyId98.addEventListener("click", displayElementarySchools) : __defers["$.__views.__alloyId98!click!displayElementarySchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId98.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "Elementary Schools",
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
    $.__views.__alloyId99 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId99"
    });
    __alloyId97.push($.__views.__alloyId99);
    displayMiddleSchools ? $.__views.__alloyId99.addEventListener("click", displayMiddleSchools) : __defers["$.__views.__alloyId99!click!displayMiddleSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId99.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "Middle Schools",
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
    $.__views.__alloyId100 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId100"
    });
    __alloyId97.push($.__views.__alloyId100);
    displayHighSchools ? $.__views.__alloyId100.addEventListener("click", displayHighSchools) : __defers["$.__views.__alloyId100!click!displayHighSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId100.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "High Schools",
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
    $.__views.__alloyId101 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId101"
    });
    __alloyId97.push($.__views.__alloyId101);
    findMySchool ? $.__views.__alloyId101.addEventListener("click", findMySchool) : __defers["$.__views.__alloyId101!click!findMySchool"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId101.add($.__views.buttonView);
    $.__views.search_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.search,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "search_icon"
    });
    $.__views.buttonView.add($.__views.search_icon);
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
        text: "Find My Schools",
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
    $.__views.schoolsView = Ti.UI.createTableView({
        left: "0",
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId97,
        id: "schoolsView",
        top: "0",
        layout: "vertical"
    });
    $.__views.schoolsWindow.add($.__views.schoolsView);
    $.__views.schoolsTab = Ti.UI.createTab({
        window: $.__views.schoolsWindow,
        id: "schoolsTab",
        title: "Schools",
        icon: "flag.png"
    });
    $.__views.schoolsTab && $.addTopLevelView($.__views.schoolsTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.schoolsTab.addEventListener("click", function() {});
    $.schoolsTab.addEventListener("close", destroy);
    if (Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        var adMobView = _admobview.getaddview();
        $.schoolsWindow.add(adMobView);
    }
    __defers["$.__views.__alloyId98!click!displayElementarySchools"] && $.__views.__alloyId98.addEventListener("click", displayElementarySchools);
    __defers["$.__views.__alloyId99!click!displayMiddleSchools"] && $.__views.__alloyId99.addEventListener("click", displayMiddleSchools);
    __defers["$.__views.__alloyId100!click!displayHighSchools"] && $.__views.__alloyId100.addEventListener("click", displayHighSchools);
    __defers["$.__views.__alloyId101!click!findMySchool"] && $.__views.__alloyId101.addEventListener("click", findMySchool);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;