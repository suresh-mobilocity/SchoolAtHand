var args = arguments[0] || {};
var parentController = args.parentTab;

function showOptions(){
    $.dialog.show();
}

function destroy(){
    $.DisclaimerWin.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
    // remove the children
    $.DisclaimerWin.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    parentController = null;
    //Ti.API.info("AppDiscalimer| Cleanup Successful");
}
/*
$.dialog.addEventListener('click', function(e){
	if ( e.index < 2 )
	{
		if ( e.index == 0){
			Ti.App.Properties.setString('AppDisclaimerAccepted', 'true');
			Ti.API.info('Discalimer is Accepted');
		}
		else if ( e.index == 1 )
		{
			Ti.App.Properties.setString('AppDisclaimerAccepted', 'false');
			Ti.API.info('Discalimer Denied');
		}
	}
	$.DisclaimerWin.close();
	//parentController.open(Alloy.createController('index').getView());
});
*/

$.buttonAccept.addEventListener('click', function(e){
	Ti.App.Properties.setString('AppDisclaimerAccepted', 'true');
	//Ti.API.info('Discalimer is Accepted');
	parentController.open(Alloy.createController('SelectSchoolDistrict',{parentTab: parentController} ).getView());
	$.DisclaimerWin.close();
	
});
$.buttonDeny.addEventListener('click', function(e){
	Ti.App.Properties.setString('AppDisclaimerAccepted', 'false');
	alert('You must accept the agreement to use this application!');
	Ti.App.fireEvent('close', {message: 'AppDisclaimerDenied'});
	$.DisclaimerWin.close();
});
//$.DisclaimerWin.open();

$.DisclaimerWin.addEventListener('close', destroy);