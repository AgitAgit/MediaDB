
require('dotenv').config();
const axios = require('axios');
const booksApi = process.env.BOOKS_KEY;
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_CON_STRING;
// search query
const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
const famousBooks1 = [
    "The Great Gatsby",
    "Moby-Dick",
    "War and Peace",
    "Crime and Punishment",
    "The Catcher in the Rye",
    "Brave New World",
    "The Hobbit",
    "The Chronicles of Narnia",
    "The Road",
    "The Handmaid’s Tale",
    "The Kite Runner",
    "The Book Thief",
    "Gone Girl",
    "The Girl on the Train",
    "The Da Vinci Code",
    "A Song of Ice and Fire",
    "Dune",
    "Foundation",
    "Ender’s Game",
    "The Hunger Games",
    "Twilight",
    "Life of Pi",
    "The Alchemist",
    "One Hundred Years of Solitude",
    "Catch-22",
    "The Godfather",
    "Les Misérables",
    "The Picture of Dorian Gray",
    "Animal Farm",
    "Dracula",
    "The Shining",
    "Fahrenheit 451",
    "Lolita",
    "Slaughterhouse-Five",
    "The Secret Garden"
];
const famousBooks2 = [
    "Les Misérables",
    "The Old Man and the Sea",
    "Dracula",
    "The Invisible Man",
    "One Flew Over the Cuckoo's Nest",
    "The Bell Jar",
    "The Outsiders",
    "The Giver",
    "The Shining",
    "The Great Expectations",
    "Rebecca",
    "The Sun Also Rises",
    "The Color Purple",
    "The Picture of Dorian Gray",
    "Wuthering Heights",
    "Brave New World",
    "A Tale of Two Cities",
    "The Secret History",
    "Beloved",
    "Gone with the Wind",
    "The Road",
    "Catch-22",
    "The Chronicles of Narnia",
    "The Da Vinci Code",
    "The Hunger Games",
    "Twilight",
    "The Alchemist",
    "The Art of War",
    "The Three Musketeers",
    "Anna Karenina",
    "The Jungle Book",
    "The Handmaid’s Tale",
    "The Giver",
    "The Kite Runner",
    "The Maze Runner",
    "The Hitchhiker's Guide to the Galaxy",
    "The Girl with the Dragon Tattoo",
    "Fahrenheit 451",
    "The Road",
    "The Lovely Bones",
    "The Divergent Series",
    "Pride and Prejudice",
    "The Kite Runner",
    "A Game of Thrones",
    "The Time Traveler's Wife",
    "The Goldfinch",
    "The Brief Wondrous Life of Oscar Wao",
    "Room",
    "The Night Circus",
    "Big Little Lies",
    "Never Let Me Go",
    "All the Light We Cannot See",
    "The Light We Lost",
    "Eleanor Oliphant Is Completely Fine",
    "The Woman in the Window",
    "Little Fires Everywhere",
    "The Seven Husbands of Evelyn Hugo",
    "Where the Crawdads Sing",
    "Normal People",
    "Circe",
    "The Immortalists",
    "A Little Life",
    "The Underground Railroad",
    "An American Marriage",
    "The Book Thief",
    "Before We Were Strangers",
    "The Silent Patient",
    "The Tattooist of Auschwitz",
    "The Paris Library",
    "The Huntress",
    "The Alice Network",
    "The Orphan Master's Son",
    "The Nightingale",
    "The Guernsey Literary and Potato Peel Pie Society",
    "The Light Between Oceans",
    "Me Before You",
    "The Rosie Project",
    "The Perfect Couple",
    "Little Women",
    "The Woman in Cabin 10",
    "The Couple Next Door",
    "The Girl on the Train",
    "The Woman in the Window",
    "Big Little Lies",
    "Gone Girl",
    "Sharp Objects",
    "The Husband's Secret",
    "The Last Mrs. Parrish",
    "The Wife Between Us",
    "The Lying Game",
    "The Couple Next Door",
    "The Woman in Cabin 10",
    "The Girl in the Spider's Web",
    "The Girl Who Played with Fire",
    "The Girl Who Kicked the Hornet's Nest",
    "The Hunger Games",
    "Divergent",
    "Insurgent",
    "Allegiant",
    "The Maze Runner",
    "Catching Fire",
    "Mockingjay",
    "The Lightning Thief",
    "The Sea of Monsters",
    "The Titan's Curse",
    "The Battle of the Labyrinth",
    "The Last Olympian",
    "The 5th Wave",
    "The Infinite Sea",
    "The Last Star",
    "Miss Peregrine's Home for Peculiar Children",
    "Hollow City",
    "Library of Souls",
    "The Throne of Glass",
    "Crown of Midnight",
    "Heir of Fire",
    "Queen of Shadows",
    "Empire of Storms",
    "Tower of Dawn",
    "Kingdom of Ash",
    "The Selection",
    "The Elite",
    "The One",
    "The Heir",
    "The Crown",
    "Legend",
    "Prodigy",
    "Champion",
    "The Young Elites",
    "The Rose Society",
    "The Midnight Star",
    "The Grisha Trilogy",
    "Shadow and Bone",
    "Siege and Storm",
    "Ruin and Rising",
    "The Six of Crows",
    "Crooked Kingdom",
    "Kingdom of Souls",
    "The Bone Season",
    "The Mime Order",
    "The Song Rising",
    "The Smoke Thieves",
    "The Wicked Deep",
    "The Merciless",
    "The Naturals",
    "Kiss of Deception",
    "The Heart of Betrayal",
    "The Beauty of Darkness",
    "The Remnant Chronicles",
    "The Last Namsara",
    "The Cuckoo's Calling",
    "The Silkworm",
    "Career of Evil",
    "Lethal White",
    "Troubled Blood",
    "The Secret Adversary",
    "Murder on the Orient Express",
    "The Murder of Roger Ackroyd",
    "And Then There Were None",
    "The ABC Murders",
    "The Mysterious Affair at Styles",
    "Death on the Nile",
    "The Hollow",
    "A Study in Scarlet",
    "The Hound of the Baskervilles",
    "The Sign of the Four",
    "The Adventures of Sherlock Holmes",
    "The Memoirs of Sherlock Holmes",
    "The Return of Sherlock Holmes",
    "The Case-Book of Sherlock Holmes",
    "The Adventure of the Blue Carbuncle",
    "The Adventure of the Speckled Band",
    "The Adventure of the Musgrave Ritual",
    "The Adventure of the Engineer's Thumb",
    "The Adventure of the Beryl Coronet",
    "The Adventure of the Dancing Men",
    "The Adventure of the Priory School",
    "The Adventure of the Norwood Builder",
    "The Adventure of the Six Napoleons",
    "The Adventure of the Sussex Vampire",
    "The Adventure of the Retired Colourman",
    "The Adventure of the Veiled Lodger",
    "The Adventure of the Bruce-Partington Plans",
    "The Adventure of the Devil's Foot",
    "The Adventure of the Illustrious Client",
    "The Adventure of the Three Garridebs",
    "The Adventure of the Golden Pince-Nez",
    "The Adventure of the Abbey Grange",
    "The Adventure of the Second Stain",
    "The Adventure of the Three Students",
    "The Adventure of the Red-Headed League",
    "The Adventure of the Empty House",
    "The Adventure of the Crooked Man",
    "The Adventure of the Reigate Squires",
    "The Adventure of the Solitary Cyclist",
    "The Adventure of the Engineer's Thumb",
    "The Adventure of the Beryl Coronet",
    "The Adventure of the Dancing Men",
    "The Adventure of the Priory School",
    "The Adventure of the Norwood Builder",
    "The Adventure of the Six Napoleons",
    "The Adventure of the Sussex Vampire",
    "The Adventure of the Retired Colourman",
    "The Adventure of the Veiled Lodger",
    "The Adventure of the Bruce-Partington Plans",
    "The Adventure of the Devil's Foot",
    "The Adventure of the Illustrious Client",
    "The Adventure of the Three Garridebs",
    "The Adventure of the Golden Pince-Nez",
    "The Adventure of the Abbey Grange",
    "The Adventure of the Second Stain",
    "The Adventure of the Three Students",
    "The Adventure of the Red-Headed League",
    "The Adventure of the Empty House",
    "The Adventure of the Crooked Man",
    "The Adventure of the Reigate Squires",
    "The Adventure of the Solitary Cyclist",
    "The Adventure of the Golden Pince-Nez",
    "The Adventure of the Abbey Grange",
    "The Adventure of the Second Stain",
    "The Adventure of the Three Students",
    "The Adventure of the Red-Headed League",
    "The Adventure of the Empty House",
    "The Adventure of the Crooked Man",
    "The Adventure of the Reigate Squires",
    "The Adventure of the Solitary Cyclist",
    "The Adventure of the Musgrave Ritual",
    "The Adventure of the Engineer's Thumb",
    "The Adventure of the Beryl Coronet",
    "The Adventure of the Dancing Men",
    "The Adventure of the Priory School",
    "The Adventure of the Norwood Builder",
    "The Adventure of the Six Napoleons",
    "The Adventure of the Sussex Vampire",
    "The Adventure of the Retired Colourman",
    "The Adventure of the Veiled Lodger",
    "The Adventure of the Bruce-Partington Plans",
    "The Adventure of the Devil's Foot",
    "The Adventure of the Illustrious Client",
    "The Adventure of the Three Garridebs",
    "The Adventure of the Golden Pince-Nez",
    "The Adventure of the Abbey Grange",
    "The Adventure of the Second Stain",
    "The Adventure of the Three Students",
    "The Adventure of the Red-Headed League",
    "The Adventure of the Empty House",
    "The Adventure of the Crooked Man",
    "The Adventure of the Reigate Squires",
    "The Adventure of the Solitary Cyclist",
    "The Adventure of the Engineer's Thumb",
    "The Adventure of the Beryl Coronet",
    "The Adventure of the Dancing Men",
    "The Adventure of the Priory School",
    "The Adventure of the Norwood Builder",
    "The Adventure of the Six Napoleons",
    "The Adventure of the Sussex Vampire",
    "The Adventure of the Retired Colourman",
    "The Adventure of the Veiled Lodger",
    "The Adventure of the Bruce-Partington Plans",
    "The Adventure of the Devil's Foot",
    "The Adventure of the Illustrious Client",
    "The Adventure of the Three Garridebs",
    "The Adventure of the Golden Pince-Nez",
    "The Adventure of the Abbey Grange",
    "The Adventure of the Second Stain",
    "The Adventure of the Three Students",
    "The Adventure of the Red-Headed League",
    "The Adventure of the Empty House",
    "The Adventure of the Crooked Man",
    "The Adventure of the Reigate Squires",
    "The Adventure of the Solitary Cyclist"
];


