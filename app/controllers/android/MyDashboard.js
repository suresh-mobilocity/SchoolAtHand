var args = arguments[0] || {};
var lunchMenu =[];
var fridayFolders = [];
var sportsList = [];
var parentController = args.parentTab;
var tabToNavigateBack = args.tabToNavigateBack;
var windowToNavigate = args.windowToNavigate;
var teacherPhoneno = null;
var teacherEmailAddr = null;


var myProfile = args.data;

var school = myProfile.get('school') ;
var grade = myProfile.get('grade') ;
var teacherName = myProfile.get('teacher');

$.profileDetailsLabel.text =  myProfile.get('name') + "\n" +
						      grade + "\n" + 
						      school + "\n" +
						      "Teacher: "+ teacherName;
$.callButton.text = Alloy.Globals.icons['phone']; 
$.emailButton.text = Alloy.Globals.icons['envelope_alt'];
var eventsList = getEventsFromDistrictCalendarAsTableRows( school);
//$.contentsViewLabel.text = eventsList;
// Add no records found to other types of contentbar
var notFoundTableViewRow =  Ti.UI.createTableViewRow({
							height: 30,
							backgroundColor: '#B2FFFF'
});
var notFoundRowView = Ti.UI.createView({
							left: 5,
							layout: "horizontal",
							id: "contactControls",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE
});
var notFoundRowLabel = Ti.UI.createLabel({
							text: "No Records Found",
							font: {fontSize: 14, fontWeight: 'bold'},
							height: Ti.UI.SIZE,
							color: "#217346"
});
notFoundRowView.add(notFoundRowLabel);
notFoundTableViewRow.add(notFoundRowView);
lunchMenu.push(notFoundTableViewRow);
fridayFolders.push(notFoundTableViewRow);
sportsList.push(notFoundTableViewRow);
						

var eventListTableView = Titanium.UI.createTableView({data: eventsList});
var lunchMenuTableView = Titanium.UI.createTableView({data: lunchMenu});
var fridayFoldersTableView = Titanium.UI.createTableView({data: fridayFolders});
var sportsListTableView = Titanium.UI.createTableView({data: sportsList});
$.eventsButton.color = 'red';
$.contentsScrollView.add(eventListTableView);
//$.homeWorkViewLabel.text = "Home Work List";
//$.lunchMenuViewLabel.text = "Lunch Menu"; 
$.profileImage.image = myProfile.get('url');
//$.teacherName.text = "Teacher: " + teacherName;

Ti.API.info('URL for the profile:' + myProfile.get('url') );

if ( profileCollection.length == 1) {
	$.MyDashboardWindow.backButtonTitle="";
}
//$.parentController.add($.MyDashboardWindow);
/*
if (Ti.Platform.osname === 'android')
{
    Ti.App.addEventListener('android:back', function() 
    {
        tabToNavigateBack.open(windowToNavigate);
    });
};
*/
function getEventsFromDistrictCalendar(school){
	var sql = "SELECT shortname from schools where name = " + "'" + school +"'"; 
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	var scode = null;
	var eventList= "This Week Events:\n";
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
		 scode = sqlRS.fieldByName('shortname');
		 sqlRS.close();
	}
	var eventsQuery = "SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '" + 
							scode.toUpperCase() + "' " + " and eventdate between date('now') and date('now', '+7 day')" +
					  " UNION SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like ''" + 
					  	" and eventdate between date('now') and date('now', '+7 day')" + " order by 1"
					  ;
	Ti.API.info('eventsQuery: ' + eventsQuery);
	var eventResults = schoolDB.execute(eventsQuery);
	
	if ( eventResults.getRowCount() > 0 )
	{
			while ( eventResults.isValidRow())
			{
					var eventDate = eventResults.fieldByName('eventdate');
					var eventDesc = eventResults.fieldByName('eventdescription');
					var weekday = dayNames[eventResults.fieldByName('weekday')];
					eventList = eventList + weekday + " " + eventDate + "--" + eventDesc + "\n" + "\n";
					eventResults.next();
			}
			eventResults.close();
	}
	return eventList;
}

function getEventsFromDistrictCalendarAsTableRows(school){
var rdata=[];
	var sql = "SELECT shortname from schools where name = " + "'" + school +"'"; 
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	var scode = null;
	var eventList= "This Week Events:\n";
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
		 scode = sqlRS.fieldByName('shortname');
		 sqlRS.close();
	}
	var eventsQuery = "SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '" + 
							scode.toUpperCase() + "' " + " and eventdate between date('now') and date('now', '+7 day')" +
					  " UNION SELECT strftime('%m/%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like ''" + 
					  	" and eventdate between date('now') and date('now', '+7 day')" + " order by 1"
					  ;
	Ti.API.info('eventsQuery: ' + eventsQuery);
	var eventResults = schoolDB.execute(eventsQuery);
	
	if ( eventResults.getRowCount() > 0 )
	{
			while ( eventResults.isValidRow())
			{
					var eventDate = eventResults.fieldByName('eventdate');
					var eventDesc = eventResults.fieldByName('eventdescription');
					var weekday = dayNames[eventResults.fieldByName('weekday')];
					var eventRow = Ti.UI.createTableViewRow({
							height: 30,
							backgroundColor: '#B2FFFF'
						});
					var eventRowView = Ti.UI.createView({
							left: 5,
							layout: "horizontal",
							id: "contactControls",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE
						});
					var dateLabel = Ti.UI.createLabel({
							text: eventDate + " " + weekday ,
							font: {fontSize: 14, fontWeight: 'bold'},
							height: Ti.UI.SIZE,
							color: "#217346"
						});
					var descLabel = Ti.UI.createLabel({
							left: 20,
							text: eventDesc,
							font: {fontSize: 12, fontWeight: 'bold'},
							height: Ti.UI.SIZE,
							color: "blue"
						});
					eventRowView.add(dateLabel);
					eventRowView.add(descLabel);
					eventRow.add(eventRowView);
					rdata.push(eventRow);
					eventResults.next();
			}
			eventResults.close();
	}
	return rdata;
}

