<?php

include 'database.php'; // incluimos conexion a la bbdd

if(isset($_POST['id'])) { // 
    $id = $_POST['id'];
    $query = "DELETE FROM task WHERE id = $id"; // realizamos una consulta para eliminar la tarea
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query Failed');
    } else {
        echo 'Task Deleted Successfully';
    }
}


?>