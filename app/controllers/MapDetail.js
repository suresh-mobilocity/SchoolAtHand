var args = arguments[0] || {};

//Ti.API.info('latitude:' + args.data.latitude + 'longitude:' + args.data.longitude);
$.mapWindow.title = args.data.name;

if (Ti.Platform.osname === "android")
{
	var rc = MapModule.isGooglePlayServicesAvailable();
	if(rc != MapModule.SUCCESS ) alert ("Google Play Services is not installed/updated/available");
	
}
var ann = MapModule.createAnnotation({
	//latitude : args.model.get("capturedLat"),
	//longitude : args.model.get("capturedLong"),
	latitude: args.data.latitude,
	longitude: args.data.longitude,
	title : args.data.name,
	subtitle : args.data.address1 + "\n" + args.data.city + "\n" + args.data.state + " " + args.data.zipcode, 
	pincolor : MapModule.ANNOTATION_VIOLET,
	animate : true
}); 
$.mapView.addAnnotation(ann);

//var route = [ {latitude: -33.87469, longitude: 151.20689} , {latitude: args.data.latitude, longitude: args.data.longitude} ];
/*
var route= MapModule.createRoute({
	color: "blue",
	points: route,
});
$.mapView.addRoute(route);

*/
$.mapView.addEventListener('click', function(e){
	Ti.Platform.openURL('Maps://?daddr='+ e.source.latitude+","+e.source.longitude );
});

$.mapView.setRegion({	
	//latitude : args.model.get("capturedLat"),
	//longitude : args.model.get("capturedLong"),
	//latitude: '40.411265',
	//longitude: '-74.573208',
	//latitude: args.model.get("latitude"),
	//longitude: args.model.get("longitude"),
	latitude: args.data.latitude,
	longitude: args.data.longitude,
	title : args.data.name,
	latitudeDelta : 0.05,
	longitudeDelta : 0.05
});

function destroy(){
    $.mapWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
	// remove the children
    $.mapWindow.removeAllChildren();
    // run de-allocation
   // Alloy.Globals.deallocate($);
    // set to null for garbage collection
    $ = null;
    //Ti.API.info("MapDetail: Cleanup Successfully");
}
$.mapWindow.addEventListener('close', destroy);
/*
var buttonGetDirections = Ti.UI.createButton({
	 				top: "90%",
	 				left: "2%",
					color: 'orange',
					backgroundColor: '#33B5E5',
					width: Ti.UI.SIZE,
					height:Ti.UI.SIZE,
					font: {fontFamily: 'AppIcons', fontSize:'20dp'},
					title: Alloy.Globals.icons.direction,
					textAlign: 'center',
					data: args.data
	 });
buttonGetDirections.addEventListener('click', function(e) {
	Ti.Platform.openURL('Maps://?daddr='+ e.data.address1 +',' + e.data.city + ','+ e.data.state );
});
$.mapView.add(buttonGetDirections);
*/
