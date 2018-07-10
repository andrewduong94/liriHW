require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var keys = require("./keys")
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = "";
var arg = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";
var songName = "";


//Twitter
if (arg === 'my-tweets'){
console.log(client)
var params = {screen_name: 'drewBot123'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i = 0; i < 19; i++){
    console.log(JSON.stringify(tweets[i].text, null, 2));
    }
  }
});
}

//Spotify
if (arg === 'spotify-this-song'){
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
      
          songName = songName + " " + nodeArgs[i];
      
        }
      
        else {
      
          songName += nodeArgs[i];
      
        }
    }
    if (songName === ""){
        songName = "The Sign Ace"
    };

    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
 
    console.log("Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log("Artists: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2)); 
    console.log("Album Title: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
    console.log("Preview: " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2)); 
    });
}



//OMDB
if (arg === 'movie-this'){

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
  
      movieName = movieName + "+" + nodeArgs[i];
  
    }
  
    else {
  
      movieName += nodeArgs[i];
  
    }
}
if (movieName === ""){
    movieName = "Mr. + Nobody"
     
};

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);            
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country Produced: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
        }
  });

};

if (arg === "do-what-it-says"){
    fs.readFile('random.txt', 'utf8', function(err, data){
        console.log(data)
    })

}




