/**
 * Created by chen on 2016/3/9.
 */
var main = document.querySelector("#main");
var oLis = document.querySelector("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;

var desW = 640;
var desH = 960;

if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oL.addEventListener("touchstart", start, false);
    oL.addEventListener("touchmove", move, false);
    oL.addEventListener("touchend", end, false);
});
function start(e) {
    this.touchStart = e.changedTouches[0].pageY;
}
function move(e) {
    var touchMove = e.changedTouches[0].pageY;
    var pos = touchMove - this.touchStart;
    var index = this.index;
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
    });
    if (pos > 0) {//向下
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
    } else if (pos < 0) {//向上
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index);
    }
    var duration=-480+pos;
    oLis[this.prevsIndex].style.transform="translate(0,"+duration+")";
    oLis[this.prevsIndex].className = "zIndex";
}
function end(e) {
}
