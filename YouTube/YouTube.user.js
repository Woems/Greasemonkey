// ==UserScript==
// @name           YouTube
// @namespace      Woems
// @description    Youtube
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @grant          GM_openInTab
// @include        http://*youtube.com*
// @include        about:blank#YouTube*
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
function text(txt) { return document.createTextNode(txt); }
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
// ** Parameter **
function urlParse(url) { var a = urlParse.a = urlParse.a || document.createElement('a'); a.href = url; return { scheme: /^[^:]+/.exec(a.protocol)[0], host: a.host, hostname: a.hostname, pathname: a.pathname, search: a.search, hash: a.hash }; } //alert(mdump(urlParse(location.href)));
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key, def) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return ((key)?r[key]:r)||def; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
// alert([location.href, location.hash, location.host, location.hostname, location.pathname, location.port, location.protocol, location.search].join("\n"));
// ** HTML-Code
function div(text) { return '<div>'+text+'</div>'; }
function row(cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; }
// ** REST **
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
/********************************/

//GM_log([location.href, FrameBuster(), top.location.href].join("\n"));

if (FrameBuster())
{
  /*onKey(function (key, code, e) {
    switch(key)
    {
      case 'ALT+SHIFT+Z': alert("TEST"); break;
      default: GM_log(["",key, uneval(code), e].join("\n")); break;
    }
    return true;
  });*/
  var Kategorie=location.pathname.split("/")[1];
  var VideoID=getParam("v","");
  if (VideoID.length!=11 && VideoID.length!=0) alert("VideoID muss 11 Zeichen haben. Hat aber nur "+VideoID.length+". Hier die ID: "+VideoID);
  //GM_log("VideoID: "+VideoID);
  if (location.hash.indexOf("#YouTube")!=-1)
    CreateVideoGalerie();
  else if (VideoID!="" && VideoID.length==11)
    Video(VideoID);
  else if (Kategorie=="user" || Kategorie=="channel" || Kategorie=="results")
    Interval(UserGallerie,10000);
  else
    NextVideo();
} else {
  if (location.href.indexOf("GalerieAutoHide=true")!=-1)
  {
    GM_log(location.href);
    unsafeWindow.onYouTubePlayerReady = function (playerID)
    {
      alert(playerID);
      var player=document.getElementById("movie_player").wrappedJSObject;
      //player.addEventListener("onStateChange", function (e) { alert("State Changed: "+e); });
      var intervalID=window.setInterval(function () {
        GM_log("interval");
        if (player.getPlayerState()==0)
        {
          GM_log("Ende");
          //NextVideo();
          window.clearInterval(intervalID);
        }
      },1000);  
    }
  }
}


function ObjValues(obj) {
  var tmp=[];
  for (i in obj)
     tmp.push(obj[i]);
  return tmp;
}
function ObjKeys(obj) {
  var tmp=[];
  for (i in obj)
     tmp.push(i);
  return tmp;
}

