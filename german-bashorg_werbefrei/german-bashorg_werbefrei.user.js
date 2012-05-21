// ==UserScript==
// @name           German-Bash.org Werbefrei 1.1 (16.06.2009)
// @namespace      http://gordon_vdlg.byethost16.com
// @description    Killt unten die Box mit der Überschrift "Werbung" samt Inhalt, den Rest übernimmt Adblock Plus...
// @include        http://german-bash.org/*
// @include        http://www.german-bash.org/*
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
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(url, xhr.responseText, xhr.responseHeaders); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(url, xhr.responseText, xhr.responseHeaders); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
//GM_log=function (){}
/********************************/


window.setTimeout(killpopup, 1000);

function killpopup()
{ 
  if ($('adscaleLightboxBackground')) remove($('adscaleLightboxBackground')); else window.setTimeout(killpopup, 1000);
}


var sp;
        
for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
  if (document.getElementsByTagName("div")[i].innerHTML == "Werbung") {
    sp = document.getElementsByTagName("div")[i-1];
    sp.parentNode.removeChild(sp);
  }
}

if (document.URL.indexOf("german-bash.org/action/random") > -1) {
  for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
    if (document.getElementsByTagName("div")[i].className == "content") {
      var neuesdiv = document.createElement("center");
      neuesdiv.innerHTML = '<center><a href="http://german-bash.org/action/random" accesskey=y>Mehr...</a></center>';
      document.getElementsByTagName("div")[i].appendChild(neuesdiv);
    }
  }
}

//$x('/html/body/div[2]/div/div[2]/span')[0].style.display="none";
