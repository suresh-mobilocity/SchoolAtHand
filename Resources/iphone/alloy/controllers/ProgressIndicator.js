function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showIndicator(e) {
        $.activityIndicator.show();
        setTimeout(function() {
            if (null != $.activityIndicator) {
                $.activityIndicator.hide();
                e.source.close();
                $.destroy();
                $.progressWindow.removeAllChildren();
                $.progressWindow.removeEventListener("close", hideActivityIndicator);
                $ = null;
            }
        }, 5e3);
    }
    function hideActivityIndicator() {
        $.activityIndicator.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ProgressIndicator";
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
    var __defers = {};
    $.__views.progressWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "progressWindow",
        fullScreen: "true"
    });
    $.__views.progressWindow && $.addTopLevelView($.__views.progressWindow);
    showIndicator ? $.__views.progressWindow.addEventListener("open", showIndicator) : __defers["$.__views.progressWindow!open!showIndicator"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading Data..."
    });
    $.__views.progressWindow.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var style;
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    $.activityIndicator.style = style;
    $.activityIndicator.message = args.message;
    $.progressWindow.addEventListener("close", hideActivityIndicator);
    __defers["$.__views.progressWindow!open!showIndicator"] && $.__views.progressWindow.addEventListener("open", showIndicator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;