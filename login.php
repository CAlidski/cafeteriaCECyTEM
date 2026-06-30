<?php
session_start();
include("conexion.php");

$usuario = trim($_POST["usuario"]);
$password = trim($_POST["password"]);

if (empty($usuario) || empty($password)) {
    die("Completa todos los campos");
}

$stmt = $conexion->prepare("SELECT id,password FROM usuarios WHERE usuario=?");
$stmt->bind_param("s", $usuario);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows == 1) {

    $fila = $resultado->fetch_assoc();

    if (password_verify($password, $fila["password"])) {

        $_SESSION["usuario"] = $usuario;
        $_SESSION["id"] = $fila["id"];

        echo "Inicio de sesión correcto";

    } else {

        echo "Contraseña incorrecta";

    }

} else {

    echo "Usuario no encontrado";

}

$stmt->close();
$conexion->close();
?>