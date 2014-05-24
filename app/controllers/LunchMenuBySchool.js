var args = arguments[0] || {};
$.parentController = args.parentTab;

//var lunchMenuUrl = args.shortname;
//Ti.API.info('school shortname is : ' + args.shortname );
$.lunchMenuWebView.setUrl ("http://www.sbschools.org/our_schools/programs/dining_services/menus/" + args.shortname + ".pdf");
function destroy(){
	$.lunchMenu.removeEventListener('close', destroy);
	$.destroy();
	$.lunchMenu.removeAllChildren();
	$ = null;
	//Ti.API.info("LunchMenuBySchool| Controller Successfully Cleanedup ");
}
$.lunchMenu.addEventListener('close',destroy);