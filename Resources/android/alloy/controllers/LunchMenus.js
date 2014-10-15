function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId34(e) {
        if (e && e.fromAdapter) return;
        __alloyId34.opts || {};
        var models = __alloyId33.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId30 = models[i];
            __alloyId30.__transform = dataTransformation(__alloyId30);
            var __alloyId32 = Alloy.createController("SchoolRow", {
                $model: __alloyId30,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId32.getViewEx({
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
        $.lunchMenuWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.lunchMenuWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "LunchMenus";
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
    $.__views.lunchMenuWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "lunchMenuWindow",
        title: "Select School"
    });
    $.__views.lunchMenuWindow && $.addTopLevelView($.__views.lunchMenuWindow);
    $.__views.schoolsTableView = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.lunchMenuWindow.add($.__views.schoolsTableView);
    var __alloyId33 = Alloy.Collections["school"] || school;
    __alloyId33.on("fetch destroy change add remove reset", __alloyId34);
    exports.destroy = function() {
        __alloyId33.off("fetch destroy change add remove reset", __alloyId34);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var schoolCollection = Alloy.Globals.school;
    $.parentController = args.parentTab;
    $.schoolsTableView.addEventListener("click", function(e) {
        var data = JSON.stringify(schoolCollection.get(e.rowData.model));
        var args_t = {
            parentTab: $.parentController,
            shortname: JSON.parse(data).shortname
        };
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            var f = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "test.pdf");
            f.write(this.responseData);
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                type: "application/pdf",
                data: f.getNativePath()
            });
            Ti.Android.currentActivity.startActivity(intent);
        };
        xhr.open("GET", "http://www.sbschools.org/our_schools/programs/dining_services/menus/" + args_t.shortname + ".pdf");
        xhr.send();
    });
    $.lunchMenuWindow.addEventListener("close", destroy);
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;