<?php
include("public.php");

//    $sql = "SELECT * FROM `goods`";
//    $result = getConnect("tencentshop",$sql);
//    $goodsArr = mysqli_fetch_array($result);
    // print_r($goodsArr);
    // echo json_encode($goodsArr);

    $selectAll = "select * from cartgoods";
    // $createSql = "insert into student(s_name,s_sex,s_age) values('小C',1,13)";
    $db = new DBUtil();
    $con = $db->db_util();
    $result = $con->query($selectAll);
    $dataArr = [];
    for ($i=0; $i < $result->num_rows; $i++) { 
        $dataArr[$i] = $result->fetch_assoc();
    };
    echo json_encode($dataArr,JSON_UNESCAPED_UNICODE);



?>