var args = arguments[0] || {};
var selectedSchoolDistrict = null;
var dbUrl = null;
var dbLastUpdated = null;
var supportedSchools = Titanium.UI.createTableView({width: "90%", top: "20%", 
					   height: Ti.UI.SIZE, 
            	       borderColor:'gray' ,
            		   separatorColor: '#000000',
            		   borderWidth: 2 });
//var Compression = require('ti.compression');
//var retrivingSchoolsProgress = Alloy.createController('ProgressIndicator', {message: 'Getting List of Schools'}).getView();
function getSupportedSchoolsTableRows(e)
{
	var rowData=[];
	 for (var i = 0; i < e.files.length; i++)
	 {
	        var file = e.files[i];
	        /*
	      	Ti.API.info('id: ' + file.id + '\n' +
	               'name: ' + file.name + '\n' +
	               'updated_at: ' + file.updated_at);
	            */
	                var filenameParts = file.name.split(".");
	                var filenameExt = filenameParts[1];
	                var filename = filenameParts[0];
	                if ( filenameExt === "db") {
	                	 var data = {filename: filename , fileurl: file.url, fileid: file.id, lastupdated: file.updated_at};
				         var row = Ti.UI.createTableViewRow({
											layout: "vertical",
											left: "1%",
											height: 80,
											width: "98%",
											//backgroundColor: "#336699",
											borderWidth: 8,
											color: "black",
										//	selectedBackgroundColor: (OS_IOS) ? "#336699" : 
										//	selectedColor: "white",
											borderColor: "gray",
											data: data,
											hasCheck: false,
											//touchEnabled: false,
											//bubbleParent: false	
										});
						var recView = Ti.UI.createView({
											layout: "hoizontal",
											top: 0,
											left: 0,
											height: Ti.UI.SIZE,
											width: Ti.UI.SIZE,
											//visibile: false
											touchEnabled: false
										});
						var districtName = Ti.UI.createLabel({
											top: 0,
											text: filename,
											textAlight:  Ti.UI.TEXT_ALIGNMENT_CENTER,
											left: "4%",
											height: 80,
											width: "96%",
											font: {fontSize:16,fontWeight:'bold'},
											//color: "white"
											color: "black",
											touchEnabled: (OS_ANDROID) ? false : true
										});
						/*
						var selectionSwitch = Ti.UI.createSwitch({
					  							 top: 0,
					  							 textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
												 height: 80,
												 left: 20,
												 value: false,
												 //filename: file.name,
												 filename: filename,
												 fileid: file.id,
												 fileurl: file.url,
												 lastupdated: file.updated_at
												// necessary for textAlign to be effective
											});
						if (OS_ANDROID) {
								selectionSwitch.setStyle(Ti.UI.Android.SWITCH_STYLE_CHECKBOX);
						}
						selectionSwitch.addEventListener('change',function(e){
						
										 if( e.value) {
										 	//Ti.API.info("INSTALL| User Selected School District: " + e.source.filename);
										 	selectedSchoolDistrict = e.source.filename;
										 	dbUrl = e.source.fileurl;
										 	dbLastUpdated = e.source.lastupdated;
										 	//Ti.API.info("INSTALL| Database file url: " + e.source.fileurl);
										 	//$.dialog.show(); 	
										 	$.buttonNext.show();
										 	$.buttonExit.hide();
										 	$.buttonBack.show();
										 }
										 //$.dialog.show();
						
						});
						recView.add(selectionSwitch);
						*/
						recView.add(districtName);
						row.add(recView);
						rowData.push(row);
				}
		}
			return rowData;
}

