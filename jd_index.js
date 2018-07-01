/*封装$*/
// window.$=HTMLElement.prototype.$=function(selector){
//     var elems=(this==window?document:this)
//         .querySelectorAll(selector);
//     return elems.length==0?null:elems.length==1?elems[0]:elems;
// }







//BUG
//  移动到5的位置当图片到图片一，鼠标进入后，右下角下标仍然是5
//  频繁进入，会导致图片切换加快









/*广告图片数组*/
var imgs=[
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
    {"i":0,"img":"images/index/banner_01.jpg"},
];
var slide={
    LIWIDTH:670,
    $ULIMAGS:null,
    $ULIdx:null,
    DURATION:1000,
    moved:0,
    WAIT:2000,
    //动态生成数据
    initeView(){
        var htmlImags="";
        var htmlIdxs="";
        for(var i=0;i<imgs.length;i++){
            htmlImags+=`<li><img src="${imgs[i].img}"></img></li>`;
            htmlIdxs+=`<li>${i+1}</li>`;
        }
        this.$ULIMAGS.html(htmlImags)
            .css("width",(imgs.length+1)*this.LIWIDTH);
        this.$ULIMAGS.append(
            this.$ULIMAGS.children(":first").clone()
        );
        this.$ULIdx.html(htmlIdxs);
        this.$ULIdx.children(":first").addClass("hover");
    },

    //自动轮播
    autoMove(){
        this.moved++;
        //bug  2  delay到达

        // this.$ULIMAGS.delay(this.WAIT).animate({
        this.$ULIMAGS.delay(this.WAIT).animate({
            left:-this.moved*this.LIWIDTH,

        },this.DURATION,function () {
            if(this.moved==imgs.length){
                this.moved=0;
                this.$ULIMAGS.css("left",0);
            }
            this.$ULIdx.children().eq(this.moved).addClass("hover")
                .siblings().removeClass("hover");
            this.autoMove();
        }.bind(this));
    },

    //自动轮播结束

    init(){
        var me=this;
        this.$ULIMAGS=$("#imgs");
        this.$ULIdx=$("#indexs");
        this.initeView();/*初始化*/
        this.autoMove()/*启动轮播*/
        //当鼠标进入slide的时候停止轮播，出去继续播放
        $("#slider").hover(function () {
            me.$ULIMAGS.stop(true);
        },function () {
            me.autoMove();
        });
        //为ulimgs添响应事件加鼠标监听，只允许img响应
        this.$ULIMAGS.on("mouseover","li>img",function (e) {
            var $tar=$(e.target);
            var i=$tar.index("#imgs img");
            console.log(i);
            me.moved=i;
            //bug  1
            me.moved>=imgs.length&&(me.moved=0);
            me.$ULIMAGS.css("left",-me.moved*me.LIWIDTH);
            me.$ULIdx.children().eq(me.moved).addClass("hover")
                .siblings().removeClass("hover");
        });

    //    手动轮播
        me.$ULIdx.on("mouseover","li",function (e) {
            var $tar=$(e.target);
            if(!$tar.is(".hover")){
                var endi=$tar.index("#indexs>li");
                var starti=$(".hover").index("#indexs>li");
                me.moved+=(endi-starti);
                console.log(me.moved);
                me.$ULIdx.children().eq(me.moved).addClass("hover")
                    .siblings().removeClass("hover");
                me.$ULIMAGS.stop(true).animate({
                    left:-me.moved*me.LIWIDTH,
                },me.DURATION,function () {

                })
            }
        })
    //    手动轮播结束
    },
};
slide.init();