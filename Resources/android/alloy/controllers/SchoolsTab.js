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
    var __alloyId80 = [];
    $.__views.__alloyId81 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId81"
    });
    __alloyId80.push($.__views.__alloyId81);
    displayElementarySchools ? $.__views.__alloyId81.addEventListener("click", displayElementarySchools) : __defers["$.__views.__alloyId81!click!displayElementarySchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId81.add($.__views.buttonView);
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
    $.__views.__alloyId82 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId82"
    });
    __alloyId80.push($.__views.__alloyId82);
    displayMiddleSchools ? $.__views.__alloyId82.addEventListener("click", displayMiddleSchools) : __defers["$.__views.__alloyId82!click!displayMiddleSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId82.add($.__views.buttonView);
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
    $.__views.__alloyId83 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId83"
    });
    __alloyId80.push($.__views.__alloyId83);
    displayHighSchools ? $.__views.__alloyId83.addEventListener("click", displayHighSchools) : __defers["$.__views.__alloyId83!click!displayHighSchools"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId83.add($.__views.buttonView);
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
    $.__views.__alloyId84 = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "__alloyId84"
    });
    __alloyId80.push($.__views.__alloyId84);
    findMySchool ? $.__views.__alloyId84.addEventListener("click", findMySchool) : __defers["$.__views.__alloyId84!click!findMySchool"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.__alloyId84.add($.__views.buttonView);
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
        data: __alloyId80,
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
        publisherId: "ca-app-pub-3665132116722377/6561150840",
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
    $.schoolsTab.addEventListener("click", function() {
        $.schoolsTab.getWindow().animate({
            left: 0,
            duration: 200
        });
        if (true == isMenuWindowOpen) {
            tabGroupGlobalReference.remove(menuWindow);
            isMenuWindowOpen = false;
        }
    });
    $.schoolsTab.addEventListener("close", destroy);
    __defers["$.__views.__alloyId81!click!displayElementarySchools"] && $.__views.__alloyId81.addEventListener("click", displayElementarySchools);
    __defers["$.__views.__alloyId82!click!displayMiddleSchools"] && $.__views.__alloyId82.addEventListener("click", displayMiddleSchools);
    __defers["$.__views.__alloyId83!click!displayHighSchools"] && $.__views.__alloyId83.addEventListener("click", displayHighSchools);
    __defers["$.__views.__alloyId84!click!findMySchool"] && $.__views.__alloyId84.addEventListener("click", findMySchool);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;