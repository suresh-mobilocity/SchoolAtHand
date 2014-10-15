function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function actionLogin() {
        if (false == validateInputFields()) return;
        var loadingLoginProgress = Alloy.createController("ProgressIndicator", {
            message: "Login in progress.."
        }).getView();
        loadingLoginProgress.open();
        $.buttonLogin.enabled = false;
        Cloud.Users.login({
            login: $.inputUsername.value,
            password: $.inputPassword.value
        }, function(e) {
            if (e.success) {
                $.activityIndicator.hide();
                var user = e.users[0];
                Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
                Ti.App.Properties.setBool("LoggedIn", true);
                Ti.App.Properties.setString("username", user.username);
                loginLabel = "SignOut";
                retrieveDeviceToken();
                $.loginForm.close();
            } else {
                $.inputPassword.value = "";
                $.inputUsername.value = "";
                loadingLoginProgress.close();
                var alertDialog = Titanium.UI.createAlertDialog({
                    title: "Login Failed",
                    message: e.error && e.message || JSON.stringify(e),
                    buttonNames: [ "Retry", "Cancel" ]
                });
                alertDialog.show();
                alertDialog.addEventListener("click", function(evt) {
                    if (0 == evt.index) {
                        $.loginForm.close();
                        parentController.open(Alloy.createController("login_form", {
                            parentTab: parentController
                        }).getView());
                    } else 1 == evt.index && $.loginForm.close();
                });
            }
        });
    }
    function retrieveDeviceToken() {
        if (Ti.App.Properties.hasProperty("ACSDeviceToken") && !Ti.App.Properties.getString("ACSDeviceToken")) return;
        Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString("ACSDeviceToken", e.deviceToken);
            },
            error: function(e) {
                alert("Failed to register for push notifications! " + e.error);
            },
            callback: function(evt) {
                alert("Received push: in index.js" + JSON.stringify(evt));
                var notificationModel = Alloy.createModel("notification", {
                    datetime: new Date().toLocaleString(),
                    title: evt.data.title,
                    message: evt.data.alert,
                    badge: evt.data.badge
                });
                notificationModel.save();
                notificationCollection.fetch();
                notificationCollection.trigger("change");
                notificationCollection.trigger("sync");
            }
        });
    }
    function openRegistration() {
        parentController.open(Alloy.createController("Register", {
            parentTab: parentController
        }).getView());
    }
    function destroy() {
        $.loginForm.removeEventListener("close", destroy);
        $.loginForm.removeEventListener("open", refreshLoginStatus);
        $.destroy();
        $.loginForm.removeAllChildren();
        $ = null;
    }
    function validateInputFields() {
        if ("" == $.inputUsername.value || false == validateEmailformat($.inputUsername.value)) {
            alert("Error:\nInvalid email or field is empty");
            return false;
        }
        if ("" == $.inputPassword.value) {
            alert("Error:\nPassword field empty");
            return false;
        }
        return true;
    }
    function validateEmailformat(emailAddress) {
        var str = emailAddress;
        var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        testresults = filter.test(str) ? true : false;
        return testresults;
    }
    function refreshLoginStatus() {
        Ti.App.Properties.getBool("LoggedIn") ? $.loginForm.close() : $.buttonLogin.touchEnabled = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login_form";
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
    $.__views.loginForm = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "loginForm"
    });
    $.__views.loginForm && $.addTopLevelView($.__views.loginForm);
    $.__views.loginView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: 20
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            top: 0
        });
        _.extend(o, {
            id: "loginView",
            layout: "vertical"
        });
        return o;
    }());
    $.__views.loginForm.add($.__views.loginView);
    $.__views.signinLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        text: "Enter your email address, and password for this to login",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        id: "signinLabel"
    });
    $.__views.loginView.add($.__views.signinLabel);
    $.__views.inputUsername = Ti.UI.createTextField({
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        color: "black",
        id: "inputUsername"
    });
    $.__views.loginView.add($.__views.inputUsername);
    $.__views.inputPassword = Ti.UI.createTextField({
        width: "80%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        color: "black",
        id: "inputPassword",
        passwordMask: "true"
    });
    $.__views.loginView.add($.__views.inputPassword);
    $.__views.buttonLogin = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Log In",
            backgroundColor: "#336699",
            top: 20,
            width: "80%",
            left: "10%",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "white",
            borderColor: "#336699",
            borderRadius: 8
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            height: "50dp"
        });
        _.extend(o, {
            id: "buttonLogin"
        });
        return o;
    }());
    $.__views.loginView.add($.__views.buttonLogin);
    $.__views.registerLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        top: 20,
        left: 20,
        text: "Don't have an account to Login? Signup by clicking Signup button.\nYou can receive Alerts, Updates and Push Notifications.\n We don't share any of the information with third parties ",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        id: "registerLabel"
    });
    $.__views.loginView.add($.__views.registerLabel);
    $.__views.buttonSignup = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Sign Up",
            backgroundColor: "#336699",
            top: 20,
            width: "80%",
            left: "10%",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "white",
            borderColor: "#336699",
            borderRadius: 8
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
            id: "buttonSignup"
        });
        return o;
    }());
    $.__views.loginView.add($.__views.buttonSignup);
    openRegistration ? $.__views.buttonSignup.addEventListener("click", openRegistration) : __defers["$.__views.buttonSignup!click!openRegistration"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.loginView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var parentController = args.parentTab;
    $.loginForm.title = "Login";
    $.inputUsername.hintText = "email address";
    $.inputPassword.hintText = "Password";
    $.buttonLogin.title = "SignIn";
    Ti.App.Properties.hasProperty("username") && ($.inputUsername.value = Ti.App.Properties.getString("username"));
    $.buttonLogin.addEventListener("click", actionLogin);
    $.loginForm.addEventListener("focus", refreshLoginStatus);
    $.loginForm.addEventListener("close", destroy);
    __defers["$.__views.buttonSignup!click!openRegistration"] && $.__views.buttonSignup.addEventListener("click", openRegistration);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;