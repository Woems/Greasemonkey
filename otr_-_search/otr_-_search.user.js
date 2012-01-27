// ==UserScript==
// @name           OTR - Search
// @namespace      Woems
// @description    Highlight the Search
// @include        http://epg.onlinetvrecorder.com/broadcasts/search?*
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
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
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
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

// **** Spalte Datum ****
$x("//tbody[tr/td/a[text()='Datum']]/tr").forEach(function (row) {
  var Datum=row.textContent.match(/([0-9]*)\.([0-9]*)\.([0-9]*):\s*([0-9]*):([0-9]*)\s*-\s*([0-9]*):([0-9]*)/);
  if (Datum)
  {
    //GM_log(Datum);
    var Start=new Date(Datum[3],Datum[2],Datum[1],Datum[4],Datum[5],0);
    var Ende=new Date(Datum[3],Datum[2],Datum[1],Datum[6],Datum[7],0);
    var Dauer=(Ende-Start)/1000/60;
    //GM_log("\n"+Start+"\n"+Ende+"\n"+Dauer+" min");
    var td = createElement('td', { innerHTML:Dauer+" min" });	
    insertAfter(td,row.cells[3]);
  } else {
    var td = createElement('td', { innerHTML:"Dauer" });
    insertAfter(td,row.cells[3]);
    //insertAfter(td,$xs("//td[a[text()='Datum']]"));
  }
});

// **** Alte Filme Farbig ****
// 1800-1989 lightgray
// 1930-1989 lightgreen
// 1950-1979 green
$x("id('links')/table/tbody/tr").forEach(function (line) {
  if (line.cells[1].textContent.match(/18[0-9]{2}|19[0-8][0-9]/))
  {
    line.cells[1].innerHTML=line.cells[1].innerHTML.replace(/(18[0-9]{2}|19[0-8][0-9])/,"$1".bold().fontcolor("red"));
    line.style.backgroundColor="lightgray";
  }
  if (line.cells[1].textContent.match(/19[3-3][0-9]/))
    line.style.backgroundColor="#FCC";
  if (line.cells[1].textContent.match(/19[4-6][0-9]/))
    line.style.backgroundColor="green";

  if (line.cells[1].textContent.match(/19[7-8][0-9]/))
    line.style.backgroundColor="#CFF";
});

// **** Aufgenommene Filme Grau einfärben ****
function einfaerben()
{
 var aufgenommen=deserialize('aufgenommen',{});
 $x("id('links')/table/tbody/tr/td[2]").forEach(function (e) {
  switch(aufgenommen[e.textContent])
  {
    case true: 
    case 1: $x("../td",e).forEach(function (e) { e.style.color="gray"; }); break;
    case 2: $x("../td",e).forEach(function (e) { e.style.color="lightgray"; }); break;
    case 3: $x("../td",e).forEach(function (e) { e.style.color="blue"; }); break;
    case 4: $x("../td",e).forEach(function (e) { e.style.color="yellow"; }); break;
    case undefined: break;
    default: $x("../td",e).forEach(function (e) { e.style.color="lightred"; }); break;
  }
 });
}
einfaerben();
$x("//a[text()='Aufnehmen']").forEach(function (e) {
  e.addEventListener("click",function(event){
    var Titel=$xs("../../../td[2]",event.target).textContent;
    //GM_log(Titel);
    var aufgenommen=deserialize('aufgenommen',{});
    aufgenommen[Titel]=(aufgenommen[Titel]||0)+1;
    serialize('aufgenommen',aufgenommen);
    einfaerben();
    //event.stopPropagation();
    //event.preventDefault();
  }, true);
});
