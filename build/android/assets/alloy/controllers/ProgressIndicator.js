function Controller(){function e(e){i.activityIndicator.show(),setTimeout(function(){null!=i.activityIndicator&&(i.activityIndicator.hide(),e.source.close(),i.destroy(),i.progressWindow.removeAllChildren(),i.progressWindow.removeEventListener("close",t),i=null)},5e3)}function t(){i.activityIndicator.hide()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="ProgressIndicator",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var i=this,o={},r={};i.__views.progressWindow=Ti.UI.createWindow({backgroundColor:"white",id:"progressWindow",fullScreen:"true"}),i.__views.progressWindow&&i.addTopLevelView(i.__views.progressWindow),e?i.__views.progressWindow.addEventListener("open",e):r["$.__views.progressWindow!open!showIndicator"]=!0,i.__views.activityIndicator=Ti.UI.createActivityIndicator({id:"activityIndicator",message:"Loading Data..."}),i.__views.progressWindow.add(i.__views.activityIndicator),o.destroy=function(){},_.extend(i,i.__views);var n,a=arguments[0]||{};n=Ti.UI.ActivityIndicatorStyle.DARK,i.activityIndicator.style=n,i.activityIndicator.message=a.message,i.progressWindow.addEventListener("close",t),r["$.__views.progressWindow!open!showIndicator"]&&i.__views.progressWindow.addEventListener("open",e),_.extend(i,o)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;