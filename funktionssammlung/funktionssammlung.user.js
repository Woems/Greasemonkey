// ==UserScript==
// @name           Funktionssammlung
// @namespace      Woems
// @include        *
// @decription     Erweiterungen für die Greasmonkey Funktionen
// @version        0.1
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_log
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
function Key(key,func) { document.addEventListener('keypress', function (e) { k=e.keyCode||e.which; k=(e.metaKey?'META+':'')+(e.ctrlKey?'STRG+':'')+(e.altKey?'ALT+':'')+(String.fromCharCode(k)||k); if (key==k) func(); }, true);  }
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
function ShowDateDiff(sec) { var teile={ MSec:1000, Sec:60, Min:60, H:24, Tage:7, Wochen:99999 }; var tmp=''; for (i in teile) { if (Math.floor(sec%teile[i])!=0) tmp=Math.floor(sec%teile[i])+' '+i+' '+tmp; sec=sec/teile[i]; } return tmp; }
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
  button: function (name,value) { return this.input("button",name,value); },
  submitbutton: function (name,value) { return this.input("submit",name,value); },
  resetbutton:function (name,value) { return this.input("reset",name,value); },
  textarea:function (cols,rows,name,content) { return '<textarea cols="'+cols+'" rows="'+rows+'" name="'+(name||"")+'">'+(content||"")+'</textarea>'; },
  selectbox:function (height,name,lines) { return '<select size="'+height+'" name="'+name+'"><option>'+lines.join("</option><option>")+'</option></select>';},
  dropdownbox:function (name,lines) { return this.selectbox(1,name,lines); },
  link: function (url,content) { return '<a href="'+url+'">'+(content||url)+'</a>'; },
  checkbox: function (name,checked) { return '<input type="checkbox" name="'+(name||'')+'"'+(checked?" checked":"")+'>'; },
  radio: function (name,checked) { return '<input type="radio" name="'+(name||'')+'"'+(checked?" checked":"")+'">'; },
};
// ** REST **
function inFrame() { return self!=top; }
function FrameBuster() { return window === parent; } // TopWindow=true, IFrame=False, Frame=False
function dump(obj, deep) { if (typeof obj=="object") if (obj instanceof Array) { var tmp=[]; for (j in obj) tmp.push(dump(obj[j], deep)); return "[ "+tmp.join(", ")+" ]"; } else { var tmp=[]; deep=(deep||'')+'   '; for (j in obj) tmp.push(deep+j+" = "+dump(obj[j], deep)); return "{\n"+tmp.join(",\n")+"\n"+deep+"}"; } return (typeof obj=="string")?"'"+obj+"'":obj; }
//var a=["öpö","lol"]; for (i in a) if (a.hasOwnProperty(i)) GM_log(i+": "+a[i]);
function iframe(url,className,w,h,noframetext) { var iframe=document.createElement("iframe"); iframe.src=url; iframe.className=className||"test"; iframe.width=w||100; iframe.height=h||100; iframe.innerHTML=noframetext||""; return iframe; }
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) { window[key] = GM_getValue(key, defaultValue); GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() { GM_setValue(key, !window[key]); location.reload(); }); }
function showmsg(data)
{
  if (!data.id) data.id="default_msg_{rand}";
  data.id=data.id.replace("{rand}",Math.floor(Math.random()*1000));
  if ($(data.id)) remove($(data.id));
  if (data.onOKTimeout) { data.onOK=data.onOKTimeout; data.onTimeout=data.onOKTimeout; }
  var style="padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center;";
  style+=" font:normal medium sans-serif; z-index:9999;"; // Schönheitskorrekturen
  if (data.fixed) style+=" position: fixed; top:0px; width: 100%;";
  if (data.top) style+=" position: absolute; top:0px; width: 100%;";
  data.box=insertBefore(createElement("form",{ id:data.id, innerHTML: data.text, style:data.style||style }),document.body);
    $x(".//*[@name]",data.box).forEach(function (e) { if (!data[e.name]) data[e.name]=e; });
  if (data.onOK) data.okbtn=createElement("input",{ type:"button", value:data.OK||"OK", style:"margin:0px 0px 0px 15px;", onClick:function () { data.onOK(data); remove($(data.id));  } }, data.box);
  if (data.onCancel) data.cancelbtn=createElement("input",{ type:"button", value:data.Cancel||"Cancel", style:"margin:0px 0px 0px 4px;", onClick:function () { data.onCancel(data); remove($(data.id));  } }, data.box);
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
  return data;
} // id, text, color, OK, onOK, Cancel, onCancel, Timeout, onTimeout, onOKTimeout // ** Log **
//data.box.elements.namedItem('').value;
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

