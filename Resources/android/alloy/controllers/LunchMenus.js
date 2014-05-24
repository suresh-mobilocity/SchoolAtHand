function Controller() {
    function __alloyId33(e) {
        if (e && e.fromAdapter) return;
        __alloyId33.opts || {};
        var models = __alloyId32.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId29 = models[i];
            __alloyId29.__transform = dataTransformation(__alloyId29);
            var __alloyId31 = Alloy.createController("SchoolRow", {
                $model: __alloyId29,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId31.getViewEx({
                recurse: true
            }));
        }
        $.__views.schoolsTableView.setData(rows);
    }
    function dataTransformation(_model) {
        return {
            imagefile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.imagefile,
            logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile
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
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.lunchMenuWindow.add($.__views.schoolsTableView);
    var __alloyId32 = Alloy.Collections["school"] || school;
    __alloyId32.on("fetch destroy change add remove reset", __alloyId33);
    exports.destroy = function() {
        __alloyId32.off("fetch destroy change add remove reset", __alloyId33);
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