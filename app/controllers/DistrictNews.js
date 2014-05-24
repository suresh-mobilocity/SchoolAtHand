var args = arguments[0] || {};

$.parentController = args.parentTab;

$.districtNews.title = "Disctrict News";
//Ti.API.info('Displaying url' + args.url);

var yqlQuery = "select div from html where url =" +
				 "\"" + args.url + "\"" + " and xpath=" + "'\//div[contains(@id,\"content\")]'" ;

//Ti.API.info('Querying for detailed e-mail news:' + yqlQuery);
var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function() {
		if ( this.status === 200 ) {
			//Ti.API.info('got data from the network: ' + this.responseText)
			//Ti.API.info( 'HTTP response: ' + this.responseText);
			$.newsDetailsWebview.setHtml ('<html><body><b>' +  args.title + '</b>' + this.responseText + '</body></html>');
		} else {
			//Ti.API.info('Unexpected HTTP response: ' + this.status);
			alert ('Unexpected HTTP response: ' + this.status);
		}
};	
xhr.open('GET', 'http://query.yahooapis.com/v1/public/yql');
xhr.send({
		format: 'xml',
		q: yqlQuery
});