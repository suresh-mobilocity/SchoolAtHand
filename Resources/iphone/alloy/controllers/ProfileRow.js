function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ProfileRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: "98%L",
        height: 80,
        className: "loc_row",
        dataId: "",
        left: "1%",
        borderColor: "white",
        color: "white",
        borderWidth: "8",
        id: "row",
        model: "undefined" != typeof $model.__transform["profile_id"] ? $model.__transform["profile_id"] : $model.get("profile_id")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId71 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId71"
    });
    $.__views.row.add($.__views.__alloyId71);
    $.__views.name = Ti.UI.createLabel({
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
        textAlign: "left",
        id: "name",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.__alloyId71.add($.__views.name);
    $.__views.right_arrow = Ti.UI.createLabel({
        top: 20,
        left: 10,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "#fff",
        width: Ti.UI.SIZE,
        textAlign: "right",
        id: "right_arrow"
    });
    $.__views.__alloyId71.add($.__views.right_arrow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;