function iframe(url,className,w,h,noframetext)
{
  var iframe=document.createElement("iframe");
  iframe.src=url;
  iframe.className=className||"test";
  iframe.width=w||100;
  iframe.height=h||100;
  iframe.innerHTML=noframetext||"";
  return iframe;
}

// ZEIGT DEN ACCESSKEY AN
//css("*[accesskey]:after { content:' ['attr(accesskey)']'; }");

/*
var a1=["test",6,'',7]
a1=a1.clean();
for (i in a1)
  GM_log(i+": "+a1[i]);
*/

function Woems(obj, base)
{
  switch (typeof obj)
  {
    case "string": 
      var i, arr = [], xpr = document.evaluate(obj, base || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
      this.obj=arr;
      break;
    default:
      this.obj=[ obj ];
      break;
  }
  this.style=function (Name,Value) {
    this.obj.forEach(function (f) { f.style[Name]=Value; });
    return this;
  }

}


function CopyToClipboard(Text)
{
  try {
    var tc = Text.replace(/\n\n/g, '\n');
    unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes
        ["@mozilla.org/widget/clipboardhelper;1"].
        getService(Components.interfaces.nsIClipboardHelper);
    clipboardHelper.copyString(tc);
  } catch (e) { alert([e,"",
                       'Bitte in der user.js oder prefs.js im Profilverzeichniss eintragen:',
                       '  user_pref("signed.applets.codebase_principal_support", true);',
                       '  user_pref("capability.principal.greasemonkey1.id", "<url>");',
                       '  user_pref("capability.principal.greasemonkey1.granted", "UniversalXPConnect");'].join('\n')); }
}



Date.prototype.after = function() {  }
Date.prototype.before = function() {  }
Date.prototype.compereTo = function() {  }  // Compares two Dates for ordering.
Date.prototype.equals = function() {  }  // Compares two dates for equality.
/*Date.prototype.format = function(str) {
  var ersetz={ y:'FullYear', m:'Month', d:'Date', h:'Hours', m:'Minutes', s:'Seconds' };
  var padding={ m:2 };
  var tmp='';
  for (i in str)
    if (ersetz[str[i]])
{
 GM_log("tmp: "+tmp+" - "+str);
 GM_log("this: "+this);
 GM_log("str[i]: "+str[i]);
 GM_log("ersetz[str[i]]: "+ersetz[str[i]]);
 GM_log("this['get'+ersetz[str[i]]]: "+this["get"+ersetz[str[i]]]);
      tmp+=(this["get"+ersetz[str[i]]])().pad(padding[str[i]]||0);
 }   else
      tmp+=str[i];
  GM_log("OK: "+tmp);
  return tmp;
}*/



// ********* from http://jacwright.com/projects/javascript/date_format/ *********
/*/
Date.prototype.format = function(format) {
    var returnStr = '';
    var replace = Date.replaceChars;
    for (var i = 0; i < format.length; i++) {       var curChar = format.charAt(i);         if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
            returnStr += curChar;
        }
        else if (replace[curChar]) {
            returnStr += replace[curChar].call(this);
        } else if (curChar != "\\"){
            returnStr += curChar;
        }
    }
    return returnStr;
};
Date.replaceChars = {
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    // Day
    d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
    D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
    j: function() { return this.getDate(); },
    l: function() { return Date.replaceChars.longDays[this.getDay()]; },
    N: function() { return this.getDay() + 1; },
    S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
    w: function() { return this.getDay(); },
    z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
    // Week
    W: function() { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
    // Month
    F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
    m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
    M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
    n: function() { return this.getMonth() + 1; },
    t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
    // Year
    L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
    o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
    Y: function() { return this.getFullYear(); },
    y: function() { return ('' + this.getFullYear()).substr(2); },
    // Time
    a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
    A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
    B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
    g: function() { return this.getHours() % 12 || 12; },
    G: function() { return this.getHours(); },
    h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
    H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
    i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
    s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
    u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; },
    // Timezone
    e: function() { return "Not Yet Supported"; },
    I: function() { return "Not Yet Supported"; },
    O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
    P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
    T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;},
    Z: function() { return -this.getTimezoneOffset() * 60; },
    // Full Date/Time
    c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
    r: function() { return this.toString(); },
    U: function() { return this.getTime() / 1000; }
};
/**/

// var z=window.setInterval(function (){ window.clearInterval(z); },1000);


/*
Method	IE	Mozilla	Notes

every	*	FF 1.5	Calls a function for every element of the array until false is returned.
some	*	FF 1.5	Passes each element through the supplied function until true is returned.
filter	*	FF 1.5	Creates an array with each element which evaluates true in the function provided.
forEach	*	FF 1.5	Executes a specified function on each element of an Array
map	*	FF 1.5	Creates a new array with the result of calling the specified function on each element of the Array.
reduce	?	?	?

concat	4.0	4.0	Joins multiple Arrays
join	3.0	3.0	Joins all the Array elements together into a string.

pop	5.5	4.0	Returns the last item in the Array and removes it from the Array.
push	5.5	4.0	Adds the item to the end of the Array.
shift	5.5	4.0	Returns the first item in the Array and removes it from the Array.
unshift	5.5	4.0	Inserts the item(s) to the beginning of the Array.
slice	4.0	4.0	Returns a new array from the specified index and length.
splice	5.5	4.0	Deletes the specified index(es) from the Array.

reverse	3.0	3.0	Reverses the Array so the last item becomes the first and vice-versa.
sort	3.0	3.0	Sorts the array alphabetically or by the supplied function.

indexOf	*	FF 1.5	Searches the Array for specific elements.
lastIndexOf	*	FF 1.5	Returns the last item in the Array which matches the search critera.
toSource	---	FF 1.5	Returns the source code of the array.
toString	3.0	3.0	Returns the Array as a string.
valueOf	3.0	3.0	Like toString, returns the Array as a string.
*/

/*
    * indexOf() - returns the index of the given item's first occurrence.
    * lastIndexOf() - returns the index of the given item's last occurrence.
    * filter() - runs a function on every item in the array and returns an array of all items for which the function returns true.
    * forEach() - runs a function on every item in the array.
    * map() - runs a function on every item in the array and returns the results in an array.
    - every() - runs a function on every item in the array and returns true if the function returns true for every item.
    - some() - runs a function on every item in the array and returns true if the function returns true for any one item.
    - reduce() - ???
*/

/*/
GM_log("Hash: "+document.location.hash+"\n"+
      "Host: "+document.location.host+"\n"+
      "hostname: "+document.location.hostname+"\n"+
      "href: "+document.location.href+"\n"+
      "pathname: "+document.location.pathname+"\n"+
      "port: "+document.location.port+"\n"+
      "protokol: "+document.location.protokol+"\n"+
      "search: "+document.location.search+"\n"
       );
GM_log(dump({ hash:location.hash,
              host:location.host,
              hostname: location.hostname,
              href: location.href,
              pathname: location.pathname,
              port:location.port,
              protokol:location.protokol,
              search:location.search }));
/**/

/*/
  var img=new Image();    
  img.addEventListener('error',function (a) { alert("error"); },true);
  img.addEventListener('load',function (a) { alert("load"); },true);
  img.addEventListener('abort',function (a) { alert("abort"); },true);
  img.src="test.jpg";
/**/


//GM_log($xs('//div[@id="multipage_1_2"][1]'));
//GM_log($xs('//div[@id="multipage_1_2"][1]').innerHTML);
//$('multipage_1_2').wrappedJSObject.watch('class',function (id, oldVal, newVal){ alert(id+": "+oldVal+"->"+newVal); return newVal; });

/**/
    function printIt(type,event)
    {
      var data="\nType: "+type;
      if (event) {
      if (event.attrName) data+="\nattrName: "+event.attrName;
      if (event.attrChange) data+="\nattrChange: "+event.attrChange;
      if (event.prevValue) data+="\nprevValue: "+event.prevValue;
      if (event.newValue) data+="\nnewValue: "+event.newValue;
      if (event.relatedNode) data+="\nrelatedNode: "+event.relatedNode;
      }
      GM_log(data);
      //if (event) GM_log("\nType: "+type+"\nAttrName: "+event.attrName+"\nattrChange: "+event.attrChange+"\nprevValue: "+event.prevValue+"\nnewValue: "+event.newValue+"\nrelatedNode: "+event.relatedNode);
    }
/*/
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMSubtreeModified",function(event){ printIt("SubtreeModified"); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMNodeInserted",function(event){ printIt("NodeInserted",event); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMNodeRemoved",function(event){ printIt("NodeRemoved",event); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMNodeRemovedFromDocument",function(event){ printIt("NodeRemovedFromDocument",event); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMNodeInsertedIntoDocument",function(event){ printIt("NodeInsertedIntoDocument",event); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMAttrModified",function(event){ printIt("AttrModified",event); }, true);
$xs('//div[@id="multipage_1_2"][1]').addEventListener("DOMCharacterDataModified",function(event){ printIt("CharacterDataModified",event); }, true);
/**/


function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}


