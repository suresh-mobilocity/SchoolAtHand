function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function dataTransformation(_model) {
        return {
            name: _model.attributes.name,
            address1: _model.attributes.address1,
            city: _model.attributes.city,
            state: _model.attributes.state,
            zipcode: _model.attributes.zipcode,
            phone: _model.attributes.phone,
            stateandzip: _model.attributes.state + " " + _model.attributes.zipcode,
            fax: _model.attributes.fax,
            latitude: _model.attributes.latitude,
            longitude: _model.attributes.longitude,
            imagefile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.imagefile,
            logofile: Ti.Filesystem.applicationDataDirectory + "/images/" + _model.attributes.logofile,
            websiteurl: _model.attributes.websiteurl,
            principal: _model.attributes.principal,
            assistantprincipal: _model.attributes.assistantprincipal,
            antibullyingspecialist: _model.attributes.antibullyingspecialist,
            principal_emailaddr: _model.attributes.principal_emailaddr,
            assistantprincipal_emailaddr: _model.attributes.assistantprincipal_emailaddr,
            antibullyingspecialist_emailaddr: _model.attributes.antibullyingspecialist_emailaddr,
            regular_hours: "Regular Hours: " + _model.attributes.regularhours,
            delayed_hours: "Delayed Opening: " + _model.attributes.delayedhours,
            earlyrelease_hours: "Early Release: " + _model.attributes.earlyreleasehours,
            id: _model.attributes.id
        };
    }
    function dialPhoneNumber() {
        var phoneno = args.data.attributes.phone.replace(/[^0-9]/g, "");
        Ti.Platform.openURL("tel:" + phoneno);
    }
    function destroy() {
        $.detailWindow.removeEventListener("close", destroy);
        $.destroy();
        $.detailWindow.removeAllChildren();
        $ = null;
        Ti.API.info("SchoolDetails: Cleanup Successfully");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SchoolDetail";
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
    $.schoolDetail = Alloy.createModel("school");
    $.__views.detailWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "School Details",
        layout: "vertical",
        id: "detailWindow",
        model: "$.schoolDetail"
    });
    $.__views.detailWindow && $.addTopLevelView($.__views.detailWindow);
    $.__views.schoolAddress = Ti.UI.createView({
        top: "2%",
        left: "2%",
        right: "2%",
        height: "60%",
        backgroundColor: "#E3E3E3",
        borderRadius: 16,
        borderColor: "gray",
        borderWidth: 2,
        layout: "vertical",
        id: "schoolAddress"
    });
    $.__views.detailWindow.add($.__views.schoolAddress);
    $.__views.schoolImage = Ti.UI.createImageView({
        top: 5,
        width: 64,
        height: 64,
        id: "schoolImage"
    });
    $.__views.schoolAddress.add($.__views.schoolImage);
    $.__views.namelabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontWeight: "bold",
            fontSize: 18
        },
        id: "namelabel"
    });
    $.__views.schoolAddress.add($.__views.namelabel);
    $.__views.addresslabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "addresslabel"
    });
    $.__views.schoolAddress.add($.__views.addresslabel);
    $.__views.citylabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "citylabel"
    });
    $.__views.schoolAddress.add($.__views.citylabel);
    $.__views.stateandziplabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "stateandziplabel"
    });
    $.__views.schoolAddress.add($.__views.stateandziplabel);
    $.__views.phonelabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "phonelabel"
    });
    $.__views.schoolAddress.add($.__views.phonelabel);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "__alloyId74"
    });
    $.__views.schoolAddress.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "__alloyId75"
    });
    $.__views.schoolAddress.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "__alloyId76"
    });
    $.__views.schoolAddress.add($.__views.__alloyId76);
    $.__views.schoolButtons = Ti.UI.createView({
        top: 10,
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "auto",
        left: "20%",
        id: "schoolButtons"
    });
    $.__views.schoolAddress.add($.__views.schoolButtons);
    $.__views.phonebutton = Ti.UI.createLabel({
        width: 50,
        height: 50,
        color: "white",
        left: 10,
        backgroundColor: "#336699",
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp"
        },
        text: Alloy.Globals.icons.phone,
        textAlign: "center",
        borderRadius: 4,
        id: "phonebutton"
    });
    $.__views.schoolButtons.add($.__views.phonebutton);
    dialPhoneNumber ? $.__views.phonebutton.addEventListener("click", dialPhoneNumber) : __defers["$.__views.phonebutton!click!dialPhoneNumber"] = true;
    $.__views.mapbutton = Ti.UI.createLabel({
        width: 50,
        height: 50,
        color: "white",
        left: 10,
        backgroundColor: "#336699",
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp"
        },
        text: Alloy.Globals.icons.map,
        textAlign: "center",
        borderRadius: 4,
        id: "mapbutton"
    });
    $.__views.schoolButtons.add($.__views.mapbutton);
    $.__views.webbutton = Ti.UI.createLabel({
        width: 50,
        height: 50,
        color: "white",
        left: 10,
        backgroundColor: "#336699",
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp"
        },
        text: Alloy.Globals.icons.globe_alt,
        textAlign: "center",
        borderRadius: 4,
        id: "webbutton"
    });
    $.__views.schoolButtons.add($.__views.webbutton);
    $.__views.schoolContacts = Ti.UI.createView({
        left: "2%",
        right: "2%",
        top: "2%",
        bottom: "2%",
        backgroundColor: "#E3E3E3",
        borderRadius: 16,
        borderColor: "gray",
        borderWidth: 2,
        layout: "vertical",
        height: "30%",
        id: "schoolContacts"
    });
    $.__views.detailWindow.add($.__views.schoolContacts);
    $.__views.principal = Ti.UI.createView({
        left: "5%",
        height: 50,
        layout: "horizontal",
        id: "principal"
    });
    $.__views.schoolContacts.add($.__views.principal);
    $.__views.principallabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        textAlign: "left",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "principallabel",
        text: "Principal:"
    });
    $.__views.principal.add($.__views.principallabel);
    $.__views.principalname = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 20,
        color: "blue",
        textAlign: "center",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "principalname"
    });
    $.__views.principal.add($.__views.principalname);
    $.__views.emailPrincipal = Ti.UI.createButton({
        left: 5,
        height: 24,
        width: 24,
        backgroundImage: "/images/email.png",
        id: "emailPrincipal"
    });
    $.__views.principal.add($.__views.emailPrincipal);
    $.__views.assistantprincipal = Ti.UI.createView({
        left: "5%",
        height: 50,
        layout: "horizontal",
        id: "assistantprincipal"
    });
    $.__views.schoolContacts.add($.__views.assistantprincipal);
    $.__views.assistantprincipallabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 20,
        color: "black",
        textAlign: "left",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "assistantprincipallabel",
        text: "Asst. Principal:"
    });
    $.__views.assistantprincipal.add($.__views.assistantprincipallabel);
    $.__views.assistantprincipalname = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 20,
        color: "blue",
        textAlign: "center",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "assistantprincipalname"
    });
    $.__views.assistantprincipal.add($.__views.assistantprincipalname);
    $.__views.emailAsstPrincipal = Ti.UI.createButton({
        left: 5,
        height: 24,
        width: 24,
        backgroundImage: "/images/email.png",
        id: "emailAsstPrincipal"
    });
    $.__views.assistantprincipal.add($.__views.emailAsstPrincipal);
    $.__views.abspecialist = Ti.UI.createView({
        left: "5%",
        height: 50,
        layout: "horizontal",
        id: "abspecialist"
    });
    $.__views.schoolContacts.add($.__views.abspecialist);
    $.__views.abspecialistlabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 20,
        color: "black",
        textAlign: "left",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "abspecialistlabel",
        text: "Anti Bullying Specialist:"
    });
    $.__views.abspecialist.add($.__views.abspecialistlabel);
    $.__views.abspecialistname = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 20,
        color: "blue",
        textAlign: "center",
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        id: "abspecialistname"
    });
    $.__views.abspecialist.add($.__views.abspecialistname);
    $.__views.emailABSpecialist = Ti.UI.createButton({
        left: 5,
        height: 24,
        width: 24,
        backgroundImage: "/images/email.png",
        id: "emailABSpecialist"
    });
    $.__views.abspecialist.add($.__views.emailABSpecialist);
    var __alloyId77 = function() {
        $.schoolImage.image = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["imagefile"] : _.template("<%=schoolDetail.imagefile%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.namelabel.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["name"] : _.template("<%=schoolDetail.name%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.addresslabel.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["address1"] : _.template("<%=schoolDetail.address1%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.citylabel.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["city"] : _.template("<%=schoolDetail.city%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.stateandziplabel.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["stateandzip"] : _.template("<%=schoolDetail.stateandzip%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.phonelabel.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["phone"] : _.template("<%=schoolDetail.phone%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.__alloyId74.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["regular_hours"] : _.template("<%=schoolDetail.regular_hours%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.__alloyId75.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["delayed_hours"] : _.template("<%=schoolDetail.delayed_hours%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.__alloyId76.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["earlyrelease_hours"] : _.template("<%=schoolDetail.earlyrelease_hours%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.principalname.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["principal"] : _.template("<%=schoolDetail.principal%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.assistantprincipalname.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["assistantprincipal"] : _.template("<%=schoolDetail.assistantprincipal%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
        $.abspecialistname.text = _.isFunction($.schoolDetail.transform) ? $.schoolDetail.transform()["antibullyingspecialist"] : _.template("<%=schoolDetail.antibullyingspecialist%>", {
            schoolDetail: $.schoolDetail.toJSON()
        });
    };
    $.schoolDetail.on("fetch change destroy", __alloyId77);
    exports.destroy = function() {
        $.schoolDetail.off("fetch change destroy", __alloyId77);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.schoolDetail = _.extend({}, $.schoolDetail, {
        transform: function() {
            return dataTransformation(this);
        }
    });
    $.schoolDetail.set(args.data.attributes);
    $.mapbutton.addEventListener("click", function() {
        var mapController = Alloy.createController("MapDetail", {
            data: args.data.attributes
        });
        args.parentTab.open(mapController.getView());
    });
    $.webbutton.addEventListener("click", function() {
        var webSiteController = Alloy.createController("SchoolWebSite", {
            data: {
                schoolname: args.data.attributes.name,
                url: args.data.attributes.websiteurl
            }
        });
        args.parentTab.open(webSiteController.getView());
    });
    $.emailPrincipal.addEventListener("click", function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ args.data.attributes.principal_emailaddr ];
        emailDialog.open();
    });
    $.emailAsstPrincipal.addEventListener("click", function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ args.data.attributes.assistantprincipal_emailaddr ];
        emailDialog.open();
    });
    $.emailABSpecialist.addEventListener("click", function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ args.data.attributes.antibullyingspecialist_emailaddr ];
        emailDialog.open();
    });
    $.detailWindow.addEventListener("close", destroy);
    __defers["$.__views.phonebutton!click!dialPhoneNumber"] && $.__views.phonebutton.addEventListener("click", dialPhoneNumber);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;