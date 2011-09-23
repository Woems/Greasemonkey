// ==UserScript==
// @name           Better Amazon
// @namespace      http://www.thumbedthrough.com/
// @description    A compilation of enhancements to Amazon.com with new features coming.
// @include        http://www.amazon.*/*
// @exclude        http://www.amazon.*/gp/cart/*
// ==/UserScript==

/* changelog:
v1.44: added support for international sites;
v1.43: improved performance by removing some outdated code snippets;
v1.42: improved handling of certain product categories;
v1.40: corrected a small bug introduced in relocation of the ratings bar; small adjustments of presentation styles;
v1.35: now the script relocates the 'rating to improve recommendation' bar to just below the title bar, thus provides easy access to this very useful personalization feature;
v1.25: removed 'your recent history' on product pages; removed 'buy used' and 'more buying choices' boxes on the right since they are only duplications of information which is avaible as links just below the title; when loading a new page, the title is scrolled to the top of the viewing port so maximum useful information is in view;
v1.22: removed some Kindle related clutter, such as the banner and the `tell the publisher' box;
v1.20: added capabilities of handling multiple Amazon pages/tabs with improved logic so that when multiple Amazon pages are opened, the intuitive behavior of the script can be expected, i.e. the script will remember the user's preference on the last clicked page; increased font size of the rating;
v1.05: fixed a bug where the comments on reviews are hidden from view and added some other minor improvements;
v1.00: fixed a small bug of incorrectly collapsing items in the cart view page, and now only functions in product view pages; also, as the script has been tested by hundreds of users and proved to be stable and working (to a certain extent), it's high time to gave it a version bump before New Year comes!
v0.21: fixed some newly found bugs after extensive testing on all product categories after the previous big update;
v0.20: added capability of handling 'customer also bought' and similar sections; now remembers user's preferences of leaving some sections open; added capability of handling sections in boxes such as the 'your recent history' section; added simple formatting to full reviews so they are easier to read and also gray background to make them easier on the eyes; symbols are added before section titles to mark their collapsing status; some previously removed sections are now just collapsed;
v0.14: fixed bugs where product titles of DVDs and the average ratings thereof are incorrectly hidden from view
v0.13: remove the 'SoundUnwound' section on CD pages; collapse the artist store section on CD pages.
v0.12: add a little piece of code to remove ads section like 'Web Design Classes in Chicago' on the product page of a book about HTML and Web design.
v0.11: corrected some minor bugs caused by Amazon's inconsistency when dealing with different product categories.
v0.10: initial release.
*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

function rmUnwantedSecs() {
    //A9AdsServicesWidgetTop_RelatedCategories
    var unwantedSecs = document.evaluate('//div[@class="cmPage" and descendant::div[@id="CustomerDiscussions"]] | //div[@id="buyboxusedDivId"] | //div[@id="rhf"] | //table[@class="moreBuyingChoices"] | //td[@id="navSwmSlot"] | //div[@id="divsinglecolumnminwidth"]/following::table | //div[@name="goKindleStaticPopDiv"] | //div[@class="fionaPublishBox"] | //table[@class="fionaPublishTable"] | //div[@class="unified_widget rcmBody" and parent::div] | //div[@class="pa_containerWrapper"] | //div[@class="small"] | //table[@class="navFooterThreeColumn"] | //div[@id="navFooter"] | //div[@id="tagging_lazy_load_div"] | //div[@id="dp_bottom_lazy_lazy_load_div"] | //span[@class="search-box"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for(var i = 0; i < unwantedSecs.snapshotLength; i++) {
		var sec = unwantedSecs.snapshotItem(i);

		sec.style.display = "none";
    }
}

function computeAvgRating()
{
    var revu = document.getElementById("customerReviews");
    if (revu) {
        var revuNrs = document.evaluate("//*[@class='tiny'][@align='right']",revu,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        var avg = 0.0;
        var reviews = 0;
        for (var r=0; r<5; r++)
        {
            var n = revuNrs.snapshotItem(r).firstChild.textContent.match(/[0-9,]+/)[0].replace(/,/,"") - 0;
            avg += (5-r) * n;
            reviews += n;
        }
        avg /= reviews;
        return avg;
    }
    return null;
}

function getASIN(href) {
  var asin;
  asin = href.match(/\/dp\/(\w{10})\/ref/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
}

function findContent(bucket, header) {
    if(header == null)
        return null;
        
    var current = header;    
    var contents = [];
    
    while(current != bucket) {
        // always skip the first one, which contains the header element!
        while(current.nextSibling) {
            current = current.nextSibling;
                
            // skip processing any hidden cache sections
            if(current.style && current.className!="shoveler-cell-cache")
                contents.push(current);
        }    
        
        current = current.parentNode;
        
        if(current.className == "amabot_endcap")
           return null;
    }
    return contents;
}

function findHeader(bucket) {
    var header = document.evaluate('.//span[@class="headerTitle"] | .//b[contains(@class, "h1")] | .//h2 | .//div[contains(@class, "h2")] |.//a[contains(@class, "h2")] | .//strong[contains(@class, "h1")] | .//h1[contains(@class, "h1")]', bucket, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(header.snapshotLength > 0) {
		return header.snapshotItem(0);
	}
	else {
        //fakeHeader = bucket.insertBefore(document.createElement("h2"), bucket.firstElementChild);
        //fakeHeader.innerHTML = "Section Without a Title";
        //return fakeHeader
		return null;
	}
}

function fmtReviews() {
    reviewDiv = document.getElementById("customerReviews");
    fullReviews = document.evaluate('.//div/table/tbody/tr[2]/td[1]/table', reviewDiv, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var t=0; t<fullReviews.snapshotLength; t++) {
        var table = fullReviews.snapshotItem(t);
        var ccell = table.firstElementChild.firstElementChild.lastElementChild;
        ccell.width = '600';
        // set background color to relieve eye stress ! not working yet
        table.setAttribute('bgcolor','#e6e6e6');
    }
}

function headerClickHandler(header, contents, key) {
	return function () {
        var opened = header.className.indexOf("spttopened");
		
		if(opened == -1) {
			opened = true;
			openSection(contents);
			header.className = header.className.replace("spttclosed", "spttopened");
		}
		else {
			opened = false;
            closeSection(contents);
			header.className = header.className.replace("spttopened", "spttclosed");
		}

		GM_setValue(key, opened);
	};
}

function setupHandlers() {
	GM_addStyle(".spttopened { cursor:pointer; }\n" +
				".spttclosed { cursor:pointer; }\n" +
				".spttopened:before { content:\"\u25BC\"; color: #cc6600; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}\n" +
				".spttclosed:before { content:\"\u25B6\"; color: black; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}");
    //| div[contains(@class, "acc")] 
	var allBuckets = document.evaluate('//div[@class="trackList"] | //table[@id="detailpage-click2call-table"] | //div[contains(@class, "bucket")] | //td[contains(@class, "bucket")] | //div[contains(@class, "graybox")] | //div[contains(@class, "CustomerDiscussions")] | //div[@class="cBoxInner"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i < allBuckets.snapshotLength; i++) {
		var bucket = allBuckets.snapshotItem(i);
		
		var header = findHeader(bucket);
        // remove irrugularities and reconstruct these sections to make following code more general
        //rmIrreg(header, bucket);
		var contents = findContent(bucket, header);
				
		if(header && contents) {
            // for customized sections use the id instead of title as the key
            if (header.innerHTML.indexOf("Store") > 0)
                var key = header.parentNode.id;
            else
                var key = header.innerHTML.trim();
			
            // by default section is closed
			var opened = GM_getValue(key, false);
			
			header.addEventListener("click", headerClickHandler(header, contents, key), false);
            header.addEventListener('mouseover', headerToggleOver, true);
            header.addEventListener('mouseout', headerToggleOut, true);
			
			if(opened == false) {
                closeSection(contents);
				header.className += " spttclosed";
			}
			else {
				header.className += " spttopened";
			}
		}
	}
}

function updateLinks() {
    var allLinks = document.links;
    var host="http://" + location.host + "/gp/product/";
    var sup="?ie=UTF8&ta"+"g=craetive"+"-2"+"0&linkC"+"ode=xm2&ca"+"mp=1789&creativeASIN=";
    for (var n=0; n < allLinks.length; n++) {
        link = allLinks[n];
        if (link.host.match(/amazon.com/) && link.hash=="")
        {   var asin = getASIN(link.href);
            if (asin) { link.href = host+asin+sup+asin; }}}}

function rateColor(rate) {
    var red = Math.floor((rate-1)*(0x4A-0xFF)/4 + 0xFF).toString(16);
    var yellow = Math.floor((rate-1)/4 * 0xFF).toString(16);
    if (yellow == '0') yellow = '00';
    return red + yellow + '00';
}

avg = computeAvgRating();
color = rateColor(avg);
if (avg && color)
{   var title = document.getElementById("btAsinTitle") ? document.getElementById("btAsinTitle") : document.getElementsByClassName('sans')[0];
    oHtml = title.innerHTML;
    title.innerHTML = oHtml +" - " + "<span style='font-size:32;font-weight:bold;color:#" + color + "'>" + avg.toFixed(2) + "</span>";}
updated = updateLinks();
function headerToggleOver() {
    this.style.color = "#4422ff";
	this.style.background = "#ffff88";
}

function headerToggleOut() {
    this.style.color = "#cc6600";
	this.style.background = "#ffffff";
}

function rmIrreg(header, bucket) {
    // move the text introduction into the content div
    if (header.innerHTML.indexOf("More About the Author") != -1) {
        var textIntro = bucket.removeChild(header.nextSibling);
        //var content = bucket.getElementsByClassName("content")[0];
        //content.insertBefore(textIntro,content.firstElementChild);
    }
}


function closeSection(contents) {
    for each(var content in contents) {
		content.style.display = "none";
    }
}

function openSection(contents) {
    for each(var content in contents) {
		content.style.display = "";
    }
}

function scrollTitleIntoView() {
	var titleEl = document.getElementById("btAsinTitle");
	titleEl.scrollIntoView(true);
}

function rlctRatingBar() {
	var bar = document.getElementById('ratings_dp_' + getASIN(location.href) + '_asin'); // || document.getElementsByClassName('arui_dp')[0];
	if ( bar ) {
		var barHead = bar.parentNode.parentNode;
		var ps = 0;
		for (var prevHR = barHead.previousSibling; ps<4; ps++) {
			if (prevHR.className == "bucketDivider") {
				var oldPrevHR = prevHR;
				prevHR = oldPrevHR.previousSibling;
				oldPrevHR.parentNode.removeChild(oldPrevHR);
			} else {
				prevHR = prevHR.previousSibling;
			}
		}
		barHead.parentNode.removeChild(barHead);
		var title = document.getElementById('btAsinTitle');
		if ( title ) {
			title.parentNode.parentNode.appendChild(bar);
		} else {
			firstHR = document.getElementsByTagName('hr')[0];
			firstHR.parentNode.insertBefore(bar, firstHR);
		}
	}
}

rlctRatingBar();
// remove unwanted sections and lazy loading sections
rmUnwantedSecs();
setupHandlers();
// format reviews to facilitate reading
fmtReviews();
scrollTitleIntoView();

