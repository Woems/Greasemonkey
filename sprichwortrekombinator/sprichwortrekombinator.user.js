// ==UserScript==
// @name           Sprichwortrekombinator
// @namespace      Woems
// @include        http://sprichwortrekombinator.de/*
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
    if (attr.indexOf("on")==0) node.addEventListener(attr.substr(2).toLowerCase(), attributes[attr], true)
    else if (attr=="append") node.appendChild(attributes[attr])
    else if(attr=="childs" && (childs=attributes[attr])) for(var i=0; i<childs.length; i++) node.appendChild(childs[i]);
    else try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
// var test=createElement("div",{ innerHTML:"LOL", textContent:"123", onClick: function () { alert("test"); },  append:createElement("span",{ innerHTML:"Text"}) }, document.body);
function Text(t) { return document.createTextNode(t); }
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
function onkey(func) { on('keydown',window,function (e) { var key=(e.shiftKey?'SHIFT+':'') + (e.ctrlKey?'CTRL+':'') + (e.altKey?'ALT+':'') + (e.metaKey?'META+':'') + e.keyCode; if (func(key, e)) { e.stopPropagation(); e.preventDefault(); } }); }
function onaccesskey(func,debug) { window.addEventListener('keydown',function (e) { if (!e.shiftKey || !e.altKey) return; var key=String.fromCharCode({222:50,0:51,191:55,55:54,57:56,48:57,61:48}[e.keyCode]||e.keyCode).toLowerCase(); var node=$xs("//*[@accesskey='"+key+"']"); if (debug) GM_log("\nKey: "+key+"\nCode: "+e.keyCode+"\nWhich: "+e.which+"\nNode: "+node.innerHTML); if (node && func(key,node,e)) { e.stopPropagation(); e.preventDefault(); }; }, false); }
function click(elm) { var evt = document.createEvent('MouseEvents'); evt.initEvent('click', true, true); elm.dispatchEvent(evt); } // geht nur bei "//input"
// ** Position **
function css(code) { GM_addStyle(code); }
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
// ** Parameter **
function urlParse(url) { var a = urlParse.a = urlParse.a || document.createElement('a'); a.href = url; return { scheme: /^[^:]+/.exec(a.protocol)[0], host: a.host, hostname: a.hostname, pathname: a.pathname, search: a.search, hash: a.hash }; } //alert(mdump(urlParse(location.href)));
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
// ** HTML-Code
function div(text) { return '<div>'+text+'</div>'; }
function row(cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; }
// ** REST **
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
  data.box=insertBefore(createElement("div",{ id:data.id, innerHTML: data.text, style:"z-index:999; padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center" }),document.body);
  if (data.onOK) data.okbtn=createElement("input",{ type:"button", value:data.OK||"OK", style:"margin:0px 0px 0px 15px;", onClick:function () { remove($(data.id)); data.onOK(data); } }, data.box);
  if (data.onCancel) data.cancelbtn=createElement("input",{ type:"button", value:data.Cancel||"Cancel", style:"margin:0px 0px 0px 4px;", onClick:function () { remove($(data.id)); data.onCancel(data); } }, data.box);
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
  return data;
} // id, text, color, OK, onOK, Cancel, onCancel, Timeout, onTimeout, onOKTimeout
 // ** Log **
//if(unsafeWindow.console) var GM_log = unsafeWindow.console.log; // Loggt in Firefox Console
//GM_log=function (){}
/********************************/

