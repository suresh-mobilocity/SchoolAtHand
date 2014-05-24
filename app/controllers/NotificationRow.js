$.minus_sign.addEventListener('click', function(e){
	//Ti.API.info("Removing Notification" + e.source.data);
	var notificationMsg = notificationCollection.get(e.source.data);
	notificationMsg.destroy();
	notificationCollection.fetch();
});
