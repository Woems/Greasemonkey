// ==UserScript==
// @name           BilderGalerie
// @namespace      Woems
// @description    Nach drücken von STRG+ALT+Z (Gross Z) wird die Galerie aktiviert.
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
function WindowCenter(Obj) { window.scrollTo( 0, PosY(Obj) - ( window.innerHeight / 2 )); }
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
function isArray(obj) { return typeof obj == "object" && obj instanceof Array; }
function isObject(obj) { return typeof obj == "object" && !obj instanceof Array; }
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
  selectboxplus:function (height,name,lines, def) { var l=""; for (var i in lines) { l+="<option value='"+i+"'"+(def==i?" selected":"")+">"+lines[i]+"</option>" }; return '<select size="'+height+'" name="'+name+'">'+l+'</select>';},
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
  if (data.onCancelTimeout) { data.onCancel=data.onCancelTimeout; data.onTimeout=data.onCancelTimeout; }
  var style="padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center;";
  style+=" font:normal medium sans-serif; z-index:9999;"; // Schönheitskorrekturen
  if (data.fixed) style+=" position: fixed; top:0px; width: 100%;";
  if (data.top) style+=" position: absolute; top:0px; width: 100%;";
  data.box=insertBefore(createElement("form",{ id:data.id, innerHTML: data.text, style:data.style||style }),document.body);
    $x(".//*[@name]",data.box).forEach(function (e) { if (!data[e.name]) data[e.name]=e; });
  if (data.onOK) data.okbtn=createElement("input",{ type:"button", value:data.OK||"OK", style:"margin:0px 0px 0px 15px;", onClick:function () { data.onOK(data); remove($(data.id));  } }, data.box);
  if (data.onCancel) data.cancelbtn=createElement("input",{ type:"button", value:data.Cancel||"Cancel", style:"margin:0px 0px 0px 4px;", onClick:function () { data.onCancel(data); remove($(data.id));  } }, data.box);
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { data.onTimeout(data); remove($(data.id)); } },(data.Timeout||60)*1000);
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
// ** Infos **
// location.hash, host, hostname, href, pathname, port, protocol, search
/********************************/ 

// Font: doh (Sehr GroÃŸ) http://www.network-science.de/ascii/
// Font: roman (Mittel FETT) http://www.network-science.de/ascii/
// Font: big (GroÃŸ) http://www.network-science.de/ascii/
// Font: standard (Mittel) http://www.network-science.de/ascii/ -> BereichsÃ¼berschriften
// Font: rectangles (Klein) http://www.network-science.de/ascii/ -> FunktionsÃ¼berschriften

// =================================================================================================================== //
//  _  ___                          
// | |/ / |                         
// | ' /| | __ _ ___ ___  ___ _ __  
// |  < | |/ _` / __/ __|/ _ \ '_ \ 
// | . \| | (_| \__ \__ \  __/ | | |
// |_|\_\_|\__,_|___/___/\___|_| |_|
//                                                                                                           
// =================================================================================================================== //

