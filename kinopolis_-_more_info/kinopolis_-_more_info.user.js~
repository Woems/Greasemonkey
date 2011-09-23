// ==UserScript==
// @name           Kinopolis - More info
// @namespace      Woems
// @include        http://www.kinopolis.de/filme/filminfo.dhtml?filmoid=*
// ==/UserScript==

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

function iframe(url,className,w,h,noframetext)
{
  var iframe=document.createElement("iframe");
  iframe.src=url;
  iframe.className=className;
  iframe.width=w;
  iframe.height=h;
  iframe.innerHTML=noframetext;
  return iframe;
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText) }
  })
}



$x("/html/body/div/div/div/div/h1")[0].id="Titel";
$x("/html/body/div/div/div/div[2]/table/tbody/tr/td[2]/table")[0].id="TabelleInhalt";
$("Titel").innerHTML=$("Titel").innerHTML.replace(/([\:\- ]*(3D|OV|\(Orig.\))[\:\- ]*)/,"");

//********** Moviemace Infos abrufen ****************
var tr=document.createElement("tr");
var td=document.createElement("td");
td.colSpan=2;
td.id="Trailer";
tr.appendChild(td);
$("TabelleInhalt").appendChild(tr);

get("http://www.moviemaze.de/suche/result.phtml?searchword="+$("Titel").innerHTML+"&x=27&y=11",function (text) {
  var suchehtml=document.createElement("div");
  suchehtml.innerHTML=text;
////a[text()="Trailer"]/preceding::td[1]/descendant::b
  $x("//a[text()='Trailer']",suchehtml).forEach(function (e) {
//  $x("//table//table//tr[2]//table//tr[2]/td[3]//table[2]//td[2]/a",suchehtml).forEach(function (e) {
//    alert(e.href.replace(/kinopolis/,"moviemaze"));
    var TrailerBereich=document.createElement("div");
    var TrailerBereichTitel=document.createElement("h2");
    TrailerBereichTitel.innerHTML=$x('./preceding::td[1]/descendant::b',e)[0].innerHTML;
    TrailerBereich.appendChild(TrailerBereichTitel);
    $("Trailer").appendChild(TrailerBereich);
    get(e.href.replace(/kinopolis/,"moviemaze"),function (text) {
      var html=document.createElement("div");
      html.innerHTML=text;
      $x("//td[text()='Flash']",html).forEach(function (e) {
        var MB=$x('./following::td[1]',e)[0].innerHTML;
        var Link=$x('./following::td[2]/a',e)[0].href.replace(/kinopolis/,"moviemaze");
        var Flagge=$x('./ancestor::tbody[1]/tr[1]/td[3]/img',e)[0].src.replace(/kinopolis/,"moviemaze");
        var Bezeichnung=$x('./ancestor::td[2]/b',e)[0].innerHTML;
        var Laenge=$x('./ancestor::td[2]/text()[2]',e)[0].textContent;
        var div=document.createElement("div");
        div.innerHTML="<a target='_blank' href='"+Link+"'><img src='"+Flagge+"'> "+Bezeichnung+" "+Laenge+" ("+MB+")</a>";
        TrailerBereich.appendChild(div);
      });  
    });  
  });  
  //alert("rofl");
});

//********* iframe-Boxen einfügen ***********
/**/
//alert("test");
var width=$x("/html/body/div/div/div/div[2]/table/tbody/tr/td[2]/table/tbody/tr[last()-2]")[0].clientWidth;
var tr=document.createElement("tr");
var td=document.createElement("td");
var a=document.createElement("a");
a.href="#"
a.textContent="Advanced"
a.addEventListener('click',function(event) {
    $("advanced").style.display=($("advanced").style.display=="")?"none":"";
    event.stopPropagation();
    event.preventDefault();
  }, true);
td.appendChild(a);
tr.appendChild(td);
var td=document.createElement("td");
td.colSpan=2;
td.id="advanced";
td.style.display="none";
td.appendChild(iframe("http://www.moviemaze.de/suche/result.phtml?searchword="+$("Titel").innerHTML+"&x=27&y=11","iframe_movimaze",width-10,300,"<a href=>Google</a>"));
td.appendChild(iframe("http://google.de/search?q="+$("Titel").innerHTML,"iframe_google",width-10,300,"<a href=>Google</a>"));
tr.appendChild(td);
$("TabelleInhalt").appendChild(tr);
//alert("test");
/**/
