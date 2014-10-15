var args = arguments[0] || {};
var parentController = args.parentTab;
// example assumes you have a set of text fields named username, password, etc.
var registeringProgress = Alloy.createController('ProgressIndicator', {message: 'Registering User .. \n' + $.emailAddress.value}).getView();

function destroy(){
	$.registerForm.removeEventListener('close', destroy);
	$.registerForm.removeAllChildren();
	registeringProgress = null;
}
function actionRegister()
{
	if ( validateInputFields() == false){
		 return;
	}	
    registeringProgress.open(); 
	Cloud.Users.create({
    		username: $.emailAddress.value,
    		password: $.inputPassword.value,
		    password_confirmation: $.confirmPassword.value,
		    first_name: $.firstName.value,
		    last_name: $.lastName.value,
		    email: $.emailAddress.value
		}, function (e) {
		    if (e.success) {	
		    	 //Ti.API.info("User ID is successfully created", "true");
		    	// register_to_push_notifications($.inputUsername.value,$.inputPassword.value);
		    	register_to_push_notifications($.emailAddress.value,$.inputPassword.value);
		    	 //$.registerForm.close();
				 //Alloy.createController('login',{parentTab: $.parentController} );
		    } else {
		         alert('Error:\n' +
            	((e.error && e.message) || JSON.stringify(e)));
		    }
	});
}
function register_to_push_notifications(username, passwd)
{    
    // Initialize the module
   // Ti.API.info("Registering for push notifications ");
   if (OS_ANDROID) {
	CloudPush.retrieveDeviceToken({
	    success: function deviceTokenSuccess(e) {
	    	//Ti.API.info("Registered for Push Notification"+ e.deviceToken);
	    	Ti.App.Properties.setString("ACSDeviceToken", "e.deviceToken");
	    	deviceToken = e.deviceToken;
	    	loginToACS(username, passwd);
	    },
	    error: function deviceTokenError(e) {
	    	alert("Failed to register for Push Notification" + e.error);
	    }
	});
 } else if ( OS_IOS) {
		 	Ti.Network.registerForPushNotifications({
		    // Specifies which notifications to receive
		    types: [
		        Ti.Network.NOTIFICATION_TYPE_BADGE,
		        Ti.Network.NOTIFICATION_TYPE_ALERT,
		        Ti.Network.NOTIFICATION_TYPE_SOUND
		    ],
		    success: function deviceTokenSuccess (e) {
		    	    Ti.App.Properties.setString("ACSDeviceToken", "e.deviceToken");
		    		deviceToken = e.deviceToken;
		    		loginToACS(username, passwd);
		    },
		    error: function deviceTokenError(e){
		    	alert('Failed to register for push notifications! ' + e.error);
		    },
		    callback: function receivePush(e) {
		    		alert('Received push in Register.js: ' + JSON.stringify(e));
		   							var notificationModel = Alloy.createModel("notification", {
											//datetime: (new Date()).toString(),
											datetime: (new Date()).toLocaleString(),							       
									        title:  e.data.title,
									        message : e.data.alert,
									        badge: e.data.badge
									 });
								     notificationModel.save();
									 notificationCollection.fetch();
								     notificationCollection.trigger('change');
								     notificationCollection.trigger('sync');
								     //Ti.API.info("Stored Push Notification: " + evt.payload);
			}
		
		});
		// Process incoming push notifications
		
		
 }
}

