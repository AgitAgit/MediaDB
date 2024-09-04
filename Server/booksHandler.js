
require('dotenv').config();
const axios = require('axios');
const booksApi = process.env.BOOKS_KEY;
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_CON_STRING;
// search query
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const query = 'harry+potter';


const url = `${baseUrl}//?q=intitle:harry+potter&key=${booksApi}`

function searchData() {
    return axios.get(url)
        .then(response => response.data.items)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function connectDB() {
    mongoose.connect(mongoString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}


const bookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    categories: [String],
    language: String,
    publishedDate: Date,
    img: String,
    link: String
}); //pushed to default books collection

// const bookSchema = new mongoose.Schema({
//     data: 'mixed'
// })

const Book = mongoose.model('Book', bookSchema);
function activate() {
    connectDB();
    const data = searchData();
    data.then(data => {
        console.log("------------------------------------------------------------------------------------");
        
        console.log(data);
        
        data.forEach(book => {
            console.log(book.volumeInfo.title);
            console.log(book.volumeInfo.authors);
            console.log(book.volumeInfo.categories);
            console.log(book.volumeInfo.language);
            console.log(book.volumeInfo.publishedDate);
            console.log(book.volumeInfo.imageLinks?.thumbnail);
            console.log(book.volumeInfo.previewLink);

            // const newBook = new Book({
            //     title: book.volumeInfo.title,
            //     authors: book.volumeInfo.authors,
            //     categories: book.volumeInfo.categories,
            //     language: book.volumeInfo.language,
            //     publishedDate: book.volumeInfo.publishedDate,
            //     img: book.volumeInfo.imageLinks?.thumbnail,
            //     link: book.volumeInfo.previewLink
            // });
            // newBook.save()
            // .then(() => console.log('Book added successfully'))
            // .catch(error => console.error('Error adding book:', error));
        });
        console.log("------------------------------------------------------------------------------------");
    });
}

// Book.find()
// .then(books => {
//     console.log('All books:', books);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

module.exports = { searchData, connectDB, activate };

