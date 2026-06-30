<?php
include("conexion.php");

$producto = trim($_POST["producto"]);
$cantidad = intval($_POST["cantidad"]);
$accion = $_POST["accion"];

if($accion=="restar"){

    $stmt=$conexion->prepare("UPDATE productos SET stock=stock-? WHERE nombre=?");

}else{

    $stmt=$conexion->prepare("UPDATE productos SET stock=stock+? WHERE nombre=?");

}

$stmt->bind_param("is",$cantidad,$producto);

if($stmt->execute()){

    echo "Stock actualizado";

}else{

    echo "Error al actualizar";

}

$stmt->close();
$conexion->close();
?>