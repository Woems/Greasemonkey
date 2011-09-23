// ==UserScript==
// @name           Wurzelimperium - Giessscript
// @namespace      Woems
// @description    Automatisches setzen, giessen und ernten der Pflanzen
// @include        http://s*.wurzelimperium.de*
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

function createElement(type, attributes){
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}
/*
Example usage:
var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
document.body.previousSibling.appendChild(styles);
*/

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
var server = reg.exec(loc)[1];
var page = reg.exec(loc)[2];

switch (page) {
case "main"	  : do_main();break;
case "garten_map" : do_garten_map();break;
case "verkauf_map": do_verkauf_map();break;
}

function do_main()
{

}

function do_garten_map()
{
  var button_saehen = createElement('button', {type: 'button', id: 'g_saehen', style: 'position:fixed;top:0px;left:400px;width:100px;height:20px;'});
  button_saehen.innerHTML='S&auml;hen';
  button_saehen.addEventListener("click",function(button){
    $("g_saehen").disabled=true;
    var list=new Array();
    for (var i=1; i<unsafeWindow.garten_name.length; i++)
      if (unsafeWindow.garten_kategorie[i]=="")
        list.push(i);
    var len=prompt("Anzahl: ",list.length);
    for (var i=0;i<len;i++){
      window.setTimeout(function () {
        if (list) {
          var j=list.shift();
          if (j && unsafeWindow.garten_kategorie[j]==''){
            window.location.href="javascript: parent.show_built("+j+",'over');";
            window.location.href="javascript: parent.cache_me("+j+","+unsafeWindow.garten_prod[j]+",'"+unsafeWindow.garten_kategorie[j]+"')";
            window.location.href="javascript: parent.show_built("+j+",'out');";
          }
        }
      },300*i);
    }
    $("g_saehen").disabled=false;
  },true);   document.body.appendChild(button_saehen);

  var button_giessen = createElement('button', {type: 'button', id: 'g_giessen', style: 'position:fixed;top:0px;left:500px;width:100px;height:20px;'});
  button_giessen.innerHTML='Gie�en';
  button_giessen.addEventListener("click",function(button){
    $("g_giessen").disabled=true;
    window.location.href="javascript: parent.selectMode(2,true,top.selected);";
    for (var i=1; i<unsafeWindow.garten_name.length; i++)
    {
      if (unsafeWindow.garten_kategorie[i]=="v" && unsafeWindow.garten_wasser[i]<(new Date()).getTime()/1000)
      {
        //window.location.href="javascript: parent.show_built("+j+",'over');";
        window.location.href="javascript: parent.cache_me("+i+","+unsafeWindow.garten_prod[i]+",'"+unsafeWindow.garten_kategorie[i]+"')";
        //window.location.href="javascript: parent.show_built("+j+",'out');";
       /*GM_log("\nPflanze:  "+unsafeWindow.garten_name[i]+" ("+unsafeWindow.garten_kategorie[i]+")\
               \nStatus:   Gie�en?\
               \nZeit akt: "+((new Date()).getTime()/1000)+"\
               \nZeit:     "+unsafeWindow.garten_zeit[i]+"\
               \nWasser:   "+unsafeWindow.garten_wasser[i]);*/
       // u Unkraut+Stein+Maulwurf, v Pflanze , z Deko , " leer
       }
    }
    $("g_giessen").disabled=false;
  },true);   document.body.appendChild(button_giessen);
}

//parent.cache_me(193, garten_prod[193], garten_kategorie[193] )
/*
garten_prod[2] = 42;
garten_x[2] = 1;
garten_y[2] = 1;
garten_max_x[2] = 1;
garten_max_y[2] = 1;
garten_name[2] = "Baumstumpf";
garten_gttpic[2] = "baumstumpf_04";
garten_zeit[2] = 0;
garten_ernte[2] = 0;
garten_wasser[2] = 0;
garten_kategorie[2] = "u";
garten_entf[2] = "250";
*/

function do_verkauf_map()
{

}
