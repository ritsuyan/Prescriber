/**
 * Created by Administrator on 2016/8/12.
 */

//¹¹Ôìº¯Êý
function Slider(opts){
    //¹¹Ôìº¯ÊýÐèÒªµÄ²ÎÊý
    this.wrap = opts.dom;
    this.dire = opts.direction;
    this.addtion = opts.addtion;
    this.bindDOM();
}






//µÚÈý²½ -- °ó¶¨ DOM ÊÂ¼þ
Slider.prototype.bindDOM = function(){
    var self = this;


    //ÊÖÖ¸°´ÏÂµÄ´¦ÀíÊÂ¼þ
    var startHandler = function(evt){


        //¼ÇÂ¼ÊÖÖ¸°´ÏÂµÄ×ø±ê
        self.startX = evt.touches[0].pageX;
        self.startY = evt.touches[0].pageY;
        console.log("start X"
         + self.startX)


    };

    //ÊÖÖ¸ÒÆ¶¯µÄ´¦ÀíÊÂ¼þ
    var moveHandler = function(evt){
        //¼æÈÝchrome android£¬×èÖ¹ä¯ÀÀÆ÷Ä¬ÈÏÐÐÎª
        evt.preventDefault();

        var moveP = {
             x : evt.targetTouches[0].pageX,
             y : evt.targetTouches[0].pageY
        }

      //  console.log(self.dire)
        if(self.dire === 'horizon'){
            if(Math.abs(moveP.x-self.startX) > Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetX = moveP.x - self.startX;
                if(self.offsetX > 550){self.offsetX = 300;}
                if(self.offsetX < 0){
                    //  change transform style with offsetX
                    console.log('enter right 2 left')

      //              console.log('curr offset X ' + self.offsetX)
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + self.offsetX + 'px, 0, 0)');
                } else{
                    console.log( ' enter left 2 right '+ self.offsetX)

                    if (self.wrap.style.webkitTransform >= 0) {
                          self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(0px,0,0)');
                  //  self.addtion.style.webkitTransform = ('translate3d(0px,0,0)');
                    };
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + (self.offsetX - 500)+ 'px, 0, 0)');


                }
            }
        } else if(self.dire === 'vertical'){
            if(Math.abs(moveP.x-self.startX) < Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetY = moveP.y - self.startY;
                if(self.offsetY < 0){
                    //  change transform style with offsetX
                    //¼ÆËãÊÖÖ¸µÄÆ«ÒÆÁ¿

        //            console.log('curr offset Y ' + self.offsetY)
                    console.log('down to up')
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(0px,'+ self.offsetY +'px,0)');
                    self.addtion.style.webkitTransform = ('translate3d(0px,'+ self.offsetY +'px,0)');

                }else{
                    console.log('up to down')

                    var fixed_body = document.getElementById('fixed-body');     
                    if(fixed_body.style.webkitTransform.indexOf('-') > 0){
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(0px,0,0)');
                    self.addtion.style.webkitTransform = ('translate3d(0px,0,0)');
                    } 
                }
            } 
        }

        document.getElementById('swipe_table_title').style.position = 'fixed !important';
        document.getElementById('fixed_table_title').style.position = 'fixed !important';
    };

    //ÊÖÖ¸Ì§ÆðµÄ´¦ÀíÊÂ¼þ
    var endHandler = function(evt){
        evt.preventDefault();

        //±ß½ç¾Í·­Ò³Öµ
        var boundary = scaleW/6;

        //ÊÖÖ¸Ì§ÆðµÄÊ±¼äÖµ
        var endTime = new Date() * 1;

        //ËùÓÐÁÐ±íÏî
        var lis = outer.getElementsByTagName('li');

        //µ±ÊÖÖ¸ÒÆ¶¯Ê±¼ä³¬¹ý300ms µÄÊ±ºò£¬°´Î»ÒÆËã
        if(endTime - self.startTime > 3000){
            if(self.offsetX >= boundary){
                self.goIndex('-1');
            }else if(self.offsetX < 0 && self.offsetX < -boundary){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }else{
            //ÓÅ»¯
            //¿ìËÙÒÆ¶¯Ò²ÄÜÊ¹µÃ·­Ò³
            if(self.offsetX > 50){
                self.goIndex('-1');
            }else if(self.offsetX < -50){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }

    };

    //°ó¶¨ÊÂ¼þ
    self.wrap.addEventListener('touchstart', startHandler);
    self.wrap.addEventListener('touchmove', moveHandler);
 //   outer.addEventListener('touchend', endHandler);
};

//³õÊ¼»¯Slider ÊµÀý
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



