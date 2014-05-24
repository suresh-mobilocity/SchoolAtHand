var args = arguments[0] || {} ;
function dialContactNumber(e) {
	//Ti.API.info('dialing phone:' + Alloy.Globals.global_contacts.get(e.model).phonenum);
   // Ti.API.info('Row swiped: ' + e.source.phonenum + e.source.extension);
    var phoneno = e.source.phonenum.replace(/[^0-9]/g,'');
    var extno = e.source.extension.replace(/[^0-9]/g,'');
	Ti.Platform.openURL('tel:'+ phoneno + ",,,," + extno);
}
function sendEmail(e) {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Hello";
	emailDialog.toRecipients = [e.source.emailaddr];
	//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
	emailDialog.open();
}