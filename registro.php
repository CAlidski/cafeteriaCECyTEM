<?php
include("conexion.php");

$usuario = trim($_POST["usuario"]);
$password = trim($_POST["password"]);

if (empty($usuario) || empty($password)) {
    die("Completa todos los campos");
}

// Verificar si ya existe
$stmt = $conexion->prepare("SELECT id FROM usuarios WHERE usuario=?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    die("El usuario ya existe");
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conexion->prepare("INSERT INTO usuarios(usuario,password) VALUES(?,?)");
$stmt->bind_param("ss", $usuario, $passwordHash);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error al registrar usuario";
}

$stmt->close();
$conexion->close();
?>