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
    this.__controllerPath = "SchoolRow";
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
        height: 50,
        className: "loc_row",
        dataId: "",
        id: "row",
        model: "undefined" != typeof $model.__transform["id"] ? $model.__transform["id"] : $model.get("id"),
        hasChild: "true"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId78 = Ti.UI.createView({
        height: "50",
        id: "__alloyId78"
    });
    $.__views.row.add($.__views.__alloyId78);
    $.__views.schoolBanner = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "schoolBanner",
        image: "undefined" != typeof $model.__transform["logofile"] ? $model.__transform["logofile"] : $model.get("logofile")
    });
    $.__views.__alloyId78.add($.__views.schoolBanner);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;