var StarGIF = 'data:image/gif;base64,' +
		'R0lGODlhHgBaAOYAAP////7+/uPNmfv7+/Ly8uLh4vf399vGmP39/fT09PHNRPb29qqKQ93GcuTYuvfm' +
		'p9rZ2fPt0vDw8M2nUfbRRti3Z8vKyuzk1dKrUvnlmenp6efeyfz8/N7d3tzLi/fZZuzJQsKdSqaFPejo' +
		'6Jp6OPfcdsmjTuLHi+7u7tjJptu7cujYmdy6PtXU1ezs7Obm5tHQ0PTmsvniiuTTrPjWVvn5+dOzO8Wo' +
		'OfLqyeTk5OTCQPbz7bSRQ+rTe+fUjenGQe7lw9S2RfHt4riVRtW9hL2mc+XRo76aSbCNQeTKaMq7mfr3' +
		'68WgTN7RtOnLV8PCw9WwW/DhqeziusuuRPz7/PHdjde3PdjLsfX19cetdMGtgvfz5N+9Pvr477yYR9vb' +
		'27Wea+Df4NjY2Ovr6+3t7erboefn5/j158+ycNO/k8e0jOfaquLBQOG/P/79+vrgffj28PXw3c+zScjH' +
		'yN7Df8+wOr6ujvHemeDPpraXU+PDT8ysYbqWR6qNTubYo+vfsCH5BAAAAAAALAAAAAAeAFoAAAf/gACC' +
		'g4QAAQgDNTUDHAGFj5CECDVYBgZYNQiRm4QBA1gJKCgECQOOnJsBNRI1MC0GKAaaqJEcWBIuc3MuEgSm' +
		'tI+eBAYtYsawssCFCAYEY2IvL2JjEgkcyoPCBjAvEhI5YgZkBhwIAafZhwgcA4nNzhBkCwtkHWMuZAQL' +
		'Bovl54gGFiQgtS8TjBGlBiQY8YXDJQIEelUaANAAxRpjwrSwYKGDLwSICGj4IgZCAReZBlhKNKCDhScW' +
		'WoTJMQJFghqNAnCoEWpEjg5fYMzpmIhSgjkwOmiQaICKOUGHqDyUoKGD0AQJLBK4BSOMPIrngh0aQC8M' +
		'DFIEcBro5UKMmY+c/0KaETNKXiOyveZqSEAFXaEAVBJogKCBgAssFA05rFbgy7hZj5jVe0GADGLIOtcS' +
		'+PLCWq0ELwo4W/CrEwfBBkRTiUSFQAEDb0svu+UijIQBkQZICDMGBRbIs12HIdAXJIdy5lqHEf271tYv' +
		'OXypxAJx4gACOSCAugbpOrEcEqiTMZMjh5l8t3K0qOErtwQEMApo0JDji2My9nPMN4vgNiRVEhhggRgk' +
		'DbfAfAsQEAaBYliwVg1+QdWMCzB1sAAWGvCCiwZYLODSEy4MEyEAzGDxQgcqmVEYPzU0o4EZFnXwwj7A' +
		'CTKJLxyMMUJ4YI11ywhjsJNWjYZM10tW/pxziP9DA4Vn0YhjtbgISIi0QxFI7kw5oiHqPIVIgltlYgiV' +
		'YSlzHTUSjOHLlsAEYICOW2zxggYLsEkLBwoS8Mcam91mZyoYFXDGCj7E0QGMf0aCABaiAXGHD2VI4BFu' +
		'2Aii2wtLRHFHFT3EEYYGBiSaji2U4RBFBpz6IMEXsTBSJlTsuEOdBKF1EcUDGchQQhIRQADBeb0s0I8n' +
		'E2owJy+l4PAArm+U4EQPa43xQg4F6MejZgtw4EYXW8SBQwwx4CrDGx848YMeSfjwRwRdfCJBLAlgEYEU' +
		'f0QB7r3L5lrCBxQoAIIObXBhhQ1yVIAHRCJ14UcZty6bb67k0kBBvyD82wb/C3VMEUdhWAA56B13ZCBy' +
		'ruN+IPHECqT8AxssyBHBCJ2tEsYIcfhQhQw4j7vvySj7+wMXNuDwQjzkiNPBCBH00EMJzX5g8sQ9g/BD' +
		'G1YAkd0YpB2yinw4JOH001BHrYMVfww9xpNjrnJoFE4oEHbPPrNQBjgukOOXmxq00IUOILydcsr/stAF' +
		'N9mOOMAYHUTQBghu99vv3ytbgYM9shFyeA5/LO424P5WHPkaL4xB6SM1jKCBD5r7/MMPOqweuQcuaFBD' +
		'JAZE10AbrrPBBQu8c8EGwFY0QMALBvyXQBgDBOE7y8FHEEEDNljBuxVy1FBAAiMioGAXdVgxsAdxkCFG' +
		'/wtkxEFHHTbUcUMXoo2I5ws43DCFB1s8I0YBBRjjwhYe3HDDBd3gjuUM4wAPLAEFrsiBTUKhHhhIYAce' +
		'cECIRjeI67wAE2JIyhhKgaUEIA4G4RheewqxmDFUa0U9AohIqEUNcgRDJQizCJashKV3DKNyUFkHDccC' +
		'JkyYo0qMeMp/XnUmb6ipNErChpvGoAEhCGFOdaoUIfA0nCZcIQFf8JMUDRGoHRwgDUI4VKi2uCjROCAF' +
		'B0iBpEZYqUvtAA8COAARhPCpMbZJJyYiwAbgKMcDoIBVFsmJadrRolmFZgczMIIATkAENFzAV8DSx7Bg' +
		'GLtjVWMAG0jkIumABiKsQv9a1LIWYrClrR3E4QIbcEAijXCCE6gADRMwQRbS0IQLwMFd8MLCBRzQhBn4' +
		'8pdGUOQJ6FABKMQyBEcYAg8Y0AcwKIE6IoFDClKAB2AqcpMqqAAGJnDMZC6zD0LgGJC8eAA4XrOVdMgm' +
		'FDCwTRMwIZlIYMAFfHKT3ZhBCGk4wAkWOcx0FpOdsWRCCLywzA0MbRwOqccILkAEItDhoSpQARTW2U4T' +
		'DHSZDrha1iYhAflsAA0RrcA/AWoCdyaTAVd4wRfO9gutScoMDtjDHiYK0Fi6MwR8QEIK6Ga3Thggb11g' +
		'wgTYuU2bCvQIy9wB4RrxiMN14AIhMAE3jXpUgopgA5TI29LlmnAEoZaUCUc9ghdyKoIUhI6ChCidBtLQ' +
		'1ZuK1QtDiCsPkCACNTBxdpCoHQGy4IUjIFOZSAisYBkgAjAMr3jBON4A8jAEPiiTAUVAZRFEQNnKUuF6' +
		'2VMQHBgQWAZo4QLiawEKLqAFEoiABCTYQfse8b4NiIABahCC/fBnjDEIobQkgAYBBFhBZzRBDXBAYAsU' +
		'iBUUNNAbdrjCBJs6vJtk0B4cRIQHrRIO0LBxECU84TCYqhgXsTBAvIUKDCGCtr+M94boCAQAOw==';


