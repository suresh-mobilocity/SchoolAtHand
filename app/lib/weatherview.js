var apiKey = "9cf8d9c7f3f072b1";
//http://api.wunderground.com/api/9cf8d9c7f3f072b1/conditions/q/NJ/edison.json
var baseUrl = "http://api.wunderground.com/api/" + apiKey + "/conditions/q/";
var weather, temp_f, humidity, uv, icon_url;
var weatherView = Ti.UI.createView({
		layout: "vertical",
		top: "2%",
		height: "30%",
		width: "34%",
		right: "2%",
		backgroundColor: "#33B5E5",
		borderRadius: 8
});
var xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		var json = JSON.parse(this.responseText);
		weather = json.current_observation.weather;
		temp_f = json.current_observation.temp_f;
		humidity = json.current_observation.relative_humidity;
		uv = json.current_observation.UV;
		icon_url = json.current_observation.icon_url;
		//Ti.API.info("weather:" + weather + "\n" +"temp: " + temp_f + "\n" + "imgUrl:" + icon_url);
	
	 var  weatherLabel = Ti.UI.createLabel({
	        text: weather,
	        //text: "Partly Cloudy",
	        font:{
	            fontSize:'10dp',
		    fontWeight:'bold'
		},
		height:'auto',
		left:'10dp',
		color:'white',
		touchEnabled:false
	    });
	 var conditionsLabel = Ti.UI.createLabel({
	        text: "T:" + temp_f + "F "+  " H:" + humidity + " UV: " + uv ,
	        //text: "T:" + "59.9 F" +  " H:" + "20%" + " UV: " + "8" ,
	        font:{
	            fontSize:'10dp',
		    fontWeight:'bold'
			},
		height:'auto',
		left:'10dp',
		color:'white',
		touchEnabled:false
	    });
	   var weatherImage = Ti.UI.createImageView({
	   		image: icon_url,
	   		//image: "http://icons-ak.wxug.com/i/c/k/hazy.gif",
	   		height: 50,
	   		width: 50
	   });
	    weatherView.add(weatherLabel);
	    weatherView.add(weatherImage);
	    weatherView.add(conditionsLabel);
	},
	onerror: function(e){
		Ti.API.debug("STATUS: " + this.status);
		Ti.API.debug("TEXT:   " + this.responseText);
		Ti.API.debug("ERROR:  " + e.error);
		alert('There was an error retrieving the remote data. Try again.');
	},
	timeout: 5000
});
exports.fillWeatherReport = function (city, state) {
	var queryUrl = baseUrl + state + "/" + city.replace(' ', '_') + ".json";
	weatherView.removeAllChildren();
	xhr.open("GET", queryUrl);
	//Ti.API.info("Retriving Weather Report");
	xhr.send();
	 var  locationLabel = Ti.UI.createLabel({
	        text: city + " " + state,
	        font:{
	            fontSize:'10dp',
		    fontWeight:'bold'
		},
		height:'auto',
		left:'10dp',
		color:'white',
		touchEnabled:false
	    });
	weatherView.add(locationLabel);
	return weatherView;
};