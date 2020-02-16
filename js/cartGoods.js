$(function () {
    new CartGoods().init();
})

class CartGoods {
    constructor() {
        this.cartTb = $(".mycart-tb");
        this.SettLement = $(".mycart-tb-btn");
        this.goodsList = $(".mycart-list");
        this.Allcheck = null;
        this.goodsCheck = null;
        this.cartItemImg = null;
        this.cartItemName = null;
        this.cartItemPri = null;
        this.oneGoodsNum = null;
        this.btnCartCut = null;
        this.btnCartAdd = null;
        this.oneTotalPri = null;
        this.btnDel = null;
        this.totalNum = $(".total");
        this.totalPri = $(".money");
    }
    init() {
        this.goodsShow();
        this.clickSettlement();
    }
    // 重新获取页面节点
    getDomNode() {
        this.goodsList = $(".mycart-list");
        this.Allcheck = $(".cartcheck");
        this.goodsCheck = $(".goodscheck");
        this.cartItemImg = $(".mycart-item-img img");
        this.cartItemName = $(".mycart-item-name a");
        this.cartItemPri = $(".mycart-item-per");
        this.oneGoodsNum = $(".inpt_cart_list_buy_num");
        this.btnCartCut = $(".btn_cart_list_buy_min");
        this.btnCartAdd = $(".btn_cart_list_buy_plus");
        this.oneTotalPri = $(".mycart-item-price");
        this.btnDel = $(".btn-del");
    }
    // 初始化显示购物车商品
    goodsShow() {
        var _this = this;
        // 显示占位来克隆
        this.goodsList.css('display', 'block');
        $.ajax({
            type: "GET",
            url: "lib/cart.php",
            success: function (res) {
                var resArr = JSON.parse(res);
                // console.log(resArr)
                for (var i = 0; i < resArr.length; i++) {
                    _this.goodsList.eq(0).clone(true).insertBefore(_this.cartTb);
                    _this.getDomNode();
                    _this.cartItemImg.eq(i + 1).attr("src", "images/" + resArr[i].src);
                    _this.cartItemName.eq(i + 1).html(resArr[i].name);
                    _this.cartItemPri.eq(i + 1).html(resArr[i].price);
                    _this.oneTotalPri.eq(i + 1).html(resArr[i].price);
                }
                // 最后再隐藏占位
                _this.goodsList.eq(0).css('display', 'none');
                // 选中所有
                _this.clickAllCheck();
                // 选中单个
                _this.clickOneCheck();
                // 增加一件商品
                _this.addClick();
                // 减少一件商品
                _this.cutClick();
                // 计算单个商品总价
                _this.computNum();
                // 单击删除商品
                _this.clickDelGoods();

            }
        })

    }
    // 点击选中所有的
    clickAllCheck() {
        var _this = this;
        this.Allcheck.click(function () {
            if ($(this).attr("class").indexOf("checked") == -1) {
                $(this).addClass("checked");
                _this.goodsCheck.addClass("checked");
                // 给占位的删除这个class属性值，下面单选判断
                _this.goodsCheck.eq(0).removeClass("checked");

            } else {
                $(this).removeClass("checked");
                _this.goodsCheck.removeClass("checked");
            }

            _this.computeTalPri();
            _this.computCheckedNum();

        })


    }
    // 单击单个选中
    clickOneCheck() {
        var _this = this;

        this.goodsCheck.click(function () {
            var i = 0;//程序监听变量
            if ($(this).attr("class").indexOf("checked") == -1) {
                $(this).addClass("checked");
            } else {
                $(this).removeClass("checked");
            }
            $(".goodscheck").each(function (index, ele) {
                //  不等于-1说明选中
                if ($(ele).attr("class").indexOf("checked") != -1) {
                    i++;
                }
            })
            // 如果length-1是因为除去文档中一个隐藏的占位
            if (i == ($(".goodscheck").length - 1)) {
                _this.Allcheck.addClass("checked");
            } else {
                _this.Allcheck.removeClass("checked");

            }
            // 重新获取节点
            _this.getDomNode();
            // 统计获取商品的总件数
            _this.computCheckedNum();
            // 统计选中商品的总价格
            _this.computeTalPri();


        })

    }
    // 单机减少商品
    cutClick() {
        // _this指向实例对象
        var _this = this;
        this.btnCartCut.click(function () {
            // __this指向事件对象
            // var __this = this;
            var oNum = parseInt($(this).parent().find(".inpt_cart_list_buy_num").val())
            if (oNum == 1) {
                var flag = confirm("是否要删除此商品？");
                if (flag) {
                    _this.delGoods(this);
                }

            } else {
                $(this).parent().find(".inpt_cart_list_buy_num").val(oNum - 1);
                oNum--;
                // 计算单个商品总价
                _this.computNum(this, oNum);
                // 计算选中商品总价
                _this.computeTalPri();
                // 计算选中商品件数
                _this.computCheckedNum();

            }

        })
    }
    // 单击增加商品
    addClick() {
        var _this = this;
        this.btnCartAdd.click(function () {
            var oNum = parseInt($(this).parent().find(".inpt_cart_list_buy_num").val())
            $(this).parent().find(".inpt_cart_list_buy_num").val(oNum + 1);
            oNum++;
            _this.computNum(this, oNum);
            _this.computeTalPri();
            _this.computCheckedNum();


        })
    }
    // 计算单个商品总价
    computNum(obj, oNum) {

        var pri = $(obj).parent().parent().parent().find(".mycart-item-per").html();
        $(obj).parent().parent().parent().find(".mycart-item-price").html(oNum * pri + ".00");


    }
    // 计算选中商品的总价格
    computeTalPri() {
        var totalPri = 0;
        $('.mycart-item-price').each(function (index, ele) {
            if ($(ele).parent().parent().find(".goodscheck").attr("class").indexOf("checked") != -1) {
                totalPri += parseInt($(ele).html());
            }
        })
        this.totalPri.html(totalPri);
    }
    // 计算选中商品的件数
    computCheckedNum() {
        var checkedNum = 0;
        $('.inpt_cart_list_buy_num').each(function (index, ele) {
            if ($(ele).parent().parent().parent().find(".goodscheck").attr("class").indexOf("checked") != -1) {
                checkedNum += parseInt($(ele).val());
            }
        })
        this.totalNum.html(checkedNum);
    }
    // 删除商品
    delGoods(obj) {
        $.ajax({
            type: "GET",
            url: "lib/delcart.php",
            data: {
                name: $(obj).parent().parent().parent().find(".mycart-item-name a").html()
            },
            success: function (res) {
                if (res === "1") {
                    alert("删除成功！")
                    // 删除成功，更新页面
                    document.write("<script>location.href='cart.html'</script>")
                } else {
                    alert("删除失败")
                }

            }
        })

    }
    // 点击删除商品
    clickDelGoods() {
        var _this = this;
        this.btnDel.click(function () {
            _this.delGoods(this);
        })
    }
    // 点击结算
    clickSettlement() {
        this.SettLement.click(function(){
            var flag = confirm("检测到前往第三方支付平台，是否继续？");
            if(flag){
                alert("有内鬼，终止交易！")
            }
        })


    }

}


