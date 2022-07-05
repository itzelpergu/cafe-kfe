<?php

header("Access-Control-Allow-Origin: *");
//header('Content-Type: text/html; charset=utf-8');
//header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/x-www-form-urlencoded");


    //PARAMETROS DE LA BASE DE DATOS 
    $dns = "mysql:host=localhost;dbname=restaurant";
    $user = "root";
    $pass = "";
//RECUPERAR DATOS DEL FORMULARIO
$data = file_get_contents("php://input");
$objData = json_decode($data);

// ASIGNAR LOS VALORES A LA VARIABLE
$id = $objData->id;
$nombre = $objData->nombre;
$precio = $objData->precio;
$descripcion = $objData->descripcion;

// lIMPIAR LOS DATOS 
  $id = trim($id);
  $nombre = stripslashes($nombre);
  $precio = stripslashes($precio);
  $descripcion = stripslashes($descripcion);

  $nombre = trim($nombre);
  $precio = trim($precio);
  $descripcion = trim($descripcion);






$db = new PDO($dns, $user, $pass);
    if($db){

    //$sql = " UPDATE platillo SET nombre='".$nombre."',precio='".$precio."',descripcion='".$descripcion."' WHERE id =".$id;
        
        $sql = "DELETE FROM `platillo` WHERE `idplatillo` ='{$id}' LIMIT 1";

        //$sql= "DELETE FROM platillo where id = '$id'";
        
        $query = $db->prepare($sql);
        $query ->execute();
        if(!$query){
                   $dados = array('mensaje' => "No es posible eliminar los datos");
                   echo json_encode($dados);
         }
        else{
                   $dados = array('mensaje' => "Los datos se eliminaron correctamente.");
                  echo json_encode($dados);
         };
    }
   else{
          $dados = array('mensaje' => "Error, intente nuevamente.");
          echo json_encode($dados);
    };
?>