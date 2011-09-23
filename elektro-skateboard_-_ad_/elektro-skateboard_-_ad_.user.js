// ==UserScript==
// @name           elektro-skateboard - Ad Killer
// @namespace      Woems
// @include        http://www.elektro-skateboard.de*
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
//GM_log=function (){}
/********************************/

$x("/html/body/div[4]/div/div/table/tbody/tr[2]/td[2]/div[2] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[2]/div[3] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[2]/div[4] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[4]/div[2] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[4]/div[3] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[4]/div[4] | /html/body/div[4]/div/div/table/tbody/tr[2]/td[3]/div[7]").forEach(function (a) {
    
  a.style.display="none";
});
