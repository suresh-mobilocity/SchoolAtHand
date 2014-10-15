var args = arguments[0] || {};
var rss = require('rss');
$.rssMasterWin.title = args.title;
// open detail window
function openDetail(e) {
	$.trigger('RssDetail', e);
}

// Refresh table data from remote RSS feed
function refreshRss() {
	rss.loadRssFeed({
		success: function(data) {
			var rows = [];
			_.each(data, function(item) {
				Ti.API.info("title:" + item.title + "articleUrl:" + item.link + "date:" + item.pubDate);
				rows.push(Alloy.createController('RssRow', {
					articleUrl: item.link,
					image: item.image,
					title: item.title,
					date: item.pubDate
				}).getView());
			});
			$.table.setData(rows);
		}
	});
}

// do initial load of RSS
Ti.API.info("Setting url" + args.rssfeedurl);
rss.setUrl(args.url);
refreshRss();