var args = arguments[0] || {};

$.parentController = args.parentTab;

$.districtCalendar.title = "Disctrict Calendar";
//$.webview.url = "http://www.sbschools.org/our_schools/docs/13-14_closings_calendar.pdf";
$.webview.url = args.url;
