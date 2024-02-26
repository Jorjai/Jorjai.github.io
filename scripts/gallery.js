"use strict";

$(document).ready(function () {
    const pexelsApiKey = 'mudr9WQzVRwco1XV45PfE3aGYQPRk6eDAEqYLQBYtELHLBkfH1DE0pcu';
    let pexelsApiUrl = `https://api.pexels.com/v1/curated`;

    // Function to load images from Pexels
    function loadImages() {
        $.ajax({
            url: pexelsApiUrl,
            method: "GET",
            headers: {
                'Authorization': pexelsApiKey
            },
            success: function (data) {
                if (data.photos && data.photos.length > 0) {
                    displayGallery(data.photos);
                }
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    // Initial load of images
    loadImages();

    // Display images in the gallery
    function displayGallery(photos) {
        const galleryContainer = $("#gallery");

        galleryContainer.empty(); // Clear existing images

        photos.forEach(function (photo) {
            const galleryItem = $("<div></div>")
                .addClass("col-md-4 mb-4")
                .append(
                    $("<img>")
                        .addClass("img-fluid gallery-img")
                        .attr("src", photo.src.large)
                        .attr("alt", photo.photographer)
                        .on("click", function () {
                            openLightbox(photo.src.original, photo.photographer);
                        })
                );

            galleryContainer.append(galleryItem);
        });
    }

    // Lightbox functions
    function openLightbox(imageUrl, altText) {
        $("#lightbox img").attr("src", imageUrl).attr("alt", altText);
        $("#lightbox").fadeIn();

        $("#lightbox").click(function (event) {
            if (!$(event.target).closest('#lightboxImg').length) {
                $("#lightbox").fadeOut();
            }
        });
    }

    $("#closeBtn").click(function () {
        $("#lightbox").fadeOut();
    });

    // Reload button click event
    $("#reloadButton").click(function () {
        // Update the API URL with a new parameter to avoid caching
        pexelsApiUrl = `https://api.pexels.com/v1/curated?page=${Math.floor(Math.random() * 100) + 1}&t=${Date.now()}`;
        // Load new set of images
        loadImages();
    });

    // You can add additional lightbox features here
});