function loginToACS(username, passwd){
	Cloud.Users.login({
		        login: username,
		        password: passwd
		    }, function (e) {
		        if (e.success) {
		          	//Ti.API.info('Login successful');
		          	 var user = e.users[0];
				         //Ti.API.info('User Login Success:\n' + JSON.stringify(user) );
		       	    Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
		          	subscribeToChannels();
		          	registeringProgress.close();
		          	Ti.App.Properties.setBool("LoggedIn", true);
		          	Ti.App.Properties.setString("username", user.username);
		          	loginLabel = "SignOut";
		          	$.registerForm.close();
		        } else {
		            alert('Error:\n' +
		                ((e.error && e.message) || JSON.stringify(e)));
		        }
	});
}
 
 function registerCallbacks() {
 	if (OS_ANDROID) {
		CloudPush.showTrayNotification=true;
		CloudPush.showTrayNotificationsWhenFocused = true;
		CloudPush.focusAppOnPush = false;
		CloudPush.showAppOnTrayClick = true;
		//Ti.API.info("CloudPush device Token:" + deviceToken);	
		CloudPush.addEventListener('callback', function (evt) {
		    			//Ti.API.info("Received Push Notification: " + evt.payload);
		});
		CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
		    		//Ti.API.info('Tray Click Launched App (app was not running)');
		    		//Ti.API.info("Received Push Notification: " + evt.payload);
		});
		CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
		    		//Ti.API.info('Tray Click Focused App (app was already running)');
		    		//Ti.API.info("Received Push Notification: " + evt.payload);
		});
	} else if ( OS_IOS) {
		
	}
	
}
function subscribeToChannels(){
	//Ti.API.info("Subscribing to channel: " + "alerts" + "deviceToken:" + deviceToken);
   if ( $.recivePushFromSBSD.value) {    
		    Cloud.PushNotifications.subscribeToken({
		        device_token: deviceToken,
		        channel: "SBSD_Alerts", 
		        type: (OS_ANDROID) ? "gcm" : "ios"
		     	}, function (e) {
			        if (e.success) {
			        	registerCallbacks();
			            alert('Successfully subscribed to receive School District Notifications');
			            Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", true);
			            //$.registerForm.close();
			        } else {
			            alert('Error:\n' +
			                ((e.error && e.message) || JSON.stringify(e)));
			        }
		    });
	}
	if ( $.recivePushFromPTA.value) { 
	    Cloud.PushNotifications.subscribeToken({
	        device_token: deviceToken,
	        channel: "PTA_Alerts", 
	        type: (OS_ANDROID) ? "gcm" : "ios"
	     	}, function (e) {
		        if (e.success) {
		        	registerCallbacks();
		            alert('Successfully subscribed to receive PTA Announcements');
		            Ti.App.Properties.setBool("Subscribe_PTA_Alerts", true);
		            //$.registerForm.close();
		        } else {
		            alert('Error:\n' +
		                ((e.error && e.message) || JSON.stringify(e)));
		        }
	    });
    }
    if ( $.recivePushFromSports.value) { 
	     Cloud.PushNotifications.subscribeToken({
	        device_token: deviceToken,
	        channel: "Sports_Alerts", 
	        type: (OS_ANDROID) ? "gcm" : "ios"
	     	}, function (e) {
		        if (e.success) {
		        	registerCallbacks();
		            alert('Successfully subscribed to receive Push Notifications');
		            Ti.App.Properties.setBool("Subscribe_Sports_Alerts", true);
		            //$.registerForm.close();
		        } else {
		        	alert('Error:\n' +
		        	 ((e.error && e.message) || JSON.stringify(e)));
		        }
	    });
     }
}
function validateEmailformat(emailAddress) {
        var str = emailAddress;
        var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (filter.test(str)) {
            testresults = true;
        } else {
            testresults = false;
        }
        return (testresults);
};
function validateInputFields()
{
	
	if( $.firstName.value == "" ) {
		 alert('Error:\n' + "Firstname field empty");
			 return false;
	}
	if ($.lastName.value == "" ) {
		alert('Error:\n' + "Lastname field empty");
			 return false;
	}
	if ( $.emailAddress.value == "" || validateEmailformat($.emailAddress.value) == false){
			alert('Error:\n' + "Invalid email is field empty");
			return false;
	}
	/*
	if ( $.inputUsername.value == "") {
			 alert('Error:\n' + "Username field empty");
			 return false;
	}
	*/
	if ( $.inputPassword.value == "" ) {
			 alert('Error:\n' + "Password field empty");
			 return false;
	}
	if ( $.confirmPassword.value =="" ) {
		 alert('Error:\n' + "Confirm Password field empty");
			 return false;
	}
	return true;
}
$.registerForm.addEventListener("close", destroy);

//$.registerForm.getView().open();