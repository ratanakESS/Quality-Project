(function($) {
  if (typeof $.setSelectionRange != 'function') {
    $.fn.setSelectionRange = function(selectionStart, selectionEnd) {
      var element = this;
      if (this instanceof jQuery) {
        element = this.get(0);
      }
      if (element.setSelectionRange) {
        $(element).focus();
        element.setSelectionRange(selectionStart, selectionEnd);
      }
      else if (this.createTextRange) {
        var range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
      }
    }

    $.fn.setCursorToPos = function(pos) {
      $(this).setSelectionRange(pos, pos);
    }
  }
})(jQuery);;

// General Insert API functions.
(function ($) {
Drupal.syntaxhighlighterinsert = {
  /**
   * Insert content into a textarea at the current cursor position.
   *
   * @param editor
   *   The DOM object of the textarea that will receive the text.
   * @param content
   *   The string to be inserted.
   */
  insertAtCursor: function(editor, content) {
    // IE support.
    if (document.selection) {
      editor.focus();
      sel = document.selection.createRange();
      sel.text = content;
    }

    // Mozilla/Firefox/Netscape 7+ support.
    else if (editor.selectionStart || editor.selectionStart == '0') {
      var startPos = editor.selectionStart;
      var endPos = editor.selectionEnd;
      editor.val(editor.val().substring(0, startPos)+ content + editor.val().substring(endPos, editor.val().length));
    }

    // Fallback, just add to the end of the content.
    else {
      editor.val(editor.val() + content);
    }
  },

  hideDescriptions: function() {
    var descriptions_hidden = true;
    jQuery('.syntaxhighlighter-insert-text-description-link, .syntaxhighlighter-insert-wysiwyg-description-link').live('click', function() {
      var link = jQuery(this);
      var id = link.attr('id');
      var form_id = id.replace('description-link', 'form-wrapper');
      if (descriptions_hidden) {
        jQuery('#' + form_id + ' .description').show();
        descriptions_hidden = false;
        link.text(Drupal.t('Hide descriptions'));
      }
      else {
        jQuery('#' + form_id + ' .description').hide();
        descriptions_hidden = true;
        link.text(Drupal.t('Show descriptions'));
      }
      return false;
    });
  }
};
})(jQuery);
;
/*
 * @name BeautyTips
 * @desc a tooltips/baloon-help plugin for jQuery
 *
 * @author Jeff Robbins - Lullabot - http://www.lullabot.com
 * @version 0.9.5 release candidate 1  (5/20/2009)
 */
