function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="DistrictNews",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,t={};e.__views.districtNews=Ti.UI.createWindow({backgroundColor:"white",id:"districtNews",title:"District News",modal:"false"}),e.__views.districtNews&&e.addTopLevelView(e.__views.districtNews),e.__views.newsDetailsWebview=Ti.UI.createWebView({id:"newsDetailsWebview"}),e.__views.districtNews.add(e.__views.newsDetailsWebview),t.destroy=function(){},_.extend(e,e.__views);var i=arguments[0]||{};e.parentController=i.parentTab,e.districtNews.title="Disctrict News";var o='select div from html where url ="'+i.url+'" and xpath=\'//div[contains(@id,"content")]\'',r=Titanium.Network.createHTTPClient();r.onload=function(){200===this.status?e.newsDetailsWebview.setHtml("<html><body><b>"+i.title+"</b>"+this.responseText+"</body></html>"):alert("Unexpected HTTP response: "+this.status)},r.open("GET","http://query.yahooapis.com/v1/public/yql"),r.send({format:"xml",q:o}),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;