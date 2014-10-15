function sendFeedback() {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "School@Hand user feedback";
	emailDialog.toRecipients = ["mobilocityinc@gmail.com"];
	//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
	emailDialog.open();
}

function displayHelp(e) {
		var args_t = {
				parentTab: e,
				wintitle: 'User Guide',
				url: (OS_IOS)? "/help_ios.html" : "./help_android.html"
			};
	e.open(Alloy.createController('ViewWebSite', args_t).getView());
}

function displayAboutSH(e) {
	e.open(Alloy.createController('AboutSHApp', {parentTab: e}).getView());
}
function ReferToFriend(e){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Try School@Hand Mobile App I like it";
	if (OS_ANDROID){
		emailDialog.messageBody = 'Hello , \nI am using School@Hand Android App. I thought it would be useful to you too. \nYou can download School@Hand by clicking this link. \n https://play.google.com/store/apps/details?id=com.mobilocity.schoolathand\n';
	}
	emailDialog.open();
}
function displayOptions(e){
	e.open(Alloy.createController('ChangeSettings', {parentTab: e}).getView());
}
function getDistrictPhone(){
	var phoneno = "";
	var sqlQuery = "SELECT value FROM enum where name like '" + "phoneno'";
	var sqlRS = schoolDB.execute(sqlQuery);
	if ( sqlRS.getRowCount() > 0 )
	{
			if ( sqlRS.isValidRow())
			{
				phoneno = sqlRS.fieldByName('value');
			}
	}
	sqlRS.close();
	return phoneno;
}
function getDistrictWebSiteUrl(){
	var url = "";
	var sqlQuery = "SELECT value FROM enum where name like '" + "website'";
	var sqlRS = schoolDB.execute(sqlQuery);
	if ( sqlRS.getRowCount() > 0 )
	{
			if ( sqlRS.isValidRow())
			{
				url = sqlRS.fieldByName('value');
			}
	}
	sqlRS.close();
	return url;
}
function getDistOfficeLocation(){
	var location="";
	var sqlQuery = "SELECT value FROM enum where name like '" +"location'";
	var sqlRS = schoolDB.execute(sqlQuery);
	if ( sqlRS.getRowCount() > 0 )
	{
			if ( sqlRS.isValidRow())
			{
				location = sqlRS.fieldByName('value');
			}
	}
	sqlRS.close();
	return location;
}
function getNotificationsView()
{
	var rowData=[];
	var rowId = 0;
	var  recentNotificationsView = Ti.UI.createView({
		layout: "vertical",
		top: "63%",
		height: "35%",
		width: "95%",
		backgroundColor: "#33B5E5",
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8
 	});
	notificationCollection.fetch( { query: 'SELECT * FROM notifications ORDER BY notificationid desc'});
	var notificationCount = notificationCollection.length;
	var headerView = Ti.UI.createView({
		layout: "horizontal",
		left: 0,
		height: Ti.UI.SIZE,
		width: "100%",
		borderColor: 'white',
		borderSize: 1,
		borderRadius: 8
	});
	
	var countLabel = Ti.UI.createLabel({
										top: 2,
										left: "1%",
										text: notificationCount,
										font: {fontSize: 16, fontWeight: 'bold'},
										height: 30,
										width: "10%",
										backgroundColor: 'orange',
										borderRadius: 8,
										color: "white",
										textAlign:  Ti.UI.TEXT_ALIGNMENT_CENTER
						});
	var headerLabel = Ti.UI.createLabel({
										top: 2,
										left: "2%",
										text: "Recent Notifications",
										font: {fontSize: 16, fontWeight: 'bold'},
										height: 30,
										width: "70%",
										color: "white",
										textAlign:  Ti.UI.TEXT_ALIGNMENT_CENTER
						});
	var notificationCenterButton = Ti.UI.createButton({
										top: 2,
										left: "2%",
										title: "more",
										font: {fontSize: 16, fontWeight: 'bold'},
										height: 30,
										width: "14%",
										backgroundColor: 'orange',
										borderRadius: 8,
										color: "white",
										style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
										textAlign:  Ti.UI.TEXT_ALIGNMENT_CENTER
						});
	notificationCenterButton.addEventListener('click', function(e){
		$.dashboardTab.open(Alloy.createController('Notifications', {parentTab: $.dashboardTab}).getView());
	});
	headerView.add(countLabel);
	headerView.add(headerLabel);
	headerView.add(notificationCenterButton);
	recentNotificationsView.add(headerView);
	if (!Ti.App.Properties.hasProperty("ACSDeviceToken") ) {
			    recentNotificationsView.add(notRegisteredLabel) ;
			    var signupButton = Ti.UI.createButton({
										top: 5,
										left: "80%",
										title: "SignIn",
										font: {fontSize: 12, fontWeight: 'bold'},
										height: 30,
										width: 50,
										backgroundColor: 'orange',
										borderRadius: 8,
										color: "white",
										style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
										textAlign:  Ti.UI.TEXT_ALIGNMENT_CENTER
						});
				signupButton.addEventListener('click', function(e){
					$.dashboardTab.open(Alloy.createController('login_form', {parentTab: $.dashboardTab}).getView());
				});
				recentNotificationsView.add(signupButton) ;
	} else {
		if ( notificationCount > 0)
		{
				// Display upto last 3 notifications received
			while( (rowId < notificationCount) && (rowId < 2 ) )
			{
					var datetime = notificationCollection.at(rowId).get("datetime");
					var message = notificationCollection.at(rowId).get("message");
					//Ti.API.info("datetime: " + datetime );
					//Ti.API.info("message: " + message );
					
					var notificationIcon = Ti.UI.createImageView({
						//top: 5,
						left: 5,
						image:  (OS_ANDROID) ? "/images/push_msg_icon.png" : "images/push_msg_icon.png" ,
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
											font: {fontSize: 14, fontWeight: 'normal'},
											height: 30,
											width: Ti.UI.SIZE,
											color: "blue",
											textAlign:  Ti.UI.TEXT_ALIGNMENT_LEFT
										});
					var messageLabel = Ti.UI.createLabel({
										    top: 32,
											left: 50,
											text: message,
											font: {fontSize: 14, fontWeight: 'normal'},
											height: 30,
											width: Ti.UI.SIZE,
											color: "blue",
											textAlign:  Ti.UI.TEXT_ALIGNMENT_LEFT
										});
					if (OS_ANDROID) messageLabel.setWordWrap(false);
					messageView.add(notificationIcon);
					messageView.add(datetimeLabel);
					messageView.add(messageLabel);
					recentNotificationsView.add(messageView);
					rowId++;
			}
			recentNotificationsView.addEventListener('click', function(e){
				$.dashboardTab.open(Alloy.createController('Notifications', {parentTab: $.dashboardTab}).getView());
			});
			
	}
 }
 return recentNotificationsView;		
}

