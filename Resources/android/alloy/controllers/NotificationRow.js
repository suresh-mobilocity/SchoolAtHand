function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "NotificationRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 100,
        left: 0,
        color: "black",
        borderWidth: 8,
        backgroundColor: "white",
        id: "row",
        dataId: "",
        model: "undefined" != typeof $model.__transform["notificationid"] ? $model.__transform["notificationid"] : $model.get("notificationid")
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId41 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId41"
    });
    $.__views.row.add($.__views.__alloyId41);
    $.__views.minus_sign = Ti.UI.createLabel({
        top: 10,
        left: "80%",
        text: Alloy.Globals.icons.minus_sign,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "red",
        width: "10%",
        textAlign: "right",
        id: "minus_sign",
        data: "undefined" != typeof $model.__transform["notificationid"] ? $model.__transform["notificationid"] : $model.get("notificationid")
    });
    $.__views.__alloyId41.add($.__views.minus_sign);
    $.__views.dateLabel = Ti.UI.createLabel({
        left: "2%",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        font: {
            fontSize: 16,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        id: "dateLabel",
        text: "undefined" != typeof $model.__transform["datetime"] ? $model.__transform["datetime"] : $model.get("datetime")
    });
    $.__views.__alloyId41.add($.__views.dateLabel);
    $.__views.msgLabel = Ti.UI.createLabel({
        left: "2%",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 16,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        id: "msgLabel",
        text: "undefined" != typeof $model.__transform["message"] ? $model.__transform["message"] : $model.get("message")
    });
    $.__views.__alloyId41.add($.__views.msgLabel);
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