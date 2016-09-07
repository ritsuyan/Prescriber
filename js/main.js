/**
 * Created by Administrator on 2016/8/11.
 */

/*   // 05/09
    todo 1  the elem slide then cause the blank space  => complete
    todo 2  the filter page column padding      = > complete
    todo 3  the reduant tr in swipe body after the sec apply filter page
    todo 4





 /*   // 04/09
 todo 1  if hasnot open the first collspe then the sec collspe first choose opt will be the fixed title in the choose column page   => complete
 todo 2  the choose column page cannot tap btn
 todo 3  cancel or apply while do not has any execute will cause bug      = > complete

 /*    // 02/09
 todo 1  change padding page cannot tap btn   = > complete
 todo 2  change padding page column wrong     = > complete
 todo 3  choose column page should fixed td when td arr width val less than page
 todo 4  after choose column page turn to filter page ,the result td has reduant td   = > complete
 todo 5  the filter page should clean the reduant td                                  = > complete
 todo 6  the choose column page should has the default column and tap the each opt should close itself and open the another   = > complete
 todo 7  the slide optimize   = > complete
 /*    // 01/09
 todo 1  choose column page should not scroll   = > complete
 todo 2  data rewrite   = > complete

 *     todo 1  slide up down   = >  complete
 *     todo 2  graphic data
 *     todo 3  choose column reduant =>  complete
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
        for (var x = 0; x < rows1.length - 1; x++) {
            for (var y = x + 1; y < rows1.length; y++) {

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
var  fixed_btn = document.getElementById('fixed_btn');


if(fixed_btn  !== null || fixed_btn !== undefined){

    var hammer_btn = new Hammer(fixed_btn);

    hammer_btn.on('tap', function (evt) {

        is_show = show_btn({
            'dom': fixed_btn
        })

        if(is_show){
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
var is_show = false;
function show_btn(opts){
    var $pa = opts.dom;
    var $fun_btn = document.createElement('div');
    var len = 3;
    var $tit_arr = ['行距','过滤','选列']


    if($pa.childNodes[2] !== undefined && $pa.childNodes[2].innerHTML === ""){

        for (var i = 0; i < len; i++) {
            if($pa !== null || $pa !== undefined)
                var $btn = document.createElement('div')
            $pa.appendChild($btn)

            $pa.childNodes[i+1].style.left = -70 + (i  ) * 30 + "%";
            $pa.childNodes[i+1].style.top = 40 - (i ) * 85 + "%";
            $pa.childNodes[i+1].innerHTML = $tit_arr[i];
            $pa.childNodes[i+1].className = 'fun_btn';

        }

        return true;
    }

    if(is_show === false) {
        if($pa !== null || $pa !== undefined ){
            if($pa.childNodes.length > 4) return true
        }

        for (var i = 0; i < len; i++) {
            if($pa !== null || $pa !== undefined)
            var $btn = document.createElement('div')
                $pa.appendChild($btn)

            $pa.childNodes[i+1].style.left = -70 + (i  ) * 30 + "%";
            $pa.childNodes[i+1].style.top = 40 - (i ) * 85 + "%";
            $pa.childNodes[i+1].innerHTML = $tit_arr[i];
            $pa.childNodes[i+1].className = 'fun_btn';

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

    var default_attr = document.getElementById('fixed_table_title').getElementsByTagName('th')[0].innerHTML;
    console.log(default_attr)
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
            '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" class="collapsed" id="coll_1">  选择关键列           >' +
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

        document.body.style.overflow = 'hidden';


        $('#collapseTwo').collapse('hide')
        $('#collapseOne').collapse('hide')



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


    var cancel_hammer = new Hammer(document.getElementById('btn_cancel'));

    cancel_hammer.on('tap',function  (ev) {
        $('body').empty().append($main_page)
        cre_btn_opt()
    })



    var apply_hammer = new Hammer(document.getElementById('btn_apply'));
    var collapseOne =  document.getElementById('collapseOne');
    var collapseTwo =  document.getElementById('collapseTwo');
    var filter_con  =  document.getElementById('filter_con');

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

            document.getElementById('swipe_table').style.webkitTransform = 'translate3d(0,0,0)';

        }else if( $name === "选列"){
            var coll_arr = collapseTwo.getElementsByTagName('input');
            var exe2_arr = []
            for(var  i = 0 ; i < coll_arr.length; i++){
                if(coll_arr[i].checked === true){
                    exe2_arr.push(coll_arr[i])
                }
            }

            if(exe2_arr.length === 0){
                return false;
            }
            //  find the single fixed column
        //    cre_btn_opt()

            var de_arr  = [];
            console.log($span_arr)

            if(collapseOne.childNodes.length === 0){
                de_arr.unshift('name');     //  the main page default fixed attr title
            }else{
                for(var i = 0 ; i < $span_arr.length; i++) {
                    if ($span_arr[i].getElementsByTagName('input')[0].checked) {
                        de_arr.push($span_arr[i].getElementsByTagName('a')[0].innerHTML)  // such as sales
                    }
                }
            }

            for(var i = 0 ; i < $span_arr_two.length; i++){
                if($span_arr_two[i].getElementsByTagName('input')[0].checked){
                    de_arr.push($span_arr_two[i].getElementsByTagName('a')[0].innerHTML)  // such as sales
                }
            }
            console.log(de_arr)

            console.log(document.getElementById('swipe_table'))
            document.getElementById('swipe_table').className += ' change_margin';


            insert_attr(de_arr)

            deal_bug({
                'dom' : document.getElementById('fixed-body'),
                'addtion':document.getElementById('swiper-body')
            })

            fixed_slide_tr({
                'dom' : document.getElementById('swiper-body')
            })



        }else if(  $name === '过滤'){


            var input_two_arr = filter_con.getElementsByTagName('input');
            var exe_arr = []
            for(var  i = 0 ; i < input_two_arr.length; i++){
                if(input_two_arr[i].checked === true){
                    exe_arr.push(input_two_arr[i])
                }
            }
            console.log(exe_arr)
            if(exe_arr.length === 0){
                return false;
            }

            console.log(filter_con)
            /*     default_apply({
             'dom' :  filter_con
             })
             */

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



            change_width({
                'dom' : document.getElementsByClassName('fixed_con')[0],
                'className': 'change_width'
            })

            deal_bug({
                'dom' : document.getElementById('swiper-body'),
                'addtion':document.getElementById('fixed-body')
            })


            setInterval(checked_tr_len({
                'dom' : document.getElementById('swiper-body'),
                'add_dom' : document.getElementById('fixed-body')
            }),.1)

            setInterval('delete_tr_2()',.1)

        }

        /*   clear_fun({
         'dom' : document.getElementById('fixed_btn')
         })
         */
    })


}


