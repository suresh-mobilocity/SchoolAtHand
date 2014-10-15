function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayNews() {
        var feedType = getNewsFeedType();
        if ("RSS" == feedType.toUpperCase()) {
            var newsfeedurl = getNewsFeedUrl();
            Alloy.createController("RssMain", {
                parentTab: $.districtTab,
                rssfeedurl: newsfeedurl,
                title: "District News"
            });
        } else $.districtTab.open(Alloy.createController("DistrictNewsMain", {
            parentTab: $.districtTab
        }).getView());
    }
    function getNewsFeedType() {
        var sql = "SELECT name, value FROM enum where name like '%newsfeed%'";
        var feedType = "";
        var tmpRS = schoolDB.execute(sql);
        tmpRS.getRowCount() > 0 && tmpRS.isValidRow() && (feedType = tmpRS.fieldByName("value"));
        tmpRS.close();
        return feedType;
    }
    function getNewsFeedUrl() {
        var sql = "SELECT url FROM weburls where name like '%newsfeed%' ";
        var feedUrl = "";
        var tmpRS = schoolDB.execute(sql);
        tmpRS.getRowCount() > 0 && tmpRS.isValidRow() && (feedUrl = tmpRS.fieldByName("url"));
        tmpRS.close();
        return feedUrl;
    }
    function displayEvents() {
        $.districtTab.open(Alloy.createController("Events", {
            parentTab: $.districtTab
        }).getView());
    }
    function displayLunchMenu() {
        $.districtTab.open(Alloy.createController("LunchMenus", {
            parentTab: $.districtTab
        }).getView());
    }
    function displayCommunityEd() {
        $.districtTab.open(Alloy.createController("CommunityEd", {
            parentTab: $.districtTab
        }).getView());
    }
    function displayContacts() {
        $.districtTab.open(Alloy.createController("Contacts", {
            parentTab: $.districtTab
        }).getView());
    }
    function displayCalendar() {
        var sql = "SELECT url FROM weburls where name like '%calendar%' ";
        var calendarURL = "";
        var tmpRS = schoolDB.execute(sql);
        tmpRS.getRowCount() > 0 && tmpRS.isValidRow() && (calendarURL = tmpRS.fieldByName("url"));
        $.districtTab.open(Alloy.createController("Calendar", {
            parentTab: $.districtTab,
            url: calendarURL
        }).getView());
    }
    function destroy() {
        $.districtWindow.removeEventListener("close", destroy);
        $.destroy();
        $.districtWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DistrictTab";
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
    $.__views.districtWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "districtWindow",
        title: "District"
    });
    var __alloyId20 = [];
    $.__views.news = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "news"
    });
    __alloyId20.push($.__views.news);
    displayNews ? $.__views.news.addEventListener("click", displayNews) : __defers["$.__views.news!click!displayNews"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.news.add($.__views.buttonView);
    $.__views.news_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.list_alt,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "news_icon"
    });
    $.__views.buttonView.add($.__views.news_icon);
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
        text: "District News",
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
    $.__views.events = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "events"
    });
    __alloyId20.push($.__views.events);
    displayEvents ? $.__views.events.addEventListener("click", displayEvents) : __defers["$.__views.events!click!displayEvents"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.events.add($.__views.buttonView);
    $.__views.events_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.calendar,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "events_icon"
    });
    $.__views.buttonView.add($.__views.events_icon);
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
        text: "Events",
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
    $.__views.lunchmenu = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "lunchmenu"
    });
    __alloyId20.push($.__views.lunchmenu);
    displayLunchMenu ? $.__views.lunchmenu.addEventListener("click", displayLunchMenu) : __defers["$.__views.lunchmenu!click!displayLunchMenu"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.lunchmenu.add($.__views.buttonView);
    $.__views.lunch_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.food,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "lunch_icon"
    });
    $.__views.buttonView.add($.__views.lunch_icon);
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
        text: "Lunch Menu",
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
    $.__views.contacts = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "contacts"
    });
    __alloyId20.push($.__views.contacts);
    displayContacts ? $.__views.contacts.addEventListener("click", displayContacts) : __defers["$.__views.contacts!click!displayContacts"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.contacts.add($.__views.buttonView);
    $.__views.contacts_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.book_alt,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "contacts_icon"
    });
    $.__views.buttonView.add($.__views.contacts_icon);
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
        text: "Contacts",
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
    $.__views.calendar = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "calendar"
    });
    __alloyId20.push($.__views.calendar);
    displayCalendar ? $.__views.calendar.addEventListener("click", displayCalendar) : __defers["$.__views.calendar!click!displayCalendar"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.calendar.add($.__views.buttonView);
    $.__views.calendar_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.calendar,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "calendar_icon"
    });
    $.__views.buttonView.add($.__views.calendar_icon);
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
        text: "District Calendar",
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
    $.__views.communityEdLabel = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        id: "communityEdLabel"
    });
    __alloyId20.push($.__views.communityEdLabel);
    displayCommunityEd ? $.__views.communityEdLabel.addEventListener("click", displayCommunityEd) : __defers["$.__views.communityEdLabel!click!displayCommunityEd"] = true;
    $.__views.buttonView = Ti.UI.createView({
        id: "buttonView",
        top: "0",
        layout: "horizontal"
    });
    $.__views.communityEdLabel.add($.__views.buttonView);
    $.__views.community_icon = Ti.UI.createLabel({
        width: "15%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: 10,
        text: Alloy.Globals.icons.group_alt,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "community_icon"
    });
    $.__views.buttonView.add($.__views.community_icon);
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
        text: "Community Ed",
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
    $.__views.districtView = Ti.UI.createTableView({
        left: "0",
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId20,
        id: "districtView",
        top: "0",
        layout: "vertical"
    });
    $.__views.districtWindow.add($.__views.districtView);
    $.__views.districtTab = Ti.UI.createTab({
        window: $.__views.districtWindow,
        id: "districtTab",
        title: "District",
        icon: "library.png"
    });
    $.__views.districtTab && $.addTopLevelView($.__views.districtTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.districtTab.addEventListener("click", function() {});
    $.districtTab.addEventListener("close", destroy);
    __defers["$.__views.news!click!displayNews"] && $.__views.news.addEventListener("click", displayNews);
    __defers["$.__views.events!click!displayEvents"] && $.__views.events.addEventListener("click", displayEvents);
    __defers["$.__views.lunchmenu!click!displayLunchMenu"] && $.__views.lunchmenu.addEventListener("click", displayLunchMenu);
    __defers["$.__views.contacts!click!displayContacts"] && $.__views.contacts.addEventListener("click", displayContacts);
    __defers["$.__views.calendar!click!displayCalendar"] && $.__views.calendar.addEventListener("click", displayCalendar);
    __defers["$.__views.communityEdLabel!click!displayCommunityEd"] && $.__views.communityEdLabel.addEventListener("click", displayCommunityEd);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;