function searchData(curr) {
    const query = `intitle:${curr}`
    const url = `${baseUrl}/?q=${query}&maxResults=40&key=${booksApi}`;
    console.log(url);
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
    description: String,
    img: String,
    link: String
}); //pushed to default books collection

const Book = mongoose.model('Book', bookSchema);
async function activate() {
    await connectDB();
    let start = 271
    let end = 281
    for(let i=start; i < end && i < famousBooks2.length; i++){
        searchData(famousBooks2[i])
        .then(data => {
            if(!data) return;
            let count = 1;
            if(typeof data !== 'object') return;
            data.forEach(book => {
                
                // console.log(`-----------------------------------------${count++}-------------------------------------`);
                // console.log("title:", book.volumeInfo.title);
                // console.log("authors:",book.volumeInfo.authors);
                // console.log("categories:",book.volumeInfo.categories);
                // console.log("language:",book.volumeInfo.language);
                // console.log("publishedDate:",book.volumeInfo.publishedDate);
                // console.log("description:", book.volumeInfo.description);
                // console.log("thumbnail:",book.volumeInfo.imageLinks?.thumbnail);
                // console.log("previewLink:",book.volumeInfo.infoLink);
                
                // const newBook = new Book({
                //     title: book.volumeInfo.title,
                //     authors: book.volumeInfo.authors,
                //     categories: book.volumeInfo.categories,
                //     language: book.volumeInfo.language,
                //     publishedDate: book.volumeInfo.publishedDate,
                //     description: book.volumeInfo.description,
                //     img: book.volumeInfo.imageLinks?.thumbnail,
                //     link: book.volumeInfo.infoLink
                // });
                // newBook.save()
                // .then(() => console.log('Book added successfully'))
                // .catch(error => console.error('Error adding book:', error));
            });
        });
    }
}

// Book.find()
// .then(books => {
//     console.log('All books:', books);
// })
// .catch(err => {
//     console.error('Error fetching songs:', err);
// });

module.exports = { searchData, connectDB, activate };