//  _____         _     _           
// |   __|___ ___|_|___| |_ ___ ___ 
// |__   | . | -_| |  _|   | -_|  _|
// |_____|  _|___|_|___|_|_|___|_|  
//       |_|                        
function Speicher(Name)
{
  this.Name=Name;
  this.data={};
  this.time=0;
  this.a=false;
  this.auto = function (aktiv)
  {
    this.a=aktiv;
    return this;
  }
  this.load = function (force)
  {
    if (force || this.time < +new Date()-2000)
    {
      this.time=+new Date();
      this.data=eval(GM_getValue(this.Name, '({})'));
    }
    return this;
  }
  //this.load();
  this.save = function ()
  {
    GM_setValue(this.Name, uneval(this.data));
    return this;
  }
  // Standard-Funktionen
  this.get = function (key, def)
  {
    if (this.a) this.load();
    return this.data[key]||def;
  }
  this.set = function (key, val)
  {
    if (this.a) this.load(true);
    this.data[key]=val;
    if (this.a) this.save();
    return this;
  }
  this.type = function (key)
  {
    if (this.a) this.load();
    if (typeof this.data[key] == "object" && this.data[key] instanceof Array)
    {
      return 'array';
    } else {
      return typeof this.data[key];
    }
  }
  this.del = function (key)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] != "undefined") delete this.data[key];
    if (this.a) this.save();
    return this;
  }
  // Array-Funktionen
  this.last = function (key, def)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") this.data[key]=[];
    if (typeof this.data[key] != "object" || ! this.data[key] instanceof Array) this.data[key]=[ this.data[key] ];
    var out=this.data[key].pop() || def;
    if (this.a) his.save();
    return out;
  }
  this.first = function (key, def)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") this.data[key]=[];
    if (typeof this.data[key] != "object" || ! this.data[key] instanceof Array) this.data[key]=[ this.data[key] ];
    var out=this.data[key].shift() || def;
    if (this.a) this.save();
    return out;
  }
  this.insert = function (key, val)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") this.data[key]=[];
    if (typeof this.data[key] != "object" || ! this.data[key] instanceof Array) this.data[key]=[ tmp[key] ];
    this.data[key].unshift(val);
    if (this.a) this.save();
    return this;
  }
  this.add = function (key, val)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") this.data[key]=[];
    if (typeof this.data[key] != "object" || ! this.data[key] instanceof Array) this.data[key]=[ this.data[key] ];
    this.data[key].push(val);
    if (this.a) this.save();
    return this;
  }
  // Object-Funktionen
  this.setkey = function (key, k, v)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") this.data[key]={};
    if (typeof this.data[key] != "object" || this.data[key] instanceof Array) this.data[key]={ old:this.data[key] };
    this.data[key][k]=v;
    if (this.a) this.save();
    return this;
  }
  this.getkey = function (key, k, d)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") { this.data[key]={}; }
    if (typeof this.data[key] != "object" || this.data[key] instanceof Array) { this.data[key]={ old:this.data[key] }; }
    return this.data[key][k]||d;
  }
  this.togglekey = function (key, k)
  {
    if (this.a) this.load(true);
    if (typeof this.data[key] == "undefined") { this.data[key]={}; }
    if (typeof this.data[key] != "object" || this.data[key] instanceof Array) { this.data[key]={ old:this.data[key] }; }
    this.data[key][k]=!this.data[key][k];
    //return this.data[key][k];
    return this;
  }
  
  // Debug-Funktionen
  this.out = function (sep)
  {
    var ret="Speicher:"+(sep||"\n");
    if (this.a) this.load();
    for (t in this.data)
      if (typeof this.data[t] == "object" && this.data[t] instanceof Date)
        ret+=t+"("+typeof this.data[t]+"): "+this.data[t]+(sep||"\n");
      else
        ret+=t+"("+typeof this.data[t]+"): "+uneval(this.data[t])+(sep||"\n");
    return ret;
  }
  this.alert = function ()
  {
    alert(uneval(this.data));
    return this;
  }
}

//  _____         _     _           _____ _     _ 
// |   __|___ ___|_|___| |_ ___ ___|     | |_  |_|
// |__   | . | -_| |  _|   | -_|  _|  |  | . | | |
// |_____|  _|___|_|___|_|_|___|_| |_____|___|_| |
//       |_|                                 |___|
function SpeicherObj(Name, Key)
{
  this.Name=Name;
  this.Key=Key;
  this.data={};
  this.time=0;
  this.a=false;
  this.auto = function (aktiv)
  {
    this.a=aktiv;
    return this;
  }
  this.load = function (force)
  {
    if (force || this.time < +new Date()-2000)
    {
      this.time=+new Date();
      this.data=eval(GM_getValue(this.Name, '({})'));
    }
    return this;
  }
  //this.load();
  this.save = function ()
  {
    GM_setValue(this.Name, uneval(this.data));
    return this;
  }
  this.getAll = function ()
  {
    if (this.a) this.load();
    return this.data[this.Key];
  }
  this.setAll = function (val)
  {
    if (this.a) this.load(true);
    var old=this.data[this.Key];
    this.data[this.Key]=val;
    if (this.a) this.save();
    return old;
  }
  this.delAll = function ()
  {
    if (this.a) this.load(true);
    if (typeof this.data[this.Key] != "undefined") delete this.data[this.Key];
    if (this.a) this.save();
    return this;
  }

  this.id = function (k)
  {
    this.Key=k;
    return this;
  }
  this.obj = this.id;
  this.key = this.id;
  this.set = function (k, v)
  {
    if (this.a) this.load(true);
    if (typeof this.data[this.Key] == "undefined") this.data[this.Key]={};
    if (typeof this.data[this.Key] != "object" || this.data[this.Key] instanceof Array) this.data[this.Key]={ old:this.data[this.Key] };
    this.data[this.Key][k]=v;
    if (this.a) this.save();
    return this;
  }
  this.get = function (k, d)
  {
    if (this.a) this.load(true);
    if (typeof this.data[this.Key] == "undefined") { this.data[this.Key]={}; }
    if (typeof this.data[this.Key] != "object" || this.data[this.Key] instanceof Array) { this.data[this.Key]={ old:this.data[this.Key] };}
    return this.data[this.Key][k]||d;
  }

  this.out = function (sep)
  {
    var ret="Speicher:"+(sep||"\n");
    this.load();
    for (t in this.data)
      if (typeof this.data[t] == "object" && this.data[t] instanceof Date)
        ret+=t+"("+typeof this.data[t]+"): "+this.data[t]+(sep||"\n");
      else
        ret+=t+"("+typeof this.data[t]+"): "+uneval(this.data[t])+(sep||"\n");
    return ret;
  }
  this.alert = function ()
  {
    alert(uneval(this.data));
    return this;
  }
}


