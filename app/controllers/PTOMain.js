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
			$.parentController.open(Alloy.createController('SchoolPTO', args_t ).getView());
});
function destroy(){
	$.ptoWindow.removeEventListener('close', destroy);
	schollCollection = null;
	$.destroy();
	$.ptoWindow.removeAllChildren();
	$ = null;
	//Ti.API.info("PTOMain| Controller Successfully Cleanedup ");
}
$.ptoWindow.addEventListener('close',destroy);
schoolCollection.fetch();