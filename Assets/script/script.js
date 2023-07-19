
// Get references to HTML elements
var searchInput = document.getElementById('search-input');
// Assuming we will add a search button later :)
var searchButton = document.getElementById('search-button');
var searchHistory = document.getElementById("searchHistoryField");
var searchField = document.getElementById('searchField');

// Function to perform the search
// function performSearch() {
// // Get the search query from the input text box
//   var query = searchInput.value;

// // Calls the API to request to search for the artist and returns the data and function response in json
//   fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(query)}`)
//     .then(function (response) {
//         return response.json();
//     }
//     .then(data => {
// //Gets the artist's information from the Wikipedia API and displays the Wikipedia article that corresponds to it on the application 
//       var pages = data.query.pages;
//       var pageIds = Object.keys(pages);
//       var pageId = pageIds[0];
//       var artist = pages[pageId];
//       var artistSummary = artist.extract;
//       var summaryContainer = document.getElementById('artist-summary');
//       summaryContainer.textContent = artistSummary;
//     })
//     .then(error => {
// // Console will return any errors that happen when calling the API 
//       console.log('Error:', error);
//     }));
// }

// fetch ('https://www.mediawiki.org/wiki/Special:MyLanguage/API:Query')

// Last.fm artist.getInfo format
var apiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";
var artistName = "";
var requestURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistName + '&api_key=' + apiKeyCode + '&format=json';

// Not used anywhere for now
var songName = "";

// Example of a successful fetch input; artist name is Cher
fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=22ab40738b7e4b7cc147c18a2e2cd8ab&format=json')
    .then(function (response) {
        // Console log of what response does; format=json allows us to utilize .json(), to view the data in a json format.
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);

    });

// URL link without search query
//http://ws.audioscrobbler.com/2.0



searchButton.addEventListener("click", function(event) {
event.preventDefault();
var artistName = searchField.value.trim();
console.log(artistName);
