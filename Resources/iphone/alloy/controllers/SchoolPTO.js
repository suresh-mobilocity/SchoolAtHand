function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getPTOWebsiteUrl() {
        var url = "";
        var queryStr = "SELECT website FROM PTO where school like '" + args.shortname + "'";
        var sqlRS = schoolDB.execute(queryStr);
        sqlRS.getRowCount() > 0 && sqlRS.isValidRow() && (url = sqlRS.fieldByName("website"));
        sqlRS.close();
        return url;
    }
    function destroy() {
        $.viewPTOSite.removeEventListener("close", destroy);
        $.destroy();
        $.viewPTOSite.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SchoolPTO";
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
    $.__views.viewPTOSite = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "viewPTOSite",
        title: "School Web Site",
        modal: "flase"
    });
    $.__views.viewPTOSite && $.addTopLevelView($.__views.viewPTOSite);
    $.__views.webSiteView = Ti.UI.createWebView({
        height: "90%",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        top: 0,
        id: "webSiteView"
    });
    $.__views.viewPTOSite.add($.__views.webSiteView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.shortname;
    $.parentController = args.parentTab;
    $.viewPTOSite.title = "PTO @" + args.schoolname;
    $.webSiteView.url = getPTOWebsiteUrl();
    $.viewPTOSite.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;