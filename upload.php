<?php
if (is_array($_FILES)) {
    if (is_uploaded_file($_FILES['userImage']['tmp_name'])) {
        $sourcePath = $_FILES['userImage']['tmp_name'];
        $targetPath = "./images/upload/".$_FILES['userImage']['name'];
        if (move_uploaded_file($sourcePath, $targetPath)) {
            ?>
<img src="<?php echo $targetPath; ?>" width="100px" height="100px" hspace=15 />
<?php
        }
    }
}
?>