function SaveSprwrt(Sprichwort)
{
  var Skipt_Sprwrt=deserialize('Skipt_Sprwrt',[]);
  Skipt_Sprwrt.push(Sprichwort);
  serialize('Skipt_Sprwrt',Skipt_Sprwrt);
}
function LoadSprwrt()
{
  return deserialize('Skipt_Sprwrt',[]);
}
function RemoveSprwrt(Sprichwort)
{
  var Skipt_Sprwrt=deserialize('Skipt_Sprwrt',[]);
  Skipt_Sprwrt=Skipt_Sprwrt.filter(function (e) { return e!=Sprichwort; });
  serialize('Skipt_Sprwrt',Skipt_Sprwrt);  
}

var div_sprich=$xs('//div[@class="spwort"]');
var div_weiter=$xs('//div[@class="weiter"]');
var Sprichwort=div_sprich.textContent;

var sprichwoerter=deserialize('sprichwoerter',{});
LoadSprwrt().forEach(function (e) {
  showmsg({
    id:e,
    text:e,
    color:((sprichwoerter[e]["Schlecht"]>sprichwoerter[e]["Gut"])?'red':(sprichwoerter[e]["Gut"]>sprichwoerter[e]["Schlecht"])?'green':'lightgray'),
    OK:'Gut ('+sprichwoerter[e]["Gut"]+')',
    onOK:function (e) { RemoveSprwrt(e.id); var s=deserialize('sprichwoerter',{}); s[e.id]["Gut"]+=1; serialize('sprichwoerter',s); },
    Cancel:'Schlecht ('+sprichwoerter[e]["Schlecht"]+')',
    onCancel:function (e) { RemoveSprwrt(e.id); var s=deserialize('sprichwoerter',{}); s[e.id]["Schlecht"]+=1; serialize('sprichwoerter',s); },
  });
});
if (!sprichwoerter[Sprichwort]) sprichwoerter[Sprichwort]={ Anzahl:0, Gut:0, Schlecht:0 };
if (sprichwoerter[Sprichwort]["Schlecht"]>0) { div_sprich.style.color="red"; SaveSprwrt(Sprichwort); window.setTimeout(function () { location.reload(); },1000); } else
if (sprichwoerter[Sprichwort]["Gut"]>0) { div_sprich.style.color="darkgreen"; SaveSprwrt(Sprichwort); window.setTimeout(function () { location.reload(); },1000); } else
if (sprichwoerter[Sprichwort]["Anzahl"]>0) { div_sprich.style.color="blue"; SaveSprwrt(Sprichwort); window.setTimeout(function () { location.reload(); },1000); }
sprichwoerter[Sprichwort]["Anzahl"]+=1;
serialize('sprichwoerter',sprichwoerter);