function getWelcomeLabel() {	
	var welcomeLabel = Ti.UI.createLabel({
					//text: "Welcome to School@Hand App !. You have selected " + 
						//  Ti.App.Properties.getString('UserSchoolDistrict') + " Schools.",
					text: "Welcome !",
					font:{fontSize:14,fontWeight:'bold'},
					textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
					left: "2%",
					top: "5%",
					color: 'blue'
					});
	return welcomeLabel;
}
function getDistrictQuickView(){
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
					font:{fontSize:14,fontWeight:'bold'},
					textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
					left: "2%",
					top: 0,
					color: 'orange'
					});
	var distName = Ti.UI.createLabel({
					top: "1%",
					left: "2%",
					width: Ti.UI.SIZE,
					height:Ti.UI.SIZE,
					color: 'white',
					font: {fontSize: 14, fontWeight: 'normal'},
					text: Ti.App.Properties.getString('UserSchoolDistrict') + " Schools.",
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
					left: (OS_ANDROID) ? 0: "5%",
					color: 'white',
				    backgroundColor: 'orange',
					width: (OS_ANDROID) ? Ti.UI.SIZE : 40,
					height: (OS_ANDROID) ? Ti.UI.SIZE : 40,
					borderRadius: 8,
					font: {fontFamily: 'AppIcons', fontSize:'40dp'},
					title: Alloy.Globals.icons.phone,
					textAlign: 'center',
					data: getDistrictPhone(),
					style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
					//borderRadius: 8
	 });
	 distPhone.addEventListener('click', function(e){
	 	Ti.Platform.openURL('tel:'+ e.source.data);
	 });
	 var distWeb = Ti.UI.createButton({
					top: "5%",
					left: (OS_ANDROID) ? "5%": "15%",
					color: 'white',
				    backgroundColor: 'orange',
					width: (OS_ANDROID) ? Ti.UI.SIZE : 40,
					height:(OS_ANDROID) ? Ti.UI.SIZE : 40,
					borderRadius: 8,
					font: {fontFamily: 'AppIcons', fontSize:'40dp'},
					title: Alloy.Globals.icons.globe_alt,
					textAlign: 'center',
					data: getDistrictWebSiteUrl(),
					style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
					//borderRadius: 8
	 });
	 distWeb.addEventListener('click', function(e){
	 	
	 	var args_t = {
				parentTab: $.dasboardTab,
				wintitle: "District Web Site",
				url: e.source.data
			};
	 	$.dashboardTab.open(Alloy.createController('ViewWebSite', args_t).getView());
	 });
	 var distLocationButton = Ti.UI.createButton({
	 				top: "5%",
	 				bottom: "2%",
					color: 'white',
					left: (OS_ANDROID) ? "5%": "15%",
					//backgroundColor: '#33B5E5',
					backgroundColor: 'orange',
					borderRadius: 8,
					width: (OS_ANDROID) ? Ti.UI.SIZE : 40,
					height:(OS_ANDROID) ? Ti.UI.SIZE : 40,
					font: {fontFamily: 'AppIcons', fontSize:'40dp'},
					title: Alloy.Globals.icons.direction,
					textAlign: 'center',
					style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
					data: JSON.parse(getDistOfficeLocation())
	 });
	 distLocationButton.addEventListener('click', function(e) {
    	//Ti.API.info('Inside the distlocationbutton event listener ' + e.source.data);
        var mapController = Alloy.createController('MapDetail',{data: e.source.data });
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
	var cityandstate = Ti.App.Properties.getString('UserSchoolDistrict');
	var splitStr = cityandstate.split(" - ");
	var city = splitStr[0];
	var state = splitStr[1];
	var weatherController = require("weatherview");
	var weatherView = weatherController.fillWeatherReport(city, state);
	return weatherView;
}

function profileDataUpdatedEvent (context){
		//Ti.API.info('Identified profile data has been updated');
}

function selectSchoolDistrict(){
	//$.index.add(disableTabsImage);
	//Ti.API.info("Calling Select School District View");
	$.dashboardTab.open(Alloy.createController('SelectSchoolDistrict',{parentTab: $.dashboardTab} ).getView());
}

function displayDisclaimer(){
	if (OS_IOS){
		$.tabGroup.add(disableTabsImage);
		isTabsDisabledTabs = true;
	}
	$.dashboardTab.open(Alloy.createController('AppDisclaimer',{parentTab: $.dashboardTab} ).getView());
}

function displayDisclaimerSigned(e){
	e.open(Alloy.createController('AppDisclaimerSigned',{parentTab: e} ).getView());
}

function checkandupdateDb(){
	var installedDbname = Ti.App.Properties.getString("dbname");
	var installedDbVersion = Ti.App.Properties.getString("dbversion");
	var updateDBProgress = null;
	
	if(!schoolDB) {	
				schoolDB = Ti.Database.open('schoolDBDownloaded');
	}
	Cloud.Files.query({
  	  where: {"name": installedDbname } 
	}, function (e) {
	    if (e.success) 
	    {
	        for (var i = 0; i < e.files.length; i++)
		 	{
	        			var file = e.files[i];
	        			//Ti.API.info('id: ' + file.id + '\n' +'name: ' + file.name + '\n' +'updated_at: ' + file.updated_at);
		    }
		    //Ti.API.info("db version installed: " + Ti.App.Properties.getString("dbversion"));
		   // Ti.API.info("db version on the server: " + e.files[0].updated_at);
		    if( Ti.App.Properties.getString("dbversion") == e.files[0].updated_at)
		    {
		    	//Ti.API.info("UPDATES| Database is upto date");
		    }
		    else 
		    {
		    	//Ti.API.info("UPDATES| Found updated DB, downloading and installing new database");
		    	// --
		    	updateDBProgress = Alloy.createController('ProgressIndicator', {message: 'Checking for updates..'}).getView();
	    		updateDBProgress.open();
	   			var databaseDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'databases');
				if (! databaseDir.exists()) {
						 //Ti.API.info("UPDATES| Directory not exists:" + databaseDir.getNativePath() );
	   					 databaseDir.createDirectory();
				}
				var databaseFile  = Ti.Filesystem.getFile(databaseDir.resolve(), 'schooldatabase.sqlite');
				var xhr = Ti.Network.createHTTPClient();
				xhr.onload = function() {
							databaseFile.write(this.responseData);
							updateDBProgress.fireEvent('close');
							/*
							if ( databaseFile.exists() === true){
								Ti.API.info("UPDATES| schooldatabase.sqlite file has been downloaded " + databaseFile.getNativePath() + "Size:" + databaseFile.getSize());
							}
							*/
							// remove old database
							if (schoolDB) {
								schoolDB.remove();
								//Ti.API.info("Removed old instance of schoolDB");
							}						
							schoolDB = Ti.Database.install(databaseFile.getNativePath(), 'schoolDBDownloaded');
							//Ti.API.info("UPDATES| New version of schooldatabase is installed successfully");
							Ti.App.Properties.setString("dbversion", e.files[0].updated_at );
							// update contacts collection
							updateContacts();	
							updateSchools();
							databaseFile.deleteFile();	
	   				  };
	   				  xhr.open("GET", e.files[0].url);
	   				  xhr.send();
			}
			//updateContacts();
		   // updateSchools();
		    	// ---
	    } else {
	       // Ti.API.info('Error: in querying supported schools :\n' +((e.error && e.message) || JSON.stringify(e)));
	    }
	});
	updateDBProgress = null;
	return true;
}


