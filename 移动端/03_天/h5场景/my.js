/**
 * Created by chen on 2016/3/13.
 */
function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var progress = getEle(".progress");
var loading = getEle("#loading");
var loadBox = getEle(".loadBox");
var bell = getEle("#bell");
var say = getEle("#say");
var music = getEle("#music");

var winW = document.documentElement.clientWidth;//获取的是设备的宽
var winH = document.documentElement.clientHeight;//设备的高
var desW = 640;
var desH = 1008;


if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
num = 0;
fnLoad();
function fnLoad() {
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();
        oImg.src = "images/" + arr[num];
        oImg.onload = function () {
            num++;
            progress.style.width = num / arr.length * 100 + "%";
            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    main.removeChild(loading);
                    loading = null;

                }, false);
            }
        }
    }
}
var fnPhone = {
    init: function () {
        bell.play();
        this.phone = getEle("#phone");
        this.speaker = getEle(".speaker");
        //在移动端不会直接用click事件,也不会用touchstart来模拟click事件,用tap组件来表示click(click会有300ms的延迟)
        this.phone.addEventListener("click", this.touch, false);
    },
    touch: function (e) {
        var target = e.target;
        if (target.className == "listenTouch") {//接听电话
            bell.pause();
            say.play();
            target.parentNode.style.display = "none";//answer这个div隐藏
            fnPhone.speaker.style.webkitTransform = "translate(0,0)";//从下面回到一开始的位置
        } else if (target.className == "hangUp") {//挂断
            say.pause();
            fnPhone.closePhone()
        }
    },
    closePhone: function () {//把phone这个div移到最下面,然后删除
        var that = this;
        this.phone.style.webkitTransform = "translate(0," + desH + "px)";
        window.setTimeout(function () {
            //console.log(this.phone)
            main.removeChild(that.phone);
            fnMessage();
        }, 1000)

    }
};
fnPhone.init();//初始化方法

function fnMessage() {
    music.play();
    var message = getEle("#message");
    var oUl = getEle("#message>ul");
    var oLis = document.querySelectorAll("#message>ul>li");
    var num = 0;
    var h = null;
    var timer = window.setInterval(function () {
        if (num == oLis.length) {
            window.clearInterval(timer);
            window.setTimeout(function () {
                main.removeChild(message);
                fnCube();
            }, 1000);

            return;
        }
        var oLi = oLis[num];
        oLi.style.opacity = 1;
        oLi.style.webkitTransform = "translate(0,0)";//回到没有偏移的位置  就是原始的位置


        h += oLi.offsetHeight - 30;//

        if (num >= 3) {
            oUl.style.webkitTransform = "translate(0,-" + h + "px)";
        }
        num++;
    }, 1000)
}
function fnCube() {
    var cubeBox = getEle("#cubeBox");
    cubeBox.style.webkitTransform = "scale(0.7) rotateY(-45deg) rotateX(135deg)";
    //rotateY()的角度是X轴move 的坐标和start的坐标之差  是水平方向滑动的距离
    //rotateX是垂直方向滑动的距离
    var startX = -45;//x轴的坐标差
    var startY = 135;//y轴的坐标差
    var x = 0;//水平滑动的距离
    var y = 0;//垂直滑动的距离
    document.addEventListener("touchstart", start, false);
    document.addEventListener("touchmove", move, false);
    document.addEventListener("touchend", end, false);
    function start(e) {
        var touch = e.changedTouches[0];
        this.startTouch = {x: touch.pageX, y: touch.pageY}
    }

    function move(e) {
        e.preventDefault();
        this.flag = true;
        var touch = e.changedTouches[0];
        var moveTouch = {x: touch.pageX, y: touch.pageY};
        x = moveTouch.x - this.startTouch.x;
        y = moveTouch.y - this.startTouch.y;
        cubeBox.style.webkitTransform = "scale(0.7) rotateY(" + (startX + x) + "deg) rotateX(" + (startY + y) + "deg)"
    }

    function end(e) {
        if (this.flag) {
            startX += x;
            startY += y;
        }
    }
}
//fnCube();