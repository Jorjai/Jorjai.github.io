/**
 *
 *
 */
"use strict";

(function (){

    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link " href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>`)
        }
        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "login.html";
        });
    }

    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function AjaxRequest(method, url, callback){
        // Step 1: Instantiate an XHR object
        let xhr = new XMLHttpRequest();
        // Step 2: Open a connection to the server
        xhr.open(method, url);
        // Step 3: Ad even listener for readystatechange event
        // The readystate event is being triggered when the state fo the document
        // being fetched changes.
        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4 && xhr.status === 200 ){
                // response succeeded - data is available in here only
                if(typeof  callback == "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("ERROR: call back not a function");
                }
            }
        });
        // Step 4: send the request
        xhr.send();
    }
    function ContactFormValidation(){
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/ , "Please enter a valid First name and Last name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/ , "Please enter a valid email Address");
    }

    /**
     *  This function validates an input form text field
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea");

        //let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

        $(input_field_id).on("blur", function(){
            // fail validation
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1)+Date.now();
            localStorage.setItem(key,contact.serialize());
        }
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

    }

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");

    }

    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage()");

    }

    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();

        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");


        submitButton.addEventListener("click", function (){
            if(subscribeCheckbox.checked) {
                //console.log("HERE");
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage()");

    }

    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");

    }
    function DisplayEventsPage(){
        console.log("Called DisplayBlogPage()");

    }
    function DisplayGalleryPage(){
        console.log("Called DisplayBlogPage()");

    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data="";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm">Edit</i>   
                            </button>
                        </td>
                        <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm">Delete</i>   
                            </button>
                        </td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        $("#addButton").on("click",() =>{
            location.href = "edit.html#add";
        });

        $("button.edit").on("click", function (){
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function(){

            if(confirm("Delete Contact, Please confirm")){
                localStorage.removeItem($(this).val());
            }
            location.href="contact-list.html";

        });

    }

    function DisplayEditPage(){

        console.log("DisplayEdit Page Called...");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                // add contact chosen
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/> Add`);

                $("#editButton").on("click",(event) => {

                    //prevent form submission
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";

                });

                $("#cancelButton").on("click",() =>{
                    location.href = "contact-list.html";
                });


                break;
            default:
                //edit contact chosen

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                //pre-populate form
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click",(event)=>{
                    console.log("HI");
                    //prevent from submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                })
                break;
        }
    }


    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function () {
            $.getJSON("../data/users.json", function (data) {
                let usernameValue = username.value;
                let passwordValue = password.value;

                let user = data.users.find(user =>
                    user.username === usernameValue && user.password === passwordValue );

                if (user) {
                    let newUser = new core.User();
                    newUser.fromJSON(user);

                    console.log(newUser);

                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea
                        .removeClass("alert-danger")
                        .addClass("alert alert-success")
                        .text("Welcome, " + newUser.username + "! Today's date is: " + getCurrentDate())
                        .show();

                    setTimeout(function () {
                        location.href = "index.html";
                    }, 3000); // Redirect after 2 seconds
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .removeClass("alert-success")
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "index.html";
        });
    }
    function getCurrentDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }


    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

    }

    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Products":
                DisplayServicesPage();
                break;
            case "Our Team":
                DisplayTeamPage();
                break;
            case "Our Blog":
                DisplayBlogPage()
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})()