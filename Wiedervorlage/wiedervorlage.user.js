// ==UserScript==
// @name           Wiedervorlage
// @namespace      Woems
// @description    Seite auf wiedervorlage legen
// @include        *
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
function createHTMLCode(elem, attributes,content)
{
  var param="";
  if (attributes) for (var attr in attributes) if (attributes.hasOwnProperty(attr))
    //  if (attr.indexOf("on")==0) node.addEventListener(attr.substr(2).toLowerCase(),function(event){ if (attributes[attr](event.target,event)) { event.stopPropagation(); event.preventDefault(); } }, true); else
    // if (['style'].indexOf(attr)!=-1) node.setAttribute(attr, attributes[attr]); else
    // if (attr=="append") node.appendChild(attributes[attr]); else
    if (attr=="childs") { for (var child in attributes[attr]) if (attributes[attr].hasOwnProperty(child)) node.appendChild(attributes[attr][child]); } else
    if (typeof attributes[attr]=="string") param+=" "+attr+"='"+attributes[attr]+"'"; else param+=" "+attr+"="+attributes[attr];
  if (append) append.appendChild(node);  
  return "<"+elem+param+">"+(content||"")+"</"+elem+">";
}
var HTML={
  div: function (text) { return '<div>'+text+'</div>'; },
  row: function (cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; },
  table: function (rows) { return '<table>' + rows.join('') +'</table>'; },
  elem: function (name,param,inhalt) { return '<'+name+(param?' '+param.join(" "):"")+'>'+(inhalt||'')+'</'+name+'>'; },
  br: function () { return '<br>'; },
  divright: function (content) { return '<div style="text-align:right;">'+(content||"")+'</div>'; },
  form: function (uri,name,content,get) { return '<form action="'+uri+'" name="'+name+'" method="'+(get?'get':'post')+'">'+(content||"")+'</form>'; },
  input: function (type,name,value,content,size) { return '<input type="'+type+'" name="'+(name||"")+'" value="'+(value||"")+'" size="'+(size||20)+'">'+(content||"")+'</input>'; },
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

globaleTasten();
window.setTimeout(function () { wvNow(); }, 10*1000);
//wvShow();

function globaleTasten () {
  Key('STRG+ALT+y',function (e) { // Taste zum aktivieren
    wvShow();
  });
  /*
  Key('STRG+ALT+x',function (e) { // Taste zum aktivieren
    wvAdd('http://www.kinopolis.de/bn/programm_wochenansicht', 'Kinopolis', 'weekly on do');

    wvAdd('http://www.google.com/calendar/render', 'Google Kalender', 'weekly');

    wvAdd('http://www.google.com/reader/view/', 'Google Reader', 'daily');
    wvAdd('http://vs-bn.de/', 'VideoStore Bonn', 'daily');
    wvAdd('http://www.elwis.de/gewaesserkunde/Wasserstaende/wasserstaendeUebersichtGrafik.html.php?pegelId=b45359df-c020-4314-adb1-d1921db642da', 'Elwis', 'daily');
    
    wvAdd('http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=40122', 'H0-Modellbahnforum - Anlagenbau', 'hourly');
  });
  */
/*  Key('STRG+ALT+y',function (e) { // Taste zum aktivieren
    var webseiten=deserialize('webseiten',[]);
    webseiten.push({ url: location.href, host: location.host, titel:document.title });
    alert("'"+document.title+"'\nzur Wiedervorlage hinzugefügt...\nSTRG+ALT+x zum abrufen der "+webseiten.length+" Seiten.");
    serialize('webseiten',webseiten);
  });
  Key('STRG+ALT+x',function (e) { // Taste zum aktivieren
    var webseiten=deserialize('webseiten',[]);
    if (webseiten.length==0) alert("Keine Seiten mehr gespeichert");
    var w=webseiten.pop();
    location.href=w.url;
    serialize('webseiten',webseiten);
  });
  $x("//a[@href]").forEach(function (a) { a.addEventListener("mousedown",function(event){
    var e=event.target;
    while (!e || !e.href) e=e.parentNode;
    //GM_log("Target: "+e+"\nEvent: "+event+"\nCTRL: "+event.ctrlKey+"\nALT: "+event.altKey);
    if (event.ctrlKey && event.altKey)
    {
      var webseiten=deserialize('webseiten',[]);
      webseiten.push({ url: event.target.href, host: "", titel:event.target.textContent });
      alert("'"+event.target.textContent+"'\nzur Wiedervorlage hinzugefügt...\nSTRG+ALT+x zum abrufen der "+webseiten.length+" Seiten.");
      serialize('webseiten',webseiten);    
      event.stopPropagation(); event.preventDefault();
    }
  }, true); });*/
} // End globaleTasten


function wvAdd(Url, Titel, Wiederhohlung)
{
  Url=prompt("URL:",Url);
  if (!Url) return;
  var exist=deserialize('WV',[]).filter(function (e) { return e.url==Url; });
  Titel=prompt("Titel:",Titel||(exist.length > 0?exist[0].t:''));
  if (!Titel) return;
  Wiederhohlung=prompt("minut(e|ly), hour(ly), da(y|ily), week(ly) (on do|;4), month(ly), year(ly):",Wiederhohlung||(exist.length > 0?exist[0].wh:''));
  if (!Wiederhohlung) return;
  wvDel(Url)
  var WV=deserialize('WV',[]);
  WV.push({ url:Url, t:Titel, wh:Wiederhohlung, last:new Date() });
  serialize('WV',WV);
  //wvShow();
} // End: function wvAdd()

function wvChange(Url)
{
  deserialize('WV',[]).forEach(function (wv) {
    if (wv.url==Url)
    {
      showmsg({
        url: Url,
        id: "default_msg_{rand}",
        text: ["Url: "+HTML.input("text","wUrl",wv.url,"",80),
               "Titel: "+HTML.input("text","wTitel",wv.t),
               "Wiederhohlung: "+HTML.input("text","wWh",wv.wh),
               "Last: "+wv.last, ""].join("<br>"),
        color: "lightgray",
        OK: "Ok",
        Cancel: "Cancel",
        onOK: function (data) {
          var WV=deserialize('WV',[]);
          WV=WV.map(function (f) { if (f.url==data.url) { f.url=data.wUrl.value; f.t=data.wTitel.value; f.wh=data.wWh.value; }; return f; });
          serialize('WV',WV);
          //alert([data.url,data.wUrl.value,data.wTitel.value,data.wWh.value].join("\n\n"));
        },
        onCancel: function (data) {},
      });
    }
  });
}

function wvDel(Url)
{
  var WV=deserialize('WV',[]);
  WV=WV.filter(function (e) { return e.url!=Url; });
  serialize('WV',WV);
  //wvShow();
} // End: function wvDel()

function wvCheck(Url) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) f.last=new Date(); return f; });
  serialize('WV',WV);
} // End: function wvOpen()