function updateContacts()
{
	var sql = 'SELECT * FROM contacts';	
	Alloy.Globals.contacts.deleteAll();
	//Ti.API.info(" updating contacts collections");
	var tmpRS = schoolDB.execute(sql);
	if ( tmpRS.getRowCount() > 0 ){
			//Ti.API.info("Found " + tmpRS.getRowCount() + "of contacts");
			while ( tmpRS.isValidRow()){
					var fid = tmpRS.fieldByName('id');
					var fname = tmpRS.fieldByName('name');
					var ftitle = tmpRS.fieldByName('title');
					var fdepartment = tmpRS.fieldByName('department');
					var fbuilding = tmpRS.fieldByName('building');
					var fphonenum = tmpRS.fieldByName('phonenum');
					var fext = tmpRS.fieldByName('ext');
					var femailaddr = tmpRS.fieldByName('emailaddr');
					//Ti.API.info("contact: " + fid, fname + ftitle + fdepartment + fbuilding + fphonenum );
					var newContact = Alloy.createModel('contacts', { id: fid,
						name: fname, 
						title: ftitle, 
						department: fdepartment,
						building : fbuilding,
						phonenum : fphonenum,
						ext : fext,
						emailaddr : femailaddr
					} );
					Alloy.Globals.contacts.add(newContact);
					//Alloy.Globals.contacts.save();
			  		tmpRS.next();
			}
			tmpRS.close();
			Alloy.Globals.contacts.saveAll();
	}
}
function updateSchools()
{
	var sql = 'SELECT * FROM schools';
	var columns = Alloy.Globals.school.config.columns;
	Alloy.Globals.school.deleteAll();
	var tmpRS = schoolDB.execute(sql);
	if ( tmpRS.getRowCount() > 0 ){
			while ( tmpRS.isValidRow()){
				 // var row = tmpRS.row([]);
				   var newSchool = Alloy.createModel( 'school', {
				     	earlyreleasehours: tmpRS.fieldByName('earlyreleasehours'),
						delayedhours: tmpRS.fieldByName('delayedhours'),
						regularhours: tmpRS.fieldByName('regularhours'),
						name: tmpRS.fieldByName('name'),
						shortname: tmpRS.fieldByName('shortname'),
						type: tmpRS.fieldByName('type'),
						principal: tmpRS.fieldByName('principal'),
						principal_emailaddr: tmpRS.fieldByName('principal_emailaddr'),
						assistantprincipal: tmpRS.fieldByName('assistantprincipal'),
						 assistantprincipal_emailaddr: tmpRS.fieldByName('assistantprincipal_emailaddr'),
						antibullyingspecialist: tmpRS.fieldByName('antibullyingspecialist'),
						antibullyingspecialist_emailaddr: tmpRS.fieldByName('antibullyingspecialist_emailaddr'),
						websiteurl: tmpRS.fieldByName('websiteurl'),
						imagefile: tmpRS.fieldByName('imagefile'),
						logofile: tmpRS.fieldByName('logofile'),
						address1: tmpRS.fieldByName('address1'),
						 address2: tmpRS.fieldByName('address2'),
						city: tmpRS.fieldByName('city'),
						 state: tmpRS.fieldByName('state'),
						zipcode: tmpRS.fieldByName('zipcode'),
						phone: tmpRS.fieldByName('phone'),
						fax: tmpRS.fieldByName('fax'),
						 longitude: tmpRS.fieldByName('longitude'),
						latitude: tmpRS.fieldByName('latitude'),
						id: tmpRS.fieldByName('id')
					});
					//Ti.API.info("Adding school id: "+ tmpRS.fieldByName('id') + ", name:" + tmpRS.fieldByName('name'));
					 Alloy.Globals.school.add(newSchool);
					 //Alloy.Globals.school.save();	
			  		tmpRS.next();
			}
			tmpRS.close();
			Alloy.Globals.school.saveAll();
			
	}
}
function destroy(){
    $.selectSchoolDistrict.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
    selectedSchoolDistrict = null;
    supportedSchools.removeAllChildren();
    supportedSchools = null;
	dbUrl = null;
	dbLastUpdated = null;
	//retrivingSchoolsProgress = null;
	// remove the children
    $.selectSchoolDistrict.removeAllChildren();
    $ = null;
  //  Ti.API.info("SelectSchoolDistrict: Cleanup Successfully");
   
}


function downloadAndInstallResourceFiles()
{
	var imagesZipfile = selectedSchoolDistrict + ".zip";
	Cloud.Files.query({
    	where: {"name": imagesZipfile }
	}, function (e) {
	    if (e.success) {
	    	if ( e.files.length > 0) {
	    		var file = e.files[0];
	            //Ti.API.info('Found image file archive for school district\n' + selectedSchoolDistrict + file.name);
	            //retrivingSchoolsProgress.close();
	           	unzipAndInstallImageFile(file);
	        }else {
	        	//Ti.API.info("No custom images found for school district" +  selectedSchoolDistrict);
	        	closeApp();
	         }   
	    } else {
	       // Ti.API.info('INSTALL| Error: in querying image file archive :\n' +((e.error && e.message) || JSON.stringify(e)));
	        $.selectSchoolDistrict.close();
	    }
	});
}
function closeApp(){
	    $.selectSchoolDistrict.removeAllChildren();
	    var alertDialog = Ti.UI.createAlertDialog({
	        							message: 'Please Reopen the Application', 
	        							ok: 'OK', 
	        							title:  'Configuration Complete!'
       	});
      	alertDialog.addEventListener( 'click' , function(e){
       					//Ti.API.info("Closing the App" );
       					$.selectSchoolDistrict.close();
       	});
        alertDialog.show();
}
function unzipAndInstallImageFile(remoteFile)
{
			var loadingImagesProgress = Alloy.createController('ProgressIndicator', {message: 'Setting up configuration for \n' + selectedSchoolDistrict}).getView();
    		loadingImagesProgress.open(); 
   			 // download Image Zip file and install.
   			var imagesDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'images');
   			//Ti.API.info("Application Directory: " + Ti.Filesystem.getApplicationDataDirectory());
			if (! imagesDir.exists()) {
				//	 Ti.API.info("Directory not exists:" + imagesDir.getNativePath() );
   					 imagesDir.createDirectory();
			}
			var localZipfile  = Ti.Filesystem.getFile(imagesDir.resolve(), 'tempImages.zip');
			/*
			if ( localZipfile.exists() === true){
				Ti.API.info(" Images Zip file exists" + localZipfile.getNativePath() + "Size:" + localZipfile.getSize() );
			}else
			{
				Ti.API.info(" Images Zip file NOT exists" + localZipfile.getNativePath() );
			}
			*/
			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function() {
						localZipfile.write(this.responseData);
						//Ti.API.info(" Images Zip file donwloaded" + localZipfile.getNativePath() + "Size:" +  localZipfile.getSize() );
						var result = require('ti.compression').unzip(imagesDir.resolve(),localZipfile.resolve(), true);
						//Ti.API.info("Unzipped Images Archive , Status" + result);
   						loadingImagesProgress.close();
   						localZipfile.deleteFile();
						closeApp();	
   			};
   			xhr.open("GET", remoteFile.url);
   			xhr.send();
}


