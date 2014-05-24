var args = arguments[0] || {};
var parentController = args.parentTab;

//
// Action handler
//
function actionLogin(e) {
   if ( validateInputFields() == false){
		 return;
	}
    else {
    	var loadingLoginProgress = Alloy.createController('ProgressIndicator', {message: 'Login in progress..'}).getView();
    	loadingLoginProgress.open();
        //$.activityIndicator.show();
        $.buttonLogin.enabled = false;   
        Cloud.Users.login({ 
    		login: $.inputUsername.value,
    		password: $.inputPassword.value
				}, function(e) {
		    		if (e.success) {
		    			 $.activityIndicator.hide();
		    			 var user = e.users[0];
		    			  /*
				          Ti.API.info('Success:\n' +
				            'id: ' + user.id + '\n' +
				            'sessionId: ' + Cloud.sessionId + '\n' +
				            'first name: ' + user.first_name + '\n' +
				            'last name: ' + user.last_name);
				           */
		       			 Ti.App.Properties.setString("ACS-StoredSessionId", Cloud.sessionId);
		       			 Ti.App.Properties.setBool("LoggedIn", true);
		       			 loginLabel = "SignOut";
		       			 retrieveDeviceToken();
		                // $.loginForm = null;
		                 $.loginForm.close();     
		   		 	} else {
		       		 	  $.inputPassword.value = '';
		       		 	  $.inputUsername.value = '';
		       		 	  //$.activityIndicator.hide();
		       		 	  loadingLoginProgress.close();
                   		  //alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
                   		  var alertDialog = Titanium.UI.createAlertDialog({
    						title: 'Login Failed',
    							message: ((e.error && e.message) || JSON.stringify(e)),
    							buttonNames: ['Retry', 'Cancel']
    							
						  });
						  alertDialog.show();
						  alertDialog.addEventListener('click', function(evt){
            			  //alertDialog.close();
            						 if (evt.index == 0) { // clicked "Retry"
      									$.loginForm.close();
      									parentController.open(Alloy.createController('login_form', {parentTab: parentController}).getView());
   									 } else if (evt.index == 1) { // clicked "Cancel"
      									$.loginForm.close();
   									 }
       					 });  
						 
		    		}
          });  
    }
}

function retrieveDeviceToken()
{
	if (Ti.App.Properties.hasProperty("ACSDeviceToken") && 
			(!Ti.App.Properties.getString("ACSDeviceToken"))) {
				return;
	} else {
			if ( OS_ANDROID ) {
				CloudPush.retrieveDeviceToken({
				    success: function deviceTokenSuccess(e) {
				    	//Ti.API.info("Registered for Push Notification"+ e.deviceToken);
				    	Ti.App.Properties.setString("ACSDeviceToken", e.deviceToken);
				    	deviceToken = e.deviceToken;
				    	registerNotificationCallbacks();
				    },
				    error: function deviceTokenError(e) {
				    	//Ti.API.info("User is not registered for Push Notifications" + e.error);
				    }
				});
			} else if ( OS_IOS) {
				// use Titanium.Network.registerForPushNotifications
			}
	}
}


function openRegistration(e) {
   //Alloy.createController('Register', {parentTab: parentController}).getView().open();
   parentController.open(Alloy.createController('Register', {parentTab: parentController}).getView());
}

function registerNotificationCallbacks(){
if ( OS_ANDROID) {
			CloudPush.showTrayNotification=true;
			CloudPush.showTrayNotificationsWhenFocused = true;
			CloudPush.focusAppOnPush = false;
			CloudPush.showAppOnTrayClick = true;
			//Ti.API.info("CloudPush device Token:" + deviceToken);
			//Ti.API.info("Registering Callbacks to receive Push Notifications");
			if (OS_ANDROID) {
					CloudPush.addEventListener('callback', function (evt) {
							var eventRec = JSON.stringify(evt);
							//Ti.API.info("Received Push Notification evtRec: " + eventRec.toString());
			    			//Ti.API.info("Received Push Notification: " + evt.payload);				
									var payload = JSON.parse(evt.payload).android;
		   							//Ti.API.info("Alert: " + payload.alert);
									//Ti.API.info("Title: " + payload.title);
									//Ti.API.info("Badge: " + payload.badge);
		   							var notificationModel = Alloy.createModel("notification", {
											datetime: (new Date()).toString(),							       
									        title:  payload.title,
									        message : payload.alert,
									        badge: payload.badge
									 });
								     notificationModel.save();
									 notificationCollection.fetch();
								     notificationCollection.trigger('change');
								     //Ti.API.info("Stored Push Notification: " + evt.payload);					
				});
			}
 } else if (OS_IOS) {
 	// Use Titanium.Network.registerForPushNotifications
 }
};

function destroy(){
    $.loginForm.removeEventListener('close', destroy);
    $.loginForm.removeEventListener("open",refreshLoginStatus );
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.loginForm.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("loginForm: Cleanup Successfully");
}
//
// View Language
//
$.loginForm.title        = 'Login';
$.inputUsername.hintText = 'email address';
$.inputPassword.hintText = 'Password';
$.buttonLogin.title      = 'SignIn';
$.inputUsername.value = (Ti.App.Properties.getString("username")) ? Ti.App.Properties.getString("username") : "";
function validateInputFields()
{
	
	if ( $.inputUsername.value  == "" || validateEmailformat($.inputUsername.value ) == false){
			alert('Error:\n' + "Invalid email or field is empty");
			return false;
	}
	if ( $.inputPassword.value == "" ) {
			 alert('Error:\n' + "Password field empty");
			 return false;
	}
	return true;
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
function refreshLoginStatus()
{
	if ( Ti.App.Properties.getBool("LoggedIn"))
	{
		$.loginForm.close();
	} else {
		$.buttonLogin.touchEnabled = true;
	}
}
$.buttonLogin.addEventListener("click", actionLogin);
$.loginForm.addEventListener("focus",refreshLoginStatus);
$.loginForm.addEventListener('close', destroy);