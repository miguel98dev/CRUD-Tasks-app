<?php
// desde aquí se realiza la petición

include 'database.php';

$search = $_POST['search']; // recibe el valor del input

if (!empty($search)) { // si el valor de 'search' no está vacío 
    $query = "SELECT * FROM task WHERE name LIKE '$search%'";
    $result = mysqli_query($connection, $query); 
    if (!$result) {
        die('Query Error' . mysqli_error($connection));
    }

    // recorremos el resultado -> $result
    $json = [];
    while ($row = mysqli_fetch_array($result)) { // lo convertimos en un array
        $json[] = [ // por cada recorrido se llena el json
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description']
        ];
    }
    $jsonstring = json_encode($json); // convertimos el json para poder enviarlo
    echo $jsonstring;
}
