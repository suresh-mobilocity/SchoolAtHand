var args = arguments[0] || {};

$.parentController = args.parentTab;

$.schoolWebSite.title = args.data.schoolname;
$.schoolWebView.url = args.data.url;