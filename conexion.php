<?php
$conexion = new mysqli("localhost", "root", "", "cafeteria_cecytem");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
