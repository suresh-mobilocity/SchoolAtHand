function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="AppDisclaimerSigned",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,t={};e.__views.DisclaimerWin=Ti.UI.createWindow({backgroundColor:"white",title:"Disclaimer",layout:"vertical",id:"DisclaimerWin",fullscreen:"true",exitOnClone:"true"}),e.__views.DisclaimerWin&&e.addTopLevelView(e.__views.DisclaimerWin),e.__views.webSiteView=Ti.UI.createWebView({id:"webSiteView",url:"/disclaimer.html"}),e.__views.DisclaimerWin.add(e.__views.webSiteView),t.destroy=function(){},_.extend(e,e.__views),arguments[0]||{},_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;