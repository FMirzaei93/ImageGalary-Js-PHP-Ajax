$(document).ready(function() {

    var warning_alert = "Do you really want to Delete this item?";
    var cross_signs = $('div.imggalery div.btngalery img');
    var images_urls = [];
    var current_images_urls = [];
    var images_containers = $('div.imggalery');



    // ---------------- Retrieving Images From Images Directory -------------

    $.ajax({
        url: "./images.factory.php",
        type: "GET",
        data: { function_name: 'imagesFindAllFunc' },
        dataType: "JSON",
        success: function(response, status) {

            images_urls = response;

        }
    });



    // ---------------- Clicking on upload button --------------------------------

    $('div#header > div').click(function() {

        uploadingNewImages();
    });


    //----------------- Monitoring the Images directory and adding the new ones -------

    function uploadingNewImages() {

        $.ajax({
            url: "./images.factory.php",
            type: "GET",
            data: { function_name: 'imagesFindAllFunc' },
            dataType: "JSON",
            success: function(response, status) {

                current_images_urls = response;

                var difference_array = [];
                difference_array = $(current_images_urls).not(images_urls).get();

                console.log(difference_array);
                if (current_images_urls.length > images_urls.length) {
                    console.log('current is greater');

                    //var difference_array = $(current_images_urls).not(images_urls).get();

                    $.each(difference_array, function(index, value) {

                        updateThePageAfterUploading(value);
                    });

                }
                // else {
                //     $.each(difference_array, function(index, value) {
                //         console.log('current is less');


                //         deleteSelectedImageElement(value);
                //     });
                // }
            }
        });

    }

    // ---------------- Function for adding new image (from Directory) into user's browser ------------------

    function updateThePageAfterUploading(src) {


        var new_image_container = document.createElement('div');
        $(new_image_container).addClass("imggalery");
        new_image_container.innerHTML = `<div class="contentgalery"><img style="margin:5px 5px;" src="${src}" width="160" height="100"></div><div class="btngalery"><img style="cursor:pointer;" src="images/cross.gif"></div>`;
        var images_zone = $('div#images_zone');
        images_zone.append(new_image_container);

        images_urls.push(src);
        images_containers = $('div.imggalery');


        $(new_image_container).find('div.btngalery img').on("click", function(event) {
            crossButtonClick($(event.target));
        });

    }


    // ---------------- Clicking on each Cross --------------------------------

    cross_signs.click(function(event) {

        crossButtonClick($(event.target));
    });


    //------------------------------- Clicking on CrossButton  ---------------------------


    function crossButtonClick(target) {

        var deleteFile = confirm(warning_alert);
        if (deleteFile == true) {

            let clicked_image_src = target.parent().prev().find('img').attr('src');

            $.ajax({
                url: "./images.factory.php",
                type: "POST",
                data: {
                    function_name: 'deleteImageFunc',
                    imageFile: clicked_image_src
                },
                dataType: "JSON",
                success: function(response, status) {

                    if (response == 1) {
                        deleteSelectedImageElement(clicked_image_src);
                    }
                }
            });

        }
    }


    // ---------------- Function for applying removed image (from Directory) in user's browser ------------------

    function deleteSelectedImageElement(src) {

        images_containers.each(function(i, el) {

            let img_src = $(el).find('div.contentgalery').find('img').attr('src');
            if (img_src == src) {
                $(el).remove();
                // removin an item by value from an array
                images_urls.splice($.inArray(src, images_urls), 1);
            }

        });

        images_containers = $('div.imggalery');

    }


    //-------------------------------------------

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
        $(this).css('background', '#e0e0e0b0');

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
        var formImage = new FormData();
        $.each(images, function(i, v) {
            formImage.append('userImage', images[i]);
            uploadFormData(formImage);
        });
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

                uploadingNewImages();

            }
        })
    }

});