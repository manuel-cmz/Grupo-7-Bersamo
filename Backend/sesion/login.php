<?php
session_start();
require "conexion.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    $correcto = true;

    // Validación básica
    if($usuario == ""){
        $correcto = false;
    }

    if($contrasena == ""){
        $correcto = false;
    }

    if($correcto){

        // Consulta segura
        $stmt = $_conexion->prepare("SELECT * FROM usuarios WHERE nombre = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();

        $resultado = $stmt->get_result();

        if($resultado->num_rows === 1){

            $fila = $resultado->fetch_assoc();

            // Verificar contraseña
            if(password_verify($contrasena, $fila["contrasena"])){

                // Guardar sesión
                $_SESSION["usuario"] = $fila["nombre"];

                // Redirigir (ajusta ruta)
                header("Location: ../../Fronted/Index/index.html");
                exit;

            }else{
                header("Location: ../../Fronted/Login/indexLogin.html?error=pass");
                exit;
            }

        }else{
            header("Location: ../../Fronted/Login/indexLogin.html?error=user");
            exit;
        }

    }else{
        header("Location: ../../Fronted/Login/indexLogin.html?error=empty");
        exit;
    }
}
?>