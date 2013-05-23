// ==UserScript==
// @name        H0 Modelbahnforum
// @namespace   Woems
// @description Verbesserung von http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=54887
// @include     http://www.nexusboard.net/*siteid=2408*
// @version     1
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) { return (typeof ID === 'string' ? document.getElementById(ID) : ID) }
// ** XPath **
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  p=p.replace(/([^.])\.(\w+)/g,'$1[@class="$2"]').replace(/#(\w+)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');  // '//.class' '//#id' '//[...]'
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// ** Messageboxen **
function topmessage(data) // id, text, onOK/onCancel/onTimeout, Timeout, color
{
  if (!data.id) data.id="topmessage";
  if ($(data.id)) remove($(data.id));
  var Box=insertBefore(createElement("div",{ id:data.id, innerHTML: data.text, style:"padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center" }),document.body);
  if (data.onOK) createElement("input",{ type:"button", value:"OK", style:"margin:0px 0px 0px 15px;" }, Box, function () { remove($(data.id)); data.onOK(); });
  if (data.onCancel) createElement("input",{ type:"button", value:"Cancel", style:"margin:0px 0px 0px 4px;" }, Box,function () { remove($(data.id)); data.onCancel(); });
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
}
// ** Edit Nodes **
function createElement(type, attributes, append){
  var node = document.createElement(type);
  if (attributes) for (var attr in attributes) if (attributes.hasOwnProperty(attr))
    if (attr.indexOf("on")==0) node.addEventListener(attr.substr(2).toLowerCase(),function(event){ if (attributes[attr](event.target,event)) { event.stopPropagation(); event.preventDefault(); } }, true); else
    if (['style'].indexOf(attr)!=-1) node.setAttribute(attr, attributes[attr]); else
    if (attr=="append") node.appendChild(attributes[attr]); else
    if (attr=="childs") { for (var child in attributes[attr]) if (attributes[attr].hasOwnProperty(child)) node.appendChild(attributes[attr][child]); } else
    try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
// var test=createElement("div",{ innerHTML:"LOL", textContent:"123", onClick: function () { alert("test"); },  append:createElement("span",{ innerHTML:"Text"}) }, document.body);
function fade(node, speed, to, endfunc) {
  if (node.style.opacity=="") node.style.opacity=(node.style.display=='none')?0:1;
  node.style.display="";
  counter={slow : 0.01, medium : 0.05, fast: 0.15}[(speed||'').toLowerCase()]||.05;
  richtung=(parseFloat(node.style.opacity)>to)?-1:1;
  node.style.display='';
  var intv = setInterval(function(){
    if((parseFloat(node.style.opacity)-to)*richtung<=0) node.style.opacity = (parseFloat(node.style.opacity)+counter*richtung).toString();
    else {
      clearInterval(intv);
      node.style.display=(parseFloat(node.style.opacity)<=0)?'none':'';
      if (parseFloat(node.style.opacity)>=1) node.style.opacity="";
      if (endfunc) endfunc();
    }
  }, 50);
}
function Text(txt) { return document.createTextNode(txt); }
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function insertFirstChild(newNode, node) { return node.insertBefore(newNode, node.firstChild); }
function hide(node,hideshow) { $(node).style.display=(hideshow=='hide')?'none': (hideshow=='show')?'': ($(node).style.display=='none')?'':'none'; }
function selectsort(obj) { var list=[]; for (var i=0; node=obj.options[i]; i++) list.push(node); list.sort(function (a,b) { return a.textContent>b.textContent?1:a.textContent<b.textContent?-1:0; }); list.forEach(function (e) { obj.appendChild(e); }); }
// ** Events **
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
function on(type, elm, func) {
  if (!elm) GM_log("ERROR: Elm undefined!!!\non("+type+", "+elm+", "+func+");");
  if (type instanceof Array) type.forEach(function (t) { on(t, elm, func); })
  else if (elm instanceof Array) elm.forEach(function (e) { on(type, e, func); })
  else (typeof elm === 'string' ? document.getElementById(elm) : elm).addEventListener(type, func, false);
} // on(['click','dblclick'],['input',document.body],function (e) { alert(e); }); 
function onKey(func) { on('keydown',window,function (e) {
  var key=(e.ctrlKey?'CTRL+':'') + (e.altKey?'ALT+':'') + (e.metaKey?'META+':'') + String.fromCharCode(e.keyCode);
  var code={ SHIFT:e.shiftKey, CTRL:e.ctrlKey, ALT:e.altKey, META:e.metaKey, KEY:e.keyCode, CHAR:String.fromCharCode(e.keyCode) };
  if (func(key, code, e)) { e.stopPropagation(); e.preventDefault(); } }); }
function onAccesskey(func,debug) { window.addEventListener('keydown',function (e) { if (!e.shiftKey || !e.altKey) return; var key=String.fromCharCode({222:50,0:51,191:55,55:54,57:56,48:57,61:48}[e.keyCode]||e.keyCode).toLowerCase(); var node=$xs("//*[@accesskey='"+key+"']"); if (debug) GM_log("\nKey: "+key+"\nCode: "+e.keyCode+"\nWhich: "+e.which+"\nNode: "+node.innerHTML); if (node && func(key,node,e)) { e.stopPropagation(); e.preventDefault(); }; }, false); }
function click(elm) { var evt = document.createEvent('MouseEvents'); evt.initEvent('click', true, true); elm.dispatchEvent(evt); } // geht nur bei "//input"
function getAccesskeys() { return $x('//*[@accesskey]').map(function (e) { return e.getAttribute("accesskey"); }).sort().join(", "); }
function getFreeAccesskeys() { var keys=getAccesskeys(); return "abcdefghijklmnopqrstuvwxyz1234567890+-#<".split("").filter(function (e) { return keys.indexOf(e)==-1; }).sort().join(", "); }
//GM_log("\nKeys: "+getAccesskeys()+"\nFree: "+getFreeAccesskeys());
function css(code) { GM_addStyle(code); }
// ** Position **
function PosX(element) { var e=element; var i=0; while(e) { i+=e.offsetLeft; e=e.offsetParent; } return i; }
function PosY(element) { var e=element; var i=0; while(e) { i+=e.offsetTop; e=e.offsetParent; } return i; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// ** Timer **
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
function alleXTage(tage, key) { key=key||"alleXTage"; if (GM_getValue(key,0) == 0 || new Date().getTime() > (+GM_getValue(key, 0) + (1000*60*60*24*tage))) { GM_setValue(key,new Date().getTime()+""); return true; } return false; }
// if (alleXTage(10)) alert("alle 10 Tage");
// ** Save **
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function aset(name, key, val) { var tmp=deserialize(name); tmp[key]=val; serialize(name,tmp);}
function aget(name, key) { return deserialize(name)[key]; }
         // GM_deleteValue("pwd");
// ** XHTML **
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
// get("",function (url, text, header, xhr) { var div=text2div(text); });
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// head("",function (url, text, header, xhr) { var div=text2div(text); });
function post(url, data, cb) { GM_xmlhttpRequest({ method: "POST", url: url, headers:{'Content-type':'application/x-www-form-urlencoded'}, data:encodeURI(data), onload:function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// post("",{},function (url, text, header, xhr) { var div=text2div(text); });
function text2div(text) { var div=document.createElement("div"); div.innerHTML=text; return div; }
// ** Date **
Date.prototype.format = function(format) { var returnStr = ''; var replace = Date.replaceChars; for (var i = 0; i < format.length; i++) { var curChar = format.charAt(i); if (i - 1 >= 0 && format.charAt(i - 1) == "\\") { returnStr += curChar; } else if (replace[curChar]) { returnStr += replace[curChar].call(this); } else if (curChar != "\\"){ returnStr += curChar; } } return returnStr; }; Date.replaceChars = { shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); }, D: function() { return Date.replaceChars.shortDays[this.getDay()]; }, j: function() { return this.getDate(); }, l: function() { return Date.replaceChars.longDays[this.getDay()]; }, N: function() { return this.getDay() + 1; }, S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); }, w: function() { return this.getDay(); }, z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, W: function() { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7); }, F: function() { return Date.replaceChars.longMonths[this.getMonth()]; }, m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); }, M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; }, n: function() { return this.getMonth() + 1; }, t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); }, o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, Y: function() { return this.getFullYear(); }, y: function() { return ('' + this.getFullYear()).substr(2); }, a: function() { return this.getHours() < 12 ? 'am' : 'pm'; }, A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; }, B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, g: function() { return this.getHours() % 12 || 12; }, G: function() { return this.getHours(); }, h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); }, H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); }, i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); }, s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },    u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; }, e: function() { return "Not Yet Supported"; }, I: function() { return "Not Yet Supported"; }, O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; }, P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;}, Z: function() { return -this.getTimezoneOffset() * 60; }, c: function() { return this.format("Y-m-d\\TH:i:sP"); }, r: function() { return this.toString(); }, U: function() { return this.getTime() / 1000; } };
Date.prototype.getDayString = function() { return ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][this.getDay()]; }
Date.prototype.getMonthString = function() { return ["Januar","Februar","März","April","May","Juni","Juli","August","September","Oktober","November","Dezember"][this.getMonth()]; }
Date.prototype.getShortDate = function() { return this.getDate().pad(2)+"."+["Jan","Feb","Mär","Apr","May","Jun","Jul","Aug","Sep","Okt","Nov","Dez"][this.getMonth()]+"."+this.getFullYear()+" "+this.getHours().pad(2)+":"+this.getMinutes().pad(2)+"."+this.getSeconds().pad(2); }
Date.prototype.getShortDate2 = function() { return this.getDate().pad(2)+"."+(this.getMonth()+1).pad(2)+"."+this.getFullYear()+" "+this.getHours().pad(2)+":"+this.getMinutes().pad(2)+"."+this.getSeconds().pad(2); }
Date.prototype.diff = function(date) { var tmp="in "; var diff=this.getTime()-date.getTime(); if (diff<0) { diff*=-1; tmp="vor "; } return (tmp+Math.floor(diff/1000/60/60/24/7)+"w "+Math.floor(diff/1000/60/60/24%7)+"d "+Math.floor(diff/1000/60/60%24)+"h "+Math.floor(diff/1000/60%60)+"m "+Math.floor(diff/1000%60)+"s").replace(/ 0[wdhms]/g,''); }
function Now(d) { return (d||new Date()).getTime()/1000; }
function NowOut(d) { return new Date(d*1000).getShortDate(); }
function ParseDate(d) { var sp=d.match(/(([0-9]{2})\.([0-9]{2})\.([0-9]{2,4}))? ?(([0-9]{1,2}):([0-9]{2}))?/); return new Date(sp[4]||1970,(sp[3]||1)-1,sp[2]||1,sp[6]||0,sp[7]||0,0); }
// ** Text **
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
String.prototype.ltrim = function() { return this.replace(/^\s+/,""); }
String.prototype.rtrim = function() { return this.replace(/\s+$/,""); }
String.prototype.lpad = function(len, chr) { return (len-this.length+1<0)?this:Array(len-this.length+1).join(chr||' ') + this; }
String.prototype.rpad = function(len, chr) { return (len-this.length+1<0)?this:this + Array(len-this.length+1).join(chr||' '); }
Number.prototype.pad = function(len) { return (len-this.toString().length+1<0)?this:Array(len-this.toString().length+1).join('0') + this.toString(); }
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
function pad(text,anz,chr) { return text.replace(/(^\s*|\s*$)/g,""); }
function fill(text,fillchar,anz) { var f=""; for (; anz>text.toString().length; anz--) f+=fillchar; return f+text; }
// ** Array **
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function arrayTrim(a) { return a.map(function (e) { return e.replace(/[^\S|\S$]/,""); }); };
function arrayClean(a) { return a.filter(function (e) { return e!=""; }); };
function arrayRand(array) { if (!array || array.length==0) GM_log("ArrayGetRand Error: Array ist undefined or 0\nArray: "+array+"\nType: "+typeof array+"\nUneval: "+uneval(array)); return array[Math.floor(Math.random()*(array.length-1))]; }
Array.prototype.trim = function () { return this.map(function (e) { return e.replace(/[^\S|\S$]/,""); }); };
Array.prototype.clean = function () { return this.filter(function (e) { return e!=""; }); };
Array.prototype.uniq = function (array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
// ** Objekte **
function ObjKeys(Obj) { var t=[]; for (i in Obj) t.push(i); return t; }
function ObjValues(Obj) { var t=[]; for (i in Obj) t.push(Obj[i]); return t; }
function ObjKeysAndValues(Obj,sep) { var t=[]; for (i in Obj) t.push(i+(sep||": ")+Obj[i]); return t; }
function ForEachObj(Obj,func) { for (i in Obj) func(i, Obj[i]); }
function MapObj(Obj,func) { var t=[]; for (i in Obj) t.push(func(i, Obj[i])); return t; }
function Obj2String(Obj, sep) { var t=[]; for (i in Obj) t.push(i+": "+Obj[i]); return t.sort().join(sep||"\n"); }
// ** Parameter **
function urlParse(url) { var a = urlParse.a = urlParse.a || document.createElement('a'); a.href = url; return { scheme: /^[^:]+/.exec(a.protocol)[0], host: a.host, hostname: a.hostname, pathname: a.pathname, search: a.search, hash: a.hash }; } //alert(mdump(urlParse(location.href)));
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key, def) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return ((key)?r[key]:r)||def; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
// ** HTML-Code
var HTML={
  div: function (text) { return '<div>'+text+'</div>'; },
  row: function (cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; },
  table: function (rows) { return '<table>' + rows.join('') +'</table>'; },
  elem: function (name,param,inhalt) { return '<'+name+(param?' '+param.join(" "):"")+'>'+(inhalt||'')+'</'+name+'>'; },
  br: function () { return '<br>'; },
  divright: function (content) { return '<div style="text-align:right;">'+(content||"")+'</div>'; },
  form: function (uri,name,content,get) { return '<form action="'+uri+'" name="'+name+'" method="'+(get?'get':'post')+'">'+(content||"")+'</form>'; },
  input: function (type,name,value,content) { return '<input type="'+type+'" name="'+(name||"")+'" value="'+(value||"")+'">'+(content||"")+'</input>'; },
  button: function (name,value) { return input("button",name,value); },
  submitbutton: function (name,value) { return input("submit",name,value); },
  resetbutton:function (name,value) { return input("reset",name,value); },
  textarea:function (cols,rows,name,content) { return '<textarea cols="'+cols+'" rows="'+rows+'" name="'+(name||"")+'">'+(content||"")+'</textarea>'; },
  selectbox:function (height,name,lines) { return '<select size="'+height+'" name="'+name+'"><option>'+lines.join("</option><option>")+'</option></select>';},
  dropdownbox:function (name,lines) { return selectbox(1,name,lines); },
  link: function (url,content) { return '<a href="'+url+'">'+(content||url)+'</a>'; },
  checkbox: function (name,checked) { return '<input type="checkbox" name="'+(name||'')+'"'+(checked?" checked":"")+'>'; },
  radio: function (name,checked) { return '<input type="radio" name="'+(name||'')+'"'+(checked?" checked":"")+'">'; },
};
// ** REST **
function inFrame() { return self!=top; }
function dump(obj, deep) { if (typeof obj=="object") if (obj instanceof Array) { var tmp=[]; for (j in obj) tmp.push(dump(obj[j], deep)); return "[ "+tmp.join(", ")+" ]"; } else { var tmp=[]; deep=(deep||'')+'   '; for (j in obj) tmp.push(deep+j+" = "+dump(obj[j], deep)); return "{\n"+tmp.join(",\n")+"\n"+deep+"}"; } return (typeof obj=="string")?"'"+obj+"'":obj; }
//var a=["öpö","lol"]; for (i in a) if (a.hasOwnProperty(i)) GM_log(i+": "+a[i]);
function iframe(url,className,w,h,noframetext) { var iframe=document.createElement("iframe"); iframe.src=url; iframe.className=className||"test"; iframe.width=w||100; iframe.height=h||100; iframe.innerHTML=noframetext||""; return iframe; }
function FrameBuster() { return window === parent; } // TopWindow=true, IFrame=False, Frame=False
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) { window[key] = GM_getValue(key, defaultValue); GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() { GM_setValue(key, !window[key]); location.reload(); }); }
function showmsg(data)
{
  if (!data.id) data.id="default_msg_{rand}";
  data.id=data.id.replace("{rand}",Math.floor(Math.random()*1000));
  if ($(data.id)) remove($(data.id));
  if (data.onOKTimeout) { data.onOK=data.onOKTimeout; data.onTimeout=data.onOKTimeout; }
  var style="padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center; z-index:9999;";
  if (data.fixed) style+=" position: fixed; top:0px; width: 100%;";
  if (data.top) style+=" position: absolute; top:0px; width: 100%;";
  data.box=insertBefore(createElement("form",{ id:data.id, innerHTML: data.text, style:data.style||style }),document.body);
  if (data.onOK) data.okbtn=createElement("input",{ type:"button", value:data.OK||"OK", style:"margin:0px 0px 0px 15px;", onClick:function () { data.onOK(data); remove($(data.id));  } }, data.box);
  if (data.onCancel) data.cancelbtn=createElement("input",{ type:"button", value:data.Cancel||"Cancel", style:"margin:0px 0px 0px 4px;", onClick:function () { data.onCancel(data); remove($(data.id));  } }, data.box);
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
  return data;
} // id, text, color, OK, onOK, Cancel, onCancel, Timeout, onTimeout, onOKTimeout // ** Log **
// $xs('id("default_msg")/input[@value="OK"]').setAttribute("accesskey","o");
// $xs('id("default_msg")/input[@value="Cancel"]').setAttribute("accesskey","c");
// $('default_msg_ok').setAttribute("accesskey","o");
// $('default_msg_cancel').setAttribute("accesskey","c");
function createHover(elem,text)
{
  if (!$("wPopup")) createElement('div', { id:"wPopup", style:"display:none; padding: 3px; background:lightgray; border:1px solid black; position:absolute;" }, document.body);
  elem.addEventListener("mouseover",function(event){
    if (event.target.title) { text="<b>"+event.target.title+"</b><br><br>"+text; event.target.title=""; }
    $("wPopup").innerHTML=text;
    $("wPopup").style.top=(PosY(event.target)+20)+"px";
    $("wPopup").style.left=PosX(event.target)+"px";
    $("wPopup").style.display="";
   window.setTimeout(function () {
     if ($("wPopup").clientWidth > window.innerWidth)
       $("wPopup").style.left="1px";
     else if ($("wPopup").clientWidth > window.innerWidth-PosX(event.target))
       $("wPopup").style.left=(window.innerWidth-$("wPopup").clientWidth)+"px";
     else
       $("wPopup").style.left=PosX(event.target)+"px";
   },100);
  }, true);
  elem.addEventListener("mouseout",function(event){
    if ($("wPopup")) $("wPopup").style.display="none";
  }, true);
}
// ** Log **
//if(unsafeWindow.console) var GM_log = unsafeWindow.console.log; // Loggt in Firefox Console
//GM_log=function (){}
//alert=function (Text) { showmsg({ text: Text.replace(/\n/g,"<br>"), color:"yellow", fixed:false, Timeout:30, onTimeout: function (data) {}, }); };
/********************************/


