// ==UserScript==
// @name           Rapidshare Downloadmanager
// @namespace      Woems
// @include        *
// @summary        Rapidshare-Links werden automatisch in eine Queue gepackt und der Reihe nach heruntergeladen. Die Rapidshare Seite wurd zu 99% automatisch bedient (bis auf das Captcha)
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
autoUpdateFromUserscriptsDotOrg('http://userscripts.org/scripts/source/13150.user.js',Userscript_Version);


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


var linkcolor=new Object();
linkcolor['dl']='GoldenRod';
linkcolor['run']='DarkGrey';
linkcolor['finish']='green';
linkcolor['error']='red';

var rapidshare=0;
if (document.URL.indexOf('rapidshare')!=-1)
{
  rapidshare=1;
  Form=$x("//input[@value='Free']");
  if (Form.length==1)
  {
    GM_log('\n"Free" klick');
    Form[0].click();
  }

  dl_limit=$x("//*[text()='Du hast das Downloadlimit für die kostenlose Nutzung erreicht. Willst du mehr runterladen?']");
  if (dl_limit.length==1)
  {
    timer=1*60; // in sec
    timerdiff=1*60 // in 0-sec
    timer=Math.round(timer*1000+timerdiff*1000*Math.random());
    File=$x("id('content')/div/div/p[3]/font")[0].innerHTML;
    rs_links=deserialize('Rapidshare Links')
    rs_links[File.match(/files.*/)[0]]='error';
    serialize('Rapidshare Links', rs_links);
    alert('Downloadlimit erreicht');
    GM_log('\nstarte Timer für '+timer/1000+'sec\n'+timer/60/1000+'min\n(Downloadlimit erreicht)\n'+File);
    window.setTimeout(function () {
      GM_log('zurück');
      window.back();
    }, timer);
  }

  dl_laeuft=$x("//p[contains(text(),'lädt bereits eine Datei runter')]");
  if (dl_laeuft.length==1)
  {
    timer=10*60; // in sec
    timerdiff=10*60 // in 0-sec
    timer=Math.round(timer*1000+timerdiff*1000*Math.random());
    File=$x("id('content')/div/div/p[3]/font")[0].innerHTML;
    rs_links=deserialize('Rapidshare Links')
    rs_links[File.match(/files.*/)[0]]='error';
    serialize('Rapidshare Links', rs_links)
    GM_log('\nstarte Timer für '+timer/1000+'sec\n'+timer/60/1000+'min\n(Download läuft bereits)\n'+File);
    window.setTimeout(function () {
      GM_log('zurück');
      window.back();
    }, timer);
  }

  Capcha=$x("//input[@name='accesscode']");
  if (Capcha.length==1)
  {
    File=$x("id('content')/div/div/p[4]/font")[0].innerHTML;
    rs_links=deserialize('Rapidshare Links')
    GM_log('\nCapcha\n'+File+'\nAktueller Status: '+rs_links[File.match(/files.*/)[0]]+'\nNeuer Status: Finish');
    rs_links[File.match(/files.*/)[0]]='finish';
    serialize('Rapidshare Links', rs_links)
    $x("id('content')/div/div/form/h3/img")[0].scrollIntoView(true);
    alert('Bitte Capcha eingeben');
    Capcha[0].focus();
    $x("//input[@type='submit']")[0].addEventListener('click',function(event) {
      var dl=new Array();
      for (i in rs_links)
      {
        if (rs_links[i]=='dl')
          dl.push(i);
      }
      //GM_log('\nDownloads offen: '+dl.length+'\nnext Download: '+dl[0]);
      if (dl.length>0)
      {
        GM_setValue('lastDL',jetzt.getTime().toString());
        GM_openInTab('http://rapidshare.com/'+dl[0]);
      }
      //event.stopPropagation();
      //event.preventDefault();
    }, true);
  }

  zu_viele_benutzer=$x("//b[contains(text(),'Zu viele Benutzer laden gerade Dateien runter')]");
  if (zu_viele_benutzer.length==1)
  {
    timer=10*60; // in sec
    timerdiff=10*60 // in 0-sec
    timer=Math.round(timer*1000+timerdiff*1000*Math.random());
    File=$x("id('content')/div/div/p[3]/font")[0].innerHTML;
    rs_links=deserialize('Rapidshare Links')
    rs_links[File.match(/files.*/)[0]]='error';
    serialize('Rapidshare Links', rs_links)
    GM_log('\nstarte Timer für '+timer/1000+'sec\n'+timer/60/1000+'min\n(Zu viele Benutzer)\n'+File);
    window.setTimeout(function () {
      GM_log('zurück');
      window.back();
    }, timer);
  }
  
  rs_links=deserialize('Rapidshare Links');
  mm='';
  for (i in rs_links)
  {
    //if (rs_links[i]=='dl')
      mm+='<div  style="color:'+(rs_links[i]?linkcolor[rs_links[i]]:'SaddleBrown')+';"><a href="http://rapidshare.com/'+i+'">'+i+' ('+rs_links[i]+')</a></div>';
  }

  var div=document.createElement('center');
  div.innerHTML=mm;
  div.style.color='black';
  $x("/html/body")[0].appendChild(div);

  var jetzt = new Date();
  GM_setValue('lastDL',jetzt.getTime().toString());
}

