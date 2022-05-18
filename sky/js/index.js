$(function(){
    /*适配微信iphone6为模板375*603*/
    var _SCALE_ = 1;
    _SCALE_ = function (){
        var deviceWidth = document.documentElement.clientWidth;

        var deviceHeight = document.documentElement.clientHeight;
        var diss = 640/1029;
        var dis = deviceWidth/deviceHeight;
        if(dis>diss){         
             deviceWidth = deviceHeight*diss;
        }        
        var scale = deviceWidth / 640;
        scale = scale > 1 ? 1 : scale;
        // console.log(scale);
        var metaEl = document.querySelector('meta[name="viewport"]');
        metaEl.setAttribute('content', 'width=640,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
        return scale;
    }();

    //图片加载
    loadingImgs();

    /*第一关*/
    var img1 = $('.img1');
    var map1 = $('#planetmap');
    changeCoords(580,img1,map1)

    var areas1 = $('.section-1').find('area');
    for( let i = 0; i<areas1.length;i++){    
        var msg1 = ['帽子佩戴不正确','赤膊','抽烟','拖鞋','拖鞋'];
        var remake1 = '.'+'remake' + i;
        areas1[i].addEventListener('click',()=>{
            if( i > 3 ) i = 3;
            var remake1 = '.'+'remake' + (i+1);
            make($(remake1),msg1[i]);
        })
    }

    $('.b-1').click(function(){
        if(num==4){
            num = 0;
            Cjajax(1,true);
            mySwiper.slideTo(1, 0); 
            $('.remake').hide(); 
            localStorage.skylevel = 1;
        }else{
            num = 0;
            layer();
            $('.remake').hide(); 
            Cjajax(1,false)
        }
    })

    /*第二关*/
    var img2 = $('.img2');
    var map2 = $('#planetmap2');
    changeCoords(580,img2,map2);

    var thingmsg = ['安全帽','安全带','口罩','工具袋','绝缘手套','雨伞','防护面罩','防滑鞋','软绳','水鞋'];                        
    var areas2 = $('.section-2').find('area');
    for(let i = 0,index=0;i<areas2.length;i++){
        index++; 
        areas2[i].addEventListener('click',function(){     
            towmake($('.section-2'),thingmsg[index-1],index);
            var hcalss = '.'+ 'make' + index;
            $(hcalss).click(function(){
                $(this).remove();
            })
        })
    }

    $('.b-2').click(function(){
        var a  = $('.section-2').children();
        if(a.is('.make1')&&a.is('.make2')&&a.is('.make4')&&a.is('.make8')&&$('.make').length == 4){
            mySwiper.slideTo(2, 0);   
            $('.make').remove();
            localStorage.skylevel = 2;
            Cjajax(2,true);
        }else{
            // $('.layer').show();
            layer(function(){
                $('.make').remove();
                $('.section-2 .layer').hide();
            });
            Cjajax(2,false);
        }
    })

    $('.section-2 .layer button').click(function(){
        $('.make').remove();
        $('.section-2 .layer').hide();
    })

    /*第三关*/
    var img3 = $('.img3');
    var map3 = $('#planetmap3');
    changeCoords(580,img3,map3);

    var areas3= $('.section-3').find('area');
    for( let i = 0; i<areas3.length;i++){
        var msg3 = ['铺板不严','无平网','立网破损','缺挡脚板','未系安全带'];
        var arr3 = [];
        areas3[i].addEventListener('click',function(){
            var remake3 = '.'+'remake' + (i+1);
            arr3.push(remake3);
            arr3 = [...new Set(arr3)];
            towmake($('.section-3'),msg3[i],i+1,true);
        })
    }
    $('.b-3').click(function(){  
        if(arr3.length == 5){
            arr3.length = 0;
            Cjajax(3,true,function(){
                $('.make').remove();
                mySwiper.slideTo(3,0);
                localStorage.skylevel = 3;
            })
        }else{
            layer();
            arr3.length = 0;
            Cjajax(3,false,function(){
                $('.make').remove();
            })
        }

    }) 

    /*第四关*/
   var oli4 = $('.section-4 .choice ul').find('li');
   var twinkle = $('.section-4 .twinkle').find('img');
   var cartoon = $('.section-4 .cartoon').find('img');
   var arr4 =[2,5,4,3];
   var index4 = 0;
   for(let i = 0; i< oli4.length;i++){
        oli4[i].addEventListener('click',function(){
            var sss = arr4[index4] ;
            if(sss == i+1){
                $(twinkle[index4]).addClass('animated-twinkle'); 
                $(cartoon[index4+1]).addClass('animated-cartoon');
                index4++;
                if(index4 == 4){
                    // $('.b-4').show();
                    // $('.b-4').addClass('bounceInUp animated');
                    // setTimeout(function(){
                    //     $('.b-4').removeClass('bounceInUp animated');
                    // },1000)
                    setTimeout(function(){
                        index4 = 0;
                        cartoon.removeClass('animated-cartoon');
                        twinkle.removeClass('animated-twinkle');
                        // $(this).hide();
                        mySwiper.slideTo(4,0);
                        localStorage.skylevel = 4;
                        oli4.removeClass('disabled');
                    },1000)
                    Cjajax(4,true);
                }
                $(this).addClass('disabled');
            }else{
                if(index4 ==4){
                    return false;
                }
                if($(this).is('.disabled')){
                    return false;
                }
                layer(function(){
                    cartoon.removeClass('animated-cartoon');
                    twinkle.removeClass('animated-twinkle');
                    index4 = 0;
                    Cjajax(4,false);
                })
                console.log('error');
            }
        })
   }
    /*第五关*/
    var img5 = $('.img5');
    var map5 = $('#planetmap5');
    changeCoords(580,img5,map5);
    var areas5 = $('.section-5').find('area');
    for(let i=0 ; i<areas5.length;i++){
        areas5[i].addEventListener('click',function(){
            ($(this).data('key') == 'right') ? (localStorage.skylevel = 5,mySwiper.slideTo(5,0),Cjajax(5,true)) : (layer()),Cjajax(5,false);
        })
    }

    /*第六关*/
    var img6 = $('.img6');
    var map6 = $('#planetmap6');
    changeCoords(580,img6,map6);

    var areas6 = $('.section-6').find('area');
    var msg6 = ['用绳子绑扎','利用平台运料','安全带挂在悬吊平台','踩栏杆作业','外挂自制吊篮'];
    var arr6 = [];
    for(let i = 0;i<areas6.length;i++){
        areas6[i].addEventListener('click',function(){     
            towmake($('.section-6'),msg6[i],i+1,true);
            var remake6 = '.'+'remake' + (i+1);
            arr6.push(remake6);
            arr6 = [...new Set(arr6)];
        })
    }
    $('.b-6').click(function(){
        if(arr6.length == 5){
            arr6.length = 0;     
            Cjajax(6,true)    
            $('.make').remove();    
            mySwiper.slideTo(6,0);
            localStorage.skylevel = 6;
        }else{
            layer();
            arr6.length = 0;  
            Cjajax(6,false)    
            $('.make').remove();     
        }    
    })

    /*第七关*/
    var img7 = $('.img7'),img71 = $('.img7-1'),img72 = $('.img7-2');
    var map7 = $('#planetmap7'),map71 = $('#planetmap7-1'),map72 = $('#planetmap7-2');
    changeCoords(580,img7,map7);changeCoords(210,img71,map71);changeCoords(358,img72,map72);
    var areas7 = $('.section-7').find('area');
    var character7 = $('.section-7 .character').find('img');
    var arr7 = [3,1,5,2];
    for(var i = 0,index7=0; i<areas7.length;i++){
        areas7[i].addEventListener('click',function(){
            if(arr7[index7] == $(this).data('num')){
                $(character7[index7]).hide(); 
                $(character7[index7+1]).show(); 
                $(this).addClass('disabled');
                index7++;
            }else{
                // return false;
                if($(this).is('.disabled')&&$(this).data('num') != 1){
                    return false;
                }
                if(index7 == 0){
                    return false;
                }
                if(index7 == 2){
                    return false;
                }
                character7.hide();
                character7.eq(0).show();
                layer(function(){
                    index7 = 0;
                    Cjajax(7,false)
                })
            }
            if($(character7[4]).is(':visible')){             
                $('.b-7').show();
                $('.b-7').addClass('bounceInUp animated');
                setTimeout(function(){
                    $('.b-7').removeClass('bounceInUp animated');
                },1000)
            }
        })
    }
    $('.b-7').click(function(){
        Cjajax(7,true)
        $(this).hide();
        areas7.removeClass('disabled');
        index7 = 0;
        mySwiper.slideTo(7,0);
        character7.hide();
        character7.eq(0).show();
        localStorage.skylevel = 7;
    })

    /*第八关*/
   dragger();
   isscroll('false');
    $('.b-8').click(function(){
       var len =  $('.drop li').find('img').length;
       var arr =[];
       var html =  '<img src="images/edge/a1.png" alt="" data-num="1">'+
                   '<img src="images/edge/a2.png" alt="" data-num="4">'+
                   '<img src="images/edge/a3.png" alt="" data-num="2">'+
                   '<img src="images/edge/a4.png" alt="" data-num="5">'+
                   '<img src="images/edge/a5.png" alt="" data-num="6">'+
                   '<img src="images/edge/a6.png" alt="" data-num="3">';
       function rest(){
            $('.drop li').html('');
            $('.drag').html(html) ;
       }
       for(var i = 0;i<len;i++){
          arr.push($('.drop li').find('img')[i].getAttribute('data-num'));
       }
       if( arr.toString() == arr.sort().toString()&&arr.length == 6){
           mySwiper.slideTo(8,0);
           rest();
           localStorage.skylevel = 8;
           Cjajax(8,true)
       }else{
           rest();
           layer();
           Cjajax(8,false)
       }
    })

    /*第九关*/ 
    var img9 = $('.img9');
    var map9 = $('#planetmap9');
    changeCoords(580,img9,map9);
    var areas9= $('.section-9').find('area');
    for( let i = 0; i<areas9.length;i++){
        var msg9 = ['安全带挂点不正确','栏杆高度不够','缺少制动装置'];
        var arr9 = [];
        areas9[i].addEventListener('click',function(){
            var remake9 = '.'+'remake' + (i+1);
            arr9.push(remake9);
            arr9 = [...new Set(arr9)];
            towmake($('.section-9'),msg9[i],i+1,true);
        })
    }
    $('.b-9').click(function(){  
        if(arr9.length == 3){
            arr9.length = 0;
            $('.make').remove();
            mySwiper.slideTo(9,0);
            localStorage.skylevel = 9;
            Cjajax(9,true)
        }else{
            layer();
            arr9.length = 0;
            $('.make').remove();
            Cjajax(9,false)
        }
    }) 

    /*第十关*/
    var img10 = $('.img10');
    var map10 = $('#planetmap10');
    changeCoords(580,img10,map10);
    var areas10 = $('.section-10').find('area');
    for( let i = 0; i<areas10.length;i++){
        var msg10 = ['防护材质错误','三人作业','偏载、超高'];
        var arr10 = [];
        areas10[i].addEventListener('click',function(){
            var remake10 = '.'+'remake' + (i+1);
            arr10.push(remake10);
            arr10 = [...new Set(arr10)];
            towmake($('.section-10'),msg10[i],i+1,true);
        })
    }
    $('.b-10').click(function(){  
        if(arr10.length == 3){
            arr10.length = 0;
            $('.make').remove();
            mySwiper.slideTo(10,0);
            localStorage.skylevel = 10;
            $('.swiper-container').hide();
            $('#end').show();
            Cjajax(10,true,null,true)
        }else{
            layer();
            Cjajax(10,false,null,true)
            arr10.length = 0;
            $('.make').remove();
        }
    }) 

    /*再玩一次*/
    $('.b-11').click(function(){
        mySwiper.slideTo(0,0);
        $('.swiper-container').show();
        $('#end').hide();
        parent._no = 1;
        console.log(errorNum.obj)
        errorNum.resetObj();
        console.log(errorNum.obj)
    })
})  	

/*本地存储*/
var level = localStorage.skylevel;
    /*初始化参数*/
// var no = $.XRequest.queryString('no');
var no = parent._no||0;
level = Number(level);
if(no<=0||!no){
    level = 0;
}else if(no != level+1){
    level = Number(no)-1;
}
console.log(level);

/*预加载*/
var mySwiper;
function loadingOver(){
    $('#loading').hide();
    $('.swiper-container').show();
    isscroll('true');
    //初始化swiper
    mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        effect : 'flip',
        noSwipingClass : 'stop-swiping',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
            swiper.disableTouchControl();
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }  
    })  
    mySwiper.slideTo(level, 0); 
}

