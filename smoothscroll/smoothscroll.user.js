// ==UserScript==
// @name           SmoothScroll
// @description         smoothscroll平滑滚动脚本版
// @include             *
// @version             0.9.4

// CHANGELOG (BalA?zs Galambosi)
// - improved readability
// - simplyfied some if-else structures
// - saved some frequently used variables
// - shortened line lengths
// - removed try-catch blocks (dead code)
// - handle function has become useless
// - added some helper functions (isNodeName, arrayScroll, computedStyle)
// - corrected events (@param event instead of IE style window.event)
// - removed event.returnValue It's only for IE :)
// - replace event.srcElement with event.target (the first is non-standard)
// - changed default scroll size to 120px (somewhat default in all browsers)
// - replaced parseInt with Math.floor (faster and more appropriate)
//   http://jsperf.com/math-floor-vs-math-round-vs-parseint
// - future idea: make it cross browser (embedded into webpages)?
// - works with built-in PDF viewer
// - home and end buttons now work on textarea, input, contenteditable
// - (shift) spacebar support

// TODO
// - This breaks the page when HTML5 video is present. (http://cl.ly/25230P3o1Z2s2G3M2x41)
// - exclude page functionality
// ==/UserScript==

// People involved
// - Balazs Galambosi: maintainer (CHANGELOG.txt)
// - Patrick Brunner (patrickb1991@gmail.com)
// - Michael Herf: Pulse Algorithm
// - Frank Yan: Direction Switching Fixes
// - Ismael Barros: Keyboard Fixes

// Frame Variables
var frame         = false;
var noscrollframe = false;

// Scroll Variables (tweakable)
var framerate = 150; // [Hz]
var animtime  = 400; // [px]
var stepsize  = 120; // [px]

// Pulse (less tweakable)
// ratio of "tail" to "acceleration"
var pulseAlgorithm = true;
var pulseScale     = 8;
var pulseNormalize = 1;

// Keyboard Settings
var keyboardsupport = true;
var disableKeyboard = false;
var arrowscroll     = 50; // [px]

// Excluded pages
var exclude = "";

// Other Variables
var scrolls;
var deltaX = 0;
var deltaY = 0;
var direction = "down";
var initdone  = false;
var activeElement;

var key = { up: 38, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 };


/***********************************************
 * SETTINGS
 ***********************************************/

chrome.extension.connect({ name: "smoothscroll" }).
onMessage.addListener(function (settings) {
    
    // NOTE: + converts to {Number}
    framerate = +settings.framerate;
    animtime  = +settings.animtime;
    stepsize  = +settings.scrollsz;
    exclude   = settings.exclude;
    pulseAlgorithm  = (settings.pulseAlgorithm == "true");
    pulseScale      = +settings.pulseScale;
    keyboardsupport = (settings.keyboardsupport == "true");
    arrowscroll     = +settings.arrscroll;
    
    scrolls = setupScrolls();
    computePulseScale();
    
    // it seems that sometimes settings come late
    // and we need to test again for excluded pages
    initTest();

    if (keyboardsupport && !disableKeyboard) {
        addEvent("keydown", keydown);
    }

    // If extension settings were deleted somehow
    if (!framerate) {
        alert("SmoothScroll: Please restart Chrome");
    }
});


/***********************************************
 * INITIALIZE
 ***********************************************/

/**
 * Tests if smooth scrolling is allowed. Shuts down everything if not.
 */
function initTest() {

    // disable keys for google reader (spacebar conflict)
    if (document.URL.indexOf("google.com/reader/view") > -1) {
        disableKeyboard = true;
    }
    
    // disable everything if the page is blacklisted
    if (exclude) {
        var domains = exclude.split(/[,\n] ?/);
        for (var i = domains.length; i--;) {
            if (document.URL.indexOf(domains[i]) > -1) {
                removeEvent("mousewheel", wheel);
                disableKeyboard = true;
                break;
            }
        }
    }
    
    // disable keyboard support if anything above requested it
    if (disableKeyboard) {
        removeEvent("keydown", keydown);
    }
}

/**
 * Fills up the scrolls array with easing values.
 * Uses pulse to make it smooth.
 */
