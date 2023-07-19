
// Get references to HTML elements
var searchInput = document.getElementById('search-input');
// Assuming we will add a search button later :)
var searchButton = document.getElementById('search-button');

// Function to perform the search
function performSearch() {
// Get the search query from the input text box
  var query = searchInput.value;

// Calls the API to request to search for the artist and returns the data and function response in json
  fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(query)}`)
    .then(function (response) {
        return response.json();
    }
    .then(data => {
//Gets the artist's information from the Wikipedia API and displays the Wikipedia article that corresponds to it on the application 
      var pages = data.query.pages;
      var pageIds = Object.keys(pages);
      var pageId = pageIds[0];
      var artist = pages[pageId];
      var artistSummary = artist.extract;
      var summaryContainer = document.getElementById('artist-summary');
      summaryContainer.textContent = artistSummary;
    })
    .then(error => {
// Console will return any errors that happen when calling the API 
      console.log('Error:', error);
    }));
}

// fetch ('https://www.mediawiki.org/wiki/Special:MyLanguage/API:Query')

// // // // // // // // // // // // // // // // // // // // // // // //
// ================ Alex's Last.fm Codework Below ================= //
var artistHeader = document.querySelector('#artistHeader');
var artistInfo = document.querySelector('#artistInfo');

// Last.fm default variables
var lastFmURL = "http://ws.audioscrobbler.com/2.0";
var apiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";
var artistName = "Cher";

// Last.fm artist.getTopAlbums format
var requestArtAlbURL = lastFmURL + '/?method=artist.gettopalbums&artist=' + artistName + '&api_key=' + apiKeyCode + '&format=json';

fetch(requestArtAlbURL)
    .then(function (response) {
        if (response.ok) {
            // console.log(response) // temp console log
            response.json()
            .then(function (data) {
                //console.log(data) // temp console log
                
                displayTopAlbums(data, artistName);
            });
        } else {
            // console.log("Error: " + response.statusText);
            // "Error: " + response.statusText
            // Place status error inside a msg container/div/element
        }
    })
    .catch(function (error) {
        // console.log(error);
        // "Unable to connect to Last.fm"
        // Place error message inside a msg container/div/element
    })
;

function displayTopAlbums(info, artName) {
    if (info.topalbums === null) {
        // "No Artist was found. Try again."
        // Place message inside a container/div/element
        return;
    }

    //var artistHeader = document.querySelector('#artistHeader');
    artistHeader.textContent = artName;

    var albumList = document.querySelector('#albumList');
    var largeImgNum = 3;
    for(var i = 0; i < info.topalbums.album.length; i++) {
        var albumIcon = document.createElement('img');

    }
}

// Last.fm artist.getInfo format
var requestArtInfoURL = lastFmURL + '/?method=artist.getinfo&artist=' + artistName + '&api_key=' + apiKeyCode + '&format=json';

fetch(requestArtInfoURL)
    .then(function (response) {
        if (response.ok) {
            // console.log(response) // temp console log
            response.json()
            .then(function (data) {
                //console.log(data.artist.bio.content) // temp console log
                
                displayArtistInfo(data, artistName);
            });
        } else {
            // console.log("Error: " + response.statusText);
            // "Error: " + response.statusText
            // Place status error inside a msg container/div/element
        }
    })
    .catch(function (error) {
        // console.log(error);
        // "Unable to connect to Last.fm"
        // Place error message inside a msg container/div/element
    })
;

// Function for Last.fm API
function displayArtistInfo(info, artName) {
    if (info.artist === null) {
        // "No Artist was found. Try again."
        // Place message inside a container/div/element
        return;
    }

    artistHeader.textContent = artName;

    var bioContent = info.artist.bio.content;
    //console.log(bioContent.split("\n"));
    var fixedBio = bioContent.replaceAll("\n", "<br>");

    var regSpcExp = /\s/;

    artistInfo.innerHTML = fixedBio;


}