function loadingImgs(){
    isscroll('true');
    for (var imgArr = ["images/bg.jpg","images/com/01.png","images/01.png"],
    index = 0, i = 0; i < imgArr.length; i++) {
        var loadingObj = new Image;
        loadingObj.src = imgArr[i],
        loadingObj.onload = function() {
            index++,index >= imgArr.length && loadingOver();
            // console.log( index/imgArr.length*100 + '%')
        }
    }
}
/*热区自适应*/
function changeCoords(pw,img,map){
    var w1 = img.width();
    var percent = w1/pw;
    map.children().each(function(){
        var coords = $(this).attr("coords");
        var arr = coords.split(",");
        for(var i=0;i<arr.length;i++){
            arr[i] *= percent;
        }
        var str = arr.join(",");
        $(this).attr("coords",str);
    })
}

/*第一关标记*/
var num = 0;
function make(remake,msg){
    if(remake.is(":hidden")){
        var x  = event.pageX -9 + 'px';
        var y  = event.pageY -21 + 'px';
        if(window.innerWidth>540){
          x = parseFloat(x) - (window.innerWidth - 540)/2 +'px'
        }
        remake.css({
            "left":x,
            "top":y,
            "display":'block'
        });
        remake.find('div').html(msg)
        num++;
    }  
    // if(num==4){
    //     num=0;
    //      $('.b-1').show();
    //      $('.b-1').addClass('bounceInUp animated');
    //      setTimeout(function(){
    //          $('.b-1').removeClass('bounceInUp animated');
    //      },1000)
    // }
}


