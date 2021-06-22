<?php
if (is_array($_FILES)) {
    // The global predefined variable $_FILES is an associative array containing items(files) uploaded via HTTP POST method.

    $count = count($_FILES['userImage']['name']);
    for ($i = 0; $i < $count; $i++) {
        //echo 'Name: '.$_FILES['userImage']['name'][$i].'</br>';

        if (is_uploaded_file($_FILES['userImage']['tmp_name'][$i])) {
            //$_FILES["file"]["name"] : stores the original filename from the client
            //$_FILES["file"]["tmp_name"] : tores the name of the temporary file.

            $sourcePath = $_FILES['userImage']['tmp_name'][$i];
            $targetPath = "./images/upload/".$_FILES['userImage']['name'][$i];
            //$_FILES['userImage']['name'] : The real name of the picked file from the user's system

            if (move_uploaded_file($sourcePath, $targetPath)) {
                // echo "images/upload/".$_FILES['userImage']['name'][$i];
                echo 'OK';
            } else {
                echo 'Failed';
            }
        }
    }
}