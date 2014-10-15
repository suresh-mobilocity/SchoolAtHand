function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function dialPhoneNumber() {
        $.phonelabel.text.replace(/[^0-9]/g, "");
        Ti.Platform.openURL("tel:7322977800,,,,5108");
    }
    function getDataFromDistrictDB() {
        var sql = "SELECT * from departments where name like '%Transportation%'";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0 && sqlRS.isValidRow()) {
            $.addresslabel.text = sqlRS.fieldByName("address");
            $.citylabel.text = sqlRS.fieldByName("city");
            $.stateandziplabel.text = sqlRS.fieldByName("stateandzipcode");
            $.phonelabel.text = sqlRS.fieldByName("phoneno");
            $.supervisorname.text = sqlRS.fieldByName("contactname1");
            supervisorEmailAddr = sqlRS.fieldByName("emailaddr1");
            $.secretaryname.text = sqlRS.fieldByName("contactname2");
            secretaryEmailAddr = sqlRS.fieldByName("emailaddr2");
            sqlRS.close();
        }
    }
    function destroy() {
        $.transportationWindow.removeEventListener("close", destroy);
        $.destroy();
        $.transportationWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Transportation";
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
    $.__views.transportationWindow = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        title: "Transportation",
        layout: "vertical",
        id: "transportationWindow"
    });
    $.__views.transportationWindow && $.addTopLevelView($.__views.transportationWindow);
    var __alloyId92 = [];
    $.__views.department = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        left: "2%",
        right: "2%",
        id: "department"
    });
    __alloyId92.push($.__views.department);
    $.__views.namelabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 18,
            fontWeight: "normal"
        },
        id: "namelabel",
        text: "Department of Transportation"
    });
    $.__views.department.add($.__views.namelabel);
    $.__views.contactsView = Ti.UI.createView({
        id: "contactsView",
        layout: "horizontal",
        height: Ti.UI.SIZE
    });
    $.__views.department.add($.__views.contactsView);
    $.__views.address = Ti.UI.createView({
        id: "address",
        layout: "vertical",
        width: "200",
        height: Ti.UI.SIZE,
        top: "2"
    });
    $.__views.contactsView.add($.__views.address);
    $.__views.addresslabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 14
        },
        id: "addresslabel",
        left: "10"
    });
    $.__views.address.add($.__views.addresslabel);
    $.__views.citylabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 14
        },
        id: "citylabel",
        left: "10"
    });
    $.__views.address.add($.__views.citylabel);
    $.__views.stateandziplabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 14
        },
        id: "stateandziplabel",
        left: "10"
    });
    $.__views.address.add($.__views.stateandziplabel);
    $.__views.phonelabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 14
        },
        id: "phonelabel",
        left: "10"
    });
    $.__views.address.add($.__views.phonelabel);
    dialPhoneNumber ? $.__views.phonelabel.addEventListener("click", dialPhoneNumber) : __defers["$.__views.phonelabel!click!dialPhoneNumber"] = true;
    $.__views.Buttons = Ti.UI.createView({
        id: "Buttons",
        top: "20",
        left: "10",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.contactsView.add($.__views.Buttons);
    $.__views.phonebutton = Ti.UI.createButton({
        width: 32,
        height: 32,
        backgroundImage: "/images/phone.png",
        id: "phonebutton"
    });
    $.__views.Buttons.add($.__views.phonebutton);
    dialPhoneNumber ? $.__views.phonebutton.addEventListener("click", dialPhoneNumber) : __defers["$.__views.phonebutton!click!dialPhoneNumber"] = true;
    $.__views.supervisorView = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        top: 5,
        id: "supervisorView"
    });
    __alloyId92.push($.__views.supervisorView);
    $.__views.supervisorlabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 18,
            fontWeight: "normal"
        },
        id: "supervisorlabel",
        top: "10",
        text: "Supervisor of Transportation"
    });
    $.__views.supervisorView.add($.__views.supervisorlabel);
    $.__views.supervisor = Ti.UI.createView({
        top: 5,
        height: 32,
        layout: "horizontal",
        id: "supervisor"
    });
    $.__views.supervisorView.add($.__views.supervisor);
    $.__views.supervisorname = Ti.UI.createLabel({
        width: 100,
        height: Ti.UI.SIZE,
        color: "blue",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        left: "5%",
        id: "supervisorname"
    });
    $.__views.supervisor.add($.__views.supervisorname);
    $.__views.emailsupervisor = Ti.UI.createButton({
        left: 50,
        height: 32,
        width: 32,
        backgroundImage: "/images/email.png",
        id: "emailsupervisor"
    });
    $.__views.supervisor.add($.__views.emailsupervisor);
    $.__views.secretaryView = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        top: 5,
        id: "secretaryView"
    });
    __alloyId92.push($.__views.secretaryView);
    $.__views.secretarylabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 18,
            fontWeight: "normal"
        },
        id: "secretarylabel",
        text: "Transportation Secretary"
    });
    $.__views.secretaryView.add($.__views.secretarylabel);
    $.__views.secretary = Ti.UI.createView({
        top: 5,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "secretary"
    });
    $.__views.secretaryView.add($.__views.secretary);
    $.__views.secretaryname = Ti.UI.createLabel({
        width: 100,
        height: Ti.UI.SIZE,
        color: "blue",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        left: "5%",
        id: "secretaryname"
    });
    $.__views.secretary.add($.__views.secretaryname);
    $.__views.emailsecretary = Ti.UI.createButton({
        left: 50,
        height: 32,
        width: 32,
        backgroundImage: "/images/email.png",
        id: "emailsecretary"
    });
    $.__views.secretary.add($.__views.emailsecretary);
    $.__views.__alloyId91 = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: "90%",
        backgroundColor: "#33B5E5",
        data: __alloyId92,
        id: "__alloyId91"
    });
    $.__views.transportationWindow.add($.__views.__alloyId91);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var secretaryEmailAddr = "";
    var supervisorEmailAddr = "";
    getDataFromDistrictDB();
    $.emailsupervisor.addEventListener("click", function() {
        var contactname = $.supervisorname.text.split(" ", 2);
        var contactEmailAddr = "";
        var sql = "SELECT emailaddr from contacts where name like '" + contactname[1] + " " + contactname[0] + "'";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0 && sqlRS.isValidRow()) {
            contactEmailAddr = sqlRS.fieldByName("emailaddr");
            sqlRS.close();
        }
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ contactEmailAddr ];
        emailDialog.open();
    });
    $.emailsecretary.addEventListener("click", function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ secretaryEmailAddr ];
        emailDialog.open();
    });
    if (true == Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        var adMobView = _admobview.getaddview();
        $.transportationWindow.add(adMobView);
    }
    $.transportationWindow.addEventListener("close", destroy);
    __defers["$.__views.phonelabel!click!dialPhoneNumber"] && $.__views.phonelabel.addEventListener("click", dialPhoneNumber);
    __defers["$.__views.phonebutton!click!dialPhoneNumber"] && $.__views.phonebutton.addEventListener("click", dialPhoneNumber);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;