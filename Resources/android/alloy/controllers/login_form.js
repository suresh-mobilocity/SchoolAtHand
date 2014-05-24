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
                e.users[0];
                Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
                Ti.App.Properties.setBool("LoggedIn", true);
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
        CloudPush.retrieveDeviceToken({
            success: function(e) {
                Ti.App.Properties.setString("ACSDeviceToken", e.deviceToken);
                deviceToken = e.deviceToken;
                registerNotificationCallbacks();
            },
            error: function() {}
        });
    }
    function openRegistration() {
        parentController.open(Alloy.createController("Register", {
            parentTab: parentController
        }).getView());
    }
    function registerNotificationCallbacks() {
        CloudPush.showTrayNotification = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.focusAppOnPush = false;
        CloudPush.showAppOnTrayClick = true;
        CloudPush.addEventListener("callback", function(evt) {
            JSON.stringify(evt);
            var payload = JSON.parse(evt.payload).android;
            var notificationModel = Alloy.createModel("notification", {
                datetime: new Date().toString(),
                title: payload.title,
                message: payload.alert,
                badge: payload.badge
            });
            notificationModel.save();
            notificationCollection.fetch();
            notificationCollection.trigger("change");
        });
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginForm = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "loginForm"
    });
    $.__views.loginForm && $.addTopLevelView($.__views.loginForm);
    $.__views.loginView = Ti.UI.createView({
        top: 20,
        id: "loginView",
        layout: "vertical"
    });
    $.__views.loginForm.add($.__views.loginView);
    $.__views.signinLabel = Ti.UI.createLabel({
        top: 20,
        height: Ti.UI.SIZE,
        left: 20,
        text: "Enter your email address, and password for this to login",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "blue",
        width: Ti.UI.SIZE,
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
    $.__views.buttonLogin = Ti.UI.createButton({
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
        borderRadius: 8,
        id: "buttonLogin"
    });
    $.__views.loginView.add($.__views.buttonLogin);
    $.__views.registerLabel = Ti.UI.createLabel({
        top: 20,
        height: Ti.UI.SIZE,
        left: 20,
        text: "Don't have an account to Login? Signup by clicking Signup button.\nYou can receive Alerts, Updates and Push Notifications.\n We don't share any of the information with third parties ",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "blue",
        width: Ti.UI.SIZE,
        id: "registerLabel"
    });
    $.__views.loginView.add($.__views.registerLabel);
    $.__views.buttonSignup = Ti.UI.createButton({
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
        borderRadius: 8,
        id: "buttonSignup"
    });
    $.__views.loginView.add($.__views.buttonSignup);
    openRegistration ? $.__views.buttonSignup.addEventListener("click", openRegistration) : __defers["$.__views.buttonSignup!click!openRegistration"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 20,
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
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
    $.inputUsername.value = Ti.App.Properties.getString("username") ? Ti.App.Properties.getString("username") : "";
    $.buttonLogin.addEventListener("click", actionLogin);
    $.loginForm.addEventListener("focus", refreshLoginStatus);
    $.loginForm.addEventListener("close", destroy);
    __defers["$.__views.buttonSignup!click!openRegistration"] && $.__views.buttonSignup.addEventListener("click", openRegistration);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;