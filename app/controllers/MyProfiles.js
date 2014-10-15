var args = arguments[0] || {};
var parentController = args.parentTab;
var addButton = null;

if (OS_IOS) {
	addButton = Ti.UI.createButton({
		title: 'Add Profile',
		font:{fontSize:14,fontWeight:'bold'},
		style: Ti.UI.iPhone.SystemButtonStyle.PLAIN
	});
	$.profilesWindow.setRightNavButton(addButton);
} else {
	addButton = Ti.UI.createButton({
		title: 'Add Profile',
		backgroundColor: '#336699',
		//top: "80%",
		left: "10%",
	 	width: "85%",
	 	height: Ti.UI.SIZE,
	 	font:{fontSize:14,fontWeight:'bold'},
	 	color: "white",
		//bottom: 20,
		borderRadius: 8
	});

	$.profilesWindow.add(addButton);
}

if ( Ti.App.Properties.getBool("DisplayAds")) {
		var _admobview = require("admobview");
		var adMobView = _admobview.getaddview();
		$.profilesWindow.add(adMobView);
} 

//var profileCollection = Alloy.Collections.instance('profile');
profileCollection.fetch({
    query: 'SELECT * FROM profiles ;'
});

function dofilter(_collection) {
   // debugger;
    return profileCollection.filter(function(_i){
        return;
    });
}

$.profilesTableView.addEventListener('click', function(_e) {
    var detailController = Alloy.createController('ProfileDetail', {
        parentTab : $.profilesTab,
        data : profileCollection.get(_e.rowData.model)
    });
   $.profilesTab.open(detailController.getView());
   //parentController.open(detailController.getView());
});
addButton.addEventListener('click', function(e){
	 var addProfileController = Alloy.createController('AddProfile');
   $.profilesTab.open(addProfileController.getView());
   // parentController.open(addProfileController.getView());
});
$.profilesTab.addEventListener('click', function(e){
	if ( OS_ANDROID) {
		 	$.profilesTab.getWindow().animate({left:0, duration:200});
				if (isMenuWindowOpen == true) {
					tabGroupGlobalReference.remove(menuWindow);
					isMenuWindowOpen = false;
			}
	}
});

function destroy(){
    $.profilesWindow.removeEventListener('close', destroy);
    $.destroy();
    $.profilesWindow.removeAllChildren();
    $ = null;
    Ti.API.info("ProfilesTab: Cleanup Successfully");
}
$.profilesTab.addEventListener('close', destroy);