switch (location.pathname)
{
  case "/forumdisplay.php":
    board();
    break;
  case "/showthread.php":
    thread();
    break;
  case "/file_manager.php":
    break;
  default:
    //alert(GM_info.script.name+"Path "+location.pathname+" unbekannt.");
    break;
}

function JSONdir() {
  if (aget('options','JSON')==undefined) aset('options','JSON',prompt('JSON dir?'));
  return aget('options','JSON');
}
function JSONget(id,func) {
  if (JSONdir())
    get(JSONdir()+'?action=get&id='+id,function (url, text, headers, xhr) { try { if (func) func(eval('('+text+')'),id); } catch(e) { GM_log(["JSONget: NoArray",'ID: '+id,"Error: "+e,'Header:',headers,"Text:",text].join("\n")); } });
}
function JSONkat(id,pid,bis,func) {
  if (JSONdir())
    get(JSONdir()+'?action=read&id='+id+'&pid='+pid+'&bis='+bis,function (url, text, headers, xhr) { try { if (func) func(eval('('+text+')'),id); } catch(e) { GM_log(["JSONget: NoArray",'ID: '+id,"Error: "+e,'Header:',headers,"Text:",text].join("\n")); } });
}
function JSONquali(id,quali,func) {
  if (JSONdir())
    get(JSONdir()+'?action=quali&id='+id+'&quali='+quali,function (url, text, headers, xhr) { try { if (func) func(eval('('+text+')'),id); } catch(e) { GM_log(["JSONget: NoArray",'ID: '+id,"Error: "+e,'Header:',headers,"Text:",text].join("\n")); } });
}

