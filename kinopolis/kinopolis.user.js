// ==UserScript==
// @name           Kinopolis
// @namespace      Woems
// @include        http://www.kinopolis.de/*/spielplan_neu/spielplan*.html*
// @summary        Verstecken oder hervorheben von Filmen auf http://kinopolis.de
// ==/UserScript==

Userscript_Version='0.1';

function autoUpdateFromUserscriptsDotOrg(URL,Version) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    var now = new Date().getTime();
    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return 2;
    GM_setValue('LAST_CHECKED', now.toString());
    GM_xmlhttpRequest({
      method: 'GET',
      url: URL + '?source', // don't increase the 'installed' count just for update checks
      onload: function(result) {
        if (!result.responseText.match(/Userscript_Version[\s='"]+([\d.]+)[\s='";]+/)) return 3;     // did not find a suitable version header
        var theOtherVersion = RegExp.$1;
        if (parseFloat(theOtherVersion) <= parseFloat(Version)) return 4;      // no updates or older version on userscripts.org site
        if (!result.responseText.match(/@name\s+(.+)/)) return 5;     // did not find a suitable
        userscript_Name=RegExp.$1;
        if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + userscript_Name + '" is available.\nYour installed version is ' + Version + ' .\n\nUpdate now?\n')) {
          GM_openInTab(URL);   // better than location.replace as doing so might lose unsaved data
        }
      }
    });
  } catch (ex) {
  }
}
autoUpdateFromUserscriptsDotOrg('http://userscripts.org/scripts/source/13148.user.js',Userscript_Version);


var Einstellungen = new Object();
Einstellungen['new']      = ({Beschreibung: "? neu",                    Color: "Khaki",         Display: ''     });
Einstellungen['bad']      = ({Beschreibung: "- - will ich nicht sehen", Color: "lightsalmon",  Display: 'none' });
Einstellungen['seen']     = ({Beschreibung: "O gesehen",                Color: "lavender",     Display: 'none' });
Einstellungen['can_see']  = ({Beschreibung: "+ will ich sehen",         Color: "lightcyan",    Display: ''     });
Einstellungen['must_see'] = ({Beschreibung: "++ muss ich sehen",        Color: "lightblue",    Display: ''     });
//Einstellungen['woems']    = ({Beschreibung: "Woems",                    Color: "blue",         Display: ''     });






function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

function ZeileFaerben(Zeile, Farbe1, Farbe2)
{
  if (!Farbe2) Farbe2=Farbe1;
  $x('../td',Zeile).forEach(function(t) {
    if (t.className=="zeit1")
      t.style.backgroundColor=Farbe2;
    else
      t.style.backgroundColor=Farbe1;
  });
  var z=Zeile.parentNode;
  for (var i=1; i<Zeile.rowSpan; i++)
  {
    z=z.nextSibling.nextSibling;
    $x('./td',z).forEach(function(t) {
      if (t.className=="zeit1")
        t.style.backgroundColor=Farbe2;
      else
        t.style.backgroundColor=Farbe1;
    });
  }
}

function ZeileVerstecken(Zeile,Display)
{
  // Display = 'none' (=hide) || '' (=show)
  $x('../td',Zeile).forEach(function(t) {
    t.style.display=Display;
  });
  var z=Zeile.parentNode;
  for (var i=1; i<Zeile.rowSpan; i++)
  {
    z=z.nextSibling.nextSibling;
    $x('./td',z).forEach(function(t) {
      t.style.display=Display;
    });
  }
}

function LinksEinfügen(Zeile,Titel,Wert,Einstellungen)
{
  Auswahlbox='<br><br><select size="1" name="'+Titel+'">';
  for (i in Einstellungen)
    Auswahlbox+='<option value='+i+'>'+Einstellungen[i]['Beschreibung']+'</option>';
  Auswahlbox+='</select>';
  $x('../td',Zeile)[2].innerHTML+=Auswahlbox;
  /*
  $x('../td',Zeile)[2].innerHTML+='<br><br><select size="1" name="'+Titel+'">\
<option value=new>? neu</option>\
<option value=bad>- - will ich nicht sehen</option>\
<option value=seen>O gesehen</option>\
<option value=can_see>+ will ich sehen</option>\
<option value=must_see>++ muss ich sehen</option>\
</select>';
*/
  //if (!Wert) Wert='new';
  Optionen=$x('../td/select/option[@value="'+Wert+'"]',Zeile);
  if (Optionen && Optionen.length>0)
    Optionen[0].selected=true;
  $x('../td/select',Zeile)[0].addEventListener('change',function(event) {
    var filme = deserialize('filme'); // new, seen, must_see, can_see, bad
    filme[Titel]=event.target.value;
    serialize('filme', filme);
    event.stopPropagation();
    event.preventDefault();
  }, true);
}


var hiddenLines=new Array();
var filme = deserialize('filme'); // new, seen, must_see, bad
var unsichtbare_filme = new Object();;
for (i in filme)
  unsichtbare_filme[i] = filme[i];
$x('id("spielplan")/table//td[@class="plakat"]').forEach(function(Zeilen) {
  Image=$x('.//img',Zeilen)[0].src;
  Titel=$x('../td[3]/a',Zeilen)[0].innerHTML.replace(/ *\(.*\) */,''); // .replace(/^OV: */,'')
  //GM_log('\nTitel: '+$x('../td[3]/a',Zeilen)[0].innerHTML+'\nTitel: '+Titel+'\nWert: '+filme[Titel]);
  LinksEinfügen(Zeilen,Titel,filme[Titel],Einstellungen);
  //unsichtbare_filme[Titel]+=" (only hidden)";
  if (Einstellungen[filme[Titel]])
  {
    ZeileVerstecken(Zeilen, Einstellungen[filme[Titel]]['Display']);
    ZeileFaerben(Zeilen, Einstellungen[filme[Titel]]['Color']);
    if (Einstellungen[filme[Titel]]['Display']=='')
      unsichtbare_filme[Titel]="";
  }
  else
  {
    unsichtbare_filme[Titel]="";
    if (isNaN(filme[Titel]))
      filme[Titel]=3;
    filme[Titel]--;
    if (filme[Titel]<=0)
      filme[Titel]='new';
    ZeileFaerben(Zeilen, 'orange')
  }
  //GM_log(AnzahlKinos+'\n'+Titel+'\n'+Image);
  //new Array();
});

listen = new Object();
for (i in unsichtbare_filme)
  if (unsichtbare_filme[i]!='')
    if (!listen[unsichtbare_filme[i]])
      listen[unsichtbare_filme[i]]=i+'<br>';
    else
      listen[unsichtbare_filme[i]]+=i+'<br>';

var newNode = document.createElement("div");
$x("id('spielplan')/table")[0].parentNode.insertBefore(newNode, $x("id('spielplan')/table")[0].nextSibling);
tabelle='';
for (i in listen)
{
  if (!Einstellungen[i])
    GM_log('Keine Einstellung "'+i+'" vorhanden');
  else
    tabelle+='<td><h2>"'+Einstellungen[i]['Beschreibung']+'"</h2>'+listen[i]+'</td>';
}
newNode.innerHTML+='<table><tr>'+tabelle+'</tr></table>';


serialize('filme', filme);
