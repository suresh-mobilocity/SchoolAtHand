function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="ChangeSettings",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,t={};e.__views.changeOptionsWin=Ti.UI.createWindow({backgroundColor:"white",id:"changeOptionsWin",title:"Change Settings"}),e.__views.changeOptionsWin&&e.addTopLevelView(e.__views.changeOptionsWin),e.__views.changeOptions=Ti.UI.createView({top:"5%",layout:"vertical",id:"changeOptions"}),e.__views.changeOptionsWin.add(e.__views.changeOptions),e.__views.__alloyId2=Ti.UI.createView({layout:"horizontal",height:Ti.UI.SIZE,id:"__alloyId2"}),e.__views.changeOptions.add(e.__views.__alloyId2),e.__views.__alloyId3=Ti.UI.createLabel({top:20,left:20,width:"70%",height:Ti.UI.SIZE,font:{fontSize:14,fontWeight:"normal",fontFamily:"Helvetica",fontStyle:"normal"},color:"blue",text:"Disable Ads",id:"__alloyId3"}),e.__views.__alloyId2.add(e.__views.__alloyId3),e.__views.disableAds=Ti.UI.createSwitch({top:20,left:20,width:Ti.UI.SIZE,height:Ti.UI.SIZE,textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,color:"blue",style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,id:"disableAds"}),e.__views.__alloyId2.add(e.__views.disableAds),e.__views.__alloyId4=Ti.UI.createView({layout:"horizontal",height:Ti.UI.SIZE,id:"__alloyId4"}),e.__views.changeOptions.add(e.__views.__alloyId4),e.__views.pushNotificationSelection=Ti.UI.createLabel({top:20,left:20,width:Ti.UI.SIZE,height:Ti.UI.SIZE,font:{fontSize:14,fontWeight:"bold",fontFamily:"Helvetica",fontStyle:"normal"},color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,text:"Change Push Notification Selection",id:"pushNotificationSelection"}),e.__views.__alloyId4.add(e.__views.pushNotificationSelection),e.__views.__alloyId5=Ti.UI.createView({layout:"horizontal",height:Ti.UI.SIZE,id:"__alloyId5"}),e.__views.changeOptions.add(e.__views.__alloyId5),e.__views.__alloyId6=Ti.UI.createLabel({top:20,left:20,width:"70%",height:Ti.UI.SIZE,font:{fontSize:14,fontWeight:"normal",fontFamily:"Helvetica",fontStyle:"normal"},color:"blue",text:"Recieve School District Alerts",id:"__alloyId6"}),e.__views.__alloyId5.add(e.__views.__alloyId6),e.__views.recivePushFromSchools=Ti.UI.createSwitch({top:20,left:20,width:Ti.UI.SIZE,height:Ti.UI.SIZE,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,color:"blue",value:!0,style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,id:"recivePushFromSchools"}),e.__views.__alloyId5.add(e.__views.recivePushFromSchools),e.__views.__alloyId7=Ti.UI.createView({layout:"horizontal",height:Ti.UI.SIZE,id:"__alloyId7"}),e.__views.changeOptions.add(e.__views.__alloyId7),e.__views.__alloyId8=Ti.UI.createLabel({top:20,left:20,width:"70%",height:Ti.UI.SIZE,font:{fontSize:14,fontWeight:"normal",fontFamily:"Helvetica",fontStyle:"normal"},color:"blue",text:"Recieve PTA Announcements",id:"__alloyId8"}),e.__views.__alloyId7.add(e.__views.__alloyId8),e.__views.recivePushFromPTA=Ti.UI.createSwitch({top:20,left:20,width:Ti.UI.SIZE,height:Ti.UI.SIZE,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,value:!0,color:"blue",style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,id:"recivePushFromPTA"}),e.__views.__alloyId7.add(e.__views.recivePushFromPTA),e.__views.__alloyId9=Ti.UI.createView({layout:"horizontal",height:Ti.UI.SIZE,id:"__alloyId9"}),e.__views.changeOptions.add(e.__views.__alloyId9),e.__views.__alloyId10=Ti.UI.createLabel({top:20,left:20,width:"70%",height:Ti.UI.SIZE,font:{fontSize:14,fontWeight:"normal",fontFamily:"Helvetica",fontStyle:"normal"},color:"blue",text:"Recieve Sports Events",id:"__alloyId10"}),e.__views.__alloyId9.add(e.__views.__alloyId10),e.__views.recivePushFromSports=Ti.UI.createSwitch({top:20,left:20,width:Ti.UI.SIZE,height:Ti.UI.SIZE,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,value:!0,color:"blue",style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,id:"recivePushFromSports"}),e.__views.__alloyId9.add(e.__views.recivePushFromSports),e.__views.__alloyId11=Ti.UI.createView({layout:"vertical",height:Ti.UI.SIZE,id:"__alloyId11"}),e.__views.changeOptions.add(e.__views.__alloyId11),e.__views.buttonSaveChanges=Ti.UI.createButton({title:"Save Changes",backgroundColor:"#336699",top:20,left:"10%",width:"80%",height:Ti.UI.SIZE,font:{fontSize:12,fontWeight:"bold"},color:"white",borderRadius:10,id:"buttonSaveChanges"}),e.__views.__alloyId11.add(e.__views.buttonSaveChanges),e.__views.buttonChangeSchoolDistrict=Ti.UI.createButton({title:"Change School District",backgroundColor:"#336699",top:20,left:"10%",width:"80%",height:Ti.UI.SIZE,font:{fontSize:12,fontWeight:"bold"},color:"white",borderRadius:10,id:"buttonChangeSchoolDistrict"}),e.__views.__alloyId11.add(e.__views.buttonChangeSchoolDistrict),e.__views.buttonChangePassword=Ti.UI.createButton({title:"Change Password",backgroundColor:"#336699",top:20,left:"10%",width:"80%",height:Ti.UI.SIZE,font:{fontSize:12,fontWeight:"bold"},color:"white",borderRadius:10,id:"buttonChangePassword"}),e.__views.__alloyId11.add(e.__views.buttonChangePassword),t.destroy=function(){},_.extend(e,e.__views),arguments[0]||{},Ti.API.info("Inside Change Settings Controller"),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;