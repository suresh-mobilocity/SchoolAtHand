function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ChangeSettings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.changeOptionsWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "changeOptionsWin",
        title: "Change Settings"
    });
    $.__views.changeOptionsWin && $.addTopLevelView($.__views.changeOptionsWin);
    $.__views.changeOptions = Ti.UI.createView({
        top: "5%",
        layout: "vertical",
        id: "changeOptions"
    });
    $.__views.changeOptionsWin.add($.__views.changeOptions);
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.changeOptions.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        top: 20,
        left: 20,
        width: "70%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "blue",
        text: "Disable Ads",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.disableAds = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        color: "blue",
        style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "disableAds"
    });
    $.__views.__alloyId2.add($.__views.disableAds);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.changeOptions.add($.__views.__alloyId4);
    $.__views.pushNotificationSelection = Ti.UI.createLabel({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Change Push Notification Selection",
        id: "pushNotificationSelection"
    });
    $.__views.__alloyId4.add($.__views.pushNotificationSelection);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId5"
    });
    $.__views.changeOptions.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        top: 20,
        left: 20,
        width: "70%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "blue",
        text: "Recieve School District Alerts",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.recivePushFromSchools = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "blue",
        value: true,
        style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "recivePushFromSchools"
    });
    $.__views.__alloyId5.add($.__views.recivePushFromSchools);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.changeOptions.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        top: 20,
        left: 20,
        width: "70%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "blue",
        text: "Recieve PTA Announcements",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.recivePushFromPTA = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        value: true,
        color: "blue",
        style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "recivePushFromPTA"
    });
    $.__views.__alloyId7.add($.__views.recivePushFromPTA);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId9"
    });
    $.__views.changeOptions.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        top: 20,
        left: 20,
        width: "70%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "blue",
        text: "Recieve Sports Events",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.recivePushFromSports = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        value: true,
        color: "blue",
        style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        id: "recivePushFromSports"
    });
    $.__views.__alloyId9.add($.__views.recivePushFromSports);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.changeOptions.add($.__views.__alloyId11);
    $.__views.buttonSaveChanges = Ti.UI.createButton({
        title: "Save Changes",
        backgroundColor: "#336699",
        top: 20,
        left: "10%",
        width: "80%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderRadius: 10,
        id: "buttonSaveChanges"
    });
    $.__views.__alloyId11.add($.__views.buttonSaveChanges);
    $.__views.buttonChangeSchoolDistrict = Ti.UI.createButton({
        title: "Change School District",
        backgroundColor: "#336699",
        top: 20,
        left: "10%",
        width: "80%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderRadius: 10,
        id: "buttonChangeSchoolDistrict"
    });
    $.__views.__alloyId11.add($.__views.buttonChangeSchoolDistrict);
    $.__views.buttonChangePassword = Ti.UI.createButton({
        title: "Change Password",
        backgroundColor: "#336699",
        top: 20,
        left: "10%",
        width: "80%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderRadius: 10,
        id: "buttonChangePassword"
    });
    $.__views.__alloyId11.add($.__views.buttonChangePassword);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.API.info("Inside Change Settings Controller");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;