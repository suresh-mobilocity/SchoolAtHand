var args = arguments[0] || {};

$.parentController = args.parentTab;

$.districtContacts.title = "Contacts";
var contacts = Alloy.Collections.contacts;
$.contactsTable.visible = false;

$.searchContacts.addEventListener('change',function(e){
	//Ti.API.info('user searching for ' + e.value);
	//return e.value;
});
$.searchContacts.addEventListener('focus',function(e){
	
});
$.searchContacts.addEventListener('search',function(e){
	$.searchContacts.blur();
	
	var sql = 'SELECT * FROM contacts where name like ' + "'" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where title like + ' + "'%" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where building like ' + "'" + e.value + "%'" ;
	
	contacts.fetch({
    	query: sql,
    	success: function(e) {
    		$.loading.setOpacity(0.0);
    	}
	});	
	
	//fetchData ( sql);
});
$.searchContacts.addEventListener('return',function(e){
	$.activityIndicator.show();
	$.searchContacts.blur();
	var sql = 'SELECT * FROM contacts where name like ' + "'%" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where title like + ' + "'%" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where building like ' + "'" + e.value + "%'" ;
	
	contacts.fetch({
    	query: sql,
    	success: function(e) {
    		$.contactsTable.visible = true;
    		$.activityIndicator.hide();
    	}
	});
});
$.searchContacts.addEventListener('cancel',function(e){
	$.searchContacts.blur();
	$.searchContacts.value = "";
});
//$.districtContacts.open();

$.contactsTable.addEventListener('scroll', function(e) {
	if($.searchContacts.value != ""){
		return;
	}
});

$.districtContacts.addEventListener('blur',function(e){
	/*
	if ( OS_IOS) {
		$.destroy(); // Possible crash on iPhone4 ( iOS 6.x)
		$.districtContacts.removeAllChildren();
		$ = null;
	}
	*/
});

function filterRows(collection) {
	var recCount = collection.models.length;
    if (recCount === 0) {
        $.noResults.text = 'No contacts found';    
    } else if (recCount === 1){
        $.noResults.text = 'Found ' + 1 + 'contact';
    } else {
    	$.noResults.text = 'Found ' + recCount+ ' of contacts';
    }
    return collection.models;
}