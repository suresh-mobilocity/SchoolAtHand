function Controller() {
    function __alloyId79(e) {
        if (e && e.fromAdapter) return;
        __alloyId79.opts || {};
        var models = dofilter(__alloyId78);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId75 = models[i];
            __alloyId75.__transform = dataTransformation(__alloyId75);
            var __alloyId77 = Alloy.createController("SchoolRow", {
                $model: __alloyId75,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId77.getViewEx({
                recurse: true
            }));
        }
        $.__views.schoolsTableView.setData(rows);
    }
    function dofilter() {
        return schoolCollection.filter(function(_i) {
            return _i.attributes.type == args.schoolType;
        });
    }
    function dataTransformation(_model) {
        return {
            imagefile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.imagefile,
            logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile
        };
    }
    function destroy() {
        $.schoolsListWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.schoolsListWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Schools";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("school");
    $.__views.schoolsListWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "schoolsListWindow",
        title: "Schools"
    });
    $.__views.schoolsListWindow && $.addTopLevelView($.__views.schoolsListWindow);
    $.__views.schoolsTableView = Ti.UI.createTableView({
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView",
        top: "0",
        left: "0",
        layout: "vertical"
    });
    $.__views.schoolsListWindow.add($.__views.schoolsTableView);
    var __alloyId78 = Alloy.Collections["school"] || school;
    __alloyId78.on("fetch destroy change add remove reset", __alloyId79);
    exports.destroy = function() {
        __alloyId78.off("fetch destroy change add remove reset", __alloyId79);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var schoolCollection = Alloy.Collections.school;
    $.parentController = args.parentTab;
    $.schoolsListWindow.addEventListener("close", destroy);
    $.schoolsTableView.addEventListener("click", function(e) {
        var args_t = {
            parentTab: $.parentController,
            data: schoolCollection.get(e.rowData.model),
            $model: e.rowData.model
        };
        $.parentController.open(Alloy.createController("SchoolDetail", args_t).getView());
    });
    switch (args.schoolType) {
      case "E":
        $.schoolsListWindow.title = "Elementary Schools";
        break;

      case "M":
        $.schoolsListWindow.title = "Middle Schools";
        break;

      case "H":
        $.schoolsListWindow.title = "High Schools";
        break;

      default:    }
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;