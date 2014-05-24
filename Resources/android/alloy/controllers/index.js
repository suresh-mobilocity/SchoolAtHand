function Controller() {
    function sendFeedback() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "School@Hand user feedback";
        emailDialog.toRecipients = [ "mobilocityinc@gmail.com" ];
        emailDialog.open();
    }
    function displayHelp() {}
    function displayAboutSH(e) {
        e.open(Alloy.createController("AboutSHApp", {
            parentTab: e
        }).getView());
    }
    function ReferToFriend() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "Try School@Hand Mobile App I like it";
        emailDialog.messageBody = "Hello , \nI am using School@Hand Android App. I thought it would be useful to you too. \nYou can download School@Hand by clicking this link. \n https://play.google.com/store/apps/details?id=com.mobilocity.schoolathand\n";
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
            if (notificationCount > 0) while (notificationCount > rowId && 2 > rowId) {
                var datetime = notificationCollection.at(rowId).get("datetime");
                var message = notificationCollection.at(rowId).get("message");
                var notificationIcon = Ti.UI.createImageView({
                    left: 5,
                    image: "/images/push_msg_icon.png",
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
        JSON.parse('{ "address1": "341 black horse lane", "city": "North Brunswick", "name": "district office" }');
        var distPhone = Ti.UI.createButton({
            top: "5%",
            left: 0,
            color: "white",
            backgroundColor: "#33B5E5",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.phone,
            textAlign: "center",
            data: getDistrictPhone()
        });
        distPhone.addEventListener("click", function(e) {
            Ti.Platform.openURL("tel:" + e.source.data);
        });
        var distWeb = Ti.UI.createButton({
            top: "5%",
            left: "5%",
            color: "white",
            backgroundColor: "#33B5E5",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.globe_alt,
            textAlign: "center",
            data: getDistrictWebSiteUrl()
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
            left: "5%",
            backgroundColor: "#33B5E5",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            font: {
                fontFamily: "AppIcons",
                fontSize: "40dp"
            },
            title: Alloy.Globals.icons.direction,
            textAlign: "center",
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
                for (var i = 0; e.files.length > i; i++) e.files[i];
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
            backgroundColor: "white",
            borderRadius: 8
        });
        var numberOfProfiles = profileCollection.length;
        if (numberOfProfiles > 0) {
            Ti.App.Properties.hasProperty("noUserProfilesLabelSet") && Ti.App.Properties.removeProperty("noUserProfilesLabelSet");
            var rowId = 0;
            while (profileCollection.length > rowId) {
                var pSelected = profileCollection.at(rowId);
                var profileid = pSelected.get("profile_id");
                var url = pSelected.get("url");
                var profileView = Ti.UI.createView({
                    top: 5,
                    left: 5,
                    layout: "vertical",
                    backgroundColor: "#33B5E5",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    borderRadius: 8,
                    id: profileid
                });
                var profileImage = Ti.UI.createImageView({
                    top: 5,
                    height: 100,
                    width: 100,
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
                backgroundColor: "#33B5E5",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                borderRadius: 8,
                id: profileid
            });
            var profileImage = Ti.UI.createButton({
                top: 5,
                height: 100,
                width: 100,
                title: "Add Profile",
                backgroundColor: "gray"
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
            scrollView.add(noprofileView);
            $.dashboardMainView.add(scrollView);
            Ti.App.Properties.setString("noUserProfilesLabelSet", "true");
            noProfileLabel = true;
        }
        Ti.App.Properties.hasProperty("ACS-StoredSessionId") && null != Ti.App.Properties.getString("ACS-StoredSessionId") ? Cloud.Users.showMe(function(e) {
            if (e.success) {
                e.users[0];
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
        CloudPush.showTrayNotification = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.focusAppOnPush = false;
        CloudPush.showAppOnTrayClick = true;
        CloudPush.addEventListener("callback", function(evt) {
            JSON.stringify(evt);
            var payload = JSON.parse(evt.payload).android;
            var notificationModel = Alloy.createModel("notification", {
                datetime: new Date().toLocaleString(),
                title: payload.title,
                message: payload.alert,
                badge: payload.badge
            });
            notificationModel.save();
            notificationCollection.fetch();
            notificationCollection.trigger("change");
            notificationCollection.trigger("sync");
        });
        CloudPush.addEventListener("trayClickLaunchedApp", function() {});
        CloudPush.addEventListener("trayClickFocusedApp", function() {});
    }
    function closeMenuWindow() {
        $.dashboardMain.animate({
            left: 0,
            duration: 200
        });
        if (true == isMenuWindowOpen) {
            $.tabGroup.remove(menuWindow);
            isMenuWindowOpen = false;
        }
    }
    function destroy() {
        $.dashboardMain.removeEventListener("close", destroy);
        $.destroy();
        $.dashboardMain.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId91 = [];
    $.__views.dashboardMain = Ti.UI.createWindow({
        backgroundColor: "#000",
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
        title: "Home"
    });
    __alloyId91.push($.__views.dashboardTab);
    $.__views.__alloyId92 = Alloy.createController("DistrictTab", {
        id: "__alloyId92"
    });
    __alloyId91.push($.__views.__alloyId92.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId93 = Alloy.createController("SchoolsTab", {
        id: "__alloyId93"
    });
    __alloyId91.push($.__views.__alloyId93.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId95 = Alloy.createController("MyProfiles", {
        id: "__alloyId95"
    });
    __alloyId91.push($.__views.__alloyId95.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId96 = Alloy.createController("ResourcesTab", {
        id: "__alloyId96"
    });
    __alloyId91.push($.__views.__alloyId96.getViewEx({
        recurse: true
    }));
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId91,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    menuOptionsTable.addEventListener("click", function(menuOptionsEvent) {
        var activeTab = $.tabGroup.getActiveTab();
        var currWin = activeTab.getWindow();
        currWin.animate({
            left: 0,
            duration: 200
        });
        $.tabGroup.remove(menuWindow);
        isMenuWindowOpen = false;
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
            displayHelp();
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
        var activity = $.tabGroup.activity;
        if (Alloy.Globals.Android.Api >= 11) {
            activity.actionBar.title = "School@Hand";
            activity.actionBar.displayHomeAsUp = true;
            activity.actionBar.onHomeIconItemSelected = function() {};
            activity.onCreateOptionsMenu = function(e) {
                var menuItem = e.menu.add({
                    icon: "images/action_settings.png",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW | Ti.Android.SHOW_AS_ACTION_ALWAYS
                });
                menuItem.addEventListener("click", function() {
                    Ti.API.info("In menuItem event listener");
                    if (true == isMenuWindowOpen) {
                        var tabs = $.tabGroup.getTabs();
                        for (var i = 0; tabs.length > i; i++) tabs[i].getWindow().animate({
                            left: 0,
                            duration: 100
                        });
                        var activeTab = $.tabGroup.getActiveTab();
                        var currWin = activeTab.getWindow();
                        currWin.animate({
                            left: 0,
                            duration: 200
                        });
                        $.tabGroup.remove(menuWindow);
                        isMenuWindowOpen = false;
                    } else {
                        loginLabel = Ti.App.Properties.getBool("LoggedIn") ? "SignOut" : "SignIn";
                        var activeTab = $.tabGroup.getActiveTab();
                        var currWin = activeTab.getWindow();
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
                        menuView.add(menuOptionsTable);
                        menuWindow.add(menuView);
                        $.tabGroup.add(menuWindow);
                        currWin.animate({
                            left: 150,
                            duration: 400
                        });
                        menuWindow.show();
                        isMenuWindowOpen = true;
                    }
                });
            };
        }
    });
    $.dashboardMain.addEventListener("open", function() {
        Ti.App.Properties.hasProperty("AppDisclaimerAccepted") && "false" != Ti.App.Properties.getString("AppDisclaimerAccepted") || displayDisclaimer();
        if ("true" == Ti.App.Properties.getString("AppDisclaimerAccepted")) {
            Ti.App.Properties.hasProperty("UserSchoolDistrict") || selectSchoolDistrict();
            if (Ti.App.Properties.hasProperty("UserSchoolDistrict") && Ti.App.Properties.hasProperty("dbinstalled") && checkandupdateDb()) {
                isTabsDisabledTabs && $.tabGroup.remove(disableTabsImage);
                openDashboard();
            }
        }
    });
    $.dashboardMain.addEventListener("focus", function() {
        var numberOfProfiles = profileCollection.length;
        Ti.App.Properties.hasProperty("noUserProfilesLabelSet") && numberOfProfiles > 0 && openDashboard();
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
        var activity = Ti.Android.currentActivity;
        activity.finish();
    });
    tabGroupGlobalReference = $.tabGroup;
    $.tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;