function logOut()
{
	Cloud.Users.logout(function(e) {
		    	  if (e.success) {
		       			  $.dashboardMainView.removeAllChildren(); 
		       			 if (noProfileLabel) { 
		       			 	noProfileLabel = false;
		       			 }
		       			  $.dashboardMain.fireEvent('open');
		       			 // $.dashboardTab.open();
		            } else {
		       		 	alert('Error:\n' +
            					((e.error && e.message) || JSON.stringify(e)));
		    		}
	});
}

function addAdMobView(){
	var admobview = require("admobview");
	$.dashboardMainView.add(admobview.getaddview());
}

function openDashboard(){
		//if ( OS_IOS) {
			$.dashboardMainView.removeAllChildren();
		//}
		//$.dashboardMainView.add(getWelcomeLabel());
		$.dashboardMainView.add(getDistrictQuickView());
		$.dashboardMainView.add(getWeatherView());
		var scrollView = Titanium.UI.createScrollView({
					layout: "horizontal",
					contentWidth:'auto',
					contentHeight:'auto',
					horizontalWrap: false,
					showVerticalScrollIndicator:false,
					showHorizontalScrollIndicator:true,
					top:"30%",
					height:"30%",
					width: "95%",
					//backgroundColor: "white",
					backgroundColor: "transparent",
					//borderColor: "white",
					borderRadius: 8,
					//opacity: 0.5
		});
		
		var numberOfProfiles = profileCollection.length;
		if ( numberOfProfiles > 0) {
				// if more than one profile is observed
			 		if (Ti.App.Properties.hasProperty('noUserProfilesLabelSet')){
		   					Ti.App.Properties.removeProperty('noUserProfilesLabelSet');
		   					//$.dashboardMain.setVisible(false);
		   					//$.dashboardMain.remove($.dashboardMainView);
		   			}		
						var rowId = 0;
						while(rowId < profileCollection.length) {
							var pSelected = profileCollection.at(rowId);
							var profileid =  pSelected.get('profile_id');
							var url = pSelected.get("url");
							var profileView = Ti.UI.createView({
								top: 5,
								left: 5,
								layout: "vertical",
								//backgroundColor: "#33B5E5",
								backgroundColor: "white",
								height: Ti.UI.SIZE,
								//width: "40%",
								//width: 100,
								width: (Ti.Platform.displayCaps.platformHeight == 480) ? 90 : 110,
								borderRadius: 8,
								id : profileid
							});
							var profileImage = Ti.UI.createImageView({
								top: 5,
								//height: 100,
								//width: 90,
								height: (Ti.Platform.displayCaps.platformHeight == 480) ? 80 : 100,
								width: (Ti.Platform.displayCaps.platformHeight == 480) ? 80 : 100,
								//backgroundImage: url,
								image: url,
								autorotate: true,
								id: profileid
							});
							var profileName = Ti.UI.createLabel({
										top: 5,
										text: pSelected.get("name"),
										font: {fontSize: 14, fontWeight: 'bold'},
										height: Ti.UI.SIZE,
										width: Ti.UI.SIZE,
										color: "orange"
							});
							profileView.add(profileImage);
							profileView.add(profileName);
							profileImage.addEventListener('click', function(e){
								//Ti.API.info('Profile Selected :' + e.source.id);
						    	var detailController = Alloy.createController('MyDashboard', {
								        parentTab : $.dashboardTab,
								        //"$model": profileCollection.get(profile_id),
								        "$model": e.source.id,
								         data : profileCollection.get(e.source.id)
								  });
									$.dashboardTab.open(detailController.getView());
							});
							scrollView.add(profileView);
							rowId++;
						}
						$.dashboardMainView.add(scrollView);
		} else {
				// no profiles are observed
				//if ( !Ti.App.Properties.hasProperty('noUserProfilesLabelSet') |) {
				if( noProfileLabel == false) {
					//$.dashboardMainView.add(noUserProfilesLabel);
					var noprofileView = Ti.UI.createView({
								top: 5,
								left: 5,
								layout: "vertical",
								//backgroundColor: "#33B5E5",
								backgroundColor: "white",
								height: Ti.UI.SIZE,
								//width: "40%",
								width: (Ti.Platform.displayCaps.platformHeight == 480) ? 90 : 110,
								borderRadius: 8,
								id : profileid
							});
					var profileImage = Ti.UI.createButton({
								top: 5,
								//height: 100, // works fine for iphone5
								//width: 100,  // works fine for iPhone5
								height: (Ti.Platform.displayCaps.platformHeight == 480) ? 80 : 100,
								width: (Ti.Platform.displayCaps.platformHeight == 480) ? 80 : 100,
								title: "Add Profile",
								font: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480)? {fontSize: 12, fontWeight: 'normal'}: {fontSize: 14, fontWeight: 'bold'},
								backgroundColor: "gray" ,
								style: (OS_IOS && Ti.Platform.displayCaps.platformHeight == 480) ? Ti.UI.iPhone.SystemButtonStyle.PLAIN: "",
							});
					var profileName = Ti.UI.createLabel({
								top: 5,
								text: "Name",
								font: {fontSize: 14, fontWeight: 'bold'},
								height: Ti.UI.SIZE,
								width: Ti.UI.SIZE,
								color: "orange"
					});
					
					profileImage.addEventListener('click', function(e){
						$.dashboardTab.open(Alloy.createController('AddProfile', $.dashboardTab).getView());
					});
					noprofileView.add(profileImage);
					noprofileView.add(profileName);
					var hintView = Ti.UI.createView({
								top: 5,
								left: 10,
								layout: "vertical",
								//backgroundColor: "#33B5E5",
								height: 100,
								width: Ti.UI.SIZE,
								borderRadius: 8,
								id : profileid
							});
					var hintLabel = Ti.UI.createLabel({
								top: 5,
								text: "Profiles help to view events and links specific to a student's class. All data is saved locally on your device",
								font: {fontSize: 12, fontWeight: 'normal'},
								height: Ti.UI.SIZE,
								width: 180,
								color: "black"
					});
					hintView.add(hintLabel);
					scrollView.add(noprofileView) ;
					scrollView.add(hintView);
					$.dashboardMainView.add(scrollView);
					Ti.App.Properties.setString('noUserProfilesLabelSet', "true");
					//$.dashboardMain.setVisible(true);
					if ( OS_ANDROID) noProfileLabel = true;			
				}
		} 
		
		if ( (Ti.App.Properties.hasProperty("ACS-StoredSessionId")  &&
			Ti.App.Properties.getString("ACS-StoredSessionId") != null) ) {
				//Ti.API.info("Found User stored session");
				Cloud.Users.showMe(function(e) {
		            if (e.success) {
		                var user = e.users[0];
       						 //Ti.API.info('Success:\n' +
						       //     'id: ' + user.id + '\n' +
						         //   'first name: ' + user.first_name + '\n' +
						           // 'last name: ' + user.last_name);
						Ti.App.Properties.setBool("LoggedIn", true);
						//registerNotificationCallbacks();
		            } else {
		            	//Ti.API.info("User Not Logged In");   	
						Ti.App.Properties.setBool("LoggedIn", false);
		            }
		        });
		} else { 
		        Ti.App.Properties.setBool("LoggedIn", false);  
		        //Ti.API.info("User Not Logged In");   		
	     }
	    $.dashboardMainView.add(getNotificationsView());
	    //if ( OS_ANDROID) {
        	$.dashboardMain.setVisible(true);
		//}
		//addAdMobView();
} // end openDashboard

