<?php
include("public.php");
$name = $_GET["name"];
$price = $_GET["price"];
$src = $_GET["src"];

$insersql = "INSERT INTO `cartgoods`( `name`, `price`, `src`) VALUES ('$name','$price','$src')";
$row =  getConnect("tencentshop",$insersql);
if(!!$row){
 //    返回1表示插入数据库成功。
    echo 1;
}else{
 //    返回0表示插入失败。
    echo 0;
}




?>