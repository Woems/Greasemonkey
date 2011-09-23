// ==UserScript==
// @name           Wurzelzeit
// @namespace      Woems
// @description    Zeigt neben den Dekupunkten an, wenn wieder was im Wurzelimperium zu tun ist.
// @include        http://s*.wurzelimperium.de/main.php?page=garden
// @include        http://s*.wurzelimperium.de/menu.php
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

function GetFrameNrByName(Name,Wndw2)
{
	for(var i=0 ;i< Wndw2.frames.length;i++){
	   if(Wndw2.frames[i].name == Name) return i;
	}
}

function date2text(date)
{
  var last=new Date(date*1000);
	return last.getDate() + "." + last.getMonth() + "." + last.getFullYear() + " " + last.getHours() + ":" + last.getMinutes() + "." + last.getSeconds();
}

window.addEventListener('load',function () {

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
if (reg.exec(loc))
{
  var server = reg.exec(loc)[1];
  var page = reg.exec(loc)[2];
} else {
  var server = "";
  var page = "";
}

				var lasttime = 9999999999;
				var str;
				var src;
				var Gartenzeiten; 
				var Zeit;
				var Script1;
				
				//GM_log("0");
				var Wndw = parent.window;
				if (Wndw){} else{ Wndw = window;}
				Script1=Wndw.frames[GetFrameNrByName('garten',Wndw)].document.getElementsByTagName('SCRIPT');
				src = Script1[0].innerHTML;
				//GM_log(src);
                
				//Gartenzeiten =  src.match(/, 4 \)\',[-\d]\d\d+[/.\d]\d*/g);
				regex=/garten_zeit\[([0-9]*)\] = ([0-9]*)/g;
				var Gartenzeiten=src.match(regex);
				//GM_log(uneval(Gartenzeiten));
				
				for(var i=0 ;i< Gartenzeiten.length;i++){
				    Zeit=regex.exec(Gartenzeiten);
					//Zeit = parseInt(Gartenzeiten[i].substring(7));
				    //GM_log(uneval(Zeit));
					//GM_log(lasttime);
					if (lasttime > 	Zeit[2] && Zeit[2]!=0) lasttime=Zeit[2];
				}			
				var jetzt = new Date();
				var now=jetzt.getTime()/1000;
				//GM_log("1\n"+lasttime+"\n"+now+"\n"+(lasttime-now));

				//var remains = (lasttime/1000;
				var remains = (lasttime-now);
				//var remains = lasttime/1000;
				var std = Math.floor(remains/3600);
			    if( std.toString().length == 1 ) std = "0"+std.toString();
                var min = Math.floor((remains%3600)/60);
                if( min.toString().length == 1 ) min = "0"+min.toString();				
                var sec = Math.floor((remains%60));
                if( sec.toString().length == 1 ) sec = "0"+sec.toString();				
				
        var time=deserialize("time");
        //GM_log("\n"+server+" load:\n"+time[server]+"\n"+lasttime);
        time[server]=lasttime;
        serialize("time",time);
        
        var ausgabe="";
        for(var i in time)
        {
          ausgabe+="Server "+i+": "+date2text(time[i])+"<br>";
        }
        
        var div=document.createElement("div");
        div.innerHTML=ausgabe;
        document.body.appendChild(div);
				//GM_setValue('nextText',"Wieder zu tun in " + std+":"+min+","+sec);
				//GM_setValue('nextTime',lasttime);

				/*
				var last=new Date(lasttime*1000);
				//alert("Wieder zu tun in " + std+":"+min+","+sec+"\n\n"+last.toLocaleString());
				/*
				var span=document.createElement("span");
				span.className="all0";
				span.style.top="62px";
				span.innerHTML="Wieder zu tun in " + std+":"+min+","+sec;
				$x("id('menu')/div[3]/font")[0].appendChild(span)
				*/
				//var textdate = last.getDate() + "." + last.getMonth() + "." + last.getFullYear() + " " + last.getHours() + ":" + last.getMinutes() + "." + last.getSeconds();
				//$("deko").innerHTML = $("deko").innerHTML + "<br>" + textdate;
        $("deko").innerHTML = $("deko").innerHTML + "<br>" + date2text(lasttime);
	 			//window.defaultStatus = "Wieder zu tun in " + std+":"+min+","+sec ;
				
				//var OutText = Wndw.frames[GetFrameNrByName('menuframe',Wndw)].document.getElementById('deko')
				//OutText.innerHTML = OutText.innerHTML + "   " + "ZuTun " +  std+":"+min+","+sec;
 }, true)

 window.addEventListener('unload',function () {
var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
if (reg.exec(loc))
{
  var server = reg.exec(loc)[1];
  var page = reg.exec(loc)[2];
} else {
  var server = "";
  var page = "";
}

				var lasttime = 9999999999;
				var str;
				var src;
				var Gartenzeiten; 
				var Zeit;
				var Script1;
				
				//GM_log("0");
				var Wndw = parent.window;
				if (Wndw){} else{ Wndw = window;}
				Script1=Wndw.frames[GetFrameNrByName('garten',Wndw)].document.getElementsByTagName('SCRIPT');
				src = Script1[0].innerHTML;
				//GM_log(src);
                
				//Gartenzeiten =  src.match(/, 4 \)\',[-\d]\d\d+[/.\d]\d*/g);
				regex=/garten_zeit\[([0-9]*)\] = ([0-9]*)/g;
				var Gartenzeiten=src.match(regex);
				//GM_log(uneval(Gartenzeiten));
				
				for(var i=0 ;i< Gartenzeiten.length;i++){
				    Zeit=regex.exec(Gartenzeiten);
					//Zeit = parseInt(Gartenzeiten[i].substring(7));
				    //GM_log(uneval(Zeit));
					//GM_log(lasttime);
					if (lasttime > 	Zeit[2] && Zeit[2]!=0) lasttime=Zeit[2];
				}			
				var jetzt = new Date();
				var now=jetzt.getTime()/1000;
				//GM_log("1\n"+lasttime+"\n"+now+"\n"+(lasttime-now));

				//var remains = (lasttime/1000;
				var remains = (lasttime-now);
				//var remains = lasttime/1000;
				var std = Math.floor(remains/3600);
			    if( std.toString().length == 1 ) std = "0"+std.toString();
                var min = Math.floor((remains%3600)/60);
                if( min.toString().length == 1 ) min = "0"+min.toString();				
                var sec = Math.floor((remains%60));
                if( sec.toString().length == 1 ) sec = "0"+sec.toString();				
				
        var time=deserialize("time");
        //GM_log("\n"+server+" unload:\n"+time[server]+"\n"+lasttime);
        time[server]=lasttime;
        serialize("time",time);
 }, true)


