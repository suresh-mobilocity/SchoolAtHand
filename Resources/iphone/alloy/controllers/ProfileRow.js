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
    this.__controllerPath = "ProfileRow";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        var $model = __processArg(arguments[0], "$model");
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: "98%L",
        height: 80,
        className: "loc_row",
        dataId: "",
        borderColor: "white",
        color: "white",
        borderWidth: "8",
        id: "row",
        model: "undefined" != typeof $model.__transform["profile_id"] ? $model.__transform["profile_id"] : $model.get("profile_id")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId72 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId72"
    });
    $.__views.row.add($.__views.__alloyId72);
    $.__views.name = Ti.UI.createLabel({
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        top: 20,
        left: "10%",
        font: {
            fontSize: 24,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        id: "name",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.__alloyId72.add($.__views.name);
    $.__views.right_arrow = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        top: 20,
        left: 10,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "right_arrow"
    });
    $.__views.__alloyId72.add($.__views.right_arrow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;