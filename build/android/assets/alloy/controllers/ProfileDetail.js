function Controller(){function e(e){return{profile_id:e.attributes.profile_id,name:"Name : "+e.attributes.name,grade:"Grade : "+e.attributes.grade,school:"School : "+e.attributes.school,classname:"Class Name : "+e.attributes.classname,teacher:"Teacher : "+e.attributes.teacher,image:e.attributes.url||"/images/profile.png"}}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="ProfileDetail",arguments[0]?arguments[0].__parentSymbol:null,arguments[0]?arguments[0].$model:null,arguments[0]?arguments[0].__itemTemplate:null;var t=this,i={};t.profileDetail=Alloy.createModel("profile"),t.__views.detailWindow=Ti.UI.createWindow({backgroundColor:"white",title:"Profile Details",layout:"vertical",id:"detailWindow",model:"$.profileDetail",dataTransform:"dataTransformation"}),t.__views.detailWindow&&t.addTopLevelView(t.__views.detailWindow),t.__views.profileView=Ti.UI.createView({layout:"vertical",height:"90%",id:"profileView"}),t.__views.detailWindow.add(t.__views.profileView),t.__views.nameLabel=Ti.UI.createLabel({top:"2%",height:Ti.UI.SIZE,left:"5%",right:"5%",font:{fontSize:14,fontWight:"bold",fontFamily:"Helvetica Neue"},color:"black",id:"nameLabel"}),t.__views.profileView.add(t.__views.nameLabel),t.__views.schoolLabel=Ti.UI.createLabel({top:"2%",height:Ti.UI.SIZE,left:"5%",right:"5%",font:{fontSize:14,fontWight:"bold",fontFamily:"Helvetica Neue"},color:"black",id:"schoolLabel"}),t.__views.profileView.add(t.__views.schoolLabel),t.__views.gradeLabel=Ti.UI.createLabel({top:"2%",height:Ti.UI.SIZE,left:"5%",right:"5%",font:{fontSize:14,fontWight:"bold",fontFamily:"Helvetica Neue"},color:"black",id:"gradeLabel"}),t.__views.profileView.add(t.__views.gradeLabel),t.__views.teacherLabel=Ti.UI.createLabel({top:"2%",height:Ti.UI.SIZE,left:"5%",right:"5%",font:{fontSize:14,fontWight:"bold",fontFamily:"Helvetica Neue"},color:"black",id:"teacherLabel"}),t.__views.profileView.add(t.__views.teacherLabel),t.__views.classnameLabel=Ti.UI.createLabel({top:"2%",height:Ti.UI.SIZE,left:"5%",right:"5%",font:{fontSize:14,fontWight:"bold",fontFamily:"Helvetica Neue"},color:"black",id:"classnameLabel"}),t.__views.profileView.add(t.__views.classnameLabel),t.__views.image=Ti.UI.createImageView({height:128,width:128,top:10,autorotate:!0,id:"image"}),t.__views.profileView.add(t.__views.image),t.__views.photoButton=Ti.UI.createButton({title:"Add Photo",top:10,height:Ti.UI.SIZE,left:"25%",width:"50%",color:"white",backgroundColor:"#336699",borderColor:"#336699",borderRadius:8,id:"photoButton"}),t.__views.profileView.add(t.__views.photoButton),t.__views.deleteButton=Ti.UI.createButton({title:"Delete  Profile",top:20,height:Ti.UI.SIZE,left:"25%",width:"50%",color:"white",backgroundColor:"#336699",borderColor:"#336699",borderRadius:8,id:"deleteButton"}),t.__views.profileView.add(t.__views.deleteButton),t.__views.adView=Admob.createView({testing:!1,keywords:"K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",bottom:0,adBackgroundColor:"FF8855",backgroundColorTop:"738000",borderColor:"#000000",textColor:"#000000",urlColor:"#00FF00",linkColor:"#0000FF",publisherId:"ca-app-pub-3665132116722377/6561150840",ns:"Admob",id:"adView"}),t.__views.detailWindow.add(t.__views.adView);var o=function(){t.nameLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().name:t.profileDetail.get("name"),t.nameLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().name:t.profileDetail.get("name"),t.schoolLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().school:t.profileDetail.get("school"),t.schoolLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().school:t.profileDetail.get("school"),t.gradeLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().grade:t.profileDetail.get("grade"),t.gradeLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().grade:t.profileDetail.get("grade"),t.teacherLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().teacher:t.profileDetail.get("teacher"),t.teacherLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().teacher:t.profileDetail.get("teacher"),t.classnameLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().classname:t.profileDetail.get("classname"),t.classnameLabel.text=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().classname:t.profileDetail.get("classname"),t.image.image=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().image:t.profileDetail.get("image"),t.image.image=_.isFunction(t.profileDetail.transform)?t.profileDetail.transform().image:t.profileDetail.get("image")};t.profileDetail.on("fetch change destroy",o),i.destroy=function(){t.profileDetail.off("fetch change destroy",o)},_.extend(t,t.__views);var r=arguments[0]||{};t.parentController=r.parentTab,t.profileDetail=_.extend({},t.profileDetail,{transform:function(){return e(this)}}),t.profileDetail.set(r.data.attributes),t.photoButton.addEventListener("click",function(){var e={success:function(e){var i=e.media;t.image.image=i;var o=Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,"photo"+r.data.get("profile_id")+".png");o.write(i);var n=r.data;n.set("url",o.nativePath),n.save(),Alloy.Collections.profile.fetch()},cancel:function(){},error:function(e){var t=Ti.UI.createAlertDialog({title:"Camera Error"});t.setMessage(e.code==Ti.Media.NO_CAMERA?"MISSING CAMERA":"Unexpected error: "+e.code),t.show()},saveToPhotoGallery:!0,allowEditing:!0,mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]};Ti.Media.isCameraSupported?Ti.Media.showCamera(e):Ti.Media.openPhotoGallery(e)}),t.deleteButton.addEventListener("click",function(){r.data.destroy(),Alloy.Collections.profile.fetch(),setTimeout(function(){t.detailWindow.close()},2e3)}),_.extend(t,i)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;