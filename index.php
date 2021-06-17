<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-Equiv="Cache-Control" Content="no-cache">
    <meta http-Equiv="Pragma" Content="no-cache">
    <meta http-Equiv="Expires" Content="0">
    <!-- You can use the http-equiv=”expires” with a past date to ensure that the browser retrieves fresh files from the server (rather than caching).  -->
    
    <title>Ajax-Load Image</title>
    <link href="css/style.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />
	<!-- Every time you load the brwser this line will give a new version to css file and force the CSS to reload.(because we stopped loading from cache in the upper line and that's why it doesn't update the css file) -->

	<!-- <script src="js/jquery-2.2.1.min.js"></script> -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="js/scripts.js"></script>
    <script src="js/drag_and_drop.js"></script>


</head>
<body>
    <div id="page">
        <div id="header">
            <h1>Ajax</h1>

            <div>Upload</div>

        </div>  
        <div id="col_left">
        
                
            <div class="figure">


            </div>
            
        </div>
        
        <div id="col_right">
                
                
            <div id="images_zone">
            <?php
            $images =  glob( 'images/upload/*.jpg' );
            if( isset( $images ) ){
                //isset: checks if the variable ($images) has value and is not null.

                foreach( $images as $imageFile ){
                ?>
                <div class="imggalery">
                    <div class="contentgalery">
                        <?php 
                        if( file_exists( $imageFile ) ){ 
                            //file_exists: checks if the file or the directory exists.
                        ?> 
                        <img style="margin:5px 5px;" src="<?php echo $imageFile; ?>" width="160" height="100" />
                        <!-- echo display the value -->
                        
                        <?php 
                        }else{
                            echo 'Aucune image !';
                        }
                        ?>
                    </div>
                    <div class="btngalery">
            
                        <img style="cursor:pointer;" src="images/cross.gif" /></a>
                    
                    </div>
                </div>
                <?php
                }
            }else{
                echo 'Aucune image';
            }
            ?>
            </div>
            
        </div>
    
         <div class="clear"></div>
      </div>

    <!-- ---------------------- Footer------------------------ -->

<div id="footer">
    
    &copy; 2012 - Ajax
          </div>

</body>
</html>