function setData(ID,attr,val)
{
  var data=deserialize("data",{});
  if (!data[ID]) data[ID]={};
  data[ID][attr]=val;
  serialize("data",data);  
}
function getData(ID,attr, def)
{
  var data=deserialize("data",{});
  if (!data[ID]) return def;
  return data[ID][attr]||def;
}
function lastpid(ID,PID) { setData(ID,"pid",PID); }
function gelesen(ID) { setData(ID,"gelesen",new Date()); }
function gelesenbis(ID, zeile) { if (getData(ID,"gelesenbis",0)<zeile) { setData(ID,"gelesenbis",zeile); return true; } }
function gut(ID) { setData(ID,"gut",true); }
function schlecht(ID) { setData(ID,"gut",false); }


function board() {
  //css(".gut { background-color:lightgreen }");
  //css(".schlecht { background-color: }");
  var Zeilen=$x("//table[@class='bordered']/tbody/tr[td[@class='bgc6']]");
  Zeilen.forEach(function (row) {
    row.cells[2].setAttribute("onclick","");
    //$xs(".//a",row.cells[2]).target="_blank";
    var Link=$xs(".//a",row.cells[2]).href;
    var ID=Link.replace(/^.*threadid=([0-9]*).*$/,"$1");
    JSONget(ID,function (arr,id) { 
      if (arr.length!=1) { GM_log("length!=1"); return; }
      if (typeof arr[0]=="string") return;
      var data=deserialize('data',{});
      var changed=false;
      if (!data[arr[0].ID])
      {
        data[arr[0].ID]={ id:arr[0].ID, gelesenbis:parseInt(arr[0].gelesenBis), pid:arr[0].pid, gut:(arr[0].Qualitaet?arr[0].Qualitaet<4:undefined) };
        GM_log(["NEW",arr[0].ID,uneval(data[arr[0].ID])].join('\n'));
        changed=true;
      }
      if (data[arr[0].ID].gut==undefined) data[arr[0].ID].gut=(arr[0].Qualitaet?arr[0].Qualitaet<4:undefined);
      if (parseInt(arr[0].gelesenBis) > data[arr[0].ID].gelesenbis)
      {
        //GM_log(["JSON: "+id,uneval(arr),arr[0].ID,, ,"","DATA:",uneval(data[arr[0].ID])].join('\n'));
        GM_log(["Weitergelesen:",arr[0].ID,$xs("//a[contains(@href,'"+arr[0].ID+"')]").textContent,parseInt(arr[0].gelesenBis),arr[0].pid,data[arr[0].ID].gelesenbis,data[arr[0].ID].pid].join('\n'));
        data[arr[0].ID].gelesenbis=parseInt(arr[0].gelesenBis);
        data[arr[0].ID].pid=arr[0].pid;
        changed=true;
      } else if (parseInt(arr[0].gelesenBis) < data[arr[0].ID].gelesenbis) {
        GM_log(["Server out of gelesen:",arr[0].ID,$xs("//a[contains(@href,'"+arr[0].ID+"')]").textContent,parseInt(arr[0].gelesenBis),arr[0].pid,data[arr[0].ID].gelesenbis,data[arr[0].ID].pid].join('\n'));
      }
      serialize('data',data);
      //GM_log(["JSON: "+id,uneval(arr),arr[0].ID,, ,"","DATA:",uneval(data[arr[0].ID])].join('\n'));
      if (changed) window.setTimeout(function () { location.reload(); }, 4*1000);
    });
    var data=deserialize("data",{});
    if (data[ID])
    {
      //alert([Link, ID, uneval(data), data[ID].gut, data[ID].gut!=undefined, data[ID].gelesen].join("<br>"));
      var ThreadEintraege=row.cells[4].firstChild.innerHTML.replace(/[^0-9]/g,"")*1+1;
      var ColorGut=data[ID].gelesenbis >= ThreadEintraege-2 ? "lightgreen" : "green";
      if (data[ID].gut!=undefined) row.cells[2].style.backgroundColor=data[ID].gut?ColorGut:"#FAA"; else row.cells[2].style.backgroundColor="darkgray";
      row.cells[2].setAttribute("onmouseout","this.style.background='"+row.cells[2].style.backgroundColor+"'");
      //if (data[ID].gut!=undefined) row.className=data[ID].gut?"gut":"schlecht"; else row.className="unbekannt";
      if (data[ID].gelesenbis) row.cells[4].firstChild.innerHTML=data[ID].gelesenbis+" / "+ThreadEintraege;
      row.cells[2].appendChild(createElement("div",{ style:"font-size:xx-small", innerHTML:"Gelesen:&nbsp;"+data[ID].gelesen }));
      $xs(".//a",row.cells[2]).href=Link+"&showpage="+((Math.floor((data[ID].gelesenbis-1)/20)+1))+(data[ID].pid?'#'+data[ID].pid:'');
    }
    //row.appendChild(createElement("td",{ style:"font-size:xx-small", innerHTML:(!data[ID])?"-":"Gelesen:&nbsp;"+!!data[ID].gelesen }));
  });
  onKey(function (key, code, e) {
    switch(code.KEY)
    {
      // Backspace
      case 8: location.href="http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=54887";  break;
      // Cursor Left
      case 37: try { location.href=$xs('//td[contains(@onmouseout,"#ffffff")]/font/a').href; } catch(e) { alert("Keine weitere Seite"); } break;
      // Cursor Right
      case 39: try { location.href=$xs('//td[contains(@onmouseout,"#ffffff") or contains(@style," green")]/font/a | //td[contains(@style,"darkgray")]/font/a').href; } catch(e) { location.href=$xs('//a[text()="»"] | //font/font/following::a[1]').href; } break;
      //default: alert([key, uneval(code), e].join("\n")); break;
    }
  });
} // End: function board()

