function ucfirst(e){return e?e[0].toUpperCase()+e.substr(1):e}function addNamespace(e){return(CONST.IMPLICIT_NAMESPACES[e]||CONST.NAMESPACE_DEFAULT)+"."+e}function processStyle(e,t,i,o,r){o=o||{},o.classes=i,t.apiName&&(o.apiName=t.apiName),t.id&&(o.id=t.id),t.applyProperties(exports.createStyle(e,o,r)),t.classes=i}function isTabletFallback(){return Math.min(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth)>=700}var _=require("alloy/underscore")._,Backbone=require("alloy/backbone"),CONST=require("alloy/constants");exports.version="1.3.0",exports._=_,exports.Backbone=Backbone;var DEFAULT_WIDGET="widget",TI_VERSION=Ti.version,MW320_CHECK=!1,IDENTITY_TRANSFORM=Ti.UI.create2DMatrix(),RESET={bottom:null,left:null,right:null,top:null,height:null,width:null,shadowColor:null,shadowOffset:null,backgroundImage:null,backgroundRepeat:null,center:null,layout:null,backgroundSelectedColor:null,backgroundSelectedImage:null,opacity:1,touchEnabled:!0,enabled:!0,horizontalWrap:!0,zIndex:0,backgroundColor:"transparent",font:null,visible:!0,color:"#000",transform:IDENTITY_TRANSFORM,backgroundGradient:null,borderColor:null,borderRadius:null,borderWidth:null};RESET=_.extend(RESET,{backgroundDisabledColor:null,backgroundDisabledImage:null,backgroundFocusedColor:null,backgroundFocusedImage:null,focusable:!1,keepScreenOn:!1}),exports.M=function(e,t,i){var o,r=(t||{}).config||{},l=r.adapter||{},a={},n={};l.type?(o=require("alloy/sync/"+l.type),a.sync=function(e,t,i){o.sync(e,t,i)}):a.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a model that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))},a.defaults=r.defaults,i&&(n.migrations=i),o&&_.isFunction(o.beforeModelCreate)&&(r=o.beforeModelCreate(r,e)||r);var s=Backbone.Model.extend(a,n);return s.prototype.config=r,_.isFunction(t.extendModel)&&(s=t.extendModel(s)||s),o&&_.isFunction(o.afterModelCreate)&&o.afterModelCreate(s,e),s},exports.C=function(e,t,i){var o,r={model:i},l=(i?i.prototype.config:{})||{};l.adapter&&l.adapter.type?(o=require("alloy/sync/"+l.adapter.type),r.sync=function(e,t,i){o.sync(e,t,i)}):r.sync=function(e,t){Ti.API.warn("Execution of "+e+"#sync() function on a collection that does not support persistence"),Ti.API.warn("model: "+JSON.stringify(t.toJSON()))};var a=Backbone.Collection.extend(r);return a.prototype.config=l,_.isFunction(t.extendCollection)&&(a=t.extendCollection(a)||a),o&&_.isFunction(o.afterCollectionCreate)&&o.afterCollectionCreate(a),a},exports.UI={},exports.UI.create=function(controller,apiName,opts){opts=opts||{};var baseName,ns,parts=apiName.split(".");if(1===parts.length)baseName=apiName,ns=opts.ns||CONST.IMPLICIT_NAMESPACES[baseName]||CONST.NAMESPACE_DEFAULT;else{if(!(parts.length>1))throw"Alloy.UI.create() failed: No API name was given in the second parameter";baseName=parts[parts.length-1],ns=parts.slice(0,parts.length-1).join(".")}opts.apiName=ns+"."+baseName,baseName=baseName[0].toUpperCase()+baseName.substr(1);var style=exports.createStyle(controller,opts);return eval(ns)["create"+baseName](style)},exports.createStyle=function(e,t,i){var o,r;if(!t)return{};o=_.isArray(t.classes)?t.classes.slice(0):_.isString(t.classes)?t.classes.split(/\s+/):[],r=t.apiName,r&&-1===r.indexOf(".")&&(r=addNamespace(r));var l;l=require(e&&_.isObject(e)?"alloy/widgets/"+e.widgetId+"/styles/"+e.name:"alloy/styles/"+e);var a,n,s={};for(a=0,n=l.length;n>a;a++){var d=l[a],c=d.key;if(d.isApi&&-1===c.indexOf(".")&&(c=(CONST.IMPLICIT_NAMESPACES[c]||CONST.NAMESPACE_DEFAULT)+"."+c),d.isId&&t.id&&d.key===t.id||d.isClass&&_.contains(o,d.key));else{if(!d.isApi)continue;if(-1===d.key.indexOf(".")&&(d.key=addNamespace(d.key)),d.key!==r)continue}d.queries&&d.queries.formFactor&&!Alloy[d.queries.formFactor]||_.extend(s,d.style)}var u=_.omit(t,[CONST.CLASS_PROPERTY,CONST.APINAME_PROPERTY]);return _.extend(s,u),s[CONST.CLASS_PROPERTY]=o,s[CONST.APINAME_PROPERTY]=r,MW320_CHECK&&delete s[CONST.APINAME_PROPERTY],i?_.defaults(s,i):s},exports.addClass=function(e,t,i,o){if(!i)return void(o&&(MW320_CHECK&&delete o.apiName,t.applyProperties(o)));var r=t[CONST.CLASS_PROPERTY]||[],l=r.length;i=_.isString(i)?i.split(/\s+/):i;var a=_.union(r,i||[]);return l===a.length?void(o&&(MW320_CHECK&&delete o.apiName,t.applyProperties(o))):void processStyle(e,t,a,o)},exports.removeClass=function(e,t,i,o){i=i||[];var r=t[CONST.CLASS_PROPERTY]||[],l=r.length;if(!l||!i.length)return void(o&&(MW320_CHECK&&delete o.apiName,t.applyProperties(o)));i=_.isString(i)?i.split(/\s+/):i;var a=_.difference(r,i);return l===a.length?void(o&&(MW320_CHECK&&delete o.apiName,t.applyProperties(o))):void processStyle(e,t,a,o,RESET)},exports.resetClass=function(e,t,i,o){i=i||[],i=_.isString(i)?i.split(/\s+/):i,processStyle(e,t,i,o,RESET)},exports.createWidget=function(e,t,i){return"undefined"!=typeof t&&null!==t&&_.isObject(t)&&!_.isString(t)&&(i=t,t=DEFAULT_WIDGET),new(require("alloy/widgets/"+e+"/controllers/"+(t||DEFAULT_WIDGET)))(i)},exports.createController=function(e,t){return new(require("alloy/controllers/"+e))(t)},exports.createModel=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Model)(t)},exports.createCollection=function(e,t){return new(require("alloy/models/"+ucfirst(e)).Collection)(t)},exports.isTablet=function(){var e=Ti.Platform.Android.physicalSizeCategory;return e===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_LARGE||e===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_XLARGE}(),exports.isHandheld=!exports.isTablet,exports.Globals={},exports.Models={},exports.Models.instance=function(e){return exports.Models[e]||(exports.Models[e]=exports.createModel(e))},exports.Collections={},exports.Collections.instance=function(e){return exports.Collections[e]||(exports.Collections[e]=exports.createCollection(e))},exports.CFG=require("alloy/CFG"),exports.Android={},exports.Android.menuItemCreateArgs=["itemId","groupId","title","order","actionView","checkable","checked","enabled","icon","showAsAction","titleCondensed","visible"];