// Element/Button Selectors
var searchField = document.getElementById('searchField');
var searchButton = document.getElementById('search-button');
var artistHeader = document.querySelector('#artistHeader');
var artistInfo = document.querySelector('#artistInfo');
var modal = document.getElementById('alertModal');

var span = document.getElementsByClassName("close")[0];

// Global Variables
var artistName;

// Last.fm default variables
var lastFmURL = "http://ws.audioscrobbler.com/2.0";
var apiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";

// function performSearch() {
//     // Get the search query from the input text box
//     var searchQuery = 'Blink 182';

//     // Calls the API to request to search for the artist and returns the data and function response in json
//     fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=$AIzaSyCFT6zfESewvzF3Uwa0NJS8YzU2Yltwirsgi', { mode: 'no-cors' })
//         .then(function (response) {
//             console.log(response)
//             return response.json;
//         })
//         .then(data => {
//             -
//             console.log(data)
//         })
//         .then(error => {
//             // Console will return any errors that happen when calling the API 
//             console.log('Error:', error);
//         });
// }

// performSearch();

// // // // // // // // // // // // // // // // // // // // // // // //
// ================ Alex's Last.fm Codework Below ================= //

// Last.fm artist.getTopAlbums format

// var requestArtAlbURL = lastFmURL + '/?method=artist.gettopalbums&artist=' + artistName + '&api_key=' + apiKeyCode + '&format=json';

// fetch(requestArtAlbURL)
//     .then(function (response) {
//         if (response.ok) {
//             // console.log(response) // temp console log
//             response.json()
//                 .then(function (data) {
//                     //console.log(data) // temp console log

//                     displayTopAlbums(data, artistName);
//                 });
//         } else {
//             // console.log("Error: " + response.statusText);
//             // "Error: " + response.statusText
//             // Place status error inside a msg container/div/element
//         }
//     })
//     .catch(function (error) {
//         // console.log(error);
//         // "Unable to connect to Last.fm"
//         // Place error message inside a msg container/div/element
//     })
//     ;

// function displayTopAlbums(info, artName) {
//     if (info.topalbums === null) {
//         // "No Artist was found. Try again."
//         // Place message inside a container/div/element
//         return;
//     }

//     artistHeader.textContent = artName;

//     var albumList = document.querySelector('#albumList');
//     var largeImgNum = 3;
//     for (var i = 0; i < info.topalbums.album.length; i++) {
//         var albumIcon = document.createElement('img');

//     }
// }

// Last.fm artist.getInfo format
function getArtistInfo() {
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
        });
}


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

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    artistName = searchField.value.trim();
    getArtistInfo();

    modalAlert();
})

function modalAlert() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }