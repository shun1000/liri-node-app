require("dotenv").config();

let keys= require("./keys.js");

let Twitter = require('twitter');
let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);


//Load the user Twitter Keys

//Read in the command line arguments

let arg = process.argv[2];
let arg2 = process.argv[3];

twit = function () {
    var params = {
        screen_name: 'shunwakita'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 19; i >= 0; i--) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }

    });
};
spot = function (arg2) {
    let song = arg2;

    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            spotify.search({
                type: 'track',
                query: 'The Sign'
            }, function (err, data) {
                let rock = data.tracks.items[0];
                let rockSong = console.log(rock.artists[0].name);
                console.log(rock.name);
                console.log(rock.album.name);
                console.log(rock.preview_url);
            });
            return console.log('Error occurred: ' + err);
        } else {
            let songInfo = data.tracks.items[0];
            let songResult = console.log(songInfo.artists[0].name);
            console.log(songInfo.name);
            console.log(songInfo.album.name);
            console.log(songInfo.preview_url);
        }
    });
};
omdb = function (arg2) {
    var request = require('request');
    var movieStr1 = arg2;
    // var movieStr2 = process.argv[4];
    //var movie = movieStr1 + "+" + movieStr2;

    request('http://www.omdbapi.com/?apikey=trilogy&t= ' + movieStr1 + '', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response);
            console.log("The title is : " + JSON.parse(body).Title);
            console.log("Year movie was produced : " + JSON.parse(body).Year);
            console.log("IMDB Rating : " + JSON.parse(body).imdbRating);
            console.log("Rotten tomatoes rating : " + JSON.parse(body).Ratings[1].Value);
            console.log("Country movie was produced in : " + JSON.parse(body).Country);
            console.log("Movie Language : " + JSON.parse(body).Language);
            console.log("Plot of movie : " + JSON.parse(body).Plot);
            console.log("Actors in movie : " + JSON.parse(body).Actors);
        }
    });
};

argDoWhat = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(" , ");
        console.log(dataArr);
        var arg2 = dataArr[1];
        console.log(arg2);
        //spot(arg2);
    });
};

switch (arg) {
    case "my-tweets":
        twit();
        break;
    case "spotify-this-song":
        spot(arg2);
        break;
    case "movie-this":
        omdb(arg2);
        console.log("test omdb movie");
        break;
    case "do-what-it-says":
        argDoWhat();
        break;
}