function thread() {
  var ID=getParam("threadid");
  var data=deserialize("data",{});
  var Eintraege=$x("//table[@class='bordered']/tbody/tr[td/table]");
  gelesen(ID);
  var Anfang=(getParam("showpage", 1)*1-1)*20;
  var Ende=Anfang+Eintraege.length;
  if (gelesenbis(ID, Ende)) lastpid(ID,$x("//a[contains(@name,'pid')]").pop().name);
  JSONkat(ID,$x("//a[contains(@name,'pid')]").pop().name,Ende);
  //alert([getParam("showpage", 1), Anfang, Ende, ID, uneval(deserialize("data",{})[ID])].join("\n"));
  //alert(uneval(deserialize("data",{})[ID]));
  showmsg({
    id:"quali",
    //text:["Qualität:  "+HTML.selectbox(1,'WQuali',['Unbekannt','Gut','Schlecht']),''].join("<br>"),
    //text:"<div style='margin:auto;text-align:left; width:200px'>"+
    //     [HTML.checkbox("gut",(data[ID]||{}).gut)+" Gut"].join("<br>")+
    //     "</div>",
    text:"Gut?",
    fixed:true,
    color:(!data[ID] || data[ID].gut==undefined)?"lightgray":(data[ID].gut)?"green":"red",
    OK:"Ja",
    Cancel:"Nein",
    onOK:function () { gut(ID); JSONquali(ID,2); },
    onCancel:function () { schlecht(ID); JSONquali(ID,5); },
    Timeout:(!data[ID] || data[ID].gut==undefined)?120:10,
    onTimeout:function () { },
    //Cancel:"Abbrechen",
    //onOK:function (data) { setData(ID,"gut",data.box.elements.namedItem("gut").checked); },
    //onCancel:function (data) { },
  });
  onKey(function (key, code, e) {
    if (["INPUT"].indexOf(document.activeElement.tagName)==-1)
    switch(code.KEY)
    {
      // Backspace
      case 8: location.href=$xs("//td[@class='head']/font/a[last()]").href; break; //location.href="http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=54887";  break;
      // Cursor Left
      case 37: try { location.href=$xs('//b/font/preceding-sibling::a[1]').href; } catch(e) { alert("Keine weitere Seite"); } break;
      // Cursor Right
      case 39: try { location.href=$xs('//b/font/following-sibling::a[1]').href; } catch(e) { /*alert("Keine weitere Seite");*/ location.href=$xs("//td[@class='head']/font/a[last()]").href; } break;
      //default: alert([key, uneval(code), e].join("\n")); break;
    }
  });
} // End: function thread()
