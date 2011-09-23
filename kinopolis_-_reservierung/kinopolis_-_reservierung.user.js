// ==UserScript==
// @name           Kinopolis - Reservierung Mailen
// @namespace      Woems
// @include        http://www.kinopolis.de*
// @include        http://213.168.82.190*
// @include        http://mail.google.com*
// @include        https://mail.google.com*
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

GM_log(location.href);
switch (location.host)
{
  case 'www.kinopolis-ticketshop.de':
  case 'www.kinopolis.de':
    Kinopolis();
    break;
  case '213.168.82.190':
    KinopolisPrint();
    break;
  case 'mail.google.com':
    Google();
    break;
  default:
    //GM_log(location.host);
    alert(location.host);
    break;
}

function Kinopolis()
{
  //alert("Kinopolis Reservierung: Kinopolis");
  // http://www.kinopolis.de/bn/tickets_index?performance_id=C0E42000023GNFNDWF
  // https://www.kinopolis-ticketshop.de/bp/reservationConfirmation.htm
  // ** neue Reservierungsbestätigung **
  if ($xs('//h2[@class="importantinformation"][contains(text(),"Reservierungsnummer")]'))
  {
    alert("Kinopolis Reservierung: Reservierung");
    var ReservNr=$xs("//h2[contains(text(),'Reservierungsnummer')][@class='importantinformation']");
    var ReservInfo=$xs("//tbody[tr/th[contains(text(),'Reservierungsinformation')]]/tr[2]/td[2]");
    $xs("//tbody[tr/th[contains(text(),'Reservierte Vorstellung')]]/tr[2]/td[2]/table").id="wReservierteVorstellung";
    var AnzTickets=$xs("//tbody[tr/th[contains(text(),'Reservierte Vorstellung')]]/tr[2]/td[2]/table//tr[3]/td[1]");
    var DatumUndPlaetze=$xs("//tbody[tr/th[contains(text(),'Reservierte Vorstellung')]]/tr[2]/td[2]/table//tr[2]/td[1]");
    DatumUndPlaetze.textContent.replace(/Kino ([0-9]*), Reihe ([0-9]*), Platz ([0-9]*) bis ([0-9]*)$/," R $2: P $3-$4");
    alert(DatumUndPlaetze.textContent+"\n----\n"+ReservNr.textContent+"\n----\n"+ReservInfo.textContent+"\n----\n"+AnzTickets.textContent);
  }
}

function text2num(text)
{
  return text.replace(/[^0-9,\.]/g,"").replace(/,/g,".")*1
}

function num2euro(num)
{
  return num.toFixed(2).replace(/\./g,",")+" Euro";
}

function KinopolisPrint()
{
  // ** Reservierungsbestätigung **
  if ($xs('//input[@value="Drucken"]'))
  {
    var onclick=$xs('//input[@value="Drucken"]').getAttribute("onclick");
    var url=onclick.match(/'(Reservation.ASP.*)'/);
    GM_openInTab("http://213.168.82.190/"+url[1]);
  }

  // ** Reservierung Druckansicht **
  if ($xs('//div[@align="CENTER"]')) {
    GM_setValue("Reservierung",$xs('//div[@align="CENTER"]').innerHTML);
    
    $xs('//font[font[text()="Reservierung"]]/font[2]').id="wTitel";
    $xs('//tr[td/font[text()="Datum:"]]/td[2]').id="wDatum";
    $xs('//tr[td/font[text()="Uhrzeit:"]]/td[2]').id="wUhrzeit";
    $xs('//tr[td/font[text()="Anzahl Karten:"]]/td[2]').id="wAnzahlKarten";
    $xs('//tr[td/font[text()="Preis:"]]/td[2]').id="wPreis";

    var Preis=num2euro(text2num($("wPreis").textContent) / text2num($("wAnzahlKarten").textContent) );

    createElement("div",{ innerHTML: $("wDatum").textContent+" "+$("wUhrzeit").textContent+" - "+$("wTitel").textContent+" - "+Preis },document.body);
    GM_setValue("Titel",$("wDatum").textContent+" "+$("wUhrzeit").textContent+" - "+$("wTitel").textContent+" - "+Preis);

    GM_openInTab("https://mail.google.com/mail/#compose");
  }
}

function Google()
{ // "https://mail.google.com/mail?view=cm&tf=0&to=" + emailTo + "&cc=" + emailCC + "&su=" + emailSubject + "&body=" + emailBody
  if (GM_getValue("Reservierung","")!="")
  {
    //GM_log("Kinopolis: "+GM_getValue("Reservierung",""));
    if ($(":nv")) { GM_log(":nv"); $(":nv").innerHTML=GM_getValue("Reservierung","- leer -") };
    if ($(":o6")) { GM_log(":o6"); $(":o6").value=GM_getValue("Titel","- no Titel -") };
    //GM_setValue("Reservierung","");
    GM_log(location.href);

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      function setViewType() {
        var str = '';
        switch (gmail.getActiveViewType()) {
          case 'tl': str = 'Threadlist'; break;
          case 'cv': str = 'Conversation'; break;
          case 'co': str = 'Compose'; break;
          case 'ct': str = 'Contacts'; break;
          case 's': str = 'Settings'; break;
          default: str = 'Unknown';
        }
        //module.setContent(str);
        GM_log(str);
      }
      GM_log(1);
      GM_log(uneval(gmail));
      //var module = gmail.addNavModule('View Monitor');
      GM_log(2);
      gmail.registerViewChangeCallback(setViewType);
      GM_log(3);
      setViewType();
      GM_log(4);
    });
  }
}, true);

  } else GM_log("Kinopolis Reservierung: NoInfo"+location.href);
}


