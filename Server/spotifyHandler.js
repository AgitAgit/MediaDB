require('dotenv').config();
const axios = require('axios');
const spotify_client_credentials = JSON.parse(process.env.spotify_client_credentials);


spHandle = {
    getToken: function(){
        axios.post('https://accounts.spotify.com/api/token', spotify_client_credentials,
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
    
    searchData: async function(type="track", query="track%3Bat%2520country"){
                
        const data = await axios.get(`https://api.spotify.com/v1/search`,{
            params:{
                q: query,
                type: type
            },
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return data.data.tracks.items;
    }
}

module.exports = spHandle;