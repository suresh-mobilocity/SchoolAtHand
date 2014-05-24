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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SchoolsTab";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.schoolsWindow = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "schoolsWindow",
        title: "Schools"
    });
    var __alloyId94 = [];
    $.__views.__alloyId95 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId95"
    });
    __alloyId94.push($.__views.__alloyId95);
    displayElementarySchools ? $.__views.__alloyId95.addEventListener("click", displayElementarySchools) : __defers["$.__views.__alloyId95!click!displayElementarySchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId95.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "Elementary Schools",
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
    $.__views.__alloyId96 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId96"
    });
    __alloyId94.push($.__views.__alloyId96);
    displayMiddleSchools ? $.__views.__alloyId96.addEventListener("click", displayMiddleSchools) : __defers["$.__views.__alloyId96!click!displayMiddleSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId96.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "Middle Schools",
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
    $.__views.__alloyId97 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId97"
    });
    __alloyId94.push($.__views.__alloyId97);
    displayHighSchools ? $.__views.__alloyId97.addEventListener("click", displayHighSchools) : __defers["$.__views.__alloyId97!click!displayHighSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId97.add($.__views.buttonView);
    $.__views.school_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.building,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "school_icon"
    });
    $.__views.buttonView.add($.__views.school_icon);
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
        text: "High Schools",
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
    $.__views.__alloyId98 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId98"
    });
    __alloyId94.push($.__views.__alloyId98);
    findMySchool ? $.__views.__alloyId98.addEventListener("click", findMySchool) : __defers["$.__views.__alloyId98!click!findMySchool"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId98.add($.__views.buttonView);
    $.__views.search_icon = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.search,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: "15%",
        textAlign: "right",
        id: "search_icon"
    });
    $.__views.buttonView.add($.__views.search_icon);
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
        text: "Find My Schools",
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
    $.__views.schoolsView = Ti.UI.createTableView({
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId94,
        id: "schoolsView",
        top: "0",
        left: "0",
        layout: "vertical"
    });
    $.__views.schoolsWindow.add($.__views.schoolsView);
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
    $.__views.schoolsWindow.add($.__views.adView);
    $.__views.schoolsTab = Ti.UI.createTab({
        window: $.__views.schoolsWindow,
        id: "schoolsTab",
        title: "Schools"
    });
    $.__views.schoolsTab && $.addTopLevelView($.__views.schoolsTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.schoolsTab.addEventListener("click", function() {});
    __defers["$.__views.__alloyId95!click!displayElementarySchools"] && $.__views.__alloyId95.addEventListener("click", displayElementarySchools);
    __defers["$.__views.__alloyId96!click!displayMiddleSchools"] && $.__views.__alloyId96.addEventListener("click", displayMiddleSchools);
    __defers["$.__views.__alloyId97!click!displayHighSchools"] && $.__views.__alloyId97.addEventListener("click", displayHighSchools);
    __defers["$.__views.__alloyId98!click!findMySchool"] && $.__views.__alloyId98.addEventListener("click", findMySchool);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;