function wvUrlRotate(Url) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) { var u=f.url.split(","); var fu=u.shift(); u.push(fu); /*alert("-> "+f.url+"\n-> "+u.join(","));*/ f.url=u.join(","); } return f; });
  serialize('WV',WV);
  
} // End: function wvUrlRotate()

function Rand(min, max) { return Math.floor(min+Math.random()*(max-min)); }

function wvAufschieben(Url,sec) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) f.aufschieben=new Date(new Date().getTime()+(sec||30)*60*1000); return f; });
  serialize('WV',WV);
} // End: function wvOpen()

function wvNow() {
  var Z={ minute: 60*1000, hour:60*60*1000, day: 20*60*60*1000, week: 7*24*60*60*1000, month:30*24*60*60*1000, year:365*24*60*60*1000 };
  var F={ minutly: 'getMinutes', hourly:'getHours', daily:'getDate', monthly:'getMonth', yearly:'getFullYear' }
  var WV=deserialize('WV',[]);
  WV=WV.map(function (wv) {
    var now=new Date();
    //GM_log([uneval(wv), "Aufschieben: "+(wv.aufschieben-now.getTime()), "Wiederhohlung: "+wv.wh].join("\n"));
    if ((!wv.aufschieben || wv.aufschieben < now.getTime()) &&
       (!wv.last
       || (Z[wv.wh] && wv.last.getTime()+Z[wv.wh] < now.getTime())
       || (F[wv.wh] && wv.last[F[wv.wh]]() != now[F[wv.wh]]())
       //|| (wv.wh=='minutly' && wv.last.getMinutes() != now.getMinutes())
       //|| (wv.wh=='hourly' && wv.last.getHours() != now.getHours())
       //|| (wv.wh=='daily' && wv.last.getDate() != now.getDate())
       //|| (wv.wh=='monthly' && wv.last.getMonth() != now.getMonth())
       //|| (wv.wh=='yearly' && wv.last.getFullYear() != now.getFullYear())
       || (wv.wh.split(";")[0]=='weekly' && wv.last.getTime()+(((wv.wh.split(";")[1]||0)+6-wv.last.getDay())%7+1)*24*60*60*1000 < now.getTime()) // Tag + (6 - Wochentag) = Montag
       || (wv.wh=='weekly on do' && wv.last.getTime()+((10-wv.last.getDay())%7+1)*24*60*60*1000 < now.getTime()) // Tag + (4+6 - Wochentag) = Donnerstag
       ))
    {
      //translate={ minutly:"minute", hourly:"hour", daily:"day", monthly:"month", yearly: "year" }
      //var r=Math.round((new Date().getTime() - wv.last.getTime() - (Z[wv.wh]||Z[translate[wv.wh]]||0) )/60000);
      /*
      var r=Rand(2,12)*10;
      var rand=deserialize('rand',{});
      var v=1;
      if (!rand["v"] && rand["v"]!=v) rand={ 10:0, 20:0, 30:0, 40:0, 50:0, 60:0, 70:0, 80:0, 90:0, 100:0, 110:0, 120:0, v:v };
      rand[r]=(rand[r]||0)+1;
      serialize('rand',rand);
      GM_log("Random Verteilung: "+uneval(rand));
      */
      //var r=Rand(10,60);
      //alert("URL: "+uneval(wv.url.split(","))+"\nLength:"+wv.url.split(",").length);
      //var urls=wv.url.split(","); firsturl=urls.shift(); urls.push(firsturl); wv.url=urls.join(",");
      //GM_delete('rand');
      //var r=deserialize('waittime',{})['timer']||5;
      var r=20;
      showmsg({
          id:'WV_oeffnen', // _{rand}
          text:'<p><a target="_blank" title="'+wv.wh+' / '+wv.last+'" href="'+wv.url.split(",")[0]+'">'+wv.t+'</a> öffnen?</p>',
          fixed: true,
          url: wv.url,
          sec:r, 
          color:'red',
          OK:'OK',
          onOK:function (e) { wvCheck(e.url); wvUrlRotate(e.url); $xs(".//a",e.box).click(); },//GM_openInTab(e.url); },
          Cancel:'Aufschieben um '+r+'min',
          onCancel:function (e) { 
            //var waittime=deserialize('waittime',{});
            //if (!waittime['day'] || waittime['day']!=now.getDate())
            //  waittime={ day:now.getDate(), timer:5 };
            //waittime['timer']=waittime['timer']+5;
            //serialize('waittime',waittime);
            wvAufschieben(e.url, prompt("Wartezeit in min:",e.sec)); },
          Timeout:30,
          onTimeout:function (e) { },
      });
      //wv.last=new Date(); window.setTimeout(function () { GM_openInTab(wv.url); }, 10*1000);
    }
    return wv;
  });
  serialize('WV',WV);  
} // End: function wvNow()

