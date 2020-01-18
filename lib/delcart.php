<?php
include("public.php");
$name = $_GET["name"];
$delsql = "DELETE FROM `cartgoods` WHERE name = '$name'";
$row =  getConnect("tencentshop",$delsql);
if(!!$row){
 //    返回1表示删除成功
    echo 1;
}else{
 //    返回0表示删除失败。
    echo 0;
}




?>