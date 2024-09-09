const { insertOne, find} = require('./mongoActions')
const filter = {
    title:"Harry Potter"
}
exports.getData = (req, res)=> {
    find("books", filter)
    .then(data => {
        console.log('data:',data);
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};