//  _____         _ _           _____             
// |_   _|___ ___| | |_ ___ ___| __  |___ ___ ___ 
//   | | | . | . | | . | .'|  _| __ -| .'|_ -| -_|
//   |_| |___|___|_|___|__,|_| |_____|__,|___|___|
// 
function ToolbarBase()
{
  /*if ( arguments.callee.instance )
    return arguments.callee.instance;
  arguments.callee.instance = this;*/

  this.initialize = function ()
  {
    this.items=$x(this.base).map(this.basemap);
    this.sel=0;
  }
  this.find = function (Name)
  {
    var len=this.items.length;
    for (var i=0; i<len; i++)
      if (this.items[i].textContent.indexOf(Name)!=-1)
        this.sel=i;
    return this;
  }
  this.last=function ()
  {
    this.sel=this.items.length-1;
    return this;
  }
  this.first=function ()
  {
    this.sel=0;
    return this;
  }
  this.plus=function (anz)
  {
    this.sel=Math.min(this.sel+anz,this.items.length-1);
    return this;
  }
  this.minus=function (anz)
  {
    this.sel=Math.max(this.sel-anz,0);
    return this;
  }
  this.hide=function (anz)
  {
    this.items[this.sel].elem.style.display="none";
    return this;
  }
  this.show=function (anz)
  {
    this.items[this.sel].elem.style.display="";
    return this;
  }
  this.after=function (data) // textContent, href/onClick
  {
    var n=this.create(data);
    insertAfter(n.elem, this.items[this.sel].elem);
    if (this.filler) insertAfter(this.filler(), this.items[this.sel].elem);
    this.sel=this.sel+1;
    this.items.splice(this.sel,0,n);
    return this;
  }
  this.before=function (data) // textContent, href/onClick
  {
    var n=this.create(data);
    insertBefore(n.elem, this.items[this.sel].elem);
    if (this.filler) insertBefore(this.filler(), this.items[this.sel].elem);
    this.items.splice(this.sel,0,n);
    return this;
  }
  this.elem = function ()
  {
    return this.items[this.sel];
  }
  this.debug = function ()
  {
    alert([
      this.sel,
      uneval(this.elem()),
      this.items.map(function (e,n) { return n+": "+uneval(e); }).join("\n")
    ].join("\n\n"));
    return this;
  }
  return this;
}


