function Controller() {
    function __alloyId48(e) {
        if (e && e.fromAdapter) return;
        __alloyId48.opts || {};
        var models = __alloyId47.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId44 = models[i];
            __alloyId44.__transform = {};
            var __alloyId46 = Alloy.createController("NotificationRow", {
                $model: __alloyId44,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId46.getViewEx({
                recurse: true
            }));
        }
        $.__views.notificationTable.setData(rows);
    }
    function destroy() {
        $.notificationsWindow.removeEventListener("close", destroy);
        $.destroy();
        $.notificationsWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Notifications";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("notification");
    $.__views.notificationsWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "notificationsWindow",
        title: "Notification Center",
        layout: "vertical"
    });
    $.__views.notificationsWindow && $.addTopLevelView($.__views.notificationsWindow);
    $.__views.notificationTable = Ti.UI.createTableView({
        separatorColor: "#000000",
        height: "85%",
        backgroundColor: "#33B5E5",
        id: "notificationTable"
    });
    $.__views.notificationsWindow.add($.__views.notificationTable);
    var __alloyId47 = Alloy.Collections["notification"] || notification;
    __alloyId47.on("fetch destroy change add remove reset", __alloyId48);
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
    $.__views.notificationsWindow.add($.__views.adView);
    exports.destroy = function() {
        __alloyId47.off("fetch destroy change add remove reset", __alloyId48);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    var notificationList = notificationCollection;
    notificationList.fetch({
        query: "SELECT * FROM notifications ORDER BY notificationid desc;"
    });
    $.notificationsWindow.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;