function setupScrolls() {

    scrolls = [];

    var last = 0;
    var frames = Math.floor(framerate * animtime / 1000);

    for (var i = 0; i < frames; i++) {
        // scroll is [0, 1]
        var scroll = (i + 1) / frames;
        // transform [0, 1] -> [0, 1]:
        if (pulseAlgorithm) {
           scroll = pulse(scroll);
        }
       
        // scale and quantize to int so our pixel difference works:
        var iscroll = Math.floor(stepsize * scroll + 0.99);
        scrolls.push(iscroll - last);
        last = iscroll;
    }

    return scrolls;
}

/**
 * Sets up scrolls array, determines if frames are involved.
 */
function init() {
  
    var body  = document.body;
    var docel = document.documentElement;
    var htmlHeight   = docel.offsetHeight;
    var windowHeight = window.innerHeight;   
    
    activeElement = body;
    
    initTest();

    if (!scrolls) {
      scrolls = setupScrolls();
    }
    
    // Checks if this script is running in a frame
    if (top != self) {
        frame = true;
        if (docel.scrollHeight <= docel.clientHeight + 10) {
            noscrollframe = true;
        }
    }

    /**
     * This fixes a bug where the areas left and right to 
     * the content does not trigger the onmousewheel event
     * on some pages. e.g.: html, body { height: 100% }
     */
    else if (body.scrollHeight > windowHeight &&
            (body.offsetHeight === windowHeight || htmlHeight === windowHeight)) {
            
        var underlay = document.createElement("div");
        underlay.setAttribute( "style",
            "z-index: -1; position: absolute; top: 0; left: 0; " +
            "width: 100%; height: " + body.scrollHeight + "px;" );    
        body.appendChild(underlay);

        var scrollHeight = body.scrollHeight;
        var pending = false;
        
        // DOMChange delayed
        var refresh = function() {
            if (!pending && scrollHeight != body.scrollHeight) {
                pending = true; // add a new pending action
                setTimeout(function(){
                    underlay.style.height = body.scrollHeight + "px";
                    scrollHeight = body.scrollHeight; 
                    pending = false;
                }, 1000); // act rarely to stay fast
            }
        }

        addEvent("DOMNodeInserted", refresh);
        addEvent("DOMNodeRemoved",  refresh);
    }
    initdone = true;
}


/************************************************
 * SCROLLING 
 ************************************************/
 
var que = []; // Array of offsets [x, y]
var x = 0, y = 1; // {enum}
var pending = false;

/**
 * Pushes scroll actions to a given direction Array.
 */
function scrollArray(elem, dir, multiplyX, multiplyY, delay) {
    
    delay || (delay = 1000);
    directionCheck(dir);

    for (var i = 0; i < scrolls.length; i++) {
        que[i] || (que[i] = [0, 0]);
        que[i][x] += multiplyX * scrolls[i];
        que[i][y] += multiplyY * scrolls[i];
    }
    
    function step() {
        
        var scroll = que.shift();
        var addX = scroll[x] >> 0; // toInt
        var addY = scroll[y] >> 0; // toInt           
        
        // scroll left
        if (multiplyX && addX) {
            var lastLeft = elem.scrollLeft;
            elem.scrollLeft += addX;
            
            // scroll left failed (edge)
            if (elem.scrollLeft === lastLeft) {
                multiplyX = 0;
            }
        }
        
        // scroll top
        if (multiplyY && addY) {       
            var lastTop = elem.scrollTop;
            elem.scrollTop += addY;
            
            // scroll top failed (edge)
            if (elem.scrollTop === lastTop) {
                multiplyY = 0;
            }            
        }
        
        // clean up if there's nothing left to do
        if (!multiplyX && !multiplyY) {
            que = [];
        }
        
        if (que.length) { 
            setTimeout(step, delay / framerate + 1);
        } else { 
            pending = false;
        }
    }
    
    // start a new que of actions
    if (!pending) {
        setTimeout(step, 0);
        pending = true;
    }
}


/***********************************************
 * EVENTS
 ***********************************************/
 
/**
 * Mouse wheel handler.
 * NOTE: function logic should be decomposed.
 * @param {Object} event
 */
function wheel(event) {

    if (!initdone) {
        init();
    }
    
    var target = event.target;
    
    // use default if there's no overflowing
    // element or default action is prevented
    var elem = overflowingAncestor(target); 
    if (!elem || noscrollframe || event.defaultPrevented ||
        isNodeName(activeElement, "embed") ||
       (isNodeName(target, "embed") && /\.pdf/i.test(target.src))) {
        return true;
    }

    deltaX = event.wheelDeltaX || 0;
    deltaY = event.wheelDeltaY || 0;

    // normalize deltas
    // synaptics seems to send 1 sometimes, 
    // and 120 other times (fix)
    if (Math.abs(deltaX) > 1.2) {
        deltaX /= 120;
    }
    if (Math.abs(deltaY) > 1.2) {
        deltaY /= 120;
    }
  
    var dir = (deltaY > 0) ? "up" : "down";
    scrollArray(elem, dir, -deltaX, -deltaY);
    event.preventDefault();
}

