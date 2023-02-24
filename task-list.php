<?php
// hara una cosulta a la bbdd de todas las tareas y enviarlas al navegador para que las muestre en la tabla

    include 'database.php';

    $query = "SELECT * FROM task";
    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Query Failed') . mysqli_error($connection);
    } else {
        $json = [];
        while($row = mysqli_fetch_array($result)) {
            $json[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description']
            ];
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

