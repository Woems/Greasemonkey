// ==UserScript==
// @name           LazyGirls Enlarge
// @namespace      http://userscripts.org/users/23652
// @description    Shows the large picture when you hover over a thumbnail
// @include        http://lazygirls.info/*
// @include        http://*.lazygirls.info/*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;

// By: Ian Williams and edited for MySpace by JoeSimmons

// Get ID
var $=document.getElementById;

// addGlobalStyle
function addGlobalStyle(css) {
    var style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'lazygirlsenlarge';
	style.innerHTML=css;
    document.getElementsByTagName('head')[0].appendChild(style);
}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Hide by JoeSimmons
// Syntax: hide('gbar');
function hide(e) {
var node=(typeof e=='string')?$(e):((typeof e=='object')?e:false);
if(node) node.style.display='none';
}

function show(e, x) {
var pop=$("picPop"), img=$("picPopImg"),
	top = getPosition(e)[0]<(window.innerHeight/2),
	left = getPosition(e)[1]<(window.innerWidth/2);
if(left) x=window.innerWidth-(x+10);
img.style.maxHeight = window.innerHeight+"px";
img.style.maxWidth = (x-20)+"px";
img.src = hq(e.src);
//info((!top?"Top":"Bottom")+" "+(!left?"Left":"Right")+"<br>Image: "+getPosition(e)[0]+"x"+getPosition(e)[1]+"<br>Window: "+window.innerHeight+"x"+window.innerWidth);
pop.style.top = top?"":"0";
pop.style.bottom = top?"0":"";
pop.style.right = left?"0":"";
pop.style.left = left?"":"0";
pop.style.display="";
}

// getPosition by JoeSimmons
function getPosition(e) {
var top=0, left=0;
do {
top += e.offsetTop;
left += e.offsetLeft;
} while(e=e.offsetParent);
return new Array(top, left);
}

function hq(e) {
return e.replace(size,"$1.sized");
}

function info(i) {
var info=$("infoBox");
info.style.display="inline";
info.innerHTML = i;
}

addGlobalStyle(<><![CDATA[
#picPop {
border: 3px double #666666;
z-index: 9999999;
position: fixed;
background: #FFFFFF;
overflow: hidden;
}
]]></>.toString());

var delay=400, size=/(lazygirls\.info.+|.+)\.(thumb|info)/, ispic=/(lazygirls\.info.+|.+)\.(thumb|info)\.?(jpe?g|[gt]iff?|bmp|png)?/, show_d;

document.body.appendChild(create("span", {style:"border:1px solid #666666;position:fixed;top:0;left:45%;font:11px arial;background:#fff;color:#000;padding:2px;width:100px;z-index:9999999;display:none;",id:"infoBox"}));

document.body.appendChild(create("div", {id:"picPop",style:"display: none;"}, new Array(
create("img", {id:"picPopImg"})
)));

window.addEventListener("mouseover", function(e) {
var t=e.target;
if(t.tagName.toLowerCase()=="img" && ispic.test(t.src)) {
new Image().src = hq(t.src);
show_d=setTimeout(show, delay, t, Math.round(e.clientX-15), Math.round(e.clientY-15));
}
}, false);
window.addEventListener("mouseout", function(e) {
clearTimeout(show_d);
hide("picPop");
$("picPopImg").src="";
}, false);

window.addEventListener("click", function(){hide("picPop");}, false);