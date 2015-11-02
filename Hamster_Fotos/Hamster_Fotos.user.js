// ==UserScript==
// @name        Hamster Fotos
// @namespace   Woems
// @include     http://de.xhamster.com/*
// @version     1
// @grant       GM_openInTab
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant          GM_xmlhttpRequest
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require        https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// @require        https://github.com/Woems/Greasemonkey/raw/master/funktionssammlung/funktionssammlung.user.js
// ==/UserScript==


// **********************
//      FUNCTIONS
// **********************
function objelem(name) { return function (obj) { return obj[name]; }; }
function doNothing() {}
function hideElem(e) { if (e) e.style.display="none" }
function showElem(e) { if (e) e.style.display="" }
function shElem(e,show) { if (e) e.style.display=show?"":"none" }
function toggleElem(e) { e.style.display=e.style.display=="none"?"":"none"; }
function createToggle(toggle, elems, name)
{
  if (!name) return;
    for (i in elems) if (elems[i].style)
      shElem(elems[i],GM_getValue(name,false));
  toggle.addEventListener("click",function(event){
    if (name) GM_setValue(name,!GM_getValue(name,false))
    for (i in elems) if (elems[i].style)
      shElem(elems[i],GM_getValue(name,false));
    event.defaultPrevented();
  }, true);
}
function createToggleVal(toggle, elems, name)
{
  if (!name) return;
    for (i in elems) if (elems[i].style)
      shElem(elems[i],GM_getValue(name,false));
  toggle.addEventListener("click",function(event){
    if (name) GM_setValue(name,!GM_getValue(name,false))
    for (i in elems) if (elems[i].style)
      shElem(elems[i],GM_getValue(name,false));
    event.defaultPrevented();
  }, true);
}
function preload(page)
{
  if (window.top != window.self)  //-- Don't run on frames or iframes.
    return;
  createElement('iframe', { style:"display:none", src:page }, document.body);
}

// **********************
//      OBJECTS
// **********************

//// XHAMSTER ////
function xhamster()
{
  this.elem = {
    next: $xs('//a[@class="next"]'), //  //a[@title="Klicke zum nächsten Bild >>"]
    prev: $xs('//a[@class="prev"]'),
    play: $xs('//a[@class="play"]'),
    imageContainer: $("imgTop"),
    image: $("imgSized")
  }
  this.elems = {
    smallLinks: $x("id('listSmall')/div/a[img]"),
    smallImages: $x("id('listSmall')/div/a/img"),
    recentLinks: $x("id('listRecent')/div/a[img]"),
    recentImages: $x("id('listRecent')/div/a/img"),
    relatedLinks: $x("id('relatedGalList')/div/a[div/div/img]"),
    relatedImages: $x("id('relatedGalList')/div/a/div/div/img"),
    galeriepages: $x("id('listSmall')/div[2]/*")
  }
  var that=this;
  this.withLinksDo = function (f)
  {
    this.elems.smallImages.forEach(function (img) { var a=img.parentNode; f(img, a, a.href.match(/\/photos\/view\/([0-9]*)-([0-9]*)\.html/)); });
  }
  this.countpages = function ()
  {
    return this.elems.galeriepages.length;
  }
  this.src = function ()
  {
    return {
      image: this.elem.image.src,
      recent: this.elems.recentImages.map(objelem("src")),
      next: this.elem.next.href,
      previous: this.elem.prev.href
    };
  }
  this.next = function ()
  {
    if (this.elem.next.style.color!="green")
    {
      this.elem.next.style.color="green";
      this.elem.next.click();
    }
    return this;
  }
  this.prev = function ()
  {
    if (this.elem.prev.style.color!="red")
    {
      this.elem.prev.style.color="red";
      this.elem.prev.click();
    }
    return this;
  }
  this.color = function (color)
  {
    document.body.style.backgroundColor=color;
    return this;
  }
  this.onNextHover = function (func)
  {
    this.elem.next.addEventListener("mouseover",func, true);
    return this;
  }
  this.onPrevHover = function (func)
  {
    this.elem.prev.addEventListener("mouseover",func, true);
    return this;
  }
  this.openGalerienInTab = function ()
  {
    this.elems.recentLinks.forEach(function (a) {
      a.addEventListener("click",function(event){
        GM_openInTab(event.target.href);
        //event.stopPropagation();
        //event.preventDefault();
        event.defaultPrevented();
      }, true);
    });
    return this;
  }
  this.hideBeliebteBilder = function ()
  {
    $xs("id('recent')/div/div[2]").style.display = "none";
    $("related").style.display = "none";
    return this;
  }
  this.setThumpnailWidth = function (width)
  {
    $("gPreview").style.width=width+"px";
    return this;
  }
  this.slideViewRight = function ()
  {
    createElement("div", { className:"box", childs:[$("slideVew")] }, $("recent"));
    return this;
  }
  this.scrollToImage = function ()
  {
    window.setTimeout(function () {
      that.elem.image.scrollIntoView(true);
    }, 100);
  }
  this.gid = function ()
  {
    return location.pathname.match(/\/photos\/view\/([0-9]*)-([0-9]*)\.html/)[1];
  }
  this.iid = function ()
  {
    return location.pathname.match(/\/photos\/view\/([0-9]*)-([0-9]*)\.html/)[2];
  }
}