//Example usage:
/*
   createEl({n: 'ol', a: {'@class': 'some_list', '@id': 'my_list'}, c: [
   {n: 'li', a: {textContent: 'first point'}, evl: {type: 'click', f: function() {alert('first point');}, bubble: true}},
   {n: 'li', a: {textContent: 'second point'}},
   {n: 'li', a: {textContent: 'third point'}}
   ]}, document.body);

<ol id="my_list" class="some_list">
  <li onClick="alert('first point');">first point</li>
  <li>second point</li>
  <li>third point</li>
</ol>
*/

/*/
var a=["test","loL", GM_log];
var b={n: 'ol', a: {'@class': 'some_list', '@id': 'my_list'}, c: [
   {n: 'li', a: {textContent: 'first point'}, evl: {type: 'click', f: function() {alert('first point');}, bubble: true}},
   {n: 'li', a: {textContent: 'second point'}},
   {n: 'li', a: {textContent: 'third point'}}
   ]};
var c=["A","B","C",1,["lol"],{ "test": function (a) {alert(a)}}]
var x = [i+1 for each (i in c)];
var z={a:a,b:b,c:c};
//GM_log("\n"+dump(x));
//GM_log("\n"+dump(["A","B","C"])+"\n"+dump(["A",["B","C"],"D"])+"\n"+dump({a:"1", b:"2" })+"\n"+dump({a:"1", b:["A",["B","C"],"D"] })+"\n"+dump({a:"1", b:{c:"2", d:"3" } }));
//GM_log("\n"+dump({a:["A","B","C"],b:"ABC",c:12434,d:true}));
//GM_log("\n"+dump(z));
/**/

