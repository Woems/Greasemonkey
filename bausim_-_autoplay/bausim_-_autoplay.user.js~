// ==UserScript==
// @name           bausim - AutoPlay
// @namespace      Woems
// @include        http://*bausim.net*
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
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
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
//GM_log=function (){}
/********************************/

GM_log("Bausim")
var loc=document.location.toString().match(/http\:\/\/.*bausim\.net\/ingame\/index\.php\?page\=([^&]*)/);
GM_log("Loc: "+loc[1])
switch (loc[1]) {
  case "ubersicht" :  Next(); Ubersicht(); break;
  case "buy_res" :    Next(); Rohstoffe_kaufen(); break;
  case "prod_waren" : Next(); Produktionswarteschlange(); break;
  case "bauauftrag" : Next(); Bauauftraege();  break;
  default: Next(); break;
  //default: alert(loc[1]); break;
}

function Next(fast)
{
  var nextsides={ "ubersicht":"buy_res", "buy_res":"prod_waren", "prod_waren":"bauauftrag", "bauauftrag":"ubersicht" };
  next=nextsides[loc[1]];
  if (!next) next="ubersicht";
  GM_log(loc[1]+((fast)?" => ":" -> ")+next);
  Timeout(function () {
    window.location.href="index.php?page="+next; //http://bausim.net/ingame/
  },(fast)?5*1000:20*60*1000);
}

function Ubersicht()
{
  var Kontostand=$('aktueller_kontostand').textContent.replace(/\./g,"")*1;
  var Holz=$xs("id('ressourcen_anzeige_sidebar')/p/strong[text()='Holz']/../text()").textContent.replace(/t/,"")*1;
  GM_log("Kontostand: "+Kontostand);
  GM_log("Holz: "+Holz);
  if (Holz==0 && Kontostand>20000)
    Next(true);
}

function Rohstoffe_kaufen()
{
  var Kontostand=$('aktueller_kontostand').textContent.replace(/\./g,"")*1;
  var Holz_kosten=$x('//a[text()="Holz"]/../../td[3]')[0].textContent.replace(/[^0-9\.]/g,"")*1;
  //var Holz_max=Math.round(Kontostand/Holz_kosten);
  var Holz_kaufen=$x("//a[text()='Holz']/../../td/input")[0];
  var Anz_Holz_Kaufen=20;  // 20 = 1 Hütte
  if (Holz_kosten*600+20*300 <  Kontostand)
  {
    var Anz=Math.floor(Kontostand / (Holz_kosten*600+20*300));
    if (Anz>10) Anz=10;
    Holz_kaufen.value=Anz*600;
    unsafeWindow.xajax_ajaxbuyres(unsafeWindow.xajax.getFormValues('buyresform'));
    //location.reload();
    //window.location.href="http://bausim.net/ingame/index.php?page=prod_waren";
  }
  Next(true);
}

function Produktionswarteschlange()
{
  var Bretter_anzahl=$x("//h2[text()='Bretter']/../../..//input[@type='text']")[0];
  var Bretter_max=0;
  if ($x("//h2[text()='Bretter']/../../..//a[contains(text(),'Max')]")[0])
    Bretter_max=$x("//h2[text()='Bretter']/../../..//a[contains(text(),'Max')]")[0].textContent.replace(/[^0-9\.]/g,"")*1;
  //if (Bretter_max>=20)
  if (Bretter_max>=1)
  {
    Bretter_anzahl.value=Bretter_max;
    //Bretter_anzahl.value=20;
    Timeout(function () {
      GM_log("Submit Produktionswarteschlange");
      //Bretter_anzahl.form.action="index.php?page=buy_res"
      //Bretter_anzahl.form.method="get";
      Bretter_anzahl.form.submit();
    },10*1000);
  } else Next(true); //window.location.href="http://bausim.net/ingame/index.php?page=bauauftrag";
}

function Bauauftraege()
{

  var Huetten_anzahl=$x("//h2[text()='Hütten']/../../..//input[@type='text']")[0];
  var Huetten_submit=$x("//h2[text()='Hütten']/../../..//input[@type='submit']")[0];
  //var Huetten_form=$x("//h2[text()='Hütten']/../../..//form")[0];
  var Huetten_max=0;
  if ($x("//h2[text()='Hütten']/../../..//a[contains(text(),'Max')]")[0])
    Huetten_max=$x("//h2[text()='Hütten']/../../..//a[contains(text(),'Max')]")[0].textContent.replace(/[^0-9\.]/g,"")*1;
  if (Huetten_max>=1)
  {
    if (Huetten_max>10)
      Huetten_anzahl.value=10;
    else
      Huetten_anzahl.value=Huetten_max;
    Huetten_anzahl.form.action=window.location.href;
    Huetten_anzahl.form.method="post";
    Timeout(function () {
      GM_log("Submit Bauaufträge");
      /*var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);
      Huetten_submit.dispatchEvent(evt);*/
      GM_log("Submit Bauaufträge OK");
      //Huetten_anzahl.form.submit();
    },1*1000);
    //Timeout(function () { Huetten_form.submit(); },10*1000);
    Next(true);
  } else Next(true); //window.location.href="http://bausim.net/ingame/index.php?page=ubersicht";
}