function updateContacts()
{
	var sql = 'SELECT * FROM contacts';	
	Alloy.Globals.contacts.deleteAll();
	//Ti.API.info(" updating contacts collections");
	var tmpRS = schoolDB.execute(sql);
	if ( tmpRS.getRowCount() > 0 ){
			while ( tmpRS.isValidRow()){
				//Ti.API.info("Found " + tmpRS.getRowCount() + "of contacts");
					var fid = tmpRS.fieldByName('id');
					var fname = tmpRS.fieldByName('name');
					var ftitle = tmpRS.fieldByName('title');
					var fdepartment = tmpRS.fieldByName('department');
					var fbuilding = tmpRS.fieldByName('building');
					var fphonenum = tmpRS.fieldByName('phonenum');
					var fext = tmpRS.fieldByName('ext');
					var femailaddr = tmpRS.fieldByName('emailaddr');
					//Ti.API.info("contact: " + fid, fname + ftitle + fdepartment + fbuilding + fphonenum );
					var newContact = Alloy.createModel('contacts', { id: fid,
						name: fname, 
						title: ftitle, 
						department: fdepartment,
						building : fbuilding,
						phonenum : fphonenum,
						ext : fext,
						emailaddr : femailaddr
					} );
					Alloy.Globals.contacts.add(newContact);
					//Alloy.Globals.contacts.save();
			  		tmpRS.next();
			}
			tmpRS.close();
			Alloy.Globals.contacts.saveAll();
	}
}