function dump(obj, deep)
{
  if (typeof obj=="object")
    if (obj instanceof Array)
    {
      var tmp=[];
      for (j in obj) if (obj.hasOwnProperty(j))
        tmp.push(dump(obj[j], deep));
      return "["+tmp.join(", ")+"]";
    } else {
      var tmp=[];
      deep=(deep||'')+'   ';
      for (j in obj) if (obj.hasOwnProperty(j))
        tmp.push(deep+j+" = "+dump(obj[j], deep));
      return "{\n"+tmp.join(",\n")+"\n"+deep.substr(3)+"}";
    }
  if (typeof obj=="function") obj=obj.toString().replace(/[\n ]+/g," ").replace(/(function \([^\)]*\) {.{100}).*()}/,"$1 ... $2");
  return (typeof obj=="string")?"'"+obj+"'":obj; 
}


//GM_log("test".fontcolor("red"));

/*/ // ** Getter und Setter und Watch **
var o = {a: 7, get b() {return this.a + 1;}, get c() { return this.a*2; }, set c(x) {this.a = x / 2}}; 
o.watch("a",function (id, oldVal, newVal){ GM_log(id+": "+oldVal+"->"+newVal); return newVal; });
GM_log("a: "+o.a+" / b: "+o.b+" / c: "+o.c);
o.c=50;
GM_log("a: "+o.a+" / b: "+o.b+" / c: "+o.c);
/**/3

