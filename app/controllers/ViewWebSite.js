var args = arguments[0] || {};
$.parentController = args.parentTab;



$.viewWebSiteWin.title = args.wintitle;
$.webSiteView.url = args.url;
if ( Ti.App.Properties.getBool("DisplayAds")) {
			var _admobview = require("admobview");
			adMobView = _admobview.getaddview();
			$.viewWebSiteWin.add(adMobView);
}