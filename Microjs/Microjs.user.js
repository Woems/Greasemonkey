// ==UserScript==
// @name        Microjs
// @namespace   Woems
// @include     *
// @version     1
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_openInTab
// @require     https://github.com/Woems/Greasemonkey/raw/master/funktionssammlung/funktionssammlung.user.js
// @require     https://raw.githubusercontent.com/serkanyersen/ifvisible.js/master/src/ifvisible.js
// ==/UserScript==

// See the README (https://github.com/madrobby/microjs.com#readme) for details about how
// to use this file.
// Make sure you run 'make compile' to check that your library doesn't come up with
// warnings or errors. It would also be appreciated if you could check any versioned
// libraries to see if they have new releases.
// As per the README, the source should be a link to your unminified, raw, source. It can
// also be just the raw JS if it's small enough, an array of source files or a ZIP file.
// See examples below.

var moduledef = [
  {
    name: "Mithril",
    github: "lhorie/mithril",
    tags: ["mvc framework", "mvc", "framework", "templating", "promise", "routing"],
    description: "A javascript MVC framework for building brilliant applications",
    url: "https://lhorie.github.io/mithril",
    source: "https://raw.githubusercontent.com/lhorie/mithril.js/master/mithril.js"
  },
  {
    name:"once.js",
    tags: ["called","once","function","one","single","coffeescript","javascript","amd","node","web"],
    description: "Enforce that a CoffeeScript or JavaScript function can only be executed once.",
    url: "https://github.com/daniellmb/once.js",
    source: "https://raw.githubusercontent.com/daniellmb/once.js/master/once.js"
  },
  {
    name: "strg.js",
    github: "fend25/strg.js",
    tags: ["localStorage", "sessionStorage", "cookie", "cookies"],
    description: "Simple and clear localStorage, sessionStorage and cookie operating library with the single API",
    url: "https://github.com/fend25/strg.js",
    source: "https://raw.githubusercontent.com/fend25/strg.js/master/strg.js"
  },
  {
    name:"devicedetector.js",
    tags: ["device detector", "client-side", "ismobile", "check mobile"],
    description: "Tiny script detecting if you are on a desktop, mobile or tablet device.",
    url: "https://github.com/PoeHaH/devicedetector",
    source: "https://raw.githubusercontent.com/PoeHaH/devicedetector/master/devicedetector-production.js"
  },
  {
    name: "Feed",
    github: "evandrolg/Feed",
    tags: ["feed", "rss", "feed reader", "client-side"],
    description: "A client-side library that work like a Feed Reader, returning all datas of a post - title, text, link, etc",
    url: "https://github.com/evandrolg/Feed",
    source: "https://raw.githubusercontent.com/EvandroLG/Feed/master/src/feed.js"
  },
  {
    name: "Dom.js",
    tags: ["dom", "dom manipulation", "dom traversal", "dom events", "crossbrowser", "event", "traversal"," manipulation"],
    description: "DOM.js is a lightweight, fast and cross browser library for DOM traversal, manipulation and event handling.",
    url: "https://github.com/dkraczkowski/dom.js",
    source: "https://raw.githubusercontent.com/dkraczkowski/dom.js/master/src/dom.min.js"
  },
  {
    name: "Infect.js",
    github: "amwmedia/Infect.js",
    tags: ["dependency injection", "DI", "dependency", "injection", "dependency-free"],
    description: "Infectiously simple dependency injection for any JavaScript project",
    url: "https://github.com/amwmedia/infect.js",
    source: "https://raw.githubusercontent.com/amwmedia/infect.js/master/infect.js"
  },
  {
    name: "PerfNow.js",
    tags: ["performance", "benchmark", "polyfill", "high", "resolution", "timer", "now"],
    description: "A high resolution performance benchmarking polyfill",
    url: "https://github.com/daniellmb/perfnow.js",
    source: "https://raw.githubusercontent.com/daniellmb/perfnow.js/master/perfnow.src.js"
  },
  {
    name: "style.js",
    github: "dhilipsiva/style.js",
    tags: ["style", "CSS GUI"],
    description: "A layman's tool to style HTML Elements and share CSS values",
    url: "https://github.com/dhilipsiva/style.js",
    source: "https://raw.githubusercontent.com/dhilipsiva/style.js/master/src/js/style.js"
  },
  {
    name: "Sortable",
    github: "RubaXa/Sortable",
    tags: ["sortable", "dnd", "reorder", "drag", "touch"],
    description: "Sortable is a minimalist JavaScript library for modern browsers and touch devices. No jQuery.",
    url: "http://rubaxa.github.com/Sortable/",
    source: "https://raw.githubusercontent.com/RubaXa/Sortable/master/Sortable.js"
  },
  {
    name: "CRC32",
    tags: ["crc", "crc-32", "checksum", "check", "verify", "error", "hash" ],
    description: "Blazing fast CRC-32 checksum algorithm for binary and Unicode data.",
    url: "https://github.com/SheetJS/js-crc32",
    source: "https://raw.githubusercontent.com/SheetJS/js-crc32/master/crc32.js"
  },
  {
    name: "AsyncIterator",
    github: "aravindbaskaran/simple-async",
    tags: ["async", "iterate", "callback"],
    description: "A very lightweight javascript library for async iteration. Callback-chain-free. Zero dependency.",
    url: "https://github.com/aravindbaskaran/simple-async",
    source: "https://raw.githubusercontent.com/aravindbaskaran/simple-async/master/asynciterator.js"
  },
  {
    name: "cryptofoo",
    github: "SimonWaldherr/cryptofoo",
    tags: ["hash", "hashing", "md5", "whirlpool"],
    description: "A good compromise between speed and validity to hash strings",
    url: "https://github.com/SimonWaldherr/cryptofoo",
    source: "https://raw.githubusercontent.com/SimonWaldherr/cryptofoo/master/cryptofoo.js"
  },
  {
    name: "micromarkdown.js",
    github: "SimonWaldherr/micromarkdown.js",
    tags: ["markdown", "md", "html", "converter"],
    description: "convert markdown to HTML in under 5kb",
    url: "https://github.com/SimonWaldherr/micromarkdown.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/micromarkdown.js/master/micromarkdown.js"
  },
  {
    name: "P",
    github: "evandrolg/p",
    tags: ["promise", "callback", "library", "functional"],
    description: "It's an agnostic, cross-browser and very lightweight library to help you to work with Promise in JavaScript.",
    url: "https://github.com/evandrolg/p",
    source: "https://raw.githubusercontent.com/EvandroLG/P/master/src/p.js"
 },
 {
    name: "MoaJS",
    github: "Pencroff/MoaJs",
    tags: ["class", "classes", "extend", "inheritance", "oop", "mixins"],
    description: "ExtJs syntax for declaration object inheritance, mixins, static methods / properties / mixins, singleton declaration out of the box and less then 2kB minified JavaScript code.",
    url: "https://github.com/Pencroff/MoaJs",
    source: "https://raw.githubusercontent.com/Pencroff/MoaJs/master/moa.dev.js"
 },
 {
    name: "state.js",
    github: "steelbreeze/state.js",
    tags: ["finite", "state", "machine"],
    description: "Lightweight state machine library for JavaScript",
    url: "https://github.com/steelbreeze/state.js",
    source: "https://raw.githubusercontent.com/steelbreeze/state.js/master/src/state.js"
  },
  {
    name: "bLazyJS",
    github: "dinbror/blazy",
    tags: ["lazy", "lazyload", "image", "images", "retina", "responsive", "loader"],
    description: "A lightweight script for lazy loading and multi-serving (retina and responsive) images",
    url: "http://dinbror.dk/blazy/",
    source: "https://raw.githubusercontent.com/dinbror/blazy/master/blazy.js"
  },
  {
    name: "hu.js",
    github: "Canop/hu.js",
    tags: ["svg", "vector", "graphics", "games"],
    description: "A really light library for creation, manipulation and animation of SVG.",
    url: "https://github.com/Canop/hu.js",
    source: "https://raw.githubusercontent.com/Canop/hu.js/master/hu.js"
  },
  {
    name: "SimpleBinder",
    github: "james2doyle/simplebinder",
    tags: ["binding", "data", "input", "change", "event", "callback", "library", "functional"],
    description: "simplebinder is a zero dependency one-way databinder for javascript.",
    url: "https://github.com/james2doyle/simplebinder",
    source: "https://raw.githubusercontent.com/james2doyle/simplebinder/master/simplebinder.js"
  },
  {
    name: "ArrowJS",
    github: "Perion/ArrowJS",
    tags: ["notification", "cross-browser", "namespace"],
    description: "Arrow is a small library for displaying a arrow pointing to the browser download location",
    url: "https://github.com/Perion/ArrowJS",
    source: "https://raw.githubusercontent.com/Perion/ArrowJS/master/src/js/arrow.js"
  },
  {
    name: "fpscounter",
    tags: ["performance", "canvas"],
    description: "Creates a very simple fps counter in a browser. Zero config by default, options available.",
    url: "https://github.com/pete-otaqui/fpscounter",
    source: "https://raw.githubusercontent.com/pete-otaqui/fpscounter/master/fpscounter.js"
  },
  {
    name: "minivents",
    github: "allouis/minivents",
    tags: ["events"],
    description: "A mini event library for Javascript applications",
    url: "https://github.com/allouis/minivents",
    source: "https://raw.githubusercontent.com/allouis/minivents/master/minivents.js"
  },
  {
    name: "Tipograph",
    github: "nevyk/tipograph",
    tags: ["typography", "type", "converter", "curly", "quotes", "dash"],
    description: "Library which transforms your text input into typographically correct sequence of characters.",
    url: "https://github.com/nevyk/tipograph",
    source: "https://raw.githubusercontent.com/nevyk/tipograph/master/src/replace.js"
  },
  {
    name: "audioJS",
    github: "evandrolg/audiojs",
    tags: ["audio", "html5"],
    description: "AudioJS is a agnostic and cross-browser lib to work easily with the AudioContext API of HTML5.",
    url: "https://github.com/evandrolg/audiojs",
    source: "https://raw.githubusercontent.com/EvandroLG/audioJS/master/src/audio-js.js"
  },
  {
    name: "CornerJS",
    github: "Jabher/cornerjs",
    tags: ["directives", "WeakMap", "MutationObserver"],
    description: "IE9+ Angular-style directives for binding events to adding, removing and modifying classes, attributes and tags of DOM elements. Includes MutationObserver and WeakMap IE9+ polyfills",
    url: "https://github.com/Jabher/cornerjs",
    source: "https://raw.githubusercontent.com/Jabher/cornerjs/master/src/corner.js"
  },
  {
    name: "http.js",
    github: "nauman1225/http.js",
    tags: ["http", "ajax", "rest"],
    description: "http.js is an object oriented javascript library for making http requests and ajax calls.",
    url: "https://github.com/nauman1225/http.js",
    source: "https://raw.githubusercontent.com/nauman1225/http.js/master/dist/http.js"
  },
  {
    name: "Automator.js",
    github: "brophdawg11/Automator.js",
    tags: ["Automation", "Unit testing", "Sequence", "User interaction"],
    description: "A minimal JavaScript library for automating practically anything in Javascript.",
    url: "https://github.com/brophdawg11/Automator.js",
    source: "https://raw.githubusercontent.com/brophdawg11/Automator.js/master/automator.js"
  },
  {
    name: "JsChannels",
    github: "brophdawg11/JsChannels",
    tags: ["Channels", "core.async", "async", "Promise", "Deferred", "Deferreds", "Promises"],
    description: "A minimal JavaScript Channels library, inspired by Clojure's core.async.",
    url: "https://github.com/brophdawg11/JsChannels",
    source: "https://raw.githubusercontent.com/brophdawg11/JsChannels/master/channel.js"
  },
  {
    name: "translate.js",
    github: "musterknabe/translate.js",
    tags: ["translation", "translate", "i18n", "internationalization", "languages", "localization"],
    description: "A simple function to translate strings. With support for multiple plural forms and replacements/placeholders",
    url: "https://github.com/musterknabe/translate.js",
    source: "https://raw.githubusercontent.com/musterknabe/translate.js/master/src/translate.js"
  },
  {
    name: "swiftclick",
    github: "tmwagency/swiftclick",
    tags: ["mobile", "touch", "events", "swiftclick"],
    description: "SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change.",
    url: "https://github.com/tmwagency/swiftclick",
    source: "https://raw.githubusercontent.com/tmwagency/swiftclick/master/js/libs/swiftclick.js"
  },
  {
    name: "bullet",
    github: "munkychop/bullet",
    tags: ["bullet", "pubsub", "pub-sub", "events", "communication", "oop"],
    description: "Bullet is an ultra lightweight and simple to use pub-sub library, with AMD/module support and an intuitive API.",
    url: "https://github.com/munkychop/bullet",
    source: "https://raw.githubusercontent.com/munkychop/bullet/master/dist/bullet.js"
  },
  {
    name: "store",
    github: "nbubna/store",
    tags: ["localStorage", "sessionStorage", "JSON", "namespace", "API", "extensible"],
    description: "A better API for using localStorage and sessionStorage.",
    url: "https://github.com/nbubna/store",
    source: "https://raw.githubusercontent.com/nbubna/store/master/dist/store2.js"
  },
  {
    name: "Oboe.js",
    github: "jimhigson/oboe.js",
    tags: ["ajax", "streaming", "download", "json", "parser", "sax", "jsonpath", "http"],
    description: "Library for progressive parsing of ajax responses. Provides notification of objects found without waiting for the request to complete.",
    url: "http://oboejs.com",
    source: "https://raw.githubusercontent.com/jimhigson/oboe.js/master/dist/oboe-browser.js"
  },
    {
    name: "webSqlSync.js",
    github: "orbitaloop/WebSqlSync",
    tags: ["websql", "sqlite", "synchronization", "sync", "sql", "web-sql", "database", "server"],
    description: "Library to synchronize automatically a local WebSql database (SQLite on the browser) with your server",
    url: "https://github.com/orbitaloop/WebSqlSync",
    source: "https://raw.githubusercontent.com/orbitaloop/WebSqlSync/master/client_src/webSqlSync.js"
  },
  {
    name: "attach.js",
    github: "nicbell/attach.js",
    tags: ["dom", "instantiation", "attach", "javascript"],
    description: "A DOM instantiation API designed to tidy up and encapsulate attaching JavaScript to the page.",
    url: "http://nicbell.github.io/attach.js/",
    source: "https://raw.githubusercontent.com/nicbell/attach.js/master/attach.js"
  },
  {
    name: "loglevel",
    github: "pimterry/loglevel",
    tags: ["log", "logging", "console"],
    description: "Minimal lightweight logging for JavaScript, adding reliable log level methods to wrap any available console.log methods",
    url: "https://github.com/pimterry/loglevel",
    source: "https://raw.githubusercontent.com/pimterry/loglevel/master/dist/loglevel.js"
  },
  {
    name: "goo.js",
    github: "johnrobinsn/goo.js",
    tags: ["HTML5", "canvas"],
    description: "Microlibrary that makes it quick and easy to draw using the HTML5 Canvas API/",
    url: "http://www.storminthecastle.com/projects/goo.js/",
    source: "https://raw.githubusercontent.com/johnrobinsn/goo.js/master/src/goo.js"
  },
  {
    name: "Satnav",
    github: "f5io/satnav-js",
    tags: ["routing", "micro", "hashchange", "pushState"],
    description: "A micro (~1.5kb gzipped) JS routing library. Satnav provides functionality for Regex-like paths in JavaScript.",
    url: "https://github.com/f5io/satnav-js",
    source: "https://raw.githubusercontent.com/f5io/satnav-js/master/lib/satnav.js"
  },
  {
    name: "mediahack.js",
    github: "pomke/mediahack",
    tags: ["mediaquery", "mediaqueries", "css3", "css", "media"],
    description: "Add media-query classes to DOM nodes",
    url: "https://github.com/pomke/mediahack",
    source: "https://raw.githubusercontent.com/pomke/mediahack/master/mediahack.js"
  },
  {
    name: "sawkit-client",
    github: "cScarlson/sawkit-client",
    tags: ["websocket", "socket", "HTML5", "custom", "events", "emit", "emission", "on", "jquery"],
    description: "A non-intrusive Facade Pattern on the HTML5 WebSocket API which allows for: custom event-emissions, custom event-listeners, and binary sending - all in a chainable, jQuery-LIKE way.",
    url: "https://github.com/cScarlson/sawkit-client",
    source: "https://raw.githubusercontent.com/cScarlson/sawkit-client/master/$ws.js"
  },
  {
    name: "SDB.js",
    github: "cScarlson/SDB",
    tags: ["IndexedDB", "database", "object", "store", "localStorage"],
    description: "A Facade Pattern on the HTML5 IndexedDB API.",
    url: "https://github.com/cScarlson/SDB",
    source: "https://raw.githubusercontent.com/cScarlson/SDB/master/SDB.js"
  },
  {
    name: "detect-indent",
    tags: ["indent", "indentation", "detect", "infer", "identify", "code", "string", "text", "source", "space", "tab"],
    description: "Detect the indentation of code.",
    url: "https://github.com/sindresorhus/detect-indent",
    source: "https://raw.githubusercontent.com/sindresorhus/detect-indent/master/cli.js"
  },
  {
    name: "Tempreites",
    github: "fiatjaf/tempreites",
    tags: ["templating"],
    description: "Semantic templates. Binds data to HTML markup. Direto da roça for the browser and server, no DOM needed, just strings.",
    url: "https://github.com/fiatjaf/tempreites",
    source: "https://raw.githubusercontent.com/fiatjaf/tempreites/master/src/tempreites.js"
  },
  {
    name: "asynquence",
    github: "getify/asynquence",
    tags: ["async", "asynchronous", "control flow", "flow control"],
    description: "asynchronous flow-control using sequences and gates",
    url: "https://github.com/getify/asynquence",
    source: ["https://raw.githubusercontent.com/getify/asynquence/master/asq.src.js"]
  },
  {
    name: "native-promise-only",
    github: "getify/native-promise-only",
    tags: ["async", "asynchronous", "promise", "promises"],
    description: "A polyfill for native ES6 Promises as close as possible (no extensions) to the strict spec definitions.",
    url: "https://github.com/getify/native-promise-only",
    source: "https://raw.githubusercontent.com/getify/native-promise-only/master/lib/npo.src.js"
  },
  {
    name: "Miniscroll.js",
    github: "rogerluiz/Miniscroll-JS",
    tags: ["scrollbar", "touch", "desktop", "scroll"],
    description: "A simple scrollbar for desktop and mobile application using javascript. ",
    url: "https://github.com/rogerluiz/Miniscroll-JS",
    source: "https://raw.githubusercontent.com/rogerluiz/Miniscroll-JS/master/dist/miniscroll.js"
  },
  {
    name: "remove.js",
    github: "scrapmac/snippets",
    tags: ["string", "remove", "cleanup", "redundant", "gibberish", "trim"],
    description: "Small but powerful string cleanup and reduction library.",
    url: "https://github.com/scrapmac/snippets/tree/master/remove.js",
    source: "https://raw.githubusercontent.com/scrapmac/snippets/master/remove.js/remove.js"
  },
  {
    name: "Taggle.js",
    github: "okcoker/taggle.js",
    tags: ["tags", "input", "autocomplete"],
    description: "Form-ready delicious style tagging library.",
    url: "http://sean.is/poppin/tags",
    source: "https://raw.githubusercontent.com/okcoker/taggle.js/master/src/taggle.js"
  },
  {
    name: "ImageFlip.js",
    github: "erf/ImageFlip.js",
    tags: ["slideshow", "images", "gallery", "collage"],
    description: "Minimalistic slideshow library.",
    url: "https://github.com/erf/ImageFlip.js",
    source: "https://raw.githubusercontent.com/erf/ImageFlip.js/master/imageflip.js"
  },
  {
    name: "safemap.js",
    github: "philbooth/safemap.js",
    tags: ["map", "dictionary", "associative array", "data structure"],
    description: "A tiny, safe, ES3-compliant map/dictionary implementation.",
    url: "https://github.com/philbooth/safemap.js",
    source: "https://raw.githubusercontent.com/philbooth/safemap.js/master/src/safemap.js"
  },
  {
    name: "OneDollar.js",
    github: "voidplus/onedollar-coffeescript",
    tags: ["gesture", "recognition", "recognizer", "multitouch", "interactive", "input", "jquery"],
    description: "A JavaScript implementation of the &dollar;1 Gesture Recognizer, a two-dimensional template based gesture recognition",
    url: "https://github.com/voidplus/onedollar-coffeescript",
    source: "https://raw.githubusercontent.com/voidplus/onedollar-coffeescript/master/lib/onedollar.js"
  },
  {
    name: "LocalDB.js",
    github: "Agnostic/LocalDB.js",
    tags: ["nosql", "ODM", "mongo", "json", "database", "web applications", "localStorage"],
    description: "LocalDB.js is a tool that maps the structure of the databases in objects using the localStorage API, no database drivers are required, just add the library and use it!",
    url: "http://agnostic.github.io/LocalDB.js",
    source: "https://raw.githubusercontent.com/Agnostic/LocalDB.js/master/src/LocalDB.js"
  },
  {
    name: "Countable",
    github: "RadLikeWhoa/Countable",
    tags: ["paragraphs", "words", "characters", "counting", "live", "text"],
    description: "Countable is a JavaScript function to add live paragraph-, word- and character-counting to an HTML element.",
    url: "http://radlikewhoa.github.io/Countable",
    source: "https://raw.githubusercontent.com/RadLikeWhoa/Countable/master/Countable.js"
  },
  {
    name: "iugo.js",
    github: "chrismichaelscott/iugo",
    tags: ["MVVC", "data binding", "template"],
    description: "An extremely lightweight one-way data-binding tool without the bloat of a full framework. Makes separating markup from content easy.",
    url: "http://iugojs.com",
    source: "https://raw.githubusercontent.com/chrismichaelscott/iugo/master/iugo.js"
  },
  {
    name: "Colors.js",
    github: "mbjordan/Colors",
    tags: ["color", "color manipulation"],
    description: "Colors.js is an easy to use color-manipulation library that is lightweight and very functional.",
    url: "http://mbjordan.github.io/Colors/",
    source: "https://raw.githubusercontent.com/mbjordan/Colors/master/colors.js"
  },
  {
    name: "css-time.js",
    github: "philbooth/css-time.js",
    tags: ["css", "time", "string", "milliseconds", "convert", "conversion"],
    description: "A tiny library that converts milliseconds to and from CSS time strings.",
    url: "https://github.com/philbooth/css-time.js",
    source: "https://raw.githubusercontent.com/philbooth/css-time.js/master/src/css-time.js"
  },
  {
    name: "bottleneck",
    github: "SGrondin/bottleneck",
    tags: ["async rate limiter", "async", "rate limiter", "timing", "load", "limiter", "ddos"],
    description: "The best async rate limiter for Node and the browser",
    url: "https://github.com/SGrondin/bottleneck",
    source: "https://raw.githubusercontent.com/SGrondin/bottleneck/master/bottleneck.js"
  },
  {
    name: "accounting.js",
    github: "josscrowcroft/accounting.js",
    tags: ["math", "number", "money", "currency parsing", "currency formatting"],
    description: "A lightweight JavaScript library for number, money and currency formatting - fully localisable, zero dependencies.",
    url: "http://josscrowcroft.github.io/accounting.js/",
    source: "https://raw.githubusercontent.com/josscrowcroft/accounting.js/master/accounting.js"
  },
  {
    name: "sloth.js",
    github: "hakubo/Sloth",
    tags: ["lazy", "initialize", "viewport", "amd", "library", "scroll"],
    description: "Lazy initialize components of a webpage when they become visible",
    url: "https://github.com/hakubo/Sloth",
    source: "https://raw.githubusercontent.com/hakubo/Sloth/master/sloth.max.js"
  },
  /* gone ?
  {
    name: "fx.js",
    github: "agilemd/Fx",
    tags: ["animation", "animate", "CSS", "CSS3", "requestanimationframe", "animationframe", "transform", "hardware", "translate", "scale"],
    description: "A tiny, high performance, fully cross browser, dependency free animation library for the modern web.",
    url: "https://github.com/agilemd/Fx",
    source: "https://raw.githubusercontent.com/agilemd/Fx/master/src/fx.js"
  },
  */
  {
    name: "zoe.js",
    github: "zestjs/zoe",
    tags: ["class", "inheritance", "events", "extend", "amd", "prototype", "prototypal"],
    description: "An AMD-compatible natural extension-based class and event model, fully compatible with prototypal inheritance.",
    url: "http://zoejs.org",
    source: "https://raw.githubusercontent.com/zestjs/zoe/master/zoe.js"
  },
  {
    name: "atom.js",
    github: "zynga/atom",
    tags: ["async", "barrier", "control", "events", "flow", "properties"],
    description: "Small class providing async control flow, property listeners, barrier pattern, and more. For node and browser.",
    url: "https://github.com/zynga/atom",
    source: "https://raw.githubusercontent.com/zynga/atom/master/atom.js"
  },
  /* dist dir replaced with complex, versioned zip, will reenable after pull-request
  {
    name: "alertify.js",
    github: "fabien-d/alertify.js",
    tags: ["notification", "alert"],
    description: "JavaScript Alert/Notification System.",
    url: "https://github.com/fabien-d/alertify.js",
    source: "https://raw.githubusercontent.com/fabien-d/alertify.js/master/dist/alertify.js"
  },
  */
  /* gzipped file too big, 7.4 kB is not "micro"
  {
    name: "svg.js",
    github: "wout/svg.js",
    tags: ["svg", "vector", "graphics"],
    description: "A lightweight library for manipulating SVG.",
    url: "https://github.com/wout/svg.js",
    source: "https://raw.githubusercontent.com/wout/svg.js/master/dist/svg.js"
  },
  */
  {
    name: "isMobile",
    github: "kaimallea/isMobile",
    tags: ["mobile", "mobile device", "tablet"],
    description: "A simple JS library that detects if the device visiting the page is an Apple phones/tablet, Android phone/tablet, or a seven inch device (Nexus 7, Kindle Fire, Nook Tablet, Galaxy Tab)",
    url: "https://github.com/kaimallea/isMobile",
    source: "https://raw.githubusercontent.com/kaimallea/isMobile/master/isMobile.js"
  },
  {
    name: "tinyrequire",
    github: "adriancooney/tinyrequire",
    tags: ["modules", "loader", "require", "define", "dependency", "manager"],
    description: "To the point dependency management.",
    url: "https://github.com/adriancooney/tinyrequire",
    source: "https://raw.githubusercontent.com/adriancooney/tinyrequire/master/src/tinyrequire.js"
  },
  {
    name: "fuzzy.js",
    github: "Extaze/fuzzy.js",
    tags: ["search", "fuzzy", "filter"],
    description: "Fuzzy.js is a fuzzy search algorithm in javascript",
    url: "https://github.com/Extaze/fuzzy.js",
    source: "https://raw.githubusercontent.com/Extaze/fuzzy.js/master/fuzzy.js"
  },
  {
    name: "spooks.js",
    github: "philbooth/spooks.js",
    tags: ["unit test", "spy", "spies", "mock", "fake", "dummy", "double", "stub"],
    description: "A small library for creating unit test spies.",
    url: "https://github.com/philbooth/spooks.js",
    source: "https://raw.githubusercontent.com/philbooth/spooks.js/master/src/spooks.js"
  },
  {
    name: "Respond.js",
    github: "scottjehl/Respond",
    tags: ["polyfill", "min-width", "max-width", "Media Queries", "CSS3"],
    description: "A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more).",
    url: "https://github.com/scottjehl/Respond",
    source: "https://raw.githubusercontent.com/scottjehl/Respond/master/dest/respond.src.js"
  },
 {
    name: "miuri.js",
    github: "radmen/miuri.js",
    tags: ["client", "server", "util", "parser", "uri"],
    description: "Simple URI parser/builder",
    url: "https://github.com/radmen/miuri.js",
    source: "https://raw.githubusercontent.com/radmen/miuri.js/master/lib/miuri.js"
 },
 {
    name: "RSVP.js",
    github: "tildeio/rsvp.js",
    tags: ["Promises/A+", "asynchronous"],
    description: "it is a tiny implementation of Promises/A+ and a mixin for turning objects into event targets. It works in node and the browser.",
    url: "https://github.com/tildeio/rsvp.js",
    source: "http://rsvpjs-builds.s3.amazonaws.com/rsvp-latest.js"
  },
 {
    name: "Chibi",
    github: "kylebarrow/chibi",
    tags: ["chibi", "framework"],
    description: "A tiny JavaScript micro-framework.",
    url: "https://github.com/kylebarrow/chibi",
    source: "https://raw.githubusercontent.com/kylebarrow/chibi/master/chibi.js"
  },
  {
    name: "check-types.js",
    github: "philbooth/check-types.js",
    tags: ["types", "type-checking", "duck-typing"],
    description: "A small library for checking types and throwing exceptions.",
    url: "https://github.com/philbooth/check-types.js",
    source: "https://raw.githubusercontent.com/philbooth/check-types.js/master/src/check-types.js"
  },
  {
    name: "augment",
    github: "javascript/augment",
    tags: ["augment", "augments", "augmentation", "extend", "extends", "extension", "prototype", "prototypal", "class", "classical", "object", "inheritance", "uber", "super", "constructor", "oop"],
    description: "The world's smallest and fastest classical JavaScript inheritance pattern.",
    url: "https://github.com/javascript/augment",
    source: "https://raw.githubusercontent.com/javascript/augment/master/augment.js"
  },
  {
    name: "lexer",
    github: "aaditmshah/lexer",
    tags: ["lex", "lexer", "lexical", "analysis", "scan", "scanner", "scanning", "token", "tokenize", "tokenizer", "tokenization", "flex", "jison"],
    description: "An elegant armor-plated JavaScript lexer modelled after flex. Easily extensible to tailor to your need for perfection.",
    url: "https://github.com/aaditmshah/lexer",
    source: "https://raw.githubusercontent.com/aaditmshah/lexer/master/lexer.js"
  },
  {
    name: "kebab.js",
    github: "thlorenz/kebab",
    tags: [ "pubsub", "queue" ],
    description: "Half queue half pubsub. Super small and simple queue that supports subscribers",
    url: "https://github.com/thlorenz/kebab",
    source: "https://raw.githubusercontent.com/thlorenz/kebab/master/kebab.js"
  },
  {
    name: "infuse.js",
    github: "soundstep/infuse.js",
    tags: ["ioc", "di", "injection", "dependency", "framework"],
    description: "IOC library to handle dependency injection",
    url: "https://github.com/soundstep/infuse.js",
    source: "https://raw.githubusercontent.com/soundstep/infuse.js/master/src/infuse.js"
  },
  {
    name: "css.js",
    github: "radmen/css.js",
    tags: ["util", "css", "client", "browser"],
    description: "Handles dynamic style sheets",
    url: "https://github.com/radmen/css.js",
    source: "https://raw.githubusercontent.com/radmen/css.js/master/css.js"
  },
  /* disappeared
  {
    name: "compare.js",
    github: "goloroden/compare.js",
    tags: ["compare"],
    description: "compare.js implements JavaScript's comparison operators for Node.js and the browser the way you would expect them to be.",
    url: "https://github.com/goloroden/compare.js",
    source: "https://raw.githubusercontent.com/goloroden/compare.js/master/bin/compare.js"
  },
  */
  {
    name: "vagueTime.js",
    github: "philbooth/vagueTime.js",
    tags: ["time", "date"],
    description: "formats time differences as a vague time, e.g. 'just now' or '3 weeks ago'",
    url: "https://github.com/philbooth/vagueTime.js",
    source: "https://raw.githubusercontent.com/philbooth/vagueTime.js/master/src/vagueTime.js"
  },
  {
    name: "disTime.js",
    github: "SimonWaldherr/disTime.js",
    tags: ["time", "date", "dates", "times", "language", "ago"],
    description: "converts and updates UNIX-Timestamps to strings like \"5 days ago\" in six languages (en, de, it, es, fr, pt)",
    url: "https://github.com/SimonWaldherr/disTime.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/disTime.js/master/disTime.js"
  },
  {
    name: "parseTime.js",
    github: "SimonWaldherr/parseTime.js",
    tags: ["time", "date", "dates", "times", "language", "parse", "strings"],
    description: "convert strings like \"five days ago\" to an integer (with time in milliseconds) in three languages (en, de, pt)",
    url: "https://github.com/SimonWaldherr/parseTime.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/parseTime.js/master/parseTime.js"
  },
  {
    name: "is.js",
    github: "Cedriking/is.js",
    tags: ["condition", "validate"],
    description: "Micro javascript library that allows you to do conditions faster.",
    url: "https://github.com/Cedriking/is.js",
    source: "https://raw.githubusercontent.com/Cedriking/is.js/master/is.js"
  },
  {
    name: "jBone",
    github: "kupriyanenko/jbone",
    tags: ["base", "events", "html", "performance", "backbone", "jquery", "attributes", "manipulations", "dom", "mobile"],
    description: "JavaScript Library for Events and DOM manipulation. Replacement jQuery for Backbone in browsers.",
    url: "https://github.com/kupriyanenko/jbone",
    source: "https://raw.githubusercontent.com/kupriyanenko/jbone/master/dist/jbone.js"
  },
  {
    name: "bitarray.js",
    github: "madrobby/bitarray.js",
    tags: ["data"],
    description: "simple bit fields and arrays with pure JavaScript",
    url: "http://github.com/madrobby/bitarray.js",
    source: "https://raw.githubusercontent.com/madrobby/bitarray.js/master/bitarray.js"
  },
  /* no longer micro
  {
    name: "Qatrix",
    github: "qatrix/Qatrix",
    tags: ["framework"],
    description: "A lightweight JavaScript framework for easily building up high performance web application with less code",
    url: "http://qatrix.com",
    source: "http://qatrix.com/files/qatrix-1.0.2"
  },
  */
  {
    name: "Smoothie Charts",
    github: "joewalnes/smoothie",
    tags: ["canvas", "charts", "graphs"],
    description: "Smooooooth JavaScript charts for realtime streaming data",
    url: "http://smoothiecharts.org/",
    source: "https://raw.githubusercontent.com/joewalnes/smoothie/master/smoothie.js"
  },
  {
    name: "svg-path.js",
    tags: ["SVG", "raphael", "graphics"],
    description: "Chainable SVG path string generator with some sugar added",
    url: "https://github.com/ZIJ/svg-path",
    source: "https://raw.githubusercontent.com/ZIJ/svg-path/master/svg-path.js"
  },
  {
    name: "DOMinate",
    github: "adius/DOMinate",
    tags: ["dom-builder", "dom", "templating"],
    description: "DOMinate the DOM with this simple, yet powerful DOM building utility and template engine.",
    url: "https://github.com/adius/DOMinate/",
    source: "https://raw.githubusercontent.com/adius/DOMinate/master/src/dominate.js"
  },
  {
    name: "soma.js",
    github: "somajs/somajs",
    tags: ["framework", "mvc", "events", "command", "observer"],
    description: "Javascript mvc framework that help developers write loosely-coupled applications to increase scalability and maintainability.",
    url: "http://somajs.github.io/somajs/",
    source: "https://raw.githubusercontent.com/somajs/somajs/master/build/soma.js"
  },
  {
    name: "Minion",
    tags: ["class", "inheritance", "namespace", "dependencies", "pubsub", "notifications"],
    description: "Cross-platform & cross-browser classical inheritance in JavaScript",
    url: "https://github.com/gigafied/minion",
    source: "https://raw.githubusercontent.com/gigafied/minion/master/dist/minion-latest.js"
  },
  {
    name: "Panzer",
    tags: ["data"],
    description: "A comprehensive node-tree solution, for smart data",
    url: "https://github.com/bemson/Panzer",
    source: "https://raw.githubusercontent.com/bemson/Panzer/master/src/panzer.js"
  },
  {
    name: "one-color",
    tags: ["color"],
    description: "Browser/node color library. Implicit color space conversions, chainable channel methods and CSS convenience methods. RGB, HSV, HSL, CMYK with alpha channel",
    url: "https://github.com/One-com/one-color",
    source: "https://raw.githubusercontent.com/One-com/one-color/master/one-color-debug.js"
  },
  /* gzipped file too big, 5.9 kB is not "micro"
  {
    name: "Validation",
    tags: ["validation", "testing"],
    description: "Browser/node validation library. Functions available. Regex fragments available. Validates: url, email, domain, TLD, uuid, ipv4 and more.",
    url: "https://github.com/One-com/one-validation",
    source: "https://raw.githubusercontent.com/One-com/one-validation/master/validation.js"
  },
  */
  {
    name: "Histogram",
    tags: ["canvas", "color"],
    description: "Provides a histogram data structure from a PNG/JPEG/GIF image path. NodeJS, AMD module and vanilla JS support",
    url: "https://github.com/Munter/node-histogram",
    source: "https://raw.githubusercontent.com/Munter/node-histogram/master/lib/index.js"
  },
  {
    name: "Simplify.js",
    tags: ["math", "geometry", "simplification", "polyline"],
    description: "A tiny high-performance JavaScript 2D/3D polyline simplification library.",
    url: "http://mourner.github.io/simplify-js/",
    source: "https://raw.githubusercontent.com/mourner/simplify-js/master/simplify.js"
  },
  {
    name: "TinyDOM",
    tags: ["dom"],
    description: "A very small DOM manipulation framework",
    url: "https://github.com/ctult/TinyDOM",
    source: "https://raw.githubusercontent.com/ctult/TinyDOM/master/tinyDOM.js"
  },
  {
    name: "DOMpteur",
    github: "SimonWaldherr/DOMpteur",
    tags: ["dom", "ready", "html", "getElement", "selector"],
    description: "play with the Document Object Model (DOM) tree - change and insert Elements.",
    url: "https://github.com/SimonWaldherr/DOMpteur",
    source: "https://raw.githubusercontent.com/SimonWaldherr/DOMpteur/master/DOMpteur.js"
  },
  {
    name: "cssFx",
    tags: ["css", "css3", "polyfill"],
    description: "Standalone polyfill that inserts the vendor-specific CSS3 properties necessary for old and new browsers.",
    url: "http://imsky.github.io/cssFx/",
    source: "https://raw.githubusercontent.com/imsky/cssFx/master/cssfx.js"
  },
  {
    name: "shorttag.js",
    tags: ["templating"],
    description: "templating engine for node and browser.",
    url: "https://github.com/jeromeetienne/shorttag.js",
    source: "https://raw.githubusercontent.com/jeromeetienne/shorttag.js/master/lib/shorttag.js"
  },
  {
    name: "microcache.js",
    tags: ["data", "storage", "cache"],
    description: "in-memory cache for node and browser.",
    url: "https://github.com/jeromeetienne/microcache.js",
    source: "https://raw.githubusercontent.com/jeromeetienne/MicroCache.js/master/microcache.js"
  },
  {
    name: "TinyCore.js",
    tags: ["architecture","module","scalable","spa"],
    description: "A tiny JavaScript modular architecture library.",
    url: "https://github.com/mawrkus/tinycore",
    source: "https://raw.githubusercontent.com/mawrkus/tinycore/master/build/TinyCore.js"
  },
  {
    name: "microevent.js",
    tags: ["events", "node"],
    description: "event emitter for any javascript object for node and browser.",
    url: "https://github.com/jeromeetienne/microevent.js",
    source: "https://raw.githubusercontent.com/jeromeetienne/microevent.js/master/microevent.js"
  },
  {
    name: "dropinrequire.js",
    tags: ["loader", "commonjs", "require", "node"],
    description: "dropin replacement for require() in browser.",
    url: "http://jeromeetienne.github.io/dropinrequire.js/",
    source: "https://raw.githubusercontent.com/jeromeetienne/dropinrequire.js/master/dropin_require.js"
  },
  {
    name: "gowiththeflow.js",
    tags: ["functional", "async", "defered"],
    description: "Async flow control micro library for node and browser.",
    url: "https://github.com/jeromeetienne/gowiththeflow.js",
    source: "https://raw.githubusercontent.com/jeromeetienne/gowiththeflow.js/master/gowiththeflow.js"
  },
  {
    name: "creatorpattern.js",
    tags: ["pattern", "creator", "node", "browser"],
    description: "Micro library to easily add the creator pattern to your class.",
    url: "https://github.com/jeromeetienne/creatorpattern.js",
    source: "https://raw.githubusercontent.com/jeromeetienne/creatorpattern.js/master/creatorpattern.js"
  },
  /* Too big, 5.5kb
  {
    name: "Prevel Framework",
    tags: ["dom", "ajax", "events", "css"],
    description: "All-purpose development tool (CSS query selector, DOM, Ajax, etc).",
    url: "https://github.com/chernikovalexey/Prevel",
    source: "https://raw.githubusercontent.com/chernikovalexey/Prevel/master/prevel-full.js"
  },
  */
  {
    name: "genData",
    tags: ["data"],
    description: "A normalization pattern to build, query, and manipulate everything.",
    url: "https://github.com/bemson/genData/",
    source: "https://raw.githubusercontent.com/bemson/genData/master/src/gendata.js"
  },
  {
    name: "Pass-Meter.js",
    tags: ["password", "strength", "meter"],
    description: "Simple password strength testing.",
    url: "https://github.com/syntaqx/pass-meter",
    source: "https://raw.githubusercontent.com/syntaqx/pass-meter/master/dist/pass-meter.js"
  },
  {
    name: "GSet",
    tags: ["data", "compose"],
    description: "Share and control public proxies of private objects, with same-name getter/setters.",
    url: "https://github.com/bemson/GSet/",
    source: "https://raw.githubusercontent.com/bemson/GSet/master/src/gset.js"
  },
  {
      name: "nTh",
      tags: ["string", "numbers", "formatting", "language","text"],
      description: "A micro-library to return ordinal suffixes from integers (ie: 1st, 2nd, 3rd, 7th of 9)",
      url: "https://github.com/dperish/nTh.js",
      source: "https://raw.githubusercontent.com/dperish/nTh.js/master/nTh.js"
  },
  {
    name: "Slang",
    tags: ["string", "functional", "language"],
    description: "A collection of utility functions for strings",
    url: "https://github.com/devongovett/slang",
    source: "https://raw.githubusercontent.com/devongovett/slang/master/slang.js"
  },
  {
    name: "Rococo",
    github: "schuttelaar/Rococo",
    tags: ["mvc", "data", "functional", "events"],
    description: "Rococo is a Micro Framework to create elegant and robust Javascript Applications.",
    url: "http://rococojs.org/",
    source: "https://raw.githubusercontent.com/schuttelaar/Rococo/master/rococo.js"
  },
  {
    name: "Backbone",
    github: "jashkenas/backbone",
    tags: ["mvc", "data", "functional"],
    description: "Lightweight MVC—models with custom events, collections with rich enumerables, views and RESTful JSON.",
    url: "http://backbonejs.org/",
    source: "http://backbonejs.org/backbone.js"
  },
  {
    name: "$dom",
    tags: ["dom", "events", "animation"],
    description: "Selecting, styling, traversing and animating DOM elements.",
    url: "https://github.com/julienw/dollardom",
    source: "https://raw.githubusercontent.com/julienw/dollardom/master/src/dollardom.js"
  },
  {
    name: "DOMBrew",
    tags: ["dom", "dom-builder"],
    description: "Clean API high performance DOM builder",
    url: "https://github.com/glebm/DOMBrew",
    source: "https://raw.githubusercontent.com/glebm/DOMBrew/master/dombrew.js"
  },
  {
    name: "HEX/RGB",
    tags: ["color"],
    description: "Two way color conversion for Hexadecimal and RGB integer colors",
    url: "https://github.com/daniellmb/HEX-RGB-Conversion",
    source: "https://raw.githubusercontent.com/daniellmb/HEX-RGB-Conversion/master/hex-rgb.src.js",
    tinyminify: true // this source has a ton of comments so the minified version is tiny compared to raw, so
                     // we overrule the sanity-check that compares the sizes and would otherwise reject this
  },
  {
    name: "server2.js",
    tags: ["server", "pubsub", "events", "base"],
    description: "Transfer data objects from server to javascript on page load",
    url: "https://github.com/thanpolas/server2js",
    source: ["https://raw.githubusercontent.com/thanpolas/server2js/master/src/server2.js",
             "https://raw.githubusercontent.com/thanpolas/server2js/master/src/server2js.export.js",
             "https://raw.githubusercontent.com/thanpolas/server2js/master/lib/goog.string.js",
             "https://raw.githubusercontent.com/thanpolas/server2js/master/lib/server2js.node.js"]
  },
  {
    name : "smoke-pure.js",
    github : "agamemnus/smoke-pure.js",
    tags : ["modal library", "simple modal library", "modal", "simple modal", "alert", "confirm", "prompt"],
    description : "A simple modal library for JS.",
    url : "https://github.com/agamemnus/smoke-pure.js",
    source : "https://raw.githubusercontent.com/agamemnus/smoke-pure.js/gh-pages/smoke-pure.js"
  },
  {
    name: "ready.js",
    tags: ["async", "node.js", "watch", "flow", "flow control"],
    description: "Monitor multiple async operations and triggers when all or some are complete.",
    url: "https://github.com/thanpolas/ready.js",
    source: "https://raw.githubusercontent.com/thanpolas/ready.js/master/lib/ready.js"
  },
  {
    name: "VUnit",
    tags: ["vw", "vh", "viewport", "CSS", "javascript"],
    description: "A fast alternative for viewport-relative dimensions. RIP buggy vh and vw CSS units.",
    url: "https://github.com/joaocunha/v-unit",
    source: "https://raw.githubusercontent.com/joaocunha/v-unit/master/v-unit.js"
  },
  {
    name: "MinPubSub",
    tags: ["events", "pubsub"],
    description: "A publish/subscribe messaging framework",
    url: "https://github.com/daniellmb/MinPubSub",
    source: "https://raw.githubusercontent.com/daniellmb/MinPubSub/master/minpubsub.src.js"
  },
  {
    name: "Modernizr",
    github: "Modernizr/Modernizr",
    tags: ["feature"],
    description: "Detects native CSS3 and HTML5 features available in the current browser.",
    url: "http://www.modernizr.com/",
    source: "http://modernizr.com/downloads/modernizr-latest.js"
  },
  {
    name: "Namespacer",
    tags: ["namespace", "modules"],
    description: "A simple library for creating namespaced objects in the browser.",
    url: "https://github.com/sporto/namespacer.js",
    source: "https://raw.githubusercontent.com/sporto/namespacer.js/master/src/namespacer.js"
  },
  {
    name: "Zepto",
    tags: ["base", "dom", "webkit", "jquery", "ajax", "events", "mobile"],
    description: "jQuery API-compatible framework for modern web browsers. Optional Ajax, Events, Data and Touch modules.",
    url: "http://zeptojs.com",
    source: "https://raw.githubusercontent.com/madrobby/zepto/master/src/zepto.js"
  },
  {
    name: "xui",
    github: "xui/xui",
    tags: ["base", "dom", "mobile", "ajax", "events", "webkit", "animation"],
    description: "DOM library for authoring HTML5 mobile web applications, works cross-device and cross-platform.",
    url: "http://xuijs.com",
    source: ["https://raw.githubusercontent.com/xui/xui/master/src/header.js",
             "https://raw.githubusercontent.com/xui/xui/master/src/base.js",
             "https://raw.githubusercontent.com/xui/xui/master/src/footer.js"]
  },
  {
    name: "Underscore",
    github: "jashkenas/underscore",
    tags: ["functional", "language", "data"],
    description: "A utility-belt that provides functional programming support that you would expect in Ruby.",
    url: "http://underscorejs.org/",
    source: "http://underscorejs.org/underscore.js"
  },
  {
    name: "Lemonad",
    github: "fogus/lemonad",
    tags: ["functional", "monads", "data", "protocols"],
    description: "A functional library inspired by Clojure and ClojureScript, built on Underscore",
    url: "http://functionaljs.org/",
    source: "https://raw.githubusercontent.com/fogus/lemonad/master/lib/lemonad.js"
  },
  {
    name: "Weld",
    tags: ["templating"],
    description: "Completely unobtrusive, full featured template antimatter. Works in Node.js or the Browser, awesome built-in debugger.",
    url: "http://github.com/tmpvar/weld",
    source: "https://raw.githubusercontent.com/tmpvar/weld/master/lib/weld.js"
  },
  {
    name: "Mustache",
    tags: ["templating"],
    description: "Minimal, logic-less templating with {{mustaches}}. Great for server- or client-side templating.",
    url: "http://mustache.github.io/",
    source: "https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js"
  },
  {
    name: "LABjs",
    tags: ["loader"],
    description: "The *performance* script loader: on-demand parallel script loading with ordered execution for dependencies.",
    url: "http://labjs.com/",
    source: "https://raw.githubusercontent.com/getify/LABjs/master/LAB.js"
  },
  {
    name: "Qwery",
    tags: ["css"],
    description: "Blazing fast query selector engine allowing you to select elements with CSS1, CSS2 & CSS3 selectors.",
    url: "https://github.com/ded/qwery",
    source: "https://raw.githubusercontent.com/ded/qwery/master/qwery.js"
  },
  /* Too big, 5.5 kb
  {
    name: "Slick",
    tags: ["css"],
    description: "Accurate selector engine w/ CSS3 selectors and extensions like 'reverse combinators'.",
    url: "https://github.com/mootools/slick",
    source: [ "https://raw.githubusercontent.com/mootools/slick/master/Source/Slick.Finder.js",
              "https://raw.githubusercontent.com/mootools/slick/master/Source/Slick.Parser.js",
              "https://raw.githubusercontent.com/mootools/slick/master/Source/slick.js" ]
  },
  */
  {
    name: "expando-js",
    github: "jtenner/expando-js",
    tags: ["template", "emmet", "shorthand", "javascript"],
    description: "A blazing fast HTML generation tool that expands shorthand into (X)HTML",
    url: "https://github.com/jtenner/expando-js",
    source: "https://raw.githubusercontent.com/jtenner/expando-js/master/expando.js"
  },
  {
    name: "Composer.js",
    github: "jtenner/Composer.js",
    tags: ["oo", "prototype","object", "composition", "mixin"],
    description: "Compose objects with the flavor of musical functions. Simply include Composer.js on your page.",
    url: "https://github.com/jtenner/Composer.js",
    source: "https://raw.githubusercontent.com/jtenner/Composer.js/master/Composer.js"
  },
  {
    name: "Sly",
    tags: ["css"],
    description: "Sly is a query selector engine allowing you to select elements with CSS1, CSS2 & CSS3 selectors.",
    url: "https://github.com/digitarald/sly",
    source: "https://raw.githubusercontent.com/digitarald/sly/master/Sly.js"
  },
  {
    name: "Jaguar",
    tags: ["css"],
    description: "A lightweight, extensible, and fast selector engine with excellent support for matchesSelector(), commonly used in event delegation. Jaguar supports all CSS1, CSS2, and most CSS3 selectors.",
    url: "https://github.com/alpha123/Jaguar",
    source: "https://raw.githubusercontent.com/alpha123/Jaguar/master/src/jaguar.js"
  },
  {
    name: "Émile",
    tags: ["animation", "jsanimation"],
    description: "Émile is a no-frills stand-alone CSS animation JavaScript framework",
    url: "https://github.com/madrobby/emile",
    source: "https://raw.githubusercontent.com/madrobby/emile/master/emile.js"
  },
  {
    name: "Lawnchair",
    github: "brianleroux/lawnchair",
    tags: ["data", "storage", "webkit", "mobile"],
    description: "Client side JSON document store. Perfect for WebKit mobile apps.",
    url: "http://brian.io/lawnchair/",
    source: "https://raw.githubusercontent.com/brianleroux/lawnchair/master/src/Lawnchair.js"
  },
  /* Too Big 7kb
  {
    name: "ExplorerCanvas",
    tags: ["polyfill", "canvas"],
    description: "HTML5 canvas tag support for Internet Explorer.",
    url: "http://code.google.com/p/explorercanvas/",
    source: "http://explorercanvas.googlecode.com/svn/trunk/excanvas.js"
  },
  */
  {
    name: "Placeholder.js",
    tags: ["polyfill"],
    description: "Adds support for the placeholder attribute in older browsers that don't support this HTML5 feature.",
    url: "https://github.com/NV/placeholder.js",
    source: "http://nv.github.io/placeholder.js/placeholder.js"
  },
  /* N/A
  {
    name: "Micro-Templating",
    tags: ["templating"],
    description: "Templating function that is fast, caches quickly, and is easy to use.",
    url: "http://ejohn.org/blog/javascript-micro-templating/",
    source: "http://www.manning.com/resig/JavaScriptNinjaSourceCode.zip!/code/07/11.js"
  },
  */
  {
    name: "Transparency.js",
    tags: ["templating"],
    description: "Semantic template engine for the browser that maps JSON objects to DOM elements by id, class and data-bind attributes.",
    url: "https://github.com/leonidas/transparency",
    source: "https://raw.githubusercontent.com/leonidas/transparency/master/lib/transparency.js"
  },
  {
    name: "BuildSugar",
    tags: ["templating"],
    description: "Bizarrely clean & simple syntax sugar for building HTML/XML strings",
    url: "http://jsfiddle.net/SubtleGradient/4W3RR/",
    source: "https://gist.githubusercontent.com/subtleGradient/278016/raw/BuildSugar.SubtleGradient.js"
  },
  {
    name: "Tweet-Templ",
    tags: ["templating"],
    description: "function t(s,d){for(var p in d)s=s.replace(new RegExp('{'+p+'}','g'),d[p]);return s;}",
    url: "http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/",
    source: "function t(s,d){ for(var p in d) s=s.replace(new RegExp('{'+p+'}','g'), d[p]); return s; }"
  },
  {
    name: "RegexGen.js",
    github: "amobiz/regexgen.js",
    tags: ["regex", "regular expression", "generator"],
    description: "RegexGen.js is a JavaScript regular expression generator that helps to construct complex regular expressions.",
    url: "http://amobiz.github.io/regexgen.js/",
    source: "https://raw.githubusercontent.com/amobiz/regexgen.js/master/dist/regexgen.js"
  },
  {
    name: "Firmin",
    github: "beastaugh/firmin",
    tags: ["animation", "webkit"],
    description: "Animation library that uses CSS transforms and transitions to create smooth, hardware-accelerated animations.",
    url: "http://extralogical.net/projects/firmin/",
    source: "https://raw.githubusercontent.com/beastaugh/firmin/master/src/firmin.js"
  },
  {
    name: "Bonzo",
    tags: ["dom"],
    description: "Hassle-free, library agnostic, extensible DOM utility.",
    url: "https://github.com/ded/bonzo",
    source: "https://raw.githubusercontent.com/ded/bonzo/master/bonzo.js"
  },
  {
    name: "Bean",
    tags: ["events", "dom"],
    description: "Bean is a slick, cross-platform, framework-agnostic event utility designed for desktop, mobile, and touch-based browsers. ",
    url: "https://github.com/fat/bean",
    source: "https://raw.githubusercontent.com/fat/bean/master/bean.js"
  },
  {
    name: "$script.js",
    tags: ["loader"],
    description: "An asynchronous JavaScript loader and dependency manager with an astonishingly impressive footprint.",
    url: "https://github.com/ded/script.js",
    source: "https://raw.githubusercontent.com/ded/script.js/master/dist/script.js"
  },
  {
    name: "Klass",
    tags: ["language", "class"],
    description: "An expressive, cross platform JavaScript Class provider with a slick, classical interface to prototypal inheritance.",
    url: "https://github.com/ded/klass",
    source: "https://raw.githubusercontent.com/ded/klass/master/klass.js"
  },
  {
    name: "OORJa",
    tags: ["language", "class"],
    description: "OORJa = Object Oriented JavaScript",
    url: "http://maxpert.github.io/oorja/",
    source: "https://raw.githubusercontent.com/maxpert/oorja/master/Class.js"
  },
  {
    name: "Classy",
    tags: ["language", "class"],
    description: "Classy is a small JavaScript library that implements Python inspired classes for JavaScript.",
    url: "http://classy.pocoo.org/",
    source: "https://raw.githubusercontent.com/mitsuhiko/classy/master/classy.js"
  },
  /* versioned releases, removed
  {
    name: "Milk",
    tags: ["templating"],
    description: "Spec-compatible (v1.1+λ) Mustache templating: written in CoffeeScript, runnable anywhere.",
    url: "https://github.com/pvande/Milk",
    // version is current as of 18-JUN-2013, 2 years old
    source: "https://raw.githubusercontent.com/pvande/Milk/master/dist/v1.2.0/milk.js"
    //source: "https://raw.githubusercontent.com/pvande/Milk/master/milk.coffee"
  },
  */
  {
    name: "Director",
    tags: ["spa"],
    description: "A lightweight, full featured client side router for single page apps.",
    url: "https://github.com/flatiron/director",
    source: "https://raw.githubusercontent.com/flatiron/director/master/build/director.js"
  },
  {
    name: "snack.js",
    tags: ["base", "dom", "events", "ajax", "language"],
    description: "A tiny, cross-browser, library with DOM manipulation, events, pub/sub, Ajax and language utilities.",
    url: "http://snackjs.com/",
    source: "https://raw.githubusercontent.com/rpflorence/snack/master/builds/snack.js"
  },
  {
    name: "Ender",
    tags: ["compose", "base", "mobile"],
    description: "An open, powerful, micro-to-macro API for composing your own custom JavaScript library.",
    url: "http://ender.no.de",
    source: "https://raw.githubusercontent.com/ender-js/ender-js/master/ender.js"
  },
  {
    name: "Mold",
    github: "marijnh/mold",
    tags: ["templating"],
    description: "Mold is a templating library.",
    url: "http://marijnhaverbeke.nl/mold/",
    source: "https://raw.githubusercontent.com/marijnh/mold/master/mold.js"
  },
  /* gzipped file too big, 5.1 kB is not "micro"
  {
    name: "Tempo",
    tags: ["templating"],
    description: "Tempo is a JSON rendering engine that enables you to craft data templates in pure HTML.",
    url: "http://twigkit.github.io/tempo/",
    source: "https://raw.githubusercontent.com/twigkit/tempo/master/tempo.js"
  },
  */
  {
    name: "Reqwest",
    tags: ["ajax"],
    description: "Robust wrapper for asynchronous http requests.",
    url: "https://github.com/ded/Reqwest",
    source: "https://raw.githubusercontent.com/ded/Reqwest/master/reqwest.js"
  },
  {
    name: "majaX.js",
    github: "SimonWaldherr/majaX.js",
    tags: ["ajax", "http", "xml", "csv", "json", "binary", "api"],
    description: "make AJAX Requests and get (parsed) values (and headers).",
    url: "https://github.com/SimonWaldherr/majaX.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/majaX.js/master/majax.js"
  },
  {
    name: "JSON2",
    tags: ["polyfill", "json"],
    description: "Creates a JSON property in the global object, if there  isn't already one, with stringify and parse methods.",
    url: "https://github.com/douglascrockford/JSON-js",
    source: "https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js"
  },
  {
    name: "yepnope",
    tags: ["polyfill", "loader"],
    description: "yepnope is an asynchronous conditional resource loader that allows you to load only the scripts that your users need.",
    url: "http://yepnopejs.com/",
    source: "https://raw.githubusercontent.com/SlexAxton/yepnope.js/master/yepnope.js"
  },
  {
    name: "ICanHaz",
    tags: ["templating"],
    description: "Simple & powerful client-side templating for jQuery or Zepto.js.",
    url: "http://icanhazjs.com/",
    source: "https://raw.githubusercontent.com/HenrikJoreteg/ICanHaz.js/master/ICanHaz.js"
  },
  {
    name: "Q",
    tags: ["functional", "events"],
    description: "when/defer-style promises for JavaScript (CommonJS/Promises/A,B,D)",
    url: "https://github.com/kriskowal/q",
    source: "https://raw.githubusercontent.com/kriskowal/q/v1/q.js"
  },
  {
    name: "domReady",
    tags: ["dom", "event", "ready", "load"],
    description: "Lets you know when the DOM is ready",
    url: "https://github.com/ded/domready",
    source: "https://raw.githubusercontent.com/ded/domready/master/ready.js"
  },
  /* I'm not sure what to do with this, the download is a big ZIP file with 9 .js files, all together gzipped they are nearly 7 KB
  {
    name: "Spine",
    tags: ["mvc"],
    description: "MVC with real protypical inheritance, controllers, model layer and ORM, Ajax and local storage.",
    url: "http://maccman.github.io/spine/",
    source: "http://spinejs.com/pages/download"
  },
  */
  {
    name: "Kizzy",
    tags: ["data", "storage"],
    description: "Cross Browser caching util leveraging LocalStorage and XML Store with a Memcached interface",
    url: "https://github.com/ded/Kizzy",
    source: "https://raw.githubusercontent.com/ded/Kizzy/master/kizzy.js"
  },
  {
    name: "Bowser",
    tags: ["feature"],
    description: "A browser detector. Because when there is no features to detect, sometimes you have to browser sniff",
    url: "https://github.com/ded/bowser",
    source: "https://raw.githubusercontent.com/ded/bowser/master/bowser.js"
  },
  {
    name: "ES5-Shim",
    tags: ["language", "polyfill"],
    description: "Compatibility shims so that legacy JavaScript engines behave as closely as possible to ES5.",
    url: "https://github.com/es-shims/es5-shim/",
    source: "https://raw.githubusercontent.com/es-shims/es5-shim/master/es5-shim.js"
  },
  {
    name: "es6-shim",
    tags: ["language", "polyfill", "shim", "harmony"],
    description: "Compatibility shims so that legacy JavaScript engines behave as closely as possible to ES6 (Harmony).",
    url: "https://github.com/paulmillr/es6-shim/",
    source: "https://raw.githubusercontent.com/paulmillr/es6-shim/master/es6-shim.js"
  },
  {
    name: "ES6-Map-Shim",
    tags: ["language", "polyfill"],
    description: "Shim for latest ES6.next Map spec",
    url: "https://github.com/eriwen/es6-map-shim",
    source: "https://raw.githubusercontent.com/eriwen/es6-map-shim/master/es6-map-shim.js"
  },
  {
    name: "Loadrunner",
    tags: ["loader"],
    description: "Simple, flexible and sane JavaScript loader and build tool for browsers",
    url: "https://github.com/danwrong/loadrunner",
    source: "https://raw.githubusercontent.com/danwrong/loadrunner/master/src/loadrunner.js"
  },
  {
    name: "functools",
    tags: ["functional"],
    description: "A library for functional operations",
    url: "https://github.com/azer/functools",
    source: "https://raw.githubusercontent.com/azer/functools/master/lib/functools.js"
  },
  {
    name: "observer",
    tags: ["observer", "events"],
    description: "CommonJS implementation of the observer design pattern",
    url: "https://github.com/azer/observer",
    source: "https://raw.githubusercontent.com/azer/observer/master/lib/observer.js"
  },
  {
    name: "JsDefer",
    tags: ["loader"],
    description: "Script loader, using the 'Deferred' pattern for async operations.",
    url: "https://github.com/BorisMoore/jsdefer/",
    source: "https://raw.githubusercontent.com/BorisMoore/jsdefer/master/jsdefer.js"
  },
  {
    name: "defer.js",
    tags: ["loader", "async"],
    description: "Predicate-based JS execution engine, for in-page and external scripts. Loads itself asynchronously.",
    url: "https://github.com/wessman/defer.js",
    source: "https://raw.githubusercontent.com/wessman/defer.js/master/src/defer.js"
  },
  {
    name: "Bootstrap",
    tags: ["loader"],
    description: "A small, simple bootloader. No frills. Black and white label.",
    url: "https://bitbucket.org/scott_koon/bootstrap",
    source: "https://bitbucket.org/scott_koon/bootstrap/raw/default/bootstrap.js"
  },
  {
    name: "LazyLoad",
    tags: ["loader"],
    description: "Async JavaScript and CSS loader.",
    url: "https://github.com/rgrove/lazyload",
    source: "https://raw.githubusercontent.com/rgrove/lazyload/master/lazyload.js"
  },
  {
    name: "Valentine",
    tags: ["functional", "language", "data"],
    description: "JavaScripts functional sister providing iterators, type checking, and basic utils",
    url: "https://github.com/ded/valentine",
    source: "https://raw.githubusercontent.com/ded/valentine/master/valentine.js"
  },
  {
    name: "TurtleWax",
    tags: ["canvas", "graphics"],
    description: "LOGO-inspired canvas drawing lib, adds method chaining and polar coordinates for added fun.",
    url: "https://github.com/davebalmer/turtlewax",
    source: "https://raw.githubusercontent.com/davebalmer/turtlewax/master/pen.js" // also needs an extra, small, hsv.js
  },
  {
    name: "picoCSS",
    tags: ["CSS", "CSS3", "mobile"],
    description: "Basic CSS DOM manipulation and animation optimized for webkit browsers(Safari, Chrome) for building mobile web apps",
    url: "https://github.com/vladocar/picoCSS",
    source: "https://raw.githubusercontent.com/vladocar/picoCSS/master/src/picoCSS.js"
  },
  {
    name: "H5F.js",
    tags: ["polyfill"],
    description: "Adds support for HTML5 Forms chapters new field input types, attributes and constraint validation API in non-supporting browsers.",
    url: "https://github.com/ryanseddon/H5F",
    source: "https://raw.githubusercontent.com/ryanseddon/H5F/master/src/H5F.js"
  },
  {
    name: "Store.js",
    tags: ["data", "storage"],
    description: "localStorage wrapper for all browsers without using cookies or flash",
    url: "https://github.com/marcuswestin/store.js",
    source: "https://raw.githubusercontent.com/marcuswestin/store.js/master/store.js"
  },
  {
    name: "Objs",
    tags: ["language"],
    description: "A minimalistic library intended to help in using namespaces and class inheritance in JavaScript.",
    url: "https://github.com/tekool/objs",
    source: "https://raw.githubusercontent.com/tekool/objs/master/src/Objs.js"
  },
  {
    name: "EventEmitter",
    tags: ["events"],
    description: "Evented JavaScript for the browser",
    url: "https://github.com/Wolfy87/EventEmitter",
    source: "https://raw.githubusercontent.com/Wolfy87/EventEmitter/master/EventEmitter.js"
  },
  {
    name: "Color",
    tags: ["color"],
    description: "Color conversion functions for switching between hex decimal, RGB, names and arrays.",
    url: "https://github.com/Wolfy87/Color",
    source: "https://raw.githubusercontent.com/Wolfy87/Color/master/color.js"
  },
  {
    name: "Microajax",
    tags: ["ajax"],
    description: "Simple AJAX library.",
    url: "http://code.google.com/p/microajax/",
    source: "http://microajax.googlecode.com/files/microajax.js"
  },
  {
    name: "Fermata",
    tags: ["ajax"],
    description: "Succinct native REST client, for client-side web apps and node.js. Turns URLs into magic JavaScript objects.",
    url: "https://github.com/natevw/fermata",
    source: "https://raw.githubusercontent.com/natevw/fermata/master/fermata.js"
  },
  {
    name: "Base64.js",
    tags: ["polyfill"],
    description: "`window.btoa` and `window.atob` for browsers which don't provide these functions.",
    url: "https://github.com/davidchambers/Base64.js",
    source: "https://raw.githubusercontent.com/davidchambers/Base64.js/master/base64.js"
  },
  {
    name: "Mibbu",
    tags: ["games", "canvas"],
    description: "Microframework for fast game prototyping using Canvas & DOM",
    url: "https://github.com/michalbe/mibbu",
    source: "https://raw.githubusercontent.com/michalbe/mibbu/master/mibbu.js"
  },
  {
    name: "nimble",
    tags: ["functional", "async"],
    description: "Functional flow-control for JavaScript. Combines features of the underscore and async libraries.",
    url: "http://caolan.github.io/nimble/",
    source: "https://raw.githubusercontent.com/caolan/nimble/master/nimble.js"
  },
  {
    name: "loom",
    tags: ["functional"],
    description: "A simple, four method API for differential inheritance and AOP.",
    url: "https://github.com/rpflorence/loom",
    source: "https://raw.githubusercontent.com/rpflorence/loom/master/loom.js"
  },
  {
    name: "jWorkflow",
    tags: ["functional", "workflow", "async"],
    description: "Simple, buildable, repeatable workflows for client or serverside javascript",
    url: "http://github.com/tinyhippos/jWorkflow",
    source: "https://raw.githubusercontent.com/tinyhippos/jWorkflow/master/lib/jWorkflow.js"
  },
  {
    name: "Events.js",
    tags: ["events", "dom"],
    description: "Cross-browser DOM events, with keystroke handling, hashchange, mouseenter/leave.",
    url: "https://github.com/kbjr/Events.js",
    source: "https://raw.githubusercontent.com/kbjr/Events.js/master/events.js"
  },
  {
    name: "JS-Signals",
    tags: ["events"],
    description: "Custom Event/Messaging system for JavaScript.",
    url: "http://millermedeiros.github.io/js-signals/",
    source: "https://raw.githubusercontent.com/millermedeiros/js-signals/master/dist/signals.js"
  },
  {
    name: "Crossroads.js",
    tags: ["route", "events", "spa"],
    description: "Powerful JavaScript URL routing/dispatch for server-side and client-side applications.",
    url: "http://millermedeiros.github.io/crossroads.js/",
    source: "https://raw.githubusercontent.com/millermedeiros/crossroads.js/master/dist/crossroads.js"
  },
  {
    name: "Hasher",
    tags: ["spa"],
    description: "Browser history manager for rich-media applications.",
    url: "https://github.com/millermedeiros/Hasher",
    source: "https://raw.githubusercontent.com/millermedeiros/Hasher/master/dist/js/hasher.js"
  },
  {
    name: "Artemia",
    tags: ["data", "storage"],
    description: "Artemia is a clientside document store, inspired by Lawnchair.",
    url: "https://github.com/js-experiments/artemia",
    source: [ "https://raw.githubusercontent.com/js-experiments/artemia/master/js/artemia.js",
              "https://raw.githubusercontent.com/js-experiments/artemia/master/js/adaptors.plugins/artemia.storage.js",
              "https://raw.githubusercontent.com/js-experiments/artemia/master/js/adaptors.plugins/artemia.sqlite.storage.js" ]
  },
  {
    name: "js.class",
    tags: ["functional", "class", "extend"],
    description: "Class-based OO for JavaScript.",
    url: "http://code.google.com/p/jsclassextend/",
    source: "http://jsclassextend.googlecode.com/files/js.class.js"
  },
  {
    name: "Satisfy",
    tags: ["html", "css", "selector"],
    description: "CSS Selector to HTML generator.",
    url: "https://github.com/padolsey/satisfy",
    source: "https://raw.githubusercontent.com/padolsey/satisfy/master/satisfy.js"
  },
  /* The gist was removed. It doesn't seem to be maintained
  {
    // can ignore "GitHub says: Not Found" (checked 18-JUN-2013)
    name: "jXHR",
    tags: ["json", "json-p", "xhr", "ajax", "cross-domain"],
    description: "JSON-P based cross-domain Ajax wrapped in the XHR API.",
    url: "https://gist.github.com/marianoviola/1576277",
    source: "https://gist.github.com/marianoviola/1576277/raw/05536a8277e43da988863950a64fe88978f9d4d1/jXHR.js"
  },
  */
  /* dead link
  {
    name: "Ekho",
    tags: ["events"],
    description: "DOM-agnostic event library, with bubbling.",
    url: "https://bitbucket.org/killdream/ekho",
    source: "https://bitbucket.org/killdream/ekho/raw/tip/src/ekho.js"
  },
  */
  {
    name: "JSON.minify",
    tags: ["json"],
    description: "Strip out // and /*..*/ comments from JSON before parsing.",
    url: "http://github.com/getify/JSON.minify",
    source: "https://raw.githubusercontent.com/getify/JSON.minify/master/minify.json.js"
  },
  {
    name: "jaylist",
    tags: ["functional", "extend", "data"],
    description: "A simple wrapper for JavaScript's built-in hash storage.",
    url: "http://benbscholz.github.io/jaylist",
    source: "https://raw.githubusercontent.com/benbscholz/jaylist/master/src/jaylist.js"
  },
  {
    name: "SubtleLocationProxy",
    tags: ["history", "route", "spa"],
    description: "Proxy the location of one window, frame or iframe to the hash of another and vice-versa.",
    url: "https://github.com/subtleGradient/SubtleLocationProxy.js",
    source: "https://raw.githubusercontent.com/subtleGradient/SubtleLocationProxy.js/master/SubtleLocationProxy.js"
  },
  {
    name: "LeviRoutes",
    tags: ["history", "route", "spa"],
    description: "A basic routes framework for JS that hooks in to HTML5 history",
    url: "http://leviroutes.com",
    source: "https://raw.githubusercontent.com/PaulKinlan/leviroutes/master/routes.js"
  },
  {
    name: "FormfactorJS",
    tags: ["formfactor", "loader"],
    description: "A formfactor detection library, to help developers target tablet, tvs, desktops and handhelds (or anything you choose)",
    url: "http://formfactorjs.com",
    source: "https://raw.githubusercontent.com/PaulKinlan/formfactor/master/formfactor.js"
  },
  /* versioned source, versioned directories, wut?
  {
    name: "Head JS",
    tags: ["loader", "polyfill", "feature", "responsive"],
    description: "A responsive design library, with HTML5 and CSS3 polyfills, and asynchronous/conditional asset loading",
    url: "http://headjs.com/",
    source: "https://raw.githubusercontent.com/headjs/headjs/master/dist/head.js"
  },
  */
  {
    name: "Augment.js",
    github: "olivernn/augment.js",
    tags: ["polyfill"],
    description: "Enables use of modern JavaScript by augmenting built in objects with the latest JavaScript methods.",
    url: "http://augmentjs.com",
    source: "https://raw.githubusercontent.com/olivernn/augment.js/master/augment.js"
  },
  {
    name: "thumbs.js",
    tags: ["polyfill"],
    description: "Add touch event support to the desktop and other mouse-based browsers.",
    url: "http://mwbrooks.github.io/thumbs.js/",
    source: "https://raw.githubusercontent.com/mwbrooks/thumbs.js/master/lib/thumbs.js"
  },
  {
    name: "pathparser.js",
    tags: ["route", "routing", "query", "parameters"],
    description: "Tiny, simple-to-use URL parser/router",
    url: "https://github.com/dstillman/pathparser.js",
    source: "https://raw.githubusercontent.com/dstillman/pathparser.js/master/pathparser.js"
  },
  {
    name: "DOMBuilder",
    tags: ["dom", "html"],
    description: "Declarative builder with (mostly) interchangeable DOM or HTML output",
    url: "https://github.com/insin/DOMBuilder",
    source: "https://raw.githubusercontent.com/insin/DOMBuilder/master/dist/DOMBuilder.js"
  },
  {
    name: "my.common.js",
    tags: ["loader", "commonjs"],
    description: "A CommonJS-like script/module loader.",
    url: "https://github.com/jiem/my-common",
    source: "https://raw.githubusercontent.com/jiem/my-common/master/my.common.js"
  },
  {
    name: "my.class.js",
    tags: ["language", "class"],
    description: "Probably the fastest JS class system. No wrappers.",
    url: "https://github.com/jiem/my-class",
    source: "https://raw.githubusercontent.com/jiem/my-class/master/my.class.js"
  },
  {
    name: "Class.js",
    tags: ["language", "class", "inheritance"],
    description: "Lighting fast class system. Beautiful API.",
    url: "https://github.com/DominikGuzei/Class.js",
    source: "https://raw.githubusercontent.com/DominikGuzei/Class.js/master/class.js"
  },
  {
    name: "htmlentities.js",
    tags: ["htmlentities", "decode", "encode", "dom"],
    description: "A minimal html entities decoder/encoder using DOM.",
    url: "https://github.com/jussi-kalliokoski/htmlentities.js",
    source: "https://raw.githubusercontent.com/jussi-kalliokoski/htmlentities.js/master/src/htmlentities.js"
  },
  {
    name: "binary.js",
    tags: ["binary", "decode", "encode"],
    description: "A fast, small, robust and extensible binary conversion library.",
    url: "https://github.com/jussi-kalliokoski/binary.js",
    source: "https://raw.githubusercontent.com/jussi-kalliokoski/binary.js/master/binarystream.js"
  },
  {
    name: "C-qwncr",
    tags: ["async", "animation", "jsanimation"],
    description: "An animation sequencing library that prevents complex animations from starting again before they've completed.",
    url: "https://github.com/vsa-partners/c-qwncr",
    source: "https://raw.githubusercontent.com/vsa-partners/c-qwncr/master/js/c-qwncr.js"
  },
  {
    name: "Timed",
    tags: ["functional", "sugar"],
    description: "Syntactic sugar for JavaScript's setTimeout() and setInterval().",
    url: "https://github.com/ChiperSoft/Timed",
    source: "https://raw.githubusercontent.com/ChiperSoft/Timed/master/timed.js"
  },
  {
    name: "Sslac",
    tags: ["language", "class"],
    description: "A (seemingly backwards) JS class builder with support for runtime patching",
    url: "https://github.com/jakobo/sslac",
    source: "https://raw.githubusercontent.com/Jakobo/Sslac/master/src/sslac.js"
  },
  {
    name: "ShinyCar",
    tags: ["data", "storage"],
    description: "Set localStorage keys and values as objects",
    url: "https://github.com/Poincare/ShinyCar",
    source: "https://raw.githubusercontent.com/Poincare/ShinyCar/master/shinycar.js"
  },
  {
    name: "lscache",
    tags: ["data", "storage"],
    description: "A localStorage-based memcache-inspired client-side caching library.",
    url: "https://github.com/pamelafox/lscache",
    source: "https://raw.githubusercontent.com/pamelafox/lscache/master/lscache.js"
  },
  {
    name: "Evidence",
    tags: ["testing"],
    description: "Evidence is a JavaScript unit testing library. This fork exclusively uses the console to log.",
    url: "https://github.com/madrobby/evidence",
    source: "https://raw.githubusercontent.com/madrobby/evidence/master/src/evidence.js"
  },
  {
    name: "functional.js",
    tags: ["functional", "curry", "arity", "compose", "iterator"],
    description: "A functional JavaScript library that facilitates currying and point-free programming.",
    url: "http://functionaljs.com",
    source: "https://raw.githubusercontent.com/leecrossley/functional-js/master/functional.js",
    github: "leecrossley/functional-js"
  },
  {
    name: "RIP",
    tags: ["rest","request"],
    description: "Make REST requests in FORM contexts, useful to avoid synchroneous ajax requests",
    url: "https://github.com/pyrsmk/RIP",
    source: "https://raw.githubusercontent.com/pyrsmk/RIP/master/src/RIP.js",
    github: "pyrsmk/RIP"
  },
  {
    name: "ClassIE",
    tags: ["feature"],
    description: "ClassIE is an unobstrusive library which detects Internet Explorer version for JS and CSS sides",
    url: "https://github.com/pyrsmk/ClassIE",
    source: "https://raw.githubusercontent.com/pyrsmk/ClassIE/master/src/ClassIE.js",
    github: "pyrsmk/ClassIE"
  },
  {
    name: "Sheethub",
    tags: ["polyfill"],
    description: "A CSS backdoor API for providing awesome scripts in a centralized way",
    url: "https://github.com/pyrsmk/Sheethub",
    source: "https://raw.githubusercontent.com/pyrsmk/Sheethub/master/src/Sheethub.js",
    github: "pyrsmk/Sheethub"
  },
  {
    name: "nut",
    tags: ["css"],
    description: "A concise CSS selector engine",
    url: "https://github.com/pyrsmk/nut",
    source: "https://raw.githubusercontent.com/pyrsmk/nut/master/src/nut.js",
    github: "pyrsmk/nut"
  },
  {
    name: "molt",
    tags: ["responsive"],
    description: "Image updater for responsive designs",
    url: "https://github.com/pyrsmk/molt",
    source: "https://raw.githubusercontent.com/pyrsmk/molt/master/src/molt.js",
    github: "pyrsmk/molt"
  },
  {
    name: "W",
    tags: ["responsive"],
    description: "Width management tool for responsive designers",
    url: "https://github.com/pyrsmk/W",
    source: "https://raw.githubusercontent.com/pyrsmk/W/master/src/W.js",
    github: "pyrsmk/W"
  },
  {
    name: "toast",
    tags: ["loader"],
    description: "A simple CSS and JS resource loader",
    url: "https://github.com/pyrsmk/toast",
    source: "https://raw.githubusercontent.com/pyrsmk/toast/master/src/toast.js",
    github: "pyrsmk/toast"
  },
  {
    name: "mediatizr",
    tags: ["polyfill", "responsive"],
    description: "A media queries polyfill",
    url: "https://github.com/pyrsmk/mediatizr",
    source: "https://raw.githubusercontent.com/pyrsmk/mediatizr/master/src/mediatizr.js",
    github: "pyrsmk/mediatizr"
  },
  {
    name: "qwest",
    tags: ["ajax","async","request"],
    description: "Ajax library with promises and XHR2 support",
    url: "https://github.com/pyrsmk/qwest",
    source: "https://raw.githubusercontent.com/pyrsmk/qwest/master/src/qwest.js",
    github: "pyrsmk/qwest"
  },
  {
    name: "quark",
    tags: ["base"],
    description: "Build your own framework from scratch",
    url: "https://github.com/pyrsmk/quark",
    source: [
       "https://raw.githubusercontent.com/pyrsmk/quark/master/src/quark.js",
       "https://raw.githubusercontent.com/pyrsmk/quark/master/src/starter.js"
    ]
  },
  {
    name: "DragDrop",
    tags: ["dragdrop", "ui"],
    description: "Drag-and-Drop functionality for advanced UI development.",
    url: "https://github.com/kbjr/DragDrop",
    source: "https://raw.githubusercontent.com/kbjr/DragDrop/master/drag-drop.js"
  },
  {
    name: "Async",
    tags: ["control flow", "module", "asynchronous "],
    description: "Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript.",
    url: "https://github.com/caolan/async",
    source: "https://raw.githubusercontent.com/caolan/async/master/lib/async.js"
  },
  {
    name: "Jaml",
    tags: ["templating"],
    description: "Jaml tries to emulate Ruby's Haml library, making it easy to generate HTML in your JavaScript projects.",
    url: "http://edspencer.github.io/jaml/",
    source: "https://raw.githubusercontent.com/edspencer/jaml/master/Jaml-all.js"
  },
  {
    name: "Async GA",
    tags: ["analytics"],
    description: "Reduced Google's original analytics snippet by one third, with better performance.",
    url: "http://mathiasbynens.be/notes/async-analytics-snippet",
    source: "var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];" +
            "(function(d, t) {" +
            "var g = d.createElement(t)," +
            "s = d.getElementsByTagName(t)[0];" +
            "g.src = '//www.google-analytics.com/ga.js';" +
            "s.parentNode.insertBefore(g, s);" +
            "}(document, 'script'));"
  },
  {
    name: "JSONSelect",
    github: "lloyd/JSONSelect",
    tags: ["data", "json"],
    description: "CSS-like selectors for JSON.",
    url: "http://jsonselect.org",
    source: "http://jsonselect.org/js/jsonselect.js"
  },
  {
    name: "Metamorph.js",
    gitub: "tomhuda/metamorph.js",
    tags: ["string", "HTML", "DOM"],
    description: "Metamorph.js is a library that allows you to create a string of HTML, insert it into the DOM, and update the contents later.",
    url: "https://github.com/tomhuda/metamorph.js",
    source: "https://raw.githubusercontent.com/tomhuda/metamorph.js/master/lib/metamorph.js"
  },
  {
    name: "Morpheus",
    tags: ["animation", "jsanimation", "color"],
    description: "An animator that lets you tween in parallel on multiple elements, from integers to colors in a single high-performant loop",
    url: "https://github.com/ded/morpheus",
    source: "https://raw.githubusercontent.com/ded/morpheus/master/morpheus.js"
  },
  {
    name: "Viper",
    tags: ["animation", "jsanimation", "color", "text"],
    description: "A friendly library for changing a property of an object over time. Supports animating numbers, colors, and even strings.",
    url: "https://github.com/alpha123/Viper",
    source: "https://raw.githubusercontent.com/alpha123/Viper/master/src/viper-uncompressed.js"
  },
  {
    name: "microjungle",
    tags: ["templating"],
    description: "very simple and powerful client-side HTML via JSON templating engine.",
    url: "https://github.com/deepsweet/microjungle",
    source: "https://raw.githubusercontent.com/deepsweet/microjungle/master/src/microjungle.js"
  },
  {
    name: "Transe.js",
    tags: ["scroll", "transform", "css", "ui", "creative", "color", "json", "responsive"],
    description: "Transformable scroll elements (with mobile support)",
    url: "https://github.com/yckart/Transe.js",
    source: "https://raw.githubusercontent.com/yckart/Transe.js/master/transe.js"
  },
  {
    name: "SeXHR",
    tags: ["ajax", "xhr", "xmlhttprequest"],
    description: "Simple, succulent and sexy XMLHttpRequest wrapper for the browser",
    url: "https://github.com/skibz/SeXHR",
    source: "https://raw.githubusercontent.com/skibz/SeXHR/master/SeXHR.js",
  },
  {
    name: "CSSDyer.js",
    tags: ["css", "color", "parse", "ui", "rgb", "rgba", "hex", "creative"],
    description: "Create your very own css-color",
    url: "https://github.com/yckart/CSSDyer.js",
    source: "https://raw.githubusercontent.com/yckart/CSSDyer.js/master/cssdyer.js"
  },
  {
    name: "DragValue.js",
    tags: ["ui", "input", "forms", "drag"],
    description: "Change values by dragging it",
    url: "https://github.com/yckart/DragValue.js",
    source: "https://raw.githubusercontent.com/yckart/DragValue.js/master/dragvalue.js"
  },
  {
    name: "Curtain.js",
    tags: ["curtain", "scroll", "transform", "position", "css", "responsive", "creative"],
    description: "Scrolls up your curtain!",
    url: "https://github.com/yckart/Curtain.js",
    source: "https://raw.githubusercontent.com/yckart/Curtain.js/master/curtain.js"
  },
  {
    name: "imageMaps.js",
    tags: ["responsive", "image", "usemap", "imagemap", "map", "area"],
    description: "Responsive image maps to all browsers",
    url: "https://github.com/yckart/imageMaps.js",
    source: "https://raw.githubusercontent.com/yckart/imageMaps.js/master/imagemaps.js"
  },
  {
    name: "SpellChecker.js",
    tags: ["spell-correction", "spell", "linguist", "language", "text"],
    description: "A javascript spell-correction",
    url: "https://github.com/yckart/SpellChecker",
    source: "https://raw.githubusercontent.com/yckart/SpellChecker/master/index.js"
  },
  {
    name: "extnd",
    tags: ["class", "inheritance", "multiple", "super", "extend"],
    description: "Class system with clean implementation and multiple inheritance",
    url: "https://github.com/DominicTobias/extnd",
    source: "https://raw.githubusercontent.com/DominicTobias/extnd/master/extnd.js"
  },
  {
    name: "BinaryHeap.js",
    tags: ["binary", "heap", "binaryheap", "data", "algorithm"],
    description: "Binary Heap implementation in Javascript",
    url: "https://github.com/yckart/BinaryHeap",
    source: "https://raw.githubusercontent.com/yckart/BinaryHeap/master/index.js"
  },
  {
    name: "Undone.js",
    tags: ["undo", "redo", "done", "ui", "functional"],
    description: "The undo/redo manager for well formed javascript applications.",
    url: "https://github.com/yckart/undone.js",
    source: "https://raw.githubusercontent.com/yckart/undone.js/master/undone.js"
  },
  {
    name: "environ",
    tags: ["feature"],
    description: "Cross platform environment detection library.",
    url: "https://github.com/azer/environ",
    source: "https://raw.githubusercontent.com/azer/environ/master/lib/environ.js"
  },
  {
    name: "state-machine",
    tags: ["data", "games", "statemachine"],
    description: "A finite state machine, useful in game development",
    url: "https://github.com/jakesgordon/javascript-state-machine",
    source: "https://raw.githubusercontent.com/jakesgordon/javascript-state-machine/master/state-machine.js"
  },
  {
    name: "Janis",
    tags: ["animation", "ui", "transitions"],
    description: "A simple CSS Transitions animation framework",
    url: "http://mikemctiernan.github.io/Janis/",
    source: "https://raw.githubusercontent.com/MikeMcTiernan/Janis/master/janis.js"
  },
  /* switched to versioned releases, removed
  // requires Underscore, dependency allowed?
  // not really!
  {
    name: "extend.js",
    tags: ["base", "language", "feature"],
    description: "A simple way to define and extend namespaces",
    url: "https://github.com/searls/extend.js",
    source: "https://raw.githubusercontent.com/searls/extend.js/master/src/extend.js"
  },
  */
  {
    name: "System.js",
    tags: ["feature"],
    description: "Generates a JavaScript object with the user's system information.",
    url: "https://github.com/mrdoob/system.js",
    source: "https://raw.githubusercontent.com/mrdoob/system.js/master/src/System.js"
  },
  /* Too big: 8.1 kb
  {
    name: "Benchmark.js",
    tags: ["benchmark", "testing"],
    description: "A benchmarking library that works on nearly all JavaScript platforms, supports high-resolution timers, and returns statistically significant results. As used on jsPerf.com.",
    url: "http://benchmarkjs.com/",
    source: "https://raw.githubusercontent.com/bestiejs/benchmark.js/master/benchmark.js"
  },
  */
  {
    name: "Platform.js",
    github: "bestiejs/platform.js",
    tags: ["feature"],
    description: "A platform detection library that works on nearly all JavaScript platforms.",
    url: "https://github.com/bestiejs/platform.js",
    source: "https://raw.githubusercontent.com/bestiejs/platform.js/master/platform.js"
  },
  {
    name: "Hypher",
    tags: ["hyphenation"],
    description: "Fast and small hyphenation engine for Node.js and the browser",
    url: "https://github.com/bramstein/Hypher",
    source: "https://raw.githubusercontent.com/bramstein/Hypher/master/lib/hypher.js"
  },
  {
    name: "tinyJS",
    tags: ["base", "css", "functional"],
    description: "A tiny yet complete toolkit",
    url: "http://tinyjs.sourceforge.net/tiny.js",
    source: "http://tinyjs.sourceforge.net/tiny.js"
  },
  {
    name:"Vine",
    tags:["events"],
    description:"An events library that supports binding, unbinding, and triggering events on DOM elements or JavaScript Objects",
    url:"https://github.com/arextar/Vine",
    source:"https://raw.githubusercontent.com/arextar/Vine/master/vine.js"
  },
  {
    name: "micro-selector",
    tags: ["css"],
    description: "A micro, super fast, scope limited, javascript selector engine to be used anywhere",
    url: "https://github.com/fabiomcosta/micro-selector",
    source: "https://raw.githubusercontent.com/fabiomcosta/micro-selector/master/dist/uSelector.js"
  },
  {
    name: "Obscura",
    tags: ["canvas", "image", "manipulation"],
    description: "Canvas based image manipulation library",
    url: "https://github.com/OiNutter/Obscura",
    source: "https://raw.githubusercontent.com/OiNutter/Obscura/master/dist/obscura.js"
  },
  {
    name: "imgResize.js",
    tags: ["canvas", "image", "manipulation", "resize"],
    description: "Resize images in a Canvas based on edge detection.",
    url: "https://github.com/SimonWaldherr/imgResize.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/imgResize.js/master/imgresize.js"
  },
  {
    name: "Shifty",
    tags: ["animation", "jsanimation"],
    description: "A teeny tiny tweening engine in JavaScript.",
    url: "https://github.com/jeremyckahn/shifty",
    source: "https://raw.githubusercontent.com/jeremyckahn/shifty/master/dist/shifty.js"
  },
  {
    name: "whenever.js",
    tags: ["events"],
    description: "Specify your app's behavior using a syntax that reads like English",
    url: "https://github.com/paulca/whenever.js",
    source: "https://raw.githubusercontent.com/paulca/whenever.js/master/whenever.js"
  },
  /* Links to a zip file, needs to link to a JS file, couldn't find a reference to a pure js file on the site.
  {
    name: "Sylvester",
    tags: ["svg", "vector", "matrix", "math"],
    description: "A js library for mathematics with vectors and matrices",
    url: "http://sylvester.jcoglan.com/",
    source: "http://sylvester.jcoglan.com/assets/sylvester-0-1-3.zip"
  },
  */
  {
    name: "Include.js",
    tags: ["loader"],
    description: "A tiny and AMD javascript loader with nested dependencies.",
    url: "http://capmousse.github.io/include.js/",
    source: "https://raw.githubusercontent.com/CapMousse/include.js/master/include.js"
  },
  {
    name: "asEvented",
    tags: ["events", "functional"],
    description: "Micro event emitter which provides the observer pattern to JavaScript objects.",
    url: "https://github.com/mkuklis/asEvented",
    source: "https://raw.githubusercontent.com/mkuklis/asEvented/master/asevented.js"
  },
  {
    name: "Keymaster",
    tags: ["events"],
    description: "Define scoped keyboard shortcuts, including modifier keys.",
    url: "https://github.com/madrobby/keymaster",
    source: "https://raw.githubusercontent.com/madrobby/keymaster/master/keymaster.js"
  },
  {
    name: "Date-Utils",
    tags: ["date", "polyfill"],
    description: "Lightweight Date Polyfill with a lot of flexibility.",
    url: "https://github.com/JerrySievert/date-utils",
    source: "https://raw.githubusercontent.com/JerrySievert/date-utils/master/lib/date-utils.js"
  },
  {
    name: "Morf",
    tags: ["animation", "jsanimation"],
    description: "A JavaScript work-around for hardware accelerated CSS3 transitions with custom easing functions.",
    url: "https://github.com/joelambert/morf",
    source: ["https://raw.githubusercontent.com/joelambert/morf/master/js/src/morf.js",
             "https://raw.githubusercontent.com/joelambert/morf/master/js/src/morf.utils.js",
             "https://raw.githubusercontent.com/joelambert/morf/master/js/src/WebkitCSSMatrix.ext.js",
             "https://raw.githubusercontent.com/joelambert/morf/master/js/src/shifty.fn.scripty2.js"]
  },
  {
    name: "youarei.js",
    tags: ["client", "server", "util", "parser", "uri", "url", "query", "parameters","queryparams"],
    description: "URL parsing library with sane parameter handling",
    url: "https://github.com/purge/youarei.js",
    source: "https://raw.githubusercontent.com/purge/youarei.js/master/src/youarei.js"
  },
  {
    name: "typogr.js",
    tags: ["dom", "data", "css", "text", "ui", "typography", "hyphenation"],
    description: "Provides ransformations to plain text for typographically-improved HTML.",
    url: "https://github.com/ekalinin/typogr.js",
    source: "https://raw.githubusercontent.com/ekalinin/typogr.js/master/typogr.js"
  },
  {
    name: "Species",
    tags: ["language", "class"],
    description: "Java style OOP, and AOP ability, watchable members, inheritance and ability to call super members.",
    url: "https://github.com/js-experiments/species",
    source: "https://raw.githubusercontent.com/js-experiments/species/master/js/species.js"
  },
  {
    name: "Maddy",
    github: "bestiejs/maddy",
    tags: ["functional", "language", "data"],
    description: "A functional object operations library.",
    url: "http://bestiejs.github.io/maddy",
    source: "http://bestiejs.github.io/maddy/lib/maddy.js"
  },
  {
    name: "resistance",
    tags: ["async", "flow"],
    description: "A tiny javascript async flow control library.",
    url: "https://github.com/jgallen23/resistance",
    source: "https://raw.githubusercontent.com/jgallen23/resistance/master/dist/resistance.js"
  },
  {
    name: "wru",
    tags: ["testing"],
    description: "essential unit test framework compatible with browsers, node.js, and Rhino",
    url: "https://github.com/WebReflection/wru",
    source: "https://raw.githubusercontent.com/WebReflection/wru/master/build/wru.dom.js"
  },
  {
    name: "Unlimit",
    tags: ["functional", "language"],
    description: "Allows for chaining with native JavaScript objects without extending objects' prototypes.",
    url: "http://limeblack.github.io/UnlimitJS/",
    source: "https://raw.githubusercontent.com/limeblack/UnlimitJS/master/unlimit.js"
  },
  {
    name: "audio-fx",
    tags: ["audio", "games"],
    description: "A HTML5 Audio Library",
    url: "https://github.com/jakesgordon/javascript-audio-fx",
    source: "https://raw.githubusercontent.com/jakesgordon/javascript-audio-fx/master/audio-fx.js"
  },
  {
    name: "swipe",
    tags: ["jsanimation", "mobile"],
    description: "A lightweight 1-to-1 mobile slider. Optimized for touch devices.",
    url: "https://github.com/thebird/Swipe",
    source: "https://raw.githubusercontent.com/thebird/Swipe/master/swipe.js"
  },
  {
    name: "Happen",
    tags: ["events" ],
    description: "General purpose event triggering",
    url: "https://github.com/tmcw/happen",
    source: "https://raw.githubusercontent.com/tmcw/happen/master/happen.js"
  },
  {
    name: "zest",
    tags: ["css", "selector", "dom"],
    description: "An absurdly fast selector engine. Supports CSS3/CSS4 selectors - faster than Sizzle.",
    url: "https://github.com/chjj/zest",
    source: "https://raw.githubusercontent.com/chjj/zest/master/lib/zest.js"
  },
  {
    name: "Cookie Monster",
    tags: ["cookies", "data", "store"],
    description: "A lightweight cookie library",
    url: "https://github.com/jgallen23/cookie-monster",
    source: "https://raw.githubusercontent.com/jgallen23/cookie-monster/master/dist/cookie-monster.js"
  },
  {
    name: "EditrJS",
    tags: ["manipulation", "image", "editing"],
    description: "A very simple image editing library with a chainable api.",
    url: "https://github.com/narfdre/Editr",
    source: "https://raw.githubusercontent.com/narfdre/Editr/master/Editr-src.js"
  },
  {
    name: "hsi.js",
    tags: ["color"],
    description: "A small RGB &lt;-&gt; HSI converter.",
    url: "https://github.com/e-/hsi.js",
    source: "https://raw.githubusercontent.com/e-/hsi.js/master/hsi.js"
  },
  {
    name: "colorspaces.js",
    tags: ["color"],
    description: "Convert between RGB and several CIE color spaces for smarter color manipulation.",
    url: "http://boronine.github.io/colorspaces.js",
    source: "https://raw.githubusercontent.com/boronine/colorspaces.js/master/colorspaces.js"
  },
  {
    name: "husl",
    tags: ["color"],
    description: "A human-friendly alternative to the HSL color space.",
    url: "http://boronine.github.io/husl",
    source: "https://raw.githubusercontent.com/boronine/husl/master/husl.js"
  },
  {
    name: "Fayer",
    tags: ["functional"],
    description: "Easily kick-off page specific JavaScript.",
    url: "https://github.com/sandeepjain/fayer",
    source: "https://raw.githubusercontent.com/sandeepjain/fayer/master/src/fayer.js"
  },
  /* versioned releases, removed
  {
    name: "Supplement.js",
    tags: ["functional", "language", "data", "sugar"],
    description: "A small collection of utility functions to make working with JavaScript that much sweeter and more expressive.",
    url: "http://supplementjs.com",
    // version is current as of 18-JUN-2013, 2 years old
    source: "https://raw.githubusercontent.com/olivernn/supplement.js/master/dist/supplement-0.1.1.js"
  },
  */
  {
    name: "marked",
    tags: ["markdown", "markup", "parser"],
    description: "A markdown parser and compiler. Built for speed.",
    url: "https://github.com/chjj/marked",
    source: "https://raw.githubusercontent.com/chjj/marked/master/lib/marked.js"
  },
  {
    name: "tinyOSF.js",
    tags: ["osf", "markup", "parser", "html", "shownotes", "mp4chaps", "podcast"],
    description: "a few lines of code to convert OSF to HTML.",
    url: "https://github.com/simonwaldherr/tinyOSF.js",
    source: ["https://raw.githubusercontent.com/simonwaldherr/tinyOSF.js/master/tinyosf.js", "https://raw.githubusercontent.com/SimonWaldherr/tinyOSF.js/master/tinyosf_exportmodules.js"]
  },
  {
    name: "crel",
    tags: ["DOM"],
    description: "A simple and fast DOM creation utility",
    url: "https://github.com/KoryNunn/crel",
    source: "https://raw.githubusercontent.com/KoryNunn/crel/master/crel.js"
  },
  {
    name: "mathmethods",
    tags: ["math", "language", "sugar"],
    description: "Give `Number.prototype` the `Math` methods it deserves.",
    url: "https://github.com/davidchambers/mathmethods",
    source: "https://raw.githubusercontent.com/davidchambers/mathmethods/master/lib/mathmethods.js"
  },
  {
    name: "uuid-v4.js",
    tags: ["random", "uuid", "data", "browser", "commonjs", "node"],
    description: "RFC-4122 Compliant Random (v4) UUID Generator",
    url: "https://github.com/makeable/uuid-v4.js",
    source: "https://raw.githubusercontent.com/makeable/uuid-v4.js/master/uuid-v4.js"
  },
  {
    name: "notificon.js",
    tags: ["notification", "alert", "browser", "canvas", "tab"],
    description: "Dynamic tab favicon notifications/alerts",
    url: "https://github.com/makeable/Notificon",
    source: "https://raw.githubusercontent.com/makeable/Notificon/master/notificon.js"
  },
  {
    name: "Traversty",
    tags: ["dom"],
    description: "Headache-free DOM collection management and traversal with an API inspired by both jQuery and Prototype",
    url: "https://github.com/rvagg/traversty",
    source: "https://raw.githubusercontent.com/rvagg/traversty/master/traversty.js"
  },
  {
    name: "html5tooltips.js",
    tags: ["ui", "tooltips", "hints", "html5", "css3", "animation"],
    description: "Light and clean tooltips with CSS3 animation",
    url: "http://ytiurin.github.io/html5tooltipsjs/",
    github: "ytiurin/html5tooltipsjs",
    source: "https://raw.githubusercontent.com/ytiurin/html5tooltipsjs/master/html5tooltips.js"
  },
  {
    name: "140medley",
    tags: ["dom", "selector", "events", "templating", "ajax", "storage"],
    description: "A micro-framework or a collection of small, helpful utilities for common javascript tasks.",
    url: "https://github.com/honza/140medley",
    source: "https://raw.githubusercontent.com/honza/140medley/master/140medley.js"
  },
  {
    name: "SpeculOOs",
    tags: ["language", "class"],
    description: "Simple JavaScript Class notation, fully CoffeeScript compliant",
    url: "https://github.com/k33g/speculoos",
    source: "https://raw.githubusercontent.com/k33g/speculoos/master/speculoos.js"
  },
  {
    name: "aug",
    tags: ["extend", "augment"],
    description: "A object extend utility",
    url: "https://github.com/jgallen23/aug",
    source: "https://raw.githubusercontent.com/jgallen23/aug/master/dist/aug.js"
  },
  {
    name: "path.js",
    tags: ["route"],
    description: "Simple, lightweight routing for web browsers",
    url: "http://mtrpcic.github.io/pathjs/",
    source: "https://raw.githubusercontent.com/mtrpcic/pathjs/master/path.js"
  },
  {
    name: "scaleApp.js",
    github: "flosse/scaleApp",
    tags: ["spa", "base", "events", "node", "pubsub", "async", "flow", "flow control"],
    description: "scaleApp is a tiny JavaScript framework for scalable one-page-applications",
    url: "http://scaleapp.org/",
    source: "https://raw.githubusercontent.com/flosse/scaleApp/master/dist/scaleApp.js"
  },
  {
    name: "Choona.js",
    github: "nsisodiya/choona.js",
    tags: ["pubsub", "modular", "scalable", "sandbox", "spa", "architecture"],
    description: "Choona.js is a tiny JavaScript framework for scalable , modular architecture for one-page-applications",
    url: "https://github.com/nsisodiya/choona.js",
    source: "https://raw.githubusercontent.com/nsisodiya/choona.js/master/dist/choona.js"
  },
  {
    name: "Impetus.js",
    github: "chrisbateman/impetus",
    tags: ["momentum", "touch", "mouse", "mobile"],
    description: "Add momentum to anything. It's like iScroll, except not for scrolling. Supports mouse and touch events.",
    url: "http://chrisbateman.github.io/impetus",
    source: "https://raw.githubusercontent.com/chrisbateman/impetus/master/impetus.js"
  },
  {
    name: "Humane JS",
    tags: ["notification", "alert"],
    description: "A simple, modern, browser notification system",
    url: "http://wavded.github.io/humane-js/",
    source: "https://raw.githubusercontent.com/wavded/humane-js/master/humane.js"
  },
  {
    name: "Web Worker Proxies",
    tags: ["web", "worker", "proxies", "rpc", "remote", "procedure", "call"],
    description: "Tiny implementation of RPC-style interfaces for web workers.",
    url: "https://github.com/omphalos/web-worker-proxies",
    source: "https://raw.githubusercontent.com/omphalos/web-worker-proxies/master/web-worker-proxies.js"
  },
  {
    name: "JSFace",
    tags: ["oop", "language", "commonjs", "node", "class"],
    description: "Small, fast, elegant, powerful, and cross platform OOP library. Support singleton, super call, private, mixins, plugins, AOP and more.",
    url: "https://github.com/tnhu/jsface",
    source: "https://raw.githubusercontent.com/tnhu/jsface/master/jsface.js"
  },
  {
    name: "Radio.js",
    tags: ["events", "pubsub"],
    description: "Chainable publish/subscribe framework",
    url: "http://radio.uxder.com",
    source: "https://raw.githubusercontent.com/uxder/Radio/master/radio.js"
  },
  {
    name: "keyvent.js",
    tags: ["dom", "events", "amd"],
    description: "Keyboard events simulator.",
    url: "https://github.com/gtramontina/keyvent.js",
    source: "https://raw.githubusercontent.com/gtramontina/keyvent.js/master/keyvent.js"
  },
  {
    name: "draggable.js",
    tags: ["dom", "css", "css3", "amd"],
    description: "Make your dom elements draggable easily.",
    url: "http://gtramontina.github.io/draggable.js/",
    source: "https://raw.githubusercontent.com/gtramontina/draggable.js/master/draggable.js"
  },
  {
    name: "T-Lite",
    tags: ["templating"],
    description: "A lite but powerfull javascript template engine",
    url: "https://github.com/CapMousse/T-Lite",
    source: "https://raw.githubusercontent.com/CapMousse/T-Lite/master/tlite.js"
  },
  {
    name: "String::format",
    tags: ["string", "language", "sugar"],
    description: "Adds a `format` method to `String.prototype`. Inspired by Python's `str.format()`.",
    url: "https://github.com/davidchambers/string-format",
    source: "https://raw.githubusercontent.com/davidchambers/string-format/master/lib/string-format.js"
  },
  {
    name: "Callbacks.js",
    tags: ["events", "dispatcher", "static", "callbacks"],
    url: "https://github.com/dperrymorrow/callbacks.js",
    description: "Event dispatching, can be used either as static or instance based.",
    source: "https://raw.githubusercontent.com/dperrymorrow/callbacks.js/master/callbacks.js"
  },
  {
    name: "route-recognizer",
    github: "tildeio/route-recognizer",
    tags: ["path", "route", "modular library"],
    description: "It's a lightweight JavaScript library that matches paths against registered routes. It includes support for dynamic and star segments and nested handlers.",
    url: "https://github.com/tildeio/route-recognizer",
    source: "https://raw.githubusercontent.com/tildeio/route-recognizer/master/dist/route-recognizer.js"
  },
  {
    name: "Router.js",
    tags: ["routing", "rails"],
    url: "https://github.com/dperrymorrow/router.js",
    description: "controller/action convention for javascript. home/index would automatically instantiate Home js class and fire index action.",
    source: "https://raw.githubusercontent.com/dperrymorrow/router.js/master/router.js"
  },
  {
    name: "Blueshell",
    tags: ["inheritance", "prototype", "class"],
    description: "A microlibrary for inheritance with prototypal inheritance tools allowing class-like construction.",
    url: "https://github.com/jgnewman/blueshell",
    source: "https://raw.githubusercontent.com/jgnewman/blueshell/master/js/blueshell.js"
  },
  {
    name: "ancestry.js",
    tags: ["class", "extend", "commonjs", "amd"],
    description: "Simple, yet powerful inheritance library to make polymorphism and super-constructors work propertly.",
    url: "https://github.com/jasonwyatt/ancestry.js",
    source: "https://raw.githubusercontent.com/jasonwyatt/ancestry.js/master/ancestry.js"
  },
  {
    name: "ytIframe.js",
    tags: ["youtube", "iframe", "video"],
    description: "A flexible, plain javascript youtube video embedding script in less than 40 lines.",
    url: "https://github.com/mdix/ytIframe",
    source: "https://raw.githubusercontent.com/mdix/ytIframe/master/iframe.js"
  },
  {
    name: "List.js",
    tags: ["list", "extend", "templating", "utils", "sort", "search", "filter"],
    description: "Add search, sort and flexibility to plain HTML lists (div, ul, table, everything!).",
    url: "http://listjs.com",
    source: "https://raw.githubusercontent.com/javve/list.js/master/dist/list.js"
  },
  {
    name: "Mediator.js",
    tags: ["utils", "pubsub", "notifications", "events", "async", "callbacks"],
    description: "Flexible pubsub-ish framework for handling namespaced events.",
    url: "http://www.thejacklawson.com/Mediator.js",
    source: "https://raw.githubusercontent.com/ajacksified/Mediator.js/master/lib/mediator.js"
  },
  {
    name: "doT.js",
    tags: ["nodejs", "browsers", "templating", "partials", "custom delimiters"],
    description: "The fastest + concise javascript template engine for nodejs and browsers. Partials, custom delimiters and more.",
    url: "https://github.com/olado/doT",
    source: "https://raw.githubusercontent.com/olado/doT/master/doT.js"
  },
  {
    name: "Stapes.js",
    tags: ["mvc", "class", "events", "mobile"],
    description: "A (really) tiny Javascript MVC microframework. Perfect for mobile.",
    url: "http://hay.github.io/stapes/",
    source: "https://raw.githubusercontent.com/hay/stapes/master/stapes.js"
  },
  {
    name: "Smoke Signals",
    tags: ["events" ],
    description: "Really, really lightweight event emitting",
    url: "https://bitbucket.org/bentomas/smokesignals.js",
    source: "https://bitbucket.org/bentomas/smokesignals.js/raw/master/smokesignals.unminified.js"
  },
  {
    name: "CSSClass",
    tags: ["css" ],
    description: "Adds the functions .hasClass, .addClass, .removeClass and .toggleClass to the Element prototype.",
    url: "https://github.com/EarMaster/CSSClass",
    source: "https://raw.githubusercontent.com/EarMaster/CSSClass/master/CSSClass.js"
  },
  /* switched to versioned releases, removed
  {
    name: "remoteStorage.js",
    tags: ["events", "ajax", "storage" ],
    description: "A library for adding remoteStorage support to your client-side app.",
    url: "https://github.com/RemoteStorage/remoteStorage.js",
    source: "https://raw.githubusercontent.com/RemoteStorage/remoteStorage.js/master/src/remoteStorage.js"
  },
  */
  {
    name: "impress.js",
    tags: ["animation", "jsanimation", "css", "css3" ],
    description: "A presentation framework based on the power of CSS3 transforms and transitions in modern browsers and inspired by the idea behind prezi.com.",
    url: "https://github.com/bartaz/impress.js",
    source: "https://raw.githubusercontent.com/bartaz/impress.js/master/js/impress.js"
  },
  {
    name: "Jwerty",
    tags: ["events" ],
    description: "Bind, fire and assert on keyboard events, with easy to use keyboard selector combos",
    url: "https://github.com/keithamus/jwerty",
    source: "https://raw.githubusercontent.com/keithamus/jwerty/master/jwerty.js"
  },
  {
    name: "konami.js",
    github: "SimonWaldherr/konami.js",
    tags: ["events", "input", "bind", "keypress"],
    description: "logs every keypress and store it for later",
    url: "https://github.com/SimonWaldherr/konami.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/konami.js/master/konami.js"
  },
  {
    name: "filesize.js",
    tags: ["math", "language", "amd"],
    description: "JavaScript library to generate a human readable String describing the filesize",
    url: "http://filesizejs.com",
    source: "https://raw.githubusercontent.com/avoidwork/filesize.js/master/lib/filesize.js"
  },
  {
    name: "csv.js",
    tags: ["csv", "json", "array", "object", "encode", "transform"],
    description: "Convert JSON, Arrays or Objects to CSV",
    url: "https://github.com/avoidwork/csv.js",
    source: "https://raw.githubusercontent.com/avoidwork/csv.js/master/lib/csv.js"
  },
  {
    name: "tiny-lru.js",
    tags: ["LRU", "cache"],
    description: "Least Recently Used cache",
    url: "https://github.com/avoidwork/tiny-lru",
    source: "https://raw.githubusercontent.com/avoidwork/tiny-lru/master/lib/tiny-lru.js"
  },
  /* dead link
  {
    name: "bacon.js",
    tags: ["mobile" ],
    description: "Detects a mobile browser",
    url: "https://github.com/tgolen/bacon.js",
    source: "https://raw.githubusercontent.com/tgolen/bacon.js/master/bacon.js"
  },
  */
  {
    name: "JSON 3",
    github: "bestiejs/json3",
    tags: ["polyfill", "json", "amd"],
    description: "A modern JSON implementation compatible with nearly all JavaScript platforms.",
    url: "http://bestiejs.github.io/json3",
    source: "http://bestiejs.github.io/json3/lib/json3.js"
  },
  {
    name: "promise.js",
    tags: ["async", "promise", "future", "deffered", "ajax"],
    description: "Lightweight promises (or futures, or deffered). Includes AJAX REST functions.",
    url: "https://github.com/stackp/promisejs",
    source: "https://raw.githubusercontent.com/stackp/promisejs/master/promise.js"
  },
  /* gzipped file too big, 5.3 kB is not "micro"
  {
    name: "Moment.js",
    github: "timrwood/moment",
    tags: ["date"],
    description: "Parse, manipulate, and format dates.",
    url: "http://momentjs.com/",
    source: "https://raw.githubusercontent.com/timrwood/moment/master/moment.js"
  },
  */
  {
    name: "swiftcore.js",
    tags: ["IOC", "dependency injection", "microkernel"],
    description: "A lightweight and flexible microkernel/IOC container which helps to build testable decoupled systems",
    url: "https://github.com/cburgdorf/swiftcore.js",
    source: "https://raw.githubusercontent.com/cburgdorf/swiftcore.js/master/build/swiftcore.js"
  },
  {
    name: "mix.js",
    tags: ["mixin"],
    description: "Mixins with dependency resolution and private properties (without closures).",
    url: "https://github.com/bripkens/mix.js",
    source: "https://raw.githubusercontent.com/bripkens/mix.js/master/mix.js"
  },
  /* versioned releases, removed
  {
    name: "inputControl",
    tags: ["inputControl", "chars", "numbers"],
    description: "InputControl is a powerfull script to controlling own input text to accept specific chars or numbers.",
    url: "https://github.com/metalipower/inputControl",
    // version is current as of 18-JUN-2013, 1 year old
    source: "https://raw.githubusercontent.com/metalipower/inputControl/master/inputControl-1.0.js"
  },
  */
  {
    name: "cookie.js",
    tags: ["cookie.js", "cookies", "storage"],
    description: "A small library that makes setting, getting and removing cookies really easy.",
    url: "https://github.com/js-coder/cookie.js",
    source: "https://raw.githubusercontent.com/js-coder/cookie.js/gh-pages/cookie.js"
  },
  {
    name: "Ordering.js",
    github : "bbaliguet/ordering",
    tags: ["sort", "sorting", "ordering", "arrays"],
    description: "Helper to build sorting functions for array.sort()",
    url: "https://github.com/bbaliguet/ordering",
    source: "https://raw.githubusercontent.com/bbaliguet/ordering/master/ordering.js"
  },
  {
    name: "Byda.js",
    tags: ["HTML5", "imports", "xhr", "ajax", "swapping"],
    description: "HTML content swapping via HTML5 imports or XHR (Ajax).",
    url: "http://www.ericmcd.com/byda/",
    source: "https://raw.githubusercontent.com/ericmcdaniel/byda/master/index.js"
  },
  {
    name: "an.hour.ago",
    tags: ["dates", "times", "language", "sugar"],
    description: "DSL for expressing and comparing dates and times",
    url: "https://github.com/davidchambers/an.hour.ago",
    source: "https://raw.githubusercontent.com/davidchambers/an.hour.ago/master/lib/an.hour.ago.js"
  },
  {
    name: "JSDeferred",
    tags: ["defered", "asynchronous", "callbacks"],
    description: "Standalone and Compact asynchronous library in JavaScript.",
    url: "http://cho45.stfuawsc.com/jsdeferred/",
    source: "https://raw.githubusercontent.com/cho45/jsdeferred/master/jsdeferred.js"
  },
  {
    name: "Riloadr",
    tags: ["image", "images", "responsive", "loader"],
    description: "A cross-browser framework-independent responsive images loader. jQuery version available.",
    url: "https://github.com/tubalmartin/riloadr",
    source: "https://raw.githubusercontent.com/tubalmartin/riloadr/master/riloadr.js"
  },
  {
    name: "Plates",
    tags: ["templating"],
    description: "Plates (short for templates) binds data to markup. Plates has NO special syntax. It works in the browser and in Node.js.",
    url: "https://github.com/flatiron/plates",
    source: "https://raw.githubusercontent.com/flatiron/plates/master/lib/plates.js"
  },
  {
    name: "Nonsense",
    tags: ["data"],
    description: "Generate repeatable random data",
    url: "https://github.com/jocafa/Nonsense",
    source: "https://raw.githubusercontent.com/jocafa/Nonsense/master/Nonsense.js"
  },
  {
    name: "Dijon",
    tags: ["IOC", "dependency injection"],
    description: "An IOC/DI framework in Javascript, inspired by Robotlegs and Swiftsuspenders",
    url: "https://github.com/creynders/dijon",
    source: "https://raw.githubusercontent.com/creynders/dijon/master/dist/dijon.js"
  },
  {
    name: "ua.js",
    tags: ["feature"],
    description: "A very small user-agent (browser) and device detection library.",
    url: "https://github.com/g13n/ua.js",
    source: "https://raw.githubusercontent.com/g13n/ua.js/master/src/ua.js"
  },
  {
    name: "microtext.js",
    tags: ["text utility"],
    description: "A JavaScript utility for processing text.",
    url: "https://github.com/rodrigoalvesvieira/microtext.js/",
    source: "https://raw.githubusercontent.com/rodrigoalvesvieira/microtext.js/master/src/microtext.js"
  },
  {
    name: "lostorage.js",
    tags: ["storage", "localStorage", "sessionStorage"],
    description: "Client-side storage the way it should be - using the HTML5 localStorage API. lostorage.js allows you to save any kind of data.",
    url: "https://github.com/js-coder/lostorage.js",
    source: "https://raw.githubusercontent.com/js-coder/loStorage.js/master/src/loStorage.js"
  },
  {
    name: "guggenheim.js",
    tags: ["gallery", "plugin", "animation"],
    description: "A framework agnostic, animated, gallery plugin",
    url: "https://github.com/OiNutter/guggenheim.js",
    source: "https://raw.githubusercontent.com/OiNutter/guggenheim.js/master/src/guggenheim.js"
  },
  {
    name: "jvent.js",
    github: "pazguille/jvent",
    tags: ["events"],
    description: "Event Emitter Class for the browser based on NodeJS EventEmitter",
    url: "https://github.com/pazguille/jvent",
    source: "https://raw.githubusercontent.com/pazguille/jvent/master/dist/jvent.js"
  },
  {
    name: "fader.js",
    github: "lukelex/fader.js",
    url: "http://lukelex.github.io/fader.js/",
    tags: ["animation"],
    description: "A micro library to fade elements in and out.",
    source: "https://raw.githubusercontent.com/lukelex/fader.js/master/fader.js"
  },
  {
    name: "TemporizedSlider.js",
    github: "lukelex/TemporizedSlider.js",
    url: "http://lukelex.github.io/TemporizedSlider.js",
    tags: ["animation", "events"],
    description: "A micro library that implements a customizable temporized image slider, with custom text and title for each one.",
    source: "https://raw.githubusercontent.com/lukelex/TemporizedSlider.js/master/temporized_slider.js"
  },
  {
    name: "hypo",
    url: "https://github.com/shiftyp/hypo",
    tags: ["dependency injection", "IOC"],
    description: "A micro dependency injection framework inspired by Spring. Simple and to the point.",
    source: "https://raw.githubusercontent.com/shiftyp/hypo/master/dist/hypo.src.js"
  },
  {
    name: "pubsub.js",
    tags: ["events", "pubsub", "publish", "subscribe", "node", "rhino", "amd", "commonjs", "titanium"],
    description: "A tiny, optimized, tested, standalone and robust pubsub implementation supporting different javascript environments",
    url: "https://github.com/federico-lox/pubsub.js",
    source: "https://raw.githubusercontent.com/federico-lox/pubsub.js/master/src/pubsub.js"
  },
  {
    name: "Pjs",
    github: "jneen/pjs",
    url: "https://github.com/jneen/pjs",
    tags: ["class", "inheritance"],
    description: "A teensy class system. It's just prototypes, but without the nasty parts.",
    source: "https://raw.githubusercontent.com/jneen/pjs/master/src/p.js"
  },
  {
    name: "l.js",
    tags: ["loader"],
    description: "Another Tiny js/css loader supporting aliases, ordered and parallel loading, callbacks ... ",
    url: "http://malko.github.io/l.js/",
    source: "https://raw.githubusercontent.com/malko/l.js/master/l.js"
  },
  {
    name: "D.js",
    tags: ["Promises","async","promises/A+"],
    description: "A tiny implementation of the Promises/A+ spec for Node.js and the browser, with some extensions to the spec ",
    url: "http://malko.github.io/D.js/",
    source: "https://raw.githubusercontent.com/malko/D.js/master/lib/D.js"
  },
  {
    name: "es5-class",
    tags: ["class", "inheritance"],
    description: "Native prototypal inheritance for Node.js and ES5-enabled Browsers",
    url: "https://github.com/bfil/es5-class",
    source: "https://raw.githubusercontent.com/bfil/es5-class/master/class.js"
  },
  {
    name: "Mousetrap",
    github: "ccampbell/mousetrap",
    tags: ["events"],
    description: "A simple library for handling keyboard shortcuts in Javascript.",
    url: "http://craig.is/killing/mice",
    source: "https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.js"
  },
  {
    name: "PersonaJS",
    tags: ["authentication"],
    description: "Implement authentication using Mozilla Persona in your web application.",
    url: "https://github.com/lloyd/persona.js",
    source: "https://raw.githubusercontent.com/lloyd/persona.js/master/persona.js"
  },
  {
    name: "Driftwood",
    tags: ["logging", "error", "exception", "log"],
    description: "A simple library for logging and exception tracking in Javascript.",
    url: "https://github.com/mattkanwisher/driftwood.js",
    source: "https://raw.githubusercontent.com/mattkanwisher/driftwood.js/master/driftwood.js"
  },
  {
    name: "progress.js",
    tags: ["progress", "bar", "progressbar"],
    description: "A (animated) javascript progress bar without dependencies.",
    url: "https://github.com/mdix/progress.js",
    source: "https://raw.githubusercontent.com/mdix/progress.js/master/progress.js"
  },
  {
    name: "jph.js",
    tags: ["jsonp", "network", "json", "manager", "loader"],
    description: "A JS module for managing many asynchronous and synchronous JSONP requests, responses, timeouts and errors.",
    url: "https://github.com/mixradio/JSONPHandler",
    source: "https://raw.githubusercontent.com/mixradio/JSONPHandler/master/jph.js"
  },
  {
    name: "shotgun.js",
    tags: ["shotgun", "events", "error", "observer", "pubsub", "publish", "subscribe", "node", "unsubscribe"],
    description: "Nestable custom events, trappable internal events, functional try/catch abstraction, unsubscribable unnamed functions.",
    url: "http://github.com/jgnewman/shotgun",
    source: "https://raw.githubusercontent.com/jgnewman/shotgun/master/shotgun.js"
  },
  {
    name: "Hexy.js",
    tags: ["color"],
    description: "Converts HEX colors to RGB values and vice versa in various output formats.",
    url: "http://github.com/steelsojka/Hexy.js",
    source: "https://raw.githubusercontent.com/steelsojka/Hexy.js/master/src/Hexy.js"
  },
  {
    name: "onDomReady",
    tags: ["dom", "event", "ready", "load"],
    description: "Initialize your code when the DOM is ready. Based on jQuery's ready() method. AMD compatible.",
    url: "https://github.com/tubalmartin/ondomready",
    source: "https://raw.githubusercontent.com/tubalmartin/ondomready/master/ondomready.js"
  },
  {
    name: "t.js",
    tags: ["templating"],
    description: "A tiny javascript templating framework in ~400 bytes gzipped.",
    url: "https://github.com/jasonmoo/t.js",
    source: "https://raw.githubusercontent.com/jasonmoo/t.js/master/t.js"
  },
  {
    name: "statelet",
    tags: ["events"],
    description: "Little state objects",
    url: "https://github.com/joshwnj/statelet",
    source: "https://raw.githubusercontent.com/joshwnj/statelet/master/statelet.js"
  },
  {
    name: "delayed",
    tags: ["async", "timer", "defer", "events"],
    description: "A collection of helper functions for your functions, using `setTimeout()` to delay and defer.",
    url: "https://github.com/rvagg/delayed",
    source: "https://raw.githubusercontent.com/rvagg/delayed/master/delayed.js"
  },
  {
    name: "BigScreen",
    github: "bdougherty/BigScreen",
    tags: ["browser", "canvas"],
    description: "BigScreen is a simple library for using the JavaScript Full Screen API.",
    url: "http://brad.is/coding/BigScreen/",
    source: "https://raw.githubusercontent.com/bdougherty/BigScreen/master/bigscreen.js"
  },
  {
    name: "SwipeMe",
    github: "kinglozzer/SwipeMe",
    tags: ["swipe", "menu", "navigation", "off-canvas", "off", "canvas"],
    description: "A lightweight Javascript library for swiping open/close off-canvas menus.",
    url: "http://kinglozzer.github.io/SwipeMe/demo/index.html",
    source: "https://raw.githubusercontent.com/kinglozzer/SwipeMe/master/swipeme.js"
  },
  {
    name: "string.js",
    tags: ["string", "language"],
    description: "string.js is a lightweight (&lt; 4 kb minified and gzipped) JavaScript library for the browser or for Node.js that provides extra String methods.",
    url: "http://stringjs.com",
    source: "https://raw.githubusercontent.com/jprichardson/string.js/master/lib/string.js"
  },
  {
    name: "Airwaves",
    tags: ["pubsub", "publish", "subscribe", "broadcast", "message"],
    description: "Lightweight pub/sub for any JavaScript environment",
    url: "https://github.com/davidchambers/airwaves",
    source: "https://raw.githubusercontent.com/davidchambers/airwaves/master/lib/airwaves.js"
  },
  {
    name: "Stately.js",
    tags: ["automata", "finite", "fsm", "machine", "state"],
    description: "Stately.js is a JavaScript based finite-state machine (FSM) engine for Node.js and the browser.",
    url: "https://github.com/fschaefer/Stately.js",
    source: "https://raw.githubusercontent.com/fschaefer/Stately.js/master/Stately.js"
  },
  {
    name: "pods.js",
    github: "gmac/pods.js",
    tags: ["module", "ioc", "di", "injection", "dependency", "framework"],
    description: "A tiny synchronous module definition and dependency management framework.",
    url: "https://github.com/gmac/pods.js",
    source: "https://raw.githubusercontent.com/gmac/pods.js/master/pods.js"
  },
  {
    name: "Hammer.js",
    github: "hammerjs/hammer.js",
    tags: ["events", "mobile", "touch", "multitouch"],
    description: "A tiny javascript library that can be used to control gestures on touch devices.",
    url: "http://hammerjs.github.io/hammer.js/",
    source: "https://raw.githubusercontent.com/hammerjs/hammer.js/master/hammer.js"
  },
  {
    name: "Probability.js",
    tags: ["math", "mathematics", "probability", "random", "statistics"],
    description: "Probability.js makes it easy to call JavaScript functions by probability in Node.js and the browser.",
    url: "https://github.com/fschaefer/Probability.js",
    source: "https://raw.githubusercontent.com/fschaefer/Probability.js/master/Probability.js"
  },
  {
    name: "DOMtastic",
    github: "webpro/DOMtastic",
    tags: ["DOM", "events", "selector", "modern", "modular", "es6"],
    description: "Small and fast DOM and event library for modern browsers. It has the same familiar API as jQuery, and is lean & mean with small, optional modules.",
    url: "http://webpro.github.io/DOMtastic/",
    source: "https://raw.githubusercontent.com/webpro/DOMtastic/master/dist/domtastic.js"
  },
  {
    name: "Timer.js",
    tags: ["interval", "timeout", "timer", "periodic"],
    description: "Timer.js is a periodic timer for Node.js and the browser.",
    url: "https://github.com/fschaefer/Timer.js",
    source: "https://raw.githubusercontent.com/fschaefer/Timer.js/master/Timer.js"
  },
  /* gzipped file too big, 10.5 kB is not "micro"
  {
    name: "Craft.js",
    tags: ["framework", "base", "dom", "events", "ajax", "polyfill", "functional"],
    description: "Craft.js is a small but powerful JavaScript framework that helps you to build web apps easily.",
    url: "http://craftjs.org",
    source: "https://raw.githubusercontent.com/mlbli/craft/master/dist/craft.js"
  },
  */
  {
    name: "Mouse",
    tags: [ "mouse", "mousebind", "bind", "events", "input", "buttons", "mice" ],
    description: "A high quality library that treats the mouse as a first class object citizen.",
    url: "http://benvie.github.io/Mouse",
    source: "https://raw.githubusercontent.com/Benvie/Mouse/master/Mouse.js"
  },
  {
    name: "Lambda.js",
    tags: ["lambda", "function", "expression", "anonymous", "literal", "functional"],
    description: "String based lambdas for Node.js and the browser, that allow strings such as 'x+1' and 'x -&gt; x+1' to be used as functions.",
    url: "https://github.com/fschaefer/Lambda.js",
    source: "https://raw.githubusercontent.com/fschaefer/Lambda.js/master/Lambda.js"
  },
  {
    name: "xxspubsub.js",
    tags: ["pubsub"],
    description: "Extra-extra-small publish/subscribe micro-library in JavaScript",
    url: "https://github.com/dciccale/xxspubsub",
    source: "https://raw.githubusercontent.com/dciccale/xxspubsub/master/xxspubsub.js"
  },
  {
    name: "big.js",
    tags: ["big", "number", "bignumber", "bigdecimal", "biginteger", "arbitrary", "precision", "decimal", "arithmetic", "math"],
    description: "A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.",
    url: "https://github.com/MikeMcl/big.js/",
    source: "https://raw.githubusercontent.com/MikeMcl/big.js/master/big.js"
  },
  {
    name: "PicoModal",
    github: "Nycto/PicoModal",
    tags: ["modal", "popup", "message"],
    description: "A self-contained modal popup library",
    url: "https://github.com/Nycto/PicoModal",
    source: "https://raw.githubusercontent.com/Nycto/PicoModal/master/src/picoModal.js"
  },
  {
    name: "nwt",
    github: "nwtjs/nwt",
    tags: ["framework", "base", "dom", "webkit", "ajax", "events", "mobile", "animation", "transitions"],
    description: "Small JS framework that ships with ajax, anim, dom, and event methods. Several plugins available.",
    url: "http://nwtjs.org",
    source: "https://raw.githubusercontent.com/nwtjs/nwt/master/nwt.js"
  },
  {
    name: "microphone",
    github: "srubin/microphone",
    tags: ["html5", "audio", "microphone", "signalprocessing", "dsp", "mic", "sound"],
    description: "Process live audio input in the browser",
    url: "https://github.com/srubin/microphone",
    source: "https://raw.githubusercontent.com/srubin/microphone/master/microphone.js"
  },
  {
    name: "time.js",
    tags: ["time", "parse", "parsing", "format", "validate"],
    description: "Date-agnostic time parsing for node and the browser.",
    url: "http://github.com/zever/time/",
    source: "https://raw.githubusercontent.com/zever/time/master/time.js"
  },
  {
    name: "MissMatch",
    github: "pb82/MissMatch",
    tags: ["pattern", "matching", "functional", "object", "json", "query", "decompose"],
    description: "Pattern matching (like in Haskell or Scala) for JavaScript.",
    url: "https://github.com/pb82/MissMatch",
    source: "https://raw.githubusercontent.com/pb82/MissMatch/master/lib/MissMatch.js"
  },
  {
    name: "Sleeper Agent",
    github: "kapilkaisare/sleeper-agent",
    tags: ["logging", "logs"],
    description: "Collect logs selectively from client instances on demand.",
    url: "https://github.com/kapilkaisare/sleeper-agent",
    source: "https://raw.githubusercontent.com/kapilkaisare/sleeper-agent/master/sleeper.js"
  },
  {
    name: "Daemonize",
    github: "kapilkaisare/daemonizejs",
    tags: ["unix", "daemon"],
    description: "Give a function a daemon like interface (start, stop, restart)",
    url: "https://github.com/kapilkaisare/daemonizejs",
    source: "https://raw.githubusercontent.com/kapilkaisare/daemonizejs/master/daemonize.js"
  },
  {
    name: "Rainbow",
    github: "ccampbell/rainbow",
    tags: ["dom", "syntax", "code", "highlighter"],
    description: "Simple, extendable code syntax highlighting library.",
    url: "http://craig.is/making/rainbows",
    source: "https://raw.githubusercontent.com/ccampbell/rainbow/master/js/rainbow.js"
  },
  {
    name: "switcher",
    tags: ["switch", "regexp"],
    description: "Function to provide a similar syntax to a switch statement but with regex as cases.",
    url: "https://github.com/EarMaster/switcher",
    source: "https://raw.githubusercontent.com/EarMaster/switcher/master/switcher.js"
  },
  {
    name: "ajax",
    tags: ["ajax", "jquery"],
    description: "Standalone AJAX library inspired by jQuery/zepto",
    url: "https://github.com/ForbesLindesay/ajax",
    source: "https://raw.githubusercontent.com/ForbesLindesay/ajax/master/index.js"
  },
  {
    name: "page.js",
    tags: ["page", "page.js", "router", "routing", "express", "spa"],
    description: "Tiny ~1200 byte Express-inspired client-side router.",
    url: "https://github.com/visionmedia/page.js",
    source: "https://raw.githubusercontent.com/visionmedia/page.js/master/page.js"
  },
  {
    name: "parsy",
    tags: ["nodejs", "options", "parser"],
    description: "Tiny command line options parser for node.js in CoffeeScript",
    url: "https://github.com/dciccale/parsy",
    source: "https://raw.githubusercontent.com/dciccale/parsy/master/lib/parsy.js"
  },
  {
    name: "Gator",
    github: "ccampbell/gator",
    tags: ["dom", "events", "delegation"],
    description: "Simple event delegation library",
    url: "http://craig.is/riding/gators",
    source: "https://raw.githubusercontent.com/ccampbell/gator/master/gator.js"
  },
  {
    name: "ioc.js",
    github: "tgriesser/ioc.js",
    tags: ["ioc", "service locator"],
    description: "A small IoC service locator container.",
    url: "https://github.com/tgriesser/ioc.js",
    source: "https://raw.githubusercontent.com/tgriesser/ioc.js/master/ioc.js"
  },
  {
    name: "keymage",
    tags: ["events"],
    description: "Keyboard shortcuts handling with support for key sequences.",
    url: "https://github.com/piranha/keymage",
    source: "https://raw.githubusercontent.com/piranha/keymage/master/keymage.js"
  },
  {
    name: "Chic",
    tags: ["class", "classes", "extend", "inheritance", "oop", "prototypal", "prototype"],
    description: "Chic is an extremely simple class-like interface to JavaScript prototypal inheritance.",
    url: "https://github.com/rowanmanning/chic",
    source: "https://raw.githubusercontent.com/rowanmanning/chic/master/lib/chic.js"
  },
  {
    name: "Perms",
    tags: ["permissions", "perms", "ls", "chmod", "unix"],
    description: "Convert Unix style permissions to strings like ls (0755 =&gt; 'rwxr-xr-x')",
    url: "https://github.com/bahamas10/node-perms",
    source: "https://raw.githubusercontent.com/bahamas10/node-perms/master/perms.js"
  },
  {
    name: "autocast",
    tags: ["auto", "cast", "typecast", "convert"],
    description: "Easily and automatically cast common datatypes in JavaScript",
    url: "https://github.com/bahamas10/node-autocast",
    source: "https://raw.githubusercontent.com/bahamas10/node-autocast/master/index.js"
  },
  {
    name: "range.js",
    tags: ["range"],
    description: "JavaScript's missing range function.",
    url: "https://github.com/js-coder/range.js",
    source: "https://raw.githubusercontent.com/js-coder/range.js/master/lib/range.js"
  },
  {
    name: "Strukt",
    tags: ["utilities"],
    description: "Ruby inspired Structs for JavaScript.",
    url: "https://github.com/js-coder/Strukt",
    source: "https://raw.githubusercontent.com/js-coder/Strukt/master/lib/strukt.js"
  },
  {
    name: "ipsum.js",
    tags: ["content", "text", "helper", "tool", "developer tool"],
    description: "Increases / decreases text quantity inside inline elements by pressing keys to check if the design can cope with different text length.",
    url: "https://github.com/mdix/ipsum.js",
    source: "https://raw.githubusercontent.com/mdix/ipsum.js/master/ipsum.js"
  },
  {
    name: "TimeJump",
    tags: ["audio", "video", "podcast", "player"],
    description: "TimeJump adds deep-linking to HTML5 audio and video podcasts.",
    url: "https://github.com/davatron5000/TimeJump",
    source: "https://raw.githubusercontent.com/davatron5000/TimeJump/master/timeJump.js"
  },
  {
    name: "preloadimages.js",
    tags: ["preload", "images", "asset"],
    description: "Preload images and callback when they are all ready",
    url: "https://github.com/bahamas10/preloadimages.js",
    source: "https://raw.githubusercontent.com/bahamas10/preloadimages.js/master/preloadimages.js"
  },
  {
    name: "cm.js",
    tags: ["cookies"],
    description: "Manage cookies easily.",
    url: "https://github.com/timseverien/cm.js",
    source: "https://raw.githubusercontent.com/timseverien/cm.js/master/cm.js"
  },
  {
    name: "Slow.js",
    github: "jakiestfu/Slow.js",
    tags: ["slow", "motion", "css", "css3"],
    description: "Make your CSS transitions go in slow motion (like Mac animations)",
    url: "https://github.com/jakiestfu/Slow.js",
    source: "https://raw.githubusercontent.com/jakiestfu/Slow.js/master/slow.js"
  },
  {
    name: "Behave.js",
    github: "jakiestfu/Behave.js",
    tags: ["ide", "text", "editor", "behave", "behaviors", "code", "ace", "codemirror"],
    description: "A lightweight, cross browser library for adding IDE style behaviors to plain text areas",
    url: "https://github.com/jakiestfu/Behave.js",
    source: "https://raw.githubusercontent.com/jakiestfu/Behave.js/master/behave.js"
  },
  {
    name: "Snap.js",
    github: "jakiestfu/Snap.js",
    tags: ["snap", "droor", "drawer", "shelf", "mobile", "ios", "reveal", "slide", "drag", "pane", "back", "panel", "side", "menu"],
    description: "A Library for creating beautiful mobile shelfs in Javascript",
    url: "https://github.com/jakiestfu/Snap.js",
    source: "https://raw.githubusercontent.com/jakiestfu/Snap.js/master/snap.js"
  },
  {
    name: "enquire.js",
    github: "WickyNilliams/enquire.js",
    tags: ["matchMedia", "mediaquery", "mediaqueries", "css3", "css"],
    description: "Awesome Media Queries in JavaScript",
    url: "https://github.com/WickyNilliams/enquire.js",
    source: "https://raw.githubusercontent.com/WickyNilliams/enquire.js/master/dist/enquire.js"
  },
  {
    name: "ki.js",
    tags: ["dom", "selectors", "traversing", "library"],
    description: "A super-tiny jQuery-like JavaScript library",
    url: "https://github.com/dciccale/ki.js",
    source: "https://raw.githubusercontent.com/dciccale/ki.js/master/ki.js"
  },
  {
    name: "Anim",
    tags: ["css", "animation"],
    description: "A bare bones animation library",
    url: "https://github.com/relay/anim",
    source: "https://raw.githubusercontent.com/relay/anim/master/anim.js"
  },
  {
    name: "Relay",
    tags: ["dom", "library", "framework", "mvc", "traversing", "events", "pubsub", "base"],
    description: "A lightweight framework for building de-coupled apps",
    url: "https://github.com/relay/relay",
    source: "https://raw.githubusercontent.com/relay/relay/master/relay-dev.js"
  },
  {
    name: "promiscuous",
    tags: ["promise", "deferred", "functional", "async", "future"],
    description: "A minimal and fast promise/deferred implementation, compatible with Promises/A+",
    url: "https://github.com/RubenVerborgh/promiscuous",
    source: "https://raw.githubusercontent.com/RubenVerborgh/promiscuous/master/promiscuous.js"
  },
  {
    name: "Draggabilly",
    tags: ["drag", "dragable", "draggable"],
    description: "Make that shiz draggable",
    url: "https://github.com/desandro/draggabilly",
    source: "https://raw.githubusercontent.com/desandro/draggabilly/master/draggabilly.js"
  },
  {
    name: "BehaviorTree.js",
    tags: ["behavior trees", "ai", "behaviors", "games", "statemachine"],
    description: "A JavaScript implementation of Behavior Trees, useful when developing AI behaviors in games.",
    url: "https://github.com/Calamari/BehaviorTree.js",
    source: "https://raw.githubusercontent.com/Calamari/BehaviorTree.js/master/btree-complete.js"
  },
  {
    name: "PinkySwear.js",
    tags: ["promises"],
    description: "A tiny implementation of the Promises/A+ specification.",
    url: "https://github.com/timjansen/pinkyswear.js",
    source: "https://raw.githubusercontent.com/timjansen/PinkySwear.js/master/pinkyswear.js"
  },
  {
    name: "depot.js",
    tags: ["storage", "localStorage", "store"],
    description: "depot.js is a namespaced localStorage wrapper with a simple API.",
    url: "https://github.com/mkuklis/depot.js",
    source: "https://raw.githubusercontent.com/mkuklis/depot.js/master/depot.js"
  },
  {
    name: "DCL.js",
    tags: ["class", "oop", "aop", "inheritance", "object", "compose"],
    description: "An elegant OOP with mixins + AOP for JavaScript",
    url: "http://www.dcljs.org/",
    source: "https://raw.githubusercontent.com/uhop/dcl/master/dcl.js"
  },
  {
    name: "breakup.js",
    tags: ["enumeration", "setimmediate", "enumerate", "jquery", "yield"],
    description: "Yielding enumeration replacement functions for async.forEachSeries() and jQuery.each()",
    url: "https://github.com/nicjansma/breakup.js",
    source: "https://raw.githubusercontent.com/nicjansma/breakup.js/master/lib/breakup.js"
  },
  {
    name: "Barman",
    tags: ["traits", "oop", "classes", "objects", "object composition"],
    description: "A small library to brew JavaScript objects.",
    url: "https://github.com/dfernandez79/barman",
    source: "https://raw.githubusercontent.com/dfernandez79/barman/master/dist/barman.js"
  },
  {
    name: "smoothScroll.js",
    tags: ["scroll", "smooth"],
    description: "A teeny tiny, ease-in-out, smooth scroll library with no dependency",
    url: "https://github.com/alicelieutier/smoothScroll",
    source: "https://raw.githubusercontent.com/alicelieutier/smoothScroll/master/smoothscroll.js"
  },
  {
    name: "strftime",
    tags: ["strftime", "format", "date", "time"],
    description: "strftime for JavaScript. Works in Node and browsers.",
    url: "https://github.com/samsonjs/strftime",
    source: "https://raw.githubusercontent.com/samsonjs/strftime/master/strftime.js"
  },
  {
    name: "format",
    tags: ["format", "printf", "sprintf", "vsprintf", "string"],
    description: "printf, sprintf, and vsprintf for JavaScript. Works in Node and browsers.",
    url: "https://github.com/samsonjs/format",
    source: "https://raw.githubusercontent.com/samsonjs/format/master/format.js"
  },
  {
    name: "Proclaim",
    tags: ["assert", "test"],
    description: "A simple assertion library for server and client side JavaScript.",
    url: "https://github.com/rowanmanning/proclaim",
    source: "https://raw.githubusercontent.com/rowanmanning/proclaim/master/lib/proclaim.js"
  },
  {
    name: "Intro.js",
    tags: ["intro", "introduction", "guide"],
    description: "A better way for new feature introduction and step-by-step users guide for your website and project.",
    url: "https://github.com/usablica/intro.js",
    source: "https://raw.githubusercontent.com/usablica/intro.js/master/intro.js"
  },
  {
    name: "Upcast",
    tags: ["cast", "check", "type", "types"],
    description: "Upcast is a low-level JavaScript type checking and casting library.",
    url: "https://github.com/rowanmanning/upcast",
    source: "https://raw.githubusercontent.com/rowanmanning/upcast/master/lib/upcast.js"
  },
  {
    name: "ColorConverter.js",
    github: "SimonWaldherr/ColorConverter.js",
    tags: ["color", "color manipulation"],
    description: "Convert between RGB, YUV, HSL, HSV, CMYK and HEX color defining with these JavaScript functions under MIT-License",
    url: "https://github.com/SimonWaldherr/ColorConverter.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/ColorConverter.js/master/colorconverter.js"
  },
  {
    name: "CSSfilter.js",
    github: "SimonWaldherr/CSSfilter.js",
    tags: ["css", "css3", "filter"],
    description: "CSSfilter.js helps you, adding CSS filters to images (or other elements)",
    url: "https://github.com/SimonWaldherr/CSSfilter.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/CSSfilter.js/master/cssfilter.js"
  },
  {
    name: "PullToRefresh",
    github: "SimonWaldherr/PullToRefresh",
    tags: ["webkit", "mobile", "scroll"],
    description: "A dependency-free PullToRefresh implementation",
    url: "https://github.com/SimonWaldherr/PullToRefresh",
    source: "https://raw.githubusercontent.com/SimonWaldherr/PullToRefresh/master/ptr.js"
  },
  {
    name: "infinity.js",
    github: "SimonWaldherr/infinity.js",
    tags: ["ajax", "scroll"],
    description: "dependency-free infinite scrolling",
    url: "https://github.com/SimonWaldherr/infinity.js",
    source: "https://raw.githubusercontent.com/SimonWaldherr/infinity.js/master/infinity.js"
  },
  {
    name: "ShuntingYard.js",
    tags: ["shunting yard", "algorithms", "math", "rpn", "reverse polish notation", "eval", "expression", "Dijkstra"],
    description: "Calculate math from user input without using eval with Dijkstra's shunting yard algorithm",
    url: "https://github.com/Calamari/shunting-yard.js",
    source: "https://raw.githubusercontent.com/Calamari/shunting-yard.js/master/dist/shunting-yard.js"
  },
  {
    name: "Bespoke.js",
    tags: ["presentation", "slides", "deck", "css3"],
    description: "DIY presentation micro-framework, harnessing the power of CSS3 transitions.",
    url: "https://github.com/markdalgleish/bespoke.js",
    source: "https://raw.githubusercontent.com/markdalgleish/bespoke.js/master/dist/bespoke.js"
  },
  {
    name: "usertiming.js",
    tags: ["usertiming", "user timing", "performance timeline", "window.performance.now", "mark", "measure"],
    description: "User Timing polyfill",
    url: "https://github.com/nicjansma/usertiming.js",
    source: "https://raw.githubusercontent.com/nicjansma/usertiming.js/master/src/usertiming.js"
  },
  {
    name: "animx",
    tags: ["animation", "css3"],
    description: "Easily define CSS keyframes and animations during runtime",
    url: "https://github.com/bjorkstam/animx",
    source: "https://raw.githubusercontent.com/bjorkstam/animx/master/animx.js"
  },
  {
    name: "LogJS",
    tags: ["logging", "CORS", "localStorage", "DOM"],
    description: "Lightweight, extendable JavaScript logging library.",
    url: "https://github.com/bfattori/LogJS",
    source: "https://raw.githubusercontent.com/bfattori/LogJS/master/log.js"
  },
  {
    name: "StdClassJS",
    github: "BlueJeansAndRain/stdclassjs",
    tags: ["oop", "class", "extend", "mixin"],
    description: "A dead simple JavaScript inheritance implementation.",
    url: "https://github.com/BlueJeansAndRain/stdclassjs",
    source: "https://raw.githubusercontent.com/BlueJeansAndRain/stdclassjs/master/stdclass.js"
  },
  {
    name: "keydrown",
    tags: ["games"],
    description: "A JavaScript key state handler for web apps",
    url: "https://github.com/jeremyckahn/keydrown",
    source: "https://raw.githubusercontent.com/jeremyckahn/keydrown/master/dist/keydrown.min.js"
  },
  {
    name: "vivi.js",
    tags: ["animation", "animate", "css", "css3", "keyframe", "defined" ],
    description: "Tiny wrapper for CSS Defined Animations (@keyframes).",
    url: "https://github.com/musictheory/vivi.js",
    source: "https://raw.githubusercontent.com/musictheory/vivi.js/master/src/vivi.js"
  },
  {
    name: "salt.js",
    tags: ["dom", "selectors", "traversing", "library"],
    description: "micro DOM selector library that maps queries to native get commands",
    url: "https://github.com/james2doyle/saltjs",
    source: "https://raw.githubusercontent.com/james2doyle/saltjs/master/js/salt.js"
  },
  {
    name: "defineObject",
    tags: ["prototypes", "objects", "mixins"],
    description: "A bit of sugar for defining JavaScript Objects and their Prototypes.",
    url: "https://github.com/smelnikov/defineObject",
    source: "https://raw.githubusercontent.com/smelnikov/defineObject/master/defineObject.js"
  },
  {
    name: "color.js",
    github: "brehaut/color-js",
    tags: ["color", "color manipulation"],
    description: "API for immutable color objects in RGB, HSV and HSL with optional alpha. Comprehensive CSS format parsing and output.",
    url: "https://github.com/brehaut/color-js/",
    source: "https://raw.githubusercontent.com/brehaut/color-js/master/color.js"
  },
  {
    name: "ScriptInclude",
    tags: ["loader"],
    description: "Simple includes in the browser.",
    url: "https://github.com/EvanHahn/ScriptInclude",
    source: "https://raw.githubusercontent.com/EvanHahn/ScriptInclude/master/include.js"
  },
  {
    name: "cssanimevent",
    github: "magnetikonline/cssanimevent",
    tags: ["animation", "css3", "events", "polyfill", "transitions"],
    description: "CSS3 animation and transition DOM event handler with a simple fallback pattern for unsupported browsers.",
    url: "https://github.com/magnetikonline/cssanimevent",
    source: "https://raw.githubusercontent.com/magnetikonline/cssanimevent/master/cssanimevent.js"
  },
  {
    name: "ClassJS",
    tags: ["class", "inheritance", "namespace", "node"],
    description: "JavaScript classical inheritance for the browser and Node.js. Super methods and namespaces",
    url: "https://github.com/darlanalves/ClassJS",
    source: "https://raw.githubusercontent.com/darlanalves/ClassJS/master/src/class/class.js"
  },
  {
    name: "Hamster.js",
    github: "monospaced/hamster.js",
    tags: ["mousewheel", "mouse", "wheel", "events"],
    description: "A standalone JavaScript library for cross-browser mouse wheel support.",
    url: "https://github.com/monospaced/hamster.js",
    source: "http://monospaced.github.io/hamster.js/hamster.js"
  },
  {
    name: "MinifiedJS",
    github: "timjansen/minified.js",
    tags: ["DOM manipulation", "animation", "cookies", "events", "HTTP requests"],
    description: "Minified.js is a client-side JavaScript library, comparable to jQuery and MooTools in scope. Its features include DOM manipulation, animation, events, cookies and HTTP requests",
    url: "http://minifiedjs.com/",
    source: "http://minifiedjs.com/download/minified-src.js"
  },
  {
    name: "spin.js",
    tags: ["spinning", "indicator", "loading", "spinner"],
    description: "A spinning activity indicator. An animated CSS3 loading spinner.",
    url: "http://fgnass.github.io/spin.js/",
    source: "http://fgnass.github.io/spin.js/spin.js"
  },
  {
    name: "Graph",
    tags: ["traversing", "graph"],
    description: "Provides jQuery-like functionality for graph structures in JavaScript.",
    url: "https://github.com/ryansmith94/Graph",
    source: "https://raw.githubusercontent.com/ryansmith94/Graph/master/src/core.js"
  },
  {
    name: "thenBy",
    github: "Teun/thenBy.js",
    tags: ["sorting", "sort", "arrays"],
    description: "Enable firstBy().thenBy().thenBy() sorting of arrays using the standard Array.sort",
    url: "https://github.com/Teun/thenBy.js",
    source: "https://raw.githubusercontent.com/Teun/thenBy.js/master/thenBy.js",
    tinyminify: true
  },
  {
    name: "Scorebook",
    tags: ["cricket", "scoring"],
    description: "A JavaScript library for cricket scoring.",
    url: "https://github.com/ryansmith94/Scorebook",
    source: "https://raw.githubusercontent.com/ryansmith94/Scorebook/master/src/core.js"
  },
  {
    name: "Pledges",
    tags: ["promise", "pledge"],
    description: "A JavaScript micro-library that provides promise functionality.",
    url: "https://github.com/ryansmith94/Pledges",
    source: "https://raw.githubusercontent.com/ryansmith94/Pledges/master/src/core.js"
  },
  {
    name: "SVGEventListener",
    github: "m4dz/SVGEventListener",
    tags: ["svg", "events", "animation", "polyfill"],
    description: "A polyfill for animate events on SVG on non-supported browsers, like webkit engines",
    url: "https://github.com/m4dz/SVGEventListener",
    source: "https://raw.githubusercontent.com/m4dz/SVGEventListener/master/SVGEventListener.js"
  },
  {
    name: "chronology.js",
    tags: ["undo", "redo", "history", "chronology"],
    description: "A micro javascript library for managing an undo/redo history.",
    url: "http://chronology.wout.co.uk",
    source: "https://raw.githubusercontent.com/wout/chronology.js/master/chronology.js"
  },
  {
    name: "DoubleMetaphone",
    tags: ["phonetic", "metaphone", "codec", "sounds", "like"],
    description: "Phonetically encode w/ DoubleMetaphone algorithm ('Alexander' -&gt; 'ALKS')",
    url: "https://github.com/hgoebl/doublemetaphone",
    source: "https://raw.githubusercontent.com/hgoebl/doublemetaphone/master/doublemetaphone.js"
  },
  {
    name: "Catiline",
    tags: ["worker", "parallel"],
    description: "Web workers, but easy.",
    url: "http://catilinejs.com",
    source: "https://raw.githubusercontent.com/calvinmetcalf/catiline/master/dist/catiline.js"
  },
  {
    name: "civem.js",
    tags: ["html5", "input", "validation"],
    description: "Custom error messages for HTML5 form validation.",
    url: "https://github.com/javanto/civem.js",
    source: "https://raw.githubusercontent.com/javanto/civem.js/master/src/civem.js"
  },
  {
    name: "i18nText",
    tags: ["i18n"],
    description: "A JavaScript library for i18n text messages.",
    url: "https://bitbucket.org/vogdb/i18n-text",
    source: "https://bitbucket.org/vogdb/i18n-text/raw/master/dist/i18n-text.js"
  },
  {
    name: "canvas-manipulation",
    tags: ["canvas"],
    description: "Enable you canvas with zoom, drag and rotate functionality",
    url: "https://bitbucket.org/vogdb/canvas-manipulation",
    source: "https://bitbucket.org/vogdb/canvas-manipulation/raw/master/dist/canvas-manipulation.js"
  },
  {
    name: "RaptorJS",
    tags: ["class", "inheritance", "extend", "amd", "prototype", "prototypal", "lazy"],
    description: "The core module of RaptorJS provides a lightweight module system that supports namespacing, AMD, class inheritance, mixins, enums and lazy initialization. Works in the browser and Node.js",
    url: "https://github.com/raptorjs/raptorjs",
    source: "http://raptorjs.org/dist/raptor.js"
  },
  {
    name: "Lie",
    tags: ["promise", "deferred","async"],
    description: "A very small library for promises",
    url: "https://github.com/calvinmetcalf/lie",
    source: "https://raw.githubusercontent.com/calvinmetcalf/lie/master/dist/lie.js"
  },
  {
    name: "assure.js",
    tags: ["promises", "promise", "deferred", "deferreds", "aynchronous", "async"],
    description: "Promises/A+ micro library to help with asynchronous work flow.",
    url: "https://github.com/avoidwork/assure",
    source: "https://raw.githubusercontent.com/avoidwork/assure/master/lib/assure.js"
  },
  {
    name: "keysort",
    tags: ["array", "object", "sort", "keys", "sql", "where"],
    description: "Sorts an Array of Objects with SQL ORDER BY clause",
    url: "https://github.com/avoidwork/keysort",
    source: "https://raw.githubusercontent.com/avoidwork/keysort/master/lib/keysort.js"
  },
  {
    name: "klud.js",
    tags: ["testing", "unit test", "assert", "spy", "mock"],
    description: "A minimal unit testing library.",
    url: "https://bitbucket.org/zserge/klud.js/",
    source: "https://bitbucket.org/zserge/klud.js/raw/default/klud.js"
  },
  {
    name: "callbacks.js",
    tags: ["callbacks", "events", "event manager"],
    description: "Callbacks library similar to jQuery's Callbacks. There's also an event manager that allows you to use on(), one(), off() and trigger()",
    url: "https://github.com/adrianmiu/callbacks",
    source: "https://raw.githubusercontent.com/adrianmiu/callbacks/master/src/callbacks.js"
  },
  {
    name: "chronoman",
    github: "gamtiq/chronoman",
    tags: ["setTimeout", "setInterval", "timer", "timeout", "management", "utility"],
    description: "Utility class to simplify use of timers created by setTimeout.",
    url: "https://github.com/gamtiq/chronoman",
    source: "https://raw.githubusercontent.com/gamtiq/chronoman/master/dist/chronoman.js"
  },
  {
    name: "basespace",
    github: "gamtiq/basespace",
    tags: ["namespace", "ns", "space", "object"],
    description: "Functions to create namespaces inside objects.",
    url: "https://github.com/gamtiq/basespace",
    source: "https://raw.githubusercontent.com/gamtiq/basespace/master/dist/basespace.js"
  },
  {
    name: "mixing",
    github: "gamtiq/mixing",
    tags: ["mix", "merge", "mixin", "object", "filter", "change", "copy", "clone"],
    description: "Functions to mix, filter, change and copy/clone objects.",
    url: "https://github.com/gamtiq/mixing",
    source: "https://raw.githubusercontent.com/gamtiq/mixing/master/dist/mixing.js"
  },
  {
    name: "extend",
    github: "gamtiq/extend",
    tags: ["extend", "inherit", "prototype", "inheritance", "class"],
    description: "Make one class (constructor function) inherited from another.",
    url: "https://github.com/gamtiq/extend",
    source: "https://raw.githubusercontent.com/gamtiq/extend/master/dist/extend.js"
  },
  {
    name: "numgen",
    github: "gamtiq/numgen",
    tags: ["number", "sequence", "generator", "progression", "Fibonacci"],
    description: "Creates objects that generate number sequences.",
    url: "https://github.com/gamtiq/numgen",
    source: "https://raw.githubusercontent.com/gamtiq/numgen/master/dist/numgen.js"
  },
  {
    name: "duratiform",
    github: "gamtiq/duratiform",
    tags: ["time", "duration", "divide", "separate", "decompose", "format", "millisecond"],
    description: "Utility to separate into parts and to format time duration in milliseconds.",
    url: "https://github.com/gamtiq/duratiform",
    source: "https://raw.githubusercontent.com/gamtiq/duratiform/master/dist/duratiform.js"
  },
  {
    name: "eva",
    tags: ["create", "function", "dynamic", "eval", "evaluate", "expression", "execute", "delegate", "method"],
    description: "Functions to create functions and evaluate expressions.",
    url: "https://github.com/gamtiq/eva",
    source: "https://raw.githubusercontent.com/gamtiq/eva/master/dist/eva.js"
  },
  {
    name: "easter.js",
    tags: ["easter-egg", "keys", "sequence"],
    description: "Easter eggs made easy.",
    url: "https://github.com/rkrupinski/easter.js",
    source: "https://raw.githubusercontent.com/rkrupinski/easter.js/master/easter.js"
  },
  {
    name: "henka",
    tags: ["responsive", "respond", "media", "query", "media-query", "queries"],
    description: "Light weight, portable, single purpose responsive javascript library.",
    url: "https://github.com/dmikey/henka",
    source: "https://raw.githubusercontent.com/dmikey/henka/master/src/js/henka-src.js"
  },
  {
    name: "rssi",
    tags: ["interpolation", "string", "formatting", "template", "templating"],
    description: "Ruby-like simple string interpolation for Node.js and browsers.",
    url: "https://github.com/mvasilkov/rssi",
    source: "https://raw.githubusercontent.com/mvasilkov/rssi/master/rssi.js"
  },
  {
    name: "trier.js",
    tags: ["repeat", "retry", "predicate", "conditional", "invocation"],
    description: "Because everyone loves a trier! Conditional and repeated task invocation for node and browser.",
    url: "https://github.com/philbooth/trier.js",
    source: "https://raw.githubusercontent.com/philbooth/trier.js/master/src/trier.js"
  },
  {
    name: "gameloop.js",
    tags: ["games"],
    description: "Very simple library to create game loop.",
    url: "https://github.com/arthesowy/gameloop.js",
    source: "https://raw.githubusercontent.com/arthesowy/gameloop.js/master/gameloop.js"
  },
  {
    name: "FastActive",
    tags: ["events", "mobile", "touch"],
    description: "FastActive is a javascript snippet that makes websites and web apps feel as responsive as native apps on touch devices.",
    url: "https://github.com/jonathanstark/FastActive",
    source: "https://raw.githubusercontent.com/jonathanstark/FastActive/master/FastActive.js"
  },
  {
    name: "JSONP",
    tags: ["jsonp", "asynchronous", "async"],
    description: "A slim JSONP request library for Javascript",
    url: "https://github.com/larryosborn/JSONP",
    source: "https://raw.githubusercontent.com/larryosborn/JSONP/master/dist/jsonp.js"
  },
  {
    name: "ResponsiveComments",
    tags: ["responsive", "rwd", "conditional", "loading", "progressive", "enhancement"],
    description: "A client-side solution to conditional loading.",
    url: "http://responsivecomments.com/",
    source: "https://raw.githubusercontent.com/chambaz/ResponsiveComments/master/responsive-comments.js"
  },
  {
    name: "Sparklines",
    tags: ["sparkline", "sparklines", "tiny", "graph", "line", "spark", "chart"],
    description: "Create sparkline graphs inline with the text. Good defaults, easy to customize.",
    url: "https://github.com/mariusGundersen/sparkline",
    source: "https://raw.githubusercontent.com/mariusGundersen/sparkline/master/source/sparkline.js"
  },
  {
    name: "YoutubeDelayed.js",
    github: "MAD-GooZe/YoutubeDelayed.js",
    tags: ["youtube", "video", "loader"],
    description: "A a small script which allows you to load youtube player on page only when the user wants to watch the video.",
    url: "https://github.com/MAD-GooZe/YoutubeDelayed.js",
    source: "https://raw.githubusercontent.com/MAD-GooZe/YoutubeDelayed.js/master/YoutubeDelayed.js"
  },
  {
    name: "Riot",
    github: "muut/riotjs",
    tags: ["router", "event handling", "template engine", "mvp", "framework", "fast", "tiny"],
    description: "The 1kb client-side MVP library. An incredibly fast, powerful yet tiny tool for building large scale web applications.",
    url: "https://moot.it/riotjs/",
    source: "https://raw.githubusercontent.com/muut/riotjs/master/riot.js"
  },
  {
    name: "Contra",
    tags: ["async", "asynchronous", "flow", "events", "callbacks", "queue"],
    description: "Tiny asynchronous flow control library.",
    url: "https://github.com/bevacqua/contra",
    source: "https://raw.githubusercontent.com/bevacqua/contra/master/dist/contra.js"
  },
  {
    name: "preloadr.js",
    tags: ["preload", "images"],
    description: "Preload images, one after another if needed and callback when every image is ready and/or all of them",
    url: "https://github.com/borisschapira/preloadr",
    source: "https://raw.githubusercontent.com/borisschapira/preloadr/master/preloadr.js"
  },
  {
    name: "psQuery",
    tags: ["jQuery", "DOM", "ajax", "CSS"],
    description: "A fast jQuery replacement library for DOM, ajax, and CSS. 2kb minified+gzipped. Supports IE8+.",
    url: "https://github.com/pseudosavant/psQuery",
    source: "https://raw.githubusercontent.com/pseudosavant/psQuery/master/src/psQuery.js"
  },
  {
    name: "psColor",
    tags: ["color", "canvas"],
    description: "psColor is a small JavaScript library for calculating the average color of an  &lt;img&gt; element in the browser.",
    url: "https://github.com/pseudosavant/psColor",
    source: "https://raw.githubusercontent.com/pseudosavant/psColor/master/psColor.js"
  },
  {
    name: "decision-tree.js",
    tags: ["machine learning", "decision tree", "classifier"],
    description: "Tiny library for building Decision Tree and Random Forest classifiers.",
    url: "https://github.com/lagodiuk/decision-tree-js",
    source: "https://raw.githubusercontent.com/lagodiuk/decision-tree-js/master/decision-tree.js"
  },
  {
    name: "Grapnel.js",
    tags: ["grapnel", "route", "routing", "router", "hash", "anchor", "tiny", "require", "named", "parameters"],
    description: "The smallest (1100 bytes gzipped!) JavaScript Router with Named Parameters",
    url: "https://github.com/EngineeringMode/Grapnel.js",
    source: "https://raw.githubusercontent.com/EngineeringMode/Grapnel.js/master/dist/grapnel.min.js"
  },
  {
    name: "Nerve",
    tags: ["async", "asynchronous", "channel", "route", "observer", "mediator", "events", "callbacks", "queue"],
    description: "An asynchronous javascript micro framework for event broadcasts along routes and channels.",
    url: "https://github.com/jstandish/nerve",
    source: "https://raw.githubusercontent.com/jstandish/nerve/master/nerve.js"
  },
  {
    name: "tiny-stack",
    tags: ["stack", "data", "amd"],
    description: "Tiny stack for browser or server",
    url: "http://avoidwork.github.io/tiny-stack",
    source: "https://raw.githubusercontent.com/avoidwork/tiny-stack/master/lib/tiny-stack.js"
  },
  {
    name: "MarmottAjax",
    tags: ["ajax", "xhr", "json"],
    description: "A tiny Ajax librairy with promises and some Marmot",
    url: "https://github.com/marmottes/marmottajax",
    source: "https://raw.githubusercontent.com/marmottes/marmottajax/master/marmottajax.js"
  },
  {
    name: "datediff",
    tags: ["date", "time"],
    description: "Calculate difference between two dates",
    url: "https://github.com/dmfilipenko/datediff",
    source: "https://raw.githubusercontent.com/dmfilipenko/datediff/master/datediff.js"
  },
  {
    name: "lodash dom traverse",
    github: "szarouski/lodash.dom-traverse",
    tags: ["lodash", "dom", "traverse"],
    description: "Dom traversing with lodash",
    url: "http://szarouski.github.io/lodash.dom-traverse/",
    source: "https://raw.githubusercontent.com/szarouski/lodash.dom-traverse/master/lodash.dom-traverse.js"
  },
  {
    name: "Parse Form",
    tags: ["form", "forms", "parse"],
    description: "A micro library used to parse and manipulate forms",
    url: "https://github.com/AdamBrodzinski/parse-form",
    source: "https://raw.githubusercontent.com/AdamBrodzinski/parse-form/master/parse-form.js"
  },
  {
    name: "Deb.js",
    tags: ["debugging", "console output", "stack trace", "time execution"],
    description: "The tiniest debugger in the world",
    url: "https://github.com/krasimir/deb.js",
    source: "https://raw.githubusercontent.com/krasimir/deb.js/master/lib/deb.js"
  },
  {
    name: "Balalaika",
    tags: ["dom", "selectors", "jquery", "library"],
    description: "Tiny but impossible powerful jQuery-like Javascript DOM library",
    url: "https://github.com/finom/balalaika",
    source: "https://raw.githubusercontent.com/finom/balalaika/master/balalaika.js"
  },
  {
    name: "Gifffer",
    tags: ["gif", "play control", "stop", "first frame"],
    description: "A tiny JavaScript library that prevents the autoplaying of the animated Gifs",
    url: "https://github.com/krasimir/gifffer",
    source: "https://raw.githubusercontent.com/krasimir/gifffer/master/lib/gifffer.js"
  },
  {
     name: "Rlite",
     tags: ["rlite", "route", "routing", "router", "hash", "querystring", "named", "parameters"],
     description: "Tiny, simple, light-weight routing",
     url: "https://github.com/chrisdavies/rlite",
     source: "https://raw.githubusercontent.com/chrisdavies/rlite/master/rlite.js"
  },
  {
     name: "Kwargs",
     tags: ["python", "arguments", "kwargs", "defaults", "function", "syntactic sugar"],
     description: "Smart python like argument management for javascript",
     url: "https://github.com/serkanyersen/kwargsjs",
     source: "https://raw.githubusercontent.com/serkanyersen/kwargsjs/master/kwargs.js"
  },
  {
     name: "ifvisible.js",
     tags: ["visibility", "idle", "coffee", "script", "interval", "requestAnimationFrame"],
     description: "Crossbrowser & lightweight way to check if user is looking at the page or interacting with it.",
     url: "https://github.com/serkanyersen/ifvisible.js",
     source: "https://raw.githubusercontent.com/serkanyersen/ifvisible.js/master/src/ifvisible.js"
  }
];

