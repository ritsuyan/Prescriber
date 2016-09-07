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
    var moveP = {};
    var curr_len;

    //ÊÖÖ¸°´ÏÂµÄ´¦ÀíÊÂ¼þ
    var startHandler = function(evt){

         curr_len = document.getElementById('swipe_table').style.webkitTransform;


   /*    if(Number(curr_len.substring(12,16)) < -400){
          self.offsetX = -495;
       }
  */

        if (curr_len.indexOf('-') < 0 ||
          curr_len == 'translate3d(0,0,0)'
       ) {
                          self.wrap.style.webkitTransition = ('-webkit-transform 0s ease-out');
                    self.wrap.style.webkitTransform = 'translate3d(0px,0px,0px)';
                  //  self.addtion.style.webkitTransform = ('translate3d(0px,0,0)');
                    };    

       if( curr_len.substring(13,16) > 548){
          curr_len = 'translate3d(-545px,0,0)';
          console.log('000')
       }             
     
        self.startX = evt.touches[0].pageX;
        self.startY = evt.touches[0].pageY;
        console.log("this is start point"
         + self.startX)


    };

        //ÊÖÖ¸ÒÆ¶¯µÄ´¦ÀíÊÂ¼þ
    var moveHandler = function(evt){
        //¼æÈÝchrome android£¬×èÖ¹ä¯ÀÀÆ÷Ä¬ÈÏÐÐÎª
        evt.preventDefault();

        moveP.x = evt.touches[0].pageX;
        moveP.y = evt.touches[0].pageY; 

        console.log('this is end point' + moveP.x)

     

        if(self.dire === 'horizon'){
            if(Math.abs(moveP.x-self.startX) > Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetX = moveP.x - self.startX;

                console.log( self.offsetX )
                
        //        if( Math.abs(self.offsetX) > 319 ) return true;
                

                if( Math.abs(self.offsetX) > 319 && self.offsetX < 0){ 
                    self.offsetX = -545;
                    console.log('^^^')
                }
                if( Math.abs(self.offsetX) > 319 && self.offsetX > 0){ 
                    self.offsetX = 545;
                }

                if(self.offsetX < 0){
                    //  change transform style with offsetX
                    console.log('enter right 2 left')

      //              console.log('curr offset X ' + self.offsetX)
                    self.wrap.style.webkitTransition = ('-webkit-transform 1s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + self.offsetX * 5 + 'px, 0, 0)');
                } else{
                    console.log( ' enter left 2 right '+ self.offsetX)
                    console.log(self.wrap.style.webkitTransform)
                 
                    self.wrap.style.webkitTransition = ('-webkit-transform 1s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + (self.offsetX * .7) + 'px, 0, 0)');


                }
            }

            console.log()
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


    //ÊÖÖ¸ÒÆ¶¯µÄ´¦ÀíÊÂ¼þ
    var endHandler = function(evt){
        //¼æÈÝchrome android£¬×èÖ¹ä¯ÀÀÆ÷Ä¬ÈÏÐÐÎª
        evt.preventDefault();

        moveP.x = evt.changedTouches[0].clientX;
        moveP.y = evt.changedTouches[0].clientY;



        console.log('this is end point' + moveP.x)

      //  console.log(self.dire)
  /*    if( curr_len.substring(13,16) > 548){
          curr_len = 'translate3d(-545px,0,0)';
          console.log('000')
       }  
    */

        if(self.dire === 'horizon'){
            if(Math.abs(moveP.x-self.startX) > Math.abs(moveP.y - self.startY)){
                // move horizontal
                self.offsetX = moveP.x - self.startX;
                console.log('original' + self.offsetX )
                console.log(self.wrap.style.webkitTransform)
                console.log( self.offsetX )

                if(self.offsetX < 0){

                console.log( document.getElementById('swipe_table').style.webkitTransform)
                    var rr =  document.getElementById('swipe_table').style.webkitTransform;
                    if( rr.substring(rr.indexOf('-')+1,rr.indexOf('p') ) >= 100){
                        console.log(999)
                        document.getElementById('swipe_table').className += ' change_tran';
                    }
                    if( self.offsetX <  -50){
                        self.offsetX = -50;
                    }
                    //  change transform style with offsetX
                    console.log('enter right 2 left')

      //              console.log('curr offset X ' + self.offsetX)
                    self.wrap.style.webkitTransition = ('-webkit-transform 1s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + self.offsetX * 5 + 'px, 0, 0)');
                } else{
                    document.getElementById('swipe_table').className = "";
                    console.log( ' enter left 2 right '+ self.offsetX)
                    console.log(self.wrap.style.webkitTransform)

                    if(self.wrap.style.webkitTransform === 'translate3d(0px, 0px, 0px)'){
                        return true
                  //      document.getElementById('swipe_table').removeEventListener('touchend',endHandler)
                    }
                    console.log(parseInt(self.wrap.style.webkitTransform.substring(13,20)))
                    if(parseInt(self.wrap.style.webkitTransform.substring(13,20)) > 150){
                        console.log('###')
                        document.getElementById('swipe_table').className += ' right_tran';
                    }
                    if( self.offsetX <  80){
                        self.offsetX = 30;
                    }

                    self.wrap.style.webkitTransition = ('-webkit-transform 1s ease-out');
                    self.wrap.style.webkitTransform = ('translate3d(' + (self.offsetX * .4) + 'px, 0, 0)');


                }
            }

            console.log()
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



    //°ó¶¨ÊÂ¼þ
    self.wrap.addEventListener('touchstart', startHandler);
   if(self.dire !== 'horizon'){ 
     self.wrap.addEventListener('touchmove', moveHandler);
  }
     if( self.dire === 'horizon'){
    self.wrap.addEventListener('touchend', endHandler);
}
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


function cul_dis(opts) {

    /*
        @1 slide one td distance
        @2 

    */

    var dis = opts.dis;
    var dom = opts.dom;
    var width =  '867' + px;
    var per = dis/width;

    if(per < 0.5){
        per = 0.5; 
    } else{}


}