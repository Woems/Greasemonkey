// ==UserScript==
// @name           Fritz!Box
// @namespace      Woems
// @include        http://fritz.box*
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
    if (attr=="childs") { for (var child in attributes[attr]) node.appendChild(attributes[attr][child]); } else
    try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
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
//function css(style) { GM_setStyle(style); }
css=GM_addStyle;
//GM_log=function (){}
/********************************/



switch (location.pathname)
{
  case '/': break; // Home
  case '/login.lua': break; // Login Page
  case '/net/network_user_devices.lua': IPErkennung(); break; // Heimnetz/Netzwerk/Geräte und Benutzer
  case '/net/upnp.lua': break; // Heimnetz/Netzwerk/Programme
  case '/net/network_settings.lua': break; // Heimnetz/Netzwerk/Netzwerkeinstellungen
  case '/usb/show_usb_devices.lua': break; // Heimnetz/USB-Geräte
  default:
    var path=deserialize("path",{});
    if (!path[location.pathname])
      path[location.pathname]=prompt("Beschreibung zu "+location.pathname,path[location.pathname]);
    serialize("path",path);
    var output="";
    for (i in path)
      output+="  case '"+i+"': break; // "+path[i]+"<br>";
    createElement("pre",{ innerHTML:""+output+"" },$("page_content_menu_box"));
    break;
}

/**
	@name IPErkennung
	@function
	@description Erkennt die IPs und macht daraus Links
*/
function IPErkennung () {
  css(".wadd { padding-left: 5px; }");
  css(".wadd:before { content:'('; }");
  css(".wadd:after { content:')'; }");
  $x("id('uiViewDevTable')/tbody/tr/td[3]").forEach(function (ip) { ip.innerHTML="<a href=http://"+ip.innerHTML+" target=_new>"+ip.innerHTML+"</a>"; });
  $x("id('uiViewDevTable')/tbody/tr").forEach(function (row) { row.cells[1].innerHTML="<a href=http://"+row.cells[2].textContent+" target=_new>"+row.cells[1].textContent+"</a>"; }); // 1:Name, 2:IP, 3:Verbindung, 4:Eigenschaften
  $x("id('uiViewDevTable')/tbody/tr").forEach(function (row) {
    var span=createElement("span",{ className:"wadd" },row.cells[1]);
    createElement("a",{ textContent:"+", onClick:function (e) { alert("Dies script ist noch nicht fertig"); } },span);
  }); // 1:Name, 2:IP, 3:Verbindung, 4:Eigenschaften
} // End IPErkennung
