
function Card(props){
    const { title, authors, language, publishedDate, description, img, link } = props.data;
    return (
        <div className="card">
            <img className="card-img" src={img} alt="profile picture"></img>
            <h3 className='card-title'>{title}</h3>
            <p className='card-lang'>{language}</p>
            <p className="card-date">{publishedDate}</p>
        </div>
    );
}

export default Card;