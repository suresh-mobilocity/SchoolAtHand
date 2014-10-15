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
        $.DisclaimerWin.removeEventListener("close", destroy);
        $.destroy();
        $.DisclaimerWin.removeAllChildren();
        $ = null;
        Ti.API.info("AppDiscalimer| Cleanup Successful");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AppDisclaimer";
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
    $.__views.DisclaimerWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Disclaimer",
        layout: "vertical",
        id: "DisclaimerWin",
        fullscreen: "true"
    });
    $.__views.DisclaimerWin && $.addTopLevelView($.__views.DisclaimerWin);
    $.__views.disclaimerView = Ti.UI.createWebView({
        height: "90%",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        top: 0,
        id: "disclaimerView",
        url: "/disclaimer.html"
    });
    $.__views.DisclaimerWin.add($.__views.disclaimerView);
    $.__views.buttonLayout = Ti.UI.createView({
        layout: "horizontal",
        borderColor: "#336699",
        id: "buttonLayout"
    });
    $.__views.DisclaimerWin.add($.__views.buttonLayout);
    $.__views.buttonAccept = Ti.UI.createButton({
        title: "Accept",
        backgroundColor: "#336699",
        top: "10%",
        width: "40%",
        left: "5%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderColor: "#336699",
        borderRadius: 8,
        id: "buttonAccept"
    });
    $.__views.buttonLayout.add($.__views.buttonAccept);
    $.__views.buttonDeny = Ti.UI.createButton({
        title: "Deny",
        backgroundColor: "#336699",
        width: "40%",
        top: "10%",
        left: "5%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderColor: "#336699",
        borderRadius: 8,
        id: "buttonDeny"
    });
    $.__views.buttonLayout.add($.__views.buttonDeny);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentTab;
    $.buttonAccept.addEventListener("click", function() {
        Ti.App.Properties.setString("AppDisclaimerAccepted", "true");
        Ti.API.info("Discalimer is Accepted");
        $.DisclaimerWin.close();
    });
    $.buttonDeny.addEventListener("click", function() {
        Ti.App.Properties.setString("AppDisclaimerAccepted", "false");
        alert("You must accept the agreement to use this application!");
        Ti.App.fireEvent("close", {
            message: "AppDisclaimerDenied"
        });
        $.DisclaimerWin.close();
    });
    $.DisclaimerWin.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;