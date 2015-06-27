// ==UserScript==
// @name           kgforum
// @namespace      Woems
// @description    Verbesserungen
// @include        http://www.kgforum.org*
// @version        1
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require        https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
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
  var key=(e.ctrlKey?'CTRL+':'') + (e.altKey?'ALT+':'') + (e.shiftKey?'SHIFT+':'') + (e.metaKey?'META+':'') + String.fromCharCode(e.keyCode);
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
function div(text) { return '<div>'+text+'</div>'; }
function row(cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; }
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
  data.box=insertBefore(createElement("div",{ id:data.id, innerHTML: data.text, style:data.style||style }),document.body);
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
//GM_log=function (Text) { showmsg({ text: Text.replace(/\n/g,"<br>"), color:"yellow", fixed:true, Timeout:10, onTimeout: function (data) {}, }); };
/********************************/

function dimarray(init)
{
  this.data=init||{};
  this.set = function ()
  {
    var tmp=this.data;
    for (i=0; i<arguments.length-1; i++)
    {
      if (typeof tmp[arguments[i]]=="undefined") tmp[arguments[i]]={};
      if (i==arguments.length-2) tmp[arguments[i]]=arguments[arguments.length-1]
      else {
      if (typeof tmp[arguments[i]]!="object") { tmp[arguments[i]]={} }
      tmp=tmp[arguments[i]];
      }
    }
    return this;
  }
  this.get = function ()
  {
    var tmp=this.data;
    for (i=0; i<arguments.length; i++)
    {
      if (typeof tmp!="object") return;      
      tmp=tmp[arguments[i]];
    }
    return tmp;  
  }
  this.alert = function ()
  {
    alert("Content: "+uneval(this.data));
    return this;
  }
  this.save = function (name)
  {
    serialize(name,this.data);
    return this;
  }
  this.load = function (name)
  {
    this.data=deserialize(name,this.data);
    return this;
  }
}

//new dimarray().load("test").alert().set(2,1,4,"12414").alert().save("test");

/*alert(uneval(new dimarray()
  .set(2,1,"Short")
  .set(1,1,1,"Dies ist ein Test")
  .set(2,2,"Short2")
  .set(1,2,2,"Lol")
  .set(1,1,2,"Auch ein Test")
  .set(1,2,3,"Ahmen")
  .set(2,2,"Short3")
  .save("test")
  .alert()
  .get(1,2,4)));*/

/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/*
function kgForum()
{
  this.__noSuchMethod__=function () { alert("lol"); }
  this.url=location.pathname.substr(1).split("_");
  this.site={ typ: this.url[0], id:parseInt(this.url[1]), bereich:parseInt(this.url[2]), thread:parseInt(this.url[3]), maxartikel:parseInt(this.url[4]), artikel:parseInt(this.url[5]) };
  this.getsite = function ()
  {
    var tmp=location.pathname.substr(1).split("_");
    var out=[tmp[0]];
    for (i=1; i<tmp.length; i++)
    {
      if (isNaN(parseInt(tmp[i]))) return out;
      out.push(parseInt(tmp[i]));
    }
    return out;
  }
}
function au()
{
  var out=[];
  for (i=0; i<arguments.length; i++)
    out.push(uneval(arguments[i]));
  alert(out.join("\n\n"));
}

var site=new kgForum().getsite();
var data=new dimarray().load("data");
switch(site[0])
{
  //case 'threads': alert('t'); break;
  //case 'display': au(site,data.get.apply(data,site.slice(1,4))); break;
}

/*
var obj={ "a":1 };
Object.defineProperties(obj, {
  "property1": {
    value: true,
    writable: true
  },
  "property2": {
    value: function () { alert("123"); },
    writable: false
  }
  // etc. etc.
});

au(obj, obj.property1, obj.property2);
obj.property1=1;
obj.property2=2;
au(obj, obj.property1, obj.property2);
obj.property2();
alert(uneval(new Forum()));
alert(uneval(location.pathname.substr(1).split("_")));
*/



/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/
/********************************/

var param=location.pathname.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?/);
// Typ    , ForumsID, Bereich, Thread, MaxArtikel, Artikel
// display, 5       , 2407   , 85377 , 42     , 52
// http://www.kgforum.org/display_5_2407_85377_42_52.html
// http://www.kgforum.org/threads_5_2407.html
if (param && param[1])
switch(param[1])
{
  case 'threads': threads(param[2], param[3], param[4]); break;
  case 'display': display(param[2], param[3], param[4], param[5]||0, param[6]||0); break;
  case 'index': break;
  default: alert('KGForum: Parameter 1 unbekannt: '+uneval(param)); break;
} // switch(param[1])

