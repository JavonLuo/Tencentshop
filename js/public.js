//封装一个函数，功能是判断一个数是否是素数，如果是素数结果返回true,如果不是素数结果返回false
function isPrime(num){
	//如果num 不是一个数字，或是0 或是1 返回false
	if(isNaN(num) || num == 0 || num == 1) return false;
	//如果执行了上面的代码程序不会走到这里
	//如果程序走到这里，说明num不是以上的三种情况。
	for (var i = 2; i < num; i++) {
		if(num % i == 0){
			//程序执行这里，说明num不是素数
			return false;
		}
	}
	//如果程序不执行上面的for循环，说明num是一个素数
	return true;
}
//通过id名称获取元素对象
function $id(idName){
	return document.getElementById(idName);
}
//获取min到max间的随机整数
function getRand(min,max){
	return parseInt(Math.random()*(max-min+1)+min);
}
//获取六位十六进制颜色值
function getColor(){
	var str = "0123456789abcdef";
	var rand = 0;
	var color = "#";
	//随机获取六个字符
	for (var i = 0; i < 6; i++) {
		//获取一个0-15的随机整数作为str的下标使用
		rand = getRand(0,15);
		//拼接成一个带#号的字符串
		color += str.charAt(rand);
	}
	return color;
}

//时间本地化
function dateToString(date){
	var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	var w = date.getDay();
	return y + "年" + toDB(m) + "月" + toDB(d) + "号 " + toDB(h) + ":" + toDB(f) + ":" + toDB(s) + " " + week[w];
}
//个位数前加0
// 个位数 < 10
function toDB(num){
	return num < 10 ? "0" + num : num;
}

//获取时间差的秒数
function getDifTime(startTime,endTime){
	return (endTime.getTime() - startTime.getTime()) / 1000;
}
//根据键获取查询串的对应的值
function getSearchByKey(key){
	//获取href
	//var seachStr = location.href;
	//获取查询串
	var searchStr = decodeURIComponent(location.search);
	if(!!searchStr){
		//存在查询串
		//使用key来查看查询串中是否存在
		if(searchStr.indexOf(key) != -1){
			//只要执行到这里说明这个key就是我们需要的
			//"?uname=周哥&age=19"
			//var keyStr = searchStr.substring(searchStr.indexOf(key))
			var arr = searchStr.split("?")[1].split("&");
			//console.log(searchStr.split("?")[1].split("&"))
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].split("=")[0] === key){
					return arr[i].split("=")[1];
				}
			}
		}
	}
	return "";
}
//兼容18实现通过class名称获取所有元素对象集合
function getElesByClassName(cName){
	var eleArr = [];//元素对象集合
	//先获取页面所有的元素对象集合
	var eles = document.getElementsByTagName("*");
	//遍历所有的元素
	for (var i = 0; i < eles.length; i++) {
		//判断每一个元素的className是否与cName相等
		if(eles[i].className === cName){
			//如果相等，把这个元素对象添加到一个数组中
			eleArr.push(eles[i]);
		}
	}
	//返回这个数组
	return eleArr;
}

//兼容ie8下获取所有子元素节点
//获取当前节点下的所有节点，
//遍历这些子节点
//判断每一个节点 的节点类型nodeType
//如果节点类型是1把这些节点保存在一个新的数组中返回
function getAllChildren(supNode){
	var nodes = supNode.children;
	var nodeList = [];
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].nodeType === 1){
			nodeList.push(nodes[i]);
		}
	}
	return nodeList;
}

//封装一个方法，将新节点插入到目标节点的后面
function insertAfter(newNode,targetNode){
	//检测目标节点是不是这个最后一个子节点
	//如果是，使用appendChild将新节点插入到父节点的最后
	//如果不是，说明目标节点还有下一个兄弟元素节点，使用insertBefor将新节点插入到下一个兄弟元素节点的前面
	var pNode = targetNode.parentNode;
	var child = getAllChildren(pNode);
	//console.log(child);
	if(child[child.length-1] === targetNode){//是最后一个子元素节点
		pNode.appendChild(newNode);
	}else{
		pNode.insertBefore(newNode,targetNode.nextElementSibling);
	}
}
//随机获取num位验证码
function getYZM(num){
	//验证由数字，大小写字母
	//获取num个数字或字母拼接成一个字符串
	var rand = 0;
	var ch = "";
	var yzm = "";
	for (var i = 0; i < num; i++) {
		//获取从48-122的随机数
		rand = getRand(48,122);
		//排除58-64和91-96
		if(rand >= 58 && rand <= 64 || rand >= 91 && rand <= 96){
			i--;
		}else{
			//通过这个随机数获取对应的字符
			ch = String.fromCharCode(rand);
			yzm += ch;
		}
	}
	return yzm;
}

