const axios = require('axios');
const client_credentials = require('./config/spotifyClientCred');

async function getToken(){
    let token = '';

    await axios.post('https://accounts.spotify.com/api/token', client_credentials,
    {
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        token = response.data.access_token;
    })
    .catch(error => {
        console.log("error in  spotifyHandler:", error)
    });

    return token;
}

let token = getToken();

spHandle = {
    restartToken: function(){
        token = getToken();
    },

    buildQuery: function(track, album, artist){
        let query = '';
        //album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold
    },

    searchData: async function(type="track", query="album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold"){
        token
        .then(token =>{
            axios.get(`https://api.spotify.com/v1/search`,{
                params:{
                    q: "album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold",
                    type: type
                },
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(data => {
                return data.data.tracks.items;
            })
            .catch(error => {
                console.log("error in  spotifyHandler:", error)
            });
        });
    }
}

module.exports = spHandle;

// getData: async function(route){
//     axios.get(`https://api.spotify.com/v1${route}`,{
//         headers:{
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(data => {
//         console.log(data.data);
//     })
//     .catch();
// },