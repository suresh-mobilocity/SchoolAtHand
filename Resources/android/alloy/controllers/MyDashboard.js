function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getEventsFromDistrictCalendarAsTableRows(school) {
        var rdata = [];
        var sql = "SELECT shortname from schools where name = '" + school + "'";
        var sqlRS = schoolDB.execute(sql);
        var scode = null;
        if (sqlRS.getRowCount() > 0 && sqlRS.isValidRow()) {
            scode = sqlRS.fieldByName("shortname");
            sqlRS.close();
        }
        var eventsQuery = "SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '" + scode.toUpperCase() + "'  and eventdate between date('now') and date('now', '+7 day') UNION SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '' and eventdate between date('now') and date('now', '+7 day') order by 1";
        Ti.API.info("eventsQuery: " + eventsQuery);
        var eventResults = schoolDB.execute(eventsQuery);
        if (eventResults.getRowCount() > 0) {
            while (eventResults.isValidRow()) {
                var eventDate = eventResults.fieldByName("eventdate");
                var eventDesc = eventResults.fieldByName("eventdescription");
                var weekday = dayNames[eventResults.fieldByName("weekday")];
                var eventRow = Ti.UI.createTableViewRow({
                    height: 30,
                    backgroundColor: "#B2FFFF"
                });
                var eventRowView = Ti.UI.createView({
                    left: 5,
                    layout: "horizontal",
                    id: "contactControls",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE
                });
                var dateLabel = Ti.UI.createLabel({
                    text: eventDate + " " + weekday,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    height: Ti.UI.SIZE,
                    color: "#217346"
                });
                var descLabel = Ti.UI.createLabel({
                    left: 20,
                    text: eventDesc,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    height: Ti.UI.SIZE,
                    color: "blue"
                });
                eventRowView.add(dateLabel);
                eventRowView.add(descLabel);
                eventRow.add(eventRowView);
                rdata.push(eventRow);
                eventResults.next();
            }
            eventResults.close();
        }
        return rdata;
    }
    function getTeacherContacts() {
        var contactsQuery = null;
        if ("" === teacherName || null === teacherName) {
            Ti.API.info("teacherName is empty");
            contactsQuery = "SELECT phone as phonenum, principal_emailaddr as emailaddr FROM schools where name like '%" + school + "%'";
        } else {
            Ti.API.info("teacherName is empty" + teacherName);
            contactsQuery = "SELECT phonenum, emailaddr FROM contacts where name like '%" + teacherName + "%' AND building like '" + school + "%'";
        }
        var contactResults = schoolDB.execute(contactsQuery);
        if (contactResults.getRowCount() > 0 && contactResults.isValidRow()) {
            teacherPhoneno = contactResults.fieldByName("phonenum");
            teacherEmailAddr = contactResults.fieldByName("emailaddr");
            Ti.API.info("Teacher: " + teacherName + " phoneno:" + teacherPhoneno + " emailaddr:" + teacherEmailAddr);
        }
        contactResults.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MyDashboard";
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
    $.myProfile = Alloy.createModel("profile");
    $.__views.MyDashboardWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "MyDashboardWindow",
        title: "Dashboard"
    });
    $.__views.MyDashboardWindow && $.addTopLevelView($.__views.MyDashboardWindow);
    $.__views.mainView = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        width: Ti.UI.FILL,
        borderColor: "gray",
        borderWidth: 2,
        id: "mainView"
    });
    $.__views.MyDashboardWindow.add($.__views.mainView);
    $.__views.profileView = Ti.UI.createView({
        color: "blue",
        top: "3%",
        left: "3%",
        right: "5%",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "horizontal",
        id: "profileView"
    });
    $.__views.mainView.add($.__views.profileView);
    $.__views.profileImage = Ti.UI.createImageView({
        left: 10,
        width: 64,
        height: 64,
        autorotate: true,
        id: "profileImage"
    });
    $.__views.profileView.add($.__views.profileImage);
    $.__views.profileDetailsLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        textAlign: "Ti.UI.TEXT_ALIGNMENT_RIGHT",
        verticalAlign: "TEXT_VERTICAL_ALIGNMENT_TOP",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        left: 50,
        id: "profileDetailsLabel"
    });
    $.__views.profileView.add($.__views.profileDetailsLabel);
    $.__views.contactTeacher = Ti.UI.createView({
        backgroundColor: "white",
        top: 2,
        height: 50,
        width: 200,
        style: "Titanium.UI.iPhone.SystemButtonStyle.BAR",
        left: 120,
        id: "contactTeacher",
        layout: "horizontal"
    });
    $.__views.mainView.add($.__views.contactTeacher);
    $.__views.callButton = Ti.UI.createLabel({
        width: "50",
        height: "50",
        color: "#336699",
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp",
            fontWeight: "normal"
        },
        backgroundColor: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "callButton"
    });
    $.__views.contactTeacher.add($.__views.callButton);
    $.__views.emailButton = Ti.UI.createLabel({
        width: 50,
        height: 50,
        color: "#336699",
        left: 25,
        backgroundColor: "white",
        borderRadius: 8,
        font: {
            fontFamily: "AppIcons",
            fontSize: "50dp",
            fontWeight: "normal"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "emailButton"
    });
    $.__views.contactTeacher.add($.__views.emailButton);
    $.__views.contentButtonBar = Ti.UI.createView({
        backgroundColor: "#336699",
        top: 20,
        height: 50,
        width: Ti.UI.FILL,
        style: "Titanium.UI.iPhone.SystemButtonStyle.BAR",
        font: {
            fontSize: 16,
            fontWeight: "normal"
        },
        color: "blue",
        layout: "horizontal",
        left: "2%",
        right: "2%",
        id: "contentButtonBar"
    });
    $.__views.mainView.add($.__views.contentButtonBar);
    $.__views.eventsButton = Ti.UI.createButton({
        height: 50,
        width: "auto",
        backgroundColor: "#336699",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        color: "white",
        selectedColor: "red",
        id: "eventsButton",
        title: "Events"
    });
    $.__views.contentButtonBar.add($.__views.eventsButton);
    $.__views.friFolderButton = Ti.UI.createButton({
        left: 10,
        height: 50,
        width: "auto",
        backgroundColor: "#336699",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        color: "white",
        selectedColor: "red",
        id: "friFolderButton",
        title: "Fri.Folder"
    });
    $.__views.contentButtonBar.add($.__views.friFolderButton);
    $.__views.lunchButton = Ti.UI.createButton({
        left: 10,
        height: 50,
        width: "auto",
        backgroundColor: "#336699",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        color: "white",
        selectedColor: "red",
        id: "lunchButton",
        title: "Lunch"
    });
    $.__views.contentButtonBar.add($.__views.lunchButton);
    $.__views.sportsButton = Ti.UI.createButton({
        left: 10,
        height: 50,
        width: "auto",
        backgroundColor: "#336699",
        font: {
            fontSize: 14,
            fontWeight: "normal"
        },
        color: "white",
        selectedColor: "red",
        id: "sportsButton",
        title: "Sports"
    });
    $.__views.contentButtonBar.add($.__views.sportsButton);
    $.__views.contentsScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        scrollType: "vertical",
        showVerticalScrollIndicator: "true",
        left: "2%",
        right: "2%",
        height: 150,
        width: Ti.UI.FILL,
        borderColor: "gray",
        contentHeight: "auto",
        borderWidth: 1,
        borderRadius: 8,
        id: "contentsScrollView"
    });
    $.__views.mainView.add($.__views.contentsScrollView);
    $.__views.announcementsScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: 5,
        left: "2%",
        right: "2%",
        height: 100,
        scrollType: "vertical",
        showVerticalScrollIndicator: "true",
        width: Ti.UI.FILL,
        contentHeight: "auto",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        id: "announcementsScrollView"
    });
    $.__views.mainView.add($.__views.announcementsScrollView);
    $.__views.districtAnnouncementsView = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        width: Ti.UI.FILL,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        id: "districtAnnouncementsView"
    });
    $.__views.announcementsScrollView.add($.__views.districtAnnouncementsView);
    $.__views.districtAnnouncementsLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "red",
        left: 5,
        font: {
            fontSize: 12,
            fontWeight: "normal"
        },
        textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
        verticalAlign: "Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP",
        id: "districtAnnouncementsLabel"
    });
    $.__views.districtAnnouncementsView.add($.__views.districtAnnouncementsLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var lunchMenu = [];
    var fridayFolders = [];
    var sportsList = [];
    args.parentTab;
    args.tabToNavigateBack;
    args.windowToNavigate;
    var teacherPhoneno = null;
    var teacherEmailAddr = null;
    var myProfile = args.data;
    var school = myProfile.get("school");
    var grade = myProfile.get("grade");
    var teacherName = myProfile.get("teacher");
    $.profileDetailsLabel.text = myProfile.get("name") + "\n" + grade + "\n" + school + "\nTeacher: " + teacherName;
    $.callButton.text = Alloy.Globals.icons["phone"];
    $.emailButton.text = Alloy.Globals.icons["envelope_alt"];
    var eventsList = getEventsFromDistrictCalendarAsTableRows(school);
    var notFoundTableViewRow = Ti.UI.createTableViewRow({
        height: 30,
        backgroundColor: "#B2FFFF"
    });
    var notFoundRowView = Ti.UI.createView({
        left: 5,
        layout: "horizontal",
        id: "contactControls",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    var notFoundRowLabel = Ti.UI.createLabel({
        text: "No Records Found",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        color: "#217346"
    });
    notFoundRowView.add(notFoundRowLabel);
    notFoundTableViewRow.add(notFoundRowView);
    lunchMenu.push(notFoundTableViewRow);
    fridayFolders.push(notFoundTableViewRow);
    sportsList.push(notFoundTableViewRow);
    var eventListTableView = Titanium.UI.createTableView({
        data: eventsList
    });
    var lunchMenuTableView = Titanium.UI.createTableView({
        data: lunchMenu
    });
    var fridayFoldersTableView = Titanium.UI.createTableView({
        data: fridayFolders
    });
    var sportsListTableView = Titanium.UI.createTableView({
        data: sportsList
    });
    $.eventsButton.color = "red";
    $.contentsScrollView.add(eventListTableView);
    $.profileImage.image = myProfile.get("url");
    Ti.API.info("URL for the profile:" + myProfile.get("url"));
    1 == profileCollection.length && ($.MyDashboardWindow.backButtonTitle = "");
    $.friFolderButton.addEventListener("click", function() {
        $.contentsScrollView.removeAllChildren();
        $.contentsScrollView.add(fridayFoldersTableView);
        $.eventsButton.color = "white";
        $.sportsButton.color = "white";
        $.friFolderButton = "red";
        $.lunchButton.color = "white";
    });
    $.lunchButton.addEventListener("click", function() {
        $.contentsScrollView.removeAllChildren();
        $.contentsScrollView.add(lunchMenuTableView);
        $.eventsButton.color = "white";
        $.sportsButton.color = "white";
        $.friFolderButton = "white";
        $.lunchButton.color = "red";
    });
    $.sportsButton.addEventListener("click", function() {
        $.contentsScrollView.removeAllChildren();
        $.contentsScrollView.add(sportsListTableView);
        $.sportsButton.color = "red";
        $.eventsButton.color = "white";
        $.friFolderButton = "white";
        $.lunchButton.color = "white";
    });
    $.eventsButton.addEventListener("click", function() {
        $.contentsScrollView.removeAllChildren();
        $.contentsScrollView.add(eventListTableView);
        $.eventsButton.color = "red";
        $.sportsButton.color = "white";
        $.friFolderButton = "white";
        $.lunchButton.color = "white";
    });
    $.callButton.addEventListener("click", function() {
        null == teacherPhoneno && getTeacherContacts();
        if (null == teacherPhoneno) {
            alert("Could not find teacher's phone number in contacts");
            return;
        }
        var phoneno = teacherPhoneno.replace(/[^0-9]/g, "");
        Ti.Platform.openURL("tel:" + phoneno);
    });
    $.emailButton.addEventListener("click", function() {
        null == teacherEmailAddr && getTeacherContacts();
        if (null == teacherPhoneno) {
            alert("Could not find teacher's email address in contacts");
            return;
        }
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Hello";
        emailDialog.toRecipients = [ teacherEmailAddr ];
        emailDialog.open();
    });
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function() {
        if (200 === this.status) {
            httpResponse = this.responseText;
            var searchStr = "havemsg='";
            var start = httpResponse.indexOf(searchStr);
            var tStr = httpResponse.substring(start);
            var end = tStr.indexOf(";");
            var districtAnnouncement = tStr.substring(searchStr.length, end);
            Ti.API.info(districtAnnouncement);
            $.districtAnnouncementsLabel.text = "District Announcement:\n" + districtAnnouncement;
        } else {
            Ti.API.info("Unexpected HTTP response: " + this.status);
            alert("Unexpected HTTP response: " + this.status);
        }
    };
    xhr.onerror = function(e) {
        Ti.API.debug(e.error);
        alert("error");
    };
    xhr.open("GET", "http://www.sbschools.org");
    xhr.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;