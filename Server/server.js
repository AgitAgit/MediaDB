const express = require('express');
const app = express();
const mongoose = require('mongoose');
const spHandle = require('./spotifyHandler');
const { connectDB } = require('./config/dbConn');
const bkHandle = require('./booksHandler');
const { insertDB, findDB} = require('./cloudConn')

// const songSchema = new mongoose.Schema({
//     data: 'mixed'
// });
// const song = mongoose.model('song', songSchema);

// song.find()
// .then(songs => {
//     console.log('All songs:', songs);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

// connectDB();




// const bookSchema = new mongoose.Schema({
//     title: String,
//     authors: [String],
//     categories: [String],
//     language: String,
//     publishedDate: Date,
//     img: String,
//     link: String
// }); //pushed to default books collection

const bookSchema = new mongoose.Schema({
    data: 'mixed'
})
const Book = mongoose.model('Book', bookSchema);

/*
const data = bkHandle.searchData();
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

// const data = spHandle.searchData();
// data.then(result => console.log(result));
*/

// connectDB();
// Book.find()
// .then(books => {
//     console.log('All books:', books);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

findDB();

