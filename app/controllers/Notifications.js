var args = arguments[0] || {};

var parentController = args.parentTab;
var notificationList = notificationCollection;

notificationList.fetch({
    query: 'SELECT * FROM notifications ORDER BY notificationid desc;'
});


function dofilter(_collection) {
   // debugger;
    return notificationList.filter(function(_i){
        return;
    });
}

function destroy(){
    $.notificationsWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.notificationsWindow.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("NotificationsWindow: Cleanup Successfully");
}
$.notificationsWindow.addEventListener('close', destroy);