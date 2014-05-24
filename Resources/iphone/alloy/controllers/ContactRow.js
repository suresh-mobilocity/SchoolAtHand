function Controller() {
    function dialContactNumber(e) {
        Ti.API.info("Row swiped: " + e.source.phonenum + e.source.extension);
        var phoneno = e.source.phonenum.replace(/[^0-9]/g, "");
        var extno = e.source.extension.replace(/[^0-9]/g, "");
        Ti.Platform.openURL("tel:" + phoneno + ",,,," + extno);
    }
    function sendEmail(e) {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ e.source.emailaddr ];
        emailDialog.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ContactRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.contactRecord = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        color: "black",
        borderWidth: 10,
        id: "contactRecord",
        dataId: "",
        model: "undefined" != typeof $model.__transform["id"] ? $model.__transform["id"] : $model.get("id"),
        filter: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.contactRecord && $.addTopLevelView($.__views.contactRecord);
    $.__views.contactLabels = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        color: "black",
        id: "contactLabels"
    });
    $.__views.contactRecord.add($.__views.contactLabels);
    $.__views.Name = Ti.UI.createLabel({
        left: "7",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontColor: "#000000"
        },
        color: "black",
        id: "Name",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.contactLabels.add($.__views.Name);
    $.__views.department = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        color: "black",
        id: "department"
    });
    $.__views.contactRecord.add($.__views.department);
    $.__views.Title = Ti.UI.createLabel({
        left: "7",
        font: {
            fontSize: 12,
            fontWeight: "normal",
            fontColor: "#000000"
        },
        color: "black",
        height: Ti.UI.SIZE,
        id: "Title",
        text: "undefined" != typeof $model.__transform["title"] ? $model.__transform["title"] : $model.get("title")
    });
    $.__views.department.add($.__views.Title);
    $.__views.sep = Ti.UI.createLabel({
        id: "sep",
        text: "/"
    });
    $.__views.department.add($.__views.sep);
    $.__views.Department = Ti.UI.createLabel({
        left: "7",
        font: {
            fontSize: 12,
            fontWeight: "normal",
            fontColor: "#000"
        },
        color: "black",
        height: Ti.UI.SIZE,
        id: "Department",
        text: "undefined" != typeof $model.__transform["department"] ? $model.__transform["department"] : $model.get("department")
    });
    $.__views.department.add($.__views.Department);
    $.__views.phoneNo = Ti.UI.createView({
        layout: "horizontal",
        color: "blue",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "phoneNo"
    });
    $.__views.contactRecord.add($.__views.phoneNo);
    $.__views.Phone = Ti.UI.createLabel({
        left: "7",
        font: {
            fontSize: 12,
            fontWeight: "bold",
            fontColor: "#000"
        },
        color: "blue",
        height: Ti.UI.SIZE,
        id: "Phone",
        text: "undefined" != typeof $model.__transform["phonenum"] ? $model.__transform["phonenum"] : $model.get("phonenum")
    });
    $.__views.phoneNo.add($.__views.Phone);
    $.__views.Extention = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 12,
            fontWeight: "bold",
            fontColor: "#000"
        },
        height: Ti.UI.SIZE,
        color: "blue",
        width: 50,
        id: "Extention",
        text: "undefined" != typeof $model.__transform["ext"] ? $model.__transform["ext"] : $model.get("ext")
    });
    $.__views.phoneNo.add($.__views.Extention);
    $.__views.phoneButton = Ti.UI.createButton({
        left: 20,
        color: "green",
        backgroundColor: "white",
        width: 50,
        height: 50,
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp"
        },
        title: Alloy.Globals.icons.phone,
        borderRadius: 8,
        id: "phoneButton",
        phonenum: "undefined" != typeof $model.__transform["phonenum"] ? $model.__transform["phonenum"] : $model.get("phonenum"),
        extension: "undefined" != typeof $model.__transform["ext"] ? $model.__transform["ext"] : $model.get("ext")
    });
    $.__views.phoneNo.add($.__views.phoneButton);
    dialContactNumber ? $.__views.phoneButton.addEventListener("click", dialContactNumber) : __defers["$.__views.phoneButton!click!dialContactNumber"] = true;
    $.__views.emailButton = Ti.UI.createButton({
        left: 20,
        color: "#336699",
        backgroundColor: "white",
        width: Ti.UI.SIZE,
        height: 50,
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp"
        },
        title: Alloy.Globals.icons.envelope_alt,
        borderRadius: 8,
        id: "emailButton",
        emailaddr: "undefined" != typeof $model.__transform["emailaddr"] ? $model.__transform["emailaddr"] : $model.get("emailaddr")
    });
    $.__views.phoneNo.add($.__views.emailButton);
    sendEmail ? $.__views.emailButton.addEventListener("click", sendEmail) : __defers["$.__views.emailButton!click!sendEmail"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.phoneButton!click!dialContactNumber"] && $.__views.phoneButton.addEventListener("click", dialContactNumber);
    __defers["$.__views.emailButton!click!sendEmail"] && $.__views.emailButton.addEventListener("click", sendEmail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;