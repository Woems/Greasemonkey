// ==UserScript==
// @name           Crazy Heels - Popup groﬂ
// @namespace      Woems
// @include        http://www.crazy-heels.de/shop/product_info.php*
// ==/UserScript==

unsafeWindow.popupWindow=function (url) {
  window.open(url,'popupImageWindow',
    'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=1010,height=1000,screenX=150,screenY=150,top=150,left=150'); 
//    'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=610,height=600,screenX=150,screenY=150,top=150,left=150'); 
}

