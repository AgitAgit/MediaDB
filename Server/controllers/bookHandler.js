const { insertOne, findOne, find} = require('./mongoActions')

exports.getData = (req, res)=> {
    const { filter } = req.body;
    // console.log("FILTER", filter);
    
    find("books", filter)
    .then(data => {
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};