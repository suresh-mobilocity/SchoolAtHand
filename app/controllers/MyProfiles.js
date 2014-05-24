var args = arguments[0] || {};

var parentController = args.parentTab;

//var profileCollection = Alloy.Collections.instance('profile');
profileCollection.fetch({
    query: 'SELECT * FROM profiles ;'
});

if (Ti.Platform.osname === 'iphone') {
    //$.addButton.addEventListener('click', addNewProfile);
    $.profilesWindow.setRightNavButton($.addButton);
}
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


$.addButton.addEventListener('click', function(e){
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