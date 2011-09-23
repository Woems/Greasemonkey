// ==UserScript==
// @name           Facebook Mass Accept Requests
// @namespace      http://userscripts.org/users/23652
// @description    Adds checkboxes to each request and a big accept button allowing you to accept them all at once, and also send thank you gifts
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      JoeSimmons
// @version        1.1.13
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=56379
// ==/UserScript==

/*
Changelog
1.0.8 - added friend confirmation, changed updater, removed sizzles require & made my own listeners, added option to show status debug bar
1.0.9 - fixed bug, added request timeout
1.0.92 - added links beside requests to open them in a new tab
1.0.93 - fixed bug
1.1.0 - added thank you gifting
1.1.01 - fixed accepting bug
1.1.02 - added the send shovel requests so it doesn't freeze
1.1.1 - updated to the new facebook layout
1.1.11 - added friend requests
1.1.12 - bug fixes
1.1.13 - more bug fixes
*/

var version = "1.1.12";

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

try {
if(unsafeWindow.frameElement!=null && (top||parent|window).location!=location) return;
} catch(e) {}

GM_config.init("Facebook Mass Accept Requests "+version+" Options", {
	status : {
		section : ["Main Options"],
		label : "Show debug status bar",
		type: "checkbox",
		"default" : true
	},
	tygift : {
		label : "Send thank you gifts if possible",
		type : "checkbox",
		"default" : false
	},
	blacklist : {
		label : "Application ID Blacklist (separated by lines)",
		title : "Application IDs put here don't get checkboxes beside their requests.",
		type : "textarea",
		"default" : "25287267406"
	},
	debug : {
		section : [ "Advanced" ],
		label : "Enable Debug Mode",
		type : "checkbox",
		"default" : false
	}
});

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

var main = {

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) {
	if(prop.indexOf("on")==0 && typeof b[prop]=="function") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop.indexOf("on")==0 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else if(",style,accesskey,id,name,src,href,accepted,ckd,type".find(","+prop.toLowerCase())) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		}
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
},

remove : function(e) {
var node = (typeof e=='string') ? document.getElementById(e) : e;
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

debug : function(s) {
if(!$g("#debugT")) document.body.insertBefore(main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(document.createTextNode(s))), document.body.firstChild);
	else $g("#debugT").innerHTML+="\n\n\n\n"+s;
if($g("#debugT").style.display=="none") $g("#debugT").style.display="";
},

// click something
click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) return;
var evObj = e.ownerDocument.createEvent('MouseEvents');
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
},

// get() function by JoeSimmons
// Syntax: get('http://www.google.com/', handleResponse);
get : function(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    //headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {if(cb) cb(r);}
});
},

// post() function by JoeSimmons
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
post : function(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {if(cb) cb(r);}
});
},

addGlobalStyle : function(css) {
	if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = main.create("style", {type:"text/css"});
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
},

get realURL() {
var u=location.href,
host=location.host,
protocol=location.protocol+"//",
hash=location.hash;
if(hash!="" && /#!\/.*\.php/.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.find("#")) u=u.split("#")[0];
return u;
},

get currReqs() {
return $g(".//iframe",{node:$g("#mass_accept_frame_holder")}).snapshotLength;
},

status : function(e) {
$g("#fvma_status").textContent = "[FBMAR] "+main.currReqs+" requests currently.";
},

onTyLoad : function(e) {
$(e.target.getAttribute("id")).removeEventListener("load", main.onTyLoad, false);
main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
	var key = e.target.getAttribute("id"), doc=e.target.contentDocument, frame = $(key),
		tygift = $g(".//div[starts-with(@id, 'app_content_')]//div[@class='thank_you_gift']//form[starts-with(@id, 'req_form_')]//input[@name='send' and (@type='button') or @type='submit']", {doc:doc, node:doc, type:9}),
		helpfriend = $g(".//a[@class='bpri_acceptButton']", {doc:doc, node:doc, type:9}),
		choose = $g(".//input[@name='send_gift' and @value='Choose' and @type='submit']", {doc:doc, node:doc, type:7});

	if(choose.snapshotLength > 0) {
		choose.snapshotItem(Math.round(Math.random()*choose.snapshotLength)).click();
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
	} else if(GM_config.get("tygift") === true && tygift) {
	try {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		main.click(tygift); // click the "Send thank you gift" button
		var intv = window.setInterval(function(e) {
			var send = $g(".//div[@id='pop_content']//input[@type='button' and @name='sendit']", {doc:doc, node:doc, type:9}),
				skip = $g(".//input[@name='skip_ci_btn']", {doc:doc, node:doc, type:9}),
				okay = $g(".//div[@id='pop_content']//input[@type='button' and @name='ok']", {doc:doc, node:doc, type:9});
			if(skip) { // skip button
				main.click(skip);
				window.clearInterval(intv);
			} else if(okay) {
				main.click(okay);
				window.clearInterval(intv);
			} else if(send) { // send button, brings up the skip button
				main.click(send);
			}
		}, 250);
	} catch(e) { alert(e); }
	} else if(helpfriend) {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		frame.src = helpfriend.href;
	} else main.remove(key);
},

open : function(url) {
var id=Math.round(Math.random()*1000000).toString(), max_time = 30,
	mafh = $("mass_accept_frame_holder");
mafh.appendChild(main.create("iframe", {src:url, id:id, style:"width:100%; height:100%;", onload:main.onFrameLoad}));
window.setTimeout(main.remove, max_time * 1000, id);
},

actionsRegex : /actions\[([^\]]+)\]/,

