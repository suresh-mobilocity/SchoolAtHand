var args = arguments[0] || {};
	
var scode = args.shortname;
$.parentController = args.parentTab;
$.viewPTOSite.title = "PTO @" + args.schoolname;
$.webSiteView.url = getPTOWebsiteUrl();	
function  getPTOWebsiteUrl()
	{
		var url="";
		var queryStr = "SELECT website FROM PTO where school like '" + args.shortname + "'" ;
		var sqlRS = schoolDB.execute(queryStr);
		if ( sqlRS.getRowCount() > 0 )
		{
				if ( sqlRS.isValidRow())
				{
						url = sqlRS.fieldByName('website');
				}
		}
		sqlRS.close();
		return url;
}
function destroy(){
	$.viewPTOSite.removeEventListener('close', destroy);
	$.destroy();
	$.viewPTOSite.removeAllChildren();
	$ = null;
	//Ti.API.info("ViewPTOMain| Controller Successfully Cleanedup ");
}
$.viewPTOSite.addEventListener('close',destroy);