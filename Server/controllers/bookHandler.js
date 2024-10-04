const { find} = require('./mongoActions')
const axios = require('axios');
const pythonServerPath = "https://bookrecommendformediadb-91464205485.us-central1.run.app";

exports.getData = (req, res)=> {
    const { filter, limit } = req.body;
    // console.log("FILTER", filter);
    
    find("books", filter, limit)
    .then(data => {
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};

exports.getBookRecommendation = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const { book_id } = req.body;
    // console.log(book_id);
    
    axios.post(`${pythonServerPath}/recommend`, {
        book_id
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
