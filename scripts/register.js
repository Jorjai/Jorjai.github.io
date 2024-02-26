"use strict";
$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();

        if (validateForm()) {
            storeRegistrationData();
        }
    });

    function validateForm() {
        let isValid = true;

        isValid = isValid && validateField("#firstName", /^[A-Za-z]+$/, "Please enter a valid First Name.");

        isValid = isValid && validateField("#lastName", /^[A-Za-z]+$/, "Please enter a valid Last Name.");

        isValid = isValid && validateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Please enter a valid Email Address.");

        isValid = isValid && validateField("#password", /^.{6,}$/, "Password must be at least 6 characters.");

        isValid = isValid && validateConfirmPassword();

        isValid = isValid && validateField("#address", /.+/, "Please enter a valid Address.");

        isValid = isValid && validateField("#cellphone", /^\d{9}$/, "Please enter a valid 10-digit Cellphone Number.");

        return isValid;
    }

    function validateField(fieldId, regex, errorMessage) {
        let field = $(fieldId);
        let messageArea = $("#messageArea");

        if (!regex.test(field.val())) {
            field.trigger("focus").trigger("select");
            messageArea.addClass("alert alert-danger").text(errorMessage).show();

            field.on("input change", function () {
                if (regex.test($(this).val())) {
                    messageArea.removeAttr("class").hide();
                }
            });

            return false;
        } else {
            messageArea.removeAttr("class").hide();
            return true;
        }
    }

    function validateConfirmPassword() {
        let password = $("#password");
        let confirmPassword = $("#confirmPassword");
        let messageArea = $("#messageArea");

        if (password.val() !== confirmPassword.val()) {
            confirmPassword.trigger("focus").trigger("select");
            messageArea.addClass("alert alert-danger").text("Passwords do not match.").show();

            confirmPassword.on("input change", function () {
                if (password.val() === $(this).val()) {
                    messageArea.removeAttr("class").hide();
                }
            });

            return false;
        } else {
            // Hide error message
            messageArea.removeAttr("class").hide();
            return true;
        }
    }

    function storeRegistrationData() {
        let usersData = localStorage.getItem("usersData");

        if (!usersData) {
            usersData = {
                users: []
            };
        } else {
            usersData = JSON.parse(usersData);
        }

        usersData.users.push({
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            emailAddress: $("#emailAddress").val(),
            password: $("#password").val(),
            address: $("#address").val(),
            cellphone: $("#cellphone").val()
        });

        localStorage.setItem("usersData", JSON.stringify(usersData));

        $("#messageArea")
            .removeClass("alert alert-danger")
            .addClass("alert alert-success")
            .text("Registration successful. Redirecting to login page...")
            .show();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 2000);
    }
});