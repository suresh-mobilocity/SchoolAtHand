function Controller() {
    function loadSportsView() {
        var rdata = [];
        var sql = "SELECT * from sports";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0) {
            while (sqlRS.isValidRow()) {
                var row = Ti.UI.createTableViewRow({
                    layout: "vertical",
                    borderColor: "white",
                    borderWidth: 4,
                    height: 80,
                    left: "1%",
                    width: "98%",
                    color: "white",
                    backgroundColor: "#336699",
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
                    backgroundColor: "#336699",
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
            separatorColor: "#000000",
            top: 0,
            left: 0,
            layout: "vertical"
        });
        sportsTableView.addEventListener("click", function(e) {
            displaySportsPage(e.rowData.title, e.rowData.url);
        });
        $.sportsWindow.add(sportsTableView);
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.sportsWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "sportsWindow"
    });
    $.__views.sportsWindow && $.addTopLevelView($.__views.sportsWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.sportsWindow.title = "District Sports";
    loadSportsView();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;