function change(url, key, value)
{
  var module=deserialize('module',{});
  for (i in module)
    if (module[i].url==url)
    {
      module[i][key]=value;
    }
  serialize('module',module);
}

function next()
{
  var module=deserialize('module',{});
  var m=module
        .filter(function (e) { return !e.status; })
        .sort(function() { return .5 - Math.random(); })
        .sort(function (a,b) { return (a.last||0)-(b.last||0); });
  var modul=m[0];
  //window.setTimeout(function () {
    //if (modul.source) GM_openInTab(modul.source);
    if (modul.url)
    {
      change(modul.url, "last", +new Date());
      GM_openInTab(modul.url);
    }
  //},10000);
  /*
  showmsg({
    text:  ["<a href="+(modul.url||modul.source)+">"+modul.name+"</a>", modul.tags.join(", "), modul.description, modul.status,''].join("<br>"),
    url: modul.url,
    source: modul.source,
    fixed:true,
    OK: "OK",
    Cancel: "Cancel",
    Timeout: 60,
    onOK: function (data) { 
      if (data.source) GM_openInTab(data.source);
      if (data.url) GM_openInTab(data.url);
    },
    onCancel: function (data) {},
    onTimeout: function (data) {},
  });
  */
}

function Activity(func)
{
  var data = { every:1000, repeat:0, func:func, enabled:false, last:+new Date() };
  this.set = function (key, value)
  {
    this.log("set "+key+" to "+value);
    data[key]=value;
    return this;
  }
  this.stop = function () { return this.log("stop").set("enabled",false); }
  this.start = function () { return this.log("start").set("enabled",true); }
  this.repeat = function (anz) { return this.log("repeat "+anz).set("repeat",anz); }
  this.every = function (anz) { return this.log("every "+anz).set("every",anz); }
  this.log = function (a) { GM_log(a); return this; }
  this.run = function ()
  {
    if (!data.enabled) return;
    if (data.last < +new Date() - data.every)
    {
      this.log("run next");
      data.last=+new Date();
      data.func(this);
      if (data.repeat>0)
      {
        this.log("repeat--");
        data.repeat--;
        if (data.repeat==0)
          this.log("repeat == 0").stop();
      }
    }
    return this;
  }
  that=this;
  //on(['mousemove','keypress'],window,function (e) { that.run(); }); 
  window.addEventListener('mousemove', function () { that.run(); }, false);
  window.addEventListener('keypress', function () { that.run(); }, false);
}

