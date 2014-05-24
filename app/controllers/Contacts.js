var args = arguments[0] || {};

$.parentController = args.parentTab;

$.districtContacts.title = "Contacts";

var contacts = Alloy.Collections.contacts;

var Pager = function() {
	var page = 1;
	this.next = function() {
		page++;
		return page;
	};
};

var lastDistance = 0;
var updating = false;
var fetchSize = 5;
var recsFetched = 0;
var nextFetchIndex = fetchSize+recsFetched;
 
var pager = new Pager();

function cleanString(str) {
	var clean = '';
	if (str) {
		clean = str.replace(/<[^>]+>/g, '');
	}
	return clean;
}



function showId(e) {
	if (e.row.model) {
		alert(e.row.model);
	}
}

//beginUpdate();
/*
contacts.fetch({
    query: 'SELECT * FROM contacts where id < ' + fetchSize
}
);

*/


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
    query: sql
	});	
	
	//fetchData ( sql);
});
$.searchContacts.addEventListener('return',function(e){
	$.searchContacts.blur();
	var sql = 'SELECT * FROM contacts where name like ' + "'%" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where title like + ' + "'%" + e.value + "%'" 
				+ 'UNION SELECT * FROM contacts where building like ' + "'" + e.value + "%'" ;
	
	contacts.fetch({
    query: sql
	});
	
	//fetchData ( sql);
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
	/*
	if (!updating) {
		if (Ti.Platform.osname =='iphone') {
			var offset = e.contentOffset.y;
			var height = e.size.height;
			var total = offset + height;
			var theEnd = e.contentSize.height;
			var distance = theEnd - total;
			if (distance < lastDistance) {
				var nearEnd = theEnd * .75;
				
				if (total >= nearEnd) {
					console.log("SCROLL: update!");
					beginUpdate();
				} else {
					console.log("SCROLL: can't update right now");
				}
			}
			lastDistance = distance;
		} else if (Ti.Platform.osname === 'android') {
			var firstVisibleItemIndex = e.firstVisibleItem;
			var totalItems = e.totalItemCount;
			var visibleItemCount = e.visibleItemCount;
			if ((firstVisibleItemIndex + visibleItemCount) >= (totalItems * 0.75))
				beginUpdate();
		}
	}
	Ti.API.info('!updating is true');
	*/
});

$.districtContacts.addEventListener('blur',function(e){
	$.destroy();
});
/*
function beginUpdate() {
	$.loading.setOpacity(1.0);
	var sql = 'SELECT * FROM contacts where id between ' + recsFetched + " AND " + nextFetchIndex
				+ " ORDER BY id ASC";
	Ti.API.info('Loading data......' + "sql:" + sql);
	updating = true;
	contacts.fetch({
		query: sql ,
		add: true,
		data: {
			p: pager.next()
		},
		success: function(args) {
			Ti.API.info('Fetch Successfull......');
			updating = false;
			$.loading.setOpacity(0);
			recsFetched = recsFetched + fetchSize;
			nextFetchIndex = recsFetched + fetchSize;
		},
		error: function(e) {
			Ti.API.info('Fetch Error......');
			updating = false;
			$.loading.setOpacity(0);
		}
	});
}
*/

