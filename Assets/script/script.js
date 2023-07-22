// Element/Button Selectors
var searchField = document.getElementById("searchField");
var searchButton = document.getElementById("search-button");
var artistHeader = document.querySelector("#artistHeader");
var artistInfo = document.querySelector("#artistInfo");
var modal = document.getElementById("alertModal");
var modalText = document.getElementById("alertModal").children[0].children[1];
var span = document.getElementsByClassName("close")[0];
var gify = document.getElementById("gifyArea");

// Global Variables
var artistName;

// Last.fm default variables
var lastFmURL = "http://ws.audioscrobbler.com/2.0";
var lastFMapiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";

//////////////////////////////////////////////////////////////////////////////////////////////
// GIPHY API
function getGify(artistName) {
  gify.innerHTML = "";
  var apiKey = "OEa74blchPqNymU3Kxl9opwU0nBO8oGP";
  var searchQuery = artistName; // Replaces with the word or phrase you want to search for
  var apiUrl =
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&rating=pg&q=` +
    searchQuery +
    `&limit=1`;
  gify;
  // Fetch the random GIF or sticker from Giphy API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process the API response
      var gifUrl = data.data[0].images.original.url;
      //Displays the GIF or sticker on your web page
      var gifElement = document.createElement("img");
      gifElement.src = gifUrl;
      gify.appendChild(gifElement);
    })
    .catch(function (error) {
      modalText.innerHTML = "";
      modalText.innerHTML = "Unable to connect to Gify";
    });
}
//GIPHY API
//////////////////////////////////////////////////////////////////////////////////

// // // // // // // // // // // // // // // // // // // // // // // //
// ================ Alex's Last.fm Codework Below ================= //

// Last.fm artist.getInfo function
function getArtistInfo() {
  var requestArtInfoURL =
    lastFmURL +
    "/?method=artist.getinfo&artist=" +
    artistName +
    "&api_key=" +
    lastFMapiKeyCode +
    "&format=json";

  fetch(requestArtInfoURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
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
  var requestArtAlbURL =
    lastFmURL +
    "/?method=artist.gettopalbums&artist=" +
    artistName +
    "&limit=5&api_key=" +
    lastFMapiKeyCode +
    "&format=json";

  fetch(requestArtAlbURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
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
    });
}

function displayTopAlbums(info, artName) {
  if (info.topalbums === null) {
    modalText.innerHTML = "No Albums were found. Try again.";
    return;
  }

  artistHeader.textContent = artName;

  var albumList = document.querySelector("#albumList");
  albumList.innerHTML = "";

  var albumImgPath = info.topalbums.album;
  var largeImgNum = 3;

  for (var i = 0; i < info.topalbums.album.length; i++) {
    var albumIcon = document.createElement("img");
    albumIcon.setAttribute("id", "img" + (i + 1));
    albumIcon.setAttribute("src", albumImgPath[i].image[largeImgNum]["#text"]);
    albumList.append(albumIcon);
  }
}

// Function for Last.fm API
function displayArtistInfo(info, artName) {
  if (info.artist === null) {
    modalText.innerHTML = "";
    modalText.innerHTML = "No Artist was found. Try again.";
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
if (artistName == "") {
    modalText.innerHTML = "";
    modalText.innerHTML = "Please enter an artist name";
    modalAlert();
    return;
}else {
  getArtistInfo();
  getAlbumList();
  getGify(artistName);
}
});

function modalAlert() {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
