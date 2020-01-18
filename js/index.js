
$(function () {
    // 公告栏向上走
    new Notice().init();
    // 导航栏固定
    new NavFixed().init();
    // 子菜单的显示与隐藏
    new SubMenu().init();
    // 轮播图
    new Banner().init();
    // 鼠标移入照片显示阴影
    new ImgShadow().init();
    //点击去详情页
    new Detail().init();
})



// 公告栏向上移动
class Notice {
    constructor() {
        this.NoticeUl = $("#noticeUl");
    }
    init() {
        //  公告栏自动播放
        this.noticeAutoPlay();
    }
    noticeAutoPlay() {
        var _this = this;
        function autoPlay() {
            _this.NoticeUl.css("position", "absolute").animate({ top: -30 }, 800, function () {
                _this.NoticeUl.css("top", "0")
            });
        }
        setInterval(autoPlay, 2000);
    }
}
// 导航栏固定
class NavFixed {
    constructor() {
        this.window = $(window);
        this.document = $(document);
        this.topAction = $(".top-action");
        this.stop = null;

    }
    init() {
        this.navMoveFixed();
    }
    navMoveFixed() {
        var _this = this;
        this.window.scroll(function () {
            _this.stop = _this.document.scrollTop();
            if (_this.stop > 602) {
                _this.topAction.addClass("fixed").stop().animate({ "top": -30 }, 500);

            } else if (_this.stop < 602 || _this.stop == 0) {
                _this.topAction.removeClass("fixed").removeAttr("style");
            }
        })


    }
}
// 子级菜单的展开
class SubMenu {
    constructor() {
        this.allClass = $(".all-class");
        this.iArrbot = $(".i-arrbot");
        this.topSubmenu = $(".top-submenu");

    }
    init() {
        this.SubMenuShow();
    }
    SubMenuShow() {
        var _this = this;
        this.allClass.hover(function () {
            _this.topSubmenu.css("display", "block");
            _this.iArrbot.css("background-position", "-100px -2px");
        }, function () {
            _this.topSubmenu.css("display", "none");
            _this.iArrbot.css("background-position", "-66px -2px");

        });
        this.topSubmenu.hover(function () {
            $(this).css("display", "block");
            _this.iArrbot.css("background-position", "-100px -2px");
        }, function () {
            $(this).css("display", "none");
            _this.iArrbot.css("background-position", "-66px -2px");
        })


    }
}
// 轮播图
class Banner {
    constructor() {
        this.index = 0;
        this.img = $(".slidebann a");
        this.slidebannRect = $(".slidebann .fl");

    }
    init() {
        this.banAutoplay();

    }
    banAutoplay() {
        var _this = this;
        function autoPlay() {
            if (_this.index === 3) {
                _this.index = 0;
            } else {
                _this.index++;
            }
            _this.img.eq(_this.index).css("display", "block").siblings("a").css("display", "none");
            _this.slidebannRect.eq(_this.index).css("background", "#ffc933").siblings().css("background", "rgba(255,255,255,0.2)");
        }
        setInterval(autoPlay, 2000);
    }
}
// 商品图片鼠标滑入向上浮动
class ImgShadow {
    constructor() {
        this.imgLi = $(".goods-list li");
        this.bigImgLi = $(".photo-list li");

    }
    init() {
        this.mouserMoveShadom();
    }
    mouserMoveShadom() {
        this.imgLi.hover(function () {
            $(this).css("box-shadow", "0px 8px 26px rgb(223, 215, 244)");
        }, function () {
            $(this).css("box-shadow", "0px 0px 0px rgb(225, 219, 240)");
        })
        this.bigImgLi.hover(function () {
            $(this).css("box-shadow", "0px 6px 20px #888888");
        }, function () {
            $(this).css("box-shadow", "0px 0px 0px rgb(225, 219, 240)");
        })
    }
}
// 点击去详情页
class Detail {
    constructor() {
        this.goodsLi = $(".goods-list li");

    }
    init() {
        this.clickGoodsLi();
    }
    clickGoodsLi() {
        this.goodsLi.click(function () {
            console.log($(this))
        })
    }
}
// 统计购物车数量