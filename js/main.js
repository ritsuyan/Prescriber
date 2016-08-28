/**
 * Created by Administrator on 2016/8/11.
 */

/*
*     todo 1  slide
*     todo 2  graphic data
*     todo 3  clear undefined td
*
* */

var curr_fixed_name = document.getElementById('fixed_table_title').getElementsByTagName('th')[0].innerHTML.trim();

var fixed_td_arr  = document.getElementById('fixed-body').getElementsByTagName('td');

console.log(fixed_td_arr)
/**************************************     sort   data    start   *********************************/
function sort_attr(opts){
    var $index  = opts.index;
    var $table  = opts.dom;  // table
    var $related = opts.related;

    var rows=$table.rows;//���ÿһ�е������
    var rowslength=rows.length;//ÿһ�еĳ���

    var rows_rela = $related.rows;
    var rows_rela_len = rows_rela.length;

    console.log($index)



    // start
    var flag=true;
    function sortAge(){
        //�������������Ҫ�Ƚ��л��ÿһ�ж���Ȼ���������еĵ�һ������0 ��ʼ���Ĵ�С��������

        var rows0 = $table.rows;
        var rows1 = [];

        var rows2 = [];  // container related arr


        for (var x = 1; x < rows0.length; x++) {
            rows1[x - 1] = rows0[x];
            rows2[x - 1] = rows_rela[x];
        }

        /*
         *    now execute the row1 bubble sort
         * */
        for (var x = 0; x < rows1.length - 1; x++) {//ÿ��Ԫ�����ж���
            for (var y = x + 1; y < rows1.length; y++) {
                //��ÿһ�е����ݽ��н���������
                if (parseInt(rows1[x].cells[$index].innerHTML) > parseInt(rows1[y].cells[$index].innerHTML)) {
                    //alert("aa="+x+":"+rows1[x].cells[1].innerHTML);
                    //alert("bb"+rows1[y].cells[1].innerHTML);
                    var temp = rows1[x];
                    rows1[x] = rows1[y];
                    rows1[y] = temp;

                    var temp_rela = rows2[x];
                    rows2[x]  = rows2[y];
                    rows2[y]  = temp_rela;
                }
            }
        }

        /* ���֮����������֮��ָ�֮ǰ��״̬

         /* ������ǵ�֮�����������������? �����������������appendchild��ǰ���ϵ����?*/


        if (flag) {
            for (var x = 0; x < rows1.length; x++) {//�ź���֮��ʹ�?0��ʼ
                //       tabNode.childNodes[0].appendChild(rows[x]);//����һ�� ��һ������
                rows1[x].parentNode.appendChild(rows1[x]);

                rows2[x].parentNode.appendChild(rows2[x])
            }


        }else{
            for (var x = rows1.length-1; x >=0; x--) {
                //       tabNode.childNodes[0].appendChild(rows[x]);//����һ�� ��һ������
                rows1[x].parentNode.appendChild(rows1[x]);

                rows2[x].parentNode.appendChild(rows2[x]);
            }

        }
        flag=!flag;

    }
    sortAge()
}

/**************************************     sort   data    end     *********************************/




/**************************************  graphic   data    start   *********************************/
var $show_gra = false;

