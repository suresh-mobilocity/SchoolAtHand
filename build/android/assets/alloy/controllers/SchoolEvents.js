function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="SchoolEvents",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var e=this,t={};e.__views.schoolEventsWin=Ti.UI.createWindow({backgroundColor:"transparent",id:"schoolEventsWin",title:"Events",modal:"false"}),e.__views.schoolEventsWin&&e.addTopLevelView(e.__views.schoolEventsWin),t.destroy=function(){},_.extend(e,e.__views);var i=arguments[0]||{},o=i.shortname,a=[],r=null,l=null,n=require("admobview");e.parentController=i.parentTab,e.schoolEventsWin.title="Events @ "+i.schoolname;var s="SELECT strftime('%y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth, strftime('%d', eventdate) as eventdate , strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '"+o.toUpperCase()+"' AND eventdate >= date ('now')  UNION SELECT strftime('%y', eventdate) as eventyear, strftime('%m', eventdate) as eventmonth , strftime('%d', eventdate) as eventdate, strftime('%w', eventdate) as weekday, eventdescription from districtcalendar where schoolcode like '' AND eventdate >= date ('now')  order by 1",d=schoolDB.execute(s);if(d.getRowCount()>0){var c=null,u=null;if(d.isValidRow()){var h=d.fieldByName("eventdate"),w=d.fieldByName("eventmonth");d.fieldByName("eventyear");var p=d.fieldByName("eventdescription"),f=dayNames[d.fieldByName("weekday")],v=monthNames[w-1];c=v+" "+h+" "+f,u="*"+p,d.next()}for(;d.isValidRow();){var h=d.fieldByName("eventdate"),w=d.fieldByName("eventmonth");d.fieldByName("eventyear");var p=d.fieldByName("eventdescription"),f=dayNames[d.fieldByName("weekday")],v=monthNames[w-1],m=v+" "+h+" "+f;if(m==c)u=u+"\n* "+p;else{var g=Titanium.UI.createLabel({text:c,font:{fontSize:14,fontWeight:"bold"},color:"blue",width:"auto",left:5,top:10}),y=Titanium.UI.createLabel({text:u,font:{fontSize:14,fontWeight:"bold",color:"#000000"},width:"auto",left:10,top:10,color:"black"}),b=Titanium.UI.createTableViewRow({height:Ti.UI.SIZE,layout:"vertical",color:"#000000",className:"eventRow"});b.add(g),b.add(y),a.push(b),c=m,u="* "+p}d.next()}d.close()}l=Titanium.UI.createTableView({data:a,backgroundColor:"#ffffff",separatorColor:"#000000",height:"90%",top:0}),r=n.getaddview(),e.schoolEventsWin.add(l),e.schoolEventsWin.add(r),e.schoolEventsWin.addEventListener("close",function(){e.schoolEventsWin.remove(l),e.schoolEventsWin.remove(r),a=null,l=null,r=null}),_.extend(e,t)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;