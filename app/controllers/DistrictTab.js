function displayNews(e) {
		$.districtTab.open(Alloy.createController('DistrictNewsMain', {parentTab: $.districtTab}).getView());
}

function displayEvents(e) {
		//$.districtTab.open(Alloy.createController('DistrictNews', {parentTab: $.districtTab}).getView());
		$.districtTab.open(Alloy.createController('Events', {parentTab: $.districtTab}).getView());
}
function displayLunchMenu(e){
		$.districtTab.open(Alloy.createController('LunchMenus', {parentTab: $.districtTab}).getView());
}

function displayCommunityEd(e){
	$.districtTab.open(Alloy.createController('CommunityEd', {parentTab: $.districtTab}).getView());
}
function displayContacts(e) {
	$.districtTab.open(Alloy.createController('Contacts', {parentTab: $.districtTab}).getView());
}
function displayCalendar(e) {
	var sql = "SELECT url FROM weburls where name like '%calendar%' ";
	var calendarURL = "";
	var tmpRS = schoolDB.execute(sql);
	if ( tmpRS.getRowCount() > 0 ){
			if ( tmpRS.isValidRow()){
					calendarURL = tmpRS.fieldByName('url');
			}
	}
	if (OS_ANDROID){
    	  			var xhr = Ti.Network.createHTTPClient();
    				xhr.onload = function() {
        						var f = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,"SchoolDistrictCalendar.pdf");
       							f.write(this.responseData);
        			 			var intent = Ti.Android.createIntent({
            							 action : Ti.Android.ACTION_VIEW,
           								 type : 'application/pdf',
           						 		 data : f.getNativePath()
        						});
        			 			Ti.Android.currentActivity.startActivity(intent);
   				  };
   			 	// xhr.open("GET", "http://www.sbschools.org/our_schools/docs/13-14_closings_calendar.pdf");
   			 	 xhr.open("GET", calendarURL);
   			 	 xhr.send();	       
	} else if (OS_IOS) {
		$.districtTab.open(Alloy.createController('Calendar', {parentTab: $.districtTab, url: calendarURL}).getView());
	}
}

function destroy(){
    $.districtWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.districtWindow.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("DistrictTab: Cleanup Successfully");
}
$.districtTab.addEventListener('click', function(e){
	 if ( OS_ANDROID) {
	 	$.districtTab.getWindow().animate({left:0, duration:200});
			if (isMenuWindowOpen == true) {
				tabGroupGlobalReference.remove(menuWindow);
				isMenuWindowOpen = false;
	}
 }
});

$.districtTab.addEventListener('close', destroy);