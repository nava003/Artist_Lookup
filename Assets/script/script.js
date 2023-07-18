// fetch ('https://www.mediawiki.org/wiki/Special:MyLanguage/API:Query')

// Query Selectors
var artistSection = document.querySelector('#artistInfo');

// Last.fm artist.getInfo format
var apiKeyCode = "22ab40738b7e4b7cc147c18a2e2cd8ab";
var artistName = "Cher";
var requestArtistURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistName + '&api_key=' + apiKeyCode + '&format=json';

fetch(requestArtistURL)
    .then(function (response) {
        if (response.ok) {
            // console.log(response) // temp console log
            response.json()
            .then(function (data) {
                //console.log(data.artist.bio.content) // temp console log
                
                displayArtistInfo(data, artistName);
            });
        } else {
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

    var artHeaderEl = document.createElement('h2');
    artHeaderEl.textContent = artName;
    artistSection.append(artHeaderEl);

    var bioContent = info.artist.bio.content;
    //console.log(bioContent.split("\n"));
    var fixedBio = bioContent.replaceAll("\n", "<br>");

    var bioContainer = document.createElement('div');
    bioContainer.setAttribute('id', "bioContainer");
    bioContainer.setAttribute('style', "border:2px solid black");
    bioContainer.innerHTML = fixedBio;
    artistSection.append(bioContainer);


}

//// Below is basic example of artist.getInfo method ////
//// This will be removed as the project progresses  ////
// Example of a successful fetch input; artist name is Cher
// fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=22ab40738b7e4b7cc147c18a2e2cd8ab&format=json')
//     .then(function (response) {
//         // Console log of what response does; format=json allows us to utilize .json(), to view the data in a json format.
//         // console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//     }
// );

// Not used anywhere for now
// var songName = "";
// URL link without search query
//http://ws.audioscrobbler.com/2.0