
var $ = function(element) {
	if (typeof element == 'string') element = document.getElementById(element);
	return element;
};
var setNoticeList = function(container,row,delay,speed) {
	if (typeof container == 'string') container = $(container);
	if( typeof container == 'undefined' || !container ) return;
	if( typeof row == 'undefined' || row == null ) row = 2;
	if( typeof delay == 'undefined' || delay == null ) delay = 10000;
	if( typeof speed == 'undefined' || speed == null ) speed = 30;
	var ps = container.getElementsByTagName('li');
	var length = ps.length;
	var cheight = length > 0 ? ps[0].offsetHeight : 0;
	var movetime = null;
	var time = null;
	var pause = false;
	container.onmouseover=function(){pause=true;};
	container.onmouseout=function(){pause=false;};
	var show = function(delay,d) {
		clearInterval(movetime);
		clearTimeout(time);
		var top = 0;
		var start = function() {
			movetime = setInterval(move, speed);
		};
		var setNode = function() {
			var plist = container.getElementsByTagName('li');
			var i = 0;
			var t = container.scrollTop;
			while( t >= cheight ) {
				t -= cheight;
				container.appendChild(plist[i++]);
			}
			container.scrollTop = 0;
		};
		var move = function() {
			if (pause) return;
			var plist = container.getElementsByTagName('li');
			container.scrollTop += 2;
			var mod = container.scrollTop % cheight;
			if( mod ==  0 || mod ==  1 || mod ==  -1 ) {
				clearInterval(movetime);
				container.appendChild(plist[0]);
				container.scrollTop = 0;
				time = setTimeout(start, delay);
			}
		};
		setNode();
		start();
	};
	show(delay);
};
window.onload = function() {
	setNoticeList('list',1,1000,50);
};