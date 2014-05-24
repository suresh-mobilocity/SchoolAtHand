function Controller(){function e(){l.districtTab.open(Alloy.createController("DistrictNewsMain",{parentTab:l.districtTab}).getView())}function t(){l.districtTab.open(Alloy.createController("Events",{parentTab:l.districtTab}).getView())}function i(){l.districtTab.open(Alloy.createController("LunchMenus",{parentTab:l.districtTab}).getView())}function o(){l.districtTab.open(Alloy.createController("CommunityEd",{parentTab:l.districtTab}).getView())}function n(){l.districtTab.open(Alloy.createController("Contacts",{parentTab:l.districtTab}).getView())}function r(){var e="SELECT url FROM weburls where name like '%calendar%' ",t="",i=schoolDB.execute(e);i.getRowCount()>0&&i.isValidRow()&&(t=i.fieldByName("url"));var o=Ti.Network.createHTTPClient();o.onload=function(){var e=Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,"SchoolDistrictCalendar.pdf");e.write(this.responseData);var t=Ti.Android.createIntent({action:Ti.Android.ACTION_VIEW,type:"application/pdf",data:e.getNativePath()});Ti.Android.currentActivity.startActivity(t)},o.open("GET",t),o.send()}function a(){l.districtWindow.removeEventListener("close",a),l.destroy(),l.districtWindow.removeAllChildren(),l=null}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="DistrictTab",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var l=this,s={},c={};l.__views.districtWindow=Ti.UI.createWindow({backgroundColor:"#000",id:"districtWindow",title:"District"});var d=[];l.__views.news=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"news"}),d.push(l.__views.news),e?l.__views.news.addEventListener("click",e):c["$.__views.news!click!displayNews"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.news.add(l.__views.buttonView),l.__views.news_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.list_alt,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"news_icon"}),l.__views.buttonView.add(l.__views.news_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"District News",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.events=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"events"}),d.push(l.__views.events),t?l.__views.events.addEventListener("click",t):c["$.__views.events!click!displayEvents"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.events.add(l.__views.buttonView),l.__views.events_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.calendar,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"events_icon"}),l.__views.buttonView.add(l.__views.events_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"Events",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.lunchmenu=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"lunchmenu"}),d.push(l.__views.lunchmenu),i?l.__views.lunchmenu.addEventListener("click",i):c["$.__views.lunchmenu!click!displayLunchMenu"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.lunchmenu.add(l.__views.buttonView),l.__views.lunch_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.food,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"lunch_icon"}),l.__views.buttonView.add(l.__views.lunch_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"Lunch Menu",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.contacts=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"contacts"}),d.push(l.__views.contacts),n?l.__views.contacts.addEventListener("click",n):c["$.__views.contacts!click!displayContacts"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.contacts.add(l.__views.buttonView),l.__views.contacts_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.book_alt,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"contacts_icon"}),l.__views.buttonView.add(l.__views.contacts_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"Contacts",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.calendar=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"calendar"}),d.push(l.__views.calendar),r?l.__views.calendar.addEventListener("click",r):c["$.__views.calendar!click!displayCalendar"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.calendar.add(l.__views.buttonView),l.__views.calendar_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.calendar,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"calendar_icon"}),l.__views.buttonView.add(l.__views.calendar_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"District Calendar",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.communityEdLabel=Ti.UI.createTableViewRow({layout:"vertical",width:Ti.UI.FILL,height:80,id:"communityEdLabel"}),d.push(l.__views.communityEdLabel),o?l.__views.communityEdLabel.addEventListener("click",o):c["$.__views.communityEdLabel!click!displayCommunityEd"]=!0,l.__views.buttonView=Ti.UI.createView({id:"buttonView",top:"0",layout:"horizontal"}),l.__views.communityEdLabel.add(l.__views.buttonView),l.__views.community_icon=Ti.UI.createLabel({top:20,left:10,text:Alloy.Globals.icons.group_alt,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:"15%",textAlign:"right",id:"community_icon"}),l.__views.buttonView.add(l.__views.community_icon),l.__views.row_label=Ti.UI.createLabel({top:20,left:"5%",width:"60%",height:Ti.UI.SIZE,color:"white",font:{fontSize:24,fontWight:"bold",fontFamily:"Helvetica Neue"},textAlign:"left",text:"Community Ed",id:"row_label"}),l.__views.buttonView.add(l.__views.row_label),l.__views.right_arrow=Ti.UI.createLabel({top:20,left:0,text:Alloy.Globals.right_arrow,font:{fontFamily:"AppIcons",fontSize:"24dp"},color:"white",width:50,textAlign:"left",id:"right_arrow"}),l.__views.buttonView.add(l.__views.right_arrow),l.__views.districtView=Ti.UI.createTableView({separatorColor:"#336699",height:Ti.UI.SIZE,backgroundColor:"#33B5E5",data:d,id:"districtView",top:"0",left:"0",layout:"vertical"}),l.__views.districtWindow.add(l.__views.districtView),l.__views.districtTab=Ti.UI.createTab({window:l.__views.districtWindow,id:"districtTab",title:"District"}),l.__views.districtTab&&l.addTopLevelView(l.__views.districtTab),s.destroy=function(){},_.extend(l,l.__views),l.districtTab.addEventListener("click",function(){l.districtTab.getWindow().animate({left:0,duration:200}),1==isMenuWindowOpen&&(tabGroupGlobalReference.remove(menuWindow),isMenuWindowOpen=!1)}),l.districtTab.addEventListener("close",a),c["$.__views.news!click!displayNews"]&&l.__views.news.addEventListener("click",e),c["$.__views.events!click!displayEvents"]&&l.__views.events.addEventListener("click",t),c["$.__views.lunchmenu!click!displayLunchMenu"]&&l.__views.lunchmenu.addEventListener("click",i),c["$.__views.contacts!click!displayContacts"]&&l.__views.contacts.addEventListener("click",n),c["$.__views.calendar!click!displayCalendar"]&&l.__views.calendar.addEventListener("click",r),c["$.__views.communityEdLabel!click!displayCommunityEd"]&&l.__views.communityEdLabel.addEventListener("click",o),_.extend(l,s)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;