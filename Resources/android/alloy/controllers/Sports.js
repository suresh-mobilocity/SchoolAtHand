function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadSportsView() {
        var rdata = [];
        var sql = "SELECT * from sports";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0) {
            while (sqlRS.isValidRow()) {
                var row = Ti.UI.createTableViewRow({
                    layout: "vertical",
                    height: 80,
                    left: "1%",
                    width: "98%",
                    color: "white",
                    category: sqlRS.fieldByName("category"),
                    url: sqlRS.fieldByName("website")
                });
                var buttonView = Ti.UI.createView({
                    top: 0,
                    layout: "horizontal"
                });
                var row_label = Ti.UI.createLabel({
                    text: sqlRS.fieldByName("category"),
                    top: 20,
                    left: "10%",
                    width: "60%",
                    height: Ti.UI.SIZE,
                    color: "white",
                    font: {
                        fontSize: 24,
                        fontWight: "bold",
                        fontFamily: "Helvetica Neue"
                    },
                    textAlign: "left"
                });
                var right_arrow = Ti.UI.createLabel({
                    top: 20,
                    left: 20,
                    text: Alloy.Globals.right_arrow,
                    font: {
                        fontFamily: "AppIcons",
                        fontSize: "24dp"
                    },
                    color: "#fff",
                    width: "15%",
                    textAlign: "right"
                });
                buttonView.add(row_label);
                buttonView.add(right_arrow);
                row.add(buttonView);
                rdata.push(row);
                sqlRS.next();
            }
            sqlRS.close();
        }
        var sportsTableView = Titanium.UI.createTableView({
            data: rdata,
            separatorColor: "#336699",
            top: 0,
            left: 0,
            layout: "vertical",
            height: "90%",
            backgroundColor: "#33B5E5"
        });
        sportsTableView.addEventListener("click", function(e) {
            displaySportsPage(e.rowData.title, e.rowData.url);
        });
        $.sportsWindow.add(sportsTableView);
        if (Ti.App.Properties.getBool("DisplayAds")) {
            adMobView = _admobview.getaddview();
            $.sportsWindow.add(adMobView);
        }
    }
    function displaySportsPage(title, url) {
        var args_t = {
            parentTab: $.parentController,
            wintitle: title,
            url: url
        };
        $.parentController.open(Alloy.createController("ViewWebSite", args_t).getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Sports";
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
    $.__views.sportsWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "sportsWindow"
    });
    $.__views.sportsWindow && $.addTopLevelView($.__views.sportsWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.sportsWindow.title = "District Sports";
    var _admobview = require("admobview");
    loadSportsView();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;