//  _____ _     _       _   _____             
// |_   _|_|___| |_ ___| |_|     |___ ___ _ _ 
//   | | | |  _| '_| -_|  _| | | | -_|   | | |
//   |_| |_|___|_,_|___|_| |_|_|_|___|_|_|___|
// 
/*
function TicketMenu()
{
  if ( arguments.callee.instance )
    return arguments.callee.instance;
  arguments.callee.instance = this;

  this.ToolbarBase=ToolbarBase;
  this.ToolbarBase();

  this.base="/html/body//a[@class='menuitem']";
  this.basemap=function (e) {
    var tmp={};
    tmp.elem=e;
    tmp.textContent=e.textContent||"";
    tmp.href=e.href||"";
    return tmp;
  };
  this.create=function (data)
  {
    var Button={};
    data.href=data.href||"#";
    data.className="menuitem";
    Button.elem=createElement('a', data);
    return Button;
  }
  this.filler=function () { return document.createTextNode(' - '); }
  this.change = function (data)
  {
    var i=this.items[this.sel];
    if (data.href) i.elem.href=data.href;
    if (data.textContent) i.elem.textContent=data.textContent;
    if (data.title) i.elem.title=data.title;
    if (data.target) i.elem.target=data.target;    
    if (data.onClick) i.elem.addEventListener('click', function (e) { data.onClick(e); e.stopPropagation(); e.preventDefault(); }, true);  
  }
  this.initialize();
}
*/


//  _____     _   _     _ _       
// |  _  |___| |_|_|_ _|_| |_ _ _ 
// |     |  _|  _| | | | |  _| | |
// |__|__|___|_| |_|\_/|_|_| |_  |
//                           |___|
//new Activity().timer(1000).add(function () { alert("activity"); });
function Activity()
{
  this.slowdown = 10000;
  this.lastrun = 0;
  this.afunc=[];
  this.timer = function (val)
  {
    this.slowdown=val;
    return this;
  }
  this.add = function (func)
  {
    this.afunc.push(func);
    return this;
  }
  this.run = function ()
  {
    if (this.lastrun < +new Date() - this.slowdown)
    {
      this.lastrun=+new Date();
      for (i in this.afunc)
        if (this.afunc.hasOwnProperty(i))
          this.afunc[i]();
    }
    return this;
  }
  that=this;
  //on(['mousemove','keypress'],window,function (e) { that.run(); }); 
  window.addEventListener('mousemove', function () { that.run(); }, false);
  window.addEventListener('keypress', function () { that.run(); }, false);
}

//  _____ ___     
// |     |  _|___ 
// |   --|  _| . |
// |_____|_| |_  |
//           |___|
function Cfg(Name, Default)
{
  this._Name=Name;
  this._Exclude=["_Name","_Default","_Exclude","_Config", "_Data","_Temp","get","set","_load","_save","_firstsync","sync","alert"];
  this._Default=Default;
  this._Temp={};
  this._load=function ()
  {
    this._Config=eval(GM_getValue('Config', '({})'));
    this._Data=this._Config[this._Name]||{};
    return this;
  }
  this._save=function ()
  {
    if (uneval(this._Data)=="({})")
      delete this._Config[this._Name];
    else
      this._Config[this._Name]=this._Data;
    GM_setValue('Config', uneval(this._Config));
    return this;
  }
  this._firstsync=function ()
  {
    this._load();
    for (i in this._Default)
        if (typeof this._Data[i]=="undefined")
          this._Temp[i]=this[i]=this._Default[i];
        else
          this[i]=this._Temp[i]=this._Data[i];
    for (i in this._Data)
      if (typeof this._Default[i]=="undefined")
      {
        delete this[i];
        delete this._Data[i];
        delete this._Temp[i];
      } else if (this._Data[i] == this._Default[i])
      {
        delete this._Data[i];
      }          
    //this.alert();
    this._save();
    return this;
  }
  this.sync=function ()
  {
    this._load();
    //this.alert();
    for (i in this)
      if (this._Exclude.indexOf(i)==-1)
        if (this[i] != (typeof this._Data[i]=="undefined"?this._Default[i]:this._Data[i]) )
          if (this[i] != this._Temp[i])
            if (this[i] == this._Default[i])
            { delete this._Data[i]; this._Temp[i] = this[i]; }
            else
            { this._Data[i] = this._Temp[i] = this[i]; }
          else
            this[i] = this._Temp[i] = (typeof this._Data[i]=="undefined"?this._Default[i]:this._Data[i]);
    for (i in this._Data)
      if (this[i] != (typeof this._Data[i]=="undefined"?this._Default[i]:this._Data[i]))
        if (this[i] != this._Temp[i])
          if (this[i] == this._Default[i])
          { delete this._Data[i]; this._Temp[i] = this[i]; }
          else
          { this._Data[i] = this._Temp[i] = this[i]; }
        else
          this[i] = this._Temp[i] = (typeof this._Data[i]=="undefined"?this._Default[i]:this._Data[i]);
    //this.alert();
    this._save();
    return this;
  }
  this.set=function (key, val)
  {
    this[key]=val;
    return this;
  }
  this.get=function (key)
  {
    return this[key];
  }
  this.alert=function ()
  {
    this._load();
    var tmp={};
    for (i in this)
      if (this._Exclude.indexOf(i)==-1)
        tmp[i]=this[i];
    alert("Default: "+uneval(this._Default)+"\n\nData: "+uneval(this._Data)+"\n\nTemp: "+uneval(this._Temp)+"\n\nNow: "+uneval(tmp));
    return this;
  }
  this._firstsync();
}



