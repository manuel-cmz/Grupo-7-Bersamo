
<?php
error_reporting(E_ALL);
ini_set("display_errors",1);
require "conexion.php";
?>
<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $correo = $_POST["correo"];
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];
    $edad = $_POST["edad"];
    $telefono = $_POST["telefono"];
    $correcto = true;
    // Validación de correo 
    if($correo == ""){
        $err_correo = "Inserta un correo";
        $correcto = false;
    }elseif (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $err_correo = "El correo es válido.";
    }else {
    $err_correo = "El correo no tiene un formato correcto.";
    }

    // Validación de la contraseña 
    $contrasena = htmlspecialchars($contrasena); 
    $contrasena = trim($contrasena);
        
    if($contrasena == ""){
        $err_contrasena = "Inserta una contraseña";
        $correcto = false;
    }elseif(!preg_match("/^(?=[^A-Z]*[A-Z])(?=[^0-9]*[0-9])(?=[^\w]*[\w]).{6,12}$/",$contrasena)){
        $err_contrasena = "La contraseña es válida.";
    }else{
        $err_contrasena = "La contraseña no cumple con los requisitos.";
        $correcto = false;
    }
    // Validacion usuario
    if($usuario == ""){
        $err_usuario = "Inserta un usuario";
        $correcto = false;
    }else{
    $err_usuario = "Usuario valida";
    }
    // Validacion edad
    if($edad == ""){
        $err_edad = "Inserta una edad";
        $correcto = false;
    }else{
    $err_edad = "Edad valida";
    }
    // Validacion telefono
    if($telefono == ""){
        $err_telefono = "Inserta un numero de telefono";
        $correcto = false;
    }elseif(preg_match('/^[0-9]{7,15}$/',$telefono)){
        echo "telefono valido";
    }else {
        $err_telefono = "El numero de telefono no es valido";
    }

    if($correcto){
        $contrasena_cifrada = password_hash($contrasena, PASSWORD_DEFAULT);
        $consulta = "INSERT INTO usuarios (nombre, email, contrasena, edad, telefono) VALUES ($usuario, '$correo', '$contrasena_cifrada', '$edad', '$telefono')";
        if($_conexion->query($consulta)){
            header("location: ../Fronted/Login/indexLogin.html");
            exit;
        }else{
            header("location: ../Fronted/Sign Up/indexLogin.html?error=db"); //error no se ha podido insertar en la base de datos
            exit;
        }
    }
}
?>
