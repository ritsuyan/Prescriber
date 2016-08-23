/**
 * Created by Administrator on 2016/8/12.
 */

//���캯��
function Slider(opts){
    //���캯����Ҫ�Ĳ���
    this.wrap = opts.dom;
    this.dire = opts.direction;
    this.addtion = opts.addtion;
    this.bindDOM();
}






//������ -- �� DOM �¼�
Slider.prototype.bindDOM = function(){
    var self = this;


    //��ָ���µĴ����¼�
    var startHandler = function(evt){


        //��¼��ָ���µ�����
        self.startX = evt.touches[0].pageX;
        self.startY = evt.touches[0].pageY;
        console.log("start X"
         + self.startX)


    };

    //��ָ�ƶ��Ĵ����¼�
    var moveHandler = function(evt){
        //����chrome android����ֹ�����Ĭ����Ϊ
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
                if(self.offsetX < 0){
                    //  change transform style with offsetX
                    //������ָ��ƫ����

      //              console.log('curr offset X ' + self.offsetX)
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
                    //������ָ��ƫ����

        //            console.log('curr offset Y ' + self.offsetY)
                    self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(0px,'+ self.offsetY +'px,0)');
                    self.addtion.style.webkitTransform = ('translate3d(0px,'+ self.offsetY +'px,0)');

                }
            }
        }


    };

    //��ָ̧��Ĵ����¼�
    var endHandler = function(evt){
        evt.preventDefault();

        //�߽�ͷ�ҳֵ
        var boundary = scaleW/6;

        //��ָ̧���ʱ��ֵ
        var endTime = new Date() * 1;

        //�����б���
        var lis = outer.getElementsByTagName('li');

        //����ָ�ƶ�ʱ�䳬��300ms ��ʱ�򣬰�λ����
        if(endTime - self.startTime > 3000){
            if(self.offsetX >= boundary){
                self.goIndex('-1');
            }else if(self.offsetX < 0 && self.offsetX < -boundary){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }else{
            //�Ż�
            //�����ƶ�Ҳ��ʹ�÷�ҳ
            if(self.offsetX > 50){
                self.goIndex('-1');
            }else if(self.offsetX < -50){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        }

    };

    //���¼�
    self.wrap.addEventListener('touchstart', startHandler);
    self.wrap.addEventListener('touchmove', moveHandler);
 //   outer.addEventListener('touchend', endHandler);
};

//��ʼ��Slider ʵ��
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