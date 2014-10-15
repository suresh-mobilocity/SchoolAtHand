function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId72() {
        $.__views.rssMasterWin.removeEventListener("open", __alloyId72);
        if ($.__views.rssMasterWin.activity) $.__views.rssMasterWin.activity.onCreateOptionsMenu = function(e) {
            var __alloyId71 = {
                title: "Refresh",
                icon: "/refresh_icon.png",
                id: "__alloyId70"
            };
            $.__views.__alloyId70 = e.menu.add(_.pick(__alloyId71, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId70.applyProperties(_.omit(__alloyId71, Alloy.Android.menuItemCreateArgs));
            refreshRss ? $.__views.__alloyId70.addEventListener("click", refreshRss) : __defers["$.__views.__alloyId70!click!refreshRss"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
    $.__views.rssMasterWin.addEventListener("open", __alloyId72);
    $.__views.header = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "50dp",
        color: "#fff",
        textAlign: "center",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            },
            colors: [ {
                color: "#c1cedf",
                offset: "0.0"
            }, {
                color: "#597498",
                offset: "1.0"
            } ]
        },
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        text: "RSS Reader",
        id: "header"
    });
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        headerView: $.__views.header,
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
    __defers["$.__views.__alloyId70!click!refreshRss"] && $.__views.__alloyId70.addEventListener("click", refreshRss);
    __defers["$.__views.table!click!openDetail"] && $.__views.table.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;