$.friFolderButton.addEventListener('click', function(e){
	/*
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text = 'Friday Folder Coming Soon!';
	*/
			$.contentsScrollView.removeAllChildren();
			$.contentsScrollView.add(fridayFoldersTableView);
			$.eventsButton.color ='white';
			$.sportsButton.color = 'white';
			$.friFolderButton = 'red';
			$.lunchButton.color ='white';
});
$.lunchButton.addEventListener('click', function(e){
	/*
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text= 'Lunch Menu Coming Soon!';
	*/
			$.contentsScrollView.removeAllChildren();
			$.contentsScrollView.add(lunchMenuTableView);
			
			$.eventsButton.color ='white';
			$.sportsButton.color = 'white';
			$.friFolderButton = 'white';
			$.lunchButton.color ='red';
});
$.sportsButton.addEventListener('click', function(e){
		/*
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text= 'Sports Events Coming Soon!';
		*/
			$.contentsScrollView.removeAllChildren();
			$.contentsScrollView.add(sportsListTableView);
			$.sportsButton.color = 'red';
			$.eventsButton.color = 'white';
			$.friFolderButton = 'white';
			$.lunchButton.color ='white';
});
$.eventsButton.addEventListener('click', function(e){
			/*
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text = eventsList;
			*/
			$.contentsScrollView.removeAllChildren();
			$.contentsScrollView.add(eventListTableView);
			$.eventsButton.color ='red';
			$.sportsButton.color = 'white';
			$.friFolderButton = 'white';
			$.lunchButton.color ='white';
});

$.callButton.addEventListener('click', function(e){
		if ( teacherPhoneno == null)
			{
				getTeacherContacts();
				
			}
			if(teacherPhoneno == null){
				
				alert("Could not find teacher's phone number in contacts");
				return;
			}
			var phoneno = teacherPhoneno.replace(/[^0-9]/g,'');
			Ti.Platform.openURL('tel:'+ phoneno);
});
$.emailButton.addEventListener('click', function(e){
			if ( teacherEmailAddr == null)
			{
				getTeacherContacts();
			}
			if(teacherPhoneno == null){
				
				alert("Could not find teacher's email address in contacts");
				return;
			}
			var emailDialog = Ti.UI.createEmailDialog();
			emailDialog.subject = "Hello";
			emailDialog.toRecipients = [teacherEmailAddr];
			//emailDialog.messageBody = '<b>Appcelerator Titanium Rocks!</b>';
			emailDialog.open();
});
function getTeacherContacts() {
	var contactsQuery = "SELECT phonenum, emailaddr FROM contacts where name like '%" + teacherName + "%'" 
									+ " AND building like '" + school + "%'";
					  
	Ti.API.info('contacts: ' + contactsQuery);
	//var contactResults = db.execute(contactsQuery);
	var contactResults = schoolDB.execute(contactsQuery);
	if ( contactResults.getRowCount() > 0 )
	{
			if ( contactResults.isValidRow())
			{
					teacherPhoneno = contactResults.fieldByName('phonenum');
					teacherEmailAddr = contactResults.fieldByName('emailaddr');
					Ti.API.info('Teacher: ' + teacherName + " phoneno:" + teacherPhoneno + " emailaddr:" + teacherEmailAddr);
			}
	}
	contactResults.close();
}
var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function() {
		if ( this.status === 200 ) {
			//Ti.API.info('got data from the network: ' + this.responseText)
			//Ti.API.info( 'HTTP response: ' + this.responseText);
			 httpResponse = this.responseText ;
			 var searchStr = "havemsg='";
			 var start = httpResponse.indexOf(searchStr);
			 var tStr = httpResponse.substring(start);
			 var end = tStr.indexOf(";");
			 var districtAnnouncement = tStr.substring(searchStr.length,end);
			 Ti.API.info(districtAnnouncement);
			 $.districtAnnouncementsLabel.text="District Announcement:\n" + districtAnnouncement;
		} else {
			Ti.API.info('Unexpected HTTP response: ' + this.status);
			alert ('Unexpected HTTP response: ' + this.status);
		}
};	
xhr.onerror = function(e){
	Ti.API.debug(e.error);
	alert('error');
};
xhr.open('GET', 'http://www.sbschools.org');
xhr.send();