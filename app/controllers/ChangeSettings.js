var args = arguments[0] || {};

Ti.API.info("Inside Change Settings Controller");
if ( Ti.App.Properties.hasProperty("Subscribe_SBSD_Alerts")) {
	$.recivePushFromSchools.value = Ti.App.Properties.getBool("Subscribe_SBSD_Alerts");
}
if ( Ti.App.Properties.hasProperty("Subscribe_Sports_Alerts")) {
	$.recivePushFromSports.value = Ti.App.Properties.getBool("Subscribe_Sports_Alerts");
}
if ( Ti.App.Properties.hasProperty("Subscribe_PTA_Alerts")) {
	$.recivePushFromPTA.value = Ti.App.Properties.getBool("Subscribe_PTA_Alerts");
}
if ( Ti.App.Properties.hasProperty("DisplayAds")) {
			$.displayAds.value = Ti.App.Properties.getBool("DisplayAds");
}
$.buttonSaveChanges.addEventListener("click", function(e){
	
	if (! Ti.App.Properties.getBool("LoggedIn"))
	{
		alert("Login required, please login from menu / Signin option");
		//Ti.API.info("ACSDeviceToken", Ti.App.Properties.getString("ACSDeviceToken"));
		return;
	}
	if ( Ti.App.Properties.getBool("DisplayAds") != $.displayAds.value ) {
			Ti.App.Properties.setBool("DisplayAds",$.displayAds.value);
			Ti.API.info("DisplayAds is changed:" , $.displayAds.value);
	}
	
	if ( Ti.App.Properties.getBool("Subscribe_SBSD_Alerts") != $.recivePushFromSchools.value ) {
		    if ( $.recivePushFromSchools.value == true) {    
				    Cloud.PushNotifications.subscribeToken({
				        device_token: deviceToken,
				        channel: "SBSD_Alerts", 
				        type: (OS_ANDROID) ? "gcm" : "ios"
				     	}, function (e) {
					        if (e.success) {
					            alert('Successfully subscribed to receive School District Notifications');
					            Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", true);
					            //$.registerForm.close();
					        } else {
					            alert('Error:\n' +
					                ((e.error && e.message) || JSON.stringify(e)));
					        }
				    });
			} else {
				// unsubscribe
				Cloud.PushNotifications.unsubscribeToken({
				        device_token: deviceToken,
				        channel: "SBSD_Alerts", 
				        type: (OS_ANDROID) ? "gcm" : "ios"
				     	}, function (e) {
					        if (e.success) {
					            alert('Successfully unsubscribed from School District Notifications');
					            Ti.App.Properties.setBool("Subscribe_SBSD_Alerts", false);
					            //$.registerForm.close();
					        } else {
					            alert('Error:\n' +
					                ((e.error && e.message) || JSON.stringify(e)));
					        }
				    });
			}
	}
	if ( $.recivePushFromPTA.value != Ti.App.Properties.getBool("Subscribe_PTA_Alerts"))
	{
			if ( $.recivePushFromPTA.value) { 
			    Cloud.PushNotifications.subscribeToken({
			        device_token: deviceToken,
			        channel: "PTA_Alerts", 
			        type: (OS_ANDROID) ? "gcm" : "ios"
			     	}, function (e) {
				        if (e.success) {
				            alert('Successfully subscribed to receive PTA Announcements');
				            Ti.App.Properties.setBool("Subscribe_PTA_Alerts", true);
				            //$.registerForm.close();
				        } else {
				            alert('Error:\n' +
				                ((e.error && e.message) || JSON.stringify(e)));
				        }
			    });
		    } else {
		    	Cloud.PushNotifications.unsubscribeToken({
			        device_token: deviceToken,
			        channel: "PTA_Alerts", 
			        type: (OS_ANDROID) ? "gcm" : "ios"
			     	}, function (e) {
				        if (e.success) {
				            alert('Successfully unsubscribed from PTA Announcements');
				            Ti.App.Properties.setBool("Subscribe_PTA_Alerts", false);
				            //$.registerForm.close();
				        } else {
				            alert('Error:\n' +
				                ((e.error && e.message) || JSON.stringify(e)));
				        }
			    });
		    }
   }
   if ( $.recivePushFromSports.value != Ti.App.Properties.getBool("Subscribe_Sports_Alerts") )
   {
		    if ( $.recivePushFromSports.value) { 
			     Cloud.PushNotifications.subscribeToken({
			        device_token: deviceToken,
			        channel: "Sports_Alerts", 
			        type: (OS_ANDROID) ? "gcm" : "ios"
			     	}, function (e) {
				        if (e.success) {
				            alert('Successfully subscribed to receive Sports Notifications');
				            Ti.App.Properties.setBool("Subscribe_Sports_Alerts", true);
				            //$.registerForm.close();
				        } else {
				        	alert('Error:\n' +
				        	 ((e.error && e.message) || JSON.stringify(e)));
				        }
			    });
		     } else {
		     	Cloud.PushNotifications.unsubscribeToken({
			        device_token: deviceToken,
			        channel: "Sports_Alerts", 
			        type: (OS_ANDROID) ? "gcm" : "ios"
			     	}, function (e) {
				        if (e.success) {
				            alert('Successfully unsubscribed from Sports Notifications');
				            Ti.App.Properties.setBool("Subscribe_Sports_Alerts", false);
				            //$.registerForm.close();
				        } else {
				        	alert('Error:\n' +
				        	 ((e.error && e.message) || JSON.stringify(e)));
				        }
			    });
		     }
    }
   $.changeOptionsWin.close();
});

$.buttonResetPassword.addEventListener("click", function(evt){
		Cloud.Users.requestResetPassword({
	    email: Ti.App.Properties.getString("username"),
	    subject: "Password reset request for School@Hand"
	}, function (e) {
	    if (e.success) {
	        alert('Success: Reset link sent to your e-mail ' + Ti.App.Properties.getString("username"));
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
});




$.changeOptionsWin.addEventListener('close', destroy);
function destroy(){
    $.changeOptionsWin.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.changeOptionsWin.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("loginForm: Cleanup Successfully");
}
