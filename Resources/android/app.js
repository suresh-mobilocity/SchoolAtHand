var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var osname = "android";

var isAndroid = true;

Alloy.Globals.icons = require("/ui/icons");

Alloy.Globals.right_arrow = Alloy.Globals.icons.chevron_right;

Alloy.Globals.contacts = Alloy.Collections.instance("contacts");

Alloy.Globals.school = Alloy.Collections.instance("school");

var profileCollection = Alloy.Collections.instance("profile");

var notificationCollection = Alloy.Collections.instance("notification");

var dayNames = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

var monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

var disableTabsImage = Titanium.UI.createView({
    backgroundImage: "transparent.png",
    height: 50,
    width: "100%",
    bottom: 0,
    left: 0
});

var notRegisteredLabel = Titanium.UI.createLabel({
    text: "Signup to receive notifications and updates !",
    font: {
        fontSize: 12,
        fontWeight: "normal"
    },
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    height: Ti.UI.SIZE,
    width: "90%",
    left: "10%",
    top: "20%",
    color: "black"
});

var alreadyRegisteredLabel = Titanium.UI.createLabel({
    text: "You have subscribed to recieve notifications and updates",
    font: {
        fontSize: 14,
        fontWeight: "normal"
    },
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    height: Ti.UI.SIZE,
    width: "80%",
    left: "10%",
    top: "20%",
    color: "blue"
});

var noUserProfilesLabel = Titanium.UI.createLabel({
    text: "No Student Profiles Found!. Create Student Profiles from Profiles Tab. Profiles are saved securely on the device not on the cloud.",
    font: {
        fontSize: 16,
        fontWeight: "normal"
    },
    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    height: Ti.UI.SIZE,
    width: "80%",
    left: "10%",
    top: "25%",
    color: "blue"
});

var signInButton = Titanium.UI.createButton({
    title: "Signin",
    font: {
        fontSize: 16,
        fontWeight: "bold"
    },
    width: "80%",
    left: "10%",
    top: "70%",
    backgroundColor: "#336699",
    borderRadius: 10,
    color: "white"
});

var signOutButton = Titanium.UI.createButton({
    title: "Logout",
    font: {
        fontSize: 16,
        fontWeight: "bold"
    },
    width: "80%",
    left: "10%",
    top: "70%",
    backgroundColor: "#336699",
    borderRadius: 10,
    color: "white"
});

var MapModule = require("ti.map");

var Cloud = require("ti.cloud");

var Admob = require("ti.admob");

var CloudPush = null;

isAndroid && (CloudPush = require("ti.cloudpush"));

var adMobPublisherID = "ca-app-pub-3665132116722377/2467198443";

var adMobKeywords = "kids student school books science  math toys sports parent teacher cars bikes";

isAndroid && (adMobPublisherID = "ca-app-pub-3665132116722377/6561150840");

var noProfileLabel = false;

var isTabsDisabledTabs = false;

var deviceToken = null;

var schoolDB = null;

Alloy.Globals.Android = {
    Api: Ti.Platform.Android.API_LEVEL
};

var loginLabel = "SignIn";

var menuWindow = Ti.UI.createWindow({
    fullscreen: false,
    width: "60%",
    top: 0,
    left: 0,
    height: "85%",
    color: "white",
    backgroundColor: "#B2FFFF",
    title: "Options Menu"
});

var menuOptionsTable = Ti.UI.createTableView({
    height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    left: 0,
    top: "10%",
    font: {
        fontSize: 24,
        fontWight: "bold",
        fontFamily: "Helvetica Neue"
    },
    backgroundColor: "#B2FFFF",
    separatorColor: "#000000"
});

var menuView = Titanium.UI.createView({
    backgroundColor: "#B2FFFF",
    color: "black",
    width: "60%",
    height: "100%",
    left: 0,
    top: 0
});

Ti.App.Properties.hasProperty("DisplayAds") || Ti.App.Properties.setBool("DisplayAds", true);

var isMenuWindowOpen = false;

var tabGroupGlobalReference = null;

IS_Ios7Plus = false;

IS_iPhoneTall = false;

IS_iPhone4SmallScreen = false;

Alloy.createController("index");