td_stacking()
function td_stacking () {
    var th_arr =  document.getElementsByTagName('th');
    var len  = th_arr.length;

    for(var i = 0; i < len ; i++){

        th_arr[i].style.position = 'relative';
        th_arr[i].style.zIndex = 1000000;
    }
}

function default_apply(opts){
    var dom = opts.dom;
    var input_two_arr = dom.getElementsByTagName('input');
    var exe_arr = []
    for(var  i = 0 ; i < input_two_arr.length; i++){
        if(input_two_arr[i].checked === true){
            exe_arr.push(input_two_arr[i])
        }
    }
    console.log(exe_arr)
    if(exe_arr.length === 0){
        return false;
    }
}


function fixed_slide_tr(opts){
    var dom = opts.dom;
    var trlen = dom.getElementsByTagName('tr')[0].childNodes.length;
    console.log(trlen + 'how long')

    dom.removeEventListener('touchstart', startHandler)
    dom.removeEventListener('touchsmove', moveHandler)

}

function cre_btn_opt () {

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


function deal_bug (opts) {
    var dom = opts.dom;
    var td_arr  = dom.getElementsByTagName('td');
    var addtion = opts.addtion.getElementsByTagName('td')[0];
    var paddingTop = addtion.style.paddingTop;
    var paddingBottom = addtion.style.paddingBottom;

    var len = td_arr.length;

    for(var i = 0 ; i < len ; i++){
        td_arr[i].style.paddingTop = paddingTop;
        td_arr[i].style.paddingBottom = paddingBottom;
    }



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
    if( document.getElementById('swiper-body') ){
        var arr = document.getElementById('swiper-body').getElementsByTagName('tr');
        var len = arr.length;
    }



    for(var i = 0 ; i < len; i++){
        if(arr[i] === null || arr[i] === undefined) return true;
        if(arr[i].className.indexOf("mark") < 0 ){
            arr[i].parentNode.removeChild(arr[i])
        }

    }
}

function checked_tr_len (opts) {
    var dom_tr = opts.dom.getElementsByTagName('tr');
    var dom_len = opts.dom.getElementsByTagName('tr').length;
    var add_len = opts.add_dom.getElementsByTagName('tr').length;

    if(dom_len > add_len){
        var su =  dom_len - add_len;

        for(var i = add_len; i < su ; i ++){
            dom_tr[i].parentNode.removeChild(dom_tr[i])
        }
    }

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
        //   $('#collapseTwo').collapse('hide')
        $('#collapseOne').collapse('hide')
    })

    var ha_tap_1 = new Hammer(document.getElementById('coll_1'));

    ha_tap_1.on('tap', function (ev) {

        var input_arr = document.getElementById('collapseOne').getElementsByTagName('input');
        var len = input_arr.length;


        console.log('yes enter ')
        console.log(input_arr)
        input_arr.onclick = function () {
            for( var i = 0 ; i < len ; i++){
                if(input_arr[i].checked === true)
                    input_arr[i].checked = false;
            }
            input_arr[i].checked = true;
            console.log(233)
        }

        add_checkbox({
            'dom': document.getElementById('coll_1')
        })

        $('#collapseTwo').collapse('hide')
        //    $('#collapseOne').collapse('hide')

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
            $input.setAttribute('type', 'checkbox');
        } else{
            $input.setAttribute('type', 'checkbox');
        }
        $span.appendChild($input)
        $span.appendChild($text)

        document.getElementById(herf_con).appendChild($span)
    }
    if(curr_opt === document.getElementById('coll_1')) {
        document.getElementById(herf_con).firstChild.getElementsByTagName('input')[0].checked = false;
        var $de = document.createElement('em');
        $de.innerHTML = '    默认';
        if(document.getElementById(herf_con).firstChild.childNodes.length === 2) {
            document.getElementById(herf_con).firstChild.appendChild($de)
        }
    }
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


    $(swipe_title).empty();
    $(swipe_body).remove();



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





    var fixed_td_arr = document.getElementById('fixed-body').getElementsByTagName('tr');
    var len         = fixed_td_arr.length;
    console.log(fixed_attr)

    $(fixed_td_arr).empty()


    for( var i = 0 ;  i < fixed_td_arr.length; i++){
        var curr_th =  document.createElement('td');
        curr_th.innerHTML = json_data[i][fixed_attr];
        fixed_td_arr[i].appendChild(curr_th)
        console.log('this is ' + i)
    }


    // set swipe title









    //  end  insert  td value

}
/*************************************   insert attr  end            *******************************/
