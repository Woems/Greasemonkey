// ==UserScript==
// @name           kgforum
// @namespace      Woems
// @description    Verbesserungen
// @include        http://www.kgforum.org*
// ==/UserScript==

// ==UserScript==
// @name           Funktionssammlung
// @namespace      Woems
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

var param=location.pathname.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?/);
// Typ    , ForumsID, Bereich, Thread, MaxArtikel, Artikel
// display, 5       , 2407   , 85377 , 42     , 52
// http://www.kgforum.org/display_5_2407_85377_42_52.html
// http://www.kgforum.org/threads_5_2407.html
if (param && param[1])
switch(param[1])
{
  case 'threads': threads(param[2], param[3], param[4]); break;
  case 'display': display(param[2], param[3], param[4], param[5]||0, param[6]||0); break;
  case 'index': break;
  default: alert('KGForum: Parameter 1 unbekannt: '+uneval(param)); break;
} // switch(param[1])

// ***** HILFSFUNKTIONEN *****
function SetData(ForumsID, Bereich, Thread, Artikel, Key, Value) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Artikel]) data[ForumsID][Bereich][Thread][Artikel]={};
  data[ForumsID][Bereich][Thread][Artikel][Key]=Value;
  serialize('data',data);
}
function GetData(ForumsID, Bereich, Thread, Artikel, Key, DefValue) {
  var data=deserialize('data',{});
  try {
    return data[ForumsID][Bereich][Thread][Artikel][Key];
  } catch(e) {
    return DefValue;
  }
}
function AddData(ForumsID, Bereich, Thread, Key, Artikel) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Key]) data[ForumsID][Bereich][Thread][Key]=[];
  if (data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)==-1)
    data[ForumsID][Bereich][Thread][Key].push(Artikel);
  serialize('data',data);
}
function RemoveData(ForumsID, Bereich, Thread, Key, Artikel) {
  var data=deserialize('data',{});
  if (!data[ForumsID]) data[ForumsID]={};
  if (!data[ForumsID][Bereich]) data[ForumsID][Bereich]={};
  if (!data[ForumsID][Bereich][Thread]) data[ForumsID][Bereich][Thread]={};
  if (!data[ForumsID][Bereich][Thread][Key]) data[ForumsID][Bereich][Thread][Key]=[];
  if (data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)!=-1)
    data[ForumsID][Bereich][Thread][Key].splice(data[ForumsID][Bereich][Thread][Key].indexOf(Artikel), 1);
  serialize('data',data);
}
function IfData(ForumsID, Bereich, Thread, Key, Artikel, DefValue) {
  var data=deserialize('data',{});
  try {
    return data[ForumsID][Bereich][Thread][Key].indexOf(Artikel)!=-1
  } catch(e) {
    return DefValue;
  }
}

function ArtikelDisplay(Artikel, Display)
{
  var ErsterArtikel=location.pathname.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?/)[6] || 0;
  var Position=Artikel*1-ErsterArtikel*1;
  $('wThread').rows[Position*3+1].style.display=Display;
  $('wThread').rows[Position*3+2].style.display=Display;
  $('wThread').rows[Position*3+3].style.display=Display;
}

function ArtikelAusblenden(ForumsID, Bereich, Thread, Artikel) {
  //SetData(ForumsID, Bereich, Thread, Artikel, "hide", true);
  AddData(ForumsID, Bereich, Thread, "hide", Artikel);
  ArtikelDisplay(Artikel, "none");
}
function ArtikelEinblenden(ForumsID, Bereich, Thread, Artikel) {
  //SetData(ForumsID, Bereich, Thread, Artikel, "hide", false);
  RemoveData(ForumsID, Bereich, Thread, "hide", Artikel);
  ArtikelDisplay(Artikel, "");
}
function ArtikelAusgeblendet(ForumsID, Bereich, Thread, Artikel) {
  //return GetData(ForumsID, Bereich, Thread, Artikel, "hide", false);
  return IfData(ForumsID, Bereich, Thread, "hide", Artikel, false);
}

