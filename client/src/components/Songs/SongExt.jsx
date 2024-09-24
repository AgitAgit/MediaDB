import backImg from './../../assets/back_arrow.png';
import {useContext} from 'react';
function SongExt(props){
    //I need to pass a function that changes the page to the songs page when the back arrow is clicked
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    const setPage  = props.setPage;
    window.scrollTo(0,0);
    function goBack(){
        setPage('songs');
    }
    return(
        <div class="SongExt">
            <img src={backImg} onClick={goBack}></img>
            
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