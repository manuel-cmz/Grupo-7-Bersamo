<?php
/**
 * Vamos a crear una conexión entre PHP y la bbdd mysql, usando la clase "mysqli"
 * 
 * new mysqli(...) es el constructor de la clase mysqli, que se utiliza para inicializar 
 * un objeto que representa la conexión a la bbdd.
 * 
 * si se produce la conexión, la variable donde guardemos el objeto, contendrá un objeto
 * de la clase mysqli, que podemos usar con la bbdd (realizar consultas, manejor de errores..)
 * si se produce un fallo al conectarse, el método "connect_error" de este objeto contendrá info sobre el por qué no hemos podido conectarnos
 * 
 */
    $_servidor = "localhost";
    $_usuario = "root";
    $_contrasena = "";
    $_bd = "bersamo_bd";

    /**
     * ACTIVAR EXCEPCIONES EN MYSQLI:
     * - MYSQLI_REPORT_ERROR: convierte los errores de mysqli en errores reportables(excepciones)
     * 
     * - MYSQLI_REPORT_STRICT: hace que mysqli lance un mysqli_exception en lugar de devolver false
     * 
     * Con estas dos opciones podemos usar ahora try-catch
     */

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $_conexion = new mysqli($_servidor, $_usuario, $_contrasena, $_bd);
    
    if($_conexion->connect_error){
        die("Error en la conexión: ".$_conexion->connect_error);
    }
    // var_dump($_conexion->connect_error);
    // echo "Conectaos :D";
    // $_conexion->close();
    // echo "<br>".$_conexion->host_info;
    // echo "<br>".$_conexion->server_info;
    // echo "<br>".$_conexion->server_version;
?>