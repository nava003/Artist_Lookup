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
var lastFmURL = "https://ws.audioscrobbler.com/2.0";
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
      console.log(response)
      if (!response.ok) {
        validSearch();
        return
      }else {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data)
      if (data.error) {
            validSearch();
            return
      }else {
            displayArtistInfo(data, artistName);
            getAlbumList();
            getGify(artistName);        
          }
        })
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
      }
    
    });
}

function displayTopAlbums(info, artName) {
  artistHeader.textContent = artName;

  var albumList = document.querySelector("#albumList");
  albumList.innerHTML = "";

  var albumImgPath = info.topalbums.album;
  var largeImgNum = 3;

  for (var i = 0; i < info.topalbums.album.length; i++) {
    var albumIcon = document.createElement("img");
    albumIcon.setAttribute("id", "img" + (i + 1));
    albumIcon.setAttribute("class", "albumIcon");
    albumIcon.setAttribute("src", albumImgPath[i].image[largeImgNum]["#text"]);
    albumList.append(albumIcon);
  }
}

// Function for Last.fm API
function displayArtistInfo(info, artName) {


  artistHeader.textContent = artName;

  var bioContent = info.artist.bio.content;
  var fixedBio = bioContent.replaceAll("\n", "<br>");

  artistInfo.innerHTML = fixedBio;
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  artistName = searchField.value.trim();
  artistInfo.innerHTMl = "";
if (artistName == "") {
    validSearch()
    return;
}else {
  getArtistInfo();
  clearSearch()
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

function clearSearch() {
  searchField.value = "";
}

function validSearch() {
  modalText.innerHTML = "";
  modalText.innerHTML = "Sorry, please enter a valid search";
  modalAlert();
}