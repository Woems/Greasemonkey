// ==UserScript==
// @name			Facebook Accept all
// @namespace		Facebook Accept all
// @description		Facebook Accept all
// @include			http://www.facebook.com/home.php?#/reqs.php
// @include			http://www.facebook.com/reqs.php
// @include			http://www.facebook.com/reqs*
// @include			http://www.facebook.com/*/reqs.php
// @version			1.0.0
// @contributor		Andrej Bučány
// ==/UserScript==

function safeWrap(f) {
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
	};
}
unsafeWindow._getMafiaGift = safeWrap(_getMafiaGift);
unsafeWindow._getCafeGift = safeWrap(_getCafeGift);
unsafeWindow._getFarmVilleGift = safeWrap(_getFarmVilleGift);
unsafeWindow._getPokerGift = safeWrap(_getPokerGift);
unsafeWindow._getVampire = safeWrap(_getVampire);
unsafeWindow._getCage = safeWrap(_getCage);
unsafeWindow._getYoville = safeWrap(_getYoville);
unsafeWindow._acceptFriends = safeWrap(_acceptFriends);
unsafeWindow._acceptMobsters = safeWrap(_acceptMobsters);
unsafeWindow._getFishVilleGift = safeWrap(_getFishVilleGift);
unsafeWindow._getWarMachine = safeWrap(_getWarMachine);
unsafeWindow._getStreetRacing = safeWrap(_getStreetRacing);
unsafeWindow._getHappyAquarium = safeWrap(_getHappyAquarium);
(function(E){E.fn.drag=function(L,K,J){if(K){this.bind("dragstart",L)}if(J){this.bind("dragend",J)}return !L?this.trigger("drag"):this.bind("drag",K?K:L)};var A=E.event,B=A.special,F=B.drag={not:":input",distance:0,which:1,dragging:false,setup:function(J){J=E.extend({distance:F.distance,which:F.which,not:F.not},J||{});J.distance=I(J.distance);A.add(this,"mousedown",H,J);if(this.attachEvent){this.attachEvent("ondragstart",D)}},teardown:function(){A.remove(this,"mousedown",H);if(this===F.dragging){F.dragging=F.proxy=false}G(this,true);if(this.detachEvent){this.detachEvent("ondragstart",D)}}};B.dragstart=B.dragend={setup:function(){},teardown:function(){}};function H(L){var K=this,J,M=L.data||{};if(M.elem){K=L.dragTarget=M.elem;L.dragProxy=F.proxy||K;L.cursorOffsetX=M.pageX-M.left;L.cursorOffsetY=M.pageY-M.top;L.offsetX=L.pageX-L.cursorOffsetX;L.offsetY=L.pageY-L.cursorOffsetY}else{if(F.dragging||(M.which>0&&L.which!=M.which)||E(L.target).is(M.not)){return }}switch(L.type){case"mousedown":E.extend(M,E(K).offset(),{elem:K,target:L.target,pageX:L.pageX,pageY:L.pageY});A.add(document,"mousemove mouseup",H,M);G(K,false);F.dragging=null;return false;case !F.dragging&&"mousemove":if(I(L.pageX-M.pageX)+I(L.pageY-M.pageY)<M.distance){break}L.target=M.target;J=C(L,"dragstart",K);if(J!==false){F.dragging=K;F.proxy=L.dragProxy=E(J||K)[0]}case"mousemove":if(F.dragging){J=C(L,"drag",K);if(B.drop){B.drop.allowed=(J!==false);B.drop.handler(L)}if(J!==false){break}L.type="mouseup"}case"mouseup":A.remove(document,"mousemove mouseup",H);if(F.dragging){if(B.drop){B.drop.handler(L)}C(L,"dragend",K)}G(K,true);F.dragging=F.proxy=M.elem=false;break}return true}function C(M,K,L){M.type=K;var J=E.event.handle.call(L,M);return J===false?false:J||M.result}function I(J){return Math.pow(J,2)}function D(){return(F.dragging===false)}function G(K,J){if(!K){return }K.unselectable=J?"off":"on";K.onselectstart=function(){return J};if(K.style){K.style.MozUserSelect=J?"":"none"}}})(jQuery);
var _imgShow = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QAKxAAAgEDAwEIAQUAAAAAAAAAAQIDBAURABIhBgcTFCIxYXGBQSMlMlFT/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABFB/9oADAMBAAIRAxEAPwDQvUfUdq6b6cmu9ZEGjpkXbGoG53bCog+WP166A3F1B2isniJLdZo3dPErYi0huAp8+h5ClvfH1njSBVarxbr1Y1uFPEqrNG26MgZRhwyn4OgMdoFnkv8A009DHMlLLBLFURzyn9Ne6bzF+Dxs3fetCO9DSr2u+Oy4ZqEVr84AcA0v9Dy7Fz8+3GmhH0tRy2y0GnkkSaSeSSZ5Y/4HvDxt9sY0FSWnpqiB4plSWGZSskbgMrKwwQQeCCNSgBT9kVFBfjIlT+w43LR7m7wHdnud3+eec53fj182oH6wwQwhIwscca4RVwAqgcAD8AatH//Z";
var _imgHide = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QAKxAAAgEDAwMCBQUAAAAAAAAAAQIDBAUSABEhBhNBBzIUFSIxURZhcoGh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/ANHXS8Wiy2SW53DCOkpYw0jYgnwAAPJZiAB+dAUpuvepJ6X5r+jnSyFcxKZo/iO39+52cd/b4/3bQLqS42252la6jVWgqIyyNiAfIIP7g8HQDPUq03O/dMG329FeoSeCURO2KuqPyGJ42AOX9a0IcN1pm9V2n+csfoERpwSYRJhgaTPfH3fX7fdx79Aq6QpKy2WZqWpQRySSyyGJTuqBjwAR42G+gq1VLFVUktOzlFnjaMvG+DgONt1ccqeeCNSgNF6bW2HqjtR25V6dFDhl3efiM/593fHz9tQO44I4adYw5YRoFDO2THEbbsx5J/J1aP/Z";
var _acceptAll = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgUCCP/EACoQAAIABAQFAwUAAAAAAAAAAAECAwQFEQAGEiETMkFRYQciMSMlQrHB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOmoPA4SfTXlHQdsWDTvKIjO6w0RAWd2AAAG5JPQDCCFQ810jMCVFZKXISU9vFdAFcOG0svbl+DviCHnrM2YaJS4M/S4CRoEvE+4awWtCtsdrWW/M3TbzjQI5n9SmzNJSFDoKOJqpkCchm4K77QdXwQSNTMPxHkjED/L9Ng0WkQ6dAF7C8eN1iRG5nP87DFFLTDZd9JVhuDYgg/u+JQaoXp3lqiV2ZrEgrLFjqVhS7EGFA1c/BFrjV5JsNhtgErBApNxsMKP/9k%3D";
var _loading = "data:application/octet-stream;base64,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%3D%3D";
var _imgLoadingRed = "data:application/octet-stream;base64,R0lGODlhEAAQAPUAABkZGRkaGBocGBodGBoeGBsfGB8rFyI0FyY9FidBFi5UFC5VFDNjEzVoEzVpEzhxEkCIEUKNEEOPEEOQEESREE2rDlG2DqusrRkbGBsgGB4oFyM2FiM3FiU8FiY+FixRFTNiEzNkEzduE0CHEUKMEEKOEE2sDiEvFyEwF06tDjhwEjlyEh4nGCM1FjFdFD+FEUqiDxkZGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRpbmZvLm5ldCkAIfkEAQoAFwAsAAAAABAAEAAABUsgII5kaZ5oqq5s675wfApFPQRETQRDXQgLiYTyOEAmE8jhQREuHJZoBFGJVhCRqMUBlVKtWG2ja5lWLddstJFwjBUGBpdhULgdiRAAIfkEAQoAFwAsAAAAABAAEAAABlpAgHBILBqPyKRyyWw6n0gPCBT6YJQOi1ZSwGotksygUCAExmRBVlvajCYTyOFBkUgWChKpJOpUtBUIEV8OGAOHARwmgIJfDUWKjINaj0QaDA4ODAYKDg0OCUEAIfkEAQoAFwAsAAAAABAAEAAABlxAgHBILBqPyKRyyRRqOFBUQMkwmVIQgtJh6UoK267lS7Vitckn9IQhFAqEwOBdEBRRkMkEcnhQJBILRRwmXRUIEWIOg4UWh4ldDYyGiGKSRBoMDg4MBgoODQ4JQQAh+QQBCgAXACwAAAAAEAAQAAAGYUCAcEgsGo9EzGApQA4VJFJJNXACHJaspGDFarlOr2Vr9YBAoQ/Gym67AQFCoUAIDOaFJhEFmUwgBw8UEhILRRwmWRUIEVkWDoeJFouNWQ2RioyOl0QaDA4ODAYKDg0OCUEAIfkEAQoAFwAsAAAAABAAEAAABl7AhKPhWAgAyKTSYWlKCsoogOmESpNUy/OaXEgklNWAixQUzmOyes1uu9UBwpkQGJwLRyUKMplADg8UXwtRHCZNFQgRTRYOhYcWiYtNDY+IioyVShoMDg4MBgpDDglBACH5BAEKABcALAAAAAAQABAAAAZhQIBwSCwaj0TMYClADhUkUkk1cAIclqykYMVquU6vZWv1gEChD8bKbrsBAUKhQAgM5oUmEQWZTCAHDxQSEgtFHCZZFQgRWRYOh4kWi41ZDZGKjI6XRBoMDg4MBgoODQ4JQQAh+QQBCgAXACwAAAAAEAAQAAAGXECAcEgsGo/IpHLJFGo4UFRAyTCZUhCC0mHpSgrbruVLtWK1ySf0hCEUCoTA4F0QFFGQyQRyeFAkEgtFHCZdFQgRYg6DhRaHiV0NjIaIYpJEGgwODgwGCg4NDglBACH5BAEKABcALAAAAAAQABAAAAZaQIBwSCwaj8ikcslsOp9IDwgU+mCUDotWUsBqLZLMoFAgBMZkQVZb2owmE8jhQZFIFgoSqSTqVLQVCBFfDhgDhwEcJoCCXw1FioyDWo9EGgwODgwGCg4NDglBACH5BAEKABcALAAAAAAQABAAAAVLICCOZGmeaKqubOu+cHwKRT0ERE0EQ10IC4mE8jhAJhPI4UERLhyWaARRiVYQkajFAZVSrVhto2uZVi3XbLSRcIwVBgaXYVC4HYkQACH5BAEKAAEALAAAAAAQABAAAAZaQIBwSCwaj8ikcslsOp9NlgsEcrGUHJPFYuIUBYUwJrvtYsIFwUIioTw6lW2l86CwF46tpdR6RSIvLSV6DnlbEmkDA2ASeg2GFohEBY1bDQkOjwsCRGqZDglBACH5BAEKAAEALAAAAAAQABAAAAZdQIBwSCwaj8ikcsk8ElocTougbMFMJlhLyTFZLCYO1wsWJ61YbVFQaA8KUGnh3RYsJBLKakAcrCh4Cw5fFhIFRAUShA6DX4aIil8NjYWHQ4mEDQkOkwsCRHacDglBACH5BAEKAAEALAAAAAAQABAAAAZgQIBwSCwaj0hAbMAcxJKA0ysSeZ2gHJPFYuJgtVxvMrvtQlkuEMjFgrrfREFhPjAO5gXBQiKhrOpDAysUfAsOWxYSBUQFEogOh1uKjI5bDZGJi0ONiA0JDpcLAnGGlwlBACH5BAEKAAYALAAAAAAQABAAAAZhQIBQqGE4HAzNcDnkmCwWE4fJdEKl1KU1Os0KUZDJBILyCgOEQoEQMLvf8LhcoC4MqIO6YCGRUFZ3QwMrFH0LDlAWEgVLBRKJR4mLjY9QDYhQk0OOiQ0JDpcLAkt7oA4JQQAh+QQBCgABACwAAAAAEAAQAAAGYECAcEgsGo9IQGzAHMSSgNMrEnmdoByTxWLiYLVcbzK77UJZLhDIxYK630RBYT4wDuYFwUIioazqQwMrFHwLDlsWEgVEBRKIDodbioyOWw2RiYtDjYgNCQ6XCwJxhpcJQQAh+QQBCgABACwAAAAAEAAQAAAGXUCAcEgsGo/IpHLJPBJaHE6LoGzBTCZYS8kxWSwmDtcLFietWG1RUGgPClBp4d0WLCQSympAHKwoeAsOXxYSBUQFEoQOg1+GiIpfDY2Fh0OJhA0JDpMLAkR2nA4JQQAh+QQBCgABACwAAAAAEAAQAAAGWkCAcEgsGo/IpHLJbDqfTZYLBHKxlByTxWLiFAWFMCa77WLCBcFCIqE8OpVtpfOgsBeOraXUekUiLy0leg55WxJpAwNgEnoNhhaIRAWNWw0JDo8LAkRqmQ4JQQAh+QQBCgAXACwAAAAAEAAQAAAFSyAgjmRpnmiqrmzrvnB8CkU9BERNBENdCAuJhPI4QCYTyOFBES4clmgEUYlWEJGoxQGVUq1YbaNrmVYt12y0kXCMFQYGl2FQuB2JEAAh+QQBCgAXACwAAAAAEAAQAAAGWkCAcEgsGo/IpHLJbDqfUCHmEwKBPMqCxMJ1CArgQYAQzmy5jYVEQnkcIJPJaFPiWhwOewRR4VY6IiUkJAp5XHt9FiYcAQOOGIYWiFyLRQkODQ4KBgx4DBpFQQAh+QQBCgAXACwAAAAAEAAQAAAGWkCAcEgsGo/IpHLJZAZQnKhGSYCkTCaGsiCxeBvb7pdqxTIEhfQgQEgTMKcoR7OQSCiPA2QygaCKDl4WEQgVXiYcgIKEhhaIil6Mh4lECQ4NDgoGDA4ODFNEQQAh+QQBCgAXACwAAAAAEAAQAAAGXkCAcEgsGo/Io2DAxCQBA1WJRFI8CxKL1nHNahtdrYWbxHxCIJDnyWYLCvBBgAAnBIoLiYTyOEAmExAoRQ5iEQgVWiYchIaIioxEhVqHiRaLRQkODQ4KBgwODgwaRUEAIfkEAQoAFwAsAAAAABAAEAAABl5AgHBIFCwcDUeCyAQUJJZoo0l8Ri1TqtAadWiFgxVFIll8wYW04Mxuu9/FdGEQIKQJAeaCTHkcIBMTEChMDlcRCBVRJhyFh4mLjUSGUYiKFoxMCUgOCgYMDg4MGkxBACH5BAEKABcALAAAAAAQABAAAAZeQIBwSCwaj8ijYMDEJAEDVYlEUjwLEovWcc1qG12thZvEfEIgkOfJZgsK8EGAACcEiguJhPI4QCYTEChFDmIRCBVaJhyEhoiKjESFWoeJFotFCQ4NDgoGDA4ODBpFQQAh+QQBCgAXACwAAAAAEAAQAAAGWkCAcEgsGo/IpHLJZAZQnKhGSYCkTCaGsiCxeBvb7pdqxTIEhfQgQEgTMKcoR7OQSCiPA2QygaCKDl4WEQgVXiYcgIKEhhaIil6Mh4lECQ4NDgoGDA4ODFNEQQAh+QQBCgAXACwAAAAAEAAQAAAGWkCAcEgsGo/IpHLJbDqfUCHmEwKBPMqCxMJ1CArgQYAQzmy5jYVEQnkcIJPJaFPiWhwOewRR4VY6IiUkJAp5XHt9FiYcAQOOGIYWiFyLRQkODQ4KBgx4DBpFQQA7";
var _ignoreAll = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAwAFBwj/xAArEAABAwMDAgQHAQAAAAAAAAABAgURAwQSACFBFTEGEyIyFBYjJENigfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDpG9cmtsbDeXuFOhRQMlYiSeABySew0BofmBTR1gVKXT8czWgbcYx3ynbHvOqJYOzS7NRvLHFdGolQ9oCkqA3SocEagqn69akM111kUw1pR9wakxHERvlMY47z231oYGp22WaZu/l/4uAT/Yn8Xn+V/o1kbx4cvWhbFbdEwLapH0inv+2fOc+6d51oK7srW9NlVvcKYrWtwPUJgg90qSobhQO4OoBR4W8PoYegC1plpKPLVbnnnIq92c+rKZnfQM1MzWzNlOwb6aaNrQBxTMknlSlHck8k6D//2Q%3D%3D";
var _imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAA9ElEQVQYlXWQvarCQBSEv82KG4NFIGJhETdB0uUR9v1fwMZCjCnsFgKB/QkEb3W9Sq7TDXycmTnCGPM8Ho9kWcY3ee+53W6s6romhMD5fCbGuACVUmitOZ1OJEop+r7/F5RSEmPkfr+zXq9JAKZpQkpJ27avOlprtNYAhBAAWP1emeeZx+NB0zR475FScrlcPpKSd2OtxVrLdrtlGAbmef4OF0VBURR0Xcd+v+dwOHzAq3ez2+24Xq+M44j3njzPARBC/MFKKWKMHx2dczjnAF"+
"6jkxgjVVWRpunidUIIsiyjLEumaUIYY55aazabzQJ+T+m6jh86CmFbC+aRtAAAAABJRU5ErkJggg%3D%3D";
var _imgCloseHover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAABC0lEQVQYlXWRMauCYBSGH6VFR4Wm0M3ZNWfHoL0lpb/Qb3Cr0TUUBH+AQ7/A2dlRPwiiTzfX7w4RN2/dd3vh4ZzDc7Ttdqv2+z2O46CUQinF3wghyLIM7Xq9qtvtRlmWPB6PD9C2beI4xrIsdMuyKIriK2iaJlJK8jx/wgDjOGKaJkmSsFqtAIiiiCiKALjf7wAsXlOmaaKqKo7HI33fYxgG5/N5tkl/L3VdU9c1nufRNA3TNP0PB0FAEARkWUYYhmw2mxm8eC/r9Zo0T"+
"Wnblq7r8H0fAE3TfmHbtpFScjqdZm6FEAA4jvM8YxgGDocDy+XyQ52u67iuy263Q0qJ9vrgS9m3CCG4XC78AIbyaugN8DI1AAAAAElFTkSuQmCC";
var _imgLog = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABAUAAgYH/8QAKhAAAQQBAwIDCQAAAAAAAAAAAgEDBAURAAYSExQhIkEHMUJFUVKBtMH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AO+zLC0O4bqasYbStwgluuymyc5c3CaQRQCDGOGfzoI8W6IzJyJUqoajNJzecKO8iIKe9c9XQKan2kVtvdu1bcJAjvC4kOR8RKAKS8xx5UVEXGguMsh384KJ8lZ/ceT+a1Bjd5X8zdcqRTU7q9xVyHAdrFIR7pGy4ddslwhdMkXIL6eZNQaDYlPX06zovg/dsdMLF/C8Q67aOg20v28STK+q6oMtqncabhC6ozr3OcEYLzE83m0Tg+bwmBMg7nPVwqLjGPXPhAHEq97Q3HHIlbtiO46qk6405LAjUlyqkoxkVcr9dNDHb1RbRZVvZXDkXvLNxk1ahk4TLYx44sJg3RbJVXhlfL4aD//Z";
var _imgSettings = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUI/8QALBAAAQMDAwIFAwUAAAAAAAAAAQIFEQMEEgATIQYUBxUiMVEWF2IyQWFxgf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDSV24Nba2Kvb3ClbUEJNRZTPvCQIAkkkwNAePiR0v5um0BomwNvvFw/YL5O1hjMwP7niNBftHJrc2rvbLCrb1kKwXjHtIIIPIIOgFeJV690+m6vZduLFKFhz34y2/SKe3lxllP8zjHOtUBEunQX0EQrH6gxMfr39/Lj8dvH/I/LUDbwwv3up06nuthTaUgN+zGY5UKgqY8TPzzMzqhM5tLa7N1awv6aa9pcACpTkj2IUCFJIIIIBBGoCn2l6Y8/Q4Y0/LU23bqaMPQV4lG9u55ZQficvVlOoFDUzNbM2osG+mmhaUQSlMkmTySVKJJJ+Tqj//Z";
var _imgUpdate = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAQUGBwj/xAAtEAACAgEDAwAIBwAAAAAAAAABAgMEBQAGERIUIQcTIjFBcYGCFzJRU2GT0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOmUaqkCs6Iqqo6mIAA8fE6sCrD7rwOTmu109XFYoyyJNG/T5SNyolU+4qePpqBrMazVnKohDIeCAP01Rm3pBuLYzW28NfkMGHuzS9z7XQJHiC9CM3zbj7tANv7Bo0rt+zd4kSV7EVGssjcR1pCyKS3PUXMR+nz1YBsG722b3Fg6Mxs4ak8fbMW6xG8gPXGG+PBBH2/zoKjObewuex/ZZSBbFckOvkqysPcyOpBB8/741BK/gnsD9mf+86gqMHtzCYDHmni4Vrwcl39oszNx+ZmYkk+NUf/Z";
var _imgIgnore = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAABgQHCP/EAC4QAAAFAwIDBgcBAAAAAAAAAAECAwQFERITAAYUITEHFSIyQXEXIzM0QlFigf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDREtuCDg2KK0gJUwUCxIMYmuMBa08JTU9x0A0e0wMPEA7jgNbkCP4N1l6Vw5q47vxv8tefTQMIncUHOsF1Y+0+Mtq5bBLYYxa08RS19w0B/f0gVrtJ88M1buFGeIUAdJEXIUTrpoiNqgCFbVB1qive83vEFR4eJ8USaYu7rbdCtzOMXT+aXf7T01kP+z6RK72o3eA1bt1XQq5+FRIgUwkVOmAiVMACtpdaEjekE5ntqP4pkqkk6dgjiUWEwJhjXTWG4SAc3MExDkGoAvw239nKtxMNUsUMNTM7+kLcW+T7fz0NX9agcbKgHUBtVpFvlUVXLbMKiiJjCn8xU6gWicpDcgN6hqj/2Q%3D%3D";
var _donate = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAYABgDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABwMFBgj/xAAtEAACAQIFAQQLAAAAAAAAAAABAgMEEQAFEhMhFQYUMUEHFyIyQ1FhcXKRof/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDplGpUp1Z1RURLsxAAAA5JOKMgPSn2XObd227Zfp4rynxNVvctfRbnV/MQa+Y0zUzlUQhkNiAPMYoo81qqfpNbHWttUJp5Uqpb20xGMh2vz4LfFBAayoyWr1r3XtFlCZYso3FMamhetsLqbESCp/K1/wBZC/luaxVmVUtRTR7dNUQRvCnhpR0BUW+gONiaSCnnheKULJDMpSSNuVZHFmU/MEG2M0H3qVyLre73ufomzbp+77e7uatOu19i3lfVq5viBBSCnggWOILHFEulEHAVVFgB9hi0f//Z";
var _line = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AIg//2Q%3D%3D";
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var _appVersion = '0.2.09';
var _name = "";
var _viso = 0;
var _groups = new Array();
var MWiframe = 0;
var MM2iframe = 0;
var _request = new Object();
var _appSettings = new Object();
var _appList = new Object();
_appSettings = {
	'app_10979261223_0':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_0\')'
	},
	'app_10979261223_1':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_1\')'
	},
	'app_10979261223_2':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_2\')'
	},
	'app_10979261223_3':{
		'name':'Mafia wars',
		'functionName': 'unsafeWindow._getMafiaGift(\'app_10979261223_2\')'
	},
	'app_102452128776_0':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_0\')'
	},
	'app_102452128776_1':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_1\')'
	},
	'app_102452128776_2':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_2\')'
	},

	'app_25287267406_0':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_0\')'
	}, //wampire
	
	'app_25287267406_1':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_0\')'
	}, //wampire

	'app_101539264719_0':{
		'name':'Café',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_0\')'
	}, //cafe
	
	'app_101539264719_1':{
		'name':'Café',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_1\')'
	}, //cafe

	'app_2389801228_0':{
		'name':'Poker',
		'functionName': 'unsafeWindow._getPokerGift(\'app_2389801228_0\')'
	}, //poker

	'app_46755028429_0':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_0\')'
	}, //ca
	'app_46755028429_1':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_1\')'
	}, //ca
	'app_46755028429_2':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_2\')'
	}, //ca
	'app_46755028429_3':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_3\')'
	}, //ca
	'app_46755028429_4':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_4\')'
	}, //ca
	'app_46755028429_5':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_5\')'
	}, //ca
	'app_21526880407_0':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_0\')'
	}, //ca
	'app_21526880407_1':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_1\')'
	}, //ca
	'app_21526880407_2':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_2\')'
	}, //ca
	'friend_connect':{
		'name':'Friend request',
		'functionName': 'unsafeWindow._acceptFriends(\'friend_connect\')'
	},
	'app_151044809337_0':{
		'name':'FishVille',
		'functionName': 'unsafeWindow._getFishVilleGift(\'app_151044809337_0\')'
	},
	'app_151044809337_1':{
		'name':'FishVille',
		'functionName': 'unsafeWindow._getFishVilleGift(\'app_151044809337_1\')'
	},
	'app_32375531555_0':{
		'name':'Street racing',
		'functionName': 'unsafeWindow._getStreetRacing(\'app_32375531555_0\')'
	},
	'app_32375531555_1':{
		'name':'Street racing',
		'functionName': 'unsafeWindow._getStreetRacing(\'app_32375531555_1\')'
	},
	'app_134920244184_0':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_0\')'
	},
	'app_134920244184_1':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_1\')'
	},
	'app_134920244184_2':{
		'name':'Happy aquarium',
		'functionName': 'unsafeWindow._getHappyAquarium(\'app_134920244184_2\')'
	},
	'app_118674881342_0':{
		'name':'War Machine',
		'functionName': 'unsafeWindow._getWarMachine(\'app_118674881342_0\')'
	},
	'app_118674881342_1':{
		'name':'War Machine',
		'functionName': 'unsafeWindow._getWarMachine(\'app_118674881342_1\')'
	}/*,
	'app_112462268161_0':{
		'name':'Mobsters 2',
		'functionName': 'unsafeWindow._acceptMobsters(\'app_112462268161_0\')'
	},
	'app_112462268161_1':{
		'name':'Mobsters 2',
		'functionName': 'unsafeWindow._acceptMobsters(\'app_112462268161_1\')'
	}
	*/
}
GM_addStyle(
'.log {position:absolute; width:400px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.logHeader:hover { cursor:move; }'+
'.logHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.logBody { height:200px; color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.app {position:absolute; width:400px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.appHeader:hover { cursor:move; }'+
'.appHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.appBody { height:200px; color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.foto {position:absolute; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.fotoHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.fotoBody { color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; padding:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'hr { padding:0; margin:0; border: 1px solid #333; border-top-color:#666;}'+
'.close { cursor:pointer; width:11px; height:11px; position:absolute;  top:5px; right:5px; background:url("'+_imgClose+'") }'+
'.close:hover { background:url("'+_imgCloseHover+'") }'+
'.settings {position:absolute; width:260px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.settingsHeader:hover { cursor:move; }'+
'.settingsHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.settingsBody {color:#FFF; padding:5px; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.settings input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.log input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.line {margin-bottom:3px}'+
'.linetext {padding-left:10px}'+
'.lineRight {margin:2px 5px 5px 0;}'+
'.button {background:#000; border:#666 1px solid; color:#666; cursor:pointer;}'+
'.button:hover {color:#FFF; border-color:#FFF;}'+
'.bad {color:#F00;}'+
'.good2 {color:#0f0;}'+
'#aaa img { cursor:pointer; }'+
'#aaa { width:650px; padding:3px; }'+
'#imgList div {margin:0px 0px 0 5px;}'+
'.good {color:#CCCCCC}'+
'.version { font-size:9px; }'+
'.icon {margin:0 2px;}'
);
if (GM_getValue("AAGfirstTime") == undefined) {
	GM_setValue("AAGfirstTime","1");
	_getGroups();
	_getMyID();
	alert("Congratulation, you start script first time!");
}
function _accept(_id){
	var _data = "__a=1&actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].id+"&params[app_id]="+_request[_id].appID+"&params[from_id]="+_request[_id].userID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].postForm+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].status+"&type="+_request[_id].type;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.facebook.com/ajax/reqs.php",
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:_data,
		onload: function(postResp){
			$('#'+_request[_id].status).html('Accepted');
			delete _request[_id];
		}
	});
}
function _cancel(_id){
	var _data = "__a=1&actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].id+"&params[app_id]="+_request[_id].appID+"&params[from_id]="+_request[_id].userID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].postForm+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].status+"&type="+_request[_id].type;
	if (_request[_id].appTitle == 'Friend request') _data = "__a=1&actions[reject]="+_request[_id].actionCancel+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].userID+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].status+"&type="+_request[_id].type + "&confirm=" + _request[_id].userID;
	GM_xmlhttpRequest({
		method: "POST", url: "http://www.facebook.com/ajax/reqs.php", headers:{'Content-type':'application/x-www-form-urlencoded'}, data:_data,
		onload: function(postResp){
			$('#'+_request[_id].status).html('Canceled');
			delete _request[_id];
		}	
	});
}
function _viewAll(){
	$('.PYMK_Reqs_Sidebar').eq(0).hide();
	$("<div id='aaa'></div>").insertBefore('.confirm_boxes:eq(0)');	
	$('#aaa').append('<div id="foto" class="foto"><div class="fotoHeader">Photo</div><hr><div id="foroIMG" class="fotoBody"></div></div>');
	$('#aaa').append('<div class="main"><img src="' + _imgSettings + '" title="Settings" class="settingsImg icon"><img height="24" width="1" src="'+ _line +'"><img src="' + _imgLog + '" title="Show log" class="appLog icon" ><img height="24" width="1" src="'+ _line +'"><img src="' + _imgLog + '" title="Show application log" class="showApp icon" ><img height="24" width="1" src="'+ _line +'"><img src="'+_acceptAll+'" title="Accept all application" class="_acceptAllApp icon"><img height="24" width="1" src="'+ _line +'"><img src="' + _ignoreAll + '" title="Ignore all application" class="_cancelAllApp icon"><img height="24" width="1" src="'+ _line +'"><img src="' + _imgUpdate + '" title="Refresh" class="_refresh icon"><img height="24" width="1" src="'+ _line +'"><img src="'+_donate+'" title="Donate" class="_donate icon"></div>');
	_addOnclickEvent();
	$('#aaa').append('<div class="settings"><div class="settingsHeader">Settings<div class="close closeSettings"></div></div><hr><div class="settingsBody"><div class="version" align="right">version: '+_appVersion+'</div><div class="line"> Add friend to group: <select id="userSelect"></select> <div class="line">Message: </div><div class="line"><textarea id="txtMessage" cols="37" value=""/></div> <div align="center" class="line"><input type="button" id="update" class="button" value="Check for update"/></div > <div class="line" align="center"><input type="button" id="save" class="button" value="Save"/></div></div></div>');
	$('#aaa').append('<div class="log"><div class="logHeader">Request log<div class="close closeLog"></div></div><hr><div id="imgList" class="logBody"></div><div class="lineRight" align="right"><input type="button" id="clear" class="button" value="Clear"/></div></div>');
	$('#aaa').append('<div class="app"><div class="appHeader">App log<div class="close appclose"></div></div><hr><div id="appList" class="appBody"></div></div>');
	var _html = '<table cellpadding="0" cellspacing="0">'
	$('.confirm_boxes').each(function(){
		if ($(this).find('span').eq(0).attr('id') != 'fbpage_fan_label') var _appName = $(this).find('span').eq(0).attr('id').replace(/_main/,'').replace(/_label/,'');
		else var _appName = $(this).find('span').eq(0).attr('id').replace(/_label/,'_confirm');
		
		var _appTitle = $(this).find('span').eq(0).html();
		$(this).attr('appBlock',_appName)
		if($(this).attr('id') != 'friend_connect' && $(this).attr('id') != 'friend_suggestion' && $(this).attr('id') != 'event_invite' && $(this).attr('id') != 'group_invite' && $(this).attr('id') != 'fbpage_fan_confirm'){
			_html += '<tr appMyBlock="'+_appName+'"><td><img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle + '</td>';
			$(this).find('form').each(function(){
				var tempArray = $(this).find('input[autocomplete="off"]');
				_request[$(this).find('.confirm').attr('id')] = {
					'appTitle': $(this).find('.info > a').eq(1).html(),
					'appName': _appName,
					'userName':$(this).find('.info > a').eq(0).html(), 
					'userID': tempArray.eq(4).val(),
					'appID': tempArray.eq(5).val(),
					'reqType': tempArray.eq(6).val(),
					'isInvite': tempArray.eq(7).val(),
					'link': $(this).find('.inputbutton').eq(0).attr('name'),
					
					'postForm': tempArray.eq(0).val(),
					'id': tempArray.eq(1).val(),
					'type': tempArray.eq(2).val(),
					'status': tempArray.eq(3).val(),
					'charset_test': $(this).find('input[name="charset_test"]').val(),
					'fb_dtsg': $(this).find('input[name="fb_dtsg"]').val(),
					'action': $(this).find('.inputbutton').eq(1).attr('name')
				};
				$(this).find('.inputbutton').eq(0).attr('accept',$(this).find('.confirm').attr('id')+'_accept');
				$(this).find('.inputbutton').eq(1).attr('cancel',$(this).find('.confirm').attr('id')+'_cancel');
				_appList[_appName] = {
					'name':$(this).find('.info > a').eq(1).html()
				}
			});
			_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand">'
			if(_appSettings[_appName]) {
				if(_appSettings[_appName].name == "Mafia wars"){
					if(MWiframe == 0){
						GM_xmlhttpRequest({ url: "http://apps.facebook.com/inthemafia/index.php", method:'get', 
							onload: function(resp){
								GM_xmlhttpRequest({ url: $('[name="mafiawars"]',resp.responseText).attr('src'), method:'get', data: $('[name="mafiawars"]',resp.responseText).attr('src'),
									onload: function(resp){
										for (var i in _appSettings){
											if(_appSettings[i].name == "Mafia wars"){
												_appSettings[i]["iframe"]=resp.finalUrl;
												$('<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+i+'">').insertAfter("[app='"+i.replace(/app_/,'confirm_')+"']")
												_addAcceptEvent();
											}
										}
									}
								});
							}
						});
						MWiframe = 1;
					}
				}
				else if(_appSettings[_appName].name == 'Mobsters 2'){
					if(MM2iframe == 0){
						GM_xmlhttpRequest({ url: "http://apps.facebook.com/mobsters-two/", method:'get', 
							onload: function(resp){
								var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
								var _resptxt = $('<div></div>').append(_resphtml.toString());
								GM_xmlhttpRequest({ url: $('#app112462268161_ypp_iframe',_resptxt).attr('src'), method:'get',
									onload: function(resp){
										for (var i in _appSettings){
											if(_appSettings[i].name == 'Mobsters 2'){
												_appSettings[i]["iframe"]=resp.finalUrl;
												$('<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+i+'">').insertAfter("[app='"+i.replace(/app_/,'confirm_')+"']")
												_addAcceptEvent();
											}
										}
									}
								});
							}
						});
						MM2iframe = 1;
					}
				}
				else _html += '<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+_appName+'">'
			}
			_html += '<img src="'+_ignoreAll+'" class="_cancelApp icon" app="'+_appName+'" title="Cancel"></td>'
			_html += '<td width="50"><img align="right" src="'+_imgIgnore+'" class="_ignoreApp icon" app="'+_appName+'" title="Cancel"></td>'
			_html += '</tr>'
		}

		else if($(this).attr('id') == 'friend_connect') {
			_html += '<tr appMyBlock="'+_appName+'"><td> <img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle + '</td>';
			$(this).find('.confirm').each(function(){
				var tempArray = $(this).find('form > input')
				_request[$(this).attr('id')] = {
					'appTitle': 'Friend request',
					'appName': _appName,
					'userName':$(this).find('.info > a').eq(0).html(),
					'photo': $(this).find('.image > a').eq(0).html(),					
					'userID': tempArray.eq(5).val(),
					'postForm': tempArray.eq(2).val(),
					'status': tempArray.eq(6).val(),
					'type': tempArray.eq(4).val(),
					'charset_test': tempArray.eq(0).val(),
					'fb_dtsg': tempArray.eq(1).val(),
					'action': $(this).find('.inputbutton').eq(0).val(),
					'actionCancel': $(this).find('.inputbutton:last').val(),
					'msg': $(this).find('.msg_content').html()
				};
			});

			_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand">'
			if(_appSettings[_appName]) _html += '<img src="'+_acceptAll+'" title="Accept" class="_acceptApp icon" app="'+_appName+'">'
			_html += '<img src="'+_ignoreAll+'" class="_cancelApp icon" app="'+_appName+'" title="Cancel">'
			_html += '</td></tr>'
		}
		else{
			_html += '<tr appMyBlock="'+_appName+'"><td><img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle + '</td>';
			_html += '<td><img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp icon" title="Expand"></td>'
			_html += '</tr>'
		}
	});
	
	$('#aaa').append(_html+'</table>');
	$('#appList').append('<table cellpadding="0" cellspacing="0">');
	for (var i in _appList){
		var _class = _appSettings[i]?'good':'bad';
		$('#appList').append('<tr class="' + _class + ' linetext"><td>' + i + '&nbsp;&nbsp;&nbsp;</td><td>' + _appList[i].name + '</td></tr>')
	}
	$('#appList').append('</table>');
}
function count(_str){
	var temp = 0;
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
		}
	}
	return temp;
}
function _hideAll(){
	$('.confirm_boxes').each(function(){
		$(this).hide();
		$('.appShowHide').each(function(){
			$(this).attr('src',_imgShow);
		});
	});
}
function _getGroups(){
	var _usrGroup = "";
	GM_xmlhttpRequest({ url:"http://www.facebook.com/friends/?ref=tn", method:'get',
		onload: function(resp){
			$('.UIFilterList_Item > a',resp.responseText).each(function(){
				var _param = $(this).attr('href').split('=')[1].split('_');
				if(_param[0] == 'flp') {
					_usrGroup += _param[1]+":"+$(this).find("div").eq(1).html()+","; //_usrGroup += _param[1]+":"+$(this).attr('title')+",";
				}
			});
			GM_setValue("usrGroups",_usrGroup);
			if (GM_getValue("setGroups") == undefined) { 
				GM_setValue("setGroups",_usrGroup.split(',')[0]);
			}
			_setSettings();			
		}
	});
}
function _getMyID(){
	var _link = $('[accesskey="2"]').attr("href");
	GM_xmlhttpRequest({ url:_link, method:'get',
		onload: function(resp){
			var _myID = $("#profileimage > a",resp.responseText).eq(0).attr("href").split("id=")[1];
			if(_myID){
				GM_setValue("myID",_myID);
			}
		}
	});
}
function _setSettings(){
	$('#userSelect').append('<option value="0">None..</option>')
	if (GM_getValue("usrGroups") != undefined){
		var _tmp = GM_getValue("usrGroups");
		_tmp = _tmp.split(',');
		for(var i=0; i < _tmp.length-1; i++){
			var _selected = "";
			if (GM_getValue("setGroups") == _tmp[i]) _selected = "selected"
			$('#userSelect').append('<option value="'+_tmp[i].split(":")[0]+'"' + _selected + '>'+_tmp[i].split(":")[1]+'</option>');
		}
	}
	if (GM_getValue("setMsg") != undefined) $('#txtMessage').val(GM_getValue("setMsg"));
}
function _getCafeGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCafeMain").html() == null) $("#imgList").append("<div id='giftCafeMain'>Accepting Cafe request...<div id='giftCafeBody' style='padding-left:10px'></div>Accepted <span id='giftCafeSum'>0</span> gift and/or <span id='neibCafeSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'accept_request.php').replace(/actions\[/,'').replace(/]/,'');
			if(url_array.action == "accept_gift") var _isGift = 1;
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('#app101539264719_gift_items > h1',resp.responseText).html()) {
							var _gift = /.*?this\s*(.*)\sfrom.*/.exec($('#app101539264719_gift_items > h1',resp.responseText).html());
							$("#giftCafeBody").append("<div>Accepted: <b>" + _gift[1] + "</b></div>");
							$("#giftCafeSum").html(parseInt($("#giftCafeSum").html(),10)+1);
							_accept(this.data);
						}
					}
					else{
						$("#giftCafeBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to neighbor.</div>");
						$("#neibCafeSum").html(parseInt($("#neibCafeSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}	
}
function _getStreetRacing(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftStreetRacingMain").html() == null) $("#imgList").append("<div id='giftStreetRacingMain'>Accepting Street Racing request...<div id='giftStreetRacingBody' style='padding-left:10px'></div>Accepted <span id='giftStreetRacingSum'>0</span> gift and/or <span id='neibStreetRacingSum'>0</span> crew.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
			var _isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.zy_track == "gift_request") {
				var _isGift = 1;
				_link = _link.replace(/track.php/,'giftAccept.php');
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						temp++;
						if(_isGift==1){
							if($('.c > p',_resptxt).html()) {
								$("#giftStreetRacingBody").append("<div>Accepted: <b>" + $('.c > p',resp.responseText).html() + "</b></div>");
								$("#giftStreetRacingSum").html(parseInt($("#giftStreetRacingSum").html(),10)+1);
								_accept(this.data);
							}
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(_isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}	
}
function _getHappyAquarium(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftHappyAquariumMain").html() == null) $("#imgList").append("<div id='giftHappyAquariumMain'>Accepting Happy Aquarium request...<div id='giftHappyAquariumBody' style='padding-left:10px'></div>Accepted <span id='giftHappyAquariumSum'>0</span> gift and/or <span id='neibHappyAquariumSum'>0</span> crew.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
			var _isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.target == "gift_page" || url_array.target == "send_credits") {
				var _isGift = 1;
				_link = _link.replace(/track.php/,'giftAccept.php');
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						if(_isGift==1){
							var _gift = /(You have accepted your)(.*)(!)/.exec($('#app134920244184_update_message',_resptxt).text()); 
							var _gift2 = /(Look around in your tank for your new)(.*)(!)/.exec($('#app134920244184_update_message',_resptxt).text()); 
							if(_gift || _gift2) {
								if(_gift) $("#giftHappyAquariumBody").append("<div>Accepted: <b>" + _gift[2] + "</b></div>");
								if(_gift2) $("#giftHappyAquariumBody").append("<div>Accepted: <b>" + _gift2[2] + "</b></div>");
								$("#giftHappyAquariumSum").html(parseInt($("#giftHappyAquariumSum").html(),10)+1);
								_accept(this.data);
							}
							else {
								$("#giftHappyAquariumBody").append("<div><b>Error: </b>" + $('#app134920244184_init_text',_resptxt).html() + "</div>");
								_accept(this.data);
							}
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(_isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}	
}
function _getWarMachine(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftWarMachine").html() == null) $("#imgList").append("<div id='giftWarMachine'>Accepting War Machine request...<div id='giftWarMachineBody' style='padding-left:10px'></div>Accepted <span id='giftWarMachineSum'>0</span> gift and/or <span id='neibWarMachineSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.acceptGift) {
				var _isGift = 1;
				_link = _link.replace(/index.php/,'acceptGift.php');
			}
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('.box > center > span',resp.responseText).html()) {
							var _giftAlready = /gift has already been accepted/.exec($('.box > center > span',resp.responseText).html());
							if (!_giftAlready){
								$("#giftWarMachineBody").append("<div>Accepted: <b>" + $('.box > center > span',resp.responseText).html() + "</b></div>");
								$("#giftWarMachineSum").html(parseInt($("#giftWarMachineSum").html(),10)+1);
								_accept(this.data);
							}
							else{
								$("#giftWarMachineBody").append("<div><b>Error: </b>" + $('.box > center > span',resp.responseText).html() + "</div>");
								_accept(this.data);
							}
						}
					}
					else{
						$("#giftWarMachineBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to alliance.</div>");
						$("#neibWarMachineSum").html(parseInt($("#neibWarMachineSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}	
}
function _getMafiaGift(_str){ //done
	var temp = 0;
	var all	= count(_str);
//	var iiii=0;
	if ($("#giftMain").html() == null) $("#imgList").append("<div id='giftMain'>Accepting Mafia Wars request...<div id='giftBody' style='padding-left:10px'></div>Accepted <span id='giftsum'>0</span> gift.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var isGift = 0;
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			if(url_array.next_params != undefined){
//				iiii++;
				isGift = 1;
				if(url_array.next_action == 'accept_gift'){
					eval('var _pa = ' + url_array.next_params);
					iframe_src = getArgs(_appSettings[_str].iframe);				
	//				var _param = '&from_user=' + _pa.from_user + '&time_id=' + _pa.time_id + '&loop=' + _pa.loop + '&xw_controller=' + url_array.next_controller + '&xw_action=' + url_array.next_action;
					var _param = 'xw_controller=' + url_array.next_controller + '&xw_action=' + url_array.next_action + '&xw_city=&skip_req_frame=1&sf_xw_user_id=' + iframe_src.sf_xw_user_id +'&sf_xw_sig='+ iframe_src.sf_xw_sig + '&from_user=' + _pa.from_user + '&time_id=' + _pa.time_id + '&loop=' + _pa.loop;
					var _link = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?'+_param;
					//var _link = "http://apps.facebook.com/inthemafia/index.php?xw_controller=interstitial&xw_action=accept_gift&from_user=" + _pa.from_user + "&time_id=" + _pa.time_id;
					GM_xmlhttpRequest({ url: _link, method:'get', data: i,
						onload: function(resp){
							temp++;
							var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
							var _resptxt = $('<div></div>').append(_resphtml.toString());
							_gift = $('.good', _resptxt).html();
							_error = $('.bad', _resptxt).parent().text();
							_error = /Error: (.*)[.]/.exec(_error);
							if (_gift){
								_accept(this.data);
								$("#giftBody").append("<div>Accept: <b>" + _gift + "</b></div>");
								$("#giftsum").html(parseInt($("#giftsum").html(),10)+1);
							}
							else if (_error){
								_accept(this.data);
								$("#giftBody").append("<div>"+_error[0].replace(/Error: /,"<b>Error:</b> ")+"</div>");
							}
							if (temp == all){
								$('#'+_str+'_loading').remove();
								//$('[appBlock="'+_str+'"]').hide();
								//$('[appMyBlock="'+_str+'"]').remove();
							}
						}
					});
				}
				else{
					temp++;
				}
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
		//if(iiii == 1) return false;
	}
}
function _getFarmVilleGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFarmVilleMain").html() == null) $("#imgList").append("<div id='giftFarmVilleMain'>Accepting Farm Ville request...<div id='giftFarmVilleBody' style='padding-left:10px'></div>Accepted <span id='giftFarmVilleSum'>0</span> gift and/or <span id='neibFarmVilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift == 1){
						if($('.giftConfirm_name > span',resp.responseText).html()) 
							$("#giftFarmVilleBody").append("<div> Accept: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFarmVilleSum").html(parseInt($("#giftFarmVilleSum").html(),10)+1);
							_accept(this.data);
					}
					else{
						$("#giftFarmVilleBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to neighbor.</div>");
						$("#neibFarmVilleSum").html(parseInt($("#neibFarmVilleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});			
		}
	}
}
function _getFishVilleGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFishVilleMain").html() == null) $("#imgList").append("<div id='giftFishVilleMain'>Accepting FishVille request...<div id='giftFishVilleBody' style='padding-left:10px'></div>Accepted <span id='giftFishVilleSum'>0</span> gift and/or <span id='neibFishVilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'').replace(/%7C/g,'|');
			var url_array = getArgs(_link);
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift == 1){
						if($('.giftConfirm_name > span',resp.responseText).html()) 
							$("#giftFishVilleBody").append("<div> Accept: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFishVilleSum").html(parseInt($("#giftFishVilleSum").html(),10)+1);
							_accept(this.data);
					}
					else{
						$("#giftFishVilleBody").append("<div>Added: <b>"+_request[this.data].userName+"</b> to neighbor.</div>");
						$("#neibFishVilleSum").html(parseInt($("#neibFishVilleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}
}
function _getPokerGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftPokerMain").html() == null) $("#imgList").append("<div id='giftPokerMain'>Accepting Poker request...<div id='giftPokerBody' style='padding-left:10px'></div>Accepted <span id='giftPokerSum'>0</span> gift and/or <span id='neibPokerSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/dmz_link_landing.php/,'invite_gift_claim.php').replace(/%7Bfg_id%7D/,'{fg_id}').replace(/actions\[/,'').replace(/]/,'');
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
					var _resptxt = $('<div></div>').append(_resphtml.toString());
					_gift = $('#app2389801228_acceptGifts_content > h1',_resptxt).eq(0).html();
					if(_gift) {
						$("#giftPokerBody").append("<div>" + _gift + "</div>");
						$("#giftPokerSum").html(parseInt($("#giftPokerSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}
}
function _getVampire(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftVampireMain").html() == null) $("#imgList").append("<div id='giftVampireMain'>Accepting Vampire request...<div id='giftVampireBody' style='padding-left:10px'></div>Accepted <span id='giftVampireSum'>0</span> gift and/or <span id='neibVampireSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'landing.php').replace(/actions\[/,'').replace(/]/,'');
			if (url_array.source == "recruit+gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						_gift = $('.abilityImg > img',resp.responseText).attr("title");
						if(_gift) {
							$("#giftVampireBody").append("<div>Accept: <b>" + _gift + "</b></div>");
							$("#giftVampireSum").html(parseInt($("#giftVampireSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _acceptMobsters(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	var iiii = 0
	if ($("#giftMobstersMain").html() == null) $("#imgList").append("<div id='giftMobstersMain'>Accepting Mobsters request...<div id='giftMobstersBody' style='padding-left:10px'></div>Accepted <span id='giftMobstersSum'>0</span> gift and/or <span id='neibMobstersSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
		iiii++
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			
			
			var _param = 'ref_id='+url_array.ref_id+'&send_timestamp='+url_array.send_timestamp+'&action=claimGift&from='+url_array.from
			var _link = _appSettings[_str].iframe + '&' + _param
			if (url_array.action == "claimGift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				alert(_link)
/*				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						alert(resp.responseText);
						$("#imgList").append('<div>' + resp.responseText + '</div>');
	//					var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
	//					var _resptxt = $('<div></div>').append(_resphtml.toString());
	//					_gift = $('.pd_dialog_content',_resptxt).html();
	//					alert(_gift);
				//		alert(_gift);
				//		alert(_resptxt.replace(/(.*)You successfully claimed your (.*)!(.*)/,'<b>$2</b>'));
	//					var aaa = /item you received/.exec(_resptxt.toString());
	//					alert(aaa);
//						alert(aaa[1]);
						if(_gift) {
							$("#giftVampireBody").append("<div>Accept: <b>" + _gift + "</b></div>");
							$("#giftVampireSum").html(parseInt($("#giftVampireSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});
				*/
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	if(iiii == 1) return false;
	}
}
function _getCage(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCAgeMain").html() == null) $("#imgList").append("<div id='giftCAgeMain'>Accepting Castle Age request...<div id='giftCAgeBody' style='padding-left:10px'></div>Accepted <span id='giftCAgeSum'>0</span> gift and/or <span id='neibCAgeSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = "http://apps.facebook.com/castle_age/army.php?act=acpt&uid="+_request[i].userID;
			if (_request[i].isInvite == "0") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _acceptG = /You have accepted the gift: (.*)/.exec(_resphtml);
						if (_acceptG){
							$("#giftCAgeBody").append("<div> Accept: <b>" + _acceptG[1] + "</b></div>");
							$("#giftCAgeSum").html(parseInt($("#giftCAgeSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _getYoville(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftYovilleMain").html() == null) $("#imgList").append("<div id='giftYovilleMain'>Accepting Yoville request...<div id='giftYovilleBody' style='padding-left:10px'></div>Accepted <span id='giftYovilleSum'>0</span> gift and/or <span id='neibYovilleSum'>0</span> neighbor.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			var url_array = getArgs(_link);
			if (url_array.src == "gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						_gift = $('.boddiv',_resptxt).find('h2').eq(0).html();
						if(_gift) {
							$("#giftYovilleBody").append("<div>Accept: <b>" + _gift + "</b></div>");
							$("#giftYovilleSum").html(parseInt($("#giftYovilleSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}
function _acceptFriends(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#FriendMain").html() == null) $("#imgList").append("<div id='FriendMain'>Accepting Friend request...<div id='FriendBody' style='padding-left:10px'></div>Accepted <span id='FriendSum'>0</span> friend.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _data="__a=1&actions[accept]=" + _request[i].action + "&charset_test=" + _request[i].charset_test + "&confirm=" + _request[i].userID + "&fb_dtsg=" + _request[i].fb_dtsg + "&id=" + _request[i].userID + "&post_form_id=" + _request[i].postForm + "&post_form_id_source=AsyncRequest&status_div_id=" + _request[i].status + "&type=" + _request[i].type + "&arrID=" + i + "&params[lists]=[\"" + GM_getValue("setGroups") + "\"]";
			GM_xmlhttpRequest({	method: "POST",	url: "http://www.facebook.com/ajax/reqs.php", headers:{'Content-type':'application/x-www-form-urlencoded'},	data:_data,
				onload: function(postResp){
					temp++;
					var _invite = /error_adding_friend/.exec(postResp.responseText.toString());
					var _friend = />([^<]*)/.exec(postResp.responseText.toString());
					var url_array = getArgs("www.facebook.com/home.php?"+this.data);
					if(!_invite){
						$("#FriendBody").append("<div> Accepted: <b><a class='addfriend good' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						$("#FriendSum").html(parseInt($("#FriendSum").html(),10)+1);
						$('#'+url_array.arrID).hide();
						_addOnclickEvent();
					}
					else {
						$("#acceptFriend").append("<div class='bad'> Somethink wrong with: <b><a class='addfriend bad' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						_addOnclickEvent();
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
					}
				}
			});
		}
	}
}
/*
function _AddAllFriend(_str){
	_visoSF = $('[nameG="'+_str+'_accept"]').length;
	$('[nameG="'+_str+'_accept"]').each(function(i){
		var _id = $(this).attr("idG");
		var _imgfoto = $(this).attr("imageG");
		GM_xmlhttpRequest({ url:"http://www.facebook.com/addfriend.php?id="+_id, method:'get',
			onload: function(resp){
				var _postFormID = $('#post_form_id',resp.responseText).val();
				var _myID = GM_getValue("myID");
				var _data='__a=1&fb_dtsg=ybLx2&flids[0]='+ GM_getValue("setGroups") +'&message=' + GM_getValue("setMsg") + '&post_form_id='+ _postFormID +'&post_form_id_source=AsyncRequest&profile_id='+ _id +'&pymk_page=&pymk_score=-1&pymk_source=&source=friend_suggestion&submit=1&user='+_myID;
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.facebook.com/ajax/profile/connect.php",
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data:_data,
					onload: function(postResp){
						_visoSF = _visoSF - 1;
						var _invite = /Request sent/.exec(postResp.responseText.toString());
						if(!_invite) {
							$("#acceptFriendSuggest").append("<div class='bad' style='padding-left:10px'> Somethink wrong with: <b><a class='addfriend' style='color:#FF0000;' href='http://www.facebook.com/profile.php?id="+ _id +"' img='"+_imgfoto+"' target='_blank'> this person </a></b>.</div>");
							_addOnclickEvent();
						}
						else {
							$("#acceptFriendSuggest").append("<div style='padding-left:10px'> Invited: <b><a class='addfriend' style='color:#CCCCCC;' href='http://www.facebook.com/profile.php?id="+ _id +"' img='"+_imgfoto+"' target='_blank'> this person</a></b>.</div>");
							_addOnclickEvent();
						}
						if(_visoSF == 0) {
							$("#acceptFriendSuggest").append("<div>All invite send.</div>");
							$('[nameC="'+_str+'_box"]').hide();
							$('.'+_str+'_myBox').remove();		
						}
					}
				});
			}
		});	
	});	
}
*/
$(document).ready(function(){
//	alert(ScriptUpdater.get())
	var _link = document.location.href;
	if(_link.indexOf("/reqs.php") != -1){
		_getGroups();
		_viewAll();
		_hideAll();
		$('._cancelApp').click(function(){
			var _str = $(this).attr('app');
			var temp = 0;
			var all = count(_str);
			for (var i in _request){
				if(_request[i].appName == _str) {
					temp++;
					_cancel(i);
					if(all == temp){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
						$("#imgList").append("<div> Canceled: <b>" + _request[i].appTitle + "</b> request.</div>");
					}
				}
			}
		});
		$('._cancelAllApp').click(function(){
			if(confirm("Are you sure want cancel all aplication?")){
				$('._cancelApp').each(function(){
					$('[nameG="'+$(this).attr('app')+'_cancel"]').each(function(){
						_clickCancel($(this));
					});
					$('[nameC="'+$(this).attr('app')+'_box"]').hide();
					$('.'+$(this).attr('app')+'_myBox').remove();
					$("#imgList").append("<div> Canceled: <b>" + $(this).attr('app').replace(/_/g," ") + "</b> request.</div>");	
				});
			}
		});
		$('._acceptApp').click(function(){
			$('<img src="'+_loading+'" id="'+$(this).attr('app')+'_loading">').insertAfter($(this));
			$(this).remove();
			eval(_appSettings[$(this).attr('app')].functionName);
		});
		$('._acceptAllApp').click(function(){
			$('._acceptApp').each(function(){
				$('<img src="'+_loading+'">').insertAfter($(this));
				$(this).remove();
				eval(_appSettings[$(this).attr('app')].functionName);
			});
		});
		$('._hideApp').click(function(){ //done
			if ($(this).attr('src') == _imgHide) {
				$(this).attr('src',_imgShow);
				$(this).attr('title','Expand');
				$('div[id="'+$(this).attr('app')+'"]').hide();
			}
			else{
				$(this).attr('src',_imgHide);
				$(this).attr('title','Collapse');
				$('div[id="'+$(this).attr('app')+'"]').show();
			}
		});
		$('.closeLog').click(function(){
			$('.log').css('display','none')
		});
		$('.appclose').click(function(){
			$('.app').css('display','none')
		});
		$('._donate').click(function(){
			window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=D3RVWU3UQQP42&lc=LT&item_name=Facebook%20request%20manager&item_number=20091209FBR&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted')
		});
		$('.appLog').click(function(){
			$('.log').css('display','block')
		});
		$('.showApp').click(function(){
			$('.app').css('display','block')
		});
		$('.closeSettings').click(function(){
			$('.settings').css('display','none');
		});
		$('.settingsImg').click(function(){
			$('.settings').css('display','block');
		});
		$('._ignoreApp').click(function(){
			if(confirm("Are you sure want block this application?")){
				$('<img src="'+_loading+'">').insertAfter($(this));
				$(this).remove();
				var _str = $(this).attr('app');
				for (var i in _request){
					if(_request[i].appName == _str){
						var _data = "__a=1&__d=1&confirm=1&fb_dtsg="+ _request[i].fb_dtsg +"&post_form_id="+ _request[i].postForm +"&post_form_id_source=AsyncRequest";
						var _link = "http://www.facebook.com/ajax/block_app.php?app_id="+_request[i].appID+"&type_index=0";
//						alert(_data + "____" + _link);
						GM_xmlhttpRequest({
							method: "POST",
							url: _link,
							headers:{'Content-type':'application/x-www-form-urlencoded'},
							data:_data,
							onload: function(postResp){
								eval('var arr='+postResp.responseText.replace(/for \(;;\);/,''));
								$('[appBlock="'+_str+'"]').hide();
								$('[appMyBlock="'+_str+'"]').remove();
								$("#imgList").append("<div> Block: <b>"+ arr["payload"].body +"</b> </div>");
							}
						});
						return false;
					}
				}
			}
		});
		$('#save').click(function(){
			if ($('#userSelect option:selected').attr("value") != "0") GM_setValue("setGroups",$('#userSelect option:selected').attr("value")+":"+$('#userSelect option:selected').html());
			else GM_setValue("setGroups",'');
			GM_setValue("setMsg",$('#txtMessage').val());
			$('.settings').css('display','none');
		});
		$('#clear').click(function(){
			$('#imgList').html('');
		});
		$('._refresh').click(function(){
			document.location.href = "http://www.facebook.com/reqs.php";
		});
		$('.logHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.log').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('.appHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.app').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('.settingsHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.settings').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		$('#update').click(function(){
			if($("#updating").html() == null) $('<div id="updating" class="line">Checkin for update..<img src="' + _imgLoadingRed + '"><div>').insertBefore($(this));
			else $("#updating").html('<div id="updating">Checkin for update..<img src="' + _imgLoadingRed + '"><div>');
			GM_xmlhttpRequest({ url:"http://userscripts.org/scripts/review/59960", method:'get',
				onload: function(resp){
					var _version = /@version([^&#]*)/.exec(resp.responseText.toString());
					_aaa = _version[1].replace(/	/g,"");
					$('#upLoading').remove();
					if(_appVersion != _aaa){
						$('#updating').html('New version (' + _aaa + ') is available click <a href="http://userscripts.org/scripts/source/59960.user.js">here</a> to upgrade.');
					}
					else{
						$('#updating').html('You have latest version.');
					}
				}
			});
		});
	}
});
function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}
function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}
function _addOnclickEvent(){
	jQuery(function() {
		$('.addfriend').mouseover(function(e){
			$("#foto").css({
				"display":"block",
				"z-index":99999,
				"top":e.pageY,
				"left":(e.pageX+15)
			});
			$("#foroIMG").html('<div>'+_request[$(this).attr('ursID')].photo+'</div>');
			if(_request[$(this).attr('ursID')].msg)$("#foroIMG").append('<div><b>Message:</b>'+_request[$(this).attr('ursID')].msg+'</div>')
		});
		$('.addfriend').mousemove(function(e){
			$("#foto").css({
				"top":e.pageY,
				"left":(e.pageX+15)
			});
		});
		$('.addfriend').mouseout(function(e){
			$("#foto").css("display","none");
		});
	});
}
function _addAcceptEvent(){
	$('._acceptApp').click(function(){
		$('<img src="'+_loading+'" id="'+$(this).attr('app')+'_loading">').insertAfter($(this));
		$(this).remove();
		eval(_appSettings[$(this).attr('app')].functionName);
	});
	
	$('._acceptAllApp').click(function(){
		$('._acceptApp').each(function(){
			$('<img src="'+_loading+'">').insertAfter($(this));
			$(this).remove();
			eval(_appSettings[$(this).attr('app')].functionName);
		});
	});
}
function getArgs(url) {
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1].replace(/&amp;/g,'&');
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}