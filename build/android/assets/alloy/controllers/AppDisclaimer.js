function Controller(){function t(){e.DisclaimerWin.removeEventListener("close",t),e.destroy(),e.DisclaimerWin.removeAllChildren(),e=null,o=null}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="AppDisclaimer",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,i={};e.__views.DisclaimerWin=Ti.UI.createWindow({backgroundColor:"white",title:"Disclaimer",layout:"vertical",id:"DisclaimerWin",fullscreen:"true",exitOnClone:"true"}),e.__views.DisclaimerWin&&e.addTopLevelView(e.__views.DisclaimerWin),e.__views.disclaimerView=Ti.UI.createWebView({height:"90%",top:0,id:"disclaimerView",url:"/disclaimer.html"}),e.__views.DisclaimerWin.add(e.__views.disclaimerView),e.__views.buttonLayout=Ti.UI.createView({layout:"horizontal",borderColor:"#336699",id:"buttonLayout"}),e.__views.DisclaimerWin.add(e.__views.buttonLayout),e.__views.buttonAccept=Ti.UI.createButton({title:"Accept",backgroundColor:"#336699",top:"2%",width:"40%",left:"5%",height:Ti.UI.SIZE,font:{fontSize:12,fontWeight:"bold"},color:"white",borderColor:"#336699",borderRadius:8,id:"buttonAccept"}),e.__views.buttonLayout.add(e.__views.buttonAccept),e.__views.buttonDeny=Ti.UI.createButton({title:"Deny",backgroundColor:"#336699",width:"40%",top:"2%",left:"5%",height:Ti.UI.SIZE,font:{fontSize:12,fontWeight:"bold"},color:"white",borderColor:"#336699",borderRadius:8,id:"buttonDeny"}),e.__views.buttonLayout.add(e.__views.buttonDeny),i.destroy=function(){},_.extend(e,e.__views);var r=arguments[0]||{},o=r.parentTab;e.buttonAccept.addEventListener("click",function(){Ti.App.Properties.setString("AppDisclaimerAccepted","true"),o.open(Alloy.createController("SelectSchoolDistrict",{parentTab:o}).getView()),e.DisclaimerWin.close()}),e.buttonDeny.addEventListener("click",function(){Ti.App.Properties.setString("AppDisclaimerAccepted","false"),alert("You must accept the agreement to use this application!"),Ti.App.fireEvent("close",{message:"AppDisclaimerDenied"}),e.DisclaimerWin.close()}),e.DisclaimerWin.addEventListener("close",t),_.extend(e,i)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;