 $(document).ready(function() {
     // preventing page from redirecting
     $("html").on("dragover", function(e) {
         e.preventDefault();
         e.stopPropagation();
     });
     $("html").on("drop", function(e) {
         e.preventDefault();
         e.stopPropagation();
     });

     // Drag enter
     $('div#page').on('dragenter', function(e) {
         e.stopPropagation();
         e.preventDefault();
         $(this).css('background', '#aaaaaa50');


     });

     // Drag over
     $('div#page').on('dragover', function(e) {
         e.stopPropagation();
         e.preventDefault();
     });


     // Drop
     $('div#page').on('drop', function(e) {


         e.stopPropagation();
         e.preventDefault();
         $(this).css('background', '#fff');


         var selectedImages = e.originalEvent.dataTransfer.files;
         createFormData(selectedImages);
     });

     function createFormData(images) {
         var fd = new FormData();
         // The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method.
         $.each(images, function(i, val) {
             fd.append('userImage[]', val);

             //For sending them one by one:
             //fd.append('userImage', val);
             //uploadFormData(fd);

         });
         uploadFormData(fd);
     }


     function uploadFormData(formData) {
         $.ajax({
             url: "upload.php",
             type: "POST",
             data: formData,
             contentType: false,
             cache: false,
             processData: false,
             success: function(data, status) {

                 uploadingNewImages();

             }
         })
     }
 });