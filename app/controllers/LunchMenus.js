var args = arguments[0] || {};
var schoolCollection = Alloy.Globals.school;

$.parentController = args.parentTab;
function dataTransformation(_model) {
    return {
        imagefile: Ti.Filesystem.applicationDataDirectory  +"/images" + "/" + _model.attributes.imagefile,
        logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile,
    };
}
$.schoolsTableView.addEventListener('click',function(e) {
			//Ti.API.info('Schools Id selected:' + e.rowData.model);
			
			var data = JSON.stringify(schoolCollection.get(e.rowData.model));
			//Ti.API.info('Selected School shorname: ' + JSON.parse(data).shortname);
			var args_t = {
				parentTab: $.parentController,
				shortname: JSON.parse(data).shortname
			};
  			if (Ti.Platform.osname === 'iphone') {
  				$.parentController.open(Alloy.createController('LunchMenuBySchool', args_t ).getView());
    		//Ti.API.info('after detailController view is rendered');
    	    } ;
    	    if (Ti.Platform.osname === 'android' ) {
    	  			var xhr = Ti.Network.createHTTPClient();
    				xhr.onload = function() {
        						var f = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,"test.pdf");
       							f.write(this.responseData);
        			 			var intent = Ti.Android.createIntent({
            							 action : Ti.Android.ACTION_VIEW,
           								 type : 'application/pdf',
           						 		 data : f.getNativePath()
        						});
        			 			Ti.Android.currentActivity.startActivity(intent);
   				  };
   			 	 xhr.open("GET", "http://www.sbschools.org/our_schools/programs/dining_services/menus/" + args_t.shortname + ".pdf");
   			 	 xhr.send();
		   }    
});

function destroy(){
	$.lunchMenuWindow.removeEventListener('close', destroy);
	schollCollection = null;
	$.destroy();
	$.lunchMenuWindow.removeAllChildren();
	$ = null;
	//Ti.API.info("LunchMenu| Controller Successfully Cleanedup ");
}
$.lunchMenuWindow.addEventListener('close',destroy);
schoolCollection.fetch();