function updateSchools()
{
	var sql = 'SELECT * FROM schools';
	var columns = Alloy.Globals.school.config.columns;
	Alloy.Globals.school.deleteAll();
	//Ti.API.info(" updating contacts collections");
	var tmpRS = schoolDB.execute(sql);
	if ( tmpRS.getRowCount() > 0 ){
		//Ti.API.info("Number of fields in Resultset "+ tmpRS.getFieldCount());
		//Ti.API.info("Number of fields in model config "+ columns.length());
			while ( tmpRS.isValidRow()){
				   var newSchool = Alloy.createModel( 'school', {
				     	earlyreleasehours: tmpRS.fieldByName('earlyreleasehours'),
						delayedhours: tmpRS.fieldByName('delayedhours'),
						regularhours: tmpRS.fieldByName('regularhours'),
						name: tmpRS.fieldByName('name'),
						shortname: tmpRS.fieldByName('shortname'),
						type: tmpRS.fieldByName('type'),
						principal: tmpRS.fieldByName('principal'),
						principal_emailaddr: tmpRS.fieldByName('principal_emailaddr'),
						assistantprincipal: tmpRS.fieldByName('assistantprincipal'),
						 assistantprincipal_emailaddr: tmpRS.fieldByName('assistantprincipal_emailaddr'),
						antibullyingspecialist: tmpRS.fieldByName('antibullyingspecialist'),
						antibullyingspecialist_emailaddr: tmpRS.fieldByName('antibullyingspecialist_emailaddr'),
						websiteurl: tmpRS.fieldByName('websiteurl'),
						imagefile: tmpRS.fieldByName('imagefile'),
						logofile: tmpRS.fieldByName('logofile'),
						address1: tmpRS.fieldByName('address1'),
						 address2: tmpRS.fieldByName('address2'),
						city: tmpRS.fieldByName('city'),
						 state: tmpRS.fieldByName('state'),
						zipcode: tmpRS.fieldByName('zipcode'),
						phone: tmpRS.fieldByName('phone'),
						fax: tmpRS.fieldByName('fax'),
						 longitude: tmpRS.fieldByName('longitude'),
						latitude: tmpRS.fieldByName('latitude'),
						id: tmpRS.fieldByName('id')
					});
					 Alloy.Globals.school.add(newSchool);
					 //Alloy.Globals.school.save();	
			  		tmpRS.next();
			}
			tmpRS.close();
			Alloy.Globals.school.saveAll();
	}
}


