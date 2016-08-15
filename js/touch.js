/**
 * Created by Administrator on 2016/8/12.
 */

//构造函数
function Slider(opts){
    //构造函数需要的参数
    this.wrap = opts.dom;
    this.dire = opts.direction;
    this.addtion = opts.addtion;
    this.bindDOM();
}






//第三步 -- 绑定 DOM 事件
Slider.prototype.bindDOM = function(){
    var self = this;


    //手指按下的处理事件
    var startHandler = function(evt){


        //记录手指按下的坐标
        self.startX = evt.touches[0].pageX;
        self.startY = evt.touches[0].pageY;
        console.log("start X"
         + self.startX)


    };

    //手指移动的处理事件
    var moveHandler = function(evt){
        //兼容chrome android，阻止浏览器默认行为
        evt.preventDefault();

        var moveP = {
             x : evt.targetTouches[0].pageX,
             y : evt.targetTouches[0].pageY
        }

        console.log(self.dire)
        if(self.dire === 'horizon'){
            if(Math.abs(moveP.x-self.startX) > Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetX = moveP.x - self.startX;
                if(self.offsetX < 0){
                    //  change transform style with offsetX
                    //计算手指的偏移量

                    console.log('curr offset X ' + self.offsetX)
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + self.offsetX + 'px, 0, 0)');
                }
            }
        } else if(self.dire === 'vertical'){
            if(Math.abs(moveP.x-self.startX) < Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetY = moveP.y - self.startY;
                if(self.offsetY < 0){
                    //  change transform style with offsetX
                    //计算手指的偏移量

                    console.log('curr offset Y ' + self.offsetY)
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translateY(' + self.offsetY + "px" )
                    self.addtion.style.webkitTransform = ('translateY(' + self.offsetY + "px" )

                }
            }
        }


    };

    //手指抬起的处理事件
    var endHandler = function(evt){
        evt.preventDefault();

        //边界就翻页值
        var boundary = scaleW/6;

        //手指抬起的时间值
        var endTime = new Date() * 1;

        //所有列表项
        var lis = outer.getElementsByTagName('li');

        //当手指移动时间超过300ms 的时候，按位移算
        if(endTime - self.startTime > 3000){
            if(self.offsetX >= boundary){
                self.goIndex('-1');
            }else if(self.offsetX < 0 && self.offsetX < -boundary){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }else{
            //优化
            //快速移动也能使得翻页
            if(self.offsetX > 50){
                self.goIndex('-1');
            }else if(self.offsetX < -50){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }

    };

    //绑定事件
    self.wrap.addEventListener('touchstart', startHandler);
    self.wrap.addEventListener('touchmove', moveHandler);
 //   outer.addEventListener('touchend', endHandler);
};

//初始化Slider 实例
new Slider({
    dom : document.getElementById('swipe_table'),
    direction : 'horizon'
});

new Slider({
    dom : document.getElementById('fixed-body'),
    direction : 'vertical',
    addtion : document.getElementById('swiper-body')
});

new Slider({
    dom : document.getElementById('swiper-body'),
    direction : 'vertical',
    addtion : document.getElementById('fixed-body')
});



/*window.onscroll = function (evt) {
     var ab_height = document.getElementsByTagName('h4')[0].offsetHeight;
     console.log(ab_height)

     if(window.scrollY >= ab_height){
          $('.table-head').css('position','fixed')
     } else{
         $('.table-head').css('position','inherit')
     }
}
*/