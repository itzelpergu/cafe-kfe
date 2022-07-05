<?php
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //PARAMETROS DE LA BASE DE DATOS 
    $dns = "mysql:host=localhost;dbname=restaurant";
    $user = "root";
    $pass = "";

    $db = new PDO($dns, $user, $pass);
// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? 
mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `platillo` WHERE `id` ='{$id}' LIMIT 1";

if(mysqli_query($db, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}