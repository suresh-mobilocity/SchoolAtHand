var args = arguments[0] || {};
var _admobview = require("admobview");
var adMobView = _admobview.getaddview();

$.parentController = args.parentTab;

$.districtCalendar.title = "Disctrict Calendar";
//$.webview.url = "http://www.sbschools.org/our_schools/docs/13-14_closings_calendar.pdf";
$.webview.url = args.url;
if ( Ti.App.Properties.getBool("DisplayAds")) {
	$.districtCalendar.add(adMobView);
}