var td_arr  = document.getElementById('swiper-body').getElementsByTagName('td');
var td_attr_len = document.getElementById('swipe_table_title').getElementsByTagName('th').length;
var td_len  = td_arr.length;
var hamCurr;
for( var x = 0 ; x < td_len; x ++){

        hamCurr = new Hammer( td_arr[x] );

        hamCurr.on('doubletap', function (ev) {
            var w = String(x/td_attr_len);
            console.log(w)
            var curr_index = Number('0.' + w.substring(1,w.length)) * td_attr_len;   // 0.25
            console.log(curr_index)
           $show_gra = graph_data({
                'dom':document.getElementById('swiper-body'),
                'index':curr_index
            })
        })



}

 function graph_data(opts){

    /*
    *    the index should be the evt parentNode index
    * */


    var $index  = opts.index;
    var $table  = opts.dom;


    console.log($index)



    var rows0 = $table.rows;
    var rows1 = [];


    for (var x = 0; x < rows0.length; x++) {
        rows1[x ] = rows0[x];

    }

    /*
     *    now execute the row1 bubble sort
     * */

    if($show_gra === false) {
        for (var x = 0; x < rows1.length - 1; x++) {//ÿ��Ԫ�����ж���
            /*
             *    todo 1  container the val
             *    todo 2
             * */
            var $val = judge_negi(rows1[x].cells[$index].innerHTML.trim());   //  such as  '-100%'
            var $span = document.createElement('span');
            var $cre_width = Number(String(parseInt($val)).slice(0, 2));
            console.log($cre_width)
            $($span).css('width', $cre_width)
            $($span).css('height', '2em')
            $($span).css('display', 'block')
            $span.setAttribute('val', $val)

            rows1[x].cells[$index].innerHTML = "";
            rows1[x].cells[$index].appendChild($span);

            if ($cre_width < 0) {
                $span.className = "nega_cl"
            } else {
                $span.className = 'posi_cl'
            }
        }
    return  true;
     } else{
        for (var x = 0; x < rows1.length - 1; x++) {//ÿ��Ԫ�����ж���

        //   var curr_sp = rows1[x].cells[$index].getElementsByTagName('span')[0];
            rows1[x].cells[$index].innerHTML = rows1[x].cells[$index].getElementsByTagName('span')[0].getAttribute('val');

            return  false;

        }
    }
}
/**************************************  graphic   data    end     *********************************/


/**************************************  fun button show  start   *********************************/

var is_show = false;
function show_btn(opts){
    var $pa = opts.dom;
    var $fun_btn = document.createElement('div');
    var len = 3;
    var $tit_arr = ['行距','过滤','选列']

    if(is_show === false) {
        for (var i = 0; i < len; i++) {
            $pa.appendChild(document.createElement('div'))
        }

        for (var i = 1; i < len + 1; i++) {
            $pa.childNodes[i].style.left = -70 + (i - 1) * 30 + "%";
            $pa.childNodes[i].style.top = 40 - (i - 1) * 85 + "%";
            $pa.childNodes[i].innerHTML = $tit_arr[i - 1];
            $pa.childNodes[i].className = 'fun_btn';

        }
        return true;
    } else{
        $('.fun_btn').remove();
        return false;
    }

}

/**************************************  fun button show    end     *********************************/


/**************************************  fun button show  start   *********************************/


var $name;

