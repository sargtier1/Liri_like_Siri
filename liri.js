require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// terminal input variables input one is what is being searched, input two is finer details i.e what movie/ what song
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join("");

// switch case for different API seraches
switch(input1) {
    case "concert-this":
    searchConcert(input2);
    break;

    case "song-this":
    searchSong(input2);
    break;

    case "movie-this":
    searchMovie(input2);
    break;
}

//search for concerts command
function searchConcert (input2) {
    request("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp", function(error, response, body) {
    if(error) {
        console.log(error)
    }
    if (!error && response.statusCode === 200){
        var concert = JSON.parse(body);
        console.log(concert[0])
        // var concertData = [
        //     console.log("---------------------------------------------------"),
        //     console.log("Name of Venue: ", concert.venue.name),// name of venue
        //     console.log("Location of Venue: ", concert.venue[4]),// venue location
        //     console.log("Date of Event: ", concert[4]),// date of the event (MM/DD/YYYY)
        //     console.log("---------------------------------------------------")
        //     ].join("\n\n")

        storeData(concert[0]);
        }
    });
};


// search for songs command
function searchSong (input2) {
    request("https://api.spotify.com/v1/search?q=" + input2 + "&type=song",  function(error,resoonse, body) {
    if(!error && statusCode === 200) {
        console.log()
    }
            // Artist
            // Song Name
            // Preview link
            // Album
});
};

//search for movie command
function searchMovie (input2) {
    request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200){
        var movie = JSON.parse(body);
       
            console.log("---------------------------------------------------"),
            console.log(`Movie: ${movie.Title} 
                        \nYear: ${movie.Year}
                        \nIMBD: ${movie.Ratings[0].Value}
                        \nRotton Tomatoes: ${movie.Ratings[1].Value}
                        \nProduction: ${movie.Production}
                        \nLanguage: ${movie.Language}
                        \nPlot: ${movie.Plot}
                        \nActors: ${movie.Actors}`)
            console.log("---------------------------------------------------"),
            
            storeData("\n---------------------------------------------------\n");
            storeData("\nTitle of Movie: ", movie.Title);
            storeData("Year Made: ", movie.Year);
            storeData("IMDB Rating: ", movie.Ratings[0].Value);
            storeData("Rotten Tomatoes Rating: ",  movie.Ratings[1].Value);
            storeData("Country of Production: ", movie.Production );
            storeData("Language Originally Filmed In: ", movie.Language);
            storeData("Plot of Movie: ", movie.Plot);
            storeData("Actors/ Actresses of Movie: ", movie.Actors);
            storeData("---------------------------------------------------");
        }
    });
};

function other(){
    console.log("There was an error with your search. Pleae")
};


// reads data from txt file
function readTxt () {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
            console.log(ERROR);
        }
        else {
            console.log(input2)
            var searchArr = data.split(",");
            for (var i =0; searchArr.length; i++){
                console.log(searchArr[i].trim());
            }
            console.log(searchArr);
        }
    })
};

function storeData(data){
    fs.appendFile("log.txt", JSON.stringify(data), function(error) {
        if (error) {
            console.log(ERROR);
        }
        else{
            console.log("data " + data)
            console.log("data added to log.txt");
        }
    });
}

