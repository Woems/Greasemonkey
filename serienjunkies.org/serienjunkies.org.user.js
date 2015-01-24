// ==UserScript==
// @name        serienjunkies.org
// @namespace   Woems
// @include     http://serienjunkies.org*
// @version     1
// ==/UserScript==

function RegDelete(text, replacearray)
{
  for (i in replacearray) if (typeof replacearray=="object" && replacearray[i] instanceof RegExp)
  {
    text=text.replace(replacearray[i],"");
  }
  return text;
}

document.title=RegDelete(document.title,[ /Serienjunkies[ :]+/, /Downloads & Streams[ :&»]+/ ]);

