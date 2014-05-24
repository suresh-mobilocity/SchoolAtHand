var args = arguments[0] || {};
var style;
if (OS_IOS){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}
$.activityIndicator.style= style;
$.activityIndicator.message = args.message;
function showIndicator(e){
    $.activityIndicator.show();
    // do some work that takes 6 seconds
    // ie. replace the following setTimeout block with your code
   
    setTimeout(function(){
    	if( $.activityIndicator != null) {
    		$.activityIndicator.hide();
        	e.source.close();
        	$.destroy();
        	$.progressWindow.removeAllChildren();
        	$.progressWindow.removeEventListener('close',hideActivityIndicator);
        	$ = null;
    	}
    }, 5000);
    
}
function destroy(){
    //$.progressWindow.removeEventListener('close', destroy);
    // unbind any data collection you might have bound to the controller
    $.destroy();
    $.progressWindow.removeAllChildren();
    $ = null;
}
//$.progressWindow.addEventListener("close", destroy);
$.progressWindow.addEventListener("close", hideActivityIndicator );
function hideActivityIndicator()
{
	$.activityIndicator.hide();
}