function check(url)
{
  var module=deserialize('module',moduledef);
  var nr=false;
  for (i in module)
    if (module[i].url==url || module[i].source==url)
      nr=i;
  //var m=module.filter(function (e) { return url==e.url || url==e.source; });
  var moduleStatus=module.filter(function (e) {  return e.status; });
  var moduleStatusGood=module.filter(function (e) {  return e.status=="good"; });
  if (nr)
  {
    function url(Name,Url)
    {
      return Url?"<a href='"+Url+"'>"+Name+"</a>":Name;
    }
    var modul=module[nr];
    var c={ "bad": "red", "good": "green", undefined:"gray" };
    showmsg({
      id: "default_msg_{rand}",
      text: [
        url(modul.name, modul.url)+" ("+url("Quelltext",modul.source)+")",
        modul.tags.join(", "),
        modul.description,
        modul.status,
        moduleStatusGood.length+"/"+moduleStatus.length+"/"+module.length,
        ''].join("<br>"),
      color:c[modul.status],
      //color: "green",
      nr:nr,
      fixed:true,
      OK: "Cool",
      Cancel: "Müll",
      Timeout: 60,
      onOK: function (data) { var module=deserialize('module',{}); module[data.nr].status="good"; serialize('module',module); },
      onCancel: function (data) { var module=deserialize('module',{}); module[data.nr].status="bad"; serialize('module',module); },
      onTimeout: function (data) {},
    });
  }
};

if (alleXTage(1))
  next();
//new Activity(function () { next(); }).every(10*60*1000).repeat(1).start();
check(location.href);
//ifvisible.on("blur", next);


