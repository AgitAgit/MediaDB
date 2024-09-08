import './Books.css';
import Header from './Header';
import SearchButton from './SearchButton'
import FilterButton from './FilterButton';
import Card from './Card'

function Books(){
    const data = [
        {title: "Harry Potter and the Deathly Hallows", authors: ["J. K. Rowling"], categories: ["Juvenile Fiction"] , language: "en", publishedDate: "2007-01-01", description: "\"The final adventure in J.K. Rowling's phenomenal, best-selling Harry Potter book series\"--Provided by publisher." , img: "http://books.google.com/books/content?id=JHEkAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", link: "http://books.google.com/books?id=JHEkAQAAMAAJ&q=intitle:harry+potter&dq=intitle:harry+potter&hl=&cd=1&source=gbs_api" },
        {title: "The Hobbit - The Lord of the Rings", authors: ["J. R. R. Tolkien"], categories: ["Fantasy fiction, English"] , language: "en", publishedDate: "2013-10-24", description: "When they were first published, THE HOBBIT and THE LORD OF THE RINGS became instant classics. Treasured by readers young and old, these works of sweeping fantasy, steeped in unrivalled magic and otherworldliness have sold more than 150 million copies around the world.This new boxed set contains both titles and features brand new cover designs. It offers readers a new opportunity to discover Tolkien's remarkable world of Middle-earth and to follow the complete story of Bilbo Baggins and the Hobbits' part in the epic quest for the Ring - beginning with Bilbo's fateful visit from Gandalf and culminating in the dramatic climax between Frodo and Gollum atop Mount Doom.", img: "http://books.google.com/books/content?id=hMpmswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", link: "http://books.google.com/books?id=hMpmswEACAAJ&dq=intitle:The+Lord+of+the+Rings&hl=&source=gbs_api" },
    ]
    return(
    <div id="books-container">
        <Header />
        <div id="main-content">
            <div id="search-row">
                <SearchButton />
                <FilterButton />
            </div>
            <div id='cards-container'>
                {/* {data.map((element, index) => <Card key={index} data={element}/>)}; */}
                <Card data={data[0]} />
                <Card data={data[1]} />
                <Card data={data[0]} />
                <Card data={data[1]} />
                <Card data={data[0]} />
                <Card data={data[1]} />
                <Card data={data[0]} />
                <Card data={data[1]} />
                <Card data={data[0]} />
            </div>
        </div>
    </div>
    );
}

export default Books;