// ***** HILFSFUNKTIONEN *****
function SetData(ForumsID, Bereich, Thread, Artikel, Key, Value) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Artikel]) data[ForumsID][Bereich][Thread][Artikel]={};
  data[ForumsID][Bereich][Thread][Artikel][Key]=Value;
  serialize('data',data);
}
function GetData(ForumsID, Bereich, Thread, Artikel, Key, DefValue) {
  var data=deserialize('data',{});
  try {
    return data[ForumsID][Bereich][Thread][Artikel][Key];
  } catch(e) {
    return DefValue;
  }
}
function AddData(ForumsID, Bereich, Thread, Key, Artikel) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Key]) data[ForumsID][Bereich][Thread][Key]=[];
  if (data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)==-1)
    data[ForumsID][Bereich][Thread][Key].push(Artikel);
  serialize('data',data);
}
function RemoveData(ForumsID, Bereich, Thread, Key, Artikel) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Key]) data[ForumsID][Bereich][Thread][Key]=[];
  if (data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)!=-1)
    data[ForumsID][Bereich][Thread][Key].splice(data[ForumsID][Bereich][Thread][Key].indexOf(Artikel), 1);
  serialize('data',data);
}
function IfData(ForumsID, Bereich, Thread, Key, Artikel, DefValue) {
  var data=deserialize('data',{});
  try {
    return data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)!=-1
  } catch(e) {
    return DefValue;
  }
}

function ArtikelDisplay(Artikel, Display)
{
  var ErsterArtikel=location.pathname.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?/)[6] || 0;
  var Position=Artikel*1-ErsterArtikel*1;
  $('wThread').rows[Position*3+1].style.display=Display;
  $('wThread').rows[Position*3+2].style.display=Display;
  $('wThread').rows[Position*3+3].style.display=Display;
}

function ArtikelAusblenden(ForumsID, Bereich, Thread, Artikel) {
  //SetData(ForumsID, Bereich, Thread, Artikel, "hide", true);
  AddData(ForumsID, Bereich, Thread, "hide", Artikel);
  ArtikelDisplay(Artikel, "none");
}
function ArtikelEinblenden(ForumsID, Bereich, Thread, Artikel) {
  //SetData(ForumsID, Bereich, Thread, Artikel, "hide", false);
  RemoveData(ForumsID, Bereich, Thread, "hide", Artikel);
  ArtikelDisplay(Artikel, "");
}
function ArtikelAusgeblendet(ForumsID, Bereich, Thread, Artikel) {
  //return GetData(ForumsID, Bereich, Thread, Artikel, "hide", false);
  return IfData(ForumsID, Bereich, Thread, "hide", Artikel, false);
}

// ***** HAUPTFUNKTIONEN *****
function threads(ForumsID, Bereich, Thread) // Uebersicht über alle Treads
{
  $xs("/html/body/center[2]").id="wContent";
  $xs("id('wContent')/table/tbody/tr/td/table[2]").id='wThreads';
  $x("id('wThreads')/tbody/tr/td[3]/font/a").forEach(function (a) {
    var param=a.href.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?.html$/);
    var data=deserialize('data',{});
    if (data[param[2]][param[3]][param[4]])
    {
      a.style.color="green";
      //$xs("./ancestor::tr/td[5]",a).bgColor="red";
      var Beitraege=$xs("./ancestor::tr/td[5]/font",a).textContent*1;
      var Hidden=data[param[2]][param[3]][param[4]].hide.sort(function (a,b) { return a*1-b*1 });
      var HighestHidden=Hidden.pop()*1;
      
      var Color="#dbdbdb";
      if (HighestHidden == Beitraege) Color="lightgreen";
      if (HighestHidden < Beitraege) Color="green";
      if (HighestHidden < Beitraege-5) Color="yellow";
      if (HighestHidden < Beitraege-10) Color="red";
      $xs("./ancestor::tr/td[5]",a).bgColor=Color;
      $xs("./ancestor::tr/td[5]/font",a).textContent=HighestHidden+" / "+Beitraege;
      a.href="/display_"+param[2]+"_"+param[3]+"_"+param[4]+"_"+Beitraege+"_"+HighestHidden+".html";
    }
  })
} // threads()

