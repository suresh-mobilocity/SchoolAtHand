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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Transportation";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.transportationWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Transportation",
        layout: "vertical",
        id: "transportationWindow"
    });
    $.__views.transportationWindow && $.addTopLevelView($.__views.transportationWindow);
    var __alloyId104 = [];
    $.__views.department = Ti.UI.createTableViewRow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80,
        left: "2%",
        right: "2%",
        id: "department"
    });
    __alloyId104.push($.__views.department);
    $.__views.namelabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 18
        },
        color: "black",
        height: Ti.UI.SIZE,
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
        font: {
            fontSize: 14
        },
        color: "#000",
        id: "addresslabel",
        left: "10"
    });
    $.__views.address.add($.__views.addresslabel);
    $.__views.citylabel = Ti.UI.createLabel({
        font: {
            fontSize: 14
        },
        color: "#000",
        id: "citylabel",
        left: "10"
    });
    $.__views.address.add($.__views.citylabel);
    $.__views.stateandziplabel = Ti.UI.createLabel({
        font: {
            fontSize: 14
        },
        color: "#000",
        id: "stateandziplabel",
        left: "10"
    });
    $.__views.address.add($.__views.stateandziplabel);
    $.__views.phonelabel = Ti.UI.createLabel({
        font: {
            fontSize: 14
        },
        color: "#000",
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
        backgroundImage: "images/phone.png",
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
    __alloyId104.push($.__views.supervisorView);
    $.__views.supervisorlabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 18
        },
        color: "black",
        height: Ti.UI.SIZE,
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
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "blue",
        left: "5%",
        height: Ti.UI.SIZE,
        width: 100,
        id: "supervisorname"
    });
    $.__views.supervisor.add($.__views.supervisorname);
    $.__views.emailsupervisor = Ti.UI.createButton({
        left: 50,
        height: 32,
        width: 32,
        backgroundImage: "images/email.png",
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
    __alloyId104.push($.__views.secretaryView);
    $.__views.secretarylabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 18
        },
        color: "black",
        height: Ti.UI.SIZE,
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
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "blue",
        left: "5%",
        height: Ti.UI.SIZE,
        width: 100,
        id: "secretaryname"
    });
    $.__views.secretary.add($.__views.secretaryname);
    $.__views.emailsecretary = Ti.UI.createButton({
        left: 50,
        height: 32,
        width: 32,
        backgroundImage: "images/email.png",
        id: "emailsecretary"
    });
    $.__views.secretary.add($.__views.emailsecretary);
    $.__views.__alloyId103 = Ti.UI.createTableView({
        separatorColor: "#000000",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        data: __alloyId104,
        id: "__alloyId103"
    });
    $.__views.transportationWindow.add($.__views.__alloyId103);
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
    var adMobView = Admob.createView({
        publisherId: "ca-app-pub-3665132116722377/6561150840",
        testing: false,
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF"
    });
    $.transportationWindow.add(adMobView);
    __defers["$.__views.phonelabel!click!dialPhoneNumber"] && $.__views.phonelabel.addEventListener("click", dialPhoneNumber);
    __defers["$.__views.phonebutton!click!dialPhoneNumber"] && $.__views.phonebutton.addEventListener("click", dialPhoneNumber);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;