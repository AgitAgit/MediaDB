const { insertOne, findOne} = require('./mongoActions')

exports.getData = (req, res)=> {
    findOne()
    .then(data => {
        console.log('data:',data);
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};