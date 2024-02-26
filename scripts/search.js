"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Add event listener for input changes
    searchInput.addEventListener('input', handleSearch);

    // Function to handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        // Fetch data from multiple JSON files
        const jsonFiles = ['../data/events.json', './data/portfolio.json'];

        Promise.all(jsonFiles.map(file => fetch(file).then(response => response.json())))
            .then(data => {
                // Combine data from multiple JSON files into a single array
                const allData = data.flat();

                // Filter data based on the search term
                const filteredData = allData.filter(item =>
                    (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                    (item.heading && item.heading.toLowerCase().includes(searchTerm))
                );

                // Display search results
                displayResults(filteredData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display search results
    function displayResults(results) {
        // Clear previous results
        searchResults.innerHTML = '';

        if (results.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'No results found';
            searchResults.appendChild(noResultsMessage);
        } else {
            const resultList = document.createElement('ul');
            resultList.className = 'custom-list'; // Add your custom class for styling

            results.forEach(result => {
                const listItem = document.createElement('li');
                const resultLink = document.createElement('a');
                resultLink.textContent = result.title || result.heading || 'Untitled';

                // Adjust link based on whether it's a title or heading
                if (result.title) {
                    resultLink.href = 'events.html'; // Change this to the actual events page URL
                } else if (result.heading) {
                    resultLink.href = 'portfolio.html'; // Change this to the actual portfolio page URL
                }

                // Open the link in a new tab
                resultLink.target = '_blank';

                // Append the link to the list item
                listItem.appendChild(resultLink);

                // Display additional information (e.g., heading) if available
                if (result.heading) {
                    const resultHeading = document.createElement('p');
                    resultHeading.textContent = result.heading;
                    listItem.appendChild(resultHeading);
                }

                // Append the list item to the list
                resultList.appendChild(listItem);
            });

            // Append the list to the search results container
            searchResults.appendChild(resultList);
        }
    }
});