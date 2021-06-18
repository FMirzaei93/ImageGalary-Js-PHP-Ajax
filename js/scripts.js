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



    //----------------- Upload button for monitoring the Images directory and adding the new ones -------

    $('div#header > div').click(function() {
        $.ajax({
            url: "./images.factory.php",
            type: "GET",
            data: { function_name: 'imagesFindAllFunc' },
            dataType: "JSON",
            success: function(response, status) {

                current_images_urls = response;

                if (current_images_urls.length > images_urls.length) {

                    var difference_array = $(current_images_urls).not(images_urls).get();

                    $.each(difference_array, function(index, value) {

                        makingChangesOfAddingNewImage(value);
                    });

                }
            }
        });
    });

    // ---------------- Clicking on each Cross --------------------------------

    cross_signs.click(function(event) {

        crossButtonClick($(event.target));
    });


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


    // ---------------- Function for adding new image (from Directory) into user's browser ------------------

    function makingChangesOfAddingNewImage(src) {


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

});