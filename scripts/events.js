"use strict";

function displayEventsPage() {
    console.log("Called displayEventsPage()");

    $.ajax({
        url: "./data/events.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data && data.length > 0) {
                displayEvents(data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error: " + error);
        }
    });
}

function displayEvents(events) {
    const eventsList = $("#eventsList");

    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.append(eventCard);
    });
}

function createEventCard(event) {
    const eventCard = $("<div></div>").addClass("card mb-3");
    const cardBody = $("<div></div>").addClass("card-body");

    const title = $("<h5></h5>").addClass("card-title").text(event.title);
    const date = $("<p></p>").addClass("card-text").text("Date: " + event.date);
    const description = $("<p></p>").addClass("card-text").text(event.description);

    const image = $("<img>")
        .addClass("card-img-top mx-auto")
        .attr("src", event.image)
        .attr("alt", event.title)
        .css({
            width: "400px",
            height: "400px"
        });

    const registerButton = $("<a></a>")
        .addClass("btn btn-primary d-flex align-items-center justify-content-center")
        .attr("href", event.registerUrl || "#")
        .attr("target", "_blank")
        .text("Register");

    const showLocationButton = $("<button></button>")
        .addClass("btn btn-secondary mt-2")
        .text("Show Location on Map")
        .on("click", function () {
            toggleLocationOnMap(event, cardBody); // Pass cardBody as an argument
        });

    cardBody.append(title, date, description, registerButton, showLocationButton);
    eventCard.append(image, cardBody);

    return eventCard;
}

function toggleLocationOnMap(event, cardBody) {
    const mapContainer = cardBody.find(".map-container");

    if (mapContainer.is(":visible")) {
        mapContainer.hide();
    } else {
        showLocationOnMap(event, cardBody);
    }
}

function showLocationOnMap(event, cardBody) {
    const geocoder = new google.maps.Geocoder();

    cardBody.find(".map-container").remove();

    const mapContainer = $("<div></div>").addClass("map-container").css("height", "400px");
    cardBody.append(mapContainer);

    geocoder.geocode({ address: event.address }, function (results, status) {
        if (status === 'OK' && results.length > 0) {
            const location = results[0].geometry.location;
            const mapOptions = {
                center: location,
                zoom: 15,
            };

            const map = new google.maps.Map(mapContainer[0], mapOptions);

            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: event.title,
            });

        } else {
            console.error('Geocoding failed:', status);
        }
    });
}

$(document).ready(function () {
    displayEventsPage();
});