// ***** HAUPTFUNKTIONEN *****
function threads(ForumsID, Bereich, Thread) // Uebersicht über alle Treads
{
  $xs("/html/body/center[2]").id="wContent";
  $xs("id('wContent')/table/tbody/tr/td/table[2]").id='wThreads';
  $x("id('wThreads')/tbody/tr/td[3]/font/a").forEach(function (a) {
    var param=a.href.match(/\/([a-z]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+)(?:_([0-9]+))?)?)?)?)?.html$/);
    var data=deserialize('data',{});
    if (data[param[2]][param[3]][param[4]]) a.style.color="green";
    GM_log(param);
  })
} // threads()

function display(ForumsID, Bereich, Thread, MaxArtikel, Artikel) // Einzelner Tread mit den Beitraegen der User
{
  $xs("/html/body/center[2]").id="wContent";
  $xs("id('wContent')/table/tbody/tr/td/table[2]").id='wThread';

  var Titel=$xs("//font[img[@src='http://www2.forennet.org/images/theme1/folder-3.gif']]").lastChild.textContent;
  document.title="KG-Forum - "+Titel.replace(/^\s*|\s*$/g,"");

  if (location.hash=="") $("wContent").scrollIntoView()
  $x("id('wThread')/tbody/tr/td[@rowspan=3]").forEach(function (ZelleAutor,i) {
    var Name=ZelleAutor.firstChild.name;
    var AktuellerArtikel=Artikel*1+i;
    var Links=createElement('font', { size:1 }, ZelleAutor);

    createElement('br', {  }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel+1), AktuellerArtikel].join('_')+".html#"+Name, innerHTML:"[ Beitrag nach Oben ]" }, Links);

    createElement('br', {  }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel-1), AktuellerArtikel-1].join('_')+".html", innerHTML:"[ zurück ]" }, Links);
    createElement('a', { href:["display", ForumsID, Bereich, Thread, Math.max(MaxArtikel, AktuellerArtikel+1), AktuellerArtikel+1].join('_')+".html", innerHTML:"[ weiter ]" }, Links);

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var next=createElement('a', { href:'#'+Name, innerHTML:"[ Darüber Sichtbar ]" }, Links);
    next.addEventListener("click",function(event){
      ArtikelEinblenden(ForumsID, Bereich, Thread, AktuellerArtikel-1);
      event.stopPropagation();
      event.preventDefault();
    }, true);
    createElement('br', {  }, Links);
    var prev=createElement('a', { href:'#'+Name, innerHTML:"[ Darunter Sichtbar ]" }, Links);
    prev.addEventListener("click",function(event){
      ArtikelEinblenden(ForumsID, Bereich, Thread, AktuellerArtikel+1);
      event.stopPropagation();
      event.preventDefault();
    }, true);
    /*/
    createElement('br', {  }, Links);
    var prev=createElement('a', { href:'#'+Name, innerHTML:"[ ALLE Sichtbar ]" }, Links);
    prev.addEventListener("click",function(event){
      var data=deserialize('data',{});
      data[ForumsID][Bereich][Thread]={};
      serialize('data',data);
      location.reload();
      event.stopPropagation();
      event.preventDefault();
    }, true);
    /**/

    createElement('br', {  }, Links);
    createElement('br', {  }, Links);
    var hide=createElement('a', { href:'#'+Name, innerHTML:"[ ausblenden ]" }, Links);
    hide.addEventListener("click",function(event){
      ArtikelAusblenden(ForumsID, Bereich, Thread, AktuellerArtikel);
      event.stopPropagation();
      event.preventDefault();
    }, true);

    // Artikel ausblenden
    if (ArtikelAusgeblendet(ForumsID, Bereich, Thread, AktuellerArtikel))
      $x('.. | ../following-sibling::tr[1] | ../following-sibling::tr[2]',ZelleAutor).forEach(function (e) {
        e.style.display="none"
      });
    
  });
} // display()


