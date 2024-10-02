import backImg from './../../assets/back_arrow.png';
import {useContext} from 'react';
function SongExt(props){
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
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
                    <p>Artist:{artist}</p>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default SongExt;