function cre_view(opts){


    var $main_page =  $('body').children();
    $('body').empty();
    $name = opts.name;
    console.log($name)

    var $tb_view =
            '<div class="tb_wrap">' +
            '<h3 class="tb_title">' +
            '<a id="btn_cancel" class="left">取消' + '</a>' +
            '<a id="btn_curr_tit">' +$name + '</a>' +
            '<a id="btn_apply" class="right">应用' + '</a>'
            + '</h3>' +
            '<div class="tb_con">' + '</div>'
            + '</div>' ;

     $('body').append($tb_view)   

     var $con;
    if($name === '行距'){
          $con =
             '<div class="con_line">1 行'  +  '</div>' +
             '<div class="con_line">2 行'  +  '</div>' +
             '<div class="con_line">3 行'  +  '</div>' +
             '<div class="con_line">4 行'  +  '</div>' ;


        $('.tb_con').append($con);

    } else if( $name === '选列'){
          $con = 
'<div class="panel-group" id="accordion">' +

  '<div class="panel panel-default">' + 
    '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" class="collapsed" id="coll_1">  选择关键列 ' +               
        '</a>'      +
      '</h4>'      +
    '</div>'      +


    '<div id="collapseOne" class="panel-collapse collapse in">' +
    '</div>'  +
  '</div>'  + 


  '<div class="panel panel-default">' + 
    '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" id="coll_2"> 选择并排列                 > '        
        + 
        '</a>'      +
      '</h4>'      +
    '</div>'      +


    '<div id="collapseTwo" class="panel-collapse collapse in">' +
    '</div>'  +
  '</div>'  + 
            '</div>' ;


        $('.tb_con').append($con);

        var $span_arr = document.getElementById('collapseOne').getElementsByTagName('span');
        var $span_arr_two = document.getElementById('collapseTwo').getElementsByTagName('span');
        

        choose_col()
    } else if( $name = "过滤"){
         $con = '<div id="filter_con">' + 
             '<p class="con_line">'  +  curr_fixed_name + '</p>' +
         '</div>';

         $('.tb_con').append($con)

        var $filter_arr = document.getElementById('filter_con').getElementsByTagName('div');

        filter_arr({
             'dom': document.getElementById('filter_con'),
             'arr': fixed_td_arr
         })

    }



    $('#collapseTwo').collapse('hide')
    $('#collapseOne').collapse('hide')



    var $line_arr = document.getElementsByClassName('con_line');
    var $add_line;
    if(document.getElementsByClassName('con_line').length > 1){
         for(var i = 0 ;  i < $line_arr.length; i++){
             var apply_hammer = new Hammer($line_arr[i]);
             apply_hammer.on('tap',function (ev) {
                     var $target = ev.target;
                     $add_line = $target.innerHTML.slice(0,1);  // 1 2 3 4 
                     console.log($add_line)
                     $target.className += " active_line";
                     console.log($target)

             })
         }
    } 


    var apply_hammer = new Hammer(document.getElementById('btn_apply'));

    apply_hammer.on('tap',function (ev) {

        $('body').empty();
        $('body').append($main_page);


        if($name === '行距'){
                     var $tb_arr = document.getElementsByTagName('td');
                     var len  = $tb_arr.length;

                    for(var i = 0 ; i < len; i++){
                        $tb_arr[i].style.paddingBottom =  $add_line  +  'em';
                         $tb_arr[i].style.paddingTop =  $add_line  +  'em';
                        }

        }else if( $name === "选列"){

                    //  find the single fixed column

            var de_arr  = [];
            console.log($span_arr)

            for(var i = 0 ; i < $span_arr.length; i++){
                 if($span_arr[i].getElementsByTagName('input')[0].checked){
                      de_arr.push($span_arr[i].getElementsByTagName('a')[0].innerHTML)  // such as sales
                 }
            }
            for(var i = 0 ; i < $span_arr_two.length; i++){
                if($span_arr_two[i].getElementsByTagName('input')[0].checked){
                    de_arr.push($span_arr_two[i].getElementsByTagName('a')[0].innerHTML)  // such as sales
                }
            }
            console.log(de_arr)

            insert_attr(de_arr)

        }else if(  $name === '过滤'){
             var filter_push  = [];



            console.log($filter_arr)
            for(var i = 0 ; i < $filter_arr.length; i++){
                 if($filter_arr[i].getElementsByTagName('input')[0].checked){
                      filter_push.push($filter_arr[i].getElementsByTagName('a')[0].innerHTML)  // such as sales
                 }
            }

            console.log(filter_push)

            delete_fixed_tr({
                 'arr' : filter_push,
                 'dom' : document.getElementById('fixed-body')
            })

            filter_fun({
                  'dom': document.getElementById('swiper-body'),
                  'dom_title':document.getElementById('fixed-body'),
                  'arr': filter_push,
                  'attr_arr': document.getElementById('swipe_table_title').getElementsByTagName('th')
            })

            delete_tr({
              'dom' : document.getElementById('swiper-body')
          })

            change_width({
               'dom' : document.getElementsByClassName('fixed_con')[0],
               'className': 'change_width'
            })

            setInterval('delete_tr_2()',.1)
            delete_tr_2()
        }

          

        clear_fun({
             'dom' : document.getElementById('fixed_btn')
        })
    })


}

function change_width(opts) {
  var dom = opts.dom;
  var className = opts.className;

  dom.className += ' change_width'; 
}

