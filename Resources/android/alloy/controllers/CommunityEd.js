function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getDepartmentDataFromDB() {
        var sql = "SELECT * from departments where name like '%Community%'";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0 && sqlRS.isValidRow()) {
            $.addresslabel.text = sqlRS.fieldByName("address");
            $.citylabel.text = sqlRS.fieldByName("city");
            $.stateandziplabel.text = sqlRS.fieldByName("stateandzipcode");
            $.phonelabel.text = sqlRS.fieldByName("phoneno");
            sqlRS.close();
        }
    }
    function getCommunityEdContacts() {
        var rdata = [];
        var sql = "SELECT * from communityed";
        var sqlRS = schoolDB.execute(sql);
        if (sqlRS.getRowCount() > 0) while (sqlRS.isValidRow()) {
            var sectionName = sqlRS.fieldByName("section");
            var contactName = sqlRS.fieldByName("contactname");
            var emailAddr = sqlRS.fieldByName("emailaddr");
            var phoneNo = sqlRS.fieldByName("phoneno");
            var ext = sqlRS.fieldByName("ext");
            var row = Ti.UI.createTableViewRow({
                layout: "vertical",
                height: 100,
                borderWidth: 1,
                borderColor: "gray"
            });
            var sectionView = Ti.UI.createView({
                layout: "vertical",
                id: "sectionView",
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL
            });
            var sectionLabel = Ti.UI.createLabel({
                text: sectionName,
                id: "sectionLabel",
                font: {
                    fontSize: 20,
                    fontWeight: "bold"
                },
                color: "black",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            {
                Ti.UI.createView({
                    layout: "vertical",
                    id: "contactView",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE
                });
            }
            var contactNameLabel = Ti.UI.createLabel({
                left: 5,
                text: contactName,
                id: "contactLabel",
                font: {
                    fontSize: 14,
                    fontWeight: "normal"
                },
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                color: "black"
            });
            var contactControls = Ti.UI.createView({
                left: 5,
                layout: "horizontal",
                id: "contactControls",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            var contactPhone = Ti.UI.createLabel({
                text: phoneNo,
                id: "contactPhone",
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                height: Ti.UI.SIZE,
                color: "blue"
            });
            var phoneButton = Ti.UI.createButton({
                phone: phoneNo,
                ext: ext,
                left: 20,
                height: 50,
                width: 50,
                backgroundImage: "/images/phone.png"
            });
            var eMailButton = Ti.UI.createButton({
                emailaddr: emailAddr,
                left: 20,
                height: 50,
                width: 50,
                backgroundImage: "/images/email.png"
            });
            phoneButton.addEventListener("click", function(e) {
                dialPhoneNumber(e.source.phone, e.source.ext);
            });
            eMailButton.addEventListener("click", function(e) {
                sendEmail(e.source.emailaddr);
            });
            sectionView.add(sectionLabel);
            sectionView.add(contactNameLabel);
            contactControls.add(contactPhone);
            contactControls.add(phoneButton);
            contactControls.add(eMailButton);
            sectionView.add(contactControls);
            row.add(sectionView);
            rdata.push(row);
            sqlRS.next();
        }
        sqlRS.close();
        var communityEdTableView = Titanium.UI.createTableView({
            data: rdata,
            separatorColor: "#000000"
        });
        $.communityEdWindow.add(communityEdTableView);
    }
    function dialPhoneNumber(phoneNo, ext) {
        var dialingNo = phoneNo.replace(/[^0-9]/g, "");
        Ti.Platform.openURL("" == ext ? "tel:" + dialingNo : "tel:" + dialingNo);
    }
    function sendEmail(emailAddr) {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ emailAddr ];
        emailDialog.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "CommunityEd";
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
    $.__views.communityEdWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "communityEdWindow",
        layout: "vertical"
    });
    $.__views.communityEdWindow && $.addTopLevelView($.__views.communityEdWindow);
    $.__views.communityEdMainView = Ti.UI.createView({
        id: "communityEdMainView",
        layout: "vertical",
        height: "20%",
        width: Ti.UI.FILL,
        borderWidth: "2",
        color: "black"
    });
    $.__views.communityEdWindow.add($.__views.communityEdMainView);
    $.__views.namelabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 18
        },
        text: "Community Education Dept",
        id: "namelabel"
    });
    $.__views.communityEdMainView.add($.__views.namelabel);
    $.__views.contactsView = Ti.UI.createView({
        id: "contactsView",
        layout: "horizontal"
    });
    $.__views.communityEdMainView.add($.__views.contactsView);
    $.__views.address = Ti.UI.createView({
        id: "address",
        layout: "vertical",
        width: "70%"
    });
    $.__views.contactsView.add($.__views.address);
    $.__views.addresslabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 14
        },
        text: "Address",
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
        text: "City",
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
        text: "08852",
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
        text: "phonenumber",
        id: "phonelabel",
        left: "10"
    });
    $.__views.address.add($.__views.phonelabel);
    $.__views.Buttons = Ti.UI.createView({
        id: "Buttons"
    });
    $.__views.contactsView.add($.__views.Buttons);
    $.__views.phonebutton = Ti.UI.createButton({
        width: 32,
        height: 32,
        backgroundImage: "/images/phone.png",
        id: "phonebutton"
    });
    $.__views.Buttons.add($.__views.phonebutton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.communityEdWindow.title = "Community Education";
    getDepartmentDataFromDB();
    getCommunityEdContacts();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;