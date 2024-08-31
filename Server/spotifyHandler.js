require('dotenv').config();
const axios = require('axios');
const spotify_client_credentials = process.env.spotify_client_credentials;


spHandle = {
    token: '',

    getToken: function(){
        axios.post('https://accounts.spotify.com/api/token', spotify_client_credentials,
        {
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            this.token = response.data.access_token;
        })
        .catch(error => {
            console.log("error in  spotifyHandler:", error)
        });
    },

    buildQuery: function(track, album, artist){
        let query = '';
        //album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold
    },
    
    searchData: async function(type="track", query="album%3ACity%2520of%2520evil%2520artist%3AAvenged%2520Sevenfold"){
        if(this.token === '') this.getToken();
        await this.token;
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