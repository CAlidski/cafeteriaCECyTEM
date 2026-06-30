<?php
include("conexion.php");

$producto = trim($_POST["producto"]);
$precio = floatval($_POST["precio"]);
$cantidad = intval($_POST["cantidad"]);

if ($producto == "" || $cantidad <= 0) {
    die("Datos inválidos");
}

$stmt = $conexion->prepare("INSERT INTO pedidos(producto,precio,cantidad) VALUES(?,?,?)");
$stmt->bind_param("sdi",$producto,$precio,$cantidad);

if($stmt->execute()){
    echo "Pedido registrado";
}else{
    echo "Error al registrar pedido";
}

$stmt->close();
$conexion->close();
?>