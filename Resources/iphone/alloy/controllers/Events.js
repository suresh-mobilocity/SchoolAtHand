function Controller() {
    function __alloyId26(e) {
        if (e && e.fromAdapter) return;
        __alloyId26.opts || {};
        var models = __alloyId25.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId22 = models[i];
            __alloyId22.__transform = dataTransformation(__alloyId22);
            var __alloyId24 = Alloy.createController("SchoolRow", {
                $model: __alloyId22,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId24.getViewEx({
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
        $.eventsWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.eventsWindow.removeAllChildren();
        $ = null;
        Ti.API.info("Events| Controller Successfully Cleanedup ");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Events";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.eventsWindow.add($.__views.schoolsTableView);
    var __alloyId25 = Alloy.Collections["school"] || school;
    __alloyId25.on("fetch destroy change add remove reset", __alloyId26);
    exports.destroy = function() {
        __alloyId25.off("fetch destroy change add remove reset", __alloyId26);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var schoolCollection = Alloy.Collections.school;
    $.parentController = args.parentTab;
    $.schoolsTableView.addEventListener("click", function(e) {
        var data = JSON.stringify(schoolCollection.get(e.rowData.model));
        var args_t = {
            parentTab: $.parentController,
            shortname: JSON.parse(data).shortname,
            schoolname: JSON.parse(data).name
        };
        $.parentController.open(Alloy.createController("SchoolEvents", args_t).getView());
    });
    $.eventsWindow.addEventListener("close", destroy);
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;