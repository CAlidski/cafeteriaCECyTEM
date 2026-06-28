<?php
include("conexion.php");

$usuario = $_POST['usuario'];
$password = $_POST['password'];

if (empty($usuario) || empty($password)) {
    echo "Por favor, completa todos los campos.";
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (usuario, password) VALUES ('$usuario', '$passwordHash')";

if ($conexion->query($sql) === TRUE) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
