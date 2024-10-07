import LikeButton from "./LikeButton";

function Card(props){
    let { _id, title, language, publishedDate, img } = props.data;
    const { onClick, carousel } = props;
    if(title.length > 30) title = title.slice(0,30) + '...';
    
    return (
        <div className={"card" + (carousel ? " carousel-card" : "")} onClick={onClick}>
            <img className="card-img" src={img} alt="book cover"></img>
            <div className="space-between">
                <h3 className='card-title'>{title}</h3>
                <p className='card-lang'>{language}</p>
                <p className="card-date">{publishedDate}</p>
            </div>
            <LikeButton _id={_id}/>
        </div>
    );
}

export default Card;