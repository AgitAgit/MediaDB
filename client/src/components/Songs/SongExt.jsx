import backImg from './../../assets/back_arrow.png';
import {useContext} from 'react';
function SongExt(props){
    const {img, track, album, albumReleaseDate, artist, trackLink, albumLink, artistLink} = props.data;
    const setPage  = props.setPage;
    window.scrollTo(0,0);

    function goBack(){
        setPage('songs');
    }
    return(
        <div className="SongExt">
            <div className="backArrowDiv">
                <div className="backArrowBackground">
                    <img className="backArrowImg" src={backImg} onClick={goBack}></img>
                </div>
            </div>
            <div className="innerSongExt">
                <div className="imgDiv">

                    {/* <div className="backArrowDiv">
                        <img className="backArrowImg" src={backImg} onClick={goBack}></img>
                    </div> */}
                    <img className="artistImg" src={img} alt={album}></img>
                </div>
                
                <div className="infoDiv">
                    <h3>Track:{track}</h3>
                    <p>Album:{album}</p>
                    <br/>
                    <p>Release date:{albumReleaseDate}</p>
                    <br/>
                    <p>Artist:{artist}</p>
                    <br/>
                    <p>External links:</p>
                    <br/>
                    <a href={trackLink} target='_blank'>{track} on spotify</a>
                    <br/>
                    <a href={albumLink} target='_blank'>{album} on spotify</a>
                    <br/>
                    <a href={artistLink} target='_blank'>{artist} on spotify</a>

                </div>
            </div>
        </div>
    );
}

export default SongExt;