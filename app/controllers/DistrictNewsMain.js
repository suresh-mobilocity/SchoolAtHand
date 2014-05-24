var args = arguments[0] || {};

$.parentController = args.parentTab;
var yqlQuery = 'select a, content from html where url="http://www.sbschools.org" and xpath=\'//span[contains(@class,"calendar_desc_text")]\'';
//var yqlQuery = 'SELECT  * from html where url="http://www.sbschools.org"';
var rowsData = [];
var tableView = null;

Ti.Yahoo.yql( yqlQuery, function(e){
	if (e.data ) {
		
		var intElement = 0, intElements = e.data.span.length, element;
    	var intContent = 0, intContents = 0, heading;
    
     	//Ti.API.info('Elements under span: ' + intElements);
    	for (intElement = 0; intElement < intElements; intElement = intElement + 1) {
       			 element = e.data.span[intElement];  
       			// Ti.API.info('element: ' + JSON.stringify(element));
       			 if ( element) {
       			 
       			 	var newsPreview = element.content;
       			 	var heading = element.a;
       			 if (newsPreview && heading) {
               			 if ( heading.strong) {
                		 		//Ti.API.info(heading.strong + ': ' + newsPreview + ":" + heading.href);
		                		 var newsTitle = heading.strong;
		                		 var newsLink = heading.href;
		                		 var newsRow = Titanium.UI.createTableViewRow({height: Ti.UI.SIZE, 
		                		 												hasChild: true, 
		                		 												link: newsLink, 
		                		 												newstitle: newsTitle, 
		                		 												layout: "vertical",
		                		 												backgroundColor: "white", 
		                		 												color: '#000000', 
		                		 												className: 'newsRow'});
								 var titleLabel = Titanium.UI.createLabel({
												text:newsTitle,
												font:{fontSize:16,fontWeight:'bold', color: '#0000ff'},
												width:'auto',
												left:5,
												top: 10,
												color: "#0000ff"
												//height:Ti.UI.SIZE
											});
								var previewLabel = Titanium.UI.createLabel({
												text:newsPreview,
												font:{fontSize:12,fontWeight:'normal', color: '#000000'},
												width:'auto',
												left:5,
												color: "#000000"
												//height:Ti.UI.SIZE
											});
								newsRow.add(titleLabel);
								newsRow.add(previewLabel);
								rowsData.push(newsRow);
    					}
        		}      
   		 }        
   	}
   // Ti.API.info("Creating TableView and adding rowData");
    tableView = Titanium.UI.createTableView({data:rowsData});
	$.districtNewsMain.add(tableView);
	tableView.addEventListener('click', function(e) {
		//Ti.API.info('Clicked News link:' + e.rowData.link);
		$.parentController.open(Alloy.createController('DistrictNews', {parentTab: $.parentController, title: e.rowData.newstitle, url: e.rowData.link }).getView());
	});
}
});

function displayProgress () {
    var progressWindow = Alloy.createController('ProgressIndicator').getView();
    progressWindow.open();
}
$.districtNewsMain.addEventListener("close", function(e){
	//Ti.API.info("Removing and destroying TableView and rowdata");
	$.districtNewsMain.remove(tableView);
	rowsData = [];
	tableView = null;
});