checkall : function() {
var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
for(var i=0,item; (item=array.snapshotItem(i)); i++) {
	item.checked = !item.checked;
	item.setAttribute("ckd", (item.getAttribute("ckd") != "yes" ? "yes" : "no"));
}
},

accept : function() {
		var total_max = 3; // maximum # of allowed requests
		if(main.currReqs >= total_max) {
		window.setTimeout(main.accept, 1000);
		return;
		}
		var maxSuddenRequests = total_max - main.currReqs,
			invites=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_') and @accepted='no' and @ckd='yes']"),
			max = invites.snapshotLength<maxSuddenRequests?invites.snapshotLength:maxSuddenRequests;
		for(var i=0,item; ((i<max) && (item=invites.snapshotItem(i))); i++) {
			var id=$g("#"+item.id.substring(12)),
				invite = $g(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value] | .//input[@name='actions[accept]' and @value='Confirm']",{type:9, node:id});
			if(item.checked && invite && invite.name != "actions[accept]" && invite.value != "Confirm") {
				var hidden=$g(".//input[@type='hidden' and @name and @value]", {node:$g(".//ancestor::li[contains(@class, 'uiListItem')]", {type:9, node:id}), type:7}), othervars="";
				for(var x=0,op; (op=hidden.snapshotItem(x)); x++) if(op.name != "charset_test") othervars += op.getAttribute("name")+"="+op.getAttribute("value")+"&";
				othervars=othervars.substring(0, (othervars.length-1));
				main.post("http://www.facebook.com/ajax/reqs.php", othervars);
				main.open(invite.name.match(main.actionsRegex)[1]);
				item.setAttribute("accepted", "yes");
				item.parentNode.parentNode.style.display="none";
			} else if(item.checked && invite && invite.name=="actions[accept]" && invite.value=="Confirm") invite.click();
		}
		if(max >= maxSuddenRequests) window.setTimeout(main.accept, 1000);
},

run : function() {

		var debugMode = GM_config.get("debug") === true; // debug mode, showing the reqs frame
		var blacklist_entries = GM_config.get("blacklist").prepareRegex().replace(/^\s+|\s+$/g,"").replace(/\n+/g, "|");
		var blacklist = new RegExp("app_("+(blacklist_entries != "" ? blacklist_entries : "25287267406")+")_", "i");
		
		if(!main.realURL.find("reqs.php")) return;
		var invites=$g("//div[@class='mbl']/ul[@class='uiList']/li[contains(@class, 'uiList')] | //ul[@class='uiList mbl pbm']/li[contains(@class, 'uiListItem')]");
		for(var i=0,item; (item=invites.snapshotItem(i)); i++) {
			var tr=item.getElementsByTagName("form")[0], acc=document.evaluate(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value] | .//input[@name='actions[accept]' and @value='Confirm']", tr, null, 9, null).singleNodeValue,
				postID = document.evaluate(".//input[(@name='list_item_id' or @name='status_div_id') and @value]", item, null, 9, null).singleNodeValue.value;
			if(!blacklist.test(postID)) {
				tr.parentNode.insertBefore(main.create("div", {style:"display: block;"}, new Array(main.create("input",{type:"checkbox", id:"mass_accept_"+postID, accepted:"no", ckd:"no", style:"width: 2em; height: 2em;", onchange:function(e){this.setAttribute("ckd", (this.checked?"yes":"no"));}}))), tr);
				if(acc) acc.parentNode.parentNode.insertBefore(main.create("a", {href:acc.name.match(main.actionsRegex)[1], textContent:"Accept with link", target:"_blank", style:"margin-right: 10px;"}), acc.parentNode);
			}
		}
		document.body.appendChild(main.create("div", {id:"mass_accept_div",style:"position:fixed; bottom:60px; right:200px;"},new Array(
		main.create("input", {type:"button",value:"Check All",onclick:main.checkall}),
		main.create("input", {type:"button",value:"Mass Accept",onclick:main.accept}),
		main.create("div", {id:"mass_accept_frame_holder",style:(debugMode===true ? "width:75%; height:60%; background: #FFFFFF; border:2px solid #000000;" : "width:1px; height:1px; background:transparent; border:0;")+" position:fixed; bottom:4px; left:4px; -moz-border-radius:6px; "})
		)));
		if(GM_config.get("status")===true) {
		document.body.insertBefore(main.create("div", {id:"fvma_status",style:"position:fixed; bottom:2px; left:2px; padding:2px 8px; color:#000000; background-color:#FFFFFF; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998; border:1px solid #000000;",textContent:"[FBMAR] 0 requests currently."}), document.body.firstChild);
		window.setInterval(main.status, 1000); // update status every half-second
		}
}

};

if(location.href=="http://www.facebook.com/reqs.php") {
main.run();
// add options shortcut to user script commands
GM_registerMenuCommand("Facebook Mass Accept Requests "+version+" Options", GM_config.open);
main.addGlobalStyle(".status_confirm {display:none !important;} #mass_accept_div input[type=\"button\"] {display:block;}");
}

window.addEventListener("DOMNodeInserted", function(e) {
if(location.href!="http://www.facebook.com/reqs.php" && (location.href.find("#!/reqs.php") || location.href.find("#confirm_")) && main.realURL.find("reqs.php") && $g("//*[contains(.,'You have') and contains(.,'request')]").snapshotLength>0) window.location.replace("http://www.facebook.com/reqs.php");
}, false);