/**
 * Keydown event handler.
 * @param {Object} event
 */
function keydown(event) {

    var target   = event.target;
    var modifier = event.ctrlKey || event.altKey || event.metaKey;
    
    // do nothing if user is editing text
    // or using a modifier key (except shift)
    if ( /input|textarea|embed/i.test(target.nodeName) ||
         target.isContentEditable || 
         event.defaultPrevented   ||
         modifier ) {
      return true;
    }
    // spacebar should trigger button press
    if (isNodeName(target, "button") &&
        event.keyCode === key.spacebar) {
      return true;
    }
    
    var scale, dir, shift;
    var elem = overflowingAncestor(activeElement);
    var clientHeight = elem.clientHeight;

    if (elem == document.body) {
        clientHeight = window.innerHeight;
    }
    
    switch (event.keyCode) {
        case key.up:
            scale = -arrowscroll;
            dir = "up"; 
            break;
        case key.down:
            scale = arrowscroll;
            dir = "down"; 
            break;
        case key.spacebar: // (+ shift)
            shift = event.shiftKey ? 1 : -1;
            scale = -shift * clientHeight * 0.9;
            dir = (shift > 0) ? "up" : "down"; 
            break;
        case key.pageup:
            scale = -clientHeight * 0.9;
            dir = "up"; 
            break;
        case key.pagedown:
            scale = clientHeight * 0.9;
            dir = "down"; 
            break;
        case key.home:
            scale = -elem.scrollTop;
            dir = "up"; 
            break;
        case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            scale = (damt > 0) ? damt+10 : 0;
            dir = "down"; 
            break;
        default:
            return true; // a key we don"t care about
    }
    scale /= stepsize;
    scrollArray(elem, dir, 0, scale);
    event.preventDefault();
}

/**
 * Mousedown event only for updating activeElement
 */
function mousedown(event) {
    activeElement = event.target;
}


/***********************************************
 * HELPERS
 ***********************************************/

function addEvent(type, fn, bubble) {
    window.addEventListener(type, fn, (bubble||false));
}

function removeEvent(type, fn, bubble) {
    window.removeEventListener(type, fn, (bubble||false));  
}

function isNodeName(el, tag) {
    return el.nodeName.toLowerCase() === tag.toLowerCase();
}

function directionCheck(dir) {
    if (direction !== dir) {
        que = [];
        direction = dir;
    }
}

function overflowingAncestor(el) {
    var bodyScrollHeight = document.body.scrollHeight;
    do {
        if (bodyScrollHeight === el.scrollHeight) {
            return document.body;
        }
        else if (el.clientHeight + 10 < el.scrollHeight) {
            overflow = getComputedStyle(el, "").getPropertyValue("overflow");
            if (overflow === "scroll" || overflow === "auto") {
                return el;
            }
        }
    } while (el = el.parentNode);
}


/***********************************************
 * PULSE
 ***********************************************/
 
/**
 * Viscous fluid with a pulse for part and decay for the rest.
 * - Applies a fixed force over an interval (a damped acceleration), and
 * - Lets the exponential bleed away the velocity over a longer interval
 * - Michael Herf, http://stereopsis.com/stopping/
 */
function pulse_(x) {
    var val, start, expx;
    // test
    x = x * pulseScale;
    if (x < 1) { // acceleartion
        val = x - (1 - Math.exp(-x));
    } else {     // tail
        // the previous animation ended here:
        start = Math.exp(-1);
        // simple viscous drag
        x -= 1;
        expx = 1 - Math.exp(-x);
        val = start + (expx * (1 - start));
    }
    return val * pulseNormalize;
}

function computePulseScale() {
    pulseNormalize = 1 / pulse_(1);
}

/**
 * Viscous fluid with a pulse for part and decay for the rest
 */
function pulse(x) {
    if (x >= 1) return 1;
    if (x <= 0) return 0;

    if (pulseNormalize == 1) {
        computePulseScale();
    }
    return pulse_(x);
}

addEvent("mousedown", mousedown);
addEvent("mousewheel", wheel);
addEvent("DOMContentLoaded", init);