//// TRAY ////
function tray()
{
  var data={ id: "tray", elem:false, style:"position:fixed; bottom:30px; right:20px" };
  this.show = function () { if (!data.elem) data.elem=createElement("div",{ id:data.id, style:data.style },document.body); return this; }
  this.hide = function () { if (data.elem) remove(data.elem); return this; }
  this.add = function (elem) { data.elem.appendChild(elem); return this; }
}
//new tray().show().add(createElement("a",{ href:"#", innerHTML:"123" })).add($("slideVew"));


//// DIMMOBJECT ////
function dimmobject(newdata)
{
  var data=newdata||{};
  this.load = function (name) { data=deserialize(name,{}); return this; }
  this.save = function (name) { serialize(name,data); return this; }
  this.alert = function () { alert(uneval(data)); }
  this.getdata = function () { return data; }
  this.copy = function () { return data.slice(); }
  this.foreach = function (func)
  {
    for (i in data)
    {
      func(i, data[i]);
    }
  }
  this.del = function (func, stopafter)
  {
    for (i in data)
    {
      if (func(i, data[i]))
      {
        delete data[i];
      }
      if (stopafter!=-1)
      {
        stopafter--;
        if (stopafter<=0) break;
      }
    }
  }
  this.set = function ()
  {
    if (arguments.length<2) return this;
    var tmp=data;
    for (var i=0;i<arguments.length-2; i++)
    {
      if (typeof tmp[arguments[i]]=="undefined")
        tmp[arguments[i]]={};
      if (typeof tmp[arguments[i]]!="object")
        tmp[arguments[i]]={ value:tmp[arguments[i]] };
      tmp=tmp[arguments[i]];
    }
    tmp[arguments[arguments.length-2]]=arguments[arguments.length-1];
    return this;
  }
  this.get = function ()
  {
    var tmp=data;
    for (var i=0;i<arguments.length-1; i++)
    {
      if (typeof tmp[arguments[i]]!="object") return false;
      tmp=tmp[arguments[i]];
    }
    return tmp[arguments[arguments.length-1]];
  }
}



// **********************
//      ANWENDUNG
// **********************

var colors={
  lightred:"#FCB",
  lightgreen:"#CFC",
}


