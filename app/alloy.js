// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var osname = Ti.Platform.osname;
var isAndroid = (OS_ANDROID) ? true : false;
Alloy.Globals.icons = require('/ui/icons');
Alloy.Globals.right_arrow = Alloy.Globals.icons.chevron_right;
//Alloy.Globals.contacts = Alloy.createCollection('contacts');
Alloy.Globals.contacts = Alloy.Collections.instance('contacts');
Alloy.Globals.school = Alloy.Collections.instance('school');
var profileCollection = Alloy.Collections.instance('profile');
var notificationCollection = Alloy.Collections.instance('notification');
var dayNames = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var monthNames = new Array('Jan','Feb','Mar','Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var disableTabsImage = Titanium.UI.createView({
    			backgroundImage:'transparent.png',
    			height:50,
    			width:'100%',
    			bottom:0,
    			left:0
			});

var notRegisteredLabel = Titanium.UI.createLabel({
					text: 'Signup to receive notifications and updates !',
					font:{fontSize:12,fontWeight:'normal'},
					textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
					height: Ti.UI.SIZE,
					width: "90%",
					left: "10%",
					top: "20%",
					color: 'black'
});
var alreadyRegisteredLabel = Titanium.UI.createLabel({
					text: 'You have subscribed to recieve notifications and updates',
					font:{fontSize:14,fontWeight:'normal'},
					textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
					height: Ti.UI.SIZE,
					width: "80%",
					left: "10%",
					top: "20%",
					color: 'blue'
});
var noUserProfilesLabel = Titanium.UI.createLabel({
					text: 'No Student Profiles Found!. Create Student Profiles from Profiles Tab. Profiles are saved securely on the device not on the cloud.',
					font:{fontSize:16,fontWeight:'normal'},
					textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
					height: Ti.UI.SIZE,
					width: "80%",
					left: "10%",
					top: "25%",
					//backgroundColor: 'white',
					color: 'blue'
});
var signInButton = Titanium.UI.createButton({
				title: 'Signin',
				font:{fontSize:16,fontWeight:'bold'},
				width: "80%",
				left: "10%",
				top: "70%",
				backgroundColor: '#336699',
				//borderWidth: 10,
				borderRadius: 10,
				color: 'white'
});
				
var signOutButton = Titanium.UI.createButton({
					title: 'Logout',
					font:{fontSize:16,fontWeight:'bold'},
					width: "80%",
					left: "10%",
					top: "70%",
					backgroundColor: '#336699',
					//borderWidth: 10,
					borderRadius: 10,
					color: 'white'
});
						
var MapModule = require('ti.map');
var Cloud = require('ti.cloud');
var Admob = require('ti.admob');
var CloudPush = null;
if (isAndroid ) {
	CloudPush = require('ti.cloudpush');
}
var adMobPublisherID="ca-app-pub-3665132116722377/2467198443";
var adMobKeywords = "kids student school books science  math toys sports parent teacher cars bikes";
if (isAndroid ) {
	adMobPublisherID="ca-app-pub-3665132116722377/6561150840" ;
}
var noProfileLabel = false;
var isTabsDisabledTabs = false;
var deviceToken = null;
var schoolDB = null;
if( OS_ANDROID ) {
    Alloy.Globals.Android = { 
        "Api" : Ti.Platform.Android.API_LEVEL
    };
}
var loginLabel = "SignIn";
var menuWindow = Ti.UI.createWindow({
	        fullscreen : false,
	        width: "60%",
	        top: (OS_ANDROID) ? 0 : 50,
	        left: 0,
	        height: "85%",
	        color : 'white',
	        backgroundColor: "#B2FFFF",
	        title : 'Options Menu',
	       // modal: true,
	        //tabBarHidden: true,
	        //visible: false
	    });

var menuOptionsTable = Ti.UI.createTableView({
			              height: Ti.UI.SIZE,
			              width: Ti.UI.FILL,
			              left: 0,
			              top: "10%",
			             // data: "",
			              font: {
								fontSize: 24,
								fontWight: "bold",
								fontFamily: 'Helvetica Neue'
						  },
						  //backgroundColor: "#56B8D8",
						  backgroundColor: "#B2FFFF",
						  separatorColor: '#000000'
			     });
var menuView = Titanium.UI.createView({
	                       // backgroundColor : '#56B8D8',
	                        backgroundColor: "#B2FFFF",
	                        color:'black',
	                        width : "60%",
	                        height :  "100%",
	                        left : 0,
							top : 0
	            });
//menuView.add(menuOptionsTable);
//menuWindow.add(menuView);
if ( !Ti.App.Properties.hasProperty("DisplayAds")){
	Ti.App.Properties.setBool("DisplayAds", true);
}
//var _admobview = require("admobview");
//var adMobView = _admobview.getaddview();
var isMenuWindowOpen = false;
var tabGroupGlobalReference  = null;
IS_Ios7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
IS_iPhoneTall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 568); 
IS_iPhone4SmallScreen = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 480);