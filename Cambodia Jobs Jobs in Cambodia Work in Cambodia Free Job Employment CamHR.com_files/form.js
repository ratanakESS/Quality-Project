
function $(id){return document.getElementById(id);}
function $$(name,formName){formName=formName||"form1";return document.forms[formName].elements[name];}
String.prototype.trim=function(){return this.replace(/(^\s+)|(\s+$)/ig,"");}
function trim(str){return str.replace(/^\s*|\s*$/,"");}
function makeRelatedSelect(name,data,defaultItem,formName){formName=formName||"form1";defaultItem=defaultItem||[];var form=document.forms[formName];var cData=data;if(typeof name=="string")name=[name];for(var i=0;i<name.length;i++){var select=form.elements[name[i]];var value=select.getAttribute("curoption");var nextLayer="";select.options.length=0;if(typeof defaultItem[i]!="undefined"){var d=defaultItem[i].split("|");if(typeof d[1]=="undefined")d[1]="";select.options[select.options.length]=new Option(d[0],d[1]);}
for(var j in cData){var k=j.split("|");if(typeof k[1]=="undefined")k[1]=k[0];select.options[select.options.length]=new Option(k[0],k[1]);if(value==k[1]){select.options[select.options.length-1].selected=true;nextLayer=j;}}
if(!nextLayer){select.options[0].selected=true;select.setAttribute("curoption",select.options[select.selectedIndex].value);if(typeof defaultItem[i]!="undefined"){for(var o=i+1;o<name.length;o++){var select2=form.elements[name[o]];select2.options.length=0;select2.options[0]=new Option(defaultItem[o],"");select2.setAttribute("curoption","");}
break;}else{for(var l in cData){nextLayer=l;break;};}}
select.setAttribute("curoption",select.options[select.selectedIndex].value);cData=cData[nextLayer];nextLayer="";}
for(var m=0;m<name.length;m++){var select=form.elements[name[m]];select.onchange=function(){for(var n=0;n<name.length;n++){var select0=document.forms[formName].elements[name[n]];select0.setAttribute("curoption",select0.options[select0.selectedIndex].value);}
makeRelatedSelect(name,data,defaultItem,formName);if(select.getAttribute("onModify"))eval(select0.getAttribute("onModify"));return true;};}
return true;}
function previewImage(thisObj,iconImgId){if(Validator.DoFilter(thisObj.value,thisObj.getAttribute("accept"))){Validator.removeSingleErrorMsg(thisObj);if(!document.all){return;}
$(iconImgId).src=thisObj.value;resizeImg(iconImgId);}else{Validator.addSingleErrorMsg(thisObj);}}
function resizeImg(iconImgId){if(parseInt($(iconImgId).width)>=200){$(iconImgId).width="200";return;}else{window.setTimeout(function a(){resizeImg(iconImgId);},10);}}