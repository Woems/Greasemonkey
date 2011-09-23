// ==UserScript==
// @name           Crazy Heels - Details
// @namespace      Woems
// @description    Zeigt bei dem Titel die Heelgroeße mit an
// @include        http://www.crazy-heels.de/shop/index.php*.html*
// @include        http://www.crazy-heels.de/shop/product_info.php/info/*.html
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
// protocol//host:port/pathname#hash
// href
//GM_log(location.protocol+"|"+location.host+"|"+location.hostname+"|"+location.port+"|"+location.pathname+"|"+location.search+"\n"+location.href);

//GM_log("Crazy Heels");
var site=location.pathname.match(/\/shop\/([a-z]*)/);
switch (site[1])
{
  case 'index': site_index(); break;
  case 'product': site_product(); break;
  default: GM_log("Site unknown: "+site+" ("+location.pathname+")"); break;
}

function site_index()
{
  //GM_log("Crazy Heels - Site");
  $x('//a[contains(@href,"product_info")][strong]').forEach(function (a){
    //GM_log(a.textContent);
    var Name=a.textContent.match(/^[A-Z]+/);
    var data=deserialize("data",{});
    if (!data[Name[0]])
      data[Name[0]]="???";
    var text=createElement("span",{ className:Name[0], textContent:' ('+data[Name[0]]+")" },a);
    onClick(text,function (c) {
      data[c.className]=prompt("Bitte geben sie die Größe für "+Name[0]+" ein: (z.B: 8\"/20)","");
      serialize("data",data);
    });
  //  a.appendChild(document.createTextNode(  ));
  });
}

function site_product()
{
  //GM_log("Crazy Heels - Product");
  var Name=$xs("//h1").textContent.match(/^[A-Z]+/);
  var Size=$xs('//td[@class="produktbeschreibung"]/p').textContent.match(/Absatz: ([0-9,]* cm)/);
  //GM_log("Name: "+Name+" / Size: "+Size);
  var data=deserialize("data",{});
  if (!data[Name])
    data[Name]=Size[1];
  //else if (data[Name]!=Size[1])
  //  data[Name]=prompt("Soll "+data[Name]+" auf "+Size[1]+" geändert werden?",data[Name]);
  serialize("data",data);
}
