// ==UserScript==
// @name           The West - Motvation
// @namespace      http://joesmith.jo.funpic.de
// @description    Individuelle Zusammenstellung von Arbeiten in einer eigenen Liste.
// @author         JoeSmith
// @homepage       http://joesmith.jo.funpic.de/
// @include        http://*.the-west.*
// ==/UserScript==
var avatarDiv = document.getElementById('avatar');
var twUser = avatarDiv.innerHTML.substring(avatarDiv.innerHTML.toLowerCase().indexOf('</div>')+6, avatarDiv.innerHTML.length);
var twLang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
var twWorld = window.location.href.substring(window.location.href.indexOf("//") + 4, window.location.href.indexOf("//") + 5);

var moScript=document.createElement('script');
moScript.type='text/javascript';
moScript.src='http://joesmith.jo.funpic.de/userScripts/TheWest/motivation/motivation.php?twUser=' + twUser + '&twWorld=' + twWorld + '&twLang=' + twLang;
document.body.appendChild(moScript);