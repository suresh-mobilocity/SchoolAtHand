var args = arguments[0] || {};
var schoolCollection = Alloy.Collections.school;
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
				shortname: JSON.parse(data).shortname,
				schoolname: JSON.parse(data).name
			};
			$.parentController.open(Alloy.createController('SchoolEvents', args_t ).getView());
});
function destroy(){
	$.eventsWindow.removeEventListener('close', destroy);
	schollCollection = null;
	$.destroy();
	$.eventsWindow.removeAllChildren();
	$ = null;
	//Ti.API.info("Events| Controller Successfully Cleanedup ");
}
$.eventsWindow.addEventListener('close',destroy);
schoolCollection.fetch();
