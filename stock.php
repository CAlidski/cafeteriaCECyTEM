<?php
include("conexion.php");

$producto = $_POST['producto'];
$cantidad = intval($_POST['cantidad']);
$accion = $_POST['accion']; // "restar" o "devolver"

if ($accion == "restar") {
    $sql = "UPDATE productos SET stock = stock - $cantidad WHERE nombre = '$producto'";
} elseif ($accion == "devolver") {
    $sql = "UPDATE productos SET stock = stock + $cantidad WHERE nombre = '$producto'";
}

if (mysqli_query($conn, $sql)) {
    echo "Stock actualizado ✅";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
