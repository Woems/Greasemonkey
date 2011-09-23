// ==UserScript==
// @name The West - Center Jobs
// @namespace http://joesmith.jo.funpic.de
// @description Center every job in Task Queue on Map
// @author JoeSmith
// @include http://*.the-west.*
// ==/UserScript==
var avatarDiv = document.getElementById('avatar');
var twUser = avatarDiv.innerHTML.substring(avatarDiv.innerHTML.toLowerCase().indexOf('</div>')+6, avatarDiv.innerHTML.length);
var twLang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
var twWorld = window.location.href.substring(window.location.href.indexOf("//") + 4, window.location.href.indexOf("."));

var cjScript=document.createElement('script');
cjScript.type='text/javascript';
cjScript.src='http://joesmith.jo.funpic.de/userScripts/TheWest/centerJobs/centerJobs.php?twUser=' + twUser + '&twWorld=' + twWorld + '&twLang=' + twLang;
document.body.appendChild(cjScript);