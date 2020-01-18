<?php
include("public.php");
// $accountNum = $_POST["accountNum"];
// $upwd = $_POST["pwd"];
// echo $accountNum;
if(empty($_POST["pwd"])){
   $accountNum = $_GET["accountNum"];
   $asql = "SELECT accountNum FROM `user` WHERE accountNum = '$accountNum'";
   $result = getConnect("tencentshop",$asql);
   $accountArr = mysqli_fetch_array($result);
   if($accountArr){
    //    返回0代表账号已经存在
       echo 0;
   }else{
    //    返回1代表账号未存在
       echo 1;
   }
}else{
   $upwd = $_POST["pwd"];
   $accountNum = $_POST["accountNum"];
   $uname = $_POST["uname"];
   $insersql = "INSERT INTO `user`( `uname`, `accountNum`, `upwd`) VALUES ('$uname','$accountNum','$upwd')";
   $row =  getConnect("tencentshop",$insersql);
   if(!!$row){
    //    返回1表示插入数据库成功。注册成功
       echo 1;
   }else{
    //    返回0表示插入失败，注册失败。
       echo 0;
   }

}


?>