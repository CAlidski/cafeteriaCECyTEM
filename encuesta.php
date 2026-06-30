<?php
include("conexion.php");

$opinion=trim($_POST["opinion"]);
$correo=trim($_POST["correo"]);
$experiencia=trim($_POST["experiencia"]);
$sugerencia=trim($_POST["sugerencia"]);

$stmt=$conexion->prepare("INSERT INTO encuesta(opinion,correo,experiencia,sugerencia) VALUES(?,?,?,?)");

$stmt->bind_param("ssss",$opinion,$correo,$experiencia,$sugerencia);

if($stmt->execute()){

echo "Encuesta enviada correctamente";

}else{

echo "Error al guardar encuesta";

}

$stmt->close();
$conexion->close();
?>