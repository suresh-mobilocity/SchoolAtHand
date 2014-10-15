function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function destroy() {
        $.changeOptionsWin.removeEventListener("close", destroy);
        $.destroy();
        $.changeOptionsWin.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ChangeSettings";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.changeOptionsWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "changeOptionsWin",
        title: "Change Settings"
    });
    $.__views.changeOptionsWin && $.addTopLevelView($.__views.changeOptionsWin);
    $.__views.changeOptions = Ti.UI.createScrollView({
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
        width: "70%",
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        text: "Display Ads",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.displayAds = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        color: "blue",
        value: false,
        id: "displayAds"
    });
    $.__views.__alloyId2.add($.__views.displayAds);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.changeOptions.add($.__views.__alloyId4);
    $.__views.pushNotificationSelection = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: 20,
        left: 20,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
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
        width: "70%",
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
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
        value: false,
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
        width: "70%",
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
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
        value: false,
        color: "blue",
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
        width: "70%",
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
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
        value: false,
        color: "blue",
        id: "recivePushFromSports"
    });
    $.__views.__alloyId9.add($.__views.recivePushFromSports);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.changeOptions.add($.__views.__alloyId11);
    $.__views.buttonSaveChanges = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
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
            borderRadius: 10
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            height: "50dp"
        });
        _.extend(o, {
            id: "buttonSaveChanges"
        });
        return o;
    }());
    $.__views.__alloyId11.add($.__views.buttonSaveChanges);
    $.__views.buttonResetPassword = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Forgot / Reset Password",
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
            borderRadius: 10
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            height: "50dp"
        });
        _.extend(o, {
            id: "buttonResetPassword"
        });
        return o;
    }());
    $.__views.__alloyId11.add($.__views.buttonResetPassword);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.API.info("Inside Change Settings Controller");
    Ti.App.Properties.hasProperty("Subscribe_SBSD_Alerts") && ($.recivePushFromSchools.value = Ti.App.Properties.getBool("Subscribe_SBSD_Alerts"));
    Ti.App.Properties.hasProperty("Subscribe_Sports_Alerts") && ($.recivePushFromSports.value = Ti.App.Properties.getBool("Subscribe_Sports_Alerts"));
    Ti.App.Properties.hasProperty("Subscribe_PTA_Alerts") && ($.recivePushFromPTA.value = Ti.App.Properties.getBool("Subscribe_PTA_Alerts"));
    Ti.App.Properties.hasProperty("DisplayAds") && ($.displayAds.value = Ti.App.Properties.getBool("DisplayAds"));
    $.buttonSaveChanges.addEventListener("click", function() {
        if (!Ti.App.Properties.getBool("LoggedIn")) {
            alert("Login required, please login from menu / Signin option");
            return;
        }
        if (Ti.App.Properties.getBool("DisplayAds") != $.displayAds.value) {
            Ti.App.Properties.setBool("DisplayAds", $.displayAds.value);
            Ti.API.info("DisplayAds is changed:", $.displayAds.value);
        }
        Ti.App.Properties.getBool("Subscribe_SBSD_Alerts") != $.recivePushFromSchools.value && (true == $.recivePushFromSchools.value ? Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "SBSD_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully subscribed to receive School District Notifications");
                Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }) : Cloud.PushNotifications.unsubscribeToken({
            device_token: deviceToken,
            channel: "SBSD_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully unsubscribed from School District Notifications");
                Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", false);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }));
        $.recivePushFromPTA.value != Ti.App.Properties.getBool("Subscribe_PTA_Alerts") && ($.recivePushFromPTA.value ? Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "PTA_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully subscribed to receive PTA Announcements");
                Ti.App.Properties.setBool("Subscribe_PTA_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }) : Cloud.PushNotifications.unsubscribeToken({
            device_token: deviceToken,
            channel: "PTA_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully unsubscribed from PTA Announcements");
                Ti.App.Properties.setBool("Subscribe_PTA_Alerts", false);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }));
        $.recivePushFromSports.value != Ti.App.Properties.getBool("Subscribe_Sports_Alerts") && ($.recivePushFromSports.value ? Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "Sports_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully subscribed to receive Sports Notifications");
                Ti.App.Properties.setBool("Subscribe_Sports_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }) : Cloud.PushNotifications.unsubscribeToken({
            device_token: deviceToken,
            channel: "Sports_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                alert("Successfully unsubscribed from Sports Notifications");
                Ti.App.Properties.setBool("Subscribe_Sports_Alerts", false);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }));
        $.changeOptionsWin.close();
    });
    $.buttonResetPassword.addEventListener("click", function() {
        Cloud.Users.requestResetPassword({
            email: Ti.App.Properties.getString("username"),
            subject: "Password reset request for School@Hand"
        }, function(e) {
            alert(e.success ? "Success: Reset link sent to your e-mail " + Ti.App.Properties.getString("username") : "Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    $.changeOptionsWin.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;