//  _____ _         _     _____                                   _   
// |  _  | |_ _ ___|_|___|     |___ ___ ___ ___ ___ _____ ___ ___| |_ 
// |   __| | | | . | |   | | | | .'|   | .'| . | -_|     | -_|   |  _|
// |__|  |_|___|_  |_|_|_|_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|  
//             |___|                       |___|                      
//var Plugin=new PluginManagement()
//Plugin.add(new Management());
//function Management()
//{
//  this.Aktiv = true;
//  this.Name = "Management";
//  this.Description = "Daten des Forums auswährten und für die anderen Plugins bereitstellen";
//}
function PluginManagement()
{
  this.plugins={};
  this.runs = [ { funcName: "Initialize" } ];
  this.add = function (obj)
  {
    if (!obj.Aktiv) return;
    if (!obj.Name) { alert("Keinen Namen angegeben\n\n"+uneval(obj)); return; }
    if (!obj.Description) { alert(obj.Name+": Keinen Beschreibung angegeben"); return; }
    obj.Plugins=this;
    //obj.Name=obj.Name||String(Math.random());
    this.plugins[obj.Name]=obj;
    if (!this[obj.Name]) this[obj.Name]=obj;
    for (r in this.runs) if (this.runs.hasOwnProperty(r))
      if (typeof this.runs[r].funcName == 'function')
        this.runs[r].funcName(obj);
      else if (typeof obj[this.runs[r].funcName] == 'function')
        obj[this.runs[r].funcName](this,this.runs[r].param);
    return this;
  }
  this.get = function (Name)
  {
    return this.plugins[Name];
  }
  this.run = function (funcName, data)
  {
     if (!funcName) funcName="All";
     if (typeof funcName!='object') funcName=[funcName];
     for (f in funcName) if (funcName.hasOwnProperty(f))
       if (typeof funcName[f]=="string" || typeof funcName[f]=="function")
         this.runs.push({ funcName:funcName[f], param:data });
     for (p in this.plugins)  
       for (f in funcName) if (funcName.hasOwnProperty(f))
         if (typeof funcName[f] == 'function')
           funcName[f](this.plugins[p]);
         else if (typeof this.plugins[p][funcName[f]] == 'function')
           this.plugins[p][funcName[f]](this, data);
    return this;
  }
  this.recive = function (funcName, data)
  {
     var tmp={};
     if (!funcName) funcName="All";
     if (typeof funcName=='string') funcName=[funcName];
     for (p in this.plugins)
       for (f in funcName) if (funcName.hasOwnProperty(f) && this.plugins[p][funcName[f]])
         if (typeof this.plugins[p][funcName[f]] == 'function')
           tmp[this.plugins[p].Name]=tmp[this.plugins[p].Name+"_"+funcName[f]]=this.plugins[p][funcName[f]](this, data);
         else
           tmp[this.plugins[p].Name]=tmp[this.plugins[p].Name+"_"+funcName[f]]=this.plugins[p][funcName[f]];
    return tmp;
  }
}

// =================================================================================================================== //
//  _____  _             _           
// |  __ \| |           (_)          
// | |__) | |_   _  __ _ _ _ __  ___ 
// |  ___/| | | | |/ _` | | '_ \/ __|
// | |    | | |_| | (_| | | | | \__ \
// |_|    |_|\__,_|\__, |_|_| |_|___/
//                  __/ |            
//                 |___/             
// =================================================================================================================== //


var Plugin=new PluginManagement()

Plugin.Sites=new Speicher('Sites');
Plugin.Host=location.host.replace(/(^www\.|(\.d)e$|(\.c)om|(\.o)rg$)/g,'$2$3$4');
Plugin.Site=function () { return this.Sites.load().get(this.Host, {}); }

