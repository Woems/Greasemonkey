// ==UserScript==
// @name           FritzBox Netzwerk-IP-Liste sortieren
// @namespace      Woems
// @include        https://*.dyndns.org*
// @include        https://*.dyndns-ip.com*
// @include        http://fritz.box
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
function ga(obj) { GM_log(uneval(obj)); }https://github.com/Woems/Greasemonkey/blob/master/fritzbox_-_netadd/fritzbox_-_netadd.user.js
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

switch(location.pathname)
{
  case "/net/network_user_devices.lua": page_net(); break;
}

function page_net()
{
  //alert("Sort");
  Table=$xs("id('uiViewDevTable')/tbody/tr[3]/td/table/tbody");
  Zeilen=$x("id('uiViewDevTable')/tbody/tr[3]/td/table/tbody/tr").map(function (tr) { 
    var tmp={};
    tmp.elem=tr;
    tmp.iprow=tr.cells[2]||{};
    tmp.ip=tmp.iprow.innerHTML||"",
    tmp.ipsort=+tmp.ip.replace(/[0-9]+\.[0-9]+\.[0-9]+\.([0-9]+)/,"$1")||0;
    tmp.ipsort2=tmp.ip.split(".").reverse().join("");
    return tmp;
  });
  
  Zeilen.sort(function (a,b) { return a.ipsort-b.ipsort; });
  //alert(uneval(Zeilen));
  Zeilen.forEach(function (e) { Table.appendChild(e.elem); });
  
  /*
  for (var j=0; j<Zeilen.length-1; j++)
  for (var i=j; i<Zeilen.length-1; i++)
  {
     if (Zeilen[j].ipsort+ > Zeilen[i].ipsort+)
       insertAfter(Zeilen[j].elem, Zeilen[i].elem);
     GM_log($('tLan').rows[i].cells[2].innerHTML.replace(/[0-9]+\.[0-9]+\.[0-9]+\.([0-9]+)/,"$1")+" > "+$('tLan').rows[i+1].cells[2].innerHTML.replace(/[0-9]+\.[0-9]+\.[0-9]+\.([0-9]+)/,"$1"));
     if ($('tLan').rows[i].cells[2].innerHTML.replace(/[0-9]+\.[0-9]+\.[0-9]+\.([0-9]+)/,"$1")*1>$('tLan').rows[i+1].cells[2].innerHTML.replace(/[0-9]+\.[0-9]+\.[0-9]+\.([0-9]+)/,"$1")*1)
       insertAfter($('tLan').rows[i], $('tLan').rows[i+1]);
  }*/
  //insertAfter($('tLan').rows[1], $('tLan').rows[3])
  //htmlswap($('tLan').rows[1],$('tLan').rows[2]);
}


function htmlswap(a,b)
{
  a.appendChild(b);
  var tmp=a;
  a=b;
  b=tmp;
}
