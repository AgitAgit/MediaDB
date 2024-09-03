const { insertDB, findDB} = require('./../cloudConn')

exports.getData = (req, res)=> {
    findDB()
    .then(data => {
        console.log('data:',data);
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};