/*第二关标记*/
function towmake(section,msg,index,flag){
    var x  = event.pageX -9 + 'px';
    var y  = event.pageY -21 + 'px';
    if(window.innerWidth>540){
      x = parseFloat(x) - (window.innerWidth - 540)/2 +'px';
    }
    var hcalss ='.'+ 'make' + index;
    if($(hcalss).length==0){
        var html = '<div class="make  make'+index+'"  style="left:' + x +';top :'+y+'">' +
                        '<span>√</span>'+
                        '<div> '+msg+'</div>'+
                    '</div>'  
        section.append(html);            
    }else{
        !flag && $(hcalss).remove();    
    }
}


/*第八题*/
// function dragger(){
//     var el = document.querySelector(".drag");
//     var el1 = document.querySelectorAll(".drop li");
//     for(var i =0;i<el1.length;i++){
//         Sortable.create(el1[i],{
//              group: {
//                name:"words",
//                pull: true,
//                put: true 
//                },
//               onEnd: function(evt){
//                     if (evt.to!=evt.from) {
//                         var to  = evt.to.innerHTML;
//                         evt.to.innerHTML = '';
//                         $(evt.to).append(evt.item);
//                         to = String(to).replace(evt.to.innerHTML,'');
//                         evt.from.innerHTML = to;                                                 
//                     }    
//               }
//         });
//     }
//     var sortable = Sortable.create(el,{
//         sort: false,
//         animation: 150,
//         group:{
//             name:"words",
//             pull:true,
//             put:false
//         },
//         onMove:function(evt){
//             if(evt.to.children.length == 1){
//                 return false;
//             }
//         }
//     })
// }

