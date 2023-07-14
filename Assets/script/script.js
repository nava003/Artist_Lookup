// fetch ('https://www.mediawiki.org/wiki/Special:MyLanguage/API:Query')

// // // // // // // // // // //
// Alex's Lyric API Codework //
// var artistName = "Coldplay";
// var songName = "Adventure of a Lifetime";
// var requestURL = 'https://api.lyrics.ovh/v1/' + artistName + '/' + songName;

// fetch(requestURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
var request = new XMLHttpRequest();

request.open('GET', 'https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
// End Of Alex's Lyric API Codework //
// // // // // // // // // // // // //