function registerNotificationCallbacks(){
	if (OS_ANDROID) {
			CloudPush.showTrayNotification=true;
			CloudPush.showTrayNotificationsWhenFocused = true;
			CloudPush.focusAppOnPush = false;
			CloudPush.showAppOnTrayClick = true;
			//Ti.API.info("CloudPush device Token:" + deviceToken);
			//Ti.API.info("Registering Callbacks to receive Push Notifications");
					CloudPush.addEventListener('callback', function (evt) {
							//var eventRec = JSON.stringify(evt);
							//Ti.API.info("Received Push Notification evtRec: " + eventRec.toString());
			    			//Ti.API.info("Received Push Notification: " + evt.payload);				
									var payload = JSON.parse(evt.payload).android;
		   							//Ti.API.info("PUSH_MSG| Alert: " + payload.alert + " Title: " + payload.title + " Badge: " + payload.badge);
		   							var notificationModel = Alloy.createModel("notification", {
											//datetime: (new Date()).toString(),
											datetime: (new Date()).toLocaleString(),							       
									        title:  payload.title,
									        message : payload.alert,
									        badge: payload.badge
									 });
								     notificationModel.save();
									 notificationCollection.fetch();
								     notificationCollection.trigger('change');
								     notificationCollection.trigger('sync');
								     //Ti.API.info("Stored Push Notification: " + evt.payload);					
				});
			CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
			    		//Ti.API.info('Tray Click Launched App (app was not running)');
			    		//displayNotifications();
			});
			CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
			    		//Ti.API.info('Tray Click Focused App (app was already running)');
			    		//displayNotifications();
			});
	} else if (OS_IOS) {
			//Ti.API.info("iOS Register Push Notification Call back");
			 	Ti.Network.registerForPushNotifications({
			    // Specifies which notifications to receive
			    types: [
			        Ti.Network.NOTIFICATION_TYPE_BADGE,
			        Ti.Network.NOTIFICATION_TYPE_ALERT,
			        Ti.Network.NOTIFICATION_TYPE_SOUND
			    ],
			    success: function deviceTokenSuccess (e) {
			    		deviceToken = e.deviceToken;
			    		Ti.App.Properties.setString("ACSDeviceToken", e.deviceToken);
			    },
			    error: function deviceTokenError(e){
			    	alert('Failed to register for push notifications! ' + e.error);
			    },
			    callback: function receivePush(evt) {
			    	 alert('Received push: in index.js' + JSON.stringify(evt));
			    		//var eventRec = JSON.stringify(evt);
							//Ti.API.info("Received Push Notification evtRec: " + eventRec.toString());
			    			//alert("Received Push Notification: " + evt.data);				
									//var payload = JSON.parse(evt);
		   							//Ti.API.info("PUSH_MSG| Alert: " + payload.alert + " Title: " + payload.title + " Badge: " + payload.badge);
		   							var notificationModel = Alloy.createModel("notification", {
											//datetime: (new Date()).toString(),
											datetime: (new Date()).toLocaleString(),							       
									        title:  evt.data.title,
									        message : evt.data.alert,
									        badge: evt.data.badge
									 });
								     notificationModel.save();
									 notificationCollection.fetch();
								     notificationCollection.trigger('change');
								     notificationCollection.trigger('sync');
								     //Ti.API.info("Stored Push Notification: " + evt.payload);
								    
				}
			
			});
		}
}
function closeMenuWindow(){
 if ( OS_ANDROID) {
 	$.dashboardMain.animate({left:0, duration:200});
	if (isMenuWindowOpen == true) {
		$.tabGroup.remove(menuWindow);
		isMenuWindowOpen = false;
	}
 }
}
function destroy(){
    $.dashboardMain.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.dashboardMain.removeAllChildren();
    $ = null;
    //Ti.API.info("dashboardMain: Cleanup Successfully");
}

