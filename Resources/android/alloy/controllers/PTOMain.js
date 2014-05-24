function Controller() {
    function __alloyId55(e) {
        if (e && e.fromAdapter) return;
        __alloyId55.opts || {};
        var models = __alloyId54.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId51 = models[i];
            __alloyId51.__transform = dataTransformation(__alloyId51);
            var __alloyId53 = Alloy.createController("SchoolRow", {
                $model: __alloyId51,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId53.getViewEx({
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
        $.ptoWindow.removeEventListener("close", destroy);
        schollCollection = null;
        $.destroy();
        $.ptoWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "PTOMain";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "transparent",
        id: "schoolsTableView"
    });
    $.__views.ptoWindow.add($.__views.schoolsTableView);
    var __alloyId54 = Alloy.Collections["school"] || school;
    __alloyId54.on("fetch destroy change add remove reset", __alloyId55);
    exports.destroy = function() {
        __alloyId54.off("fetch destroy change add remove reset", __alloyId55);
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