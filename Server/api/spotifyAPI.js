require('dotenv').config();
const axios = require('axios');
const spotify_client_credentials = JSON.parse(process.env.spotify_client_credentials);
const { insertMany } = require('../controllers/mongoActions');

const musicians = [
    "Beyoncé",
    "Taylor Swift",
    "Ed Sheeran",
    "Adele",
    "The Beatles",
    "Michael Jackson",
    "Elvis Presley",
    "Rihanna",
    "Eminem",
    "Queen",
    "Bruno Mars",
    "Ariana Grande",
    "Justin Bieber",
    "Lady Gaga",
    "The Rolling Stones",
    "Pink Floyd",
    "Coldplay",
    "Maroon 5",
    "Drake",
    "The Weeknd",
    "Kanye West",
    "Imagine Dragons",
    "Dua Lipa",
    "Post Malone",
    "Jennifer Lopez",
    "Harry Styles",
    "Billie Eilish",
    "The Chainsmokers",
    "Doja Cat",
    "Olivia Rodrigo",
    "Bad Bunny",
    "BTS",
    "The Black Eyed Peas",
    "Shakira",
    "Elton John",
    "Bob Dylan",
    "Bruce Springsteen",
    "John Lennon",
    "Paul McCartney",
    "George Harrison",
    "Ringo Starr",
    "David Bowie",
    "Prince",
    "Whitney Houston",
    "Aretha Franklin",
    "AC/DC",
    "Led Zeppelin",
    "Metallica",
    "Aerosmith",
    "Guns N' Roses"
];

spHandle = {
    getToken: function(){
        return axios.post('https://accounts.spotify.com/api/token', spotify_client_credentials,
        {
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .catch(error => {
            console.log("error in  spotifyHandler:", error)
        });
    },

    buildQuery: function(track, album, artist){
        let query = '';
        //album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold
    },
    
    //returns: an array of objects
    searchData: async function(type="track", query="album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold", limit="50"){
        let token;
        const ob = this.getToken();
        ob.then(response => {
            token = response.data.access_token;
        });
        await ob;
        const data = await axios.get(`https://api.spotify.com/v1/search`,{
            params:{
                q: query,
                type: type,
                limit: limit
            },
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return data.data.tracks.items;
    },

    refineTrackData: function(track){
        return {
            link:track.external_urls.spotify,
            spotifyId:track.id,
            track:track.name,
            album:track.album.name,
            artist:track.artists[0].name
        }
    },

    populateDB: async function(start, end, collection){
        for(let i = start; i<end; i++){
            this.searchData('track',`${musicians[i]}`)
            .then(songs => {
                //console.log(songs[0], 'ONE OF THE SONGS INSERTED TO DB');
                insertMany(collection, songs);
            })
        }
    }
}

module.exports = spHandle;