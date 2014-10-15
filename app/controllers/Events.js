var args = arguments[0] || {};
var schoolCollection = Alloy.Collections.school;
var parentController = args.parentTab;
function dataTransformation(_model) {
    return {
        imagefile: Ti.Filesystem.applicationDataDirectory  +"/images" + "/" + _model.attributes.imagefile,
        logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile,
    };
}
$.schoolsTableView.addEventListener('click',function(e) {
			//Ti.API.info('Schools Id selected:' + e.rowData.model);
			
			var data = JSON.stringify(schoolCollection.get(e.rowData.model));
			var shortname = JSON.parse(data).shortname;
			var eventsfeedtype = getEventsFeedType(shortname);
			var eventsfeedurl = getEventsFeedUrl(shortname);
			var schoolname = JSON.parse(data).name;
			var args_t = {
				parentTab: parentController,
				shortname: shortname,
				eventsfeedtype: eventsfeedtype,
				rssfeedurl: eventsfeedurl,
				schoolname: schoolname,
				title: schoolname
			};
			if ( getEventsFeedType(shortname) === "RSS"){
				Alloy.createController('RssMain', args_t ).getView();
			} else {	
				parentController.open(Alloy.createController('SchoolEvents', args_t ).getView());
			}
});
function destroy(){
	$.eventsWindow.removeEventListener('close', destroy);
	schollCollection = null;
	$.destroy();
	$.eventsWindow.removeAllChildren();
	$ = null;
	//Ti.API.info("Events| Controller Successfully Cleanedup ");
}
function getEventsFeedType(name){
	var eventsfeedtype = null;
	var sqlQueryStr = "SELECT eventsfeedtype from schools where shortname like '%" + name+ "%'" ;
	var queryResults = schoolDB.execute(sqlQueryStr);
	if ( queryResults.getRowCount() > 0 )
	{
		if ( queryResults.isValidRow())
			{
				eventsfeedtype= queryResults.fieldByName('eventsfeedtype');
			}
	}
	queryResults.close();
	return eventsfeedtype;
}
function getEventsFeedUrl(name){
	var eventsfeedurl = null;
	var sqlQueryStr = "SELECT eventsfeedurl from schools where shortname like '%" + name+ "%'" ;
	var queryResults = schoolDB.execute(sqlQueryStr);
	if ( queryResults.getRowCount() > 0 )
	{
		if ( queryResults.isValidRow())
			{
				eventsfeedurl= queryResults.fieldByName('eventsfeedurl');
			}
	}
	queryResults.close();
	return eventsfeedurl;
}
$.eventsWindow.addEventListener('close',destroy);
schoolCollection.fetch();