jQuery.bt={version:'0.9.5-rc1'};;(function($){jQuery.fn.bt=function(content,options){if(typeof content!='string'){var contentSelect=true;options=content;content=false;}
else{var contentSelect=false;}
if(jQuery.fn.hoverIntent&&jQuery.bt.defaults.trigger=='hover'){jQuery.bt.defaults.trigger='hoverIntent';}
return this.each(function(index){var opts=jQuery.extend(false,jQuery.bt.defaults,jQuery.bt.options,options);opts.spikeLength=numb(opts.spikeLength);opts.spikeGirth=numb(opts.spikeGirth);opts.overlap=numb(opts.overlap);var ajaxTimeout=false;if(opts.killTitle){$(this).find('[title]').andSelf().each(function(){if(!$(this).attr('bt-xTitle')){$(this).attr('bt-xTitle',$(this).attr('title')).attr('title','');}});}
if(typeof opts.trigger=='string'){opts.trigger=[opts.trigger];}
if(opts.trigger[0]=='hoverIntent'){var hoverOpts=jQuery.extend(opts.hoverIntentOpts,{over:function(){this.btOn();},out:function(){this.btOff();}});$(this).hoverIntent(hoverOpts);}
else if(opts.trigger[0]=='hover'){$(this).hover(function(){this.btOn();},function(){this.btOff();});}
else if(opts.trigger[0]=='now'){if($(this).hasClass('bt-active')){this.btOff();}
else{this.btOn();}}
else if(opts.trigger[0]=='none'){}
else if(opts.trigger.length>1&&opts.trigger[0]!=opts.trigger[1]){$(this).bind(opts.trigger[0],function(){this.btOn();}).bind(opts.trigger[1],function(){this.btOff();});}
else{$(this).bind(opts.trigger[0],function(){if($(this).hasClass('bt-active')){this.btOff();}
else{this.btOn();}});}
this.btOn=function(){if(typeof $(this).data('bt-box')=='object'){this.btOff();}
opts.preBuild.apply(this);$(jQuery.bt.vars.closeWhenOpenStack).btOff();$(this).addClass('bt-active '+opts.activeClass);if(contentSelect&&opts.ajaxPath==null){if(opts.killTitle){$(this).attr('title',$(this).attr('bt-xTitle'));}
content=$.isFunction(opts.contentSelector)?opts.contentSelector.apply(this):eval(opts.contentSelector);if(opts.killTitle){$(this).attr('title','');}}
if(opts.ajaxPath!=null&&content==false){if(typeof opts.ajaxPath=='object'){var url=eval(opts.ajaxPath[0]);url+=opts.ajaxPath[1]?' '+opts.ajaxPath[1]:'';}
else{var url=opts.ajaxPath;}
var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var cacheData=opts.ajaxCache?$(document.body).data('btCache-'+url.replace(/\./g,'')):null;if(typeof cacheData=='string'){content=selector?$("<div/>").append(cacheData.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):cacheData;}
else{var target=this;var ajaxOpts=jQuery.extend(false,{type:opts.ajaxType,data:opts.ajaxData,cache:opts.ajaxCache,url:url,complete:function(XMLHttpRequest,textStatus){if(textStatus=='success'||textStatus=='notmodified'){if(opts.ajaxCache){$(document.body).data('btCache-'+url.replace(/\./g,''),XMLHttpRequest.responseText);}
ajaxTimeout=false;content=selector?$("<div/>").append(XMLHttpRequest.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):XMLHttpRequest.responseText;}
else{if(textStatus=='timeout'){ajaxTimeout=true;}
content=opts.ajaxError.replace(/%error/g,XMLHttpRequest.statusText);}
if($(target).hasClass('bt-active')){target.btOn();}}},opts.ajaxOpts);jQuery.ajax(ajaxOpts);content=opts.ajaxLoading;}}
var shadowMarginX=0;var shadowMarginY=0;var shadowShiftX=0;var shadowShiftY=0;if(opts.shadow&&!shadowSupport()){opts.shadow=false;jQuery.extend(opts,opts.noShadowOpts);}
if(opts.shadow){if(opts.shadowBlur>Math.abs(opts.shadowOffsetX)){shadowMarginX=opts.shadowBlur*2;}
else{shadowMarginX=opts.shadowBlur+Math.abs(opts.shadowOffsetX);}
shadowShiftX=(opts.shadowBlur-opts.shadowOffsetX)>0?opts.shadowBlur-opts.shadowOffsetX:0;if(opts.shadowBlur>Math.abs(opts.shadowOffsetY)){shadowMarginY=opts.shadowBlur*2;}
else{shadowMarginY=opts.shadowBlur+Math.abs(opts.shadowOffsetY);}
shadowShiftY=(opts.shadowBlur-opts.shadowOffsetY)>0?opts.shadowBlur-opts.shadowOffsetY:0;}
if(opts.offsetParent){var offsetParent=$(opts.offsetParent);var offsetParentPos=offsetParent.offset();var pos=$(this).offset();var top=numb(pos.top)-numb(offsetParentPos.top)+numb($(this).css('margin-top'))-shadowShiftY;var left=numb(pos.left)-numb(offsetParentPos.left)+numb($(this).css('margin-left'))-shadowShiftX;}
else{var offsetParent=($(this).css('position')=='absolute')?$(this).parents().eq(0).offsetParent():$(this).offsetParent();var pos=$(this).btPosition();var top=numb(pos.top)+numb($(this).css('margin-top'))-shadowShiftY;var left=numb(pos.left)+numb($(this).css('margin-left'))-shadowShiftX;}
var width=$(this).btOuterWidth();var height=$(this).outerHeight();if(typeof content=='object'){if(content==null){return;}
var original=content;var clone=$(original).clone(true).show();var origClones=$(original).data('bt-clones')||[];origClones.push(clone);$(original).data('bt-clones',origClones);$(clone).data('bt-orig',original);$(this).data('bt-content-orig',{original:original,clone:clone});content=clone;}
if(typeof content=='null'||content==''){return;}
var $text=$('<div class="bt-content"></div>').append(content).css({padding:opts.padding,position:'absolute',width:(opts.shrinkToFit?'auto':opts.width),zIndex:opts.textzIndex,left:shadowShiftX,top:shadowShiftY}).css(opts.cssStyles);var $box=$('<div class="bt-wrapper"></div>').append($text).addClass(opts.cssClass).css({position:'absolute',width:opts.width,zIndex:opts.wrapperzIndex,visibility:'hidden'}).appendTo(offsetParent);if(jQuery.fn.bgiframe){$text.bgiframe();$box.bgiframe();}
$(this).data('bt-box',$box);var scrollTop=numb($(document).scrollTop());var scrollLeft=numb($(document).scrollLeft());var docWidth=numb($(window).width());var docHeight=numb($(window).height());var winRight=scrollLeft+docWidth;var winBottom=scrollTop+docHeight;var space=new Object();var thisOffset=$(this).offset();space.top=thisOffset.top-scrollTop;space.bottom=docHeight-((thisOffset+height)-scrollTop);space.left=thisOffset.left-scrollLeft;space.right=docWidth-((thisOffset.left+width)-scrollLeft);var textOutHeight=numb($text.outerHeight());var textOutWidth=numb($text.btOuterWidth());if(opts.positions.constructor==String){opts.positions=opts.positions.replace(/ /,'').split(',');}
if(opts.positions[0]=='most'){var position='top';for(var pig in space){position=space[pig]>space[position]?pig:position;}}
else{for(var x in opts.positions){var position=opts.positions[x];if((position=='left'||position=='right')&&space[position]>textOutWidth+opts.spikeLength){break;}
else if((position=='top'||position=='bottom')&&space[position]>textOutHeight+opts.spikeLength){break;}}}
var horiz=left+((width-textOutWidth)*.5);var vert=top+((height-textOutHeight)*.5);var points=new Array();var textTop,textLeft,textRight,textBottom,textTopSpace,textBottomSpace,textLeftSpace,textRightSpace,crossPoint,textCenter,spikePoint;switch(position){case'top':$text.css('margin-bottom',opts.spikeLength+'px');$box.css({top:(top-$text.outerHeight(true))+opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css('left',(numb($box.css('left'))+textRightSpace)+'px');xShift-=textRightSpace;}
textLeftSpace=($text.offset().left+numb($text.css('margin-left')))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css('left',(numb($box.css('left'))-textLeftSpace)+'px');xShift+=textLeftSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={y:textBottom+opts.spikeLength,x:((textRight-textLeft)*.5)+xShift,type:'spike'};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textBottom);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.CornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textBottom,type:'join'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:crossPoint.x+(opts.spikeGirth/2),y:textBottom,type:'join'};points[points.length]=spikePoint;break;case'left':$text.css('margin-right',opts.spikeLength+'px');$box.css({top:vert+'px',left:((left-$text.btOuterWidth(true))+opts.overlap)+'px'});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css('top',(numb($box.css('top'))+textBottomSpace)+'px');yShift-=textBottomSpace;}
textTopSpace=($text.offset().top+numb($text.css('margin-top')))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css('top',(numb($box.css('top'))-textTopSpace)+'px');yShift+=textTopSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:textRight+opts.spikeLength,y:((textBottom-textTop)*.5)+yShift,type:'spike'};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textRight);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textRight,y:crossPoint.y+opts.spikeGirth/2,type:'join'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:crossPoint.y-opts.spikeGirth/2,type:'join'};points[points.length]=spikePoint;break;case'bottom':$text.css('margin-top',opts.spikeLength+'px');$box.css({top:(top+height)-opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css('left',(numb($box.css('left'))+textRightSpace)+'px');xShift-=textRightSpace;}
textLeftSpace=($text.offset().left+numb($text.css('margin-left')))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css('left',(numb($box.css('left'))-textLeftSpace)+'px');xShift+=textLeftSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:((textRight-textLeft)*.5)+xShift,y:shadowShiftY,type:'spike'};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textTop);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x+opts.spikeGirth/2,y:textTop,type:'join'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textTop,type:'join'};points[points.length]=spikePoint;break;case'right':$text.css('margin-left',(opts.spikeLength+'px'));$box.css({top:vert+'px',left:((left+width)-opts.overlap)+'px'});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css('top',(numb($box.css('top'))+textBottomSpace)+'px');yShift-=textBottomSpace;}
textTopSpace=($text.offset().top+numb($text.css('margin-top')))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css('top',(numb($box.css('top'))-textTopSpace)+'px');yShift+=textTopSpace;}
textTop=$text.btPosition().top+numb($text.css('margin-top'));textLeft=$text.btPosition().left+numb($text.css('margin-left'));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:shadowShiftX,y:((textBottom-textTop)*.5)+yShift,type:'spike'};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textLeft);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textLeft,y:crossPoint.y-opts.spikeGirth/2,type:'join'};points[points.length]={x:textLeft,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textTop,type:'corner'};points[points.length]={x:textRight,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:textBottom,type:'corner'};points[points.length]={x:textLeft,y:crossPoint.y+opts.spikeGirth/2,type:'join'};points[points.length]=spikePoint;break;}
var canvas=document.createElement('canvas');$(canvas).attr('width',(numb($text.btOuterWidth(true))+opts.strokeWidth*2+shadowMarginX)).attr('height',(numb($text.outerHeight(true))+opts.strokeWidth*2+shadowMarginY)).appendTo($box).css({position:'absolute',zIndex:opts.boxzIndex});if(typeof G_vmlCanvasManager!='undefined'){canvas=G_vmlCanvasManager.initElement(canvas);}
if(opts.cornerRadius>0){var newPoints=new Array();var newPoint;for(var i=0;i<points.length;i++){if(points[i].type=='corner'){newPoint=betweenPoint(points[i],points[(i-1)%points.length],opts.cornerRadius);newPoint.type='arcStart';newPoints[newPoints.length]=newPoint;newPoints[newPoints.length]=points[i];newPoint=betweenPoint(points[i],points[(i+1)%points.length],opts.cornerRadius);newPoint.type='arcEnd';newPoints[newPoints.length]=newPoint;}
else{newPoints[newPoints.length]=points[i];}}
points=newPoints;}
var ctx=canvas.getContext("2d");if(opts.shadow&&opts.shadowOverlap!==true){var shadowOverlap=numb(opts.shadowOverlap);switch(position){case'top':if(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap>0){$box.css('top',(numb($box.css('top'))-(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap)));}
break;case'right':if(shadowShiftX-shadowOverlap>0){$box.css('left',(numb($box.css('left'))+shadowShiftX-shadowOverlap));}
break;case'bottom':if(shadowShiftY-shadowOverlap>0){$box.css('top',(numb($box.css('top'))+shadowShiftY-shadowOverlap));}
break;case'left':if(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap>0){$box.css('left',(numb($box.css('left'))-(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap)));}
break;}}
drawIt.apply(ctx,[points],opts.strokeWidth);ctx.fillStyle=opts.fill;if(opts.shadow){ctx.shadowOffsetX=opts.shadowOffsetX;ctx.shadowOffsetY=opts.shadowOffsetY;ctx.shadowBlur=opts.shadowBlur;ctx.shadowColor=opts.shadowColor;}
ctx.closePath();ctx.fill();if(opts.strokeWidth>0){ctx.shadowColor='rgba(0, 0, 0, 0)';ctx.lineWidth=opts.strokeWidth;ctx.strokeStyle=opts.strokeStyle;ctx.beginPath();drawIt.apply(ctx,[points],opts.strokeWidth);ctx.closePath();ctx.stroke();}
opts.preShow.apply(this,[$box[0]]);$box.css({display:'none',visibility:'visible'});opts.showTip.apply(this,[$box[0]]);if(opts.overlay){var overlay=$('<div class="bt-overlay"></div>').css({position:'absolute',backgroundColor:'blue',top:top,left:left,width:width,height:height,opacity:'.2'}).appendTo(offsetParent);$(this).data('overlay',overlay);}
if((opts.ajaxPath!=null&&opts.ajaxCache==false)||ajaxTimeout){content=false;}
if(opts.clickAnywhereToClose){jQuery.bt.vars.clickAnywhereStack.push(this);$(document).click(jQuery.bt.docClick);}
if(opts.closeWhenOthersOpen){jQuery.bt.vars.closeWhenOpenStack.push(this);}
opts.postShow.apply(this,[$box[0]]);};this.btOff=function(){var box=$(this).data('bt-box');if(typeof box=='undefined'){return;}
opts.preHide.apply(this,[box]);var i=this;i.btCleanup=function(){var box=$(i).data('bt-box');var contentOrig=$(i).data('bt-content-orig');var overlay=$(i).data('bt-overlay');if(typeof box=='object'){$(box).remove();$(i).removeData('bt-box');}
if(typeof contentOrig=='object'){var clones=$(contentOrig.original).data('bt-clones');$(contentOrig).data('bt-clones',arrayRemove(clones,contentOrig.clone));}
if(typeof overlay=='object'){$(overlay).remove();$(i).removeData('bt-overlay');}
jQuery.bt.vars.clickAnywhereStack=arrayRemove(jQuery.bt.vars.clickAnywhereStack,i);jQuery.bt.vars.closeWhenOpenStack=arrayRemove(jQuery.bt.vars.closeWhenOpenStack,i);$(i).removeClass('bt-active '+opts.activeClass);opts.postHide.apply(i);}
opts.hideTip.apply(this,[box,i.btCleanup]);};var refresh=this.btRefresh=function(){this.btOff();this.btOn();};});function drawIt(points,strokeWidth){this.moveTo(points[0].x,points[0].y);for(i=1;i<points.length;i++){if(points[i-1].type=='arcStart'){this.quadraticCurveTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth),round5(points[(i+1)%points.length].x,strokeWidth),round5(points[(i+1)%points.length].y,strokeWidth));i++;}
else{this.lineTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth));}}};function round5(num,strokeWidth){var ret;strokeWidth=numb(strokeWidth);if(strokeWidth%2){ret=num;}
else{ret=Math.round(num-.5)+.5;}
return ret;};function numb(num){return parseInt(num)||0;};function arrayRemove(arr,elem){var x,newArr=new Array();for(x in arr){if(arr[x]!=elem){newArr.push(arr[x]);}}
return newArr;};function canvasSupport(){var canvas_compatible=false;try{canvas_compatible=!!(document.createElement('canvas').getContext('2d'));}catch(e){canvas_compatible=!!(document.createElement('canvas').getContext);}
return canvas_compatible;}
function shadowSupport(){try{var userAgent=navigator.userAgent.toLowerCase();if(/webkit/.test(userAgent)){return true;}
else if(/gecko|mozilla/.test(userAgent)&&parseFloat(userAgent.match(/firefox\/(\d+(?:\.\d+)+)/)[1])>=3.1){return true;}}
catch(err){}
return false;}
function betweenPoint(point1,point2,dist){var y,x;if(point1.x==point2.x){y=point1.y<point2.y?point1.y+dist:point1.y-dist;return{x:point1.x,y:y};}
else if(point1.y==point2.y){x=point1.x<point2.x?point1.x+dist:point1.x-dist;return{x:x,y:point1.y};}};function centerPoint(arcStart,corner,arcEnd){var x=corner.x==arcStart.x?arcEnd.x:arcStart.x;var y=corner.y==arcStart.y?arcEnd.y:arcStart.y;var startAngle,endAngle;if(arcStart.x<arcEnd.x){if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*180;endAngle=(Math.PI/180)*90;}
else{startAngle=(Math.PI/180)*90;endAngle=0;}}
else{if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*270;endAngle=(Math.PI/180)*180;}
else{startAngle=0;endAngle=(Math.PI/180)*270;}}
return{x:x,y:y,type:'center',startAngle:startAngle,endAngle:endAngle};};function findIntersect(r1x1,r1y1,r1x2,r1y2,r2x1,r2y1,r2x2,r2y2){if(r2x1==r2x2){return findIntersectY(r1x1,r1y1,r1x2,r1y2,r2x1);}
if(r2y1==r2y2){return findIntersectX(r1x1,r1y1,r1x2,r1y2,r2y1);}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var r2m=(r2y1-r2y2)/(r2x1-r2x2);var r2b=r2y1-(r2m*r2x1);var x=(r2b-r1b)/(r1m-r2m);var y=r1m*x+r1b;return{x:x,y:y};};function findIntersectY(r1x1,r1y1,r1x2,r1y2,x){if(r1y1==r1y2){return{x:x,y:r1y1};}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var y=r1m*x+r1b;return{x:x,y:y};};function findIntersectX(r1x1,r1y1,r1x2,r1y2,y){if(r1x1==r1x2){return{x:r1x1,y:y};}
var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var x=(y-r1b)/r1m;return{x:x,y:y};};};jQuery.fn.btPosition=function(){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;};var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}
return results;};jQuery.fn.btOuterWidth=function(margin){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;};return this["innerWidth"]()
+num(this,"borderLeftWidth")
+num(this,"borderRightWidth")
+(margin?num(this,"marginLeft")
+num(this,"marginRight"):0);};jQuery.fn.btOn=function(){return this.each(function(index){if(jQuery.isFunction(this.btOn)){this.btOn();}});};jQuery.fn.btOff=function(){return this.each(function(index){if(jQuery.isFunction(this.btOff)){this.btOff();}});};jQuery.bt.vars={clickAnywhereStack:[],closeWhenOpenStack:[]};jQuery.bt.docClick=function(e){if(!e){var e=window.event;};if(!$(e.target).parents().andSelf().filter('.bt-wrapper, .bt-active').length&&jQuery.bt.vars.clickAnywhereStack.length){$(jQuery.bt.vars.clickAnywhereStack).btOff();$(document).unbind('click',jQuery.bt.docClick);}};jQuery.bt.defaults={trigger:'hover',clickAnywhereToClose:true,closeWhenOthersOpen:false,shrinkToFit:false,width:'200px',padding:'10px',spikeGirth:10,spikeLength:15,overlap:0,overlay:false,killTitle:true,textzIndex:9999,boxzIndex:9998,wrapperzIndex:9997,offsetParent:null,positions:['most'],fill:"rgb(255, 255, 102)",windowMargin:10,strokeWidth:1,strokeStyle:"#000",cornerRadius:5,centerPointX:.5,centerPointY:.5,shadow:false,shadowOffsetX:2,shadowOffsetY:2,shadowBlur:3,shadowColor:"#000",shadowOverlap:false,noShadowOpts:{strokeStyle:'#999'},cssClass:'',cssStyles:{},activeClass:'bt-active',contentSelector:"$(this).attr('title')",ajaxPath:null,ajaxError:'<strong>ERROR:</strong> <em>%error</em>',ajaxLoading:'<blink>Loading...</blink>',ajaxData:{},ajaxType:'GET',ajaxCache:true,ajaxOpts:{},preBuild:function(){},preShow:function(box){},showTip:function(box){$(box).show();},postShow:function(box){},preHide:function(box){},hideTip:function(box,callback){$(box).hide();callback();},postHide:function(){},hoverIntentOpts:{interval:300,timeout:500}};jQuery.bt.options={};})(jQuery);;
(function($){Drupal.behaviors.beautytips={attach:function(context,settings){if(typeof(jQuery.bt)=="undefined"&&jQuery.bt==null){return}jQuery.bt.options.closeWhenOthersOpen=true;var beautytips=Drupal.settings.beautytips;function fixArray(originalArray,count){for(var key in originalArray){if(key=="cssStyles"){originalArray[key]=fixArray(originalArray[key],count)}else{if(originalArray[key].length==count){originalArray[key]=originalArray[key][0]}else{length=Math.round(originalArray[key].length/count);originalArray[key]=originalArray[key].slice(0,length)}}}return originalArray}for(var key in beautytips){if(typeof(Drupal.settings.beautytips[key]["cssSelect"])=="object"){var count=Drupal.settings.beautytips[key]["cssSelect"].length;beautytips[key]=fixArray(beautytips[key],count);Drupal.settings.beautytips[key]=beautytips[key]}var btOptions=new Array();if(beautytips[key]["list"]){for(var k=0;k<beautytips[key]["list"].length;k++){btOptions[beautytips[key]["list"][k]]=beautytips[key][beautytips[key]["list"][k]]}}if(beautytips[key]["cssSelect"]){if(beautytips[key]["animate"]){btOptions=beautytipsAddAnimations(beautytips[key]["animate"],btOptions)}if(beautytips[key]["contentSelector"]&&beautytips[key]["preEval"]){$(beautytips[key]["cssSelect"]).each(function(){if(!beautytipsProcessed(this,false)){eval(beautytips[key]["contentSelector"])}})}if(beautytips[key]["text"]){$(beautytips[key]["cssSelect"]).each(function(){if(!beautytipsProcessed(this)){$(this).bt(beautytips[key]["text"],btOptions)}})}else{if(beautytips[key]["ajaxPath"]){$(beautytips[key]["cssSelect"]).each(function(){if(!beautytipsProcessed(this)){if(beautytips[key]["ajaxDisableLink"]){$(this).click(function(event){event.preventDefault()})}$(this).bt(btOptions)}})}else{$(beautytips[key]["cssSelect"]).each(function(){if(!beautytipsProcessed(this)){$(this).bt(btOptions)}})}}}btOptions.length=0}}};function beautytipsProcessed(element,addClass){if($(element).hasClass("beautytips-module-processed")){return true}if(addClass!=false){$(element).addClass("beautytips-module-processed")}return false}function beautytipsAddAnimations(animations,btOptions){switch(animations.on){case"none":break;case"fadeIn":btOptions.showTip=function(box){$(box).fadeIn(500)};break;case"slideIn":break}switch(animations.off){case"none":break;case"fadeOut":btOptions.hideTip=function(box,callback){$(box).animate({opacity:0},500,callback)};break;case"slideOut":btOptions.hideTip=function(box,callback){var width=$("body").width();$(box).animate({left:"+="+width+"px"},"slow",callback)};break}return btOptions}})(jQuery);;
/**
 * This is part of a patch to address a jQueryUI bug.  The bug is responsible
 * for the inability to scroll a page when a modal dialog is active. If the content
 * of the dialog extends beyond the bottom of the viewport, the user is only able
 * to scroll with a mousewheel or up/down keyboard keys.
 *
 * @see http://bugs.jqueryui.com/ticket/4671
 * @see https://bugs.webkit.org/show_bug.cgi?id=19033
 * @see views_ui.module
 * @see js/jquery.ui.dialog.min.js
 *
 * This javascript patch overwrites the $.ui.dialog.overlay.events object to remove
 * the mousedown, mouseup and click events from the list of events that are bound
 * in $.ui.dialog.overlay.create
 *
 * The original code for this object:
 * $.ui.dialog.overlay.events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
 *  function(event) { return event + '.dialog-overlay'; }).join(' '),
 *
 */

