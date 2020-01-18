<?php
include("public.php");
if(empty($_POST["accountNum"])){
    
    $token = $_COOKIE["token"];
    $tokenlogin = "select uname from user where token = '$token'";
    $tokenresult = getConnect("tencentshop",$tokenlogin);
    $tarr = mysqli_fetch_array($tokenresult);

    if($tarr){
     //设置cookie信息   登录
     setCookie("username",$tarr["uname"],null,"/MyCode/Second/Project");
    //  echo "<script>alert('自动登录成功');location.href= '../index.html'</script>";
      echo "<script>location.href= '../index.html'</script>";

    }else{
        //登录失败
        //删除原来的cookie中的token信息
        setCookie("token","",time(),"/MyCode/Second/Project");
        //登录失败
        echo "<script>location.href='../index.html';</script>";
    
    }
 }else{
 
     $accountNum = $_POST["accountNum"];
     $upwd = $_POST["pwd"];
     $sql = "select * from user where accountNum = '$accountNum'";
     $result = getConnect("tencentshop",$sql);
     $userArr = mysqli_fetch_array($result);
     if(!!$userArr){//用户名存在
         if($userArr["upwd"] === $upwd){
             $userobj = array("id"=>"1","uname"=>$userArr["uname"]);
                 //$tsql = "UPDATE `user` SET `token`=`upwd`='' WHERE 1";
                 $tokenSql = "UPDATE user SET token = '".$_COOKIE["token"]."' WHERE accountNum = '$accountNum'";
                 getConnect("tencentshop",$tokenSql);
                 echo json_encode($userobj);

             }else{
                //  密码错误
                 echo 0;
            
             }
         }else{
            //  用户名不存在
             echo -1;
         }
    }


?>