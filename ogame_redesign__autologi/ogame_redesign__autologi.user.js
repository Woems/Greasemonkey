// ==UserScript==
// @name OGame Redesign : Autologin
// @namespace http://userscripts.org/scripts/show/60482
// @description Automatically logs you in so you don't have to select the uni each and every freaking time XD This one should work with every ogame out there. Hopefully.
// @date 2009-11-1
// @creator mkey
// @include http://*ogame.*/
// @include http://*.ogame.*/game/index.php?page=*
// @exclude
// ==/UserScript==

(function(){
	var uni_number;
	var uni_string;
	var option;
	
	if (document.location.href.indexOf('/game/index.php?page=') == -1){
		// if you were logged in, don't log in automatically on first login screen load
		if (GM_getValue("logged_in", 0)){
			GM_setValue("logged_in", 0);
			return;
		}
		uni_number = GM_getValue("uni_number", 0);
		uni_string = GM_getValue("uni_string", 0);
		option = document.getElementById("uni_select_box").getElementsByTagName("option");
		if (!option) return;
		
		if (uni_number == 0 || uni_string == 0){
			// this is the first login attempt
			document.getElementById("login_button").addEventListener('click', LoginIntercept, false);
		} else {
			// go here for all the other situations
			option[0].removeAttribute("selected");
			for (var i=0; i < option.length; i++){
				if (option[i].value == uni_string) {
					option[i].setAttribute("selected", "selected");
					break;
				}
			}
			document.getElementById("getPassword").href = "http://" + uni_string + "/game/reg/mail.php";
			document.getElementById("loginForm").getElementsByTagName("input")[0].value = uni_number;
			document.getElementById("login_button").click();
		}
	} else if (document.location.href.indexOf('/?error=1') != -1) {
		// if an error ossured, clear the stored values
		GM_setValue("uni_number", 0);
		GM_setValue("uni_string", 0);
		GM_setValue("logged_in", 0);
	} else if (document.getElementById("bar")) document.getElementById("bar").getElementsByTagName("a")[5].addEventListener('click', LogoutIntercept, false);
})()

// when the user presses the login button, collect the required data and store it
function LoginIntercept(evt){
	var option;
	
	// get the uni number
	GM_setValue("uni_number", document.getElementById("loginForm").getElementsByTagName("input")[0].value);
	
	// get the uni url
	option = document.getElementById("uni_select_box").getElementsByTagName("option");
	if (!option) return;
	for (var i=0; i < option.length; i++) {
		if (option[i].selected){
			GM_setValue("uni_string", option[i].value);
			break;
		}
	}
}

// for loging out
function LogoutIntercept(evt){
	GM_setValue("logged_in", 1);
}