function ShowDateDiff(sec, anz)
{
  var teile={ MSec:1000, Sec:60, Min:60, H:24, Tage:7, Wochen:99999 };
  var tmp=[];
  for (i in teile)
  {
    if (Math.floor(sec%teile[i])!=0) tmp.push(Math.floor(sec%teile[i])+' '+i);
    sec=sec/teile[i];
  }
  tmp=tmp.reverse();
  if (anz) tmp=tmp.slice(0,anz);
  return tmp.join(" ");
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////// Video GALERIE ///////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function CreateVideoGalerie()
{
  css("body { background-color:#222; color:white;  }");
  var Kategorien=deserialize('Kategorien',[]).sort();
  Kategorien.unshift("-- bitte auswählen --");
  //Kategorien.push("-- Eingeben --");
  /*/
  var SelectKat="<select name=Kategorie>"+
                Kategorien.map(function (e) { return "<option>"+e+"</option>" }).join("")+
                "</select>"
  var Video=deserialize("Video",[]);
  var showX=location.hash.indexOf('x')==8;
  var VideoData=ObjValues(Video)
                  .filter(function (e) { return !e.Kategorie && !e.qualitaet && (e.x==undefined || e.x==showX); })
                  .sort(function (a,b) { return a.lastseen-b.lastseen; })
  document.title="about:blank#"+VideoData.length;
  GM_setValue("GalerieAnz",GM_getValue("GalerieAnz",10));
  document.body.innerHTML=VideoData.slice(0,GM_getValue("GalerieAnz",10))
              .map(function (e,i) { return '<form style="float:left; padding-right:8px" id='+e.id+'>'+
                  '<iframe id="ytplayer" type="text/html" width="'+(window.innerWidth/2-30)+'" height="'+(window.innerHeight/2-90)+'" src="http://www.youtube.com/embed/'+e.id+'?rel=0&enablejsapi=1" frameborder="0"/></iframe><br>'+ // 640x390 640x480 
                  '<table><tr><td>ID: '+e.id+'<br>Kategorie: '+SelectKat+'</td>'+
                  '<td><input type=radio name=qualitaet value=gut>Gut<br>'+
                  '<input type=radio name=qualitaet value=schlecht>Schlecht<br>'+
                  '<input type=checkbox name=x>'+e.x+'</td>'+
                  '<td>'+(e.lastseen||new Date()).getShortDate()+' ('+(i+1)+')<br><a href=#'+7*24*60+' name='+e.id+'>+1 Woche</a> <a href=#'+24*60+' name='+e.id+'>+1 Tag</a> <a href="hide" name='+e.id+' style="display: none">Hide</a></td>'+
                  '</tr></table>'+
                  //uneval(e)+
                  "</form>"; }).join(" ");
  //alert(uneval(VideoArr.join("<br>")));
  $x("//a[contains(@href,'#')]").forEach(function (e) { e.addEventListener("click",function(event){
    var VideoID=event.target.name;
    var Plus=event.target.href.split('#')[1]*1;
    var Video=deserialize("Video",{});
    Video[VideoID].lastseen=new Date((Video[VideoID].lastseen||new Date()).getTime()+(Plus*60000));
    serialize("Video",Video);
    event.target.innerHTML="";    
    window.setTimeout(function () {
      event.target.href="#"+(Plus*10);
      //event.target.innerHTML="+"+(Plus*10)+" Min";
      event.target.innerHTML="+"+ShowDateDiff(Plus*10*60000);
    }, 10*1000);
    $x("//a[@name='"+VideoID+"'][@href='hide']").forEach(function (e) { e.style.display=""; });
    event.stopPropagation();
    event.preventDefault();
  }, true); });
  $x("//a[@href='hide']").forEach(function (e) { e.addEventListener("click",function(event){
    var VideoID=event.target.name;
    $(VideoID).style.display="none";
    remove($(VideoID));
    event.stopPropagation();
    event.preventDefault();
  }, true); });
  $x("//input | //select").forEach(function (e) { e.addEventListener("change",function(event){
    var VideoID=event.target.form.id;
    var Video=deserialize("Video",{});
    if (event.target.name!="x") Video[VideoID].lastseen=new Date();
    if (event.target.type=="checkbox")
      Video[VideoID][event.target.name]=event.target.checked;
    else
      Video[VideoID][event.target.name]=event.target.value;
    serialize("Video",Video);
    $x("//a[@name='"+VideoID+"'][contains(@href,'#')]").forEach(function (e) { e.style.display="none"; });
    $x("//a[@name='"+VideoID+"'][@href='hide']").forEach(function (e) { e.style.display=""; });
    if (event.target.name=="x") remove($(VideoID));
    //GM_log("Youtube: "+uneval(Video[VideoID]));
    event.stopPropagation();
    event.preventDefault();
  }, true); });
  document.body.scrollIntoView(true);
  window.setTimeout(function () {
    $x("//iframe").forEach(function (e) { GM_log(e.wrappedJSObject.getPlayerState()); });
  }, 10*1000);
  unsafeWindow.onYouTubePlayerReady = function (playerID)
  {
    alert(playerID);
    var player=document.getElementById("movie_player").wrappedJSObject;
    //player.addEventListener("onStateChange", function (e) { alert("State Changed: "+e); });
    var intervalID=window.setInterval(function () {
      //GM_log("interval");
      if (player.getPlayerState()==0)
      {
        //GM_log("Ende");
        NextVideo();
        window.clearInterval(intervalID);
      }
    },1000);
  }
  /*/
  function verzclick(target, event){
    var VideoID=event.target.name;
    var Plus=event.target.href.split('#')[1]*1;
    var Video=deserialize("Video",{});
    if (!Video[VideoID].lastseen) Video[VideoID].lastseen=new Date();
    Video[VideoID].lastseen=new Date(Video[VideoID].lastseen.getTime()+(Plus*60000));
    serialize("Video",Video);
    event.target.innerHTML="";
    /**/
    remove($(VideoID));    
    /*/
    window.setTimeout(function () {
      event.target.href="#"+(Plus*10);
      //event.target.innerHTML="+"+(Plus*10)+" Min";
      event.target.innerHTML="+"+ShowDateDiff(Plus*10*60000);
    }, 10*1000);
    /**/
    event.stopPropagation();
    event.preventDefault();
  }
  function hideclick(target, event){
    var VideoID=event.target.name;
    //$(VideoID).style.display="none";
    remove($(VideoID));
    event.stopPropagation();
    event.preventDefault();
  }
  function inputclick(target, event){
    var VideoID=event.target.form.id;
    var Video=deserialize("Video",{});
    if (event.target.name!="x" || !Video[VideoID].lastseen) Video[VideoID].lastseen=new Date();
    if (event.target.type=="checkbox")
      Video[VideoID][event.target.name]=event.target.checked;
    else
      Video[VideoID][event.target.name]=event.target.value;
    serialize("Video",Video);
    $x("//a[@name='"+VideoID+"'][contains(@href,'#')]").forEach(function (e) { e.style.display="none"; });
    if (event.target.name=="x") remove($(VideoID));
    //alert([event.target.form.id, event.target.type, event.target.name, event.target.value, event.target.checked].join("\n"));;
    //GM_log("Youtube: "+uneval(Video[VideoID]));
    event.stopPropagation();
    event.preventDefault();
  }
  var size=[window.innerWidth/2-30, window.innerHeight/2-90];
  Interval(function () { 
    var AktiveVideoIDs=$x("//form[@id]").map(function (e) { return e.id; });
    //alert(AktiveVideoIDs.join("\n"));
    if (AktiveVideoIDs.length>6) return;
    var Video=deserialize("Video",[]);
    var showX=location.hash.indexOf('x')==8;
    var VideoData=ObjValues(Video)
                  .filter(function (e) { return !e.lastseen || ((!e.Kategorie || !e.qualitaet) && (e.x==undefined || e.x==showX)); })
                  //.filter(function (e) { return !e.lastseen || (e.Kategorie=="Modelbahn Tutorial" && e.qualitaet && (e.x==undefined || e.x==showX)); })
                  .sort(function (a,b) { return (a.lastseen||0)-(b.lastseen||0); })
                  //.sort(function (){ return (Math.round(Math.random())-0.5); })
    document.title="about:blank#"+VideoData.length;
    VideoData.slice(0,6).forEach(function (e,i) {
      if (AktiveVideoIDs.indexOf(e.id)==-1)
      {
        var iframe=createElement('iframe',{ id:"ytplayer", type:"text/html", width:size[0], height:size[1], 
                src:'http://www.youtube.com/embed/'+e.id+'?rel=0&enablejsapi=1&GalerieAutoHide=true', frameBorder:0 });
        
        var select=createElement('select',{ name:"Kategorie", title:e.Kategorie, childs: Kategorien.map(function (kat) { var tmp=createElement('option',{ innerHTML:kat }); if (kat==e.Kategorie) tmp.selected=true; return tmp; }) });
        select.addEventListener("change",function(event){ 
          inputclick(event.target, event);
          event.stopPropagation();
          event.preventDefault();
        }, true);
        var td1=createElement('td',{ innerHTML:'ID: '+e.id+'<br>Kategorie: ', childs:[ select ] });
        
        var gut=createElement('input',{ type:'radio', name:'qualitaet', value:'gut', onChange:function (t, e) { inputclick(t,e); } });
        var schlecht=createElement('input',{ type:'radio', name:'qualitaet', value:'schlecht', onChange:function (t, e) { inputclick(t,e); } });
        if (e.qualitaet=='schlecht') schlecht.checked=true;
        if (e.qualitaet=='gut') gut.checked=true;
        var x=createElement('input',{ type:'checkbox', name:'x', onChange:function (t, e) { inputclick(t,e); }});
        var td2=createElement('td',{ childs:[ gut, text("Gut"), createElement('br'), schlecht, text("Schlecht"), createElement('br'), x, text({undefined:'?', true:'+', false:'-'}[e.x]||e.x) ] });
        
        var alter=text((e.lastseen||{ getShortDate:function () {return "???";}}).getShortDate());
        var alterdiff=text(ShowDateDiff(new Date()-(e.lastseen||new Date()), 3));
        var link1=createElement('a',{ href:'#'+7*24*60, name:e.id, textContent:'+1 Woche', onClick:verzclick });
        var link2=createElement('a',{ href:'#'+24*60, name:e.id, textContent:'+1 Tag', onClick:verzclick });
        var linkhide=createElement('a',{ href:"hide", name:e.id, textContent:'Hide', onClick:hideclick });
        var td3=createElement('td',{ childs:[ alter, createElement('br'), alterdiff, createElement('br'), link1, link2, linkhide ] });
        
        var tr=createElement('tr',{ childs: [ td1, td2, td3] });
        var table=createElement('table',{ childs:[ tr ] });
        createElement('form',{ style:"float:left; padding-right:8px", id:e.id, childs:[ iframe, createElement('br'), table ]}, document.body);
      }
    });
  },10000);
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////////////////////// USERGALERIE ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function UserGallerie()
{
  var Video=deserialize("Video",{});
  // Vorschauliste bunt
  var VideoLinks=$x("//a[contains(@href,'watch?v=')]")
                   .map(function (a) { return { link:a.href, elem:('user'==Kategorie?$xs("ancestor::div[@class='video yt-tile-visible'] | ancestor::li[@class='channels-content-item']",a):'channel'==Kategorie?$xs('../..',a):a.parentNode)||a }; })
                   .map(function (vid) { vid.id=((vid.link||"").match(/v=([a-zA-Z0-9-_]*)/)||["",""])[1]; return vid; });
  //alert(uneval(VideoLinks));
  VideoLinks.forEach(function (vid) { if (Video[vid.id]) /*vid.elem.className="w"+Video[vid.id].qualitaet;*/ vid.elem.style.backgroundColor={ "gut":"green", "schlecht":"red", undefined:"yellow" }[Video[vid.id].qualitaet]; });
  //showmsg({ text:"aaa" });
  $x("//a[contains(@href,'v=')]").forEach(function (a) { a.addEventListener("click",function(event){
    //if (event.ctrlKey) // && event.altKey)
    //{
      var e=event.target;
      while (!e || !e.href) e=e.parentNode;
      var VideoID=e.href.match(/v=([a-zA-Z0-9-_]*)/)[1];
      var Video=deserialize("Video",{});
      if (!Video[VideoID])
      {
        Video[VideoID]={ id:VideoID, anz:0, lastseen:new Date() };
        serialize("Video",Video);
        var ColorNode=$xs("ancestor::div[@class='video yt-tile-visible'] | ancestor::li[@class='channels-content-item']",a)||a;
        ColorNode.style.color="lightgray";
        ColorNode.style.backgroundColor="darkgray";
        event.stopPropagation();
        event.preventDefault();
      }
    //}
  }, true); });
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////////////////////////// Video /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function NextVideo()
{
  //GM_log("Ende");
  showmsg({
    id: "default_msg_{rand}",
    //text: "<p style='padding:20px'>Öffnen nächstes Video in der Kategorie:<br><b>"+GM_getValue('lastKat','* Ohne Kategorie *')+"</b></p>",
    text: "Öffnen nächstes Video in der Kategorie: <b>"+GM_getValue('lastKat','* Ohne Kategorie *')+"</b>",
    color: "red",
    OK: "OK",
    Cancel: "Abbrechen",
    //Timeout: 20,
    fixed:true,
    onCancel: function (data) {},
    //onOKTimeout: function () {
    onOK: function () {
      var Video=deserialize("Video",{});
      var youtube=['',new Date()];
      var Kat=GM_getValue('lastKat','* Ohne Kategorie *');
      for (var i in Video)
        if ((Kat=="* Ohne Kategorie mit X *" && !Video[i].Kategorie && Video[i].x) || (Kat=="* Ohne Kategorie *" && !Video[i].Kategorie && !Video[i].x) || Video[i].Kategorie==Kat)
        {
          if (Video[i].lastseen<youtube[1] && Video[i].qualitaet!="schlecht")
            youtube=[ Video[i].id, Video[i].lastseen ];
        }
      if (youtube[0]=='')
      {
        alert("Keine Videos in der Kategorie gefunden");
        var k=deserialize('Kategorien',[]);
        k.splice(k.indexOf(Kat),1);        
        serialize('Kategorien',k);
        GM_setValue('lastKat','* Ohne Kategorie *');
        return;
      }
      location.href="http://www.youtube.com/watch?v="+youtube[0];
    },
  });
}

function Video(VideoID)
{
  var Video=deserialize("Video",{});
  if (!Video[VideoID]) Video[VideoID]={ id:VideoID, anz:0 };
  Video[VideoID].anz+=1;
  var lastseen=Video[VideoID].lastseen;
  Video[VideoID].lastseen=new Date();
  serialize("Video",Video);
  var Kategorien=deserialize('Kategorien',[]).sort();
  Kategorien.unshift("-- bitte auswählen --");
  Kategorien.push("-- Eingeben --");
  var SelectKat="<select id=wKategorie>"+
                Kategorien.map(function (e) { return "<option>"+e+"</option>" }).join("")+
                "</select>"
  showmsg({
    id:"VideoStatus",
    text: [uneval(Video[VideoID]),
           "Datum: "+(lastseen||{ getShortDate:function () {return "???";}}).getShortDate(),
           "Kategorie: "+SelectKat,
           "Bitte bewerten sie das Video:",
           ""].join('<br>'),
    color:(Video[VideoID].anz<=1)?"gray":{ "gut":"green", "schlecht":"red", undefined:"yellow" }[Video[getParam("v","")].qualitaet],
    fixed:true,
    OK: "Gut",
    Cancel: "Schlecht",
    onOK:function () { var Video=deserialize("Video",{}); Video[getParam("v","")].qualitaet="gut"; serialize("Video",Video);  },
    onCancel:function () { var Video=deserialize("Video",{}); Video[getParam("v","")].qualitaet="schlecht"; serialize("Video",Video);  },
  });
  // id, text, color, OK, onOK, Cancel, onCancel, Timeout, onTimeout, onOKTimeout // ** Log **
  var i=Kategorien.indexOf(Video[VideoID].Kategorie);
  if (i>0) $('wKategorie').selectedIndex=i;
  $('wKategorie').addEventListener("change",function(event){
    var Video=deserialize("Video",{});
    switch (event.target.value)
    {
      case "-- bitte auswählen --":
        delete Video[VideoID].Kategorie;
        break;
      case "-- Eingeben --":
        Video[VideoID].Kategorie=prompt("Bitte Name der Kategorie eingeben:");
        var k=deserialize('Kategorien',[]);
        k.push(Video[VideoID].Kategorie);
        serialize('Kategorien',k);
        break;
      default:
        Video[VideoID].Kategorie=event.target.value;
        break;
    }
    serialize("Video",Video);
  }, true);

  // Vorschauliste BUNT
  var VideoLinks=$x("//ul[@id='watch-related']//li")
                   .map(function (e) { return { link:$xs(".//a",e).href, elem:e }; })
                   .map(function (vid) { vid.id=((vid.link||"").match(/v=([a-zA-Z0-9-_]*)/)||["",""])[1]; return vid; })
  //alert([ uneval(VideoLinks) ].join("\n"));
  Interval(function () {
    var Video=deserialize("Video",{});
    VideoLinks.forEach(function (vid) { if (Video[vid.id]) vid.elem.style.backgroundColor={ "gut":"green", "schlecht":"red", undefined:"yellow" }[Video[vid.id].qualitaet]; });
  }, 60000);
  
  // LINKS zu gespeicherten Videos
  var MenuBase=$('watch-actions');
  if (!MenuBase) MenuBase=$('watch7-secondary-actions');
  if (MenuBase)
  {
    // Selectbox
    var Kat=deserialize('Kategorien',[]).sort();
    Kat.push("* Ohne Kategorie mit X *");
    Kat.unshift("* Ohne Kategorie *");
    Kat.unshift("- Kategorie öffnen -");
    var c=Kat.map(function (e) { return createElement('option', { textContent:e }); });
    var m=createElement('select', { className:"yt-uix-button-default", childs:c, onChange:function (e){ 
      var Video=deserialize("Video",{});
      GM_setValue('lastKat',e.value);
      var youtube=['',new Date()];
      var anz=0;
      for (var i in Video)
         if ((e.value=="* Ohne Kategorie mit X *" && !Video[i].Kategorie && Video[i].x) || (e.value=="* Ohne Kategorie *" && !Video[i].Kategorie && !Video[i].x) || Video[i].Kategorie==e.value)
         {
           anz+=1;
           if (Video[i].lastseen<youtube[1] && Video[i].qualitaet!="schlecht")
             youtube=[ Video[i].id, Video[i].lastseen ];
         }
      if (youtube[0]=='')
      {
        alert("Keine Videos in der Kategorie gefunden");
        var k=deserialize('Kategorien',[]);
        k.splice(k.indexOf(e.value),1);        
        serialize('Kategorien',k);
        GM_setValue('lastKat','* Ohne Kategorie *');
        return;
      }
      if (confirm('Anzahl Videos in der Kategorie: '+anz+'\n\nAktuelles Video im neuen Tab öffnen?'))
        GM_openInTab("http://www.youtube.com/watch?v="+youtube[0]);
      else
        location.href="http://www.youtube.com/watch?v="+youtube[0];
    } }, MenuBase);
    // Button
    createElement('button',{
        className: "yt-uix-button yt-uix-button-default",
        textContent:'Next',
        onClick:function (e) { 
          var Video=deserialize("Video",{});
          var youtube=['',new Date()];
          var Kat=GM_getValue('lastKat','* Ohne Kategorie *');
          for (var i in Video)
            if ((Kat=="* Ohne Kategorie mit X *" && !Video[i].Kategorie && Video[i].x) || (Kat=="* Ohne Kategorie *" && !Video[i].Kategorie && !Video[i].x) || Video[i].Kategorie==Kat)
            {
               if (Video[i].lastseen<youtube[1] && Video[i].qualitaet!="schlecht")
                 youtube=[ Video[i].id, Video[i].lastseen ];
            }
          if (youtube[0]=='')
          {
            alert("Keine Videos in der Kategorie gefunden");
            var k=deserialize('Kategorien',[]);
            k.splice(k.indexOf(Kat),1);        
            serialize('Kategorien',k);
            GM_setValue('lastKat','* Ohne Kategorie *');
            return;
          }
          location.href="http://www.youtube.com/watch?v="+youtube[0];
        }
    }, MenuBase);
  }
  $x("//a[contains(@href,'v=')]").forEach(function (a) { a.addEventListener("click",function(event){
    //if (event.ctrlKey) // && event.altKey)
    {
      var e=event.target;
      while (!e || !e.href) e=e.parentNode;
      var VideoID=e.href.match(/v=([a-zA-Z0-9-_]*)/)[1];
      var Video=deserialize("Video",{});
      if (!Video[VideoID])
      {
        Video[VideoID]={ id:VideoID, anz:0, lastseen:new Date() };
        serialize("Video",Video);
        e.style.color="lightgray";
        e.style.backgroundColor="darkgray";
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }, true); });
  //GM_log("Ready?");
  unsafeWindow.onYouTubePlayerReady = function (playerID)
  {
    //GM_log("youtube Ready");
    var player=document.getElementById("movie_player").wrappedJSObject;
    //player.addEventListener("onStateChange", function (e) { alert("State Changed: "+e); });
    var intervalID=window.setInterval(function () {
      //GM_log("interval");
      if (player.getPlayerState()==0)
      {
        //GM_log("Ende");
        NextVideo();
        window.clearInterval(intervalID);
      }
    },1000);
  }
  //GM_log("ALL DONE");
}

