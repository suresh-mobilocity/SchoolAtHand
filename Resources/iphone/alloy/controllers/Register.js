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
        $.registerForm.removeEventListener("close", destroy);
        $.registerForm.removeAllChildren();
        registeringProgress = null;
    }
    function actionRegister() {
        if (false == validateInputFields()) return;
        registeringProgress.open();
        Cloud.Users.create({
            username: $.emailAddress.value,
            password: $.inputPassword.value,
            password_confirmation: $.confirmPassword.value,
            first_name: $.firstName.value,
            last_name: $.lastName.value,
            email: $.emailAddress.value
        }, function(e) {
            e.success ? register_to_push_notifications($.emailAddress.value, $.inputPassword.value) : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function register_to_push_notifications(username, passwd) {
        Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                Ti.App.Properties.setString("ACSDeviceToken", "e.deviceToken");
                deviceToken = e.deviceToken;
                loginToACS(username, passwd);
            },
            error: function(e) {
                alert("Failed to register for push notifications! " + e.error);
            },
            callback: function(e) {
                alert("Received push in Register.js: " + JSON.stringify(e));
                var notificationModel = Alloy.createModel("notification", {
                    datetime: new Date().toLocaleString(),
                    title: e.data.title,
                    message: e.data.alert,
                    badge: e.data.badge
                });
                notificationModel.save();
                notificationCollection.fetch();
                notificationCollection.trigger("change");
                notificationCollection.trigger("sync");
            }
        });
    }
    function loginToACS(username, passwd) {
        Cloud.Users.login({
            login: username,
            password: passwd
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
                subscribeToChannels();
                registeringProgress.close();
                Ti.App.Properties.setBool("LoggedIn", true);
                Ti.App.Properties.setString("username", user.username);
                loginLabel = "SignOut";
                $.registerForm.close();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function registerCallbacks() {}
    function subscribeToChannels() {
        $.recivePushFromSBSD.value && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "SBSD_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive School District Notifications");
                Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        $.recivePushFromPTA.value && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "PTA_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive PTA Announcements");
                Ti.App.Properties.setBool("Subscribe_PTA_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        $.recivePushFromSports.value && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "Sports_Alerts",
            type: "ios"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive Push Notifications");
                Ti.App.Properties.setBool("Subscribe_Sports_Alerts", true);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function validateEmailformat(emailAddress) {
        var str = emailAddress;
        var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        testresults = filter.test(str) ? true : false;
        return testresults;
    }
    function validateInputFields() {
        if ("" == $.firstName.value) {
            alert("Error:\nFirstname field empty");
            return false;
        }
        if ("" == $.lastName.value) {
            alert("Error:\nLastname field empty");
            return false;
        }
        if ("" == $.emailAddress.value || false == validateEmailformat($.emailAddress.value)) {
            alert("Error:\nInvalid email is field empty");
            return false;
        }
        if ("" == $.inputPassword.value) {
            alert("Error:\nPassword field empty");
            return false;
        }
        if ("" == $.confirmPassword.value) {
            alert("Error:\nConfirm Password field empty");
            return false;
        }
        return true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Register";
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
    var __defers = {};
    $.__views.registerForm = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "registerForm",
        fullscreen: "false"
    });
    $.__views.registerForm && $.addTopLevelView($.__views.registerForm);
    $.__views.registerView = Ti.UI.createScrollView({
        id: "registerView",
        layout: "vertical"
    });
    $.__views.registerForm.add($.__views.registerView);
    $.__views.firstName = Ti.UI.createTextField({
        top: 40,
        left: 20,
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        hintText: "First Name",
        id: "firstName"
    });
    $.__views.registerView.add($.__views.firstName);
    $.__views.lastName = Ti.UI.createTextField({
        top: 20,
        left: 20,
        height: 40,
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        hintText: "Last Name",
        id: "lastName"
    });
    $.__views.registerView.add($.__views.lastName);
    $.__views.emailAddress = Ti.UI.createTextField({
        top: 20,
        left: 20,
        width: "80%",
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        hintText: "Email Address",
        id: "emailAddress"
    });
    $.__views.registerView.add($.__views.emailAddress);
    $.__views.inputPassword = Ti.UI.createTextField({
        top: 20,
        left: 20,
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        height: 40,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        hintText: "Password min 4 characters",
        id: "inputPassword",
        passwordMask: "true"
    });
    $.__views.registerView.add($.__views.inputPassword);
    $.__views.confirmPassword = Ti.UI.createTextField({
        top: 20,
        left: 20,
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        height: 40,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "black",
        hintText: "Confirm Password",
        id: "confirmPassword",
        passwordMask: "true"
    });
    $.__views.registerView.add($.__views.confirmPassword);
    $.__views.pushNotificationSelection = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
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
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "I agree to recive push notifications for",
        id: "pushNotificationSelection"
    });
    $.__views.registerView.add($.__views.pushNotificationSelection);
    $.__views.__alloyId73 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId73"
    });
    $.__views.registerView.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
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
        text: "School Announcements",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.recivePushFromSBSD = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "blue",
        value: false,
        id: "recivePushFromSBSD"
    });
    $.__views.__alloyId73.add($.__views.recivePushFromSBSD);
    $.__views.__alloyId75 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId75"
    });
    $.__views.registerView.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
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
        text: "PTA Annoncements",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.recivePushFromPTA = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "blue",
        value: false,
        id: "recivePushFromPTA"
    });
    $.__views.__alloyId75.add($.__views.recivePushFromPTA);
    $.__views.__alloyId77 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId77"
    });
    $.__views.registerView.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
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
        text: "Sports Anouncements",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.recivePushFromSports = Ti.UI.createSwitch({
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "blue",
        value: false,
        id: "recivePushFromSports"
    });
    $.__views.__alloyId77.add($.__views.recivePushFromSports);
    $.__views.buttonRegister = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Signup",
            backgroundColor: "#336699",
            top: "50dp",
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
            id: "buttonRegister"
        });
        return o;
    }());
    $.__views.registerView.add($.__views.buttonRegister);
    actionRegister ? $.__views.buttonRegister.addEventListener("click", actionRegister) : __defers["$.__views.buttonRegister!click!actionRegister"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator"
    });
    $.__views.registerView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    var registeringProgress = Alloy.createController("ProgressIndicator", {
        message: "Registering User .. \n" + $.emailAddress.value
    }).getView();
    $.registerForm.addEventListener("close", destroy);
    __defers["$.__views.buttonRegister!click!actionRegister"] && $.__views.buttonRegister.addEventListener("click", actionRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;