function markdiff(out, orig)
{
  var tmp=['','',''];
  for (var i=0; i<out.length; i++)
  {
    if ('0123456789'.indexOf(out[i])!=-1)
    {
      tmp[1]+=out[i];
      tmp[2]+=orig[i];
    } else {
      tmp[0]+=(tmp[1]==tmp[2] ? tmp[1] : '<b>'+tmp[1]+'</b>')+out[i];
      tmp[1]='';
      tmp[2]='';
    }
  }
  tmp[0]+=(tmp[1]==tmp[2] ? tmp[1] : '<b>'+tmp[1]+'</b>');
  return tmp[0].replace(/<\/b><b>/g,'');
}

function wvShow()
{
  var WV=deserialize('WV',[]);
  WV.sort(function (a,b) { return a.last-b.last; }).forEach(function (wv) {
    var now=new Date();
    var laststr=wv.last.toLocaleDateString()+' '+wv.last.toLocaleTimeString();
    var nowstr=now.toLocaleDateString()+' '+now.toLocaleTimeString();
    aufs=Math.round((wv.aufschieben-new Date().getTime())/1000/60);
    showmsg({
      id:'WV_anzeigen_{rand}',
      text:'<a href="'+wv.url+'">'+wv.t+'</a>: <b>'+wv.wh+'</b> / '+markdiff(laststr,nowstr)+(aufs>0?' / <b><u>noch '+aufs+' min</u></b>':''),
      color:'lightgray',
      OK: 'Bearbeiten',
      onOK:function (e) { wvChange(wv.url); },
      Cancel: 'löschen',
      onCancel:function (e) { wvDel(wv.url); },
      Timeout:30,
      onTimeout:function (e) {},
    });
  });
    showmsg({
      id:'WV_anzeigen',
      text:'Neuen Eintrag hinzufügen?',
      color:'lightgray',
      OK: 'Ja',
      onOK:function (e) { wvAdd(); },
      Cancel: 'Nein',
      onCancel:function (e) {},
      Timeout:30,
      onTimeout:function (e) {},
    });
}
