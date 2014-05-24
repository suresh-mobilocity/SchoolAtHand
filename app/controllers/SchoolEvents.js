	var args = arguments[0] || {};
	
	var scode = args.shortname;
	var rowsData = [];
	var adMobView = null;
	var tableView = null;
	var _admobview = require("admobview");
	$.parentController = args.parentTab;
	$.schoolEventsWin.title = "Events @ " + args.schoolname;
	
	var eventsQuery = "SELECT strftime('%y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth, " 
		+ "strftime('%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription "
		+ "from districtcalendar where schoolcode like '"
		+ scode.toUpperCase() + "' AND eventdate >= date ('now') " +
		" UNION SELECT strftime('%y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth , "
		+ "strftime('%d', eventdate) as eventdate, strftime('%w', eventdate) as weekday, eventdescription "
		+ "from districtcalendar where schoolcode like ''"
		+ " AND eventdate >= date ('now') " + " order by 1"
					  ;
	//var eventResults = db.execute(eventsQuery);
	var eventResults = schoolDB.execute(eventsQuery);
	if ( eventResults.getRowCount() > 0 )
	{
			var rowDate = null;
			var rowDesc = null;
			if ( eventResults.isValidRow())
			{
					var eventDate = eventResults.fieldByName('eventdate');
					var eventMonth = eventResults.fieldByName('eventmonth');
					var eventYear = eventResults.fieldByName('eventyear');
					var eventDesc = eventResults.fieldByName('eventdescription');
					var weekday = dayNames[eventResults.fieldByName('weekday')];
					var monthName = monthNames[eventMonth -1];
					rowDate = monthName + " " + eventDate + " " + weekday;
					rowDesc = "*" + eventDesc;
					eventResults.next();
			}
			while ( eventResults.isValidRow())
			{
					var eventDate = eventResults.fieldByName('eventdate');
					var eventMonth = eventResults.fieldByName('eventmonth');
					var eventYear = eventResults.fieldByName('eventyear');
					var eventDesc = eventResults.fieldByName('eventdescription');
					var weekday = dayNames[eventResults.fieldByName('weekday')];
					var monthName = monthNames[eventMonth -1];
					var currDate = monthName + " " + eventDate + " " + weekday;
					
					if ( currDate == rowDate){
						rowDesc = rowDesc + "\n" + "* " + eventDesc;
					}
					else
					{	
						
						var eventDateLabel = Titanium.UI.createLabel({
												text:  rowDate,
												font:{fontSize:14,fontWeight:'bold'},
												color: 'blue',
												width:'auto',
												left:5,
												top: 10,
												//height:Ti.UI.SIZE
											});
											
						var eventDescLabel = Titanium.UI.createLabel({
												text: rowDesc,
												font:{fontSize:14,fontWeight:'bold', color: '#000000'},
												width:'auto',
												left: 10,
												top: 10,
												color: 'black'
												//height:Ti.UI.SIZE
											});
							/**
							var addToCalendarButton = Ti.UI.createButton({
								left: 20,
								height: 32,
								width: 32,
								image: "images/email.png"
							});
							**/
						var eventRow = Titanium.UI.createTableViewRow({
				 					height: Ti.UI.SIZE,  
				 					layout: "vertical",
				 					//backgroundColor: '#ffffff',
				 					color: '#000000',
				 					className: 'eventRow'
		 					});
							eventRow.add(eventDateLabel);
							eventRow.add(eventDescLabel);
							//	eventRow.add(addToCalendarButton);
							rowsData.push(eventRow);
							
					/**
					addToCalendarButton.addEventListener('click', function(e){
						var eventBegins = new Date(eventYear, eventMonth, eventYear,0,0,0); 
						var eventEnds = new Date(eventYear, eventMonth, eventYear,12,0,0);
						var eventDetails = { 
                        				title: eventDesc,
                       		 			notes: 'School Event',
                        				location: 'School',
                        				begin: eventBegins,
                        				end: eventEnds,
                        				availability: Ti.Calendar.AVAILABILITY_FREE,
                        				allDay: true
                       				};
                       	var event1 = defCalendar.createEvent(eventDetails);
					});
					**/
							rowDate = currDate;
							rowDesc = "* " + eventDesc;
					}
					eventResults.next();
			}
			eventResults.close();
	}
	tableView = Titanium.UI.createTableView({
					data: rowsData, 
					backgroundColor: '#ffffff', 
					separatorColor: '#000000', 
					height: "90%",
					top: 0 
	});	
	adMobView = _admobview.getaddview();
	
	$.schoolEventsWin.add(tableView);
	$.schoolEventsWin.add(adMobView);
	
	$.schoolEventsWin.addEventListener("close", function (e){
		$.schoolEventsWin.remove(tableView);
		$.schoolEventsWin.remove(adMobView);
		rowsData = null;
		tableView = null;
		adMobView = null;
	});
