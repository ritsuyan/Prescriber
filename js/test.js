/**
 * Created by Administrator on 2016/8/5.
 */

var div = document.getElementById('div')

div.ontouchstart = function (e) {
     var touch = e.touchs[0];
     var x  = touch.clientX;
     var y  = touch.clientY;
}

div.ontouchmove = function (e) {
    e.preventDefault()
}
