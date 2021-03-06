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
    this.__controllerPath = "SchoolWebSite";
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
    $.__views.schoolWebSite = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "schoolWebSite",
        title: "School Web Site",
        modal: "flase"
    });
    $.__views.schoolWebSite && $.addTopLevelView($.__views.schoolWebSite);
    $.__views.schoolWebView = Ti.UI.createWebView({
        id: "schoolWebView",
        url: "http://www.sbschools.org"
    });
    $.__views.schoolWebSite.add($.__views.schoolWebView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.schoolWebSite.title = args.data.schoolname;
    $.schoolWebView.url = args.data.url;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;