// Make big an image by clicking it on Index page

document.addEventListener("DOMContentLoaded", function(event) {
    var thumbnailElement = document.getElementById("smart_thumbnail");
    thumbnailElement.addEventListener("click", function() {
        if (thumbnailElement.className === 'small') {
            thumbnailElement.className = '';
        } else {
            thumbnailElement.className = 'small';
        }
    });
});