/*竖屏*/
// function orient() {     
//     if (window.orientation == 0 || window.orientation == 180) {
//         $("body").attr("class", "portrait");
//         orientation = 'portrait';
//         return false;
//     }
//     else if (window.orientation == 90 || window.orientation == -90) {
//         $("body").attr("class", "landscape");
//         orientation = 'landscape';
//         return false;
//     }  
// }
// window.addEventListener("orientationchange",function(){
//     orient()
// })

/*屏幕禁止滚动*/
function isscroll(flag){
    if( flag == 'true'){
        $("body").on("touchmove",function(){event.preventDefault()})
    }else{
        $("body").off("touchmove");
    }
}

/*错误次数*/
var errorNum = {
    obj:{},
    getObj :function(){
        var length =  $('.swiper-slide').length,
            classNameNo,
            position;
        for(var i = 0;i<length;i++){
            classNameNo = $('.swiper-slide')[i].classList[1],
            position = classNameNo.indexOf('-');
            classNameNo = classNameNo.substring(position+1);
            this.obj[classNameNo] = 0;
        }
        return this.obj;
    },
    setObj:function(classNameNo){
       this.obj[classNameNo]++;
       return this.obj[classNameNo];
    },
    resetObj:function(){
        for(var i = 0;i<$('.swiper-slide').length;i++){
            errorNum.obj[i+1] = 0;
        }
    }
}
errorNum.getObj();

