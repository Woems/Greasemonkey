// ==UserScript==
// @name           Userscripts.org Menu Commander
// @namespace      #aVg
// @description    Adds some sexy drop-downs to your userscripts.
// @include        http://userscripts.org/*
// @version        0.1.1
// ==/UserScript==
var menu =[
	{
		"all scripts by name" : "/scripts?sort=name",
		"most discussed" : "/scripts?sort=posts",
		"highest rated" : "/scripts?sort=rating",
		"most favorited" : "/scripts?sort=fans",
		"most installed" : "/scripts?sort=installs",
		"paste new script" : "/scripts/new?form=true",
		"upload new script" : "/scripts/new"
	}, // scripts
	{
		"add new jetpack" : "/jetpacks/new",
		"forum" : "/forums/6"
	}, // jetpacks
	{
		"Most frequently used tags" : "/tags?sort=count",
		"All tags by name" : "/tags?page=1"
	}, // tags
	{
		"Script development" : "/forums/1",
		"Ideas and script requests" : "/forums/2",
		"Userscripts.org discussion" : "/forums/3",
		"The Banana Bar" : "/forums/4",
		"Jetpack" : "/forums/6",
		"Greasefire" : "/forums/5",
		"Recent posts" : "/posts"
	}, // forums
	{
		"all members by name" : "/users?page=1",
		"all members by # of scripts" : "/users?sort=scripts",
		"all members by # of comments" : "/users?sort=comments",
		"all members by # of posts" : "/users?sort=posts"
	}, // people
	{
		"rss feed" : "/feeds/recent_articles"
	}, // blog
	null, // groups (use PhasmaExMachina's script)
	{
		"highest rated" : "/guides?sort=votes",
		"most discussed" : "/guides?sort=comments",
		"sorted by author" : "/guides?sort=author",
		"sorted by date" : "/guides?sort=updated"
	}, // guides
	null  // books
];
function show() {
	(this.nodeName=="A" ? this.nextSibling : this).style.display = "";
}
function hide() {
	(this.nodeName=="A" ? this.nextSibling : this).style.display = "none";
}
GM_addStyle("#mainmenu div {position:absolute;z-index:1}");
var mnu = document.evaluate("./li", document.getElementById("mainmenu"), null, 7, null);
for(var i = mnu.snapshotLength - 1; i>=0; --i)
{
	if(!menu[i]) continue;
	var obj=menu[i], mnui = mnu.snapshotItem(i), drop = document.createElement("div");
	for(var o in obj)
	{
		var link = document.createElement("a");
		link.href = obj[o];
		link.appendChild(document.createTextNode(o));
		drop.appendChild(link);
	}
	drop.style.display="none";
	mnui.appendChild(drop);
	mnui = mnui.firstChild;
	mnui.addEventListener("mouseover", show, false);
	mnui.addEventListener("mouseout", hide, false);
	drop.addEventListener("mouseover", show, false);
	drop.addEventListener("mouseout", hide, false);
}