/*
function htmlsort(HTMLObj,sortvalue)
{
  var list=[];
  for (var i=0; node=HTMLObj.childNodes[i]; i++)
  {
    list.push({ sv: (sortvalue=="text")?node.textContent:node.getAttribute(sortvalue), obj:node });
  }
  list.sort(function (a,b) { return a.sv>b.sv?1:a.sv<b.sv?-1:0; })
  list.forEach(function (e) { HTMLObj.appendChild(e.obj); });
}
function selectsort(obj)
{
  var list=[];
  for (var i=0; node=obj.options[i]; i++)
    list.push(node);
  list.sort(function (a,b) { return a.textContent>b.textContent?1:a.textContent<b.textContent?-1:0; })
  list.forEach(function (e) { obj.appendChild(e); });
}
function selectmove(quelle,ziel)
{
  for (var i=0; node=quelle.options[i]; i++)
    if (node.selected)
      ziel.appendChild(node);
}
function selectcheck(sobj,value,check)
{
  for (var i=0; node=sobj.options[i]; i++)
    if (node.value==value)
      node.selected=check;
}
function selectfunc(sel,func)
{
  for (var i=sel.options.length-1; node=sel.options[i]; i--)
    func(node);
}
*/

/*

|- ancestor
   |- ancestor/parent
      |- preceding
      |- SELF
      |  |- child/descendant
      |     |- descendant
      |- following

AxisName  	Result
ancestor 	Selects all ancestors (parent, grandparent, etc.) of the current node
ancestor-or-self 	Selects all ancestors (parent, grandparent, etc.) of the current node and the current node itself
attribute 	Selects all attributes of the current node
child 	Selects all children of the current node
descendant 	Selects all descendants (children, grandchildren, etc.) of the current node
descendant-or-self 	Selects all descendants (children, grandchildren, etc.) of the current node and the current node itself
following 	Selects everything in the document after the closing tag of the current node
following-sibling 	Selects all siblings after the current node
namespace 	Selects all namespace nodes of the current node
parent 	Selects the parent of the current node
preceding 	Selects everything in the document that is before the start tag of the current node
preceding-sibling 	Selects all siblings before the current node
self 	Selects the current node
*/

