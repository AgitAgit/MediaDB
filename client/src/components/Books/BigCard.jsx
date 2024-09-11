import BackButton from "./BackButton";

function BigCard(props){
    const { selectedBook, setSelectedBook} = props;

    return (
    <div id="big-card-container">
        <BackButton route={selectedBook} setRoute={setSelectedBook}/>
        <div id="data">
            <img src={selectedBook.img} />
            <div className="book-details">
                <p><span>Title:</span>{selectedBook.title}</p>
                <p><span>Authors:</span>{selectedBook.authors.join(", ")} </p>
                <p><span>Categories:</span>{selectedBook.categories.join(", ")} </p>
                <p><span>Language:</span>{selectedBook.language} </p>
                <p><span>Link:</span><a href={selectedBook.link}>Click Here</a>{}</p>
            </div>
            <div className="book-description">
                <p><span>Description:</span>{selectedBook.description} </p>
            </div>
        </div>
    </div>
    );
}

export default BigCard;