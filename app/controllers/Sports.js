var args = arguments[0] || {};

$.parentController = args.parentTab;
$.sportsWindow.title = "District Sports";
var _admobview = require("admobview");

function loadSportsView(){
var rdata=[];
var rowId = 0;	
	var sql = "SELECT * from sports";
	//var sqlRS = db.execute(sql);
	var sqlRS = schoolDB.execute(sql);
	if ( sqlRS.getRowCount() > 0 )
	{
		while ( sqlRS.isValidRow() )
		{
			var row = Ti.UI.createTableViewRow({
							layout: "vertical",
							//borderColor: "white",
							//borderWidth: 4,
							height: 80,
							left: "1%",
							width: "98%",
							color: "white",
							//backgroundColor: '#336699',
							category: sqlRS.fieldByName('category'),
							url:  sqlRS.fieldByName('website')
						});
			var buttonView = Ti.UI.createView({
							top: 0 ,
							layout: "horizontal"	
						});
			var row_label = Ti.UI.createLabel({
									text: sqlRS.fieldByName('category'),
									top: 20,
									left: "10%",
									width: "60%",
									height: Ti.UI.SIZE,
									//backgroundColor: '#336699',
									color: "white",
									font: {
										fontSize: 24,
										fontWight: "bold",
										fontFamily: 'Helvetica Neue'
									},
									textAlign: 'left'
						});
			var right_arrow = Ti.UI.createLabel({
									top: 20,
									left:  20,
								   	text: Alloy.Globals.right_arrow,
									font: {fontFamily: 'AppIcons', fontSize:'24dp'},
									color: '#fff',
									width: "15%",
									textAlign: 'right'
						});
				buttonView.add(row_label);
				buttonView.add(right_arrow);
				row.add(buttonView);
				rdata.push(row);
				sqlRS.next();
		}
		sqlRS.close();
	}
		var sportsTableView = Titanium.UI.createTableView({data: rdata, 
								separatorColor: '#336699', 
								top: 0 , 
								left: 0, 
								layout: 'vertical',
								height: "90%",
								backgroundColor: '#33B5E5'});
		
		sportsTableView.addEventListener('click', function(e) {
			displaySportsPage ( e.rowData.title, e.rowData.url);
		});
		
		$.sportsWindow.add(sportsTableView);
		if ( Ti.App.Properties.getBool("DisplayAds")) {
			adMobView = _admobview.getaddview();
			$.sportsWindow.add(adMobView);
		}
}

function getSportsURL(catergory) {
var sql = "SELECT * from sports where category like '%" + category + "%'";
var sqlRS = schoolDB.execute(sql);
var url;
	if ( sqlRS.getRowCount() > 0  && sqlRS.isValidRow() )
	{
	 url = sqlRS.fieldByName('website');
		 sqlRS.close();
	}
	return url;
}
function displaySportsPage(title, url){
	var args_t = {
				parentTab: $.parentController,
				wintitle: title,
				url: url
			};
	$.parentController.open(Alloy.createController('ViewWebSite', args_t).getView());
}
/*
function displayGolf(e){
	var args_t = {
				parentTab: $.parentController,
				wintitle: "Golf",
				url: getSportURL("Golf")
			};
	$.parentController.open(Alloy.createController('ViewWebSite', args_t).getView());
}
function displaySportsCamps(e){
	var args_t = {
				parentTab: $.parentController,
				wintitle: "Sports Camp",
				url: getSportURL("Sports Camp")
			};
	$.parentController.open(Alloy.createController('ViewWebSite', args_t).getView());
}
function displaySoccer(e){
	var args_t = {
				parentTab: $.parentController,
				wintitle: "Soccer",
				url: getSportURL("Soccer")
			};
	$.parentController.open(Alloy.createController('ViewWebSite', args_t).getView());
}
*/

loadSportsView();