function delete_fixed_tr(opts) {
    var arr = opts.arr;
    var dom = opts.dom;


    var tr_arr = dom.getElementsByTagName('tr');
    var td_arr = dom.getElementsByTagName('td');
    var len   = tr_arr.length;

    console.log(tr_arr.length)  // 17
    console.log(arr.length)     //  3
    console.log(tr_arr)

    $(td_arr).remove();

    for( var i = 0 ; i < arr.length ; i ++){
        var td = document.createElement('td');
        td.innerHTML = arr[i];
        tr_arr[i].appendChild(td)
        if(tr_arr[i].getElementsByTagName('td')[0].innerHTML === 'undefined'){
           tr_arr[i].parentNode.removeChild(tr_arr[i])

        }
    }

}


function clear_fun(opts) {
    var self = opts.dom;
    var btn_arr = self.getElementsByClassName('fun_btn');
    var len  = btn_arr.length;

    $(btn_arr).remove()

    re_bind_tap()
}

function filter_fun(opts){
    var dom = opts.dom;
    var dom_title = opts.dom_title.getElementsByTagName('td');
    var arr = opts.arr;
    var attr_arr = opts.attr_arr;

    var dom_title_arr = [];

    var all_attr_arr = [];
    for(var i = 0 ; i < attr_arr.length; i++){
      all_attr_arr.push(attr_arr[i].innerHTML.trim())
   }
    console.log(all_attr_arr)


   for(var i = 0 ; i < dom_title.length; i++){
      dom_title_arr.push(dom_title[i].innerHTML.trim())
   }
    console.log(dom_title_arr)
    // real attr ["商品1,商品2"]

    var name_arr = [];
   for( var z = 0 ; z  < json_data.length; z++){
        name_arr.push(json_data[z]['name'])
   }
    console.log(name_arr)
    //  ["商品1", "商品2", "商品3", "商品4", "商品3", "商品3", "商品3", "商品3", "商品3", "商品3"]

    var real_index = [];
    for( var r = 0 ; r  < dom_title_arr.length; r++){
         real_index.push(name_arr.indexOf( dom_title_arr[r] ))
    }

    console.log(real_index)
    // real attr index     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

    console.log( arr )

  for(var w = 0 ; w < arr.length; w++){

      for( var y = 0 ; y < dom_title_arr.length; y++){
          dom.rows[w].cells[y].innerHTML = json_data[ real_index[w] ][ all_attr_arr[y] ]
          dom.rows[w].className += " mark";
      }


  }

  delete_by_num({
     'dom' : document.getElementById('swiper-body'),
     'className' : 'mark'
  })
   
  

}

function delete_tr_2() {
  var arr = document.getElementById('swiper-body').getElementsByTagName('tr');
  var len = arr.length;
  for(var i = 0 ; i < len; i++){ if(arr[i].className.indexOf('mark') < 0){arr[i].parentNode.removeChild(arr[i])} }
}

function delete_by_num(opts) {
  var dom = opts.dom;
  var className = opts.className;

  var tr_arr = dom.getElementsByTagName('tr');
  var len   = tr_arr.length;


  for( var i = 0 ; i < len; i++){
    console.log(tr_arr[i].className)
     if( tr_arr[i].className.indexOf('mark') < 0){
      console.log('enter')
       for( var w = 0; w < tr_arr[i].length; w++){
        tr_arr[i].removeChild(tr_arr[i].childNodes[w])
       }
       
     }
  }
}

function delete_tr(opts) {
   
     var dom = opts.dom;

     var td_arr = dom.getElementsByTagName('tr');

     var len = td_arr.len;

     for( var i = 0 ;  i < len ; i++){
        if(td_arr[i].getAttribute('mark') !== true){
          td_arr[i].parentNode.removeChild(td_arr[i])
        }
     }
}

function re_bind_tap(){
    var hammer_btn = new Hammer(document.getElementById('fixed_btn'));

    hammer_btn.on('tap', function (evt) {

        is_show = show_btn({
            'dom':document.getElementById('fixed_btn')
        })

        if(document.getElementById('fixed_btn').childNodes.length > 1) {
            for (var i = 1; i < 4; i++) {
                var hammer_btn = new Hammer(document.getElementById('fixed_btn').childNodes[i]);
                hammer_btn.on('tap', function (ev) {
                    var $name = ev.target.innerHTML.trim();

                    cre_view({
                        'name' : $name
                    })
                })

            }
        }
    })
}