function Woems(obj, base)
{
  switch (typeof obj)
  {
    case "string": 
      var i, arr = [], xpr = document.evaluate(obj, base || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
      this.obj=arr;
      break;
    default:
      this.obj=[ obj ];
      break;
  }
  this.style=function (Name,Value) {
    this.obj.forEach(function (f) { f.style[Name]=Value; });
    return this;
  }
  this.color=function (c) {
    //this.obj.forEach(function (f) { GM_log(f+"|"+f.style.color); f.style.color=c });
    this.style("color",c);
    return this;
  }
  this.bgcolor=function (c) {
    //this.obj.forEach(function (f) { GM_log(f+"|"+f.style.color); f.style.color=c });
    this.style("backgroundColor",c);
    return this;
  }
  this.html=function (trenner) {
    return this.obj.map(function (f) { return f.innerHTML }).join(trenner||" ");
  }
  this.text=function (trenner) {
    return this.obj.map(function (f) { return f.textContent }).join(trenner||" ");
  }
  this.value=function (trenner) {
    return this.obj.map(function (f) { return f.value }).join(trenner||" ");
  }
  this.click=function (func) {
    this.obj.forEach(function (f) {
      f.addEventListener("click",function(event){
        if (!func(event.target,event)) {
          event.stopPropagation();
          event.preventDefault();
        }
      }, true);
    });
    return this;
  }
  this.if=function (key,value)
  {
    this.obj=this.obj.filter(function (e) { return e[key]==value; });
    return this;
  }
  this.filter=function (f)
  {
    this.obj=this.obj.filter(f);
    return this;
  }
  this.log=function ()
  {
    GM_log("\nAnzahl Objekte: "+this.obj.length+"\n"+this.obj.map(function (f,i) { return i+". "+f.textContent }).join("\n"));
    return this;
  }
  this.parent=function ()
  {
    this.obj=this.obj.map(function (f) { return f.parentNode; });
    return this;
  }
}

function $1(obj)
{
  return new Woems(obj);
}

//GM_log("Test1: "+$1("//a"));
//GM_log("Test2: "+uneval($1("//a")));
//GM_log("Test3: "+$1("//a").css("test"));
//$1("//a").style("backgroundColor","green")
//GM_log("Test4: "+$1("//a").color("red").bgcolor("blue").html("\n"));
function green(e)
{
  if (e.parentNode.style.backgroundColor=="black" || e.style.backgroundColor=="black")
    $1(e).bgcolor("").parent().bgcolor("");
  else
    $1(e).bgcolor("black").parent().bgcolor("");
  return false; 
}
//$1("//a").click(green).bgcolor("black");






if (!$("wWindows")) createElement("div",{ id:"wWindows" },document.body); // Beinhaltet alle Fenster
css(".wOuterWindow { border:        3px solid black; background-color:#EEEEEE; z-index:999; }");
css(".wTitelWindow { border-bottom: 3px solid black; padding:2px; text-align:center; background-color:lightgray; cursor:move; }");
css(".wInnerWindow { padding:6px; }");

function simpleWindow(t,l,w,h,titel,text,onClose,fixed)
{
  var outerWindow=createElement("div",{ className:"wOuterWindow", style:"position:"+(fixed?"fixed":"absolute")+"; top:"+t+"px; left:"+l+"px; min-width:"+w+"px; min-height:"+h+"px;" },$("wWindows")); //
  on('DOMNodeInserted',outerWindow,function (e) { 
    $x("//input[@type='button']",e.relatedNode).forEach(function (g){
      on('click',g,function (h) { if (onClose(h.target.name, outerWindow, innerWindow, h)) outerWindow.style.display='none'; });
    });
  });
  var titel=createElement("div",{ className:"wTitelWindow", textContent:titel },outerWindow);
  var innerWindow=createElement("form",{ className:"wInnerWindow", innerHTML:text },outerWindow);
  on("submit",innerWindow,function (e) { /*outerWindow.style.display="none";*/ onClose(e.type, outerWindow, innerWindow, e); e.stopPropagation(); e.preventDefault(); });
  return outerWindow;
}
var text=
        //form("https://it-service.intra.aa/it-service/index.pl?","testform",
        "<table border=1>"+
        HTML.row(['IT-Service',HTML.link('https://it-service.intra.aa')])+
        HTML.row(['Webmin',HTML.link('https://www.intra.aa:10000')])+
        HTML.row(['Nagios',HTML.link('https://mgmt09.intra.aa/cms/index.php?id=91&no_cache=1')])+
        //HTML.row(["Inputfeld:",input("password","pwd","Test")])+
        HTML.row(["TicketID:",HTML.input("text","TicketID","268216")])+
        HTML.row(["Ort:",HTML.dropdownbox("Action",["AgentZoom","AgentQueueView"])])+
        "</table>"+HTML.divright(HTML.button("ok","OK")+" "+HTML.button("cancel","abbrechen")+" "+HTML.button("save","Anwenden"));

//var w1=simpleWindow(100,50,500,100,"Test2",text,function (button, outW, inW, e) { if (button=='cancel') return true; alert(button+"\n"+outW+"\n"+inW+"\n"+e.target+"\n"+e.type+"\n"+e.currentTarget+"\n"+e.eventPhase+"\n"+e.bubbles+"\n"+e.cancelable+"\n"+e.timeStamp); if (button=='ok') return true; },true);
//GM_log("aaaa: "+document.forms.testform);
//on("submit",document.forms.testform,function (e) { alert(e.target); });


//document.body.innerHTML="<table border=1>"+row(["Test",123])+row([123,"Test2"])+"</table>"+div("Test");



/*  https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array
filter -  Creates a new array with all of the elements of this array for which the provided filtering function returns true.
forEach - Calls a function for each element in the array.
every - Returns true if every element in this array satisfies the provided testing function.
map - Creates a new array with the results of calling a provided function on every element in this array.
some - Returns true if at least one element in this array satisfies the provided testing function.
reduce - Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
reduceRight - Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value. 
*/

function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}


function isEmpty(o) {
    var i, v;
    if (typeOf(o) === 'object') {
        for (i in o) {
            v = o[i];
            if (v !== undefined && typeOf(v) !== 'function') {
                return false;
            }
        }
    }
    return true;
}

