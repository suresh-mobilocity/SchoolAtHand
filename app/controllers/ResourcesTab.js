var args = arguments[0] || {};

var parentController = args.parentTab;
var _admobview = require("admobview");
var adMobView = _admobview.getaddview();
if ( Ti.App.Properties.getBool("DisplayAds")) {
		$.resourcesWindow.add(adMobView);
}
function displayTransportation(e){
	$.resourcesTab.open(Alloy.createController('Transportation', {parentTab: $.resourcesTab}).getView());
}

function displaySports(e){
	$.resourcesTab.open(Alloy.createController('Sports', {parentTab: $.resourcesTab}).getView());
}

function displayPTA(e){
	$.resourcesTab.open(Alloy.createController('PTOMain', {parentTab: $.resourcesTab}).getView());
}

function displayRegister(e){
	$.resourcesTab.open(Alloy.createController('Register', {parentTab: $.resourcesTab}).getView());
}
$.resourcesTab.addEventListener('click', function(e){
	 if ( OS_ANDROID) {
	 	$.resourcesTab.getWindow().animate({left:0, duration:200});
			if (isMenuWindowOpen == true) {
				tabGroupGlobalReference.remove(menuWindow);
				isMenuWindowOpen = false;
	}
 }
});