function judge_negi(str){
      if(str.substring(0,1) === '-'){
           str = str.substring(1,str.length)
      }

    return str;
}
/**************************************  fun button show    end     *********************************/



/*************************************   json data  start            ********************************/
var json_data =    [
                        {
                            //*triangle为警示图标,1:正常,2:警告,3:预警
                            "name":"商品1",//商品名称
                            "sales":"950",//销售额
                            "prev_sales":"900",//环比销售额
                            "sales_triangle":3,//预警
                            "last_sales":"1200",//同比销售额
                            "last_sales_triangle":2,//警告
                            "amount":"100",//数量
                            "prev_amount":"80",//环比数量
                            "amount_triangle":1,//正常
                            "gross_margin":"100",//毛利
                            "prev_gross_margin":"80",//环比毛利
                            "gross_margin_triangle":1,//正常
                            "profit":"100",//净利润
                            "prev_profit":"80",//环比净利润
                            "profit_triangle":1,//正常
                            "increase":"10",//增长
                            "prev_increase":"8",//环比增长
                            "increase_triangle":1,//正常
                            "sales_target":"1200",//销售目标
                            "prev_sales_target":"1100",//环比销售目标
                            "sales_target_triangle":3,//预警
                            "achievement":"105",//目标达成率
                            "prev_achievement":"103",//环比目标达成率
                            "achievement_triangle":3,//预警
                        },
                        {
                            "name":"商品2",
                            "sales":"1200.54",
                            "prev_sales":"1000.54",
                            "sales_triangle":1,
                            "last_sales":"1000",
                            "last_sales_triangle":3,
                            "amount":"20",
                            "prev_amount":"16",
                            "amount_triangle":1,
                            "gross_margin":"600",
                            "prev_gross_margin":"500",
                            "gross_margin_triangle":1,
                            "profit":"600",
                            "prev_profit":"500",
                            "profit_triangle":1,
                            "increase":"9",
                            "prev_increase":"8",
                            "increase_triangle":3,
                            "sales_target":"1200",
                            "prev_sales_target":"900",
                            "sales_target_triangle":1,
                            "achievement":"95",
                            "prev_achievement":"90",
                            "achievement_triangle":3
                        },
                        {
                            "name":"商品3",
                            "sales":"900.52",
                            "prev_sales":"1000",
                            "sales_triangle":2,
                            "last_sales":"1000",
                            "last_sales_triangle":2,
                            "amount":"30",
                            "prev_amount":"46",
                            "amount_triangle":2,
                            "gross_margin":"900",
                            "prev_gross_margin":"600",
                            "gross_margin_triangle":1,
                            "profit":"400",
                            "prev_profit":"500",
                            "profit_triangle":2,
                            "increase":"-5",
                            "prev_increase":"11",
                            "increase_triangle":2,
                            "sales_target":"800",
                            "prev_sales_target":"1100",
                            "sales_target_triangle":2,
                            "achievement":"60",
                            "prev_achievement":"101",
                            "achievement_triangle":2
                            
                        },

    {
        "name":"商品4",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    },
    {
        "name":"商品5",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    },
    {
        "name":"商品6",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    },
    {
        "name":"商品7",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    },
    {
        "name":"商品3",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    },
    {
        "name":"商品3",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    }, {
        "name":"商品3",
        "sales":"900.52",
        "prev_sales":"1000",
        "sales_triangle":2,
        "last_sales":"1000",
        "last_sales_triangle":2,
        "amount":"30",
        "prev_amount":"46",
        "amount_triangle":2,
        "gross_margin":"900",
        "prev_gross_margin":"600",
        "gross_margin_triangle":1,
        "profit":"400",
        "prev_profit":"500",
        "profit_triangle":2,
        "increase":"-5",
        "prev_increase":"11",
        "increase_triangle":2,
        "sales_target":"800",
        "prev_sales_target":"1100",
        "sales_target_triangle":2,
        "achievement":"60",
        "prev_achievement":"101",
        "achievement_triangle":2

    }
                        
];


    
function choose_col() {

    console.log('enter')

    var ha_tap_2 = new Hammer(document.getElementById('coll_2'));

    ha_tap_2.on('tap', function (ev) {
        add_checkbox({
            'dom': document.getElementById('coll_2')
        })
    })

    var ha_tap_1 = new Hammer(document.getElementById('coll_1'));

    ha_tap_1.on('tap', function (ev) {
        add_checkbox({
            'dom': document.getElementById('coll_1')
        })

    })

}



