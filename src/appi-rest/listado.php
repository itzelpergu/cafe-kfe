<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
//header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$dns = "mysql:host=localhost;dbname=restaurant";
$user = "root";
$pass = "";
try {
	$con = new PDO($dns, $user, $pass);
	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		
	//$query = $con->prepare('SELECT  nombre, precio, descripcion FROM platillo');
	$query = $con->prepare('SELECT  * FROM platillo');
		$query->execute();
		$registros = "[";
		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"id": "'.$result["id"].'",';
			$registros .= '"nombre": "'.$result["nombre"].'",';
			$registros .= '"precio": "'.$result["precio"].'",';
			$registros .= '"descripcion": "'.$result["descripcion"].'"}';
		}
		$registros .= "]";
		echo $registros;
} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};