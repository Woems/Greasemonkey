// ==UserScript==
// @name           Wiedervorlage
// @namespace      Woems
// @description    Seite auf wiedervorlage legen
// @include        *
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xhtmlrequest
// @grant          GM_openInTab
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require        https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// @require        https://github.com/Woems/Greasemonkey/raw/master/funktionssammlung/funktionssammlung.user.js
// ==/UserScript==

if (!inFrame())
{
globaleTasten();
//window.setInterval(function () { wvNow(); },20*1000);
wvNow();
//wvShow();
}

function globaleTasten () {
  Key('STRG+ALT+y',function (e) { // Taste zum aktivieren
    wvShow();
  });
  /*
  Key('STRG+ALT+x',function (e) { // Taste zum aktivieren
    wvAdd('http://www.kinopolis.de/bn/programm_wochenansicht', 'Kinopolis', 'weekly on do');

    wvAdd('http://www.google.com/calendar/render', 'Google Kalender', 'weekly');

    wvAdd('http://www.google.com/reader/view/', 'Google Reader', 'daily');
    wvAdd('http://vs-bn.de/', 'VideoStore Bonn', 'daily');
    wvAdd('http://www.elwis.de/gewaesserkunde/Wasserstaende/wasserstaendeUebersichtGrafik.html.php?pegelId=b45359df-c020-4314-adb1-d1921db642da', 'Elwis', 'daily');
    
    wvAdd('http://www.nexusboard.net/forumdisplay.php?siteid=2408&forumid=40122', 'H0-Modellbahnforum - Anlagenbau', 'hourly');
  });
  */
/*  Key('STRG+ALT+y',function (e) { // Taste zum aktivieren
    var webseiten=deserialize('webseiten',[]);
    webseiten.push({ url: location.href, host: location.host, titel:document.title });
    alert("'"+document.title+"'\nzur Wiedervorlage hinzugefügt...\nSTRG+ALT+x zum abrufen der "+webseiten.length+" Seiten.");
    serialize('webseiten',webseiten);
  });
  Key('STRG+ALT+x',function (e) { // Taste zum aktivieren
    var webseiten=deserialize('webseiten',[]);
    if (webseiten.length==0) alert("Keine Seiten mehr gespeichert");
    var w=webseiten.pop();
    location.href=w.url;
    serialize('webseiten',webseiten);
  });
  $x("//a[@href]").forEach(function (a) { a.addEventListener("mousedown",function(event){
    var e=event.target;
    while (!e || !e.href) e=e.parentNode;
    //GM_log("Target: "+e+"\nEvent: "+event+"\nCTRL: "+event.ctrlKey+"\nALT: "+event.altKey);
    if (event.ctrlKey && event.altKey)
    {
      var webseiten=deserialize('webseiten',[]);
      webseiten.push({ url: event.target.href, host: "", titel:event.target.textContent });
      alert("'"+event.target.textContent+"'\nzur Wiedervorlage hinzugefügt...\nSTRG+ALT+x zum abrufen der "+webseiten.length+" Seiten.");
      serialize('webseiten',webseiten);    
      event.stopPropagation(); event.preventDefault();
    }
  }, true); });*/
} // End globaleTasten


function wvAdd(Url, Titel, Wiederhohlung)
{
  Url=prompt("URL:",Url);
  if (!Url) return;
  var exist=deserialize('WV',[]).filter(function (e) { return e.url==Url; });
  Titel=prompt("Titel:",Titel||(exist.length > 0?exist[0].t:''));
  if (!Titel) return;
  Wiederhohlung=prompt("minut(e|ly), hour(ly), da(y|ily), week(ly) (on do|;4), month(ly), year(ly):",Wiederhohlung||(exist.length > 0?exist[0].wh:''));
  if (!Wiederhohlung) return;
  wvDel(Url)
  var WV=deserialize('WV',[]);
  WV.push({ url:Url, t:Titel, wh:Wiederhohlung, last:new Date() });
  serialize('WV',WV);
  //wvShow();
} // End: function wvAdd()

function wvChange(Url)
{
  deserialize('WV',[]).forEach(function (cwv) {
    if (cwv.url==Url)
    {
      showmsg({
        url: Url,
        id: "default_msg_{rand}",
        text: ["Url: "+HTML.input("text","wUrl",cwv.url,"",80)+"<br>"+cwv.url.split(",").join("<br>"),
               "Titel: "+HTML.input("text","wTitel",cwv.t),
               "Wiederhohlung: "+HTML.input("text","wWh",cwv.wh),
               "Last: "+cwv.last, ""].join("<br>"),
        color: "lightgray",
        OK: "Ok",
        Cancel: "Cancel",
        onOK: function (data) {
          var WV=deserialize('WV',[]);
          WV=WV.map(function (f) { if (f.url==data.url) { f.url=data.wUrl.value; f.t=data.wTitel.value; f.wh=data.wWh.value; }; return f; });
          serialize('WV',WV);
          //alert([data.url,data.wUrl.value,data.wTitel.value,data.wWh.value].join("\n\n"));
        },
        onCancel: function (data) {},
      });
    }
  });
}

