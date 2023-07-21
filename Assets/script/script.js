// Element/Button Selectors
var searchField = document.getElementById('searchField');
var searchButton = document.getElementById('search-button');
var artistHeader = document.querySelector('#artistHeader');
var artistInfo = document.querySelector('#artistInfo');

// Global Variables
var artistName;

// Last.fm default variables
var lastFmURL = "http://ws.audioscrobbler.com/2.0";
var lastFMapiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";

function performSearch() {
    // WIP GIPHY API
}

// // // // // // // // // // // // // // // // // // // // // // // //
// ================ Alex's Last.fm Codework Below ================= //

// Last.fm artist.getInfo function
function getArtistInfo() {
    var requestArtInfoURL = lastFmURL + '/?method=artist.getinfo&artist=' + artistName + '&api_key=' + lastFMapiKeyCode + '&format=json';

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

// Last.fm artist.getTopAlbums function
function getAlbumList() {
    var requestArtAlbURL = lastFmURL + '/?method=artist.gettopalbums&artist=' + artistName + '&limit=5&api_key=' + lastFMapiKeyCode + '&format=json';

    fetch(requestArtAlbURL)
        .then(function (response) {
            if (response.ok) {
                // console.log(response) // temp console log
                response.json()
                    .then(function (data) {
                        console.log(data) // temp console log

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
}

function displayTopAlbums(info, artName) {
    if (info.topalbums === null) {
        // "No Artist was found. Try again."
        // Place message inside a container/div/element
        return;
    }

    artistHeader.textContent = artName;

    var albumList = document.querySelector('#albumList');
    albumList.innerHTML = "";

    var albumImgPath = info.topalbums.album;
    var largeImgNum = 3;

    for (var i = 0; i < info.topalbums.album.length; i++) {
        var albumIcon = document.createElement('img');
        albumIcon.setAttribute('id', 'img' + (i + 1));
        albumIcon.setAttribute('src', albumImgPath[i].image[largeImgNum]['#text']);

        console.log(albumImgPath[i].image[largeImgNum]);
        albumList.append(albumIcon);
    }
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
    var fixedBio = bioContent.replaceAll("\n", "<br>");

    artistInfo.innerHTML = fixedBio;

}

searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    artistName = searchField.value.trim();
    console.log("Button clicked! Artist name is: " + artistName);
    // performSearch();
    getArtistInfo();
    getAlbumList();

})
