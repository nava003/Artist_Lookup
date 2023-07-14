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