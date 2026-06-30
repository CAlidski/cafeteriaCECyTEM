<?php

$conexion = new mysqli(
"fdb1029.awardspace.net",
"4771630_admin",
"h7xIyZ%i7Z[IdfXM",
"4771630_admin",
3306
);

if($conexion->connect_error){

die("Error de conexión: ".$conexion->connect_error);

}

$conexion->set_charset("utf8");

?>