menuOptionsTable.addEventListener('click', function(menuOptionsEvent) { 
			     if ( OS_ANDROID) {	
			     	var activeTab = $.tabGroup.getActiveTab();
				    var currWin = activeTab.getWindow();
				    currWin.animate({left:0, duration:200});
				    $.tabGroup.remove(menuWindow);
				    isMenuWindowOpen = false;
				 } else if ( OS_IOS){
						//$.tabGroup.remove(menuWindow);
						menuWindow.close();
		        		$.tabGroup.activeTab.getWindow().animate({
				            	left:0,
				            	duration:200,
				            	curve:Ti.UI.ANIMATION_CURVE_EASE_IN
		        		});
		        		isMenuWindowOpen = false;
		        		$.tabGroup.remove(disableTabsImage);
				}
					switch (true) {
			        		case ( menuOptionsEvent.rowData.title === "SignIn"):
			        			//Alloy.createController('login', {parentTab: $.tabGroup.activeTab});
			      				$.tabGroup.activeTab.open(Alloy.createController('login_form', {parentTab: $.tabGroup.activeTab}).getView());
			       			break;
			        		case ( menuOptionsEvent.rowData.title === "SignOut"):
			        			logOut();
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "Options"):
			        			displayOptions($.tabGroup.activeTab);
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "Feedback"):
			        			sendFeedback();
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "Help"):
			        			displayHelp($.tabGroup.activeTab);
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "About" ):
			        			displayAboutSH($.tabGroup.activeTab);
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "Privacy Policy" ):
			        			displayDisclaimerSigned($.tabGroup.activeTab);
			        			break;
			        		case ( menuOptionsEvent.rowData.title === "Refer to a friend" ):
			        			ReferToFriend($.tabGroup.activeTab);
			        			break;
			        	}
});

