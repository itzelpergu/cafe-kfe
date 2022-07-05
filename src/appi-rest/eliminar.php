<?php
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //PARAMETROS DE LA BASE DE DATOS 
    $dns = "mysql:host=localhost;dbname=restaurant";
    $user = "root";
    $pass = "";

    $db = new PDO($dns, $user, $pass);
// Extrae y valida el id.
$id = ($_GET['idplatillo'] !== null && (int)$_GET['idplatillo'] > 0)? 
mysqli_real_escape_string($con, (int)$_GET['idplatillo']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `platillo` WHERE `idplatillo` ='{$id}' LIMIT 1";

if(mysqli_query($db, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}