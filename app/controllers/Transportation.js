//var db = Ti.Database.open('sbsddatabase');
var secretaryEmailAddr="";
var supervisorEmailAddr = "";
getDataFromDistrictDB();



function dialPhoneNumber(e) {
	// remove special characters
	var phoneno = $.phonelabel.text.replace(/[^0-9]/g,'');
	//Ti.API.info("Dialing phone number:" + phoneno );
	Ti.Platform.openURL('tel:'+ 7322977800+ ",,,," + "5108");
}

function getDataFromDistrictDB(){
	var sql = "SELECT * from departments where name like '%Transportation%'";
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
		  $.addresslabel.text = sqlRS.fieldByName('address');
		  $.citylabel.text = sqlRS.fieldByName('city');
		  $.stateandziplabel.text = sqlRS.fieldByName('stateandzipcode');
		  $.phonelabel.text = sqlRS.fieldByName('phoneno');
		  $.supervisorname.text = sqlRS.fieldByName('contactname1');
		  supervisorEmailAddr = sqlRS.fieldByName('emailaddr1');
		  $.secretaryname.text = sqlRS.fieldByName('contactname2');
		  secretaryEmailAddr = sqlRS.fieldByName('emailaddr2');
		 sqlRS.close();
	}
}
$.emailsupervisor.addEventListener('click', function(e){
	var contactname = $.supervisorname.text.split(" ", 2);
	var contactEmailAddr= "";
	var sql = "SELECT emailaddr from contacts where name like '" + contactname[1] + " " + contactname[0] + "'";
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
		contactEmailAddr = sqlRS.fieldByName('emailaddr');
		sqlRS.close();
	}
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Hello";
	emailDialog.toRecipients = [contactEmailAddr];
			//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
	emailDialog.open();
		
});

$.emailsecretary.addEventListener('click', function(e){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Hello";
	emailDialog.toRecipients = [secretaryEmailAddr];
			//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
	emailDialog.open();
		
});
if ( Ti.App.Properties.getBool("DisplayAds") == true) {
	var _admobview = require("admobview");
    var adMobView = _admobview.getaddview();
	$.transportationWindow.add(adMobView);
}
function destroy(){
    $.transportationWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.transportationWindow.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("TransportationWindow: Cleanup Successfully");
}
$.transportationWindow.addEventListener('close', destroy);