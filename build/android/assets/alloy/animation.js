exports.HORIZONTAL="horizontal",exports.VERTICAL="vertical",exports.flip=function(){Ti.API.error("The builtin flip-animation is iOS-only.")},exports.flipHorizontal=function(t,i,a,n){exports.flip(t,i,exports.HORIZONTAL,a,n)},exports.flipVertical=function(t,i,a,n){exports.flip(t,i,exports.VERTICAL,a,n)},exports.crossFade=function(t,i,a,n){t&&t.animate({opacity:0,duration:a}),i&&i.animate({opacity:1,duration:a}),n&&setTimeout(n,a+300)},exports.fadeAndRemove=function(t,i,a,n){t&&a&&t.animate({opacity:0,duration:i},function(){a.remove(t),a=t=i=null,n&&n()})},exports.fadeIn=function(t,i,a){a?t&&t.animate({opacity:1,duration:i},a):t&&t.animate({opacity:1,duration:i})},exports.fadeOut=function(t,i,a){a?t&&t.animate({opacity:0,duration:i},a):t&&t.animate({opacity:0,duration:i})},exports.popIn=function(t){t.transform=Ti.UI.create2DMatrix(),t.opacity=1},exports.shake=function(t,i,a){var n=Ti.UI.createAnimation({transform:Ti.UI.create2DMatrix().translate(5,0),duration:100}),e=Ti.UI.createAnimation({transform:Ti.UI.create2DMatrix().translate(-5,0),duration:100}),o=Ti.UI.createAnimation({transform:Ti.UI.create2DMatrix().translate(5,0),duration:100}),r=Ti.UI.createAnimation({transform:Ti.UI.create2DMatrix().translate(-5,0),duration:100}),c=Ti.UI.createAnimation({transform:Ti.UI.create2DMatrix(),duration:100});i?setTimeout(function(){exports.chainAnimate(t,[n,e,o,r,c],a),t=n=e=o=r=c=null},i):exports.chainAnimate(t,[n,e,o,r,c],a)},exports.flash=function(t,i,a){var n=Ti.UI.createAnimation({opacity:.7,duration:100}),e=Ti.UI.createAnimation({opacity:1,duration:100}),o=Ti.UI.createAnimation({opacity:.7,duration:100}),r=Ti.UI.createAnimation({opacity:1,duration:100});i?setTimeout(function(){exports.chainAnimate(t,[n,e,o,r],a),t=n=e=o=r=null},i):exports.chainAnimate(t,[n,e,o,r],a)},exports.chainAnimate=function(t,i,a){function n(){if(0===i.length)return t=i=null,void(a&&a());var e=i.shift();e.addEventListener("complete",n),t.animate(e)}n()};