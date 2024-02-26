"use strict";

$(document).ready(function () {
    $("#submitFeedbackButton").click(function () {
        submitFeedback();
    });
});

function submitFeedback() {
    let rating = $("#rating").val();
    let comments = $("#comments").val();

    let feedbackData = {
        rating: rating,
        comments: comments
    };

    storeFeedback(feedbackData);

    $("#ajaxResponse").removeClass("alert-danger").addClass("alert-success").text("Feedback submitted successfully.").show();
}

function storeFeedback(feedbackData) {
    let feedbackList = localStorage.getItem("feedbackList");

    if (!feedbackList) {
        feedbackList = {
            feedbacks: []
        };
    } else {
        feedbackList = JSON.parse(feedbackList);
    }

    feedbackList.feedbacks.push(feedbackData);

    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
}