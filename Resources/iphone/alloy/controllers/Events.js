function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId27(e) {
        if (e && e.fromAdapter) return;
        __alloyId27.opts || {};
        var models = __alloyId26.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = dataTransformation(__alloyId23);
            var __alloyId25 = Alloy.createController("SchoolRow", {
                $model: __alloyId23,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId25.getViewEx({
                recurse: true
            }));
        }
        $.__views.schoolsTableView.setData(rows);
    }
    function dataTransformation(_model) {
        return {
            imagefile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.imagefile,
            logofile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.logofile
        };
    }
    function destroy() {
        $.eventsWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.eventsWindow.removeAllChildren();
        $ = null;
    }
    function getEventsFeedType(name) {
        var eventsfeedtype = null;
        var sqlQueryStr = "SELECT eventsfeedtype from schools where shortname like '%" + name + "%'";
        var queryResults = schoolDB.execute(sqlQueryStr);
        queryResults.getRowCount() > 0 && queryResults.isValidRow() && (eventsfeedtype = queryResults.fieldByName("eventsfeedtype"));
        queryResults.close();
        return eventsfeedtype;
    }
    function getEventsFeedUrl(name) {
        var eventsfeedurl = null;
        var sqlQueryStr = "SELECT eventsfeedurl from schools where shortname like '%" + name + "%'";
        var queryResults = schoolDB.execute(sqlQueryStr);
        queryResults.getRowCount() > 0 && queryResults.isValidRow() && (eventsfeedurl = queryResults.fieldByName("eventsfeedurl"));
        queryResults.close();
        return eventsfeedurl;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Events";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("school");
    $.__views.eventsWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "eventsWindow",
        title: "Select School"
    });
    $.__views.eventsWindow && $.addTopLevelView($.__views.eventsWindow);
    $.__views.schoolsTableView = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.eventsWindow.add($.__views.schoolsTableView);
    var __alloyId26 = Alloy.Collections["school"] || school;
    __alloyId26.on("fetch destroy change add remove reset", __alloyId27);
    exports.destroy = function() {
        __alloyId26.off("fetch destroy change add remove reset", __alloyId27);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var schoolCollection = Alloy.Collections.school;
    var parentController = args.parentTab;
    $.schoolsTableView.addEventListener("click", function(e) {
        var data = JSON.stringify(schoolCollection.get(e.rowData.model));
        var shortname = JSON.parse(data).shortname;
        var eventsfeedtype = getEventsFeedType(shortname);
        var eventsfeedurl = getEventsFeedUrl(shortname);
        var schoolname = JSON.parse(data).name;
        var args_t = {
            parentTab: parentController,
            shortname: shortname,
            eventsfeedtype: eventsfeedtype,
            rssfeedurl: eventsfeedurl,
            schoolname: schoolname,
            title: schoolname
        };
        "RSS" === getEventsFeedType(shortname) ? Alloy.createController("RssMain", args_t).getView() : parentController.open(Alloy.createController("SchoolEvents", args_t).getView());
    });
    $.eventsWindow.addEventListener("close", destroy);
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;