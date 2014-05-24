var args = arguments[0] || {};
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
 
var eventsList = getEventsFromDistrictCalendar( school);
$.contentsViewLabel.text = eventsList;
//$.homeWorkViewLabel.text = "Home Work List";
//$.lunchMenuViewLabel.text = "Lunch Menu"; 
$.profileImage.image = myProfile.get('url');
//$.teacherName.text = "Teacher: " + teacherName;

//Ti.API.info('URL for the profile:' + myProfile.get('url') );

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
$.drawer.init({
    mainWindow: $.index,
    buttons: [
        { id: 'One', title: 'One', click: function (e) { alert("One"); } },
        { id: 'Two', title: 'Two',  click: function (e) { alert("Two"); } },
        { id: 'Three', title: 'Three',  click: function (e) { alert("Three"); } }
    ],
    autoClose: true,
    gutter: 5
});

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
	//Ti.API.info('eventsQuery: ' + eventsQuery);
	var eventResults = schoolDB.execute(eventsQuery);
	
	if ( eventResults.getRowCount() > 0 )
	{
			while ( eventResults.isValidRow())
			{
					var eventDate = eventResults.fieldByName('eventdate');
					var eventDesc = eventResults.fieldByName('eventdescription');
					var weekday = dayNames[eventResults.fieldByName('weekday')];
					eventList = eventList + weekday + " " + eventDate + "--" + eventDesc + "\n";
					eventResults.next();
			}
			eventResults.close();
	}
	return eventList;
}

$.contentButtonBar.addEventListener('click', function(e){
		
		if ( e.index == 1 )
		{
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text = 'Friday Folder Coming Soon!';
		}
		else if ( e.index == 2 )
		{
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text= 'Lunch Menu Coming Soon!';
		}
		else if ( e.index == 3 )
		{
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text= 'Sports Events Coming Soon!';
		}
		
		if ( e.index == 0 )
		{
			$.contentsViewLabel.text = "";
			$.contentsViewLabel.text = eventsList;
		}
		
});

$.contactTeacher.addEventListener('click', function(e){
	if ( e.index == 0 )
	{
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
	}
	else if ( e.index == 1)
	{
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
	}
});
function getTeacherContacts() {
	var contactsQuery = "SELECT phonenum, emailaddr FROM contacts where name like '%" + teacherName + "%'" 
									+ " AND building like '" + school + "%'";
					  
	//Ti.API.info('contacts: ' + contactsQuery);
	var contactResults = schoolDB.execute(contactsQuery);
	if ( contactResults.getRowCount() > 0 )
	{
			if ( contactResults.isValidRow())
			{
					teacherPhoneno = contactResults.fieldByName('phonenum');
					teacherEmailAddr = contactResults.fieldByName('emailaddr');
					//Ti.API.info('Teacher: ' + teacherName + " phoneno:" + teacherPhoneno + " emailaddr:" + teacherEmailAddr);
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
			 var searchStr = "havemsg=";
			 var start = httpResponse.indexOf(searchStr);
			 var tStr = httpResponse.substring(start);
			 var end = tStr.indexOf(";");
			 var districtAnnouncement = tStr.substring(searchStr.length,end);
			 //Ti.API.info(districtAnnouncement);
			 $.districtAnnouncementsLabel.text="District Announcement:\n" + districtAnnouncement;
		} else {
			//Ti.API.info('Unexpected HTTP response: ' + this.status);
			alert ('Unexpected HTTP response: ' + this.status);
		}
};	
xhr.onerror = function(e){
	Ti.API.debug(e.error);
	alert('error');
};
xhr.open('GET', 'http://www.sbschools.org');
xhr.send();
