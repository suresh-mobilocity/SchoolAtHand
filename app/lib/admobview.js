var adView;
exports.getaddview = function () {
  if (OS_IOS ) {
		adView = 	Admob.createView({
				publisherId: "ca-app-pub-3665132116722377/2467198443",
				keywords: "K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",
        		height: (Ti.Platform.displayCaps.platformHeight == 480) ? "15%": "10%",
				testing: false, // default is false
				width: Ti.UI.FILL,
						 //left: 0, // optional
						//right: 0, // optional
				bottom: 0, // optional
				adBackgroundColor: "FF8855", // optional
				backgroundColorTop: "738000", //optional - Gradient background color at top
				borderColor: "#000000", // optional - Border color
				textColor: "#000000", // optional - Text color
				urlColor: "#00FF00", // optional - URL color
				linkColor: "#0000FF" //optional -  Link text color
				//primaryTextColor: "blue", // deprecated -- now maps to textColor
				//secondaryTextColor: "green" // deprecated -- now maps to linkColor
				});
	} else if (OS_ANDROID) {
			    adView = 	Admob.createView({
        	    publisherId: "ca-app-pub-3665132116722377/6561150840",
        	    keywords: "K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",
				testing: false, // default is false
				height: Ti.UI.SIZE,
				width: Ti.UI.FILL,
						 //left: 0, // optional
						//right: 0, // optional
				bottom: 0, // optional
				adBackgroundColor: "FF8855", // optional
				backgroundColorTop: "738000", //optional - Gradient background color at top
				borderColor: "#000000", // optional - Border color
				textColor: "#000000", // optional - Text color
				urlColor: "#00FF00", // optional - URL color
				linkColor: "#0000FF" //optional -  Link text color
				//primaryTextColor: "blue", // deprecated -- now maps to textColor
				//secondaryTextColor: "green" // deprecated -- now maps to linkColor
			});
	}
	return adView;
};