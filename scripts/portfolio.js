/*
* Name: Meng Cai, Mario Chavez
* Student ID: 100894240, 100895335
* Date of completion: 27/01/2024*/
"use strict";
const cardData = [
    {
        heading: 'C# Admissions Application',
        body: 'Designed and implemented a student admission process, ' +
            'providing a clear and convenient interface for registration officers to perform CRUD operations on student records efficiently.',
        image: './images/Screenshot_2.jpg'
    },
    {
        heading: 'C# Card Deck',
        body: 'Designed and implemented a card shuffler, with an option to draw certain cards and create new custom cards.',
        image: './images/Screenshot_deckbuilder.jpg'
    },
    {
        heading: 'C# Car Detailer Price',
        body: 'This application calculates the price point of certain adjustments that are needed for ' +
            'a variety of cars.',
        image: './images/Screenshot_1.jpg'
    },
    {
        heading: 'VW Vento 2016',
        body: 'This is medium class car, is a 4 doors Sedan car which can be diesel or gasoline.',
        image: './images/WhatsApp Image 2024-01-07 at 10.28.53_2d386357.jpg'
    },
    {
        heading: 'C# Student database',
        body: 'This application saves certain student data into a database.',
        image: './images/Screenshot_3.jpg'
    },
    {
        heading: 'C# First Web Page',
        body: 'This is a demonstration of how to set up a C# web page.',
        image: './images/Screenshot_5.jpg'
    },
    {
        heading: 'C# Hospital database',
        body: 'This is a working database where it can save certain patient data.',
        image: './images/Screenshot_6.jpg'
    },

]

const postContainer = document.querySelector('.card-container');
let visibleCards = 2;
const cardCreator = () => {
    cardData.map((postData)=>{
        const postElement = document.createElement('div');
        postElement.classList.add('card');
        postElement.innerHTML = `
        <h3 class="card-heading">${postData.heading}</h3> 
        <p class="card-body">${postData.body}</p>
        <img src="${postData.image}" alt="Card Image" class="card-image">
        `
        postContainer.appendChild(postElement)
    })
}
function loadMoreCards(startIndex, endIndex) {
    const slicedData = cardData.slice(startIndex, endIndex);
    slicedData.forEach(cardCreator);
}

function handleLoadMore() {
    const loadMoreButton = document.getElementById('loadMoreButton');
    let startIndex = 0;
    let endIndex = 1;

    loadMoreButton.addEventListener('click', function () {
        loadMoreCards(startIndex, endIndex);
        startIndex = endIndex;
        endIndex += 1;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadMoreCards(0, 1);
    handleLoadMore();
});