(function ($, undefined) {
  if ($.ui && $.ui.dialog) {
    $.ui.dialog.overlay.events = $.map('focus,keydown,keypress'.split(','),
                                 function(event) { return event + '.dialog-overlay'; }).join(' ');
  }
}(jQuery));
;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
/*!
 * jQuery Form Plugin
 * version: 2.69 (06-APR-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){function b(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}a.fn.ajaxSubmit=function(c){function r(){function t(){if(!j.aborted){var c=i.contentWindow?i.contentWindow.document:i.contentDocument?i.contentDocument:i.document;if(!c||c.location.href==e.iframeSrc)if(!m)return;i.detachEvent?i.detachEvent("onload",t):i.removeEventListener("load",t,!1);var d=!0;try{if(m)throw"timeout";var f=e.dataType=="xml"||c.XMLDocument||a.isXMLDoc(c);b("isXml="+f);if(!f&&window.opera&&(c.body==null||c.body.innerHTML=="")&&--s){b("requeing onLoad callback, DOM not available"),setTimeout(t,250);return}j.responseText=c.body?c.body.innerHTML:c.documentElement?c.documentElement.innerHTML:null,j.responseXML=c.XMLDocument?c.XMLDocument:c,j.getResponseHeader=function(a){var b={"content-type":e.dataType};return b[a]};var g=/(json|script)/.test(e.dataType);if(g||e.textarea){var l=c.getElementsByTagName("textarea")[0];if(l)j.responseText=l.value;else if(g){var n=c.getElementsByTagName("pre")[0],o=c.getElementsByTagName("body")[0];n?j.responseText=n.textContent:o&&(j.responseText=o.innerHTML)}}else e.dataType=="xml"&&!j.responseXML&&j.responseText!=null&&(j.responseXML=u(j.responseText));q=w(j,e.dataType,e)}catch(p){b("error caught:",p),d=!1,j.error=p,e.error&&e.error.call(e.context,j,"error",p),k&&a.event.trigger("ajaxError",[j,e,p])}j.aborted&&(b("upload aborted"),d=!1),d&&(e.success&&e.success.call(e.context,q,"success",j),k&&a.event.trigger("ajaxSuccess",[j,e])),k&&a.event.trigger("ajaxComplete",[j,e]),k&&!--a.active&&a.event.trigger("ajaxStop"),e.complete&&e.complete.call(e.context,j,d?"success":"error"),setTimeout(function(){h.removeData("form-plugin-onload"),h.remove(),j.responseXML=null},100)}}function p(){var b=l.attr("target"),c=l.attr("action");d.setAttribute("target",f),d.getAttribute("method")!="POST"&&d.setAttribute("method","POST"),d.getAttribute("action")!=e.url&&d.setAttribute("action",e.url),e.skipEncodingOverride||l.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),e.timeout&&setTimeout(function(){m=!0,t()},e.timeout);var g=[];try{if(e.extraData)for(var j in e.extraData)g.push(a('<input type="hidden" name="'+j+'" value="'+e.extraData[j]+'" />').appendTo(d)[0]);h.appendTo("body"),i.attachEvent?i.attachEvent("onload",t):i.addEventListener("load",t,!1),d.submit()}finally{d.setAttribute("action",c),b?d.setAttribute("target",b):l.removeAttr("target"),a(g).remove()}}var d=l[0];if(a(":input[name=submit],:input[id=submit]",d).length)alert('Error: Form elements must not have name or id of "submit".');else{var e=a.extend(!0,{},a.ajaxSettings,c);e.context=e.context||e;var f="jqFormIO"+(new Date).getTime(),g="_"+f,h=a('<iframe id="'+f+'" name="'+f+'" src="'+e.iframeSrc+'" />'),i=h[0];h.css({position:"absolute",top:"-1000px",left:"-1000px"});var j={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){b("aborting upload...");var c="aborted";this.aborted=1,h.attr("src",e.iframeSrc),j.error=c,e.error&&e.error.call(e.context,j,"error",c),k&&a.event.trigger("ajaxError",[j,e,c]),e.complete&&e.complete.call(e.context,j,"error")}},k=e.global;k&&!(a.active++)&&a.event.trigger("ajaxStart"),k&&a.event.trigger("ajaxSend",[j,e]);if(e.beforeSend&&e.beforeSend.call(e.context,j,e)===!1){e.global&&a.active--;return}if(j.aborted)return;var m=0,n=d.clk;if(n){var o=n.name;o&&!n.disabled&&(e.extraData=e.extraData||{},e.extraData[o]=n.value,n.type=="image"&&(e.extraData[o+".x"]=d.clk_x,e.extraData[o+".y"]=d.clk_y))}e.forceSync?p():setTimeout(p,10);var q,r,s=50,u=a.parseXML||function(a,b){window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml");return b&&b.documentElement&&b.documentElement.nodeName!="parsererror"?b:null},v=a.parseJSON||function(a){return window.eval("("+a+")")},w=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=c==="xml"||!c&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;f&&g.documentElement.nodeName==="parsererror"&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),typeof g=="string"&&(c==="json"||!c&&e.indexOf("json")>=0?g=v(g):(c==="script"||!c&&e.indexOf("javascript")>=0)&&a.globalEval(g));return g}}}if(!this.length){b("ajaxSubmit: skipping submit process - no element selected");return this}typeof c=="function"&&(c={success:c});var d=this.attr("action"),e=typeof d=="string"?a.trim(d):"";e&&(e=(e.match(/^([^#]+)/)||[])[1]),e=e||window.location.href||"",c=a.extend(!0,{url:e,success:a.ajaxSettings.success,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},c);var f={};this.trigger("form-pre-serialize",[this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(c.beforeSerialize&&c.beforeSerialize(this,c)===!1){b("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var g,h,i=this.formToArray(c.semantic);if(c.data){c.extraData=c.data;for(g in c.data)if(c.data[g]instanceof Array)for(var j in c.data[g])i.push({name:g,value:c.data[g][j]});else h=c.data[g],h=a.isFunction(h)?h():h,i.push({name:g,value:h})}if(c.beforeSubmit&&c.beforeSubmit(i,this,c)===!1){b("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[i,this,c,f]);if(f.veto){b("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var k=a.param(i);c.type.toUpperCase()=="GET"?(c.url+=(c.url.indexOf("?")>=0?"&":"?")+k,c.data=null):c.data=k;var l=this,m=[];c.resetForm&&m.push(function(){l.resetForm()}),c.clearForm&&m.push(function(){l.clearForm()});if(!c.dataType&&c.target){var n=c.success||function(){};m.push(function(b){var d=c.replaceTarget?"replaceWith":"html";a(c.target)[d](b).each(n,arguments)})}else c.success&&m.push(c.success);c.success=function(a,b,d){var e=c.context||c;for(var f=0,g=m.length;f<g;f++)m[f].apply(e,[a,b,d||l,l])};var o=a("input:file",this).length>0,p="multipart/form-data",q=l.attr("enctype")==p||l.attr("encoding")==p;c.iframe!==!1&&(o||c.iframe||q)?c.closeKeepAlive?a.get(c.closeKeepAlive,r):r():a.ajax(c),this.trigger("form-submit-notify",[this,c]);return this},a.fn.ajaxForm=function(c){if(this.length===0){var d={s:this.selector,c:this.context};if(!a.isReady&&d.s){b("DOM not ready, queuing ajaxForm"),a(function(){a(d.s,d.c).ajaxForm(c)});return this}b("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.ajaxFormUnbind().bind("submit.form-plugin",function(b){b.isDefaultPrevented()||(b.preventDefault(),a(this).ajaxSubmit(c))}).bind("click.form-plugin",function(b){var c=b.target,d=a(c);if(!d.is(":submit,input:image")){var e=d.closest(":submit");if(e.length==0)return;c=e[0]}var f=this;f.clk=c;if(c.type=="image")if(b.offsetX!=undefined)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if(typeof a.fn.offset=="function"){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)})},a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(b){var c=[];if(this.length===0)return c;var d=this[0],e=b?d.getElementsByTagName("*"):d.elements;if(!e)return c;var f,g,h,i,j,k,l;for(f=0,k=e.length;f<k;f++){j=e[f],h=j.name;if(!h)continue;if(b&&d.clk&&j.type=="image"){!j.disabled&&d.clk==j&&(c.push({name:h,value:a(j).val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}));continue}i=a.fieldValue(j,!0);if(i&&i.constructor==Array)for(g=0,l=i.length;g<l;g++)c.push({name:h,value:i[g]});else i!==null&&typeof i!="undefined"&&c.push({name:h,value:i})}if(!b&&d.clk){var m=a(d.clk),n=m[0];h=n.name,h&&!n.disabled&&n.type=="image"&&(c.push({name:h,value:m.val()}),c.push({name:h+".x",value:d.clk_x},{name:h+".y",value:d.clk_y}))}return c},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];this.each(function(){var d=this.name;if(!!d){var e=a.fieldValue(this,b);if(e&&e.constructor==Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else e!==null&&typeof e!="undefined"&&c.push({name:this.name,value:e})}});return a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);if(g===null||typeof g=="undefined"||g.constructor==Array&&!g.length)continue;g.constructor==Array?a.merge(c,g):c.push(g)}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();c===undefined&&(c=!0);if(c&&(!d||b.disabled||e=="reset"||e=="button"||(e=="checkbox"||e=="radio")&&!b.checked||(e=="submit"||e=="image")&&b.form&&b.form.clk!=b||f=="select"&&b.selectedIndex==-1))return null;if(f=="select"){var g=b.selectedIndex;if(g<0)return null;var h=[],i=b.options,j=e=="select-one",k=j?g+1:i.length;for(var l=j?g:0;l<k;l++){var m=i[l];if(m.selected){var n=m.value;n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value);if(j)return n;h.push(n)}}return h}return a(b).val()},a.fn.clearForm=function(){return this.each(function(){a("input,select,textarea",this).clearFields()})},a.fn.clearFields=a.fn.clearInputs=function(){return this.each(function(){var a=this.type,b=this.tagName.toLowerCase();a=="text"||a=="password"||b=="textarea"?this.value="":a=="checkbox"||a=="radio"?this.checked=!1:b=="select"&&(this.selectedIndex=-1)})},a.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})},a.fn.enable=function(a){a===undefined&&(a=!0);return this.each(function(){this.disabled=!a})},a.fn.selected=function(b){b===undefined&&(b=!0);return this.each(function(){var c=this.type;if(c=="checkbox"||c=="radio")this.checked=b;else if(this.tagName.toLowerCase()=="option"){var d=a(this).parent("select");b&&d[0]&&d[0].type=="select-one"&&d.find("option").selected(!1),this.selected=b}})}})(jQuery);
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }
      return ajax.success(response, status);
    },
    complete: function (response, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(response, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = v;
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (response, uri) {
  alert(Drupal.ajaxError(response, uri));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = response.settings || this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  }
};

})(jQuery);
;