/*弹出提示层*/
var layerdiv;
function layer(fn,msg){

    var classNameNo = $(event.target).parents('.swiper-slide')[0].classList[1],
    position  = position = classNameNo.indexOf('-');
    classNameNo = classNameNo.substring(position+1);
    errorNum.setObj(classNameNo);

    console.log(errorNum.obj[classNameNo]);

    if(errorNum.obj[classNameNo] < 3) {
        if(classNameNo == 2 ){
            msg = ' ಥ_ಥ  提示一下有4个正确选项哦 ~';
        }
        msg = msg || '';
        var html = '<img src="images/error.png">'+
                    '<p>' + msg + '</p>'+
                    '<div class="button-group">'+
                        '<button></button>'+	
                    '</div>'
    }else{
        msg = '本题你已经错了三次，请重新观看视频';
        var time,totolTime;
        switch(classNameNo){
            case '2': time = '06:10';
            break;
            case '4': time = '03:16';
            break;
            case '8': time = '04:34';                                                                                                                                                                                                                                                
            break;
        }
        time?totolTime = '视频位置'+'('+ time +')':totolTime = '';
        var html = '<img src="images/error.png">'+
        '<p>' + msg +'<br>'+'<br>'+totolTime +'</p>'+
        '<a href="javascript:;">'+'重新观看视频'+'</a>'+
        '<div class="button-group">'+
            '<button></button>'+	
        '</div>'
    }   
    if(!layerdiv){
        layerdiv = document.createElement('div');
        layerdiv.classList.add("layer");
    }            
    layerdiv.innerHTML = html;
    layerdiv.style.display  = 'block';
    document.body.appendChild(layerdiv);
    layerdiv.lastChild.firstChild.addEventListener('click',function(){
        document.body.removeChild(layerdiv)
        fn&&fn();
    })
    if(layerdiv.querySelector('a')){
        layerdiv.querySelector('a').addEventListener('click',function(){
            //history.go(-1);
            parent.toVideo();
        })
    }
    console.log(errorNum.obj);
}

/*判断是否是安卓*/
function isAndroid(){
    var ua = navigator.userAgent.toLowerCase();	
    if ( /iphone|ipad|ipod/.test(ua)) {
        return false;
    }else if (/android/.test(ua)) {
        return true;
    }
}
/*提交后台*/
var first_submit = [];
function Cjajax(no,correct,fn,finished){
    var 
        url = parent._url,
        workerId = parent._workerId||false,
        course2Id = parent._course2Id,
        no = no,
        correct = correct,
        finished = finished || false,
        fn = fn ||function(){},
        over = parent._finished;

        parent._no  = no;

    if(workerId&&!first_submit.includes(no)&&!over){
        $.ajax({
            url:url,
            type:'POST', 
            data:{
                workerId:workerId,
                course2Id:course2Id,
                no:no,
                correct:correct,
                finished:finished
            },
            error:function(xhr,textStatus){
                console.log('错误');
            },
            success:function(result){
                first_submit.push(no);
                fn&&fn();
            }
        });
    }else{
        fn();
    }
}
