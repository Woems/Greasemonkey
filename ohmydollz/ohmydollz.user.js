// ==UserScript==
// @name           OhMyDollz
// @namespace      Woems
// @include        http://de.ohmydollz.com/*
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
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
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

function rand(begin,ende) { return Math.round(begin + (ende-begin) * Math.random()); }

function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

function Date2String(string, date)
{
  Date.prototype.getWeekday=function () { return ["Sonntag", "Montag", "Dienstag", "Mittwoch","Donnerstag", "Freitag", "Samstag"][this.getDay()]; };
  Date.prototype.getWeek=function () { return ["So", "Mo", "Di", "Mi","Do", "Fr", "Sa"][this.getDay()]; };
  Date.prototype.getMinYear=function () { return (this.getYear()+"").substr(1,2); };
  return string.replace(/%(\w*)%/g,function (a,b) { return (date || new Date())['get'+b](); });
  //Date2String("%Hours%:%Minutes%.%Seconds% %Date%.%Month%.%FullYear% %Time%")="14:37.31 22.6.2010 1279802251197"
}

Timeout(function () {
  location.search="";
},60*60*1000);

GM_log(Date2String("%Date%.%Month%.%MinYear%"));

if ($xs('//input[@name="pseudo"]') && $xs('//input[@name="pass"]'))
{ 
  Timeout(function () {
    $xs('//input[@name="pseudo"]').value="Mandy123";
    $xs('//input[@name="pass"]').value="tuxtux";
    $xs('//input[@type="submit"][@value="Login"]').form.submit();
  },10000);
} else {
  if ($xs('//div[@class="message"]'))
    switch($xs('//div[@class="message"]').textContent)
  {
    case 'Du hast heute schon gearbeitet.':
      GM_setValue("Arbeit", Date2String("%Date%.%Month%.%MinYear%") );
      GM_log(location.href+"\nHeute schon gearbeitet");
      break;
  }
  if ($xs('//a[text()="trainieren (0 $$$)"]'))
  {
    Timeout(function () {
      GM_log(location.href+"\na=xp");
      location.search="a=xp";
    },rand(60,120)*1000);    
  }
  //GM_log("\nNow: "+new Date()+"\nSaved: "+GM_getValue("Arbeit")+"\nArbeits-Timeout: "+(new Date().getTime()-GM_getValue("Arbeit")));
  if (!deserialize("Arbeit") || Date2String("%Date%.%Month%.%MinYear%") != GM_getValue("Arbeit"))
  { 
    var r=rand(60,120)*1000;
    GM_log(location.href+"\n"+GM_getValue("Arbeit")+"\nRand: "+r);
    Timeout(function () {
      GM_log(location.href+"\na=travailler");
      location.search="a=travailler";
    },r);
  } else GM_log(location.href+"\n"+GM_getValue("Arbeit")+"\nArbeit schon erledigt...");
}


