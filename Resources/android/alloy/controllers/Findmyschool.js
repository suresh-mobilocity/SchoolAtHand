function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Findmyschool";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.findMySchoolWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "findMySchoolWindow",
        title: "Check School Allotment"
    });
    $.__views.findMySchoolWindow && $.addTopLevelView($.__views.findMySchoolWindow);
    $.__views.findMySchoolView = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#E3E3E3",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 16,
        left: 5,
        top: 5,
        right: 5,
        height: Ti.UI.SIZE,
        id: "findMySchoolView"
    });
    $.__views.findMySchoolWindow.add($.__views.findMySchoolView);
    $.__views.streetnamelabel = Ti.UI.createLabel({
        left: 5,
        top: 5,
        right: 5,
        height: Ti.UI.SIZE,
        id: "streetnamelabel",
        text: "Enter Street Name",
        textAlign: "left"
    });
    $.__views.findMySchoolView.add($.__views.streetnamelabel);
    $.__views.inputView = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "lightgray",
        top: 5,
        height: 50,
        id: "inputView"
    });
    $.__views.findMySchoolView.add($.__views.inputView);
    $.__views.streetNameInput = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "black",
        top: 5,
        left: 5,
        width: 250,
        height: 40,
        id: "streetNameInput"
    });
    $.__views.inputView.add($.__views.streetNameInput);
    $.__views.schoolFinderButton = Ti.UI.createButton({
        backgroundColor: "#336699",
        width: 75,
        height: 50,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        bottom: "50dp",
        id: "schoolFinderButton",
        title: "Check"
    });
    $.__views.inputView.add($.__views.schoolFinderButton);
    $.__views.listOfSchoolsByStreet = Ti.UI.createTableView({
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#E3E3E3",
        top: 0,
        borderColor: "gray",
        borderWidth: 2,
        layout: "veritcal",
        id: "listOfSchoolsByStreet",
        title: "List of Schools for St:",
        visible: "false"
    });
    $.__views.findMySchoolView.add($.__views.listOfSchoolsByStreet);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.findMySchoolWindow.title = "School Allotment";
    $.schoolFinderButton.addEventListener("click", function() {
        $.streetNameInput.blur();
        var sql = "SELECT street, elementary, middle FROM schoolallotment WHERE street LIKE '" + $.streetNameInput.value + "%'";
        var mySchoolsRS = schoolDB.execute(sql);
        var data = [];
        if (mySchoolsRS.getRowCount() > 0) {
            var row_num = 0;
            while (mySchoolsRS.isValidRow()) {
                row_num++;
                var street = mySchoolsRS.fieldByName("street");
                var elementary = mySchoolsRS.fieldByName("elementary");
                var middle = mySchoolsRS.fieldByName("middle");
                var row = Ti.UI.createTableViewRow({
                    layout: "vertical",
                    height: 80
                });
                var rowView = Ti.UI.createView({
                    layout: "vertical",
                    backgroundColor: "white",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
                });
                var streetLabel = Ti.UI.createLabel({
                    left: 5,
                    text: row_num + "." + street,
                    font: {
                        fontSize: 18,
                        fontWeight: "normal"
                    },
                    height: Ti.UI.SIZE
                });
                rowView.add(streetLabel);
                var elementaryLabel = Ti.UI.createLabel({
                    left: 30,
                    text: elementary + " " + "Elementary School",
                    font: {
                        fontSize: 14,
                        fontWeight: "normal"
                    },
                    color: "blue",
                    height: Ti.UI.SIZE
                });
                rowView.add(elementaryLabel);
                var middleLabel = Ti.UI.createLabel({
                    left: 30,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    text: middle + " " + "Middle School",
                    font: {
                        fontSize: 14,
                        fontWeight: "normal"
                    },
                    color: "blue",
                    height: Ti.UI.SIZE
                });
                rowView.add(middleLabel);
                row.add(rowView);
                data.push(row);
                mySchoolsRS.next();
            }
            mySchoolsRS.close();
        } else {
            var row = Ti.UI.createTableViewRow({
                layout: "vertical",
                height: 80
            });
            var rowView = Ti.UI.createView({
                layout: "vertical",
                backgroundColor: "transparent",
                borderColor: "gray",
                borderWidth: 2,
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
            });
            var noResultsLabel = Ti.UI.createLabel({
                left: 5,
                text: " No matching streets found",
                font: {
                    fontSize: 18,
                    fontWeight: "normal"
                },
                height: Ti.UI.SIZE
            });
            rowView.add(noResultsLabel);
            row.add(rowView);
            data.push(row);
        }
        $.listOfSchoolsByStreet.setVisible(true);
        $.listOfSchoolsByStreet.title = "List of Schools for St: " + street;
        $.listOfSchoolsByStreet.data = data;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;