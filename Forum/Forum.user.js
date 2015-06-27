// ==UserScript==
// @name        Forum
// @namespace   Woems
// @include     *
// @version     1
// @grand       GM_log
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js
// @require     https://raw.githubusercontent.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// @require     https://github.com/Woems/Greasemonkey/raw/master/funktionssammlung/funktionssammlung.user.js
// ==/UserScript==


function Forum()
{
  var forumdata = {
    "www.kgforum.org": {
      titel: "Forum",
      param: location.pathname.substr(1).split('.')[0].split("_"),
      inIndex: location.pathname.indexOf('thread')!=-1,
      inContent: location.pathname.indexOf('display')!=-1,
      // parseUrl: return [url, id, site]
      parseUrl: function (url) { return url.match(/.*[a-z]+_([0-9]+_[0-9]+(?:_[0-9]+)?)(?:_[0-9]+)?(?:_([0-9]+))?.*/); }
      
    }
  };
  var data=forumdata[location.host];
  if (data)
  {
    data['url']=data.parseUrl(location.href);
    data['thread']=data['url'][1];
    data['site']=data['url'][2];
  }
  var self=this;
  this.check = function ()
  {
    return !!data;
  }
  this.get = function (d)
  {
    return data[d];
  }
  this.debug=function ()
  {
    noty({ text: [
      "windows===parent: "+(window === parent),
      "windows==parent: "+(window == parent),
      "self===top: "+(self===top),
      "self==top: "+(self==top),
      "location.host: "+location.host,
      //"forumdata: "+uneval(forumdata[location.host]),
      "document.title: "+document.title,
      "title: "+data.titel,
      "parseUrl: "+data.parseUrl(location.href),
    ].join("<br>") });
    return this;
  }
}

function Database()
{
  var data={};
  var self=this;
  this.check=function (func)
  {
    // post("",{},function (url, text, header, xhr) { var div=text2div(text); });
    /*jQuery.getJSON("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname)
    .done(function (data) {
      noty({ text:"DONE" });
      noty({ text:uneval(data) });
    })
    .fail(function (jqxhr, textStatus, error) {
      noty({ text:"FAIL: "+textStatus+" - "+error });
      noty({ text:"State: "+data.state() });
    });*/
    get("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname, function (url, text, header, xhr) {
      data=JSON.parse(text);
      if (func) func(self, data);
    });
    return this;
  }
  this.get=function (thread, func)
  {
    get("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname+"&thread="+thread, function (url, text, header, xhr) {
      data=JSON.parse(text);
      if (func) func(self, data);
    });
    return this;
  }
  this.hide=function (thread, hide, func)
  {
    get("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname+"&thread="+thread+"&HIDE="+hide, function (url, text, header, xhr) {
      data=JSON.parse(text);
      if (func) func(self, data);
    });
    return this;
  }
  this.read=function (thread, read, func)
  {
    get("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname+"&thread="+thread+"&READ="+read, function (url, text, header, xhr) {
      data=JSON.parse(text);
      if (func) func(self, data);
    });
    return this;
  }
  this.vote=function (thread, vote, func)
  {
    get("http://w-diskstation/my/wGreasemonkey/Forum.php?URL="+location.hostname+"&thread="+thread+"&VOTE="+vote, function (url, text, header, xhr) {
      data=JSON.parse(text);
      if (func) func(self, data);
    });
    return this;
  }
}

function htmltable()
{
  var data=[];
  this.add = function ()
  {
    data.push(ObjValues(arguments));
    return this;
  }
  this.toHTMLTable = function ()
  {
    return "<table>"+data.map(function (row) {
      return "<tr>"+row.map(function (col) {
        return "<td>"+col+"</td>";
      }).join("")+"</tr>"
    }).join("")+"</table>";
  }
  this.toString = this.toHTMLTable;
  this.alert = function ()
  {
    alert(uneval(data));
    return this;
  }
}

try {
  //noty({ text: "läuft" });
  var f=new Forum();
  if (f.check())
  {
    var d=new Database();
    d.get(f.get("thread"), function (self,data) {
      var table=new htmltable();
      table.add("URL:",data.base.baseurl);
      table.add("ID:",data.base.id+" / "+data.thread.id);
      table.add("Read:",data.thread.read);
      table.add("Hide:",data.thread.hide);
      table.add("Vote:",data.thread.vote);
      var select="<select id='voteforforum'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>";
      noty({ text: table.toHTMLTable()+select, layout:"bottomRight", timeout:60000, buttons: [
        { addClass: 'btn btn-primary', text: 'OK', onClick: function($noty) {  d.vote(f.get("thread"),$("voteforforum").value); $noty.close(); } },
        { addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) { $noty.close(); } }
      ] });
      //noty({ text: uneval(data), layout:"bottomRight" });
      if(data["thread"]["read"]*1 < f.get("site")*1)
        d.read(f.get("thread"),f.get("site")); 
    });
  }
  //noty({ text: "fertig" });
}
catch(e) {
  alert("Fehler in Forum.js:\n"+uneval(e));
}



