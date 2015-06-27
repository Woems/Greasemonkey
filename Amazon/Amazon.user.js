// ==UserScript==
// @name        Amazon
// @namespace   Woems
// @include     http://www.amazon.de/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_getResourceURL
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-1.11.3.min.js
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js
// @resource    BootstrapCSS https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
// @resource    BootstrapThemeCSS https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css
//--// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
//--// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require     https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// ==/UserScript==
/******** BASE FUNCTIONS ********/
function $xs(xpath, rootdir) {
  return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;
}
function $x(p, context) {
  p = p.replace(/([^.])\.(\w+)/g, '$1[@class="$2"]').replace(/#(\w+)/g, '[@id="$1"]').replace(/\/\[/g, '/*['); // '//.class' '//#id' '//[...]'
  var i,
  arr = [
  ],
  xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}
function serialize(name, val) {
  GM_setValue(name, uneval(val));
}
function inFrame() {
  return self != top;
}
var l = [
  'href',
  'protocol',
  'host',
  'hostname',
  'port',
  'pathname',
  'hash',
  'search'
];
//alert(l.map(function (e) { return "location."+e+": "+eval("location."+e); }).join("\n"));
function CSSbyURL(url) {
  jQuery('<link rel=\'stylesheet\' type=\'text/css\'>').appendTo(document.getElementsByTagName('HEAD') [0]) [0].href = url;
}
function CSSbyRES(res) {
  CSSbyURL(GM_getResourceURL(res));
}

function msg(txt) { noty({ timeout: 10*1000, layout: "bottomRight", type:"alert",text: txt}); }
function err(txt) { noty({ timeout: 60*1000, layout: "bottomRight", type:"error",text: txt}); }
function errcfm(txt, success, fail)
{
  noty({ timeout: 60*1000, layout: "bottomRight", type:"error", text: txt, buttons: [
    {addClass: 'btn btn-primary', text: 'Erneut abrufen', onClick: function($noty) { if (success) success(this, $noty); $noty.close(); } },
		{addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) { if (fail) fail(this, $noty); $noty.close(); }	}
	] });
}

var doNothing=function () {};
//$.noty.defaults.layout="bottomRight";
$.noty.defaults.layout="topLeft";
//$.noty.defaults.timeout=60000;

try {
  //CSSbyRES("BootstrapCSS");
  //CSSbyRES("BootstrapThemeCSS");
  function Amazon()
  {
    this.ASIN = '';
    try {
      this.ASIN = (($xs('//li[b[contains(text(),"ASIN:")]]') || {
        textContent: ''
      }).textContent.match(/[A-Z0-9]{10}/) || ['']) [0];
      this.ID = location.pathname.split("/")[3];
    } catch (e) {
      noty({ type:"error", text:'ASIN: ' + uneval(e) });
    }
    if (!this.ASIN) this.ASIN=this.ID;
    this.data = deserialize('data', {
    });
    this.getStatus = function ()
    {
      if (!this.data.status) return false;
      if (this.data.status[this.ASIN] == this.data.status[this.ID])
        return this.data.status[this.ASIN];
      else
        return this.data.status[this.ASIN]+" "+this.data.status[this.ID];
    }
    this.getStatusID = function ()
    {
      if (!this.data.status) return false;
      return this.data.status[this.ID];
    }
    this.setStatus = function (newstat)
    {
      this.data = deserialize('data', {
      });
      if (!this.data.status) this.data.status = {
      };
      this.data.status[this.ASIN] = newstat;
      this.data.status[this.ID] = newstat;
      serialize('data', this.data);
    }
  }
  if (!inFrame())
  {
    var AZ = new Amazon();
    var status2type={ undefined:"alert", "Seen":"warning", "Best":"information", "Good":"success", "Bad":"error" }
    function showStatus()
    {
      noty({ type:status2type[AZ.getStatus()]||"information", text: ['ASIN: '+AZ.ASIN,"ID: "+AZ.ID, "Status: "+uneval(AZ.getStatus())].join("<br>") });
    }
    
    GM_addStyle(".btn-primary { color:blue }");
    GM_addStyle(".btn-danger { color:red }");
    GM_addStyle(".btn-success { color:green }");
    function status()
    {
    noty({
      type:status2type[AZ.getStatus()]||"alert",
      text: ['ASIN: '+AZ.ASIN,"ID: "+AZ.ID, "Status: "+uneval(AZ.getStatus()), "StatusID: "+uneval(AZ.getStatusID())].join("<br>"),
      buttons: [
        {addClass: 'btn btn-primary', text: 'Best', onClick: function($noty) { AZ.setStatus("Best"); $noty.close(); status(); } },
        {addClass: 'btn btn-success', text: 'Good', onClick: function($noty) { AZ.setStatus("Good"); $noty.close(); status(); } },
		    {addClass: 'btn btn-danger', text: 'Bad', onClick: function($noty) { AZ.setStatus("Bad"); $noty.close(); status(); }	},
		    {addClass: 'btn btn-normal', text: 'Close', onClick: function($noty) { $noty.close(); }	},
      ]
    });
    }
    status();
    if (!AZ.getStatus()) AZ.setStatus('Seen');
    //alert([inFrame(), AZ.ASIN, AZ.getStatus()].join("\n"));
    //if (AZ.getStatus()=="open" && confirm("Seen?")) AZ.setStatus("seen");
    /*
    jQuery('<div class="a-content"><div class="a-box"><div class="a-box-inner" id="az-menu"><div id="az-status"></div></div></div></div>').appendTo('#rightCol');
    jQuery('#az-status').text(AZ.ID+" / "+AZ.ASIN + ': ' + AZ.getStatus());
    if (!AZ.getStatus()) AZ.setStatus('Seen');
    jQuery('<button class="btn btn-primary" style="color: blue" type="button">Best</button> ').appendTo('#az-menu');
    jQuery('<button class="btn btn-success" style="color: green" type="button">Good</button> ').appendTo('#az-menu');
    jQuery('<button class="btn btn-danger" style="color: red" type="button">Bad</button> ').appendTo('#az-menu');
    jQuery('#az-menu button').click(function (e) {
      AZ.setStatus(jQuery(this).text());
      jQuery('#az-status').text(AZ.getStatus());
    });
    */
  }
} catch (e) {
  alert(uneval(e));
}