function display(ForumsID, Bereich, Thread, MaxArtikel, Artikel) // Einzelner Tread mit den Beitraegen der User
{
  $xs("/html/body/center[2]").id="wContent";
  $xs("id('wContent')/table/tbody/tr/td/table[2]").id='wThread';

  var Titel=$xs("//font[img[@src='http://www2.forennet.org/images/theme1/folder-3.gif']]").lastChild.textContent;
  document.title="Forum - "+Titel.replace(/^\s*|\s*$/g,"");

  if (location.hash=="") $("wContent").scrollIntoView()
  $x("id('wThread')/tbody/tr/td[@rowspan=3]").forEach(function (ZelleAutor,i) {
    var Name=ZelleAutor.firstChild.name;
    var AktuellerArtikel=Artikel*1+i;
    var Links=createElement('font', { size:1 }, ZelleAutor);

    createElement('br', {  }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel+1), AktuellerArtikel].join('_')+".html#"+Name, innerHTML:"[ Beitrag nach Oben ]" }, Links);

    createElement('br', {  }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel-1), AktuellerArtikel-1].join('_')+".html", innerHTML:"[ zurück ]" }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel+1), AktuellerArtikel+1].join('_')+".html", innerHTML:"[ weiter ]" }, Links);

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var next=createElement('a', { href:'#'+Name, innerHTML:"[ Darüber Sichtbar ]" }, Links);
    next.addEventListener("click",function(event){
      ArtikelEinblenden(ForumsID, Bereich, Thread, AktuellerArtikel-1);
      event.stopPropagation();
      event.preventDefault();
    }, true);
    createElement('br', {  }, Links);
    var prev=createElement('a', { href:'#'+Name, innerHTML:"[ Darunter Sichtbar ]" }, Links);
    prev.addEventListener("click",function(event){
      ArtikelEinblenden(ForumsID, Bereich, Thread, AktuellerArtikel+1);
      event.stopPropagation();
      event.preventDefault();
    }, true);
    /*/
    createElement('br', {  }, Links);
    var prev=createElement('a', { href:'#'+Name, innerHTML:"[ ALLE Sichtbar ]" }, Links);
    prev.addEventListener("click",function(event){
      var data=deserialize('data',{});
      data[ForumsID][Bereich][Thread]={};
      serialize('data',data);
      location.reload();
      event.stopPropagation();
      event.preventDefault();
    }, true);
    /**/

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var hide=createElement('a', { href:'#'+Name, innerHTML:"[ ausblenden ]" }, Links);
    hide.addEventListener("click",function(event){
      ArtikelAusblenden(ForumsID, Bereich, Thread, AktuellerArtikel);
      event.stopPropagation();
      event.preventDefault();
    }, true);

    // Artikel ausblenden
    if (ArtikelAusgeblendet(ForumsID, Bereich, Thread, AktuellerArtikel))
      $x('.. | ../following-sibling::tr[1] | ../following-sibling::tr[2]',ZelleAutor).forEach(function (e) {
        e.style.display="none"
      });
    
  });
  
    /**/  // Überflüssiges per Tastenkombination ausblenden
    onKey(function (key, code, e) {
      switch(key)
      {
        case 'ALT+SHIFT+D':
          var Text=$x("id('wThread')/tbody/tr/td[@rowspan=3]").map(function (ZelleAutor,i) {
            var AktuellerArtikel=Artikel*1+i;
            if (!ArtikelAusgeblendet(ForumsID, Bereich, Thread, AktuellerArtikel))
              return $xs('../following-sibling::tr[1]/td',ZelleAutor).innerHTML;
            else
              return "";
          }).filter(function (e) { return e!=""; });
          //GM_log(uneval(Text));
          Text.unshift(location.href);
          Text.push($xs("//font[@size=1][font[@size=2]]").innerHTML);
          document.body.innerHTML=Text.join("<br>---------- ---------- ---------- ---------- ----------<br>");
          document.body.scrollIntoView(false);

          var range = document.createRange();
          range.selectNode(document.body);
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);

          return true;
          break;
        //default: GM_log([key, uneval(code), e].join("\n")); break;
      }
    });
    /**/
} // display()

/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/*
function Forum()
{
  var param=location.pathname.substr(1).split('.')[0].split("_");

  this.display = function (type, forum, subforum, thema, maxa, articel)
  {
    //au(forum,subforum,thema,maxa, articel);
    noty({ text: "lol", type:"confirm", layout:"bottomRight", timeout:60000, buttons: [
		{addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {
				$noty.close();
				noty({text: 'You clicked "Ok" button', type: 'success', layout:"bottomRight"});
			}
		},
		{addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) {
				$noty.close();
				noty({text: 'You clicked "Cancel" button', type: 'error', layout:"bottomRight"});
			}
		}
	] });
  }
  this.threads = function (type, forum, subforum)
  {
    //au(forum,subforum);
  }
  if (this[param[0]])
    this[param[0]].apply(this,param);
  //else
    //au(param);
}

function au() { var t=[]; for (var i=0; i<arguments.length; i++) t.push(uneval(arguments[i])); alert(t.join("\n\n")); }

new Forum();
*/
