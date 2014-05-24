
//var db = Ti.Database.open('sbsddatabase');
var secretaryEmailAddr="";
var supervisorEmailAddr = "";
getDataFromDistrictDB();

/*
if ( Ti.Platform.osname === "iphone" || Ti.Platform.osname === "ipad")
{
	iads = Ti.UI.iOS.createAdView({ width: 'auto',height: 'auto'});
	$.ads.add(iads);
}
*/

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

var adMobView = Admob.createView({
				publisherId: "ca-app-pub-3665132116722377/6561150840",
				testing:false, // default is false
				bottom: 0, // optional
				adBackgroundColor: "FF8855", // optional
				backgroundColorTop: "738000", //optional - Gradient background color at top
				borderColor: "#000000", // optional - Border color
				textColor: "#000000", // optional - Text color
				urlColor: "#00FF00", // optional - URL color
				linkColor: "#0000FF" //optional -  Link text color
				//primaryTextColor: "blue", // deprecated -- now maps to textColor
				//secondaryTextColor: "green" // deprecated -- now maps to linkColor
});

//adMobView.requestAd();
//$.adMobView.requestTestAd();
//listener for adReceived

$.transportationWindow.add(adMobView);
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