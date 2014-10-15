var args = arguments[0] || {};
function dataTransformation(_model) {
     return {
        name : _model.attributes.name,
        address1 : _model.attributes.address1,
        city : _model.attributes.city,
        state : _model.attributes.state,
        zipcode: _model.attributes.zipcode,
        phone: _model.attributes.phone,
        stateandzip:  _model.attributes.state + " " + _model.attributes.zipcode,
        fax: _model.attributes.fax,
        latitude: _model.attributes.latitude,
        longitude: _model.attributes.longitude,
        //imagefile: "/images" + "/" + _model.attributes.imagefile,
        //logofile: "/images" + "/" + _model.attributes.logofile,
        imagefile: Ti.Filesystem.applicationDataDirectory  +"/images" + "/" + _model.attributes.imagefile,
        logofile: Ti.Filesystem.applicationDataDirectory + "/images" + "/" + _model.attributes.logofile,
        websiteurl: _model.attributes.websiteurl,
        principal:  _model.attributes.principal,
        assistantprincipal:  _model.attributes.assistantprincipal,
        antibullyingspecialist:  _model.attributes.antibullyingspecialist,
        principal_emailaddr: _model.attributes.principal_emailaddr,
        assistantprincipal_emailaddr: _model.attributes.assistantprincipal_emailaddr,
        antibullyingspecialist_emailaddr: _model.attributes.antibullyingspecialist_emailaddr,
      	regular_hours: "Regular Hours: " + _model.attributes.regularhours,
      	delayed_hours: "Delayed Opening: "+ _model.attributes.delayedhours,
      	earlyrelease_hours: "Early Release: " + _model.attributes.earlyreleasehours,
      	id:  _model.attributes.id
    };
      
}
function dialPhoneNumber(e) {
	// remove special characters
	var phoneno = args.data.attributes.phone.replace(/[^0-9]/g,'');
	//Ti.API.info("Dialing phone number:" + phoneno );
	Ti.Platform.openURL('tel:'+ phoneno);
}
function getEmailAddr(sname, name, title){
	var email_addr = "";
	var sql = "SELECT * from contacts where building like '" + sname + "%'" + 
			   " and title like '" + title + "%'";
	/*
		var contacts = Alloy.Collections.contacts;
		contacts.fetch({
			query: sql,
			success: function(){
				
			}
		})
	*/
	//var db = Ti.Database.open('sbsddatabase');
	//var contactRS = db.execute(sql);
	var contactRS = schoolDB.execute(sql);
	if ( contactRS.getRowCount() > 0 && contactRS.isValidRow() ){
		var email_addr = contactRS.fieldByName('emailaddr');
	}
	return email_addr;
}
function destroy(){
    $.detailWindow.removeEventListener('close', destroy);
    $.destroy();
    $.detailWindow.removeAllChildren();
    $ = null;
    Ti.API.info("SchoolDetails: Cleanup Successfully");
}

$.parentController = args.parentTab;

$.schoolDetail = _.extend({}, $.schoolDetail, {
    transform : function() {
        return dataTransformation(this);
    }
});


$.schoolDetail.set(args.data.attributes);

$.mapbutton.addEventListener('click', function(_e) {
    	//var coordinates = {longitude: $.schoolDetail.longitude,latitude: $.schoolDetail.latitude, name: args.data.attributes.name };
    	//Ti.API.info('Inside the map event listener ' + args.data.attributes.latitude);
        var mapController = Alloy.createController('MapDetail', {
            data: args.data.attributes         
        });
        args.parentTab.open(mapController.getView());
        
      /*
      Ti.API.info('city:' + args.data.attributes.city + 'state:' +args.data.attributes.state + 'latitude:' + args.data.attributes.latitude+ 'longitude'+ args.data.attributes.longitude );
      //Ti.Platform.openURL('Maps://z=11&amp;q='+args.data.attributes.city+','+args.data.attributes.state+'&amp;ll='+args.data.attributes.latitude+','+args.data.attributes.longitude);
	  Ti.Platform.openURL('Maps://?daddr='+ args.data.attributes.address1 +',' + args.data.attributes.city + ','+ args.data.attributes.state );
	 */
});	

$.webbutton.addEventListener('click', function(_e) {
		//Ti.API.info('School Web Site View Controller for School' + args.data.attributes.name + ':' + args.data.attributes.websiteurl);
        var webSiteController = Alloy.createController('SchoolWebSite', {
            data: {schoolname: args.data.attributes.name, url: args.data.attributes.websiteurl }   
        });
        args.parentTab.open(webSiteController.getView());
});

$.emailPrincipal.addEventListener('click',function(e){
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Hello";
		emailDialog.toRecipients = [args.data.attributes.principal_emailaddr];
		emailDialog.open();
});
$.emailAsstPrincipal.addEventListener('click',function(e){
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Hello";
		emailDialog.toRecipients = [args.data.attributes.assistantprincipal_emailaddr];
		emailDialog.open();
});
$.emailABSpecialist.addEventListener('click',function(e){
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Hello";
		emailDialog.toRecipients = [args.data.attributes.antibullyingspecialist_emailaddr];
		emailDialog.open();
});
$.detailWindow.addEventListener('close', destroy);