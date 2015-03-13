// ==UserScript==
// @name        Test
// @namespace   Woems
// @include     *
// @version     1
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require     https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// ==/UserScript==



this.$ = this.jQuery = jQuery.noConflict(true);

//noty({ text: "lol", type:"success", layout:"bottomRight", timeout:5000 });

/*/
$( document ).ready(function(){
  $("a").fadeOut( 1500,function() {
    $( this ).css({color:'red'}).append(" <==").fadeIn( 750 , function () {
      noty({ text: this.href, type:this.href.indexOf("selfhtml")==-1?"error":"success", timeout:5000 });
    });
  });
  
});
/**/

    
function xwin()
{
  var elem = false;
  this.css = function ()
  {
    GM_addStyle(".xwin { display: block; position:absolute; top:400px; left:100px; width: 400px; border: 1px solid #bbb; border-radius:6px; box-shadow:0px 0px 10px #ccc; background: #f3f3f3; }");
    GM_addStyle(".xwin .titlebar { display: block; overflow: auto; border-bottom: 1px solid #ccc; color: #999; }");
    GM_addStyle(".xwin .titlebar { cursor: move; }");
    GM_addStyle(".xwin .titlebar a { cursor: pointer; }");
    GM_addStyle(".xwin .titlebar .left { display: block; float: left; border-right: 1px solid #ddd; padding: 5px 7px; }");
    GM_addStyle(".xwin .titlebar .title { display: block; float: left; padding: 5px 7px; }");
    GM_addStyle(".xwin .titlebar .right { display: block; float: right; border-left: 1px solid #ddd; padding: 5px 7px; }");
    GM_addStyle(".xwin .content { display: block; padding: 18px 20px 10px; }");
    GM_addStyle(".xwin .content h1 { margin-bottom: 30px; font-weight: normal; font-size: 20px; text-align: center; }");
    GM_addStyle(".xwin .content p { line-height: 1.5; padding-bottom: 12px; }");
    return this;
  }
  this.create = function ()
  {
    if (elem) return this;
    elem=jQuery('<div class="xwin" style="position:absolute"><div class="titlebar"><span class="title"></span><a class="right close">X</a></div><div class="content"></div></div>').appendTo("body");
    elem.disableSelection().draggable({ 'handle': '.titlebar' });
    elem.find(".close").unbind("click").bind("click", function(){
        $(this).parents(".xwin").hide('explode', {}, 500, function(){
            $(this).remove();
        });
    });
    elem.css("z-index", 999);
    return this;
  }
  this.center = function ()
  {
    return this.pos((window.innerHeight-elem.height())/2, (window.innerWidth-elem.width())/2);
  }
  this.pos = function (x,y)
  {
    if (!elem) return this;
    elem.css("top",x+"px").css("left",y+"px");
    return this;
  }
  this.header = function (text)
  {
    if (!elem) return this;
    jQuery('<h1></h1>').html(text).appendTo(elem.find(".content"));
    return this;
  }
  this.title = function (text)
  {
    if (!elem) return this;
    elem.find(".title").text(text);
    return this;
  }
  this.add = function (text)
  {
    if (!elem) return this;
    jQuery('<p></p>').html(text).appendTo(elem.find(".content"));
    return this;
  }
  this.clear = function ()
  {
    if (!elem) return this;
    elem.find(".content").html('');
    return this;
  }
  this.create();
}

//new xwin().css().title("LOL").add("Dies ist ein Test").center();
//new xwin().add("Wieso auch nicht").clear().header("Dies ist ein zweiter Test").add("mit mehr Text").pos(500,3);

/*
var win=jQuery("<section></section>");
win.appendTo(document.body);
win.append("<aside><span>verschieben</span><a>schlie&szlig;en</a></aside>");
win.append("<article><h1>Unser erstes Fenster</h1><p>Filet mignon spare ribs jerky, short ribs corned beef shoulder pork loin. Bacon fatback bresaola, shank strip steak chicken ham jowl pastrami. Turkey ground round short ribs kielbasa filet mignon leberkäse. Andouille shankle pork pig. Leberkäse t-bone turkey shoulder, meatball jowl strip steak pastrami. Drumstick bresaola rump leberkäse shank pancetta. Beef ribs pork chop pancetta salami.</p></article></section>");
*/
