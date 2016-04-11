/**
 * Created by chen on 2016/3/12.
 */
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;

var desW = 640;
var desH = 960;


//设备的宽 / 设备的高 < 设计稿宽 / 设计稿高 - > 把设计稿的高缩放到设备的高
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
function start(e) {
    this.startTouch = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag=true;
    var moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.startTouch;
    var index = this.index;
    //console.log(pos)
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {
            arguments[0].style.display = "none";
            this.firstElementChild.id="";
        }
    });
    if (pos > 0) {//向下
//获得上一张的索引，并且做边界判断，当前这一张是第一张，谁给你一张就是第一张
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH + pos;


    } else if (pos < 0) {//向上
        this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + pos;

    }
    oLis[this.prevSIndex].style.display = "block";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";

    oLis[this.prevSIndex].className = "zIndex";
    oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(pos) / winH * 1 / 2) + ") translate(0," + pos + "px)";
}

function end(e) {
    if(this.flag){
        oLis[this.prevSIndex].style.webkitTransform="translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition="1s";
        //webkitTransition结束时会触发webkitTransitionEnd这个事件
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }


}


















