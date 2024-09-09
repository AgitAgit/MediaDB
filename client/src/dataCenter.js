import defaultImg from './assets/book_img_not_available.png';

const _SERVER_ADDRESS = 'https://mediadb-91464205485.us-central1.run.app';
const _LOCAL_SERVER_ADDRESS = 'http://localhost';
const _SERVER_PORT = 8080;

const _CURRENT_ADDRESS = _LOCAL_SERVER_ADDRESS;


function getBooks(searchText, method){
    const filter = {};
    filter[method] = { $regex: searchText, $options: "i"};
    
    return fetch(`${_CURRENT_ADDRESS}:${_SERVER_PORT}/api/data/book/get`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({filter})
    })
    .then(response => response.json())
    .then(data => {
        console.log("data on center is", data);
        if(data && data.length > 0) data.forEach(element => {
            if(element.hasOwnProperty("publishedDate") && element.publishedDate.length > 10)
                element.publishedDate = element.publishedDate.slice(0,10);
            if(!element.img) element.img = defaultImg;
    });
    return data;
    })
    .catch(err => console.log("Client fetching error:",err));
}

// function getSongs(){}
export default getBooks;
