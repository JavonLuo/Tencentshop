<?php
include("public.php");
    $id = $_GET["id"];
    $selectAll = "select * from goods where id='$id'";
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