Plugin.add(new Management());
function Management()
{
  this.Aktiv = true;
  this.Name = "Management";
  this.Description = "Daten des Forums auswährten und für die anderen Plugins bereitstellen";
  this.Initialize = function (Plugin)
  {
    if (inFrame()) return;
    // Lade Daten der Seite
    var s=Plugin.Sites.load().get(Plugin.Host, {});
    // Default?
    if (Plugin.Sites.load().getkey("Default", "Porn") && !s.Porn)
      if (confirm("Ist diese Seite Porn?"))
      {
        Plugin.Sites.setkey(Plugin.Host, "Porn", true).save();
        s.Porn=true
      } else {
        Plugin.Sites.setkey("Default", "Porn", false).save();
      }
    // Ueberpruefe ob Porn
    if (s.Porn)
    {
      Plugin.run("Porn", s);
      window.addEventListener("load",function () { Plugin.run("PornReady", s); }, true);
    } else {
      Plugin.run("Unbekannt", s);
    }
    // Tastenkombi
    Key('STRG+ALT+T',function (e) { // Taste zum aktivieren
      var s=Plugin.Sites.load().togglekey("Default", "Porn").togglekey(Plugin.Host, "Porn").save().get(Plugin.Host, {});
      if (s.Porn)
        Plugin.run("Porn", s);
      else
        Plugin.run("NoPorn", s);
    });
  }
}

Plugin.add(new Menu());
function Menu()
{
  this.Aktiv = true;
  this.Name = "Menu";
  this.Description = "Menu";
  this.Initialize = function (Plugin)
  {
    css(
      "#BilderGalerie_Menu { position: fixed; right:0px; bottom:0px; background-color:gray; border: 1px solid black; margin:1px; padding:0px; }"+
      "#BilderGalerie_Menu h1 { font-size:medium; color:black; text-decoration:none; padding:6px; margin:4px }"+
      "#BilderGalerie_Menu a { font-size:small; display:block; border: 1px solid white; background-color:lightgray; color:black; text-decoration:none; padding:6px; margin:4px }"
    );
  }
  this.Porn = function (Plugin, Site)
  {
    this.ShowMenu();
    //alert([uneval(Plugin.recive("Button"))].join("\n"));  
  }
  this.NoPorn = function (Plugin, Site)
  {
    this.HideMenu();
  }
  
  this.ShowMenu = function ()
  {
    if (!this.Menu)
      this.Menu=createElement('div',{ id:'BilderGalerie_Menu', innerHTML: "<h1>PornMenü (STRG+ALT+UMSCH+T)</h1>" }, document.body);
    this.Menu.style.display='block';
    Plugin.run("CreateButton", this);
  }
  this.Add = function (Text, Func)
  {
    if (!this.Menu) return;
    createElement('a',{ innerHTML:Text, href:'#', onClick:function (e) { Func();  e.stopPropagation(); e.preventDefault(); } }, this.Menu);
  }
  this.HideMenu = function ()
  {
    if (this.Menu) remove(this.Menu);
    this.Menu=false;
  }
}

Plugin.add(new HideTitle());
function HideTitle()
{
  this.Aktiv = true;
  this.Name = "HideTitle";
  this.Description = "Versteckt den Titel unter Titeln die er wärend der Benutzung des Browsers lernt.";
  this.Button="Test";
  this.TitleList = ["Google", "Maps", "Wiki", "..."]
  this.LernedTitle = new Speicher('Title');
  this.Inititalize = function (Plugin)
  {
    this.Title=document.title;
  }
  this.Porn = function (Plugin, Site)
  {
    this.TitleList = ObjKeys(this.LernedTitle.load().del(document.title).save().data);
    this.Title=document.title;
    rand=0;
    for (var i=0; i<Math.min(this.Title.length, 8); i++)
      rand+=this.Title.charCodeAt(i);
    //alert([document.title[0], document.title.charCodeAt(0), rand%this.TitleList.length].join("\n")); 
    //document.title=arrayRand(this.TitleList);
    document.title=this.TitleList[rand%this.TitleList.length];
  }
  this.NoPorn = function (Plugin, Site)
  {
    document.title=this.Title;
  }
  this.Unbekannt = function (Plugin, Site)
  {
    this.LernedTitle.set(document.title, this.LernedTitle.load().get(document.title,0)+1 ).save();
    //alert(uneval(this.LernedTitle.data));
    //alert([uneval(ObjKeys(this.LernedTitle.data))].join("\n"));
  }
  this.CreateButton = function (Plugin, Menu)
  {
    that=this;
    Menu.Add('Titel löschen',function () {
      that.LernedTitle.load().del(document.title).save();
      alert("Titel gelöscht");
    });
  }
}

