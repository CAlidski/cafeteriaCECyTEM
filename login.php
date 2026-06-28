<?php
include("conexion.php");

$usuario = $_POST['usuario'];
$password = $_POST['password'];

if (empty($usuario) || empty($password)) {
    echo "Por favor, completa todos los campos.";
    exit;
}

$sql = "SELECT password FROM usuarios WHERE usuario='$usuario'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    if (password_verify($password, $fila['password'])) {
        echo "Inicio de sesión correcto";
    } else {
        echo "Contraseña incorrecta";
    }
} else {
    echo "Usuario no encontrado";
}

$conexion->close();
?>
