import LikeButton from "./LikeButton";

function Card(props){
    let { title, authors, language, publishedDate, description, img, link } = props.data;
    if(title.length > 30) title = title.slice(0,30) + '...';

    return (
        <div className="card">
            <img className="card-img" src={img} alt="profile picture"></img>
            <h3 className='card-title'>{title}</h3>
            <p className='card-lang'>{language}</p>
            <p className="card-date">{publishedDate}</p>
            <LikeButton />
        </div>
    );
}

export default Card;