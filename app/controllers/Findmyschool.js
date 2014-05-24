var args = arguments[0] || {};
$.parentController = args.parentTab;
$.findMySchoolWindow.title = "School Allotment";
//Ti.Database.install('/sbsddatabase.sqlite', 'sbsddatabase');
//var db = Ti.Database.open('sbsddatabase');
$.schoolFinderButton.addEventListener('click', function(e){
	$.streetNameInput.blur();
	var sql = "SELECT street, elementary, middle FROM schoolallotment WHERE street LIKE '" + $.streetNameInput.value + "%'"  ;
	//var sql = "SELECT street, elementary, middle FROM schoolallotment";
	//Ti.API.info("SQL statement being executed: " + sql);
	//var mySchoolsRS = db.execute(sql);
	var mySchoolsRS = schoolDB.execute(sql);
	//Ti.API.info("SQL Statement was successfully executed: ", sql);
	/*
	var tblSchools = Ti.UI.createTableView({
					//width: 320,
					class: 'container',
					top: 0,
					left: '5%',
					right: '5%',
					backgroundColor: 'lightgray',
					borderRadius: 16,
					borderColor: 'white',
					borderWidth: 2,
					layout: "veritcal"
		});
	*/
	var data=[];
	if ( mySchoolsRS.getRowCount() > 0 )
	{
				var row_num = 0;
				while ( mySchoolsRS.isValidRow()){
						row_num ++;
						var street = mySchoolsRS.fieldByName('street');
						var elementary = mySchoolsRS.fieldByName('elementary');
						var middle = mySchoolsRS.fieldByName('middle');
						//Ti.API.info("Database returned street:" +   street+ ", elementary:" + elementary + ", middle:" + middle);
						
						var row = Ti.UI.createTableViewRow({
							layout: "vertical",	
							height: 80
						});
						
						var rowView = Ti.UI.createView({
							layout: "vertical",
							backgroundColor: 'white',
							//borderColor: 'gray',
							//borderWidth: 2,
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
						});
						var streetLabel = Ti.UI.createLabel({
							left: 5,
							text: row_num + "." + street,
							font: {fontSize: 18, fontWeight: 'normal'},
							height: Ti.UI.SIZE
						});
						rowView.add(streetLabel);
						var elementaryLabel = Ti.UI.createLabel({
							left: 30,
							text: elementary + " " + "Elementary School",
							font: {fontSize: 14, fontWeight: 'normal'},
							color: "blue",
							height: Ti.UI.SIZE
						});
						rowView.add(elementaryLabel);
						var middleLabel = Ti.UI.createLabel({
							left: 30,
							textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
							text: middle + " " + "Middle School",
							font: {fontSize: 14, fontWeight: 'normal'},
							color: "blue",
							height: Ti.UI.SIZE
						});
						rowView.add(middleLabel);
						row.add(rowView);
						data.push(row);
					    mySchoolsRS.next();
				}
				mySchoolsRS.close();
	} else {
	
			var row = Ti.UI.createTableViewRow({
							layout: "vertical",	
							height: 80
				});
						
			var rowView = Ti.UI.createView({
							layout: "vertical",
							backgroundColor: 'transparent',
							borderColor: 'gray',
							borderWidth: 2,
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
				});
			var noResultsLabel = Ti.UI.createLabel({
							left: 5,
							text: " No matching streets found",
							font: {fontSize: 18, fontWeight: 'normal'},
							height: Ti.UI.SIZE
				});
			rowView.add(noResultsLabel);
			row.add(rowView);
			data.push(row);
	}
	$.listOfSchoolsByStreet.setVisible(true);
	$.listOfSchoolsByStreet.title="List of Schools for St: " + street;
	$.listOfSchoolsByStreet.data=data;
});