function Controller() {
    function getEventsFromDistrictCalendar(school) {
        var sql = "SELECT shortname from schools where name = '" + school + "'";
        var sqlRS = schoolDB.execute(sql);
        var scode = null;
        var eventList = "This Week Events:\n";
        if (sqlRS.getRowCount() > 0 && sqlRS.isValidRow()) {
            scode = sqlRS.fieldByName("shortname");
            sqlRS.close();
        }
        var eventsQuery = "SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '" + scode.toUpperCase() + "' " + " and eventdate between date('now') and date('now', '+7 day')" + " UNION SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like ''" + " and eventdate between date('now') and date('now', '+7 day')" + " order by 1";
        Ti.API.info("eventsQuery: " + eventsQuery);
        var eventResults = schoolDB.execute(eventsQuery);
        if (eventResults.getRowCount() > 0) {
            while (eventResults.isValidRow()) {
                var eventDate = eventResults.fieldByName("eventdate");
                var eventDesc = eventResults.fieldByName("eventdescription");
                var weekday = dayNames[eventResults.fieldByName("weekday")];
                eventList = eventList + weekday + " " + eventDate + "--" + eventDesc + "\n";
                eventResults.next();
            }
            eventResults.close();
        }
        return eventList;
    }
    function getTeacherContacts() {
        var contactsQuery = "SELECT phonenum, emailaddr FROM contacts where name like '%" + teacherName + "%'" + " AND building like '" + school + "%'";
        Ti.API.info("contacts: " + contactsQuery);
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.myProfile = Alloy.createModel("profile");
    $.__views.MyDashboardWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "MyDashboardWindow",
        title: "Dashboard"
    });
    $.__views.MyDashboardWindow && $.addTopLevelView($.__views.MyDashboardWindow);
    $.__views.drawer = Alloy.createWidget("com.appcelerator.drawer", "widget", {
        id: "drawer",
        __parentSymbol: $.__views.MyDashboardWindow
    });
    $.__views.drawer.setParent($.__views.MyDashboardWindow);
    $.__views.mainView = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        width: Ti.UI.SIZE,
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
        textAlign: "Ti.UI.TEXT_ALIGNMENT_RIGHT",
        verticalAlign: "TEXT_VERTICAL_ALIGNMENT_TOP",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "blue",
        left: 50,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "profileDetailsLabel"
    });
    $.__views.profileView.add($.__views.profileDetailsLabel);
    $.__views.teacherView = Ti.UI.createView({
        id: "teacherView",
        layout: "vertical",
        left: "50",
        top: "2",
        width: Ti.UI.FILL,
        height: "50"
    });
    $.__views.mainView.add($.__views.teacherView);
    var __alloyId35 = [];
    var __alloyId36 = {
        title: "Call",
        ns: "Alloy.Abstract"
    };
    __alloyId35.push(__alloyId36);
    var __alloyId37 = {
        title: "Email",
        ns: "Alloy.Abstract"
    };
    __alloyId35.push(__alloyId37);
    $.__views.contactTeacher = Ti.UI.createButtonBar({
        backgroundColor: "#336699",
        top: 2,
        height: 25,
        width: 150,
        style: "Titanium.UI.iPhone.SystemButtonStyle.BAR",
        labels: __alloyId35,
        id: "contactTeacher"
    });
    $.__views.teacherView.add($.__views.contactTeacher);
    var __alloyId39 = [];
    var __alloyId44 = {
        title: "Events",
        ns: "Alloy.Abstract"
    };
    __alloyId39.push(__alloyId44);
    var __alloyId45 = {
        title: "Fri.Folder",
        ns: "Alloy.Abstract"
    };
    __alloyId39.push(__alloyId45);
    var __alloyId46 = {
        title: "Lunch",
        ns: "Alloy.Abstract"
    };
    __alloyId39.push(__alloyId46);
    var __alloyId47 = {
        title: "Sports",
        ns: "Alloy.Abstract"
    };
    __alloyId39.push(__alloyId47);
    $.__views.contentButtonBar = Ti.UI.createButtonBar({
        backgroundColor: "maroon",
        top: 5,
        height: 25,
        width: 300,
        style: "Titanium.UI.iPhone.SystemButtonStyle.BAR",
        font: {
            fontSize: 16,
            fontWeight: "normal"
        },
        color: "blue",
        labels: __alloyId39,
        id: "contentButtonBar"
    });
    $.__views.mainView.add($.__views.contentButtonBar);
    $.__views.contentsScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        scrollType: "vertical",
        showVerticalScrollIndicator: true,
        left: "2%",
        right: "2%",
        height: 150,
        width: Ti.UI.FILL,
        id: "contentsScrollView"
    });
    $.__views.mainView.add($.__views.contentsScrollView);
    $.__views.contentsView = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        id: "contentsView"
    });
    $.__views.contentsScrollView.add($.__views.contentsView);
    $.__views.contentsViewLabel = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            fontWeight: "normal"
        },
        color: "blue",
        textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
        verticalAlign: "Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP",
        id: "contentsViewLabel"
    });
    $.__views.contentsView.add($.__views.contentsViewLabel);
    $.__views.announcementsScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: 5,
        left: "2%",
        right: "2%",
        height: 100,
        scrollType: "vertical",
        showVerticalScrollIndicator: true,
        width: Ti.UI.FILL,
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
    Ti.API.info("Entered into MyDashboard, about to install db");
    args.parentTab;
    args.tabToNavigateBack;
    args.windowToNavigate;
    var teacherPhoneno = null;
    var teacherEmailAddr = null;
    var myProfile = args.data;
    var school = myProfile.get("school");
    var grade = myProfile.get("grade");
    var teacherName = myProfile.get("teacher");
    $.profileDetailsLabel.text = myProfile.get("name") + "\n" + grade + "\n" + school + "\n" + "Teacher: " + teacherName;
    var eventsList = getEventsFromDistrictCalendar(school);
    $.contentsViewLabel.text = eventsList;
    $.profileImage.image = myProfile.get("url");
    Ti.API.info("URL for the profile:" + myProfile.get("url"));
    1 == profileCollection.length && ($.MyDashboardWindow.backButtonTitle = "");
    $.drawer.init({
        mainWindow: $.index,
        buttons: [ {
            id: "One",
            title: "One",
            click: function() {
                alert("One");
            }
        }, {
            id: "Two",
            title: "Two",
            click: function() {
                alert("Two");
            }
        }, {
            id: "Three",
            title: "Three",
            click: function() {
                alert("Three");
            }
        } ],
        autoClose: true,
        gutter: 5
    });
    $.contentButtonBar.addEventListener("click", function(e) {
        if (1 == e.index) {
            $.contentsViewLabel.text = "";
            $.contentsViewLabel.text = "Friday Folder Coming Soon!";
        } else if (2 == e.index) {
            $.contentsViewLabel.text = "";
            $.contentsViewLabel.text = "Lunch Menu Coming Soon!";
        } else if (3 == e.index) {
            $.contentsViewLabel.text = "";
            $.contentsViewLabel.text = "Sports Events Coming Soon!";
        }
        if (0 == e.index) {
            $.contentsViewLabel.text = "";
            $.contentsViewLabel.text = eventsList;
        }
    });
    $.contactTeacher.addEventListener("click", function(e) {
        if (0 == e.index) {
            null == teacherPhoneno && getTeacherContacts();
            if (null == teacherPhoneno) {
                alert("Could not find teacher's phone number in contacts");
                return;
            }
            var phoneno = teacherPhoneno.replace(/[^0-9]/g, "");
            Ti.Platform.openURL("tel:" + phoneno);
        } else if (1 == e.index) {
            null == teacherEmailAddr && getTeacherContacts();
            if (null == teacherPhoneno) {
                alert("Could not find teacher's email address in contacts");
                return;
            }
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Hello";
            emailDialog.toRecipients = [ teacherEmailAddr ];
            emailDialog.open();
        }
    });
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function() {
        if (200 === this.status) {
            httpResponse = this.responseText;
            var searchStr = "havemsg=";
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