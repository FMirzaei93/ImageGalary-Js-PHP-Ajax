<?php
if (is_array($_FILES)) {
    if (is_uploaded_file($_FILES['userImage']['tmp_name'])) {
        //$_FILES["file"]["name"] :stores the original filename from the client
        //$_FILES["file"]["tmp_name"] //stores the name of the temporary file.
        $sourcePath = $_FILES['userImage']['tmp_name'];
        $targetPath = "./images/upload/".$_FILES['userImage']['name'];
        //The real name of the picked file from the user's system
        if (move_uploaded_file($sourcePath, $targetPath)) {
            echo "images/upload/".$_FILES['userImage']['name'];
        }
    }
}