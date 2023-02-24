<?php

include 'database.php';



if (isset($_POST['id'])) {
    // $id = mysqli_real_escape_string($connection, $_POST['id']);

    $query = "SELECT * from task WHERE id = {$_POST['id']}";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed' . mysqli_error($connection));
    } else {
        $json = [];
        while ($row = mysqli_fetch_array($result)) {
            $json[] = [
                'name' => $row['name'],
                'description' => $row['description'],
                'id' => $row['id']
            ];
        }
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }
}
