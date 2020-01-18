$(function () {
    new login().init();
    new register().init();
})

// 登录
class login {
    constructor() {
        this.login = $("#login");
        this.register = $("#register");
        this.zheZhao = $("#zheZhao");
        this.loginWarp = $("#login_warp");
        this.midQQ = $(".mid_qq");
        this.midWechat = $(".mid_wechat");
        this.close = $("#close_lgin");
        this.QQ = $(".QQ");
        this.weChat = $(".wechat");
        this.midQQ = $(".mid_qq");
        this.midWeChat = $(".mid_wechat");
        this.icoQ = $(".ico-q");
        this.icoW = $(".ico-w");
        this.loginBtn = $(".loginBtn");
        this.accountNum = $(".account_num");
        this.upwd = $(".pwd");
        this.d = null;
        this.date = null;
        this.loginJson = null;
        this.loginAgo = $(".login_ago");
        this.loginAfter = $(".login_after");
        this.token = null;
        this.username = null;
        this.cartNum = $(".cart-num");

    }
    init() {
        //显示登录框
        this.showLogin();
        //登录框随窗口大小的变化位置变化
        this.windowResize();
        //关闭登录框
        this.closeLoginWarp();
        //登录框头部点击变换
        this.loginHeadCSS();
        //是否是自动登录
        this.isAutoLogin();
        //登录操作
        this.toLogin();
    }
    showLogin() {
        var _this = this;
        this.login.click(function () {
            _this.zheZhao.show();
            _this.loginWarp.show();
            _this.setPosition();
        })
    }
    setPosition() {
        this.zheZhao.css({
            // 调整遮罩的位置
            width: $(window).innerWidth(),
            height: $(window).innerHeight()
        });
        this.loginWarp.css({
            //调整登录框的位置
            left: function () {
                return ($(window).innerWidth() - $(this).outerWidth()) / 2;
            },
            top: function () {
                return ($(window).innerHeight() - $(this).outerHeight()) / 2;
            }
        })
    }
    loginHeadCSS() {
        var _this = this;
        this.QQ.click(function () {
            $(this).css({
                background: "#31a4f6",
                color: "#fff",
            })
            _this.icoQ.css("background-position", "-3px -15px");
            _this.icoW.css({
                backgroundPosition: "-153px -16px",
            })
            _this.weChat.css({
                color: "#c0c0c0",
                background: "#f1f1f1"
            })
            _this.midQQ.show();
            _this.midWeChat.hide();
        });
        this.weChat.click(function () {
            $(this).css({
                background: "#31a4f6",
                color: "#fff",
            })
            _this.icoQ.css("background-position", "-45px -15px");
            _this.icoW.css({
                backgroundPosition: "-100px -16px",
            })
            _this.QQ.css({
                color: "#c0c0c0",
                background: "#f1f1f1"
            })
            _this.midWeChat.show();
            _this.midQQ.hide();
        });

    }
    windowResize() {
        var _this = this;
        $(window).resize(function () {
            _this.setPosition()
        })
    }
    closeLoginWarp() {
        this.close.click(function () {
            this.loginWarp.hide();
            this.zheZhao.hide();
        }.bind(this));
    }
    isAutoLogin() {
        var _this = this;
        this.token = getCookieByName("token");
        this.username = getCookieByName("username");
        if (!!this.token && !this.username) {//有token并且没有登录的情况下才需要自动登录
            //自动登录 
            location.href = "lib/login.php";
        }
        if (!!this.username) {
            this.loginAgo.css("display", "none");
            // 显示用户信息
            this.loginAfter.html("欢迎您：" + this.username).css({ "display": "block", "color": "#e86312" });
            // 统计购物车数量
            $.ajax({
                type: "GET",
                url: "lib/cart.php",
                success: function (res) {
                    var resArr = JSON.parse(res);
                    _this.cartNum.html(resArr.length);
                }
            })

        }

    }
    toLogin() {
        var _this = this;
        this.loginBtn.click(function () {
            _this.date = new Date();
            _this.d = new Date().getTime();
            _this.date.setDate(_this.date.getDate() + 10);
            setCookie("token", _this.d, _this.date, "/MyCode/Second/Project");
            $.ajax({
                type: "POST",
                url: "lib/login.php",
                data: {
                    accountNum: _this.accountNum.val(),
                    pwd: _this.upwd.val()
                },
                success: function (res) {
                    _this.loginJson = JSON.parse(res);
                    if (_this.loginJson.id === "1") {
                        alert("登录成功")
                        _this.zheZhao.hide();
                        _this.loginWarp.hide();
                        _this.loginAgo.css("display", "none");
                        _this.loginAfter.html("欢迎您：" + _this.loginJson.uname).css({ "display": "block", "color": "#e86312" });
                        // 统计购物车数量
                        $.ajax({
                            type: "GET",
                            url: "lib/cart.php",
                            success: function (res) {
                                var resArr = JSON.parse(res);
                                _this.cartNum.html(resArr.length);
                            }
                        })
                    } else if (res === '0') {
                        alert('密码错误')
                    } else if (res === "-1") {
                        alert('用户名不存在')
                    }
                }

            })

        })

    }
}
// 注册
class register {
    constructor() {
        this.registerWarp = $("#register_warp");
        this.zheZhao = $("#zheZhao");
        this.register = $("#register");
        this.close = $("#close_res");
        this.registerNub = $(".reg_nub");
        this.registerPwd = $(".reg_pwd");
        this.registerName = $(".name_reg");
        this.pwdAgain = $(".pwd_again");
        this.btnReg = $(".btn_reg");
        this.regNub = /^[1-9][0-9]{4,}$/;
        this.regPwd = /^[a-zA-Z]\w{5,17}$/;
        this.nubFlag = null;
        this.pwdFlag = null;
        this.nubTips = $(".nub_tips");
        this.pwdTips = $(".pwd_tips");
        this.againPwdTips = $(".againpwd_tips");
        this.nameTips = $(".name_tips");
    }
    init() {
        //显示注册框
        this.registerWarpShow();
        //位置随浏览器大小改变
        this.windowResize();
        // //关闭注册框
        this.closeregisterWarp();
        //验证
        this.yanZheng();
        //注册操作
        this.toRegister();
    }
    registerWarpShow() {
        var _this = this;
        this.register.click(function () {
            _this.zheZhao.show();
            _this.registerWarp.show();
            _this.setPosition();
        })
    }
    setPosition() {
        this.zheZhao.css({
            // 调整遮罩的位置
            width: $(window).innerWidth(),
            height: $(window).innerHeight()
        });
        this.registerWarp.css({
            //调整注册框的位置
            left: function () {
                return ($(window).innerWidth() - $(this).outerWidth()) / 2;
            },
            top: function () {
                return ($(window).innerHeight() - $(this).outerHeight()) / 2;
            }
        })
    }
    windowResize() {
        var _this = this;
        $(window).resize(function () {
            _this.setPosition()
        })
    }
    closeregisterWarp() {
        this.close.click(function () {
            this.registerWarp.hide();
            this.zheZhao.hide();
        }.bind(this));
    }
    // 验证信息
    yanZheng() {
        var _this = this;
        // 验证账号的格式
        this.registerNub.blur(function () {

        })
        // 验证账号是否唯一
        this.registerNub.blur(function () {
            _this.nubFlag = _this.regNub.test(_this.registerNub.val())
            if (!_this.nubFlag) {
                _this.nubTips.html("账号必须是数字5位以上、首位不为0").css({ 'color': 'red', "display": "inline" });
            } else {
                $.ajax({
                    type: "GET",
                    url: "lib/register.php",
                    data: {
                        accountNum: _this.registerNub.val(),
                    },
                    success: function (res) {
                        if (res === "1") {
                            _this.nubTips.html("账号可用").css({ 'color': 'green', "display": "inline" });
                        } else if (res === "0") {
                            _this.nubTips.html("账号已存在").css({ 'color': 'red', "display": "inline" });
                        }
                    }
                })
            }

        })
        // 验证密码格式
        this.registerPwd.blur(function () {
            _this.pwdFlag = _this.regPwd.test(_this.registerPwd.val())
            if (_this.pwdFlag) {
                _this.pwdTips.html("密码可用").css({ 'color': 'green', "display": "inline" });
            } else {
                _this.pwdTips.html("以字母开头，6~18位，包含数字字母下划线").css({ 'color': 'red', "display": "inline" });
            }

        });
        //验证重复输入密码是否一致
        this.pwdAgain.blur(function () {
            if (_this.pwdAgain.val() === '') {
                _this.againPwdTips.css({ "display": "none" });
            } else if (_this.pwdAgain.val() === _this.registerPwd.val()) {
                _this.againPwdTips.html("密码一致").css({ 'color': 'green', "display": "inline" });
            } else {
                _this.againPwdTips.html("两次密码不一致").css({ 'color': 'red', "display": "inline" });

            }

        });
        // 验证昵称不能为空
        this.registerName.keyup(function () {
            if (_this.registerName.val() !== "") {
                _this.nameTips.html("昵称可用").css({ 'color': 'green', "display": "inline" });
            } else {
                _this.nameTips.html("昵称不能为空").css({ 'color': 'red', "display": "inline" });
            }

        })


    }
    // 点击注册操作
    toRegister() {
        // 点击注册事件
        var _this = this;
        this.btnReg.click(function () {
            if (_this.registerName.val() === "") {
                _this.nameTips.html("昵称不能为空").css({ 'color': 'red', "display": "inline" });
            } else if (_this.pwdFlag && _this.nubFlag && _this.pwdAgain.val() === _this.registerPwd.val()) {
                $.ajax({
                    type: "POST",
                    url: "lib/register.php",
                    data: {
                        accountNum: _this.registerNub.val(),
                        pwd: _this.registerPwd.val(),
                        uname: _this.registerName.val()
                    },
                    success: function (res) {
                        console.log(res);
                        if (res === "1") {
                            alert("恭喜您！注册成功");
                            _this.registerWarp.hide();
                            _this.zheZhao.hide();
                        } else if (res === "0") {
                            alert("注册失败！");
                        }
                    }
                })
            } else {
                alert("请输入正确的用户名或者密码");
            }
        })
    }

}