var rs_links=deserialize('Rapidshare Links');

var jetzt = new Date();
old=20*60*1000+parseInt(GM_getValue('lastDL','0'));
//GM_log('\njetzt: '+jetzt.getTime()+'\nlastDL: '+old+'\nlastDL: '+(old-jetzt.getTime())/60/1000);
if (jetzt.getTime()>20*60*1000+parseInt(GM_getValue('lastDL','0')))
{
  var dl=new Array();
  for (i in rs_links)
  {
    if (rs_links[i]=='dl')
      dl.push(i);
  }
  //GM_log('\nDownloads offen: '+dl.length+'\nnext Download: '+dl[0]);
  if (dl.length>0)
  {
    GM_setValue('lastDL',jetzt.getTime().toString());
    GM_openInTab('http://rapidshare.com/'+dl[0]);
  }
}

$x('//a[contains(@href,"rapidshare.com/files/")]').forEach(function (e) {
  link=e.href.match(/files.*/)[0];
  //GM_log('\nRapidsharelink: '+e.href+'\nStaus: '+rs_links[link]+'\nColor: '+linkcolor[rs_links[link]]);
  e.style.color=(rs_links[link]?linkcolor[rs_links[link]]:'SaddleBrown');
  //if (!rapidshare)
    e.addEventListener('click',function(event) {
      link=event.target.href.match(/files.*/)[0];
      rs_links=deserialize('Rapidshare Links')
      rs_links[link]=(rs_links[link]=='dl'?'finish':'dl');
      serialize('Rapidshare Links', rs_links)
      //alert(event.target.href+' zur DL liste hinzugefügt!');
      event.target.style.color=linkcolor[rs_links[link]];
      event.stopPropagation();
      event.preventDefault();
    }, true);
});

GM_registerMenuCommand('Rapidshare - Colors Refresh',function (t) {
  var rs_links=deserialize('Rapidshare Links');
  $x('//a[contains(@href,"rapidshare.com/files/")]').forEach(function (e) {
    link=e.href.match(/files.*/)[0];
    //GM_log('\nRapidsharelink: '+e.href+'\nStaus: '+rs_links[link]+'\nColorNeu: '+linkcolor[rs_links[link]]+'\nColorAlt: '+e.style.color);
    e.style.color=(rs_links[link]?linkcolor[rs_links[link]]:'SaddleBrown');
  });
});

GM_registerMenuCommand('Rapidshare - Lösche Fertige Downloads',function (t) {
  rs_links=deserialize('Rapidshare Links')
  rs_links_new=new Object();
  for (i in rs_links)
  {
    if (rs_links[i]!='finish')
      rs_links_new[i]=rs_links[i];
  }
  serialize('Rapidshare Links', rs_links_new)
});