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



    //----------------- Monitoring the Images Directory For changes -------


    setInterval(function() {

        $.ajax({
            url: "./images.factory.php",
            type: "GET",
            data: { function_name: 'imagesFindAllFunc' },
            dataType: "JSON",
            success: function(response, status) {

                current_images_urls = response;

                if (current_images_urls.length > images_urls.length) {

                    var difference = $(current_images_urls).not(images_urls).get();

                    $.each(difference, function(index, value) {

                        var i = current_images_urls.indexOf(difference[index]);
                        makingChangesOfAddingNewImage(difference[index], i);
                    });

                }
            }
        });

    }, 2000);




    // ---------------- Clicking on each Cross --------------------------------

    cross_signs.click(function(event) {

        crossButtonClick($(event.target));
    });


    // ---------------- Function for applying removed image (from Directory) in user's browser ------------------

    function deleteSelectedImageElement(element, index) {

        $(element).remove();
        images_urls.splice(index, 1);
        //it deletes only one element from index on..
        images_containers = $('div.imggalery');

    }


    // ---------------- Function for adding new image (from Directory) into user's browser ------------------

    function makingChangesOfAddingNewImage(difference, index) {

        images_urls.splice(index, 0, difference);
        //it deletes nothing(zero element) and add "difference"
        var new_image_container = document.createElement('div');
        $(new_image_container).addClass("imggalery");
        new_image_container.innerHTML = `<div class="contentgalery"><img style="margin:5px 5px;" src="${difference}" width="160" height="100"></div><div class="btngalery"><img style="cursor:pointer;" src="images/cross.gif"></div>`;

        if (index == 0) {
            var images_zone = $('div#images_zone');
            images_zone.prepend(new_image_container)

        } else {
            var previous_div = $(`div#images_zone>div:nth-child(${index})`);
            $(new_image_container).insertAfter($(previous_div));
        }

        images_containers = $('div.imggalery');


        $(new_image_container).find('div.btngalery img').on("click", function(event) {
            crossButtonClick($(event.target));
        });

    }

    //------------------------------- Clicking on CrossButton  ----------------------------

    function crossButtonClick(target) {

        var deleteFile = confirm(warning_alert);
        if (deleteFile == true) {

            var clicked_cross_index = target.parent().parent().index();
            var clicked_imageFile = images_urls[clicked_cross_index];


            $.ajax({
                url: "./images.factory.php",
                type: "POST",
                data: {
                    function_name: 'deleteImageFunc',
                    imageFile: clicked_imageFile
                },
                dataType: "JSON",
                success: function(response, status) {

                    if (response == 1) {
                        deleteSelectedImageElement(images_containers[clicked_cross_index], clicked_cross_index);
                    }
                }
            });

        }
    }

});