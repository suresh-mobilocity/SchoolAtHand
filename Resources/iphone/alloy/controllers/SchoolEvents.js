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
    this.__controllerPath = "SchoolEvents";
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
    $.__views.schoolEventsWin = Ti.UI.createWindow({
        backgroundColor: "transparent",
        id: "schoolEventsWin",
        title: "Events",
        modal: "false"
    });
    $.__views.schoolEventsWin && $.addTopLevelView($.__views.schoolEventsWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var scode = args.shortname;
    var rowsData = [];
    var adMobView = null;
    var tableView = null;
    $.parentController = args.parentTab;
    $.schoolEventsWin.title = "Events @ " + args.schoolname;
    var eventsQuery = "SELECT strftime('%Y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth, strftime('%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '" + scode.toUpperCase() + "' AND eventdate >= date ('now')  UNION SELECT strftime('%Y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth , strftime('%d', eventdate) as eventdate, strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '' AND eventdate >= date ('now')  order by 1 asc";
    var eventResults = schoolDB.execute(eventsQuery);
    if (eventResults.getRowCount() > 0) {
        var rowDate = null;
        var rowDesc = null;
        if (eventResults.isValidRow()) {
            var eventDate = eventResults.fieldByName("eventdate");
            var eventMonth = eventResults.fieldByName("eventmonth");
            {
                eventResults.fieldByName("eventyear");
            }
            var eventDesc = eventResults.fieldByName("eventdescription");
            var weekday = dayNames[eventResults.fieldByName("weekday")];
            var monthName = monthNames[eventMonth - 1];
            rowDate = monthName + " " + eventDate + " " + weekday;
            rowDesc = "*" + eventDesc;
            eventResults.next();
        }
        while (eventResults.isValidRow()) {
            var eventDate = eventResults.fieldByName("eventdate");
            var eventMonth = eventResults.fieldByName("eventmonth");
            {
                eventResults.fieldByName("eventyear");
            }
            var eventDesc = eventResults.fieldByName("eventdescription");
            var weekday = dayNames[eventResults.fieldByName("weekday")];
            var monthName = monthNames[eventMonth - 1];
            var currDate = monthName + " " + eventDate + " " + weekday;
            if (currDate == rowDate) rowDesc = rowDesc + "\n* " + eventDesc; else {
                var eventDateLabel = Titanium.UI.createLabel({
                    text: rowDate,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    color: "blue",
                    width: "auto",
                    left: 5,
                    top: 10
                });
                var eventDescLabel = Titanium.UI.createLabel({
                    text: rowDesc,
                    font: {
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#000000"
                    },
                    width: "auto",
                    left: 10,
                    top: 10,
                    color: "black"
                });
                var eventRow = Titanium.UI.createTableViewRow({
                    height: Ti.UI.SIZE,
                    layout: "vertical",
                    color: "#000000",
                    className: "eventRow"
                });
                eventRow.add(eventDateLabel);
                eventRow.add(eventDescLabel);
                rowsData.push(eventRow);
                rowDate = currDate;
                rowDesc = "* " + eventDesc;
            }
            eventResults.next();
        }
        eventResults.close();
    }
    tableView = Titanium.UI.createTableView({
        data: rowsData,
        backgroundColor: "#ffffff",
        separatorColor: "#000000",
        height: "90%",
        top: 0
    });
    $.schoolEventsWin.add(tableView);
    if (Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        var adMobView = _admobview.getaddview();
        $.schoolEventsWin.add(adMobView);
    }
    $.schoolEventsWin.addEventListener("close", function() {
        $.schoolEventsWin.remove(tableView);
        $.schoolEventsWin.remove(adMobView);
        rowsData = null;
        tableView = null;
        adMobView = null;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;