String.prototype.entityify = function () {
    return this.replace(/&/g, "&amp;").replace(/</g,
        "&lt;").replace(/>/g, "&gt;");
};

String.prototype.quote = function () {
    var c, i, l = this.length, o = '"';
    for (i = 0; i < l; i += 1) {
        c = this.charAt(i);
        if (c >= ' ') {
            if (c === '\\' || c === '"') {
                o += '\\';
            }
            o += c;
        } else {
            switch (c) {
            case '\b':
                o += '\\b';
                break;
            case '\f':
                o += '\\f';
                break;
            case '\n':
                o += '\\n';
                break;
            case '\r':
                o += '\\r';
                break;
            case '\t':
                o += '\\t';
                break;
            default:
                c = c.charCodeAt();
                o += '\\u00' + Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }
        }
    }
    return o + '"';
};

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}; 

//alert("lol{test}1233{{a}}".supplant({ a:"test" }).supplant({test:" " }).trim()+"++");


/*/
GM_log("hash: "+location.hash); // (Ankername innerhalb eines URI)                // 
GM_log("host: "+location.host); // (Domain-Name innerhalb eines URI)              // www.onlinetvrecorder.com
GM_log("hostname: "+location.hostname); // (Domain-Name innerhalb eines URI)      // www.onlinetvrecorder.com
GM_log("href: "+location.href); // (URI / Verweis zu URI)                         // http://www.onlinetvrecorder.com/index.php?aktion=newepgschedule
GM_log("pathname: "+location.pathname); // (Pfadname innerhalb eines URI)         // /index.php
GM_log("port: "+location.port); // (Portangabe innerhalb eines URI)               //
GM_log("protocol: "+location.protocol); // (Protokollangabe innerhalb eines URI)  // http:
GM_log("search: "+location.search); // (Parameter innerhalb eines URI)            // ?aktion=newepgschedule
/**/


function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}


//Example usage:
/*
   createEl({n: 'ol', a: {'@class': 'some_list', '@id': 'my_list'}, c: [
   {n: 'li', a: {textContent: 'first point'}, evl: {type: 'click', f: function() {alert('first point');}, bubble: true}},
   {n: 'li', a: {textContent: 'second point'}},
   {n: 'li', a: {textContent: 'third point'}}
   ]}, document.body);

<ol id="my_list" class="some_list">
  <li onClick="alert('first point');">first point</li>
  <li>second point</li>
  <li>third point</li>
</ol>
*/

function dump(obj)
{
  var variablen="";
  var objekte="";
  var functionen="";
  if (typeof obj!="object") return obj;
  for (i in obj)
    switch (typeof obj[i])
    {
      case "function":
        functionen+=""+obj[i]+"\n\n";
        break;
      case "object":
        var tmp="";
        try {
        for (j in obj[i])
          switch (typeof obj[i][j])
          {
           case "object":
              tmp+=j+": { ... },\n";
              break;
           case "function":
              tmp+=j+": function () { ... },\n";
              break;
           case "string":
              tmp+=j+": '"+obj[i][j]+"',\n";
              break;
           case "number":
           case "boolean":
              tmp+=j+": "+obj[i][j]+",\n";
              break;
           default: tmp+=j+": ...,\n";
          }
        } catch(e) { tmp="..."; };
        objekte+="var "+i+" = { "+tmp+" }\n\n";
        break;
      case "string":
        variablen+="var "+i+" = '"+obj[i]+"'\n\n";
        break;
      case "number":
      case "boolean":
        variablen+="var "+i+" = "+obj[i]+"\n\n";
        break;
      default:
        try {
          GM_log("Error: " +typeof obj[i]+" - "+obj[i]);
        } catch(e) {}
        break;
    }
  return variablen+objekte+functionen;
}

function copyToClipboard(text) { location.assign( "javascript:try { netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect'); } catch(e) { if (e.message.indexOf('UniversalXPConnect')) alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config'); else throw e; } const clipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);    clipboardHelper.copyString('"+text.replace("'",'"')+"'); void(0)" ); }

/*
unsafeWindow.pasteFromClipboard = function() {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    settings = clipboardHelper.getData();
    return settings;
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
*/
//copyToClipboard("2345");


