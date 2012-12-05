// ==UserScript==
// @name           FritzBox - NetAdd
// @namespace      Woems
// @description    Im DHCP eine neue feste IP vergeben
// @include        https://*.dyndns.org/net/newdevice.lua*
// @include        https://*.dyndns-ip.com/net/newdevice.lua*
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

var TextBox=createElement("textarea",{ id:"wTextBox", cols:100, rows:10 },$("page_content"));

TextBox.textContent=GM_getValue("text","");
TextBox.addEventListener("change",function(event){ 
  //func(event.target,event);
  //GM_log(event.target.value);
  GM_setValue("text",event.target.value);
  //GM_log(GM_getValue("text",""));
  //event.stopPropagation();
  //event.preventDefault();
}, true);

var lines=GM_getValue("text","").split("\n");
GM_log(uneval(lines));
do {
  var next=lines.shift();
  var m=next.match(/([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2}):([0-9a-fA-F]{2})[ \t;]*([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)[ \t;]*(.*)/);
  if (!m) GM_log("Delete: "+next);
} while (!m && lines.length>0);
if (m)
{
  //GM_log(uneval(m));
  $("uiName").value=m[11];
  $("uiMac0").value=m[1];
  $("uiMac1").value=m[2];
  $("uiMac2").value=m[3];
  $("uiMac3").value=m[4];
  $("uiMac4").value=m[5];
  $("uiMac5").value=m[6];
  $("uiIp0").value=m[7];
  $("uiIp1").value=m[8];
  $("uiIp2").value=m[9];
  $("uiIp3").value=m[10];
  TextBox.textContent=lines.join("\n");
  GM_setValue("text",lines.join("\n"));
} else { TextBox.textContent="Syntax (Trenner: 'tab' oder ' ' oder ';'):\n\nMAC;IP;Name\n\nBeispiel:\n00:00:00:00:00:00 192.168.1.1 TEST" }
