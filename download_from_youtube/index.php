// @name        usoCheckup - Automatic Script Updater
// @copyright   Copyright (C) 2009+, tHE gREASEmONKEYS (http://userscripts.org)
// @license     http://usocheckup.googlecode.com/svn/trunk/license.txt
// @version     1.0.126
// @changelog   http://code.google.com/p/usocheckup/source/list
// @metadata    http://usocheckup.googlecode.com/svn/trunk/src/metadata.php

(function() {
  var usoCheckup = {
    lastRequest: 0,
    get backoff() { return parseInt(GM_getValue("usoCheckup:backoff", 0)); },
    set backoff(value){ Math.floor((GM_setValue("usoCheckup:backoff", value))); },
    get age() { return parseInt(GM_getValue("usoCheckup:age", 1)); },
    set age(value){ GM_setValue("usoCheckup:age", Math.floor(value)); },
    get newVersion() { return parseInt(GM_getValue("usoCheckup:newVersion", 0)); },
    set newVersion(value){ GM_setValue("usoCheckup:newVersion", parseInt(value)); },
    get calculate() { return function(max) {
      var hours = Math.round(Math.exp(this.backoff) * (1 / (Math.exp(4) / 24)));
      max *= 24;
      if (150 < hours)
        hours = Math.round(hours / 168) * 168;
      else if (20 < hours)
        hours = Math.round(hours / 24) * 24;
      if (hours >= max)
        return max;
      return hours;
    }},
    get check() { return function() {
      if (this.enabled && (Math.floor((new Date().getTime())/1000) - this.age >= interval))
        this.request();
    }},
    get enabled() { return GM_getValue("usoCheckup:enabled", true); },
    set enabled(value){ GM_setValue("usoCheckup:enabled", value ? true : false); },
    get maxage() { return GM_getValue("usoCheckup:maxage", parseInt("2")); },
    set maxage(value){
      if (typeof value !== "number" || value < 0)
        value = parseInt("2");
      GM_setValue("usoCheckup:maxage", value);
    },
    get updateUrl() { return {
      "default": "show",
      "install": "https://userscripts.org/scripts/source/33836.user.js",
      "show": "http://userscripts.org/scripts/show/33836/"
    }},
    get openUrl() { return function(url) { GM_openInTab(url); }},
    string: {
      "lang": "de",
      "updateAvailable": "Ein Update ist verfügbar.",
      "updateUnavailable": "Kein Update verfügbar.",
      "updateMismatched": "WARNUNG: Metadata nicht mit!",
      "updateUnlisted": "WARNUNG: Script ist nicht aufgeführt!",
      "queryWidget": "Prüfen Sie nach einem Update.",
      "toggleWidget": "Toggle automatische Aktualisierung.",
      "updaterOff": "Automatisches Update ist deaktiviert.",
      "updaterOn": "Automatische Update aktiviert ist.",
      "showConfirm": "Lassen Sie sich die Homepage-Skript?",
      "installConfirm": "Installieren Sie das Skript?",
      "closeMessage": "Schließen Sie diese Nachricht?",
      "closeAllMessages": "Schließen Sie alle Einträge?"
    },
    get updaterMeta() { return {"name":"usoCheckup - Automatic Script Updater","id":"usoCheckup","copyright":"Copyright (C) 2009+, tHE gREASEmONKEYS (http:\/\/userscripts.org)","version":"126","license":"http:\/\/usocheckup.googlecode.com\/svn\/trunk\/license.txt","metadata":"http:\/\/usocheckup.googlecode.com\/svn\/trunk\/src\/metadata.php","changelog":"http:\/\/code.google.com\/p\/usocheckup\/source\/list","contributor":["Jesse Andrews (http:\/\/userscripts.org\/users\/2)","Johan Sundstr\u00f6m (http:\/\/userscripts.org\/users\/326)","Photodeus (http:\/\/userscripts.org\/users\/16828)","JoeSimmons (http:\/\/userscripts.org\/users\/23652)","sizzlemctwizzle (http:\/\/userscripts.org\/users\/27715)","Marti Martz (http:\/\/userscripts.org\/users\/37004)","lucideer (http:\/\/userscripts.org\/users\/56750)","Buzzy (http:\/\/userscripts.org\/users\/57340)","Tim Smart (http:\/\/userscripts.org\/users\/63868)","IzzySoft (http:\/\/userscripts.org\/users\/89585)"]}; },
    get localMeta() { return {"name":"Download from YouTube","description":"Adds FLV, MP4, 3GP, and 720p download links to YouTube.","include":["http:\/\/*.youtube.com\/watch*v=*","http:\/\/youtube.com\/watch*v=*"],"copyright":"JoeSimmons","version":"1.1.4","license":"Creative Commons Attribution-Noncommercial 3.0 United States License","require":"http:\/\/usocheckup.dune.net\/index.php?scriptid=33836&maxage=2","uso":{"script":"33836","version":"144444","timestamp":"Fri, 20 Nov 2009 01:28:35 +0000","installs":"58224","reviews":"8","rating":"5.00","discussions":"40","fans":"76","hash":"3f300bdfae1ae7debe12ee8788719db53b4adeb4"}}; },
    get parseMeta() { return function(metadataBlock) {
      metadataBlock = metadataBlock.toString();
      var headers = {};
      var line, name, prefix, header, key, value;
        var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
        for each (line in lines) {
          [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
          switch (name) {
            case "licence":
              name = "license";
              break;
          }
          [key, prefix] = name.split(/:/).reverse();
          if (prefix) {
            if (!headers[prefix])
              headers[prefix] = new Object;
            header = headers[prefix];
          } else
            header = headers;
          if (header[key] && !(header[key] instanceof Array))
            header[key] = new Array(header[key]);
          if (header[key] instanceof Array)
            header[key].push(value);
          else
            header[key] = value;
        }
        headers["licence"] = headers["license"];
      return headers;
    }},
    get request() { return function(force) {
      var currentRequest;
      this.age = currentRequest = Math.floor((new Date().getTime())/1000 );

      if (currentRequest - this.lastRequest > 15 * 60) {
        GM_xmlhttpRequest({
          method: "GET",
          url: "https://userscripts.org/scripts/source/33836.meta.js",
          onload: function(xhr) {
            if (xhr.status == 200) {
              var details = {};
              details.remoteMeta = usoCheckup.parseMeta(xhr.responseText);
              if (parseInt(details.remoteMeta["uso"]["version"]) > parseInt(usoCheckup.localMeta["uso"]["version"])
                && parseInt(usoCheckup.localMeta["uso"]["version"]) >= usoCheckup.newVersion
              ) {
                usoCheckup.backoff = 1;
                usoCheckup.newVersion = details.remoteMeta["uso"]["version"];
              }
              else if (!force)
                usoCheckup.backoff += 1;

              if (details.remoteMeta["name"] !== usoCheckup.localMeta["name"]
                || details.remoteMeta["namespace"] !== usoCheckup.localMeta["namespace"]
              ) {
                usoCheckup.enabled = false;
                details.mismatched = true;
              }
              details.unlisted = (details.remoteMeta["uso"]["unlisted"] === "") ? true: false;
              details.forced = (force) ? true: false;
              usoCheckup.widget["alert"](details);
            }
            else
              usoCheckup.enabled = false;
          }
        });
        this.lastRequest = Math.ceil((new Date().getTime())/1000);
      }
    }},
    widget: {
      "alert": function (details) {
        if (parseInt(details.remoteMeta["uso"]["version"]) > parseInt(usoCheckup.localMeta["uso"]["version"])) {
          if (confirm([
            usoCheckup.localMeta["name"],
            "",
            usoCheckup.string["updateAvailable"],
            ((usoCheckup.updateUrl["default"] === "install") && !details.mismatched && !details.unlisted)
              ? usoCheckup.string["installConfirm"]
              : usoCheckup.string["showConfirm"]
          ].join("\n"))) {
            if (details.mismatched || details.unlisted)
              usoCheckup.openUrl(usoCheckup.updateUrl["show"]);
            else
              usoCheckup.openUrl(usoCheckup.updateUrl[usoCheckup.updateUrl["default"]]);
            }
        }
        else if (details.forced)
          alert([
            usoCheckup.localMeta["name"],
            "",
            usoCheckup.string["updateUnavailable"]
          ].join("\n"));
      }
    }
  };

  var interval = usoCheckup.calculate(usoCheckup.maxage) * 60 * 60;

  if (top.location == location)
    if (typeof GM_openInTab === "function")
      usoCheckup.check();

})();
