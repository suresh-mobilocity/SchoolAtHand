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
    this.__controllerPath = "NotificationRow";
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
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 0,
        color: "black",
        borderWidth: 8,
        backgroundColor: "white",
        id: "row",
        dataId: "",
        model: "undefined" != typeof $model.__transform["notificationid"] ? $model.__transform["notificationid"] : $model.get("notificationid")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId56 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId56"
    });
    $.__views.row.add($.__views.__alloyId56);
    $.__views.minus_sign = Ti.UI.createLabel({
        width: "10%",
        height: Ti.UI.SIZE,
        color: "red",
        top: 10,
        left: "80%",
        text: Alloy.Globals.icons.minus_sign,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        textAlign: "right",
        id: "minus_sign",
        data: "undefined" != typeof $model.__transform["notificationid"] ? $model.__transform["notificationid"] : $model.get("notificationid")
    });
    $.__views.__alloyId56.add($.__views.minus_sign);
    $.__views.dateLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        left: "2%",
        font: {
            fontSize: 16,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        id: "dateLabel",
        text: "undefined" != typeof $model.__transform["datetime"] ? $model.__transform["datetime"] : $model.get("datetime")
    });
    $.__views.__alloyId56.add($.__views.dateLabel);
    $.__views.msgLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        left: "2%",
        font: {
            fontSize: 16,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        id: "msgLabel",
        text: "undefined" != typeof $model.__transform["message"] ? $model.__transform["message"] : $model.get("message")
    });
    $.__views.__alloyId56.add($.__views.msgLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.minus_sign.addEventListener("click", function(e) {
        var notificationMsg = notificationCollection.get(e.source.data);
        notificationMsg.destroy();
        notificationCollection.fetch();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;