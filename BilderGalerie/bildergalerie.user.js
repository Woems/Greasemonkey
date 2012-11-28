// ==UserScript==
// @name           BilderGalerie
// @namespace      Woems
// @description    Nach drücken von STRG+ALT+Z (Gross Z) wird die Galerie aktiviert.
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
    if (attr.indexOf("on")==0) { var prog=attributes[attr]; node.addEventListener(attr.substr(2).toLowerCase(),function(event){ prog(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); } else
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
//GM_log=function (){}
function inFrame() { return self!=top; }
/********************************/

globaleTasten();
var galerie=deserialize('galerie',{});
if (galerie[location.host]) window.setTimeout(galerieAnzeigen,1000);

//serialize('galerie',galerie);


if (!inFrame())
  window.setTimeout(function () {
    var img=$x("//img");
    var sortedimg=img.sort(function (a,b) { return b.width*b.height-a.width*a.height; });
    sortedimg[0].scrollIntoView();
  }, 2*1000);

/**
	@name globaleTasten
	@function
	@description Tasten zum aktivieren der Galeriefunktion
*/
function globaleTasten () {
  Key('STRG+ALT+Z',function (e) { // Taste zum aktivieren
    var galerie=deserialize('galerie',{});
    if (galerie[location.host]) 
      delete galerie[location.host];
    else
      galerie[location.host]={ pathname:"", bilder:"//img", next:"", preview:"", minheight:200, minwidth:200 };
    alert("Galerie "+(galerie[location.host]?'':'de')+"aktiviert. Bitte die Seite neu laden...");
    serialize('galerie',galerie);
  });
} // End globaleTasten

/**
	@name galerieAnzeigen
	@function
	@description Zeigt die Galerie an
*/
function galerieAnzeigen () {
  var data=deserialize('galerie',{})[location.host];
  if ($x(data.bilder) && $x(data.bilder).filter(function (img) { return img.width>data.minwidth && img.height>data.minheight; }).length>0)
  {
    var imgurls=$x(data.bilder).filter(function (img) { return img.width>data.minwidth && img.height>data.minheight; }).map(function (img) { return '<img src="'+img.src+'">'; });
    createElement("div",{
      id:'wBilderGalerie',
      style:'text-align:center; position:fixed; top:20px; left:20px; height:'+(window.innerHeight-60)+'px; width:'+(window.innerWidth-80)+'px; background-color:white; border:2px solid gray; padding:10px; overflow:scroll;',
      innerHTML:imgurls.join(''),
      onClick:function (t,e) { $('wBilderGalerie').style.display='none'; },
    }, document.body);
    window.addEventListener("resize",function(event){
      $('wBilderGalerie').style.width=(window.innerWidth-80)+'px';
      $('wBilderGalerie').style.height=(window.innerHeight-60)+'px';
    }, true);
    //$('wBilderGalerie').innerHTML=imgurls.join('');
  }
  //serialize('galerie',galerie);
  
} // End galerieAnzeigen
