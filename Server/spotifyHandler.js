const axios = require('axios');
const { client_credentials } = require('./config/apiKeys');

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
        
        await token;
        return axios.get(`https://api.spotify.com/v1/search`,{
            params:{
                q: query,
                type: type
            },
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(data => data.data.tracks.items[0].name)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log("error in  spotifyHandler:", error)
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