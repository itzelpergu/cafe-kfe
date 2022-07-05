<?php
header("Access-Control-Allow-Origin:http://localhost:8100");
//header("Content-Type: application/x-www-form-urlencoded");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    
    //PARAMETROS DE LA BASE DE DATOS 
    $dns = "mysql:host=localhost;dbname=restaurant";
    $user = "root";
    $pass = "";
    //RECUPERAR DATOS DEL FORMULARIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    
    // ASIGNAR LOS VALORES A LA VARIABLE
    //$id = $objData->id;
    $nombre = $objData->nombre;
    $precio = $objData->precio;
    $descripcion = $objData->descripcion;
    
    // lIMPIAR LOS DATOS 
    
    //$id= stripslashes($id);
    // $nombre = stripslashes($nombre);
    // $precio = stripslashes($precio);
    // $descripcion= stripslashes($descripcion);

    // //$id= trim($id);
    // $nombre = trim($nombre);
    // $precio = trim($precio);
    // $descripcion= trim($descripcion);
    
   
    $db = new PDO($dns, $user, $pass);
   
    if($db){
        if (isset($nombre) && strlen($nombre)>0 ){
            $sql="insert into platillo(nombre, precio, descripcion) values ('$nombre','$precio','$descripcion')";
            $query = $db->prepare($sql);
            $query ->execute();
            if(!$query){
                       $datos = array('mensaje' => "No se ha registrado! ");
                       echo json_encode($datos);
             }
            else{
                       $datos = array('mensaje' => "Los datos se ingresaron correctamente");
                      echo json_encode($datos);
             };
        }
        //$sql = " insert into platillo values('".$nombre."','".$precio."','".$descripcion.")";
       
    }
   else{
          $datos = array('mensaje' => "Error, intente nuevamente");
          echo json_encode($datos);
    };
    ?>