/*
* Name: Meng Cai, Mario Chavez
* Student ID: 100894240, 100895335
* Date of completion: 27/01/2024*/
"use strict";
let cardData;

async function fetchData() {
    const response = await fetch('./data/portfolio.json');
    cardData = await response.json();

    // Call functions to create cards after data is loaded
    loadMoreCards(0, 4);
    handleLoadMore();
}

const postContainer = document.querySelector('.card-container');

function cardCreator(postData) {
    const postElement = document.createElement('div');
    postElement.classList.add('card');
    postElement.innerHTML = `
        <h3 class="card-heading">${postData.heading}</h3> 
        <p class="card-body">${postData.body}</p>
        <img src="${postData.image}" alt="Card Image" class="card-image">
    `;
    postContainer.appendChild(postElement);
}

function loadMoreCards(startIndex, endIndex) {
    const slicedData = cardData.slice(startIndex, endIndex);
    slicedData.forEach(cardCreator);
}

function handleLoadMore() {
    const loadMoreButton = document.getElementById('loadMoreButton');
    let startIndex = 0;
    let endIndex = 4;

    loadMoreButton.addEventListener('click', function () {
        loadMoreCards(startIndex, endIndex);
        startIndex = endIndex;
        endIndex += 4;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});
