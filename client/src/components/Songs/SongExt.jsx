import backImg from './../../assets/back_arrow.png';

function SongExt(props){
    //I need to pass a function that changes the page to the songs page when the back arrow is clicked
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    return(
        <div class="SongExt">
            <img src={backImg}></img>
            
            <div class="imgDiv">
                <img src={img} alt={album}></img>
            </div>
            
            <div class="infoDiv">
                <h3>{track}</h3>
                <p>album:{album}</p>
                <br/>
                <p>artist:{artist}</p>
                <br/>
            </div>
        </div>
    );
}

export default SongExt;