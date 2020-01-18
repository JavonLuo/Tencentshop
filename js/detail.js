$(function () {
    // 更新页面信息
    new PageUpdate().init();
    // 点击显示对应图片和放大镜
    new ShowPhoto().init();
    // 加入购物车
    new JoinCartGoods().init();

})

// 点击显示对应图片
class ShowPhoto {
    constructor() {
        this.picShow = $(".picshow");
        this.picShowImg = $(".picshow img");
        this.picDetailListLi = $(".picdetail-list li");
        this.mask = $("#mask");
        this.bigPicShow = $(".bigPicShow");
        this.bigImg = $("#bigImg");
    }
    init() {
        this.clickMinPic();
        this.mouserMove();

    }
    clickMinPic() {
        var _this = this;
        this.picDetailListLi.click(function () {
            _this.picShowImg.attr("src", "images/minPhotoGood" + ($(this).index() + 1) + ".jpg");
        })
    }
    // 放大镜
    mouserMove() {
        var _this = this;
        this.picShow.hover(function () {
            _this.mask.show();
            _this.bigPicShow.show();
            _this.movePosition();
        }, function () {
            _this.mask.hide();
            _this.bigPicShow.hide();
        })

    }
    movePosition() {
        var _this = this;
        this.picShow.mousemove(function (eve) {
            var e = eve || event;
            var l = e.pageX - this.offsetLeft - _this.mask.width() / 2;
            var t = e.pageY - this.offsetTop - _this.mask.height() / 2;
            //console.log(this.offsetTop)
            // 边界处理
            var maxL = this.clientWidth - mask.offsetWidth;
            var maxT = this.clientHeight - mask.offsetHeight;
            l = l < 0 ? 0 : (l > maxL ? maxL : l);
            t = t < 0 ? 0 : (t > maxT ? maxT : t);
            _this.mask.css("left", l);
            _this.mask.css("top", t);
            var L = l * (_this.picShowImg.width() - _this.mask.width()) / (_this.bigImg.width() - _this.bigPicShow.width());
            var T = t * (_this.picShowImg.height() - _this.mask.height()) / (_this.bigImg.height() - _this.bigPicShow.height());
            _this.bigImg.css("left", -L);
            _this.bigImg.css("top", -T);


        })
    }
}
class JoinCartGoods{
    constructor(){
        this.cartNum = $(".cart-num");
        this.joinCartBtn = $(".joincart-btn");
        this.goodsName = $(".pord-name");
        this.goodsPri = $("#pordPri");
        this.goodsImg = $("#goodsImg");

    }
    init(){
          this.clickJoin();
        
    }
    clickJoin(){
        var _this = this;
        this.joinCartBtn.click(function(){
            $.ajax({
                type:"GET",
                url:"lib/joinCart.php",
                data:{
                    name:_this.goodsName.html(),
                    price:_this.goodsPri.html(),
                    src:_this.goodsImg.attr("src").substr(7)
                },
                success:function(res){
                    if(res === "1"){
                        _this.cartNum.html(parseInt(_this.cartNum.html())+1);

                    }

                }
            })
        })

    }
}
//获取显示商品
class PageUpdate{
    constructor(){
        this.pordName = $(".pord-name");
        this.pordPri = $("#pordPri");
        this.goodsImg = $("#goodsImg");
        this.bigImg = $("#bigImg");

    }
    init(){
        console.log(getSearchByKey("id"))
        var _this = this;
        $.ajax({
            type: "GET",
            url: "lib/detail.php",
            data:{
                id:getSearchByKey("id")
            },
            success: function (res) {
                var resArr = JSON.parse(res);
                 console.log(resArr)
                _this.pordName.html(resArr[0].name);
                _this.pordPri.html(resArr[0].price);
                _this.goodsImg.attr("src","images/"+resArr[0].src);
                _this.bigImg.attr("src","images/"+resArr[0].src);
            }
        })
    }
}





