<?php
include("conexion.php");

$opinion = $_POST['opinion'];
$correo = $_POST['correo'];
$experiencia = $_POST['experiencia'];
$sugerencia = $_POST['sugerencia'];

$sql = "INSERT INTO encuesta (opinion, correo, experiencia, sugerencia)
        VALUES ('$opinion', '$correo', '$experiencia', '$sugerencia')";

if ($conexion->query($sql) === TRUE) {
    echo "Encuesta enviada correctamente";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