if (window.top == window.self)
{

var Head=$xs("id('listRecent')/preceding::h2[1]");
GM_setValue("BeliebteBilder",false);
createToggle(Head,[$("listRecent"), $("related")], "BeliebteBilder");
//hideElem($("listRecent"));
//hideElem($("related"));

//jsonphp="https://woems.selfhost.eu:23882/my/wGreasemonkey/json.php";
jsonphp="https://woems.ddns.net:23882/my/wGreasemonkey/json.php";

GM_log("xhamster");

var x=new xhamster();
x.scrollToImage();
/*window.setTimeout(function () {
  x.elem.image.scrollIntoView(true);
}, 100);*/
x.onNextHover(function (e) { x.next(); });
x.onPrevHover(function (e) { x.prev(); });
//if (Math.random()>0.1) x.hideBeliebteBilder();
x.setThumpnailWidth(250);
x.slideViewRight();

GM_log("Links einfärben");

// Links einfärben (opacity 0.3) wenn sie angeklicked werden
function linker(a) {
  var j=false;
  if (j=a.href.match("/photos/view/([0-9]+)-([0-9]+)\.html"))
  {
    a.addEventListener("click",function (e) {
      get(jsonphp+"?a=xhamster&gid="+j[1]+"&iid="+j[2], function (url, text, header, xhr) {
        json=eval(text);
       message("Bild "+j[1]+"-"+j[2]+": "+json[0].seen);
        a.style.opacity="0.3";
      });
      //e.preventDefault();
      if (e.defaultPrevented)
        e.defaultPrevented();
      else
        e.preventDefault();
    }, true);
    //a.href="#"+j[1]+"-"+j[2];
    a.href.hash="OK";
  }
}
x.elems.recentLinks.forEach(linker);
x.elems.relatedLinks.forEach(linker);

function message(text)
{
  noty({ text: text, layout: "topRight", timeout: 10*1000 });
}


// aktuelles als gesehen markieren
get(jsonphp+"?a=xhamster&f=add&gid="+x.gid()+"&iid="+x.iid()+"&seen=1", function (url, text, header, xhr) { message(url); });

// count ausgeben
window.setTimeout(function () {
get(jsonphp+"?a=xhamster&f=countseen", function (url, text, header, xhr) {
  var json=eval(text);
  seen=json.reduce(function (a,b) { a[b.seen]=b.anz; return a; }, {});
  old=deserialize("seenold",{ 0:0, 1:0});
  serialize("seenold",seen);
  noty({ text: [ 'Gesehen: '+seen[1]+" ("+(seen[1]-old[1])+")", 'Ungesehen: '+seen[0]+" ("+(seen[0]-old[0])+")" ].join("<br>"), layout: "topRight", timeout: 60*1000 });
});
},2000);


// Besuchte Links grau
x.withLinksDo(function (img, a, ids) {
  a.style.background='url("") no-repeat scroll center center #EAEAEA';
  get(jsonphp+"?a=xhamster&gid="+ids[1]+"&iid="+ids[2], function (url, text, header, xhr) {
    json=eval(text);
    if (json[0].seen==1)
      img.style.opacity="0.3";
  });
});


/*
var cache = new dimmobject().load('cache');

get(jsonphp+"?a=xhamster&gid="+x.gid(), function (url, text, header, xhr) {
    json=eval(text);
    cache.load('cache');
    json.forEach(function (a) {
      cache.set(a["galerieid"],a["imageid"],a["seen"]).set(a["galerieid"],"date",+new Date());
    });
    cache.save('cache').alert();
});
*/
//var galerie = new dimmobject().load('galerie');
/*
x.withLinksDo(function (img, a, ids) {
  a.style.background='url("") no-repeat scroll center center #EAEAEA';
  if (galerie.get(ids[1],ids[2])) img.style.opacity="0.3";
});
*/
//if (!galerie.get( x.gid() )) x.color(colors.lightgreen);
//if (galerie.get( x.gid(), x.iid() )) x.color(colors.lightred);

//galerie.set(x.gid(), "pages", x.countpages());
//galerie.set(x.gid(), "Last", x.gid()+"-"+x.iid());
//galerie.set(x.gid(), x.iid(), true);
/*
galerie.del(function (gid, value) {
  GM_log(gid+": "+uneval(value));
  for (iid in value)
  {
    if (iid=="gal" || iid=="pages" || iid=="Last") continue;
    GM_log("?a=xhamster&f=add&gid="+gid+"&iid="+iid+"&seen="+(value[iid]?1:0));
    get(jsonphp+"?a=xhamster&f=add&gid="+gid+"&iid="+iid+"&seen="+value[iid], function (url, text, header, xhr) {});
  }
  return true;
},5);

galerie.save('galerie');
*/

noty({
    text: [
      'Random element öffnen?',
    ].join("<br>"),
    type: "alert",
    timeout: 60*1000,
    layout: "topRight",
    buttons: [
		  { addClass: 'btn btn-primary', text: 'hier', onClick: function($noty) {
				  $noty.close();
				  get(jsonphp+"?a=xhamster&f=random", function (url, text, header, xhr) {
            json=eval("("+text+")");
            location.href = "http://de.xhamster.com/photos/view/"+json["galerieid"]+"-"+json["imageid"]+".html";
          });
			} },
		  { addClass: 'btn btn-primary', text: 'im Tab', onClick: function($noty) {
				  $noty.close();
				  get(jsonphp+"?a=xhamster&f=random", function (url, text, header, xhr) {
            json=eval("("+text+")");
            GM_openInTab("http://de.xhamster.com/photos/view/"+json["galerieid"]+"-"+json["imageid"]+".html");
          });
			} }
	  ]
  });

} // if (window.top == window.self)
