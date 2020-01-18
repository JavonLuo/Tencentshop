<?php
	// 处理字符编码
	header("Content-Type:text/html;charset=utf-8");
	function getConnect($db,$sql){
		$con = mysqli_connect("localhost","root","",$db);
		mysqli_query($con,"set names utf8");
		$sql = $sql;
		$result = mysqli_query($con,$sql);
		return $result;
	};

	class DBUtil {
		private $host = "localhost";
		private $username = "root";
		private $password = "";
		private $dbname = "tencentshop";
		private $conn;
		public function db_util(){
		  $this->conn = new mysqli($this->host,$this->username,$this->password,$this->dbname) or die($this->conn->connect_error);
		  $this->conn->query("set names utf8");
		  return $this->conn;
		}
		public function query($sql){
		  $all = $this->conn->query($sql);
		  return $all;
		}
		public function otherOperate($sql){
		  if($this->conn->query($sql)){
			if($this->conn->affected_rows>0){
			  return true;
			}else{
			  return false;
			}
		  }
		}
		public function close(){
		  $this->conn->close();
		}
	  }
	
	  
?>