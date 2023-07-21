// Element/Button Selectors
var searchField = document.getElementById('searchField');
var searchButton = document.getElementById('search-button');
var artistHeader = document.querySelector('#artistHeader');
var artistInfo = document.querySelector('#artistInfo');
var modal = document.getElementById('alertModal');
var modalText = document.getElementById('alertModal').children[0].children[1];
var span = document.getElementsByClassName("close")[0];

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
                response.json()
                    .then(function (data) {
                        displayArtistInfo(data, artistName);
                    });
            } else {
                modalText.innerHTML = "";
                modalText.innerHTML = "Error: " + response.statusText;
            }
        })
        .catch(function (error) {
            modalText.innerHTML = "";
            modalText.innerHTML = "Unable to connect to Last.fm";
        });
}

// Last.fm artist.getTopAlbums function
function getAlbumList() {
    var requestArtAlbURL = lastFmURL + '/?method=artist.gettopalbums&artist=' + artistName + '&limit=5&api_key=' + lastFMapiKeyCode + '&format=json';

    fetch(requestArtAlbURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayTopAlbums(data, artistName);
                    });
            } else {
                modalText.innerHTML = "";
                modalText.innerHTML = "Error: " + response.statusText;
            }
        })
        .catch(function (error) {
            modalText.innerHTML = "";
            modalText.innerHTML = "Unable to connect to Last.fm";
        })
        ;
}

function displayTopAlbums(info, artName) {
    if (info.topalbums === null) {
        modalText.innerHTML = "No Albums were found. Try again.";
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

        //console.log(albumImgPath[i].image[largeImgNum]);
        albumList.append(albumIcon);
    }
}

// Function for Last.fm API
function displayArtistInfo(info, artName) {
    if (info.artist === null) {
        modalText.innerHTML = ""
        modalText.innerHTML = "No Artist was found. Try again."
        modalAlert();
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
    //console.log("Button clicked! Artist name is: " + artistName);
    // performSearch();
    getArtistInfo();
    getAlbumList();
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