function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openDetail(e) {
        $.trigger("RssDetail", e);
    }
    function refreshRss() {
        rss.loadRssFeed({
            success: function(data) {
                var rows = [];
                _.each(data, function(item) {
                    Ti.API.info("title:" + item.title + "articleUrl:" + item.link + "date:" + item.pubDate);
                    rows.push(Alloy.createController("RssRow", {
                        articleUrl: item.link,
                        image: item.image,
                        title: item.title,
                        date: item.pubDate
                    }).getView());
                });
                $.table.setData(rows);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "RssMaster";
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
    $.__views.rssMasterWin = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "rssMasterWin",
        title: "RSS Reader"
    });
    $.__views.rssMasterWin && $.addTopLevelView($.__views.rssMasterWin);
    $.__views.refreshButton = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH,
        id: "refreshButton"
    });
    refreshRss ? $.__views.refreshButton.addEventListener("click", refreshRss) : __defers["$.__views.refreshButton!click!refreshRss"] = true;
    $.__views.rssMasterWin.rightNavButton = $.__views.refreshButton;
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        id: "table"
    });
    $.__views.rssMasterWin.add($.__views.table);
    openDetail ? $.__views.table.addEventListener("click", openDetail) : __defers["$.__views.table!click!openDetail"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var rss = require("rss");
    $.rssMasterWin.title = args.title;
    Ti.API.info("Setting url" + args.rssfeedurl);
    rss.setUrl(args.url);
    refreshRss();
    __defers["$.__views.refreshButton!click!refreshRss"] && $.__views.refreshButton.addEventListener("click", refreshRss);
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;