Plugin.add(new AutoScroll());
function AutoScroll()
{
  this.Aktiv = true;
  this.Name = "AutoScroll";
  this.Description = "AutoScroll";
  this.Porn = this.PornReady = function (Plugin, Site)
  {
    //window.addEventListener("load",this.ScrollToPicture, true);
    this.ScrollToPicture();
  }
  this.ScrollToPicture = function ()
  {
    var img=$x("//img");
    var PictureResized=false;
    for (i in img) if (img[i].width*img[i].height > 800*200)
    {
      img[i].scrollIntoView();
      PictureResized=true;
      //document.title="."+document.title;
      break;
    }
    //if (!PictureResized) document.title="# "+document.title;
    var sortedimg=img.filter(function (e) { return e.width*e.height > 100*100; }).sort(function (a,b) { return b.width*b.height-a.width*a.height; });
    //GM_log(sortedimg.map(function (e) { return [e.width, e.height, e.width*e.height, e.src].join(" "); }).join("\n"));

    //GM_log(["ScrollToPicture",sortedimg[0].width, sortedimg[0].height, sortedimg[0].width*sortedimg[0].height].join("\n"));
    //if (sortedimg[0].width*sortedimg[0].height > 640*480) sortedimg[0].scrollIntoView();
  }
}

Plugin.add(new ImageResize());
function ImageResize()
{
  this.Aktiv = true;
  this.Name = "ImageResize";
  this.Description = "Verkleinert Große Bilder auf Fenstergröße";
  this.Porn = this.PornReady = function (Plugin, Site)
  {
    $x('//img').forEach(function (img) {
      var teilerH=1;
      var teilerH=Math.min(img.height,window.innerHeight) / img.height;
      var teilerW=Math.min(img.width,window.innerWidth) / img.width;
      var teilerH=(img.height||1) / window.innerHeight;
      var teilerW=(img.width||1) / window.innerWidth;
      teiler=Math.max(teilerH,teilerW);
      //alert([window.innerHeight, window.innerWidth, '--', img.height, img.width, '--', teilerH, teilerW, teiler, '--', img.height/teiler, img.width/teiler].join("\n"));
      if (teiler > 1 ) {
        img.style.height=img.height/teiler+'px';
        img.style.width=img.width/teiler+'px';
        //img.height=img.height*Math.min(teilerH,teilerW);
        img.scrollIntoView();
      }
    });
  }
}




/**
	@name galerieAnzeigen
	@function
	@description Zeigt die Galerie an
*/
function galerieAnzeigen () {
  var data=deserialize('galerie',{})[location.host];
  if ($x(data.bilder) && $x(data.bilder).filter(function (img) { return img.width>data.minwidth && img.height>data.minheight; }).length>0)
  {
    var imgurls=$x(data.bilder).filter(function (img) { return img.width>data.minwidth && img.height>data.minheight; }).map(function (img) { return '<img src="'+img.src+'">'; });
    createElement("div",{
      id:'wBilderGalerie',
      style:'text-align:center; position:fixed; top:20px; left:20px; height:'+(window.innerHeight-60)+'px; width:'+(window.innerWidth-80)+'px; background-color:white; border:2px solid gray; padding:10px; overflow:scroll;',
      innerHTML:imgurls.join(''),
      onClick:function (t,e) { $('wBilderGalerie').style.display='none'; },
    }, document.body);
    window.addEventListener("resize",function(event){
      $('wBilderGalerie').style.width=(window.innerWidth-80)+'px';
      $('wBilderGalerie').style.height=(window.innerHeight-60)+'px';
    }, true);
    //$('wBilderGalerie').innerHTML=imgurls.join('');
  }
  //serialize('galerie',galerie);
  
} // End galerieAnzeigen
