var args = arguments[0] || {};
Ti.API.info("RSS feed URL args: " + args.rssfeedurl );
var isIpad = OS_IOS && Alloy.isTablet;
var usesNavGroup = (OS_IOS && Alloy.isHandheld) || OS_MOBILEWEB;
var rssMasterWin = Alloy.createController('RssMaster', {url: args.rssfeedurl, title: args.title}).getView();

// save a global reference to the navgroup on iPhone
if (usesNavGroup) {
	Alloy.Globals.navgroup = OS_MOBILEWEB ? $.navgroup : $.index;
}


// respond to detail event triggered on index controller
rssMasterWin.addEventListener('detail', function(e) {
	// get the detail controller and window references
	var controller = isIpad ? $.detail : Alloy.createController('RssDetail');
	var win = controller.getView();

	// set the new detail article
	controller.setArticle(e.row.articleUrl);

	// open the detail windows
	if (usesNavGroup) {
		if (OS_MOBILEWEB) {
			Alloy.Globals.navgroup.open(win);
		} else {
			Alloy.Globals.navgroup.openWindow(win);
		}
	} else if (OS_ANDROID) {
		win.open();
	}
});

if (OS_ANDROID) {
	args.parentTab.open(rssMasterWin);
} else {
	var RssNavigationWin = Titanium.UI.iOS.createNavigationWindow({
   			window: rssMasterWin
	});
	RssNavigationWin.open();
}