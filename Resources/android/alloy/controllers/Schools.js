function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId85(e) {
        if (e && e.fromAdapter) return;
        __alloyId85.opts || {};
        var models = dofilter(__alloyId84);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId81 = models[i];
            __alloyId81.__transform = dataTransformation(__alloyId81);
            var __alloyId83 = Alloy.createController("SchoolRow", {
                $model: __alloyId81,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId83.getViewEx({
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
            imagefile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.imagefile,
            logofile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.logofile
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
    $.__views.schoolsListWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "schoolsListWindow",
        title: "Schools"
    });
    $.__views.schoolsListWindow && $.addTopLevelView($.__views.schoolsListWindow);
    $.__views.schoolsTableView = Ti.UI.createTableView({
        left: "0",
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView",
        top: "0",
        layout: "vertical"
    });
    $.__views.schoolsListWindow.add($.__views.schoolsTableView);
    var __alloyId84 = Alloy.Collections["school"] || school;
    __alloyId84.on("fetch destroy change add remove reset", __alloyId85);
    exports.destroy = function() {
        __alloyId84.off("fetch destroy change add remove reset", __alloyId85);
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
        Ti.API.info("Inside Schools.js");
        $.schoolsListWindow.title = "Middle Schools";
        break;

      case "H":
        $.schoolsListWindow.title = "High Schools";
    }
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;