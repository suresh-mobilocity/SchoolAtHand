function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId41(e) {
        if (e && e.fromAdapter) return;
        __alloyId41.opts || {};
        var models = __alloyId40.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId37 = models[i];
            __alloyId37.__transform = {};
            var __alloyId39 = Alloy.createController("ProfileRow", {
                $model: __alloyId37,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId39.getViewEx({
                recurse: true
            }));
        }
        $.__views.profilesTableView.setData(rows);
    }
    function destroy() {
        $.profilesWindow.removeEventListener("close", destroy);
        $.destroy();
        $.profilesWindow.removeAllChildren();
        $ = null;
        Ti.API.info("ProfilesTab: Cleanup Successfully");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MyProfiles";
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
    Alloy.Collections.instance("profile");
    $.__views.profilesWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "profilesWindow",
        title: "MyProfiles",
        layout: "vertical"
    });
    $.__views.profilesView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            layout: "vertical",
            top: 0,
            height: "78%"
        });
        IS_iPhoneTall && _.extend(o, {
            layout: "vertical",
            top: 0,
            height: "90%"
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            layout: "vertical",
            top: 0,
            height: "85%"
        });
        _.extend(o, {
            id: "profilesView"
        });
        return o;
    }());
    $.__views.profilesWindow.add($.__views.profilesView);
    $.__views.profilesTableView = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        id: "profilesTableView"
    });
    $.__views.profilesView.add($.__views.profilesTableView);
    var __alloyId40 = Alloy.Collections["profile"] || profile;
    __alloyId40.on("fetch destroy change add remove reset", __alloyId41);
    $.__views.profilesTab = Ti.UI.createTab({
        window: $.__views.profilesWindow,
        id: "profilesTab",
        title: "Profiles",
        icon: "users.png"
    });
    $.__views.profilesTab && $.addTopLevelView($.__views.profilesTab);
    exports.destroy = function() {
        __alloyId40.off("fetch destroy change add remove reset", __alloyId41);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    var addButton = null;
    addButton = Ti.UI.createButton({
        title: "Add Profile",
        backgroundColor: "#336699",
        left: "10%",
        width: "85%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "white",
        borderRadius: 8
    });
    $.profilesWindow.add(addButton);
    if (Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        var adMobView = _admobview.getaddview();
        $.profilesWindow.add(adMobView);
    }
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
    addButton.addEventListener("click", function() {
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
    $.profilesTab.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;