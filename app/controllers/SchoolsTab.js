

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
    $.destroy();
    $.schoolsWindow.removeAllChildren();
    $ = null;
    Ti.API.info("SchoolsTab: Cleanup Successfully");
}
$.schoolsTab.addEventListener('close', destroy);

if ( Ti.App.Properties.getBool("DisplayAds")) {
	var _admobview = require("admobview");
	var adMobView = _admobview.getaddview();
	$.schoolsWindow.add(adMobView);
}