function wvDel(Url)
{
  var WV=deserialize('WV',[]);
  WV=WV.filter(function (e) { return e.url!=Url; });
  serialize('WV',WV);
  //wvShow();
} // End: function wvDel()

function wvCheck(Url) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) f.last=new Date(); return f; });
  serialize('WV',WV);
} // End: function wvOpen()

function wvUrlRotate(Url) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) { var u=f.url.split(","); var fu=u.shift(); u.push(fu); /*alert("-> "+f.url+"\n-> "+u.join(","));*/ f.url=u.join(","); } return f; });
  serialize('WV',WV);
  
} // End: function wvUrlRotate()

function Rand(min, max) { return Math.floor(min+Math.random()*(max-min)); }

function wvAufschieben(Url,sec) {
  var WV=deserialize('WV',[]);
  WV=WV.map(function (f) { if (f.url==Url) { f.aufschieben=new Date(new Date().getTime()+(sec||30)*60*1000); f.wait=sec; } return f; });
  serialize('WV',WV);
} // End: function wvOpen()

function dump2(obj, deep) {
  if (typeof obj=="object")
    if (obj instanceof Array)
    {
      var tmp=[];
      for (j in obj) if (obj.hasOwnProperty(j))
        tmp.push(dump2(obj[j], deep));
        return "[ "+tmp.join(", ")+" ]";
    } else if (obj instanceof Date) {
      return obj.toLocaleString();
    } else {
      var tmp=[]; deep=(deep||'')+'   ';
      for (j in obj) if (obj.hasOwnProperty(j))
        tmp.push(deep+j+" = "+dump2(obj[j], deep));
      return "{\n"+tmp.join(",\n")+"\n"+deep+"}";
    }
  return (typeof obj=="string")?"'"+obj+"'":obj;
}


function wvNow() {
  var Z={ minute: 60*1000, hour:60*60*1000, day: 20*60*60*1000, week: 7*24*60*60*1000, month:30*24*60*60*1000, year:365*24*60*60*1000 };
  var F={ minutly: 'getMinutes', hourly:'getHours', daily:'getDate', monthly:'getMonth', yearly:'getFullYear' }
  var WV=deserialize('WV',[]);
  WVaktiv=WV.filter(function (ewv) {
    var now=new Date();
    if ((!ewv.aufschieben || ewv.aufschieben < now.getTime()) &&
       (!ewv.last
       || (Z[ewv.wh] && ewv.last.getTime()+Z[ewv.wh] < now.getTime())
       || (F[ewv.wh] && ewv.last[F[ewv.wh]]() != now[F[ewv.wh]]())
       //|| (ewv.wh=='minutly' && ewv.last.getMinutes() != now.getMinutes())
       //|| (ewv.wh=='hourly' && ewv.last.getHours() != now.getHours())
       //|| (ewv.wh=='daily' && ewv.last.getDate() != now.getDate())
       //|| (ewv.wh=='monthly' && ewv.last.getMonth() != now.getMonth())
       //|| (ewv.wh=='yearly' && ewv.last.getFullYear() != now.getFullYear())
       || (ewv.wh.split(";")[0]=='weekly' && ewv.last.getTime()+(((ewv.wh.split(";")[1]||0)+6-ewv.last.getDay())%7+1)*24*60*60*1000 < now.getTime()) // Tag + (6 - Wochentag) = Montag
       || (ewv.wh=='weekly on do' && ewv.last.getTime()+((10-ewv.last.getDay())%7+1)*24*60*60*1000 < now.getTime()) // Tag + (4+6 - Wochentag) = Donnerstag
       ))
    {
      return true;
    } else {
      return false;
    }
  });
  if (WVaktiv.length>0)
  { 
    ShowWV(WVaktiv[Rand(0,WVaktiv.length-1)]);
  }
} // End: function wvNow()

