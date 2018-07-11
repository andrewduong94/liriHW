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
var statusLog = process.argv[2];
var dataLog;

//Status for StatusLog variable
for (var i = 3; i < nodeArgs.length; i++){
  statusLog = statusLog + " " + nodeArgs[i];
}


//Do what it says command

if (arg === "do-what-it-says"){
    fs.readFile('random.txt', 'utf8', function(err, data){
        arg = data.split(" ")[0]
        nodeArgs = (data.split(" "))
        liri()
    })
    

}
function liri(){


//Twitter
if (arg === 'my-tweets'){
var params = {screen_name: 'drewBot123'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i = 0; i < 19; i++){
    console.log(JSON.stringify(tweets[i].text, null, 2));
    dataLog = JSON.stringify(tweets[i].text, null, 2) 
    //dataLog for log.txt file
    fs.appendFile("log.txt","\n" + dataLog, function(err) {

      // If an error was experienced we say it.
      if (err) {
        console.log(err);
      }
    
    });
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
    dataLog = "Title: " + JSON.stringify(data.tracks.items[0].name, null, 2) + "\n" + "Artists: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2)
    + "\n" + "Album Title: " + JSON.stringify(data.tracks.items[0].album.name, null, 2) + "\n" + "Preview: " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2);

    //dataLog for log.txt file
    fs.appendFile("log.txt","\n" + dataLog, function(err) {

    // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
        
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content Added!");
        }
        
        });

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
          dataLog = "Title: " + JSON.parse(body).Title + "\n" + "Release Year: " + JSON.parse(body).Year + "\n" 
          + "IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n" + "Plot: " + JSON.parse(body).Plot  + "\n" 
          + "Actors: " + JSON.parse(body).Actors

            //dataLog for log.txt file
          fs.appendFile("log.txt","\n" + dataLog, function(err) {

            // If an error was experienced we say it.
                if (err) {
                  console.log(err);
                }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
          
          });
        }
  });

};

}

//log command
fs.appendFile("log.txt","\n" + statusLog, function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }

});

liri()




