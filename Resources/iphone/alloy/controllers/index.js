function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function sendFeedback() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "School@Hand user feedback";
        emailDialog.toRecipients = [ "mobilocityinc@gmail.com" ];
        emailDialog.open();
    }
    function displayHelp(e) {
        var args_t = {
            parentTab: e,
            wintitle: "User Guide",
            url: "/help_ios.html"
        };
        e.open(Alloy.createController("ViewWebSite", args_t).getView());
    }
    function displayAboutSH(e) {
        e.open(Alloy.createController("AboutSHApp", {
            parentTab: e
        }).getView());
    }
    function ReferToFriend() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Try School@Hand Mobile App I like it";
        emailDialog.open();
    }
    function displayOptions(e) {
        e.open(Alloy.createController("ChangeSettings", {
            parentTab: e
        }).getView());
    }
    function getDistrictPhone() {
        var phoneno = "";
        var sqlQuery = "SELECT value FROM enum where name like 'phoneno'";
        var sqlRS = schoolDB.execute(sqlQuery);
        sqlRS.getRowCount() > 0 && sqlRS.isValidRow() && (phoneno = sqlRS.fieldByName("value"));
        sqlRS.close();
        return phoneno;
    }
    function getDistrictWebSiteUrl() {
        var url = "";
        var sqlQuery = "SELECT value FROM enum where name like 'website'";
        var sqlRS = schoolDB.execute(sqlQuery);
        sqlRS.getRowCount() > 0 && sqlRS.isValidRow() && (url = sqlRS.fieldByName("value"));
        sqlRS.close();
        return url;
    }
    function getDistOfficeLocation() {
        var location = "";
        var sqlQuery = "SELECT value FROM enum where name like 'location'";
        var sqlRS = schoolDB.execute(sqlQuery);
        sqlRS.getRowCount() > 0 && sqlRS.isValidRow() && (location = sqlRS.fieldByName("value"));
        sqlRS.close();
        return location;
    }
    function getNotificationsView() {
        var rowId = 0;
        var recentNotificationsView = Ti.UI.createView({
            layout: "vertical",
            top: "63%",
            height: "35%",
            width: "95%",
            backgroundColor: "#33B5E5",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 8
        });
        notificationCollection.fetch({
            query: "SELECT * FROM notifications ORDER BY notificationid desc"
        });
        var notificationCount = notificationCollection.length;
        var headerView = Ti.UI.createView({
            layout: "horizontal",
            left: 0,
            height: Ti.UI.SIZE,
            width: "100%",
            borderColor: "white",
            borderSize: 1,
            borderRadius: 8
        });
        var countLabel = Ti.UI.createLabel({
            top: 2,
            left: "1%",
            text: notificationCount,
            font: {
                fontSize: 16,
                fontWeight: "bold"
            },
            height: 30,
            width: "10%",
            backgroundColor: "orange",
            borderRadius: 8,
            color: "white",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        var headerLabel = Ti.UI.createLabel({
            top: 2,
            left: "2%",
            text: "Recent Notifications",
            font: {
                fontSize: 16,
                fontWeight: "bold"
            },
            height: 30,
            width: "70%",
            color: "white",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        var notificationCenterButton = Ti.UI.createButton({
            top: 2,
            left: "2%",
            title: "more",
            font: {
                fontSize: 16,
                fontWeight: "bold"
            },
            height: 30,
            width: "14%",
            backgroundColor: "orange",
            borderRadius: 8,
            color: "white",
            style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : "",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        notificationCenterButton.addEventListener("click", function() {
            $.dashboardTab.open(Alloy.createController("Notifications", {
                parentTab: $.dashboardTab
            }).getView());
        });
        headerView.add(countLabel);
        headerView.add(headerLabel);
        headerView.add(notificationCenterButton);
        recentNotificationsView.add(headerView);
        if (Ti.App.Properties.hasProperty("ACSDeviceToken")) {
            if (notificationCount > 0) {
                while (notificationCount > rowId && 2 > rowId) {
                    var datetime = notificationCollection.at(rowId).get("datetime");
                    var message = notificationCollection.at(rowId).get("message");
                    var notificationIcon = Ti.UI.createImageView({
                        left: 5,
                        image: "images/push_msg_icon.png",
                        height: 32,
                        width: 32
                    });
                    var messageView = Ti.UI.createView({
                        height: Ti.UI.SIZE,
                        width: Ti.UI.FILL,
                        borderColor: "white",
                        borderWidth: 1
                    });
                    var datetimeLabel = Ti.UI.createLabel({
                        top: 0,
                        left: 50,
                        text: datetime,
                        font: {
                            fontSize: 14,
                            fontWeight: "normal"
                        },
                        height: 30,
                        width: Ti.UI.SIZE,
                        color: "blue",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
                    });
                    var messageLabel = Ti.UI.createLabel({
                        top: 32,
                        left: 50,
                        text: message,
                        font: {
                            fontSize: 14,
                            fontWeight: "normal"
                        },
                        height: 30,
                        width: Ti.UI.SIZE,
                        color: "blue",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
                    });
                    messageView.add(notificationIcon);
                    messageView.add(datetimeLabel);
                    messageView.add(messageLabel);
                    recentNotificationsView.add(messageView);
                    rowId++;
                }
                recentNotificationsView.addEventListener("click", function() {
                    $.dashboardTab.open(Alloy.createController("Notifications", {
                        parentTab: $.dashboardTab
                    }).getView());
                });
            }
        } else {
            recentNotificationsView.add(notRegisteredLabel);
            var signupButton = Ti.UI.createButton({
                top: 5,
                left: "80%",
                title: "SignIn",
                font: {
                    fontSize: 12,
                    fontWeight: "bold"
                },
                height: 30,
                width: 50,
                backgroundColor: "orange",
                borderRadius: 8,
                color: "white",
                style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : "",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            signupButton.addEventListener("click", function() {
                $.dashboardTab.open(Alloy.createController("login_form", {
                    parentTab: $.dashboardTab
                }).getView());
            });
            recentNotificationsView.add(signupButton);
        }
        return recentNotificationsView;
    }
    function getDistrictQuickView() {
        var distSticker = Ti.UI.createView({
            layout: "vertical",
            top: "2%",
            height: "28%",
            width: "62%",
            left: "2%",
            backgroundColor: "#33B5E5"
        });
        var welcomeLabel = Ti.UI.createLabel({
            text: "Welcome !",
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            left: "2%",
            top: 0,
            color: "orange"
        });
        var distName = Ti.UI.createLabel({
            top: "1%",
            left: "2%",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            color: "white",
            font: {
                fontSize: 14,
                fontWeight: "normal"
            },
            text: Ti.App.Properties.getString("UserSchoolDistrict") + " Schools.",
            borderRadius: 8
        });
        var iconsSticker = Ti.UI.createView({
            left: 0,
            layout: "horizontal",
            height: Ti.UI.SIZE,
            width: "100%"
        });
        var distPhone = Ti.UI.createButton({
            top: "5%",
            left: "5%",
            color: "white",
            backgroundColor: "orange",
            width: 40,
            height: 40,
            borderRadius: 8,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.phone,
            textAlign: "center",
            data: getDistrictPhone(),
            style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : ""
        });
        distPhone.addEventListener("click", function(e) {
            Ti.Platform.openURL("tel:" + e.source.data);
        });
        var distWeb = Ti.UI.createButton({
            top: "5%",
            left: "15%",
            color: "white",
            backgroundColor: "orange",
            width: 40,
            height: 40,
            borderRadius: 8,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.globe_alt,
            textAlign: "center",
            data: getDistrictWebSiteUrl(),
            style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : ""
        });
        distWeb.addEventListener("click", function(e) {
            var args_t = {
                parentTab: $.dasboardTab,
                wintitle: "District Web Site",
                url: e.source.data
            };
            $.dashboardTab.open(Alloy.createController("ViewWebSite", args_t).getView());
        });
        var distLocationButton = Ti.UI.createButton({
            top: "5%",
            bottom: "2%",
            color: "white",
            left: "15%",
            backgroundColor: "orange",
            borderRadius: 8,
            width: 40,
            height: 40,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.direction,
            textAlign: "center",
            style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : "",
            data: JSON.parse(getDistOfficeLocation())
        });
        distLocationButton.addEventListener("click", function(e) {
            var mapController = Alloy.createController("MapDetail", {
                data: e.source.data
            });
            $.dashboardTab.open(mapController.getView());
        });
        iconsSticker.add(distPhone);
        iconsSticker.add(distWeb);
        iconsSticker.add(distLocationButton);
        distSticker.add(welcomeLabel);
        distSticker.add(distName);
        distSticker.add(iconsSticker);
        return distSticker;
    }
    function getWeatherView() {
        var cityandstate = Ti.App.Properties.getString("UserSchoolDistrict");
        var splitStr = cityandstate.split(" - ");
        var city = splitStr[0];
        var state = splitStr[1];
        var weatherController = require("weatherview");
        var weatherView = weatherController.fillWeatherReport(city, state);
        return weatherView;
    }
    function selectSchoolDistrict() {
        $.dashboardTab.open(Alloy.createController("SelectSchoolDistrict", {
            parentTab: $.dashboardTab
        }).getView());
    }
    function displayDisclaimer() {
        $.tabGroup.add(disableTabsImage);
        isTabsDisabledTabs = true;
        $.dashboardTab.open(Alloy.createController("AppDisclaimer", {
            parentTab: $.dashboardTab
        }).getView());
    }
    function displayDisclaimerSigned(e) {
        e.open(Alloy.createController("AppDisclaimerSigned", {
            parentTab: e
        }).getView());
    }
    function checkandupdateDb() {
        var installedDbname = Ti.App.Properties.getString("dbname");
        Ti.App.Properties.getString("dbversion");
        var updateDBProgress = null;
        schoolDB || (schoolDB = Ti.Database.open("schoolDBDownloaded"));
        Cloud.Files.query({
            where: {
                name: installedDbname
            }
        }, function(e) {
            if (e.success) {
                for (var i = 0; i < e.files.length; i++) {
                    e.files[i];
                }
                if (Ti.App.Properties.getString("dbversion") == e.files[0].updated_at) ; else {
                    updateDBProgress = Alloy.createController("ProgressIndicator", {
                        message: "Checking for updates.."
                    }).getView();
                    updateDBProgress.open();
                    var databaseDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "databases");
                    databaseDir.exists() || databaseDir.createDirectory();
                    var databaseFile = Ti.Filesystem.getFile(databaseDir.resolve(), "schooldatabase.sqlite");
                    var xhr = Ti.Network.createHTTPClient();
                    xhr.onload = function() {
                        databaseFile.write(this.responseData);
                        updateDBProgress.fireEvent("close");
                        schoolDB && schoolDB.remove();
                        schoolDB = Ti.Database.install(databaseFile.getNativePath(), "schoolDBDownloaded");
                        Ti.App.Properties.setString("dbversion", e.files[0].updated_at);
                        updateContacts();
                        updateSchools();
                        databaseFile.deleteFile();
                    };
                    xhr.open("GET", e.files[0].url);
                    xhr.send();
                }
            }
        });
        updateDBProgress = null;
        return true;
    }
    function logOut() {
        Cloud.Users.logout(function(e) {
            if (e.success) {
                $.dashboardMainView.removeAllChildren();
                noProfileLabel && (noProfileLabel = false);
                $.dashboardMain.fireEvent("open");
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function openDashboard() {
        $.dashboardMainView.removeAllChildren();
        $.dashboardMainView.add(getDistrictQuickView());
        $.dashboardMainView.add(getWeatherView());
        var scrollView = Titanium.UI.createScrollView({
            layout: "horizontal",
            contentWidth: "auto",
            contentHeight: "auto",
            horizontalWrap: false,
            showVerticalScrollIndicator: false,
            showHorizontalScrollIndicator: true,
            top: "30%",
            height: "30%",
            width: "95%",
            backgroundColor: "transparent",
            borderRadius: 8
        });
        var numberOfProfiles = profileCollection.length;
        if (numberOfProfiles > 0) {
            Ti.App.Properties.hasProperty("noUserProfilesLabelSet") && Ti.App.Properties.removeProperty("noUserProfilesLabelSet");
            var rowId = 0;
            while (rowId < profileCollection.length) {
                var pSelected = profileCollection.at(rowId);
                var profileid = pSelected.get("profile_id");
                var url = pSelected.get("url");
                var profileView = Ti.UI.createView({
                    top: 5,
                    left: 5,
                    layout: "vertical",
                    backgroundColor: "white",
                    height: Ti.UI.SIZE,
                    width: 480 == Ti.Platform.displayCaps.platformHeight ? 90 : 110,
                    borderRadius: 8,
                    id: profileid
                });
                var profileImage = Ti.UI.createImageView({
                    top: 5,
                    height: 480 == Ti.Platform.displayCaps.platformHeight ? 80 : 100,
                    width: 480 == Ti.Platform.displayCaps.platformHeight ? 80 : 100,
                    image: url,
                    autorotate: true,
                    id: profileid
                });
                var profileName = Ti.UI.createLabel({
                    top: 5,
                    text: pSelected.get("name"),
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    color: "orange"
                });
                profileView.add(profileImage);
                profileView.add(profileName);
                profileImage.addEventListener("click", function(e) {
                    var detailController = Alloy.createController("MyDashboard", {
                        parentTab: $.dashboardTab,
                        $model: e.source.id,
                        data: profileCollection.get(e.source.id)
                    });
                    $.dashboardTab.open(detailController.getView());
                });
                scrollView.add(profileView);
                rowId++;
            }
            $.dashboardMainView.add(scrollView);
        } else if (false == noProfileLabel) {
            var noprofileView = Ti.UI.createView({
                top: 5,
                left: 5,
                layout: "vertical",
                backgroundColor: "white",
                height: Ti.UI.SIZE,
                width: 480 == Ti.Platform.displayCaps.platformHeight ? 90 : 110,
                borderRadius: 8,
                id: profileid
            });
            var profileImage = Ti.UI.createButton({
                top: 5,
                height: 480 == Ti.Platform.displayCaps.platformHeight ? 80 : 100,
                width: 480 == Ti.Platform.displayCaps.platformHeight ? 80 : 100,
                title: "Add Profile",
                font: true && 480 == Ti.Platform.displayCaps.platformHeight ? {
                    fontSize: 12,
                    fontWeight: "normal"
                } : {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                backgroundColor: "gray",
                style: true && 480 == Ti.Platform.displayCaps.platformHeight ? Ti.UI.iPhone.SystemButtonStyle.PLAIN : ""
            });
            var profileName = Ti.UI.createLabel({
                top: 5,
                text: "Name",
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                color: "orange"
            });
            profileImage.addEventListener("click", function() {
                $.dashboardTab.open(Alloy.createController("AddProfile", $.dashboardTab).getView());
            });
            noprofileView.add(profileImage);
            noprofileView.add(profileName);
            var hintView = Ti.UI.createView({
                top: 5,
                left: 10,
                layout: "vertical",
                height: 100,
                width: Ti.UI.SIZE,
                borderRadius: 8,
                id: profileid
            });
            var hintLabel = Ti.UI.createLabel({
                top: 5,
                text: "Profiles help to view events and links specific to a student's class. All data is saved locally on your device",
                font: {
                    fontSize: 12,
                    fontWeight: "normal"
                },
                height: Ti.UI.SIZE,
                width: 180,
                color: "black"
            });
            hintView.add(hintLabel);
            scrollView.add(noprofileView);
            scrollView.add(hintView);
            $.dashboardMainView.add(scrollView);
            Ti.App.Properties.setString("noUserProfilesLabelSet", "true");
        }
        Ti.App.Properties.hasProperty("ACS-StoredSessionId") && null != Ti.App.Properties.getString("ACS-StoredSessionId") ? Cloud.Users.showMe(function(e) {
            if (e.success) {
                {
                    e.users[0];
                }
                Ti.App.Properties.setBool("LoggedIn", true);
            } else Ti.App.Properties.setBool("LoggedIn", false);
        }) : Ti.App.Properties.setBool("LoggedIn", false);
        $.dashboardMainView.add(getNotificationsView());
        $.dashboardMain.setVisible(true);
    }
    function updateContacts() {
        var sql = "SELECT * FROM contacts";
        Alloy.Globals.contacts.deleteAll();
        var tmpRS = schoolDB.execute(sql);
        if (tmpRS.getRowCount() > 0) {
            while (tmpRS.isValidRow()) {
                var fid = tmpRS.fieldByName("id");
                var fname = tmpRS.fieldByName("name");
                var ftitle = tmpRS.fieldByName("title");
                var fdepartment = tmpRS.fieldByName("department");
                var fbuilding = tmpRS.fieldByName("building");
                var fphonenum = tmpRS.fieldByName("phonenum");
                var fext = tmpRS.fieldByName("ext");
                var femailaddr = tmpRS.fieldByName("emailaddr");
                var newContact = Alloy.createModel("contacts", {
                    id: fid,
                    name: fname,
                    title: ftitle,
                    department: fdepartment,
                    building: fbuilding,
                    phonenum: fphonenum,
                    ext: fext,
                    emailaddr: femailaddr
                });
                Alloy.Globals.contacts.add(newContact);
                tmpRS.next();
            }
            tmpRS.close();
            Alloy.Globals.contacts.saveAll();
        }
    }
    function updateSchools() {
        var sql = "SELECT * FROM schools";
        Alloy.Globals.school.config.columns;
        Alloy.Globals.school.deleteAll();
        var tmpRS = schoolDB.execute(sql);
        if (tmpRS.getRowCount() > 0) {
            while (tmpRS.isValidRow()) {
                var newSchool = Alloy.createModel("school", {
                    earlyreleasehours: tmpRS.fieldByName("earlyreleasehours"),
                    delayedhours: tmpRS.fieldByName("delayedhours"),
                    regularhours: tmpRS.fieldByName("regularhours"),
                    name: tmpRS.fieldByName("name"),
                    shortname: tmpRS.fieldByName("shortname"),
                    type: tmpRS.fieldByName("type"),
                    principal: tmpRS.fieldByName("principal"),
                    principal_emailaddr: tmpRS.fieldByName("principal_emailaddr"),
                    assistantprincipal: tmpRS.fieldByName("assistantprincipal"),
                    assistantprincipal_emailaddr: tmpRS.fieldByName("assistantprincipal_emailaddr"),
                    antibullyingspecialist: tmpRS.fieldByName("antibullyingspecialist"),
                    antibullyingspecialist_emailaddr: tmpRS.fieldByName("antibullyingspecialist_emailaddr"),
                    websiteurl: tmpRS.fieldByName("websiteurl"),
                    imagefile: tmpRS.fieldByName("imagefile"),
                    logofile: tmpRS.fieldByName("logofile"),
                    address1: tmpRS.fieldByName("address1"),
                    address2: tmpRS.fieldByName("address2"),
                    city: tmpRS.fieldByName("city"),
                    state: tmpRS.fieldByName("state"),
                    zipcode: tmpRS.fieldByName("zipcode"),
                    phone: tmpRS.fieldByName("phone"),
                    fax: tmpRS.fieldByName("fax"),
                    longitude: tmpRS.fieldByName("longitude"),
                    latitude: tmpRS.fieldByName("latitude"),
                    id: tmpRS.fieldByName("id")
                });
                Alloy.Globals.school.add(newSchool);
                tmpRS.next();
            }
            tmpRS.close();
            Alloy.Globals.school.saveAll();
        }
    }
    function registerNotificationCallbacks() {
        Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: function(e) {
                deviceToken = e.deviceToken;
                Ti.App.Properties.setString("ACSDeviceToken", e.deviceToken);
            },
            error: function(e) {
                alert("Failed to register for push notifications! " + e.error);
            },
            callback: function(evt) {
                alert("Received push: in index.js" + JSON.stringify(evt));
                var notificationModel = Alloy.createModel("notification", {
                    datetime: new Date().toLocaleString(),
                    title: evt.data.title,
                    message: evt.data.alert,
                    badge: evt.data.badge
                });
                notificationModel.save();
                notificationCollection.fetch();
                notificationCollection.trigger("change");
                notificationCollection.trigger("sync");
            }
        });
    }
    function closeMenuWindow() {}
    function destroy() {
        $.dashboardMain.removeEventListener("close", destroy);
        $.destroy();
        $.dashboardMain.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId104 = [];
    $.__views.dashboardMain = Ti.UI.createWindow({
        backgroundColor: "#33B5E5",
        id: "dashboardMain",
        title: "Dashboard"
    });
    $.__views.dashboardMainView = Ti.UI.createView({
        id: "dashboardMainView",
        backgroundColor: "#33B5E5"
    });
    $.__views.dashboardMain.add($.__views.dashboardMainView);
    $.__views.dashboardTab = Ti.UI.createTab({
        window: $.__views.dashboardMain,
        id: "dashboardTab",
        title: "Home",
        icon: "home.png"
    });
    __alloyId104.push($.__views.dashboardTab);
    $.__views.__alloyId105 = Alloy.createController("DistrictTab", {
        id: "__alloyId105"
    });
    __alloyId104.push($.__views.__alloyId105.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId106 = Alloy.createController("SchoolsTab", {
        id: "__alloyId106"
    });
    __alloyId104.push($.__views.__alloyId106.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId108 = Alloy.createController("MyProfiles", {
        id: "__alloyId108"
    });
    __alloyId104.push($.__views.__alloyId108.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId109 = Alloy.createController("ResourcesTab", {
        id: "__alloyId109"
    });
    __alloyId104.push($.__views.__alloyId109.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup = Ti.UI.createTabGroup({
        navBarHidden: true,
        tabs: __alloyId104,
        id: "tabGroup",
        backgroundColor: "#00FFFF"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    menuOptionsTable.addEventListener("click", function(menuOptionsEvent) {
        menuWindow.close();
        $.tabGroup.activeTab.getWindow().animate({
            left: 0,
            duration: 200,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN
        });
        isMenuWindowOpen = false;
        $.tabGroup.remove(disableTabsImage);
        switch (true) {
          case "SignIn" === menuOptionsEvent.rowData.title:
            $.tabGroup.activeTab.open(Alloy.createController("login_form", {
                parentTab: $.tabGroup.activeTab
            }).getView());
            break;

          case "SignOut" === menuOptionsEvent.rowData.title:
            logOut();
            break;

          case "Options" === menuOptionsEvent.rowData.title:
            displayOptions($.tabGroup.activeTab);
            break;

          case "Feedback" === menuOptionsEvent.rowData.title:
            sendFeedback();
            break;

          case "Help" === menuOptionsEvent.rowData.title:
            displayHelp($.tabGroup.activeTab);
            break;

          case "About" === menuOptionsEvent.rowData.title:
            displayAboutSH($.tabGroup.activeTab);
            break;

          case "Privacy Policy" === menuOptionsEvent.rowData.title:
            displayDisclaimerSigned($.tabGroup.activeTab);
            break;

          case "Refer to a friend" === menuOptionsEvent.rowData.title:
            ReferToFriend($.tabGroup.activeTab);
        }
    });
    $.tabGroup.addEventListener("open", function() {
        var menuButton = Ti.UI.createButton({
            toggle: false,
            image: "menu.png"
        });
        $.dashboardMain.setLeftNavButton(menuButton);
        menuButton.addEventListener("click", function(e) {
            if (true == isMenuWindowOpen) {
                menuWindow.close();
                $.tabGroup.activeTab.getWindow().animate({
                    left: 0,
                    duration: 100,
                    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
                });
                $.tabGroup.remove(disableTabsImage);
                e.source.toggle = false;
                isMenuWindowOpen = false;
            } else {
                $.tabGroup.activeTab.getWindow().animate({
                    left: "60%",
                    duration: 100,
                    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
                });
                $.tabGroup.add(disableTabsImage);
                var menuOptions = [ {
                    title: loginLabel,
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "Options",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "Privacy Policy",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "Help",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "Feedback",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "About",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                }, {
                    title: "Refer to a friend",
                    height: 50,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black"
                } ];
                menuOptionsTable.data = menuOptions;
                menuWindow.add(menuOptionsTable);
                menuWindow.open();
                e.source.toggle = true;
                isMenuWindowOpen = true;
            }
        });
    });
    $.dashboardMain.addEventListener("open", function() {});
    $.dashboardMain.addEventListener("focus", function() {
        Ti.App.Properties.hasProperty("AppDisclaimerAccepted") && "false" != Ti.App.Properties.getString("AppDisclaimerAccepted") || displayDisclaimer();
        if ("true" == Ti.App.Properties.getString("AppDisclaimerAccepted")) {
            Ti.App.Properties.hasProperty("UserSchoolDistrict") || selectSchoolDistrict();
            if (Ti.App.Properties.hasProperty("UserSchoolDistrict") && Ti.App.Properties.hasProperty("dbinstalled") && checkandupdateDb()) {
                if (isTabsDisabledTabs) {
                    $.tabGroup.remove(disableTabsImage);
                    isTabsDisabledTabs = false;
                }
                openDashboard();
            }
        }
    });
    $.dashboardTab.addEventListener("close", function() {
        $.tabGroup.fireEvent("close");
    });
    $.dashboardTab.addEventListener("click", function() {
        closeMenuWindow();
    });
    $.dashboardTab.addEventListener("close", destroy);
    $.tabGroup.addEventListener("close", function() {});
    registerNotificationCallbacks();
    Ti.App.addEventListener("close", function() {
    });
    tabGroupGlobalReference = $.tabGroup;
    $.tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;