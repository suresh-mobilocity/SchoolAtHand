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
    this.__controllerPath = "DistrictNews";
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
    $.__views.districtNews = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "districtNews",
        title: "District News",
        modal: "false"
    });
    $.__views.districtNews && $.addTopLevelView($.__views.districtNews);
    $.__views.newsDetailsWebview = Ti.UI.createWebView({
        id: "newsDetailsWebview"
    });
    $.__views.districtNews.add($.__views.newsDetailsWebview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.districtNews.title = "Disctrict News";
    var yqlQuery = 'select div from html where url ="' + args.url + '" and xpath=\'//div[contains(@id,"content")]\'';
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function() {
        200 === this.status ? $.newsDetailsWebview.setHtml("<html><body><b>" + args.title + "</b>" + this.responseText + "</body></html>") : alert("Unexpected HTTP response: " + this.status);
    };
    xhr.open("GET", "http://query.yahooapis.com/v1/public/yql");
    xhr.send({
        format: "xml",
        q: yqlQuery
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;