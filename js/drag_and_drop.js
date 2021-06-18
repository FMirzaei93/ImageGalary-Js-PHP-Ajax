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