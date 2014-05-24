function Controller() {
    function actionLogin() {
        if (false == validateInputFields()) return;
        var loadingDBProgress = Alloy.createController("ProgressIndicator", {
            message: "Login in progress.."
        }).getView();
        loadingDBProgress.open();
        $.buttonLogin.enabled = false;
        Cloud.Users.login({
            login: $.inputUsername.value,
            password: $.inputPassword.value
        }, function(e) {
            if (e.success) {
                $.activityIndicator.hide();
                var user = e.users[0];
                Ti.API.info("Success:\nid: " + user.id + "\n" + "sessionId: " + Cloud.sessionId + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
                Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
                loginLabel = "SignOut";
                retrieveDeviceToken();
                $.loginForm.close();
            } else {
                $.inputPassword.value = "";
                $.inputUsername.value = "";
                loadingDBProgress.close();
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            }
        });
    }
    function retrieveDeviceToken() {
        if (Ti.App.Properties.hasProperty("ACSDeviceToken") && !Ti.App.Properties.getString("ACSDeviceToken")) return;
    }
    function openRegistration() {
        parentController.open(Alloy.createController("Register", {
            parentTab: parentController
        }).getView());
    }
    function destroy() {
        $.loginForm.removeEventListener("close", destroy);
        $.destroy();
        $.loginForm.removeAllChildren();
        $ = null;
        Ti.API.info("loginForm: Cleanup Successfully");
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
        text: "Enter email address and Password to login",
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
    actionLogin ? $.__views.buttonLogin.addEventListener("click", actionLogin) : __defers["$.__views.buttonLogin!click!actionLogin"] = true;
    $.__views.registerLabel = Ti.UI.createLabel({
        top: 20,
        height: Ti.UI.SIZE,
        left: 20,
        text: "Don't have an account to Login? Signup by clicking Signup button.\n You can receive Alerts, Updates and Push Notifications. ",
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
    $.buttonLogin.title = "Login";
    $.loginForm.addEventListener("close", destroy);
    __defers["$.__views.buttonLogin!click!actionLogin"] && $.__views.buttonLogin.addEventListener("click", actionLogin);
    __defers["$.__views.buttonSignup!click!openRegistration"] && $.__views.buttonSignup.addEventListener("click", openRegistration);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;