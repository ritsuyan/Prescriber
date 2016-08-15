/**
 * Created by Administrator on 2016/8/11.
 */

/*
*     todo 1  find the attr index
*     todo 2  find the all val in curr attr
*
* */

var toggle_sort = false;

function sort_attr(evt){
    var $target  = evt.target;
    var index    = $target.index($target.parent().children()) // get the index;
    var all_con  = document.getElementsByClassName('swiper-slide');

     if(toggle_sort === false){
        // enter the sort min

     }
}