//alert(uneval(sprichwoerter));
var div = createElement('div', { childs:[
  createElement('a', { style:'color:darkgreen', title:"Taste: a", textContent:'Gut ('+sprichwoerter[Sprichwort]["Gut"]+')', href:'.', onClick:function (e) {
    var s=deserialize('sprichwoerter',{}); s[Sprichwort]["Gut"]+=1; serialize('sprichwoerter',s);
  } }),
  //createElement('br'),
  Text(" "),
  createElement('a', { style:'color:red', title:"Taste: s", textContent:'Schlecht ('+sprichwoerter[Sprichwort]["Schlecht"]+')', href:'.', onClick:function (e) {
    var s=deserialize('sprichwoerter',{}); s[Sprichwort]["Schlecht"]+=1; serialize('sprichwoerter',s);
  } }),
] }, div_weiter);

// **** Top/Flop Sprüche ****
function Obj2Array(obj)
{
  var tmp=[];
  for (i in obj)
    tmp.push({ key:i, value:obj[i] });
  return tmp;
}
Timeout(function () {
  //var top=Obj2Array(sprichwoerter).reduce(function (a,b) { return a["value"]["Gut"]>b["value"]["Gut"]?a:b; });
  //var flop=Obj2Array(sprichwoerter).reduce(function (a,b) { return a["value"]["Schlecht"]>b["value"]["Schlecht"]?a:b; });
  var top=Obj2Array(sprichwoerter).sort(function (a,b) { return a["value"]["Gut"]<b["value"]["Gut"]; });
  var flop=Obj2Array(sprichwoerter).sort(function (a,b) { return a["value"]["Schlecht"]<b["value"]["Schlecht"]; });
  function SprichwortArrayOut(arr, anz)
  {
    var tmp=[];
    for (var i=0; i<anz; i++)
      tmp.push(arr[i].key+" ("+arr[i].value.Gut+"/"+arr[i].value.Schlecht+")");
    return tmp.join("<br>");
  }
  var top=showmsg({
    id:'top',
    text:"<b>Top:</b><br>"+SprichwortArrayOut(top, 8)+"<br>",
    color:'lightgray',
    onOK:function (e) {},
    //onOKTimeout:function (e) {},
    Timeout:120,
  });
  css(".StarBar { list-style:none; height: 30px; width:60px; background: url('"+StarGIF+"') top left repeat-x; border:1px solid black; }");
  css(".StarBar li { height: 30px; width:30px; float: left; border:1px solid black; }");
  css(".StarBar li:hover { background: url('"+StarGIF+"') center left repeat-x; }");
  createElement('ul', { className:"StarBar", childs:[
    createElement('li', { className:"1", href:"#", textContent:"T" }),
    createElement('li', { className:"2", href:"#", textContent:"A" }),
  ] }, top.box); 
  showmsg({
    id:'flop',
    text:"<b>Flop:</b><br>"+SprichwortArrayOut(flop, 2)+"<br>",
    color:'lightgray',
    //onOK:function (e) {},
    onOKTimeout:function (e) {},
    Timeout:30,
  });
},10000);

onkey(function (key, e) { 
  switch (key)
  {
    case '65': var s=deserialize('sprichwoerter',{}); s[Sprichwort]["Gut"]+=1; serialize('sprichwoerter',s); location.reload(); break;
    case '83': var s=deserialize('sprichwoerter',{}); s[Sprichwort]["Schlecht"]+=1; serialize('sprichwoerter',s); location.reload(); break;
    //default: GM_log(key);
  }
});
