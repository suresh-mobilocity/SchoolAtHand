function Controller() {
    function __alloyId40(e) {
        if (e && e.fromAdapter) return;
        __alloyId40.opts || {};
        var models = __alloyId39.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId36 = models[i];
            __alloyId36.__transform = {};
            var __alloyId38 = Alloy.createController("ProfileRow", {
                $model: __alloyId36,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId38.getViewEx({
                recurse: true
            }));
        }
        $.__views.profilesTableView.setData(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MyProfiles";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("profile");
    $.__views.profilesWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "profilesWindow",
        title: "MyProfiles",
        layout: "vertical"
    });
    $.__views.profilesView = Ti.UI.createView({
        layout: "vertical",
        height: "85%",
        id: "profilesView"
    });
    $.__views.profilesWindow.add($.__views.profilesView);
    $.__views.profilesTableView = Ti.UI.createTableView({
        separatorColor: "#336699",
        height: "85%",
        backgroundColor: "#33B5E5",
        id: "profilesTableView"
    });
    $.__views.profilesView.add($.__views.profilesTableView);
    var __alloyId39 = Alloy.Collections["profile"] || profile;
    __alloyId39.on("fetch destroy change add remove reset", __alloyId40);
    $.__views.addButton = Ti.UI.createButton({
        backgroundColor: "#336699",
        left: "10%",
        width: "85%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "white",
        bottom: 20,
        borderRadius: 10,
        id: "addButton",
        title: "Add Profile"
    });
    $.__views.profilesView.add($.__views.addButton);
    $.__views.adView = Admob.createView({
        testing: false,
        keywords: "K-12, education, graduation, kids student school books science  math toys sports parent teacher cars bikes",
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF",
        publisherId: "ca-app-pub-3665132116722377/6561150840",
        ns: "Admob",
        id: "adView"
    });
    $.__views.profilesWindow.add($.__views.adView);
    $.__views.profilesTab = Ti.UI.createTab({
        window: $.__views.profilesWindow,
        id: "profilesTab",
        title: "Profiles"
    });
    $.__views.profilesTab && $.addTopLevelView($.__views.profilesTab);
    exports.destroy = function() {
        __alloyId39.off("fetch destroy change add remove reset", __alloyId40);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    profileCollection.fetch({
        query: "SELECT * FROM profiles ;"
    });
    $.profilesTableView.addEventListener("click", function(_e) {
        var detailController = Alloy.createController("ProfileDetail", {
            parentTab: $.profilesTab,
            data: profileCollection.get(_e.rowData.model)
        });
        $.profilesTab.open(detailController.getView());
    });
    $.addButton.addEventListener("click", function() {
        var addProfileController = Alloy.createController("AddProfile");
        $.profilesTab.open(addProfileController.getView());
    });
    $.profilesTab.addEventListener("click", function() {
        $.profilesTab.getWindow().animate({
            left: 0,
            duration: 200
        });
        if (true == isMenuWindowOpen) {
            tabGroupGlobalReference.remove(menuWindow);
            isMenuWindowOpen = false;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;