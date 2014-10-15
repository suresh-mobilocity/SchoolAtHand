function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId70(e) {
        if (e && e.fromAdapter) return;
        __alloyId70.opts || {};
        var models = __alloyId69.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId66 = models[i];
            __alloyId66.__transform = dataTransformation(__alloyId66);
            var __alloyId68 = Alloy.createController("SchoolRow", {
                $model: __alloyId66,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId68.getViewEx({
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
        $.ptoWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.ptoWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "PTOMain";
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
    $.__views.ptoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "ptoWindow",
        title: "Select School"
    });
    $.__views.ptoWindow && $.addTopLevelView($.__views.ptoWindow);
    $.__views.schoolsTableView = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.ptoWindow.add($.__views.schoolsTableView);
    var __alloyId69 = Alloy.Collections["school"] || school;
    __alloyId69.on("fetch destroy change add remove reset", __alloyId70);
    exports.destroy = function() {
        __alloyId69.off("fetch destroy change add remove reset", __alloyId70);
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
        $.parentController.open(Alloy.createController("SchoolPTO", args_t).getView());
    });
    $.ptoWindow.addEventListener("close", destroy);
    schoolCollection.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;