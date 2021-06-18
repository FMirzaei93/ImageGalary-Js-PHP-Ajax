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
           $(this).css('background', '#BBD5B8');


       });

       // Drag over
       $('div#page').on('dragover', function(e) {
           e.stopPropagation();
           e.preventDefault();
           // $("h1").text("Drop");
       });

       // Drop
       $('div#page').on('drop', function(e) {

           e.stopPropagation();
           e.preventDefault();
           $(this).css('background', '#D8F9D3');


           var image = e.originalEvent.dataTransfer.files;
           createFormData(image);
       });

       function createFormData(image) {
           var formImage = new FormData();
           formImage.append('userImage', image[0]);
           uploadFormData(formImage);
       }

       function uploadFormData(formData) {
           $.ajax({
               url: "upload.php",
               type: "POST",
               data: formData,
               contentType: false,
               cache: false,
               processData: false,
               success: function(data) {
                   // $('#drop-area').append(data);
                   console.log(data);
               }
           })
       }
   });