function add_checkbox(opts) {
    var curr_opt = opts.dom;

    console.log(curr_opt)

    var herf_con = curr_opt.getAttribute('href'); // #collaseTwo

        herf_con  =  herf_con.substring(1,herf_con.length)

    var  attr_arr  =   Object.keys(json_data[0]);  // attr arr list

    console.log( herf_con )


    for(var i = 0 ; i < attr_arr.length ; i++){
        var $span = document.createElement('span');
        var $input = document.createElement('input');
        var $text  = document.createElement('a');
            $text.innerHTML = attr_arr[i];
        if( curr_opt === document.getElementById('coll_1')) {
            $input.setAttribute('type', 'radio');
        } else{
            $input.setAttribute('type', 'radio');
        }
        $span.appendChild($input)    
        $span.appendChild($text)
              
        document.getElementById(herf_con).appendChild($span)      
    }

     document.getElementById(herf_con).firstChild.getElementsByTagName('a')[0].innerHTML = "默认";

     console.log(herf_con)

}

function filter_arr(opts) {
    var dom = opts.dom;

    var td_arr = opts.arr;
    var len    = td_arr.length;

    for( var  i = 0 ; i < len; i ++){
         var $span = document.createElement('div');
         var $input = document.createElement('input');
         var $text  = document.createElement('a');
                $text.innerHTML = td_arr[i].innerHTML;
                $input.setAttribute('type', 'radio');
                $span.className = 'filter_list';
                $span.appendChild($input)    
                $span.appendChild($text)
            //    $($span).css('marginBottom','1em')

        dom.appendChild($span)         
    }


}



/*************************************   json data  end              ********************************/


/*************************************   insert attr  start          *******************************/

function insert_attr(arr){



    document.getElementById('fixed_table_title').getElementsByTagName('th')[0].innerHTML = arr.shift();

    var fixed_attr = document.getElementById('fixed_table_title').getElementsByTagName('th')[0].innerHTML;

    var swipe_title = document.getElementById('swipe_table_title').getElementsByTagName('tr')[0];

    var swipe_body = document.getElementById('swiper-body').getElementsByTagName('td');

    
    $(swipe_body).remove()



        console.log(arr)
    for( var i = 0 ;  i < arr.length ; i++){
            var curr_th =  document.createElement('th');
            curr_th.innerHTML = arr[i]
            swipe_title.appendChild(curr_th)
    }                


    


    //    start  insert  td value

   var attr_arr =  Object.keys(json_data[0]);

    console.log(attr_arr)

    var fixed_index = attr_arr.indexOf(fixed_attr)  // the fixed value index

            // get  good fixed_attr


    var fixed_td_arr = document.getElementById('fixed-body').getElementsByTagName('td');
    var len         = fixed_td_arr.length;
    console.log(fixed_attr)
    for( var i = 0 ;  i < json_data.length; i++){
         fixed_td_arr[i].innerHTML = json_data[i][fixed_attr];
    }




            //  get each goods swipe attr
    var swipe_td_arr = document.getElementById("swiper-body").getElementsByTagName('tr');

    var swipe_len         = swipe_td_arr.length;

    console.log(arr)
    for( var j = 0 ; j < json_data.length; j++){
    
        for(var k = 0 ; k < json_data.length ; k++) {

              var $td  =  document.createElement('td');
              $td.innerHTML = json_data[j][ arr[k] ];

              swipe_td_arr[j].appendChild($td)

              if($td.innerHTML === "undefined"){
                 $td.parentNode.removeChild($td)
              }
        }
    }

    //  end  insert  td value

}
/*************************************   insert attr  end            *******************************/