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
    this.__controllerPath = "RssDetail";
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
    $.__views.RssDetail = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "RssDetail"
    });
    $.__views.RssDetail && $.addTopLevelView($.__views.RssDetail);
    $.__views.web = Ti.UI.createWebView({
        id: "web"
    });
    $.__views.RssDetail.add($.__views.web);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setArticle = function(articleUrl) {
        $.web.url = articleUrl;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;