//事件 对象相关属性和方法的兼容封装
/*var eventList = {
	getEvent:function(eve){
		return eve || event;
	}
}*/
function eventList(){
	var stop = document.documentElement.scrollTop;//兼容性
	var sLeft = document.documentElement.scrollLeft;//兼容性
	return {
		getEvent:function(eve){
			return eve || event;
		},
		getPage:function(eve){
			eve = this.getEvent(eve);
			return{
				x:eve.pageX || eve.clientX + sLeft,
				y:eve.pageY || eve.clientY + stop
			}
		},
		stopDefault:function(e){
			if(!!e.preventDefault){//true 现代浏览器
				e.preventDefault();
			}else{//ie8
				e.returnValue = false;
			}
		},
		stopProp:function(e){
			if(e.stopPropagation){//现代浏览器
				e.stopPropagation();
			}else{//ie8
				e.cancelBubble = true;
			}
		}
	}
}
//兼容ie8获取button属性
function getButton(eve){
	//如果判断 是现代浏览器还是ie8
	if(!!eve){
		//eve存在是现代浏览器
		return eve.button;
	}else{
		//ie8
		var but = window.event.button;
		switch(but){
			case 1 :
				return 0;
			case 4 :
				return 1;
			case 2 :
				return 2;
		}
	}
}
//兼容ie8实现事件监听
function addEvent(obj,event,callBack,flag){
	if(!!obj.addEventListener){//现代浏览器
		obj.addEventListener(event,callBack,flag);
	}else{//ie8
		obj.attachEvent("on"+event,callBack);
	}
};
//兼容ie8实现解除事件监听
function removeEvent(obj,event,callBack){
	if(!!obj.removeEventListener){//现代浏览器
		obj.removeEventListener(event,callBack);
	}else{//ie8
		obj.detachEvent("on"+event,callBack);
	}
};

//兼容ie8实现获取浏览器渲染的一元素样式值。
function getStyle(obj,attr){
	if(!!window.getComputedStyle){//现代浏览器
		return window.getComputedStyle(obj,null)[attr];
	}
	//ie8
	return obj.currentStyle[attr];
}

//身份证验证
function checkIdCode(idCode){
	var idCodeReg = /^[1-9]\d{5}((18|19|20)\d{2}|2100)(0[1-9]|1[0-2])(0[1-9]|(1|2)\d|(30|31))\d{3}(X|\d)$/;
	if(idCodeReg.test(idCode)){
		//判断平年闰年 大月小月
		//获取idCode的年份
		var y = idCode.substr(6,4);
		//获取idCode的月份
		var m = idCode.substr(10,2);
		//获取idCode的日期
		var d = idCode.substr(12,2);
		//console.log(y,m,d)
		switch(m){
			case "04":
			case "06":
			case "09":
			case "11":
				if(d > 30){
					return false;
				}
				break
			case "02":
				if(y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
					if(d > 29){
						return false;
					}
				}else{
					if(d > 28){
						return false;
					}
				}	
		}
		return true;
	}
	return false;
}

//碰撞函数
function isPZ(ele1,ele2){
	var rect1 = getRect(ele1);
	var rect2 = getRect(ele2);
	var r1L = rect1.left;
	var r1R = rect1.right;
	var r1T = rect1.top;
	var r1B = rect1.bottom;
	
	var r2L = rect2.left;
	var r2R = rect2.right;
	var r2T = rect2.top;
	var r2B = rect2.bottom;
	
	if(r1L > r2R || r1R < r2L || r1T > r2B || r1B < r2T){
		return false;
	}
	return true;
}
//兼容ie7二像素问题
function getRect(obj){
	var rect = obj.getBoundingClientRect();
	var w = document.documentElement.clientLeft;
	
	return {
		left:rect.left - w,
		right:rect.right - w,
		top : rect.top - w,
		bottom:rect.bottom - w
	}
}
