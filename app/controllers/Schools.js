var args = arguments[0] || {};
var schoolCollection = Alloy.Collections.school;

$.parentController = args.parentTab;

function dofilter(_collection) {
    //debugger;
    return schoolCollection.filter(function(_i){
    		//Ti.API.info('filter types' + _i.attributes.type  + ':'+  args.schoolType);
        	return (_i.attributes.type == args.schoolType);
            });
}

function dataTransformation(_model) {
	//Ti.API.info('Inside the dataTransformation()' + _model.get('name') + _model.get('city') + _model.get('address1') + _model.get('phone)'));
    //Ti.API.info('Inside the map event listener 1 ' + _model.attributes.longitude + _model.attributes.name);
    return {
        imagefile: Ti.Filesystem.applicationDataDirectory  +"/images" + "/" + _model.attributes.imagefile,
        logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile,
    };
}
function destroy(){
	$.schoolsListWindow.removeEventListener('close', destroy);
	schollCollection = null;
	$.destroy();
	$.schoolsListWindow.removeAllChildren();
	$ = null;
	//Ti.API.info("Schools| Controller Successfully Cleanedup ");
}
$.schoolsListWindow.addEventListener("close", destroy);

$.schoolsTableView.addEventListener('click',function(e) {
	//		Ti.API.info('Schools Id selected:' + e.rowData.model);
			var args_t = {
				parentTab: $.parentController,
				data: schoolCollection.get(e.rowData.model),
				"$model": e.rowData.model
			};
    		$.parentController.open(Alloy.createController('SchoolDetail', args_t ).getView());
});


// 
switch (args.schoolType) {
	case "E": 
			$.schoolsListWindow.title = "Elementary Schools";
			break;
	case "M": 
			$.schoolsListWindow.title = "Middle Schools";
			break;
	case "H": 
			$.schoolsListWindow.title = "High Schools";
			break;
	default:
			break;
}
schoolCollection.fetch();