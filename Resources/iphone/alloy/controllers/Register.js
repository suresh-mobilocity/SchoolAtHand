function Controller() {
    function actionRegister() {
        if (false == validateInputFields()) return;
        Cloud.Users.create({
            username: $.emailAddress.value,
            password: $.inputPassword.value,
            password_confirmation: $.confirmPassword.value,
            first_name: $.firstName.value,
            last_name: $.lastName.value,
            email: $.emailAddress.value
        }, function(e) {
            if (e.success) {
                Ti.API.info("User ID is successfully created", "true");
                register_to_push_notifications($.emailAddress.value, $.inputPassword.value);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function register_to_push_notifications(username, passwd) {
        CloudPush.retrieveDeviceToken({
            success: function(e) {
                Ti.API.info("Registered for Push Notification" + e.deviceToken);
                Ti.App.Properties.setString("ACSDeviceToken", "e.deviceToken");
                deviceToken = e.deviceToken;
                loginToACS(username, passwd);
            },
            error: function(e) {
                alert("Failed to register for Push Notification" + e.error);
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
                Ti.API.info("User Login Success:\nid: " + user.id + "\n" + "sessionId: " + Cloud.sessionId + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
                Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
                subscribeToChannels();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function registerCallbacks() {
        CloudPush.showTrayNotification = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.focusAppOnPush = false;
        CloudPush.showAppOnTrayClick = true;
        CloudPush.addEventListener("callback", function(evt) {
            Ti.API.info("Received Push Notification: " + evt.payload);
        });
        CloudPush.addEventListener("trayClickLaunchedApp", function(evt) {
            Ti.API.info("Tray Click Launched App (app was not running)");
            Ti.API.info("Received Push Notification: " + evt.payload);
        });
        CloudPush.addEventListener("trayClickFocusedApp", function(evt) {
            Ti.API.info("Tray Click Focused App (app was already running)");
            Ti.API.info("Received Push Notification: " + evt.payload);
        });
    }
    function subscribeToChannels() {
        $.recivePushFromSBSD.value() && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "SBSD_Alerts",
            type: "gcm"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive School District Alerts, Notifications");
                $.registerForm.close();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        $.recivePushFromPTA.value() && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "PTA_Alerts",
            type: "gcm"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive PTA Announcements");
                $.registerForm.close();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
        $.recivePushFromSports.value() && Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "Sports_Alerts",
            type: "gcm"
        }, function(e) {
            if (e.success) {
                registerCallbacks();
                alert("Successfully subscribed to receive Successfully subscribed to receive Sports Announcements");
                $.registerForm.close();
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        hintText: "Password",
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
        top: 20,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "I agreee to reive push notifications for",
        id: "pushNotificationSelection"
    });
    $.__views.registerView.add($.__views.pushNotificationSelection);
    $.__views.__alloyId72 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId72"
    });
    $.__views.registerView.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
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
        text: "School Announcements",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
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
    $.__views.__alloyId72.add($.__views.recivePushFromSBSD);
    $.__views.__alloyId74 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId74"
    });
    $.__views.registerView.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
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
        text: "PTA Annoncements",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
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
    $.__views.__alloyId74.add($.__views.recivePushFromPTA);
    $.__views.__alloyId76 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "__alloyId76"
    });
    $.__views.registerView.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
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
        text: "Sports Anouncements",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
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
    $.__views.__alloyId76.add($.__views.recivePushFromSports);
    $.__views.buttonRegister = Ti.UI.createButton({
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
        borderRadius: 10,
        id: "buttonRegister"
    });
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
    __defers["$.__views.buttonRegister!click!actionRegister"] && $.__views.buttonRegister.addEventListener("click", actionRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;