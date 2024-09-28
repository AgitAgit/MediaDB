import LikeButton from "./LikeButton";

function Card(props){
    let { _id, title, authors, language, publishedDate, description, img, link } = props.data;
    const { onClick, carousel } = props;
    let isLiked = false;
    if(title.length > 30) title = title.slice(0,30) + '...';
    
    return (
        <div className={"card" + (carousel ? " carousel-card" : "")} onClick={onClick}>
            <img className="card-img" src={img} alt="profile picture"></img>
            <h3 className='card-title'>{title}</h3>
            <p className='card-lang'>{language}</p>
            <p className="card-date">{publishedDate}</p>
            <LikeButton _id={_id}/>
        </div>
    );
}

export default Card;