//$.selectSchoolDistrict.open();
$.selectSchoolDistrict.addEventListener('close', destroy);

//retrivingSchoolsProgress.open();
$.selectSchoolDistrict.title = "Select Your School District" ;
Cloud.Files.query({
    page: 1,
    per_page: 20
}, function (e) {
    if (e.success) {
           // Ti.API.info('Success:\n' + 'Found Supported Schools, Count: ' + e.files.length);
            //retrivingSchoolsProgress.close();
            var rowData = getSupportedSchoolsTableRows(e);  
            /*
            var supportedSchools = Titanium.UI.createTableView({data: rowData, width: "90%", top: "20%", 
            						height: Ti.UI.SIZE, 
            						borderColor:'gray' ,
            						separatorColor: '#000000',
            						borderWidth: 2 });
            */
            supportedSchools.setData(rowData);
            $.selectSchoolDistrict.add(supportedSchools); 
    } else {
        //Ti.API.info('INSTALL: Error: in querying supported schools :\n' +  ((e.error && e.message) || JSON.stringify(e)));
    }
});

supportedSchools.addEventListener('click', function(e){
	supportedSchools.touchEnabled = false;
	supportedSchools.bubbleParent = false;
	//e.rowData.setBackgroundColor("#336699");
	//e.rowData.setColor("white");
	e.row.setBackgroundColor("#336699");
	e.row.setHasCheck(true);
	//e.row.setColor("white");
	if (OS_IOS) { e.source.setColor("white"); }
	if (OS_ANDROID) {
		var rows = supportedSchools.data[0].rows;
		for(x in rows) {
            rows[x].tochEnabled = false;
        }
	}
	selectedSchoolDistrict = e.rowData.data.filename;
	dbUrl = e.rowData.data.fileurl;
	dbLastUpdated = e.rowData.data.lastupdated;
	Ti.API.info("Selected School District : " + selectedSchoolDistrict + "dbUrl:" + dbUrl + "dbLastUpdated:" + dbLastUpdated );
	$.buttonNext.show();
	
});
$.buttonNext.addEventListener('click', function(e){
			 var loadingDBProgress = Alloy.createController('ProgressIndicator', {message: 'Loading configuration for \n' + selectedSchoolDistrict}).getView();
    		 loadingDBProgress.open();
   			 //Ti.API.info("INSTALL| User has selected School District : " + selectedSchoolDistrict);  
   			 // download db file and install DB.
   			var databaseDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'databases');
   			//Ti.API.info("Application Directory: " + Ti.Filesystem.getApplicationDataDirectory());
			if (! databaseDir.exists()) {
					//Ti.API.info("Directory not exists:" + databaseDir.getNativePath() );
   					 databaseDir.createDirectory();
			}
			var databaseFile  = Ti.Filesystem.getFile(databaseDir.resolve(), 'schoolDB.sqlite');
			/*
			if ( databaseFile.exists() === true){
				Ti.API.info(" Schooldatabase file exists" + databaseFile.getNativePath() + "Size:" + databaseFile.getSize() );
			}else
			{
				Ti.API.info(" Schooldatabase file NOT exists" + databaseFile.getNativePath() );
			}
			*/
			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function() {
						databaseFile.write(this.responseData);
						loadingDBProgress.close();
						// Install downloaded DB and use it as the DB for everything
						schoolDB = Ti.Database.install(databaseFile.getNativePath(), 'schoolDBDownloaded');
						//schoolDB.close();
						//Ti.API.info("INSTALL: School Database installed successfully from file " + databaseFile.getNativePath() + "Size:" + databaseFile.getSize());
						updateContacts();
						updateSchools();
						Ti.App.Properties.setBool("dbinstalled", true);
						Ti.App.Properties.setString("dbversion", dbLastUpdated );
						Ti.App.Properties.setString("dbname", selectedSchoolDistrict + ".db");
						Ti.App.Properties.setString("UserSchoolDistrict", selectedSchoolDistrict);
						// Download school image resource archive and install
						databaseFile.deleteFile();
						downloadAndInstallResourceFiles();	
   				  };
   			xhr.open("GET", dbUrl);
   			xhr.send();
	//$.selectSchoolDistrict.close();
	//parentController.open(Alloy.createController('index').getView());
});

$.buttonExit.addEventListener('click', function(e){
			selectedSchoolDistrict = null;
			dbUrl = null;
			dbLastUpdated = null;
			Ti.App.fireEvent('close', {message: 'SeclectSchoolDistrict Aborted'});
			$.selectSchoolDistrict.close();
			// Close the Application
});