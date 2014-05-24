var args = arguments[0] || {};

$.parentController = args.parentTab;
$.communityEdWindow.title = "Community Education";
//var db = Ti.Database.open('sbsddatabase');
//$.mailingAddressRow.setHeight(32);
//$.mailingAddress.hide();
//$.communityEdTableView.rowHeight=34;
//Ti.API.info('Entered CommunityEd, before getDepartmentData');
getDepartmentDataFromDB();
//Ti.API.info('Entered CommunityEd, after getDepartmentData');

getCommunityEdContacts();
//Ti.API.info('Entered CommunityEd, after getCommunityEdContacts');

/**
$.phonelabel.addEventListener('click', function(e){
	var phoneNo = $.phonelabel.text;
	dialPhoneNumber(phoneNo,"");
});
**/

function getDepartmentDataFromDB(){
	var sql = "SELECT * from departments where name like '%Community%'";
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
		  $.addresslabel.text = sqlRS.fieldByName('address');
		  $.citylabel.text = sqlRS.fieldByName('city');
		  $.stateandziplabel.text = sqlRS.fieldByName('stateandzipcode');
		  $.phonelabel.text = sqlRS.fieldByName('phoneno');
		 // Ti.API.info($.addresslabel.text + ":" + $.citylabel.text  + ":" +  $.stateandziplabel.text  + ":" + $.phonelabel.text);
		 sqlRS.close();
	}
}

function getCommunityEdContacts(){
var rdata=[];
var rowId = 0;	
	var sql = "SELECT * from communityed";
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	if ( sqlRS.getRowCount() > 0 )
	{
		while ( sqlRS.isValidRow() )
		{
			var sectionName = sqlRS.fieldByName('section');
			var contactName = sqlRS.fieldByName('contactname');
			var emailAddr = sqlRS.fieldByName('emailaddr');
			var phoneNo = sqlRS.fieldByName('phoneno');
			var ext = sqlRS.fieldByName('ext');
			/*
			Ti.API.info('sectionName: ' + sectionName +
						'contactName:' + sectionName +
						'phoneNo: '  + phoneNo );
			*/
			var row = Ti.UI.createTableViewRow({
							layout: "vertical",
							height: 100,
							borderWidth: 1,
							borderColor: "gray"
						});
			var sectionView = Ti.UI.createView({
							layout: "vertical",
							id: "sectionView",
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							height: Ti.UI.SIZE,
							width: Ti.UI.FILL			
						});
			var sectionLabel = Ti.UI.createLabel({
							text: sectionName,
							id: "sectionLabel",
							font: {fontSize: 20, fontWeight: 'bold'},
							color: 'black',
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE
						});
			var contactView = Ti.UI.createView({
							layout: "vertical",
							id: "contactView",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE
							//visibile: false
						});
			var contactNameLabel = Ti.UI.createLabel({
							left: 5,
							text: contactName,
							id: "contactLabel",
							font: {fontSize: 14, fontWeight: 'normal'},
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE,
							color: "black"
						});
			var contactControls = Ti.UI.createView({
							left:5,
							layout: "horizontal",
							id: "contactControls",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE
							//visibile: false
						});
			var contactPhone = Ti.UI.createLabel({
							text: phoneNo,
							id: "contactPhone",
							font: {fontSize: 14, fontWeight: 'bold'},
							height: Ti.UI.SIZE,
							color: "blue"
						});
			var phoneButton = Ti.UI.createButton({
							phone: phoneNo,
							ext: ext,
							left: 20,
							height: 50,
							width: 50,
							backgroundImage: (OS_ANDROID) ? "/images/phone.png" : "images/phone.png" 
						});		
			var eMailButton = Ti.UI.createButton({
							emailaddr: emailAddr,
							left: 20,
							height: 50,
							width: 50,
							backgroundImage: (OS_ANDROID) ? "/images/email.png" : "images/email.png" 
						});
			phoneButton.addEventListener('click', function(e){
				dialPhoneNumber(e.source.phone,e.source.ext);
			});
			eMailButton.addEventListener('click', function(e){
				sendEmail(e.source.emailaddr);
			});
			sectionView.add(sectionLabel);
			sectionView.add(contactNameLabel);
		
			contactControls.add(contactPhone);
			contactControls.add(phoneButton);
			contactControls.add(eMailButton);

			sectionView.add(contactControls);
			//contactView.add(contactLabel);
			//contactView.add(contactPhone);
			row.add(sectionView);
			//row.add(contactView);
			//data[rowId++]=row;
			rdata.push(row);
			sqlRS.next();
		} 
	}
	sqlRS.close();
//	$.communityEdTableView.data=rdata;
 	
	//$.communityEdTableView.setData(rdata);
		//$.communityEdTableView.data=["Suresh", "Velagaleti", "Prakash", "Santosh"];
		var communityEdTableView = Titanium.UI.createTableView({data: rdata, separatorColor: '#000000'});
		$.communityEdWindow.add(communityEdTableView);
} 

function dialPhoneNumber(phoneNo, ext) {
	var dialingNo = phoneNo.replace(/[^0-9]/g,'');
	if ( ext == ""){
		Ti.Platform.openURL('tel:'+ dialingNo );
	} else {
		if (OS_ANDROID ) {
			Ti.Platform.openURL('tel:'+ dialingNo);
		}else
		{
			Ti.Platform.openURL('tel:'+ dialingNo + ",,,," + ext);
		}
	}
}
function sendEmail(emailAddr) {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Hello";
	emailDialog.toRecipients = [emailAddr];
	//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
	emailDialog.open();
}