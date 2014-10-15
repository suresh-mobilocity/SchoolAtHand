var args = arguments[0] || {};
var grade = 6;
 if (Ti.Platform.osname === 'iphone') {
    $.saveButton.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
    $.profileAddWindow.setRightNavButton($.saveButton);
}
//
//
// EVENT HANDLER
//

$.gradeFieldSlider.text = $.gradeFieldSlider.value;

initSchoolPickerList(grade);

function initSchoolPickerList(gradeLevel) {

	var sql = null;	
	/*
	switch (true) {
			case ( gradeLevel <= 5):
				sql = "SELECT name from schools where TYPE=" + "'E'";
				break;
			case ( gradeLevel > 5  && gradeLevel < 9):
				sql = "SELECT name from schools where TYPE=" + "'M'";
				break;
			case (gradeLevel > 8 && gradeLevel < 13):
				sql = "SELECT name FROM schools where TYPE=" + "'H'";
				break;
	}
	*/
	sql = "SELECT name from schools";
	//var db = Ti.Database.open('sbsddatabase');
	//var mySchoolsRS = db.execute(sql);
	var mySchoolsRS = schoolDB.execute(sql);
	var column = Ti.UI.createPickerColumn();
	if ( mySchoolsRS.getRowCount() > 0 ){
			var row_num = 0;
			while ( mySchoolsRS.isValidRow()){
					row_num ++;
					var sName = mySchoolsRS.fieldByName('name');
					var row = Ti.UI.createPickerRow({
								title: sName
							});
					column.addRow(row);
					mySchoolsRS.next();
			}
			mySchoolsRS.close();
	}
	$.schoolPickerField.add([column]);
}

$.schoolPickerField.addEventListener('focus',function(){
	//updateSchoolPickerList(grade);
});

$.gradeFieldSlider.addEventListener('change',function(e){
		grade = Math.round(e.value) ;
		switch (grade) {
			case 0: 
				$.gradeLabelField.text =  "Grade: KG";
				break;
			case 1:
				$.gradeLabelField.text =  "Grade: 1st";
				break;
			case 2:
				$.gradeLabelField.text =  "Grade: 2nd";
				break;
			case 3:
				$.gradeLabelField.text =  "Grade: 3rd";
				break;
			default:
				$.gradeLabelField.text = "Grade: " + grade + "th";
				break;
		}
		//updateSchoolPickerList(grade);
});

$.saveButton.addEventListener('click', function(_e) {
	if ( $.nameTextField.value == "") {
		alert('Error:\n' + "Student Profiel name field empty");
		return;
	}
	/*
	Ti.API.info('Saving new Profile: ' + $.nameTextField.value + "," + 
						$.schoolPickerField.getSelectedRow(0).title +  "," + 
						$.gradeLabelField.text +  "," + 
						$.teacherTextField.value);
	*/
    var profileModel = Alloy.createModel("profile", {
        name : $.nameTextField.value,
        grade: $.gradeLabelField.text,
        school: $.schoolPickerField.getSelectedRow(0).title,
        teacher: $.teacherTextField.value
    });

    // save model
    profileModel.save();
	//Ti.API.info('Profile: ' + $.nameTextField.value + ' has been saved');
	profileCollection.fetch();
    // close window 
    $.profileAddWindow.close();
    //Ti.API.info(' Add Profile Window is closed' );
    profileCollection.trigger('change');
});