const { findOne, find, insertOne, insertMany } = require('./mongoActions')

getSongs = (req, res)=> {
    let filter = {};
    let limit = 10;
    if(req.body){
        filter = req.body.filter;
        limit = req.body.limit;
        offset = req.body.offset || 0;
    }
    find("songsFull",filter,limit, offset)
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