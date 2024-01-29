/*
* Name: Meng Cai, Mario Chavez
* Student ID: 100894240, 100895335
* Date of completion: 27/01/2024*/
"use strict";

(function (){
    // function DisplayHomePage starts the home page (index.html),
    function DisplayHomePage(){
        startShowSlides();
        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        });

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");

        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is my first paragraph";
        MainContent.appendChild(MainParagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
    }
    function startShowSlides() {
        let slideIndex = 0;

        window.onload = function () {
            showSlides();

            function showSlides() {
                let i;
                let slides = document.getElementsByClassName("mySlides");

                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                }
                slides[slideIndex - 1].style.display = "block";
                setTimeout(showSlides, 2000);
            }
        };
    }
    function navigateToWebsite() {
        // Replace 'https://example.com' with the actual website URL
        window.location.href = 'https://stratoflow.com/how-to-build-a-search-engine/';
    }
    function DisplayPortfolioPage(){
        console.log("Called DisplayProductPage()");
    }
    function DisplayServicesPage(){
        console.log("Called DisplayAboutUsPage()");
    }
    function DisplayTeamPage(){
        console.log("Called DisplayServicesPage()");
    }
    function DisplayBlogPage(){
        console.log("Called DisplayServicesPage()");
    }
    function DisplayContactPage(){
        console.log("Called DisplayContactPage()");

        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        submitButton.addEventListener("click", function (){

            if(subscribeCheckbox.checked){

                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1) + Date.now();
                    localStorage.setItem(key,contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage");

        if(localStorage.length > 0){

            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.contactNumber}</td>
                            <td>${contact.emailAddress}</td>
                            <td></td>
                            <td></td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;

        }
    }
    function Start(){
        console.log("App start");
        switch (document.title){
            case "Welcome!":
                DisplayHomePage();
                startShowSlides();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;

        }
        startShowSlides();
    }
    window.addEventListener("load", Start);
})()