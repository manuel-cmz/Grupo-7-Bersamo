
<?php
error_reporting(E_ALL);
ini_set("display_errors",1);
require "conexion.php";
?>
<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];
    $edad = $_POST["edad"];
    $telefono = $_POST["telefono"];
    $correcto = true;
    // Validación de correo 
    if($correo == ""){
        $err_correo = "Inserta un correo";
        $correcto = false;
    }elseif (filter_var($email, FILTER_VALIDATE_EMAIL)) {
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
    }else {
        $err_telefono = "El numero de telefono es valido";
    }

    if($correcto){
        $contrasena_cifrada = password_hash($contrasena, PASSWORD_DEFAULT);
        $consulta = "INSERT INTO usuarios (nombre, contrasena, admin) VALUES ('$correo', '$contrasena_cifrada','$admin')";
        if($_conexion->query($consulta)){
            echo "<div class='alert alert-success'>correo registrado correctamente</div>";
        }else{
            echo "<div class='alert alert-danger'>No se ha podido registrar el correo</div>";
        }
    }
}
?>
