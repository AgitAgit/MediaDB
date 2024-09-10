const { findOne, find, insertOne, insertMany } = require('./mongoActions')

getSongs = (req, res)=> {
    find("songsFull",{},10)
    .then(data => {
        console.log('data:',data);
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};

module.exports = {getSongs};