<?php
include("conexion.php");

$producto = $_POST['producto'];
$precio = $_POST['precio'];
$cantidad = $_POST['cantidad'];

$sql = "INSERT INTO pedidos (producto, precio, cantidad) VALUES ('$producto', '$precio', '$cantidad')";
if (mysqli_query($conn, $sql)) {
    echo "Pedido registrado ✅";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
