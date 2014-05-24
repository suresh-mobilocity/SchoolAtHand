function displayElementarySchools(e){
 	$.schoolsTab.open(Alloy.createController('Schools', {parentTab: $.schoolsTab, schoolType: "E"}).getView());
}
function displayMiddleSchools(e){
    $.schoolsTab.open(Alloy.createController('Schools', {parentTab: $.schoolsTab, schoolType: "M"}).getView());
}
function displayHighSchools(e){
	$.schoolsTab.open(Alloy.createController('Schools', {parentTab: $.schoolsTab, schoolType: "H"}).getView());
}
function findMySchool(e){
	$.schoolsTab.open(Alloy.createController('Findmyschool', {parentTab: $.schoolsTab}).getView());
}
$.schoolsTab.addEventListener('click', function(e){
	 if ( OS_ANDROID) {
	 		$.schoolsTab.getWindow().animate({left:0, duration:200});
			if (isMenuWindowOpen == true) {	
				tabGroupGlobalReference .remove(menuWindow);
				isMenuWindowOpen = false;
	}
 }
});

function destroy(){
    $.schoolsWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.schoolsWindow.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("SchoolsTab: Cleanup Successfully");
}
$.schoolsTab.addEventListener('close', destroy);