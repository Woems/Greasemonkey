// The following code is released under public domain.

var AutoUpdater_56379 = {
    id: 56379,
    days: 2,
    name: 'Facebook Mass Accept Requests',
    version: '1.1.13',
    time: new Date().getTime(),
    call: function(response) {
        GM_xmlhttpRequest({
            method: 'GET',
	    url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	    onload: function(xpr) {AutoUpdater_56379.compare(xpr,response);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_56379', new Date().getTime()+'');
            AutoUpdater_56379.call(true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split('.'),
            l_parts = l_version.split('.'),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	    GM_setValue('updated_56379', 'off');
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        if ( updated && confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?') )
            GM_openInTab('https://userscripts.org/scripts/source/'+this.id+'.user.js');
        else if ( this.xversion && updated ) {
            if(confirm('Do you want to turn off auto updating for this script?')) {
	        GM_setValue('updated_56379', 'off');
	        this.enable();
	        alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
            }
        } else if (response)
            alert('No updates available for '+this.name);
    },
    check: function() {
        if (GM_getValue('updated_56379', 0) == "off")
            this.enable();
        else {
            if (+this.time > (+GM_getValue('updated_56379', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_56379', this.time+'');
                this.call();
            }
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_56379', new Date().getTime()+'');
                AutoUpdater_56379.call(true)
            });
        }
    }
};
if (typeof GM_xmlhttpRequest !== 'undefined')
    try {
        if (unsafeWindow.frameElement === null) 
            AutoUpdater_56379.check();
    } catch(e) {
        AutoUpdater_56379.check();
    }