function ShowWV(wvo)
{
  var wvot=wvo
  noty({
    text: [
      //'<a target="_blank" title="'+wvo.wh+' / '+wvo.last+'" href="'++'">'+wvo.t+'</a> öffnen?',
      '<h2>'+wvo.t+'</h2>',
      '<b>Wiedervorlage:</b> '+wvo.wh,
      '<b>Letzte WV:</b>',
      wvo.last,
    ].join("<br>"),
    type: "alert",
    timeout: wvo.wait*1000,
    layout: "bottomRight",
    buttons: [
		  {addClass: 'btn btn-primary', text: 'in Tab', onClick: function($noty) {
				// this = button element // $noty = $noty element
        wvCheck(wvot.url);
        wvUrlRotate(wvot.url);
        //GM_openInTab(wvot.url);
        GM_openInTab(wvot.url.split(",")[0]);
				$noty.close();
				noty({text: 'You clicked "Ok" button', type: 'success', timeout: 2000 });
			}
		},
		  {addClass: 'btn btn-primary', text: 'Öffnen', onClick: function($noty) {
				// this = button element // $noty = $noty element
        wvCheck(wvot.url);
        wvUrlRotate(wvot.url);
        //GM_openInTab(wvot.url);
        location.href = wvot.url.split(",")[0];
				$noty.close();
				noty({text: 'You clicked "Ok" button', type: 'success', timeout: 2000 });
			}
		},
		{addClass: 'btn btn-danger', text: 'Abbrechen', onClick: function($noty) {
				$noty.close();
				noty({text: 'You clicked "Cancel" button', type: 'error', timeout: 2000 });
			}
		}
	]
  });
      /*
      showmsg({
          id:'WV_oeffnen_{rand}', // _{rand}
          text:'<p><a target="_blank" title="'+wvo.wh+' / '+wvo.last+'" href="'+wvo.url.split(",")[0]+'">'+wvo.t+'</a> öffnen?</p>',
          fixed: true,
          url: wvo.url,
          wait: wvo.wait,
          //sec:r, 
          color:'red',
          OK:'OK',
          onOK:function (e) { wvCheck(e.url); wvUrlRotate(e.url); $xs(".//a",e.box).click(); },//GM_openInTab(e.url); },
          Cancel:'Aufschieben', // um '+r+'min
          onCancel:function (e) { 
            e.wait=prompt("Wartezeit in min:",e.wait||10);
            wvAufschieben(e.url, e.wait);
            
            //if (typeof deserialize('waittime')!="object") serialize('waittime',{});
            //var WaitTime=aget('waittime',e.url)||30;
            //WaitTime=prompt("Wartezeit in min:",WaitTime); //e.sec
            //aset('waittime',e.url,WaitTime);
            
            //var WaitTime=aget("data","Aufschieben",20);
            //WaitTime=prompt("Wartezeit in min:",WaitTime>20?WaitTime-5:WaitTime<20?WaitTime+5:WaitTime); //e.sec
            //aset("data","Aufschieben",WaitTime)
            
            //wvAufschieben(e.url, WaitTime);
            
            },
          Timeout:20,
          onTimeout:function (e) { },
          //onTimeout:function (e) { wvCheck(e.url); wvUrlRotate(e.url); GM_openInTab(e.url.split(",")[0]); },
      });
      */
}

function markdiff(out, orig)
{
  var tmp=['','',''];
  for (var i=0; i<out.length; i++)
  {
    if ('0123456789'.indexOf(out[i])!=-1)
    {
      tmp[1]+=out[i];
      tmp[2]+=orig[i];
    } else {
      tmp[0]+=(tmp[1]==tmp[2] ? tmp[1] : '<b>'+tmp[1]+'</b>')+out[i];
      tmp[1]='';
      tmp[2]='';
    }
  }
  tmp[0]+=(tmp[1]==tmp[2] ? tmp[1] : '<b>'+tmp[1]+'</b>');
  return tmp[0].replace(/<\/b><b>/g,'');
}

function wvShow()
{
  var WV=deserialize('WV',[]);
  WV.sort(function (a,b) { return a.last-b.last; }).forEach(function (swv) {
    var now=new Date();
    var laststr=swv.last.toLocaleDateString()+' '+swv.last.toLocaleTimeString();
    var nowstr=now.toLocaleDateString()+' '+now.toLocaleTimeString();
    aufs=Math.round((swv.aufschieben-new Date().getTime())/1000/60);
    showmsg({
      id:'WV_anzeigen_{rand}',
      text:'<a href="'+swv.url+'">'+swv.t+'</a>: <b>'+swv.wh+'</b> / '+markdiff(laststr,nowstr)+(aufs>0?' / <b><u>noch '+aufs+' min</u></b>':''),
      color:'lightgray',
      OK: 'Bearbeiten',
      onOK:function (e) { wvChange(swv.url); },
      Cancel: 'löschen',
      onCancel:function (e) { wvDel(swv.url); },
      Timeout:30,
      onTimeout:function (e) {},
    });
  });
    showmsg({
      id:'WV_anzeigen',
      text:'Neuen Eintrag hinzufügen?',
      color:'lightgray',
      OK: 'Ja',
      onOK:function (e) { wvAdd(); },
      Cancel: 'Nein',
      onCancel:function (e) {},
      Timeout:30,
      onTimeout:function (e) {},
    });
}