$.tabGroup.addEventListener('open', function(e) {

	if ( OS_ANDROID) {
			Ti.API.info("Inside TabGroup open event listener");
	    var activity = $.tabGroup.activity;
	    if( Alloy.Globals.Android.Api >= 11 ) {
	        activity.actionBar.title = "School@Hand";
	        activity.actionBar.displayHomeAsUp = true; 
	        activity.actionBar.onHomeIconItemSelected = function()  {
	            //alert("Home icon clicked!");
	        };  
	        activity.onCreateOptionsMenu = function(e) {
	        	/*
	        	var collapseActionView = Ti.UI.createView({
		            width : 50,
		            height : 20,
		            left: "80%",
		            top: 0
	        	}); 
	        	var optionsLabel= Ti.UI.createLabel({
	        		text: "Menu Options",
	        		textAlign: "Ti.TEXT_ALIGN_RIGHT",
	        		color: "black",
	        		font: {
								fontSize: 16,
								fontWight: "bold",
								fontFamily: 'Helvetica Neue'
						  }
	        	});
	        	collapseActionView.add(optionsLabel);
	        	collapseActionView.addEventListener('click', function() {
					if ( menuItem.isActionViewExpanded) {
						$.tabGroup.remove(disableTabsImage);
						menuItem.collapseActionView();
					} else {
						$.tabGroup.add(disableTabsImage);
						menuItem.expandActionView();
					}
	         	});
	        	*/
			  	var menuItem = e.menu.add({
			  			icon: "images/action_settings.png",
			  			showAsAction: Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW | Ti.Android.SHOW_AS_ACTION_ALWAYS,
			  			//actionView: collapseActionView
			  	});
			 	menuItem.addEventListener("click", function(e) { 
					if (isMenuWindowOpen == true) {
						 var tabs = $.tabGroup.getTabs();
						 //Ti.API.info("No of Tabs in TabGroup are", tabs.length);
						 for ( var i=0; i < tabs.length; i++){
						 	tabs[i].getWindow().animate({left:0, duration: 100});
						 }
						 var activeTab = $.tabGroup.getActiveTab();
				    	 var currWin = activeTab.getWindow();
				    	 currWin.animate({left:0, duration:200});
				    	 $.tabGroup.remove(menuWindow);
						 isMenuWindowOpen = false;
					} else {
			            	if ( Ti.App.Properties.getBool("LoggedIn"))
			            	{
			            			loginLabel = "SignOut";
			            	} else {
			            		loginLabel = "SignIn" ;
			            	}
				           var activeTab = $.tabGroup.getActiveTab();
				           var currWin = activeTab.getWindow();
				           var menuOptions = [ 
					             {title: loginLabel , height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black"},
					             {title: 'Options', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
					             {title: 'Privacy Policy', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
					             {title: 'Help', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
					             {title: 'Feedback', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
					             {title: 'About', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
					             {title: 'Refer to a friend', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" } ];  
					             menuOptionsTable.data = menuOptions;
				           menuView.add(menuOptionsTable);
						   menuWindow.add(menuView);
				           $.tabGroup.add(menuWindow);
				           currWin.animate({left: 150, duration:400});
				           menuWindow.show();
				           isMenuWindowOpen = true;
		           }
				}); 
	          
				//activity.invalidateOptionsMenu();
			};
	 	}
	} else if (OS_IOS ) {
			//Ti.API.info("Inside TabGroup open IOS");
			 var menuButton = Ti.UI.createButton({
				   // title:'Menu',
				    toggle:false, // Custom property for menu toggle
				    image: 'menu.png'
			});
			$.dashboardMain.setLeftNavButton(menuButton);
			menuButton.addEventListener('click', function(e){
				    // If the menu is opened
				   // if(e.source.toggle == true){
				   	if ( isMenuWindowOpen == true) {
				    	//$.tabGroup.remove(menuWindow);
				    	menuWindow.close();
				        $.tabGroup.activeTab.getWindow().animate({
				            left:0,
				            duration:100,
				            curve:Ti.UI.ANIMATION_CURVE_EASE_OUT
				        });
				        $.tabGroup.remove(disableTabsImage);
				        e.source.toggle = false;
				        isMenuWindowOpen = false;
				        
				   } 
				    // If the menu isn't opened
				    else{
				        $.tabGroup.activeTab.getWindow().animate({
				        //$.tabGroup.animate({
				            left:"60%",
				            duration:100,
				            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
				        });
				        $.tabGroup.add(disableTabsImage);
				        var menuOptions = [ 
							             {title: loginLabel , height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black"},
							             {title: 'Options', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
							             {title: 'Privacy Policy', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
							             {title: 'Help', height: 50,textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
							             {title: 'Feedback', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
							             {title: 'About', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" },
							             {title: 'Refer to a friend', height: 50, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, color: "black" } ];
						menuOptionsTable.data = menuOptions;
						//menuView.add(menuOptionsTable);
						//menuWindow.add(menuView);
						
						menuWindow.add(menuOptionsTable);
						menuWindow.open();
						//$.tabGroup.add(menuWindow);
				        e.source.toggle  = true;
				        isMenuWindowOpen = true;
				    }
				});
			}
});

//$.dashboardMain.addEventListener('focus', function(e) {
$.dashboardMain.addEventListener('open', function(e) {
	if ( OS_ANDROID) {
		Ti.API.info("Opened dashboardMain view");
		if ( (!Ti.App.Properties.hasProperty('AppDisclaimerAccepted') ) || (Ti.App.Properties.getString('AppDisclaimerAccepted') == 'false'))
		{
				displayDisclaimer();
		}
		if ( Ti.App.Properties.getString('AppDisclaimerAccepted') == 'true') 
		{	
			//Ti.API.info('AppDisclaimerAccepted property is set to true' );			
			if ( !Ti.App.Properties.hasProperty("UserSchoolDistrict"))
			{
					//Ti.API.info("User has not selected School District");
					selectSchoolDistrict();
			}
			if ( Ti.App.Properties.hasProperty("UserSchoolDistrict") && Ti.App.Properties.hasProperty("dbinstalled") ) {
				//Ti.API.info("User selected School District : " + Ti.App.Properties.getString('UserSchoolDistrict'));
				if ( checkandupdateDb() ) {
					if ( isTabsDisabledTabs) {
						$.tabGroup.remove(disableTabsImage);
						isTabsDisabledTabs = false;
					}
					openDashboard();
				}
			}	
		}
	}
});

$.dashboardMain.addEventListener('focus', function(e) {
	if (OS_ANDROID) {
		var numberOfProfiles = profileCollection.length;
	 	if (Ti.App.Properties.hasProperty('noUserProfilesLabelSet') && numberOfProfiles > 0){
	 		openDashboard();
	 	}
	} else if (OS_IOS) {
			if ( (!Ti.App.Properties.hasProperty('AppDisclaimerAccepted') ) || (Ti.App.Properties.getString('AppDisclaimerAccepted') == 'false'))
			{
					displayDisclaimer();
			}
			if ( Ti.App.Properties.getString('AppDisclaimerAccepted') == 'true') 
			{	
				//Ti.API.info('AppDisclaimerAccepted property is set to true' );			
				if ( !Ti.App.Properties.hasProperty("UserSchoolDistrict"))
				{
						//Ti.API.info("User has not selected School District");
						selectSchoolDistrict();
				}
				if ( Ti.App.Properties.hasProperty("UserSchoolDistrict") && Ti.App.Properties.hasProperty("dbinstalled") ) {
					//Ti.API.info("User selected School District : " + Ti.App.Properties.getString('UserSchoolDistrict'));
					if ( checkandupdateDb() ) {
						if ( isTabsDisabledTabs) {
							$.tabGroup.remove(disableTabsImage);
							isTabsDisabledTabs = false;
						}
						openDashboard();
					}
				}	
			}
	}
});

$.dashboardTab.addEventListener('close', function(e){
	//Ti.API.info("DashboardTab| Received close event");
	$.tabGroup.fireEvent('close');
});
$.dashboardTab.addEventListener('click', function(e){
	closeMenuWindow();
});

$.dashboardTab.addEventListener('close', destroy);

$.tabGroup.addEventListener("close", function(e){
	//Ti.API.info("closing the App");
});
registerNotificationCallbacks();

Ti.App.addEventListener('close', function(e){
	//Ti.API.info("MAIN| Exiting the App: " + e.message);
	if ( OS_ANDROID) {
		var activity = Ti.Android.currentActivity;
 		activity.finish();
 	}
});

tabGroupGlobalReference = $.tabGroup;

$.tabGroup.open();