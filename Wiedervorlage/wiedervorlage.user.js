// ==UserScript==
// @name           Wiedervorlage
// @namespace      Woems
// @description    Seite auf wiedervorlage legen
// @include        *
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
// XPath
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// Edit Nodes
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr))
    if (attr.indexOf("on")==0) node.addEventListener(attr.substr(2).toLowerCase(),function(event){ attributes[attr](event.target,event); event.stopPropagation(); event.preventDefault(); }, true); else
    if (['style'].indexOf(attr)!=-1) node.setAttribute(attr, attributes[attr]); else
    if (attr=="childs") { for (var child in attributes[attr]) node.appendChild(attributes[attr][child]); } else
    try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
function Key(key,func) { document.addEventListener('keypress', function (e) { k=e.keyCode||e.which; k=(e.metaKey?'META+':'')+(e.ctrlKey?'STRG+':'')+(e.altKey?'ALT+':'')+(String.fromCharCode(k)||k); if (key==k) func(); }, true);  }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
function showmsg(data)
{
  if (!data.id) data.id="default_msg_{rand}";
  data.id=data.id.replace("{rand}",Math.floor(Math.random()*1000));
  if ($(data.id)) remove($(data.id));
  if (data.onOKTimeout) { data.onOK=data.onOKTimeout; data.onTimeout=data.onOKTimeout; }
  var style="padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; color:"+(data.textcolor||"black")+"; text-align:center;";
  style+=" font:normal medium sans-serif; z-index:9999;"; // Schönheitskorrekturen
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
//GM_log=function (){}
//GM_log=function (Text) { showmsg({ text: Text.replace(/\n/g,"<br>"), color:"yellow", fixed:true, Timeout:10, onTimeout: function (data) {}, }); };
/********************************/

globaleTasten();

function globaleTasten () {
  Key('STRG+ALT+y',function (e) { // Taste zum aktivieren
    wvShow();
  });
  Key('STRG+ALT+x',function (e) { // Taste zum aktivieren
    wvAdd('http://www.kinopolis.de/bn/programm_wochenansicht', 'Kinopolis', 'weekly on do');

    wvAdd('http://www.google.com/calendar/render', 'Google Kalender', 'weekly');

    wvAdd('http://www.google.com/reader/view/', 'Google Reader', 'daily');
    wvAdd('http://vs-bn.de/', 'VideoStore Bonn', 'daily');
    wvAdd('http://www.elwis.de/gewaesserkunde/Wasserstaende/wasserstaendeUebersichtGrafik.html.php?pegelId=b45359df-c020-4314-adb1-d1921db642da', 'Elwis', 'daily');
    
    wvAdd('http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=40122', 'H0-Modellbahnforum - Anlagenbau', 'hourly');
  });
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

wvNow();
//wvShow();

function wvAdd(Url, Titel, Wiederhohlung)
{
  if (!Url) Url=prompt("URL:");
  if (!Url) return;
  var exist=deserialize('WV',[]).filter(function (e) { return e.url==Url; });
  if (!Titel) Titel=prompt("Titel:",(exist.length > 0?exist[0].t:''));
  if (!Titel) return;
  if (!Wiederhohlung) Wiederhohlung=prompt("minut(e|ly), hour(ly), da(y|ily), week(ly) (on do|;4), month(ly), year(ly):",(exist.length > 0?exist[0].wh:''));
  if (!Wiederhohlung) return;
  wvDel(Url)
  var WV=deserialize('WV',[]);
  WV.push({ url:Url, t:Titel, wh:Wiederhohlung, last:new Date() });
  serialize('WV',WV);
  //wvShow();
} // End: function wvAdd()

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
    //GM_log(uneval(wv.wh.split(";")));
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
      //var r=Rand(1,6)*10;
      var r=Rand(10,60);
      showmsg({
        id:'WV_oeffnen_{rand}',
        text:'<p><a target="_blank" title="'+wv.wh+' / '+wv.last+'" href="'+wv.url+'">'+wv.t+'</a> öffnen?</p>',
        fixed: true,
        url: wv.url,
        sec:r,
        color:'red',
        OK:'OK',
        onOK:function (e) { wvCheck(e.url); $xs(".//a",e.box).click(); },//GM_openInTab(e.url); },
        Cancel:'Aufschieben um '+r+'min',
        onCancel:function (e) { wvAufschieben(e.url, prompt("Wartezeit in min:",e.sec)); },
        Timeout:30,
        onTimeout:function (e) { },
      });
      //wv.last=new Date(); window.setTimeout(function () { GM_openInTab(wv.url); }, 10*1000);
    }
    return wv;
  });
  serialize('WV',WV);  
} // End: function wvNow()

function wvShow()
{
  var WV=deserialize('WV',[]);
  WV.forEach(function (wv) {
    showmsg({
      id:'WV_anzeigen_{rand}',
      text:'<a href="'+wv.url+'">'+wv.t+'</a>: <b>'+wv.wh+'</b> / '+wv.last,
      color:'lightgray',
      OK: 'Hinzufügen',
      onOK:function (e) { wvAdd(); },
      Cancel: 'löschen',
      onCancel:function (e) { wvDel(wv.url); },
      Timeout:10,
      onTimeout:function (e) {},
    });
  });
}
