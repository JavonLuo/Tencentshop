//获取cookie
function getCookieByName(key){
	//没有cookie信息返回空
	if(!document.cookie) return "";
	//var cStr = document.cookie;
	//判断key是否存在
	/*if(cStr.indexOf(key) != -1){//这种判断 不严谨，因为有可以value中有key,name没有key
		
	}*/
	var cArr = document.cookie.split("; ");
	//console.log(cArr);//["age=19", "userName=jerry", "username=张三"]
	for (var i = 0; i < cArr.length; i++) {
		if(cArr[i].split("=")[0] === key){
			return decodeURIComponent(cArr[i].split("=")[1]).trim();
		}
	}
	return "";
}
//123
//设置一个cookie
function setCookie(key,value,date,path){
	//没有传递有效期
	//没有传递路径
	//传递了路径，没有传递有效期
	if(!!date && !(date instanceof Date)){
		path = date;
		date = undefined;
	}
	document.cookie = key + "=" + value + ";expires=" + date + ";path=" + path;
}

//删除cookie封装
function removeCookie(